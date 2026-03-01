/**
 * backup-wp-images.mjs
 *
 * 從備份的 WordPress 站台下載所有圖片，並更新 blog 文章中所有的 WordPress 圖片 URL：
 *   - frontmatter heroImage 欄位
 *   - 內文中的 Markdown 圖片語法 ![alt](url)
 *   - 內文中的 protocol-relative URL（//lennychen.com/...）
 *   - 內文中的絕對 URL（https://lennychen.com/...）
 *
 * 使用方式：
 *   node scripts/backup-wp-images.mjs
 *
 * 環境要求：Node.js 18+
 */

import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import http from 'node:http';

// ── 設定 ──────────────────────────────────────────────────────────────────
const BACKUP_IP       = '35.236.161.74';     // 備份 WordPress 站台 IP
const WP_HOST         = 'lennychen.com';     // 原始 WordPress 網域
const CONTENT_DIR     = './src/content/blog';
const PUBLIC_IMG_DIR  = './public/wp-images';
const PUBLIC_IMG_PATH = '/wp-images';
const CONCURRENCY     = 5;
// ─────────────────────────────────────────────────────────────────────────

// 比對所有 WordPress 圖片 URL，包含 https:// 和 // 開頭
// 擷取 group 1 = /wp-content/uploads/... 路徑部分
const WP_URL_RE = /(?:https?:)?\/\/lennychen\.com(\/wp-content\/uploads\/[^\s)"'<>\]]+)/g;

// ── 工具函式 ──────────────────────────────────────────────────────────────

async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(e =>
      e.isDirectory()
        ? getAllFiles(path.join(dir, e.name))
        : [path.join(dir, e.name)]
    )
  );
  return nested.flat().filter(f => /\.(md|mdx)$/.test(f));
}

function wpPathToLocal(wpPath) {
  // /wp-content/uploads/2024/01/foo.png  →  /wp-images/2024/01/foo.png
  const relative = wpPath.replace('/wp-content/uploads', '');
  const destPath = path.join(PUBLIC_IMG_DIR, relative);
  const newUrl   = `${PUBLIC_IMG_PATH}${relative}`;
  return { destPath, newUrl };
}

function downloadImage(wpPath, destPath) {
  return new Promise(async (resolve, reject) => {
    await mkdir(path.dirname(destPath), { recursive: true });

    const tryFetch = (protocol, host, pathname, headers) =>
      new Promise((res, rej) => {
        const mod = protocol === 'https' ? https : http;
        const req = mod.get(
          { hostname: host, path: pathname, headers, rejectUnauthorized: false },
          response => {
            if (response.statusCode === 301 || response.statusCode === 302) {
              const loc = response.headers.location;
              if (!loc) return rej(new Error('Redirect missing location'));
              const u = new URL(loc);
              // Follow redirect back through the backup IP
              tryFetch('http', BACKUP_IP, u.pathname + u.search, { Host: WP_HOST })
                .then(res).catch(rej);
              return;
            }
            if (response.statusCode !== 200)
              return rej(new Error(`HTTP ${response.statusCode}`));
            const chunks = [];
            response.on('data', c => chunks.push(c));
            response.on('end', () => res(Buffer.concat(chunks)));
          }
        );
        req.on('error', rej);
      });

    try {
      const buf = await tryFetch('http', BACKUP_IP, wpPath, { Host: WP_HOST });
      await writeFile(destPath, buf);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

async function* chunkify(arr, size) {
  for (let i = 0; i < arr.length; i += size)
    yield arr.slice(i, i + size);
}

// ── 主程式 ───────────────────────────────────────────────────────────────

const files = await getAllFiles(CONTENT_DIR);
console.log(`掃描 ${files.length} 篇文章中的 WordPress 圖片 URL ...\n`);

// 第一步：收集所有需要下載的唯一 wpPath
const wpPathSet = new Set();
const fileContents = new Map(); // file → original content

for (const file of files) {
  const content = await readFile(file, 'utf8');
  fileContents.set(file, content);

  for (const match of content.matchAll(WP_URL_RE)) {
    wpPathSet.add(match[1]); // /wp-content/uploads/...
  }
}

const allWpPaths = [...wpPathSet];
console.log(`發現 ${allWpPaths.length} 張不重複的 WordPress 圖片\n`);

// 第二步：下載圖片（去重 + 並發）
let ok = 0, skip = 0, fail = 0;
const failedPaths = new Set();

for await (const batch of chunkify(allWpPaths, CONCURRENCY)) {
  await Promise.all(
    batch.map(async wpPath => {
      const { destPath } = wpPathToLocal(wpPath);

      if (existsSync(destPath)) {
        skip++;
        process.stdout.write(`  [skip] ${path.basename(destPath)}\n`);
        return;
      }

      try {
        await downloadImage(wpPath, destPath);
        ok++;
        process.stdout.write(`  [ok]   ${path.basename(destPath)}\n`);
      } catch (e) {
        fail++;
        failedPaths.add(wpPath);
        process.stdout.write(`  [fail] ${path.basename(destPath)}: ${e.message}\n`);
      }
    })
  );
}

console.log(`\n下載完成：${ok} 成功 / ${skip} 已存在 / ${fail} 失敗\n`);

// 第三步：替換所有文章中的 WordPress URL（成功下載的才替換）
let filesUpdated = 0;
let urlsReplaced = 0;

for (const [file, original] of fileContents) {
  // 只替換成功下載（或已存在）的圖片
  const updated = original.replace(WP_URL_RE, (_, wpPath) => {
    if (failedPaths.has(wpPath)) return _; // 下載失敗的保留原 URL
    const { newUrl } = wpPathToLocal(wpPath);
    urlsReplaced++;
    return newUrl;
  });

  if (updated !== original) {
    await writeFile(file, updated, 'utf8');
    filesUpdated++;
    console.log(`  [updated] ${path.relative('.', file)}`);
  }
}

console.log(`\n完成！`);
console.log(`  更新文章：${filesUpdated} 篇`);
console.log(`  替換 URL：${urlsReplaced} 個`);
if (fail > 0) {
  console.log(`\n  ⚠ ${fail} 張圖片下載失敗，已保留原始 URL。`);
  console.log(`  失敗清單：`);
  for (const p of failedPaths) console.log(`    - https://lennychen.com${p}`);
}
console.log(`\n圖片存放在 public/wp-images/，commit 時記得一起加入。`);
