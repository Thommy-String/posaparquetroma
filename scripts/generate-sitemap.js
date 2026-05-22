import { promises as fs } from 'fs';
import path from 'path';

const distRoot = path.resolve('dist');
const serviziRoot = path.join(distRoot, 'servizi');
const canonicalHost = 'https://www.posaparquetmilano.it/';

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectIndexFiles(dir) {
  const files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectIndexFiles(entryPath)));
    } else if (entry.isFile() && entry.name.toLowerCase() === 'index.html') {
      files.push(entryPath);
    }
  }

  return files;
}

function buildUrl(relativePath) {
  const cleaned = relativePath.replace(/index\.html$/i, '');
  const normalized = cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
  const url = new URL(normalized, canonicalHost);
  return url.toString();
}

// Landing page standalone (fuori da /servizi/) da includere nella sitemap
const EXTRA_LANDING_DIRS = ['posaparquet'];

async function generateSitemap() {
  const urls = [canonicalHost];
  let serviceCount = 0;

  if (await exists(serviziRoot)) {
    const indexFiles = await collectIndexFiles(serviziRoot);
    const serviceUrls = indexFiles
      .map((filePath) => path.relative(distRoot, filePath))
      .map((relative) => relative.replace(/\\/g, '/'))
      .map(buildUrl)
      .sort();

    urls.push(...serviceUrls);
    serviceCount = serviceUrls.length;
  }

  // Aggiungi landing page standalone
  for (const dir of EXTRA_LANDING_DIRS) {
    const landingIndex = path.join(distRoot, dir, 'index.html');
    if (await exists(landingIndex)) {
      const relative = path.relative(distRoot, landingIndex).replace(/\\/g, '/');
      urls.push(buildUrl(relative));
      serviceCount += 1;
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((loc) => `  <url><loc>${loc}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  await fs.mkdir(distRoot, { recursive: true });
  const sitemapPath = path.join(distRoot, 'sitemap.xml');
  await fs.writeFile(sitemapPath, xml, 'utf8');
  console.log(`[generate-sitemap] Sitemap aggiornata con ${serviceCount} URL servizi (${urls.length} totali).`);
}

generateSitemap().catch((error) => {
  console.error('[generate-sitemap] Errore durante la generazione della sitemap:', error);
  process.exitCode = 1;
});
