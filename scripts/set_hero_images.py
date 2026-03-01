#!/usr/bin/env python3
"""
Set heroImage in frontmatter for all blog posts.
  - Posts WITH images: use first /wp-content/ image, fallback to first external URL
  - Posts WITHOUT images: generate via Pollinations.ai (free, no API key needed)
"""

import re
import urllib.parse
from pathlib import Path

CONTENT = Path(__file__).parent.parent / 'src' / 'content' / 'blog'

# Regex to find Markdown images in body.
# Allows escaped parens \( \) inside URLs: matches \X as a unit before stopping at bare )
IMG_RE   = re.compile(r'!\[[^\]]*\]\(((?:[^\s\)\\]|\\.)+)\)')
FRONT_RE = re.compile(r'^---\s*\n(.*?)\n---', re.DOTALL)

# ---------- Pollinations prompts per category ----------
CATEGORY_PROMPTS: dict[str, str] = {
    # English
    'ai':         'artificial intelligence neural network digital brain glowing blue technology futuristic',
    'tech':       'software programming code dark terminal clean minimalist technology',
    '技術':        'software programming code dark terminal clean minimalist technology',
    'python':     'Python programming snake symbol code blue minimalist clean background',
    'learning':   'education books knowledge learning personal growth warm light',
    '學習':        'education books knowledge learning personal growth warm light',
    'health':     'health wellness medical nature green clean professional',
    '健康':        'health wellness medical nature green clean professional',
    'startup':    'startup innovation business modern office team collaboration',
    '創業':        'startup innovation business modern office team collaboration',
    'product':    'product design app interface clean modern flat design',
    '產品':        'product design app interface clean modern flat design',
    'life':       'lifestyle personal journey motivation scenic landscape peaceful',
    '生活':        'lifestyle personal journey motivation scenic landscape peaceful',
    'travel':     'travel adventure landscape scenic photography golden hour',
    '旅遊':        'travel adventure landscape scenic photography golden hour',
    'finance':    'finance money investment growth chart professional clean',
    '財經':        'finance money investment growth chart professional clean',
}

def slug_from_path(path: Path) -> str:
    return re.sub(r'[^\w]', '-', path.stem)[:40]

def pollinations_url(title: str, category: str, seed_str: str) -> str:
    base_prompt = CATEGORY_PROMPTS.get(category.lower(), 'blog article concept clean professional')
    # Add first 5 non-CJK words from title for context
    en_words = re.sub(r'[\u4e00-\u9fff\u3000-\u303f]+', ' ', title).split()[:5]
    en_part   = ' '.join(en_words).strip()
    prompt    = f"{base_prompt} {en_part}".strip()
    seed      = abs(hash(seed_str)) % 9999
    encoded   = urllib.parse.quote(prompt)
    return (
        f"https://image.pollinations.ai/prompt/{encoded}"
        f"?width=1200&height=630&seed={seed}&model=flux&nologo=true"
    )

def sanitize_url(url: str) -> str:
    """Remove Markdown backslash escapes from a URL (e.g. \( → ()."""
    return re.sub(r'\\(.)', r'\1', url)

def find_best_image(body: str) -> str | None:
    """Return best image URL from post body: prefer /wp-content/, fallback external."""
    imgs = [sanitize_url(i) for i in IMG_RE.findall(body)]
    wp   = [i for i in imgs if i.startswith('/wp-content/')]
    ext  = [i for i in imgs if i.startswith('http')]
    return (wp or ext or [None])[0]

def add_hero_image_to_frontmatter(text: str, hero: str) -> str:
    """Insert heroImage field into existing frontmatter block."""
    m = FRONT_RE.match(text)
    if not m:
        return text
    fm_end = m.end(1)   # end of frontmatter content, before closing ---
    hero_line = f'heroImage: "{hero}"'
    return text[:fm_end] + f'\n{hero_line}' + text[fm_end:]

def already_has_hero(text: str) -> bool:
    """Return True only if heroImage is already set to a real (non-Pollinations) value."""
    m = FRONT_RE.match(text)
    if not m or 'heroImage' not in m.group(1):
        return False
    # Allow re-generating Pollinations URLs (so we can fix category prompts)
    return 'pollinations' not in m.group(1)

def remove_hero_image(text: str) -> str:
    """Remove existing heroImage line from frontmatter."""
    return re.sub(r'\nheroImage: "[^"]*"', '', text)

def main():
    posts  = sorted(CONTENT.rglob('*.md'))
    skip   = already_set = set_from_content = set_from_ai = 0

    for md in posts:
        text = md.read_text(encoding='utf-8')

        if already_has_hero(text):
            skip += 1
            continue

        # Remove stale Pollinations heroImage if present, then re-set
        text = remove_hero_image(text)

        # Split out body (after frontmatter)
        m = FRONT_RE.match(text)
        body = text[m.end():] if m else text

        hero = find_best_image(body)

        if hero:
            set_from_content += 1
        else:
            # Extract category for prompt
            cat_m    = re.search(r'^category:\s*["\']?([^"\'\n]+)["\']?', text, re.MULTILINE)
            category = cat_m.group(1).strip() if cat_m else 'tech'
            title_m  = re.search(r'^title:\s*"([^"]+)"', text, re.MULTILINE)
            title    = title_m.group(1) if title_m else md.stem
            hero     = pollinations_url(title, category, md.stem)
            set_from_ai += 1

        new_text = add_hero_image_to_frontmatter(text, hero)
        md.write_text(new_text, encoding='utf-8')

    total = len(posts)
    print(f'Total posts          : {total}')
    print(f'Already had heroImage: {skip}')
    print(f'Set from article img : {set_from_content}')
    print(f'Set via Pollinations : {set_from_ai}')
    print(f'Total updated        : {set_from_content + set_from_ai}')

if __name__ == '__main__':
    main()
