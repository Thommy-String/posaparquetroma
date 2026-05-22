import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';
import { promises as fs } from 'fs';
import path from 'path';
import { StaticRouter } from 'react-router';
import { Routes, Route } from 'react-router-dom';

const canonicalBase = 'https://www.posaparquetmilano.it/servizi/';
const canonicalHome = 'https://www.posaparquetmilano.it/';
const servicesDir = path.resolve('src/pages/servizi');
const distDir = path.resolve('dist');
const distIndexPath = path.resolve('dist/index.html');
const distImgDir = path.resolve('dist/img');
const imageCopyMap = new Map();

function registerImageForCopy(imagePath) {
  if (!imagePath) return null;
  if (/^https?:\/\//i.test(imagePath) || imagePath.startsWith('//') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  if (imagePath.startsWith('/img/')) {
    return imagePath;
  }
  if (imagePath.startsWith('/src/')) {
    const relativePath = imagePath.replace(/^\/src\//, '');
    const sourcePath = path.resolve('src', relativePath);
    const fileName = path.basename(relativePath);
    const targetPublicPath = `/img/${fileName}`;
    const targetFilePath = path.join(distImgDir, fileName);
    imageCopyMap.set(sourcePath, targetFilePath);
    return targetPublicPath;
  }
  return imagePath;
}

function rewriteMarkupAssets(markup) {
  if (!markup) return markup;
  return markup.replace(/src="\/src\/assets\/([^"]+)"/g, (fullMatch, relativePath) => {
    const normalizedPath = relativePath.replace(/^\/+/, '');
    const sourcePath = path.resolve('src/assets', normalizedPath);
    const fileName = path.basename(normalizedPath);
    const targetPublicPath = `/img/${fileName}`;
    const targetFilePath = path.join(distImgDir, fileName);
    imageCopyMap.set(sourcePath, targetFilePath);
    return `src="${targetPublicPath}"`;
  });
}

function sanitizeService(service) {
  const clone = JSON.parse(JSON.stringify(service));
  // Manteniamo pricingId per permettere a ServicePainVsSolution e altri componenti di funzionare
  // clone.pricingId = null;

  if (clone.hero?.image) {
    clone.hero.image = registerImageForCopy(clone.hero.image);
  }

  clone.sections = (clone.sections ?? []).map((section) => {
    const updated = { ...section };
    if (updated.image) {
      updated.image = registerImageForCopy(updated.image);
    }
    return updated;
  });

  return clone;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function normalizeAssetHref(href) {
  if (!href) return null;
  if (/^https?:\/\//i.test(href) || href.startsWith('//')) {
    return href;
  }
  if (href.startsWith('./')) {
    return `/${href.slice(2)}`;
  }
  if (!href.startsWith('/')) {
    return `/${href}`;
  }
  return href;
}

async function getStylesheetHref() {
  try {
    const html = await fs.readFile(distIndexPath, 'utf8');
    const match = html.match(/<link\s+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/i);
    if (!match) return null;
    return normalizeAssetHref(match[1]);
  } catch (error) {
    console.warn('[render-servizi] Impossibile leggere il CSS da dist/index.html:', error.message);
    return null;
  }
}

async function getModuleScriptAttributes() {
  try {
    const html = await fs.readFile(distIndexPath, 'utf8');
    const match = html.match(
      /<script\s+[^>]*type=["']module["'][^>]*src=["']([^"']+)["'][^>]*><\/script>/i,
    );
    if (!match) return null;
    const src = normalizeAssetHref(match[1]);
    const hasCrossorigin = /crossorigin/i.test(match[0]);
    return { src, crossorigin: hasCrossorigin };
  } catch (error) {
    console.warn('[render-servizi] Impossibile leggere lo script da dist/index.html:', error.message);
    return null;
  }
}

async function generateStaticPages() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
    const { default: ServicePage } = await vite.ssrLoadModule('/src/pages/servizi/[slug].jsx');
    const { servicesData } = await vite.ssrLoadModule('/src/utils/servicesData.js');
    const stylesheetHref = await getStylesheetHref();
    const scriptAttributes = await getModuleScriptAttributes();

    const sanitizedServicesBySlug = {};
    for (const [slug, service] of Object.entries(servicesData)) {
      const sanitized = sanitizeService(service);
      sanitizedServicesBySlug[slug] = sanitized;
      servicesData[slug] = sanitized;
    }

    const sortedServices = Object.values(sanitizedServicesBySlug).sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );

    let generated = 0;

    for (const service of sortedServices) {
      const slug = service.slug;
      if (!slug) continue;

      const location = `/servizi/${slug}/`;
      const bodyMarkup = renderToString(
        React.createElement(
          StaticRouter,
          { location },
          React.createElement(
            Routes,
            null,
            React.createElement(
              Route,
              { path: '/', element: React.createElement(App) },
              React.createElement(Route, {
                index: true,
                element: React.createElement('div'),
              }),
              React.createElement(Route, {
                path: 'servizi/:slug',
                element: React.createElement(ServicePage),
              }),
            ),
          ),
        ),
      );
      const rewrittenMarkup = rewriteMarkupAssets(bodyMarkup);
      const pageTitle = service.pageTitle ?? service.hero?.h1 ?? 'Pro Casa Parquet';
      const metaDescription = service.metaDescription ?? '';
      const canonicalUrl = `${canonicalBase}${slug}/`;

      const html = [
        '<!DOCTYPE html>',
        '<html lang="it">',
        '<head>',
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        `  <title>${escapeHtml(pageTitle)}</title>`,
        metaDescription ? `  <meta name="description" content="${escapeHtml(metaDescription)}">` : '',
        `  <link rel="canonical" href="${canonicalUrl}">`,
        `  <link rel="prefetch" href="${canonicalHome}">`,
        stylesheetHref ? `  <link rel="stylesheet" href="${stylesheetHref}">` : '',
        scriptAttributes
          ? `  <script type="module"${scriptAttributes.crossorigin ? ' crossorigin' : ''} src="${scriptAttributes.src}"></script>`
          : '',
        '</head>',
        '<body>',
        `  <div id="root">${rewrittenMarkup}</div>`,
        '</body>',
        '</html>',
        '',
      ]
        .filter(Boolean)
        .join('\n');

      const targetDir = path.join(servicesDir, slug);
      await ensureDir(targetDir);
      await fs.writeFile(path.join(targetDir, 'index.html'), html, 'utf8');
      generated += 1;
    }

    if (imageCopyMap.size > 0) {
      await ensureDir(distImgDir);
      for (const [sourcePath, targetPath] of imageCopyMap.entries()) {
        await ensureDir(path.dirname(targetPath));
        await fs.copyFile(sourcePath, targetPath);
      }
    }

    // --- GENERA LANDING PAGE STANDALONE /posaparquet ---
    try {
      const { default: PosaParquetPage } = await vite.ssrLoadModule('/src/pages/PosaParquetPage.jsx');

      const landingLocation = '/posaparquet';
      const landingMarkup = renderToString(
        React.createElement(
          StaticRouter,
          { location: landingLocation },
          React.createElement(
            Routes,
            null,
            React.createElement(
              Route,
              { path: '/', element: React.createElement(App) },
              React.createElement(Route, {
                index: true,
                element: React.createElement('div'),
              }),
              React.createElement(Route, {
                path: 'posaparquet',
                element: React.createElement(PosaParquetPage),
              }),
            ),
          ),
        ),
      );
      const rewrittenLandingMarkup = rewriteMarkupAssets(landingMarkup);
      const landingTitle = 'Posa Parquet Prefinito a Milano | Preventivo Gratuito';
      const landingDescription = 'Posa parquet prefinito a Milano: incollaggio professionale, sopralluogo gratuito e prezzi trasparenti. Squadra specializzata di parquettisti a Milano e dintorni.';
      const landingCanonical = 'https://www.posaparquetmilano.it/posaparquet';

      const landingHtml = [
        '<!DOCTYPE html>',
        '<html lang="it">',
        '<head>',
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        `  <title>${escapeHtml(landingTitle)}</title>`,
        `  <meta name="description" content="${escapeHtml(landingDescription)}">`,
        `  <link rel="canonical" href="${landingCanonical}">`,
        `  <link rel="prefetch" href="${canonicalHome}">`,
        stylesheetHref ? `  <link rel="stylesheet" href="${stylesheetHref}">` : '',
        scriptAttributes
          ? `  <script type="module"${scriptAttributes.crossorigin ? ' crossorigin' : ''} src="${scriptAttributes.src}"></script>`
          : '',
        '</head>',
        '<body>',
        `  <div id="root">${rewrittenLandingMarkup}</div>`,
        '</body>',
        '</html>',
        '',
      ]
        .filter(Boolean)
        .join('\n');

      const landingDir = path.join(distDir, 'posaparquet');
      await ensureDir(landingDir);
      await fs.writeFile(path.join(landingDir, 'index.html'), landingHtml, 'utf8');
      generated += 1;
      console.log('[render-servizi] Landing page /posaparquet generata con successo');
    } catch (landingError) {
      console.warn('[render-servizi] Errore nella generazione della landing /posaparquet:', landingError.message);
    }

    // Copia immagini registrate per le landing pages
    if (imageCopyMap.size > 0) {
      await ensureDir(distImgDir);
      for (const [sourcePath, targetPath] of imageCopyMap.entries()) {
        try {
          await ensureDir(path.dirname(targetPath));
          await fs.copyFile(sourcePath, targetPath);
        } catch { /* già copiato */ }
      }
    }

    console.log(`[render-servizi] Generate ${generated} pagine statiche totali`);
  } finally {
    await vite.close();
  }
}

generateStaticPages().catch((error) => {
  console.error('[render-servizi] Errore durante la generazione delle pagine servizi:', error);
  process.exitCode = 1;
});
