// Usage: put your photos in public/images/source/ named
//   usman-shehu-zannur.(jpg|png|webp)   yahayah-adam.(jpg|png|webp)
// then run: npm run images
// Produces: <name>.jpg, <name>-480/-800/-1200.webp and <name>-og.jpg (1200x630 social card).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = 'public/images/source';
const out = 'public/images';
for (const name of ['usman-shehu-zannur', 'yahayah-adam']) {
  const file = fs.readdirSync(src).find((f) => f.toLowerCase().startsWith(name + '.'));
  if (!file) { console.warn(`Skipped ${name}: no file in ${src}`); continue; }
  const input = path.join(src, file);
  const portrait = (w) => sharp(input).rotate().resize(w, Math.round(w * 1.25), { fit: 'cover', position: 'attention' });
  await portrait(800).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}/${name}.jpg`);
  for (const w of [480, 800, 1200]) await portrait(w).webp({ quality: 80 }).toFile(`${out}/${name}-${w}.webp`);
  await sharp(input).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}/${name}-og.jpg`);
  console.log(`Optimized ${name}`);
}
console.log('Now set photoReady: true for each founder in src/data/site.ts');
