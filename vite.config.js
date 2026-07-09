import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const asyncStylesheetPlugin = () => ({
  name: 'async-stylesheet-plugin',
  apply: 'build',
  enforce: 'post',
  transformIndexHtml(html) {
    const stylesheetPattern = /<link rel="stylesheet"([^>]*?)href="([^"]+\.css)"([^>]*?)>/;
    const match = html.match(stylesheetPattern);

    if (!match) return html;

    const [, beforeHref, href, afterHref] = match;
    const asyncCssBlock = [
      '<script>window.__appCssReady=new Promise(function(resolve){window.__resolveAppCss=resolve;});</script>',
      `<link rel="preload" as="style"${beforeHref}href="${href}"${afterHref} onload="this.onload=null;this.rel='stylesheet';window.__resolveAppCss&&window.__resolveAppCss()">`,
      `<noscript><link rel="stylesheet"${beforeHref}href="${href}"${afterHref}></noscript>`,
    ].join('');

    return html.replace(stylesheetPattern, asyncCssBlock);
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), asyncStylesheetPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom') || id.includes('/react/')) return 'react-core';
          if (id.includes('react-router')) return 'router';
          if (id.includes('react-helmet-async')) return 'helmet';
          if (id.includes('lucide-react')) return 'icons';
          return 'vendor';
        },
      },
    },
  },
})
