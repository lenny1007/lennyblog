#!/usr/bin/env python3
"""
Download all lennychen.com images to public/ folder.
Works whether Markdown still has full URLs or already has /wp-content/... paths.
"""

import os
import re
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests

BASE_DIR    = Path(__file__).parent.parent
CONTENT_DIR = BASE_DIR / 'src' / 'content' / 'blog'
PUBLIC_DIR  = BASE_DIR / 'public'
ORIGIN      = 'https://lennychen.com'

SESSION = requests.Session()
SESSION.headers.update({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 '
                  '(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Referer':    ORIGIN + '/',
    'Accept':     'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
})

# Match FULL URLs still in Markdown
FULL_RE = re.compile(r'!\[[^\]]*\]\((https?://lennychen\.com)(/wp-content/[^\s\)]+)\)')
# Match already-rewritten relative paths
REL_RE  = re.compile(r'!\[[^\]]*\]\((/wp-content/[^\s\)]+)\)')

def collect_paths() -> set[str]:
    """Return set of /wp-content/... paths to download."""
    paths: set[str] = set()
    for md in CONTENT_DIR.rglob('*.md'):
        text = md.read_text(encoding='utf-8')
        for m in FULL_RE.finditer(text):
            paths.add(m.group(2).split('?')[0])   # path only, no query
        for m in REL_RE.finditer(text):
            paths.add(m.group(1).split('?')[0])
    return paths

def rewrite_full_urls():
    """Replace http://lennychen.com/wp-content/... → /wp-content/... in all .md files."""
    updated = 0
    for md in CONTENT_DIR.rglob('*.md'):
        text = md.read_text(encoding='utf-8')
        new  = FULL_RE.sub(lambda m: m.group(0).replace(m.group(1), ''), text)
        if new != text:
            md.write_text(new, encoding='utf-8')
            updated += 1
    if updated:
        print(f'  Rewrote {updated} Markdown files (removed lennychen.com domain)')

def download(path: str) -> tuple[str, str]:
    dest = PUBLIC_DIR / path.lstrip('/')
    if dest.exists():
        return path, 'cached'
    dest.parent.mkdir(parents=True, exist_ok=True)
    url = ORIGIN + path
    try:
        r = SESSION.get(url, timeout=25, stream=True)
        if r.status_code == 200:
            with open(dest, 'wb') as f:
                for chunk in r.iter_content(8192):
                    f.write(chunk)
            return path, 'ok'
        return path, f'http-{r.status_code}'
    except Exception as e:
        return path, f'err-{type(e).__name__}'

def main():
    print('Step 1: Rewriting any remaining full URLs in Markdown …')
    rewrite_full_urls()

    print('Step 2: Collecting /wp-content/ paths from Markdown files …')
    paths = collect_paths()
    print(f'  Found {len(paths)} unique image paths')

    if not paths:
        print('Nothing to download.')
        return

    print(f'Step 3: Downloading ({len(paths)} files, 8 threads) …')
    stats = {'ok': 0, 'cached': 0, 'fail': 0}
    failed: list[str] = []
    done = 0

    with ThreadPoolExecutor(max_workers=8) as ex:
        futures = {ex.submit(download, p): p for p in paths}
        for fut in as_completed(futures):
            path, status = fut.result()
            done += 1
            if status == 'ok':      stats['ok']     += 1
            elif status == 'cached': stats['cached'] += 1
            else:
                stats['fail'] += 1
                failed.append(f'{status}  {path}')
            if done % 50 == 0 or done == len(paths):
                pct = done * 100 // len(paths)
                print(f'  [{pct:3d}%] {done}/{len(paths)}  '
                      f'ok={stats["ok"]}  cached={stats["cached"]}  fail={stats["fail"]}')

    print(f'\n✅ Done!')
    print(f'   Downloaded : {stats["ok"]}')
    print(f'   Cached     : {stats["cached"]}')
    print(f'   Failed     : {stats["fail"]}')

    if failed:
        log = BASE_DIR / 'scripts' / 'image_download_failures.txt'
        log.write_text('\n'.join(failed) + '\n', encoding='utf-8')
        print(f'\n⚠️  Failures saved to {log}')
        for line in failed[:5]:
            print(f'   {line}')
        if len(failed) > 5:
            print(f'   … and {len(failed)-5} more')

if __name__ == '__main__':
    main()
