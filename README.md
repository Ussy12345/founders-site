# Usman Shehu & Yahayah Adam: Founders' Website

React + TypeScript + Vite + Tailwind. Every page is prerendered to static HTML at build time, so Google sees full content, titles, meta tags and JSON-LD without running JavaScript. Deploys as a plain static site.

## Run locally
```bash
npm install
cp .env.example .env        # then edit VITE_SITE_URL to your real domain
npm run dev                 # development at http://localhost:5173
npm run typecheck           # optional TypeScript check
npm run build               # builds dist/ with prerendered pages, sitemap.xml, robots.txt
npm run preview             # serve dist/ locally
```

## Add the founder photos (when ready)
1. Copy the photos to `public/images/source/` as `usman-shehu-zannur.jpg` and `yahayah-adam.jpg` (png/webp also work).
2. `npm run images` (creates JPG, responsive WebP sizes and the 1200x630 social card).
3. In `src/data/site.ts`, set `photoReady: true` for each founder. Check the `photoAlt` text.
4. `npm run build` and redeploy. Photos then appear on the homepage, profiles, partnership page, Open Graph cards, JSON-LD and the image sitemap.

## Edit content
Everything is in `src/data/site.ts`: founders, ventures, projects, timeline, achievements, email, social links. Search the file for `TODO`.
- New venture: copy an entry in `ventures`, add its logo (`.png` + `.webp`) to `public/images/`.
- New project: copy an entry in `projects`.
- Timeline dates: fill in `date` on any milestone.
- Social links: add `{ label: 'LinkedIn', url: '...' }` to a founder's `socials` (also feeds `sameAs` in structured data). Add only accounts that are really yours.

## Deploy (any static host)
Set the environment variable `VITE_SITE_URL=https://your-domain.com`, build command `npm run build`, publish directory `dist`.
- **Cloudflare Pages / Netlify / Render Static Site**: connect the Git repo, use the settings above. `public/_headers` adds security and cache headers on Netlify and Cloudflare.
- **Vercel**: framework preset Vite, output directory `dist`.
- Use your own domain and serve it over HTTPS. Pick one of www or non-www and redirect the other to it.

## SEO setup
1. Make sure `VITE_SITE_URL` matches the final domain exactly before the production build.
2. Add real photos and real social profile links (the strongest identity signals).
3. Link to this site from Famzuk, RankRush and every social profile, and use the same names ("Usman Shehu", "Zannur", "Yahayah Adam") everywhere.

### Google Search Console
1. Open search.google.com/search-console and add your domain as a property.
2. Verify with the DNS TXT record (Domain property) or the HTML tag method (URL-prefix property: add the tag in `index.html` head, rebuild, deploy).
3. Sitemaps > submit `sitemap.xml`.
4. URL Inspection: inspect `/`, `/founders/usman-shehu`, `/founders/yahayah-adam`, `/our-partnership`, then Request indexing.

### Bing Webmaster Tools
Go to bing.com/webmasters, sign in, import from Search Console or verify manually, then submit `https://your-domain.com/sitemap.xml`.

Nobody can guarantee rankings, image results or a knowledge panel. This site provides the technical foundation; results depend on Google, over weeks to months.
