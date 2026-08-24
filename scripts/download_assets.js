// Download all project media to /public/projects/{category}/{projectName}/{filename}
const fs = require('fs');
const path = require('path');
const https = require('https');

const SRC_BASE = 'https://noveld.com.et';
const DEST_BASE = '/home/z/my-project/public/projects';
const data = require('/tmp/bundle_parsed.json');
const realProjects = data.projects.filter(p => p.projectName !== 'New folder');

const queue = [];
for (const p of realProjects) {
  for (const m of p.media) {
    const fileName = path.basename(m.srcPath);
    const destDir = path.join(DEST_BASE, p.category, p.projectName);
    queue.push({ url: SRC_BASE + m.url, destPath: path.join(destDir, fileName), destDir, isVideo: m.isVideo, fileName });
  }
}
console.log('Queue size:', queue.length);
const dirs = new Set();
for (const q of queue) dirs.add(q.destDir);
for (const d of dirs) fs.mkdirSync(d, { recursive: true });

function downloadFile(url, destPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const file = fs.createWriteStream(destPath);
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return resolve(downloadFile(res.headers.location, destPath, redirectCount + 1));
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(destPath); } catch {}
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (e) => { try { fs.unlinkSync(destPath); } catch {} reject(e); });
    });
    req.on('error', (e) => { file.close(); try { fs.unlinkSync(destPath); } catch {} reject(e); });
    req.setTimeout(60000, () => { req.destroy(new Error('timeout')); try { fs.unlinkSync(destPath); } catch {} });
  });
}

const WORKERS = 8;
let cursor = 0, completed = 0, failed = 0, skipped = 0;
async function worker() {
  while (cursor < queue.length) {
    const job = queue[cursor++];
    try {
      const st = fs.statSync(job.destPath);
      if (st.size > 0) { skipped++; completed++; continue; }
    } catch {}
    try {
      await downloadFile(job.url, job.destPath);
      completed++;
      if (completed % 25 === 0 || completed === queue.length) {
        const pct = ((completed / queue.length) * 100).toFixed(1);
        process.stdout.write(`\r[${pct}%] ${completed}/${queue.length} done (${failed} failed, ${skipped} skipped)   `);
      }
    } catch (e) { failed++; }
  }
}

(async () => {
  const start = Date.now();
  await Promise.all(Array.from({ length: WORKERS }, worker));
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  let totalBytes = 0;
  for (const q of queue) { try { totalBytes += fs.statSync(q.destPath).size; } catch {} }
  console.log(`\nDone in ${elapsed}s | ${completed}/${queue.length} | Failed: ${failed} | Size: ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);

  const localManifest = realProjects.map(p => ({
    category: p.category,
    projectName: p.projectName,
    media: p.media.map(m => ({
      fileName: path.basename(m.srcPath),
      isVideo: m.isVideo,
      localPath: `/projects/${p.category}/${p.projectName}/${path.basename(m.srcPath)}`,
    })),
  }));
  fs.writeFileSync('/tmp/local_manifest.json', JSON.stringify(localManifest, null, 2));
})();
