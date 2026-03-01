/**
 * backup-wp-images.mjs
 *
 * 從備份的 WordPress 站台下載圖片並更新所有 blog 文章的 heroImage 路徑。
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
const BACKUP_IP       = '35.236.161.74';          // 備份 WordPress 站台 IP
const WP_HOST         = 'lennychen.com';           // 原始 WordPress 網域
const CONTENT_DIR     = './src/content/blog';      // blog markdown 目錄
const PUBLIC_IMG_DIR  = './public/wp-images';      // 圖片儲存目錄
const PUBLIC_IMG_PATH = '/wp-images';              // 網址前綴（Astro public/）
const CONCURRENCY     = 5;                         // 同時下載數量
// ─────────────────────────────────────────────────────────────────────────

const HERO_RE = /^(heroImage:\s*")https?:\/\/lennychen\.com(\/wp-content\/[^"]+)(")/m;

// 遞迴取得所有 md/mdx 檔案
async function getAllFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(e =>
      e.isDirectory()
        ? getAllFiles(path.join(dir, e.name))
        : [path.join(dir, e.name)]
    )
  );
  return files.flat().filter(f => /\.(md|mdx)$/.test(f));
}

// 下載單一圖片（透過 Host header 連到備份 IP）
function downloadImage(wpPath, destPath) {
  return new Promise(async (resolve, reject) => {
    // 確保目錄存在
    await mkdir(path.dirname(destPath), { recursive: true });

    const url = `http://${BACKUP_IP}${wpPath}`;
    const req = http.get(url, { headers: { Host: WP_HOST } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // WordPress 有時會 redirect 到 https
        const loc = res.headers.location;
        if (!loc) return reject(new Error(`Redirect without location for ${url}`));
        const rUrl = new URL(loc);
        const rReq = https.get(
          `https://${BACKUP_IP}${rUrl.pathname}${rUrl.search}`,
          { headers: { Host: WP_HOST }, rejectUnauthorized: false },
          rRes => {
            if (rRes.statusCode !== 200)
              return reject(new Error(`HTTP ${rRes.statusCode} for ${url}`));
            const chunks = [];
            rRes.on('data', c => chunks.push(c));
            rRes.on('end', async () => {
              await writeFile(destPath, Buffer.concat(chunks));
              resolve();
            });
          }
        );
        rReq.on('error', reject);
        return;
      }
      if (res.statusCode !== 200)
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', async () => {
        await writeFile(destPath, Buffer.concat(chunks));
        resolve();
      });
    });
    req.on('error', reject);
  });
}

// 並發控制器
async function* chunkify(arr, size) {
  for (let i = 0; i < arr.length; i += size)
    yield arr.slice(i, i + size);
}

// ── 主程式 ───────────────────────────────────────────────────────────────
const files = await getAllFiles(CONTENT_DIR);
console.log(`找到 ${files.length} 篇文章，掃描 heroImage ...`);

// 第一步：掃描所有需要更新的檔案
const tasks = []; // { file, wpPath, destPath, newUrl }
for (const file of files) {
  const content = await readFile(file, 'utf8');
  const match = content.match(HERO_RE);
  if (!match) continue;

  const wpPath  = match[2];                                           // /wp-content/uploads/...
  const filename = path.basename(wpPath);
  const subDir   = path.dirname(wpPath).replace('/wp-content/uploads', '');
  const destPath = path.join(PUBLIC_IMG_DIR, subDir, filename).replace(/\/\//g, '/');
  const newUrl   = `${PUBLIC_IMG_PATH}${subDir}/${filename}`.replace(/\/\//g, '/');

  tasks.push({ file, wpPath, destPath, newUrl, content });
}

console.log(`需要備份的圖片：${tasks.length} 張\n`);

// 第二步：下載圖片（去重 + 並發）
const seen = new Set();
const toDownload = tasks.filter(t => {
  if (seen.has(t.wpPath)) return false;
  seen.add(t.wpPath);
  return true;
});

let ok = 0, skip = 0, fail = 0;

for await (const batch of chunkify(toDownload, CONCURRENCY)) {
  await Promise.all(
    batch.map(async ({ wpPath, destPath }) => {
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
        process.stdout.write(`  [fail] ${path.basename(destPath)}: ${e.message}\n`);
      }
    })
  );
}

console.log(`\n下載完成：${ok} 成功 / ${skip} 已存在 / ${fail} 失敗\n`);

// 第三步：更新所有文章的 heroImage
let updated = 0;
for (const { file, newUrl, content } of tasks) {
  const newContent = content.replace(
    HERO_RE,
    (_, prefix, _wpPath, suffix) => `${prefix}${newUrl}${suffix}`
  );
  if (newContent !== content) {
    await writeFile(file, newContent, 'utf8');
    updated++;
    console.log(`  [updated] ${path.relative('.', file)}`);
  }
}

console.log(`\n完成！共更新 ${updated} 篇文章的 heroImage 路徑。`);
console.log(`圖片存放在 public/wp-images/ 目錄，commit 時記得一起加入。`);
