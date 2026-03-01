#!/usr/bin/env python3
"""
WordPress XML → Astro Markdown converter
Converts all published posts from WordPress export to Astro-compatible Markdown files.
"""

import os
import re
import sys
from lxml import etree
from urllib.parse import unquote
import html2text
from datetime import datetime

# ── Category mapping: WordPress name → output directory slug ──────────────────
CATEGORY_MAP = {
    '閱讀筆記':   'reading-notes',
    '健康':       'health',
    '工作、職場': 'work',
    '人生智慧':   'life-wisdom',
    '學習':       'learning',
    '技術':       'tech',
    '創業':       'startup',
    '數位生活':   'digital-life',
    '理財':       'finance',
    'AI':         'ai',
    '產品':       'product',
    'Python':     'python',
    'SEO':        'seo',
    'Uncategorized': 'tech',  # merge into tech
}

WP  = 'http://wordpress.org/export/1.2/'
CNT = 'http://purl.org/rss/1.0/modules/content/'
EXC = 'http://wordpress.org/export/1.2/excerpt/'
DC  = 'http://purl.org/dc/elements/1.1/'

# ── HTML → Markdown converter ────────────────────────────────────────────────
h2t = html2text.HTML2Text()
h2t.ignore_links = False
h2t.ignore_images = False
h2t.body_width = 0          # no line wrapping
h2t.protect_links = True
h2t.unicode_snob = True

def strip_wp_blocks(html: str) -> str:
    """Remove WordPress Gutenberg block comments and clean up HTML."""
    # Remove block comments: <!-- wp:xxx --> and <!-- /wp:xxx -->
    html = re.sub(r'<!-- /?(wp:[^\-]*|more) -->', '', html)
    # Remove <!--more--> read-more marker
    html = re.sub(r'<!--more-->', '', html)
    return html.strip()

def html_to_markdown(html: str) -> str:
    html = strip_wp_blocks(html)
    md = h2t.handle(html)
    # Clean up excessive blank lines (more than 2 → 2)
    md = re.sub(r'\n{3,}', '\n\n', md)
    return md.strip()

def safe_slug(slug: str) -> str:
    """Produce a filesystem-safe filename from a WordPress slug."""
    slug = unquote(slug)
    # Remove/replace chars unsafe in filenames
    slug = re.sub(r'[\\/:*?"<>|]', '-', slug)
    slug = slug.strip('-').strip()
    if not slug:
        slug = 'untitled'
    # Limit length to 80 chars
    return slug[:80]

def get_first_paragraph(html: str) -> str:
    """Extract plain text from first <p> tag as description fallback."""
    html = strip_wp_blocks(html)
    m = re.search(r'<p[^>]*>(.*?)</p>', html, re.DOTALL | re.IGNORECASE)
    if m:
        text = re.sub(r'<[^>]+>', '', m.group(1))
        text = re.sub(r'\s+', ' ', text).strip()
        return text[:200]
    # No <p> found — strip all tags and take first 200 chars
    plain = re.sub(r'<[^>]+>', '', html)
    plain = re.sub(r'\s+', ' ', plain).strip()
    return plain[:200]

def yaml_escape(s: str) -> str:
    """Escape a string for YAML front-matter double-quoted value."""
    s = s.replace('\\', '\\\\').replace('"', '\\"')
    # Replace newlines
    s = s.replace('\n', ' ').replace('\r', '')
    return s

def make_frontmatter(title, description, pub_date, category, tags, subcategories=None) -> str:
    lines = ['---']
    lines.append(f'title: "{yaml_escape(title)}"')
    lines.append(f'description: "{yaml_escape(description)}"')
    lines.append(f'pubDate: "{pub_date}"')
    lines.append(f'category: "{category}"')
    if subcategories:
        sub_list = ', '.join(f'"{yaml_escape(s)}"' for s in subcategories)
        lines.append(f'subcategories: [{sub_list}]')
    if tags:
        tag_list = ', '.join(f'"{yaml_escape(t)}"' for t in tags)
        lines.append(f'tags: [{tag_list}]')
    else:
        lines.append('tags: []')
    lines.append('---')
    return '\n'.join(lines)

def main():
    xml_path = os.path.join(os.path.dirname(__file__), '..', 'WordPress.2026-03-01.xml')
    out_base  = os.path.join(os.path.dirname(__file__), '..', 'src', 'content', 'blog')

    print(f'Reading {xml_path} …')
    with open(xml_path, 'rb') as f:
        raw = f.read()

    # Strip invalid XML control characters
    raw = re.sub(rb'[\x00-\x08\x0b\x0c\x0e-\x1f]', b'', raw)

    root = etree.fromstring(raw)
    channel = root.find('channel')
    items = channel.findall('item')

    # Create output directories
    for slug in set(CATEGORY_MAP.values()):
        os.makedirs(os.path.join(out_base, slug), exist_ok=True)

    stats = {'written': 0, 'skipped': 0, 'no_cat': 0}
    slug_count: dict[str, int] = {}  # track duplicate slugs per category

    for item in items:
        post_type = item.findtext(f'{{{WP}}}post_type') or ''
        status    = item.findtext(f'{{{WP}}}status') or ''

        if post_type != 'post' or status != 'publish':
            continue

        title    = item.findtext('title') or 'Untitled'
        date_str = item.findtext(f'{{{WP}}}post_date') or '2020-01-01 00:00:00'
        wp_slug  = item.findtext(f'{{{WP}}}post_name') or ''
        content  = item.findtext(f'{{{CNT}}}encoded') or ''
        excerpt  = item.findtext(f'{{{EXC}}}encoded') or ''

        # Parse date
        try:
            dt = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
            pub_date = dt.strftime('%Y-%m-%d')
        except ValueError:
            pub_date = date_str[:10]

        # Categories and tags
        cats = []
        tags = []
        for cat_el in item.findall('category'):
            domain = cat_el.get('domain', '')
            text   = cat_el.text or ''
            if domain == 'category':
                cats.append(text)
            elif domain == 'post_tag':
                tags.append(text)

        # Determine output directory
        # 閱讀筆記 takes highest priority (it's the blog's core content type)
        PRIORITY = ['閱讀筆記', 'AI', 'Python', 'SEO']
        cat_dir = None
        cat_name = None
        for priority_cat in PRIORITY:
            if priority_cat in cats:
                cat_dir  = CATEGORY_MAP[priority_cat]
                cat_name = priority_cat
                break
        if cat_dir is None:
            for c in cats:
                if c in CATEGORY_MAP:
                    cat_dir  = CATEGORY_MAP[c]
                    cat_name = c
                    break

        if cat_dir is None:
            # Fallback: use first category raw or 'uncategorized'
            cat_dir  = 'tech'
            cat_name = cats[0] if cats else 'Uncategorized'
            stats['no_cat'] += 1

        # Build description
        if excerpt and excerpt.strip():
            description = re.sub(r'<[^>]+>', '', excerpt).strip()[:200]
        else:
            description = get_first_paragraph(content)
        if not description:
            description = title

        # Convert content HTML → Markdown
        md_body = html_to_markdown(content)

        # Build safe filename
        file_slug = safe_slug(wp_slug) if wp_slug else safe_slug(title)

        # Handle duplicate filenames within the same category directory
        key = f'{cat_dir}/{file_slug}'
        if key in slug_count:
            slug_count[key] += 1
            file_slug = f'{file_slug}-{slug_count[key]}'
        else:
            slug_count[key] = 1

        filename = f'{file_slug}.md'
        out_path = os.path.join(out_base, cat_dir, filename)

        # For reading-notes posts, record other topic categories as subcategories
        subcategories = None
        if cat_name == '閱讀筆記':
            subcategories = [c for c in cats if c != '閱讀筆記' and c in CATEGORY_MAP]

        frontmatter = make_frontmatter(title, description, pub_date, cat_name, tags, subcategories)
        full_content = f'{frontmatter}\n\n{md_body}\n'

        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(full_content)

        stats['written'] += 1
        if stats['written'] % 50 == 0:
            print(f'  … {stats["written"]} posts written')

    print(f'\n✅ Done!')
    print(f'   Written : {stats["written"]}')
    print(f'   Skipped : {stats["skipped"]}')
    print(f'   No-cat  : {stats["no_cat"]} (→ assigned to tech)')

    # Print per-directory counts
    print('\nFiles per category:')
    for cat_slug in sorted(set(CATEGORY_MAP.values())):
        d = os.path.join(out_base, cat_slug)
        n = len([x for x in os.listdir(d) if x.endswith('.md')])
        if n:
            print(f'  {cat_slug:20s} {n}')

if __name__ == '__main__':
    main()
