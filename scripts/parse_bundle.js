// Parse the JS bundle to extract the asset manifest + project list
const fs = require('fs');
const js = fs.readFileSync('/tmp/bundle.js', 'utf-8');

function findAllManifestBlocks(src) {
  const blocks = [];
  const marker = 'Object.assign({';
  let idx = 0;
  while ((idx = src.indexOf(marker, idx)) !== -1) {
    let depth = 0;
    let i = idx + marker.length - 1;
    let end = i;
    for (; i < src.length; i++) {
      const c = src[i];
      if (c === '{') depth++;
      else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
    }
    blocks.push(src.slice(idx + marker.length - 1, end));
    idx = end + 1;
  }
  return blocks;
}

const blocks = findAllManifestBlocks(js);
const manifestEntries = [];
for (const block of blocks) {
  const re = /"([^"]+)":\s*([A-Za-z_$][A-Za-z0-9_$]*)/g;
  let m;
  while ((m = re.exec(block))) manifestEntries.push({ srcPath: m[1], ident: m[2] });
}

const idents = new Set(manifestEntries.map(e => e.ident));
const idValues = {};
const directRe = /([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*"(\/assets\/[^"]+)"/g;
let m;
while ((m = directRe.exec(js))) if (idents.has(m[1])) idValues[m[1]] = m[2];
let changed = true, pass = 0;
while (changed && pass < 5) {
  changed = false; pass++;
  const aliasRe = /([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*([A-Za-z_$][A-Za-z0-9_$]*)\b/g;
  let m2;
  while ((m2 = aliasRe.exec(js))) {
    const a = m2[1], b = m2[2];
    if (idents.has(a) && !idValues[a] && idValues[b]) { idValues[a] = idValues[b]; changed = true; }
  }
}

const pathToUrl = {};
for (const e of manifestEntries) {
  const url = idValues[e.ident];
  if (url) pathToUrl[e.srcPath] = url;
}

const projects = {};
for (const [srcPath, url] of Object.entries(pathToUrl)) {
  const m = srcPath.match(/^\/src\/assets\/images-optimized\/works\/([^/]+)\/([^/]+)\/(.+)$/);
  if (!m) continue;
  const [, category, projectName, fileName] = m;
  const key = `${category}/${projectName}`;
  if (!projects[key]) projects[key] = { category, projectName, media: [] };
  projects[key].media.push({ srcPath, url, fileName, isVideo: /\.(mp4|mov|webm)$/i.test(fileName) });
}

const projectList = Object.values(projects).map(p => {
  p.media.sort((a, b) => a.fileName.localeCompare(b.fileName, 'en', { numeric: true }));
  return p;
});
projectList.sort((a, b) => {
  if (a.category !== b.category) return a.category.localeCompare(b.category);
  return a.projectName.localeCompare(b.projectName, 'en', { numeric: true });
});

console.log('Projects:', projectList.length, '| Media:', projectList.reduce((s, p) => s + p.media.length, 0));
fs.writeFileSync('/tmp/bundle_parsed.json', JSON.stringify({ pathToUrl, projects: projectList }, null, 2));
