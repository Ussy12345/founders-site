// Runs after the client and SSR builds. Renders every route to real static HTML
// (with its own title, meta tags, JSON-LD and full content) so search engines
// do not depend on JavaScript. Also writes sitemap.xml and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = 'dist';
const { render, headTags, routes, sitemapEntries, SITE } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const page = (url) => template.replace('<!--head-tags-->', () => headTags(url)).replace('<!--app-html-->', () => render(url));

for (const r of routes) {
  const dir = r === '/' ? dist : path.join(dist, r);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(r));
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));

const x = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const today = new Date().toISOString().slice(0, 10);
const urls = sitemapEntries().map((e) =>
  `  <url>\n    <loc>${x(e.loc)}</loc>\n    <lastmod>${today}</lastmod>\n${[...new Set(e.images)].map((i) => `    <image:image><image:loc>${x(i)}</image:loc></image:image>\n`).join('')}  </url>`).join('\n');
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
fs.rmSync('dist-server', { recursive: true, force: true });

console.log(`Prerendered ${routes.length} pages + 404, sitemap.xml and robots.txt for ${SITE.url}`);
if (SITE.url.includes('YOUR-DOMAIN')) console.warn('WARNING: VITE_SITE_URL is not set. Canonical URLs and sitemap use a placeholder domain.');
