/**
 * Genereert de statische afbeeldingsassets in /public vanuit SVG-bronnen.
 *
 * Uitvoeren met:  node scripts/generate-assets.mjs
 *
 * Gebruikt `sharp`, dat al met Astro meekomt. Draai dit script opnieuw
 * wanneer de merkkleuren of de teksten in de Open Graph-afbeelding wijzigen.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const INK = '#16171a';
const ACCENT = '#c2540a';
const FONT = 'Helvetica, Arial, sans-serif';

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${INK}"/>
  <rect x="0" y="52" width="64" height="12" fill="${ACCENT}"/>
  <text x="32" y="42" text-anchor="middle" font-family="${FONT}" font-size="36" font-weight="700" fill="#ffffff">B</text>
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d1f24"/>
      <stop offset="60%" stop-color="#101114"/>
      <stop offset="100%" stop-color="#17181c"/>
    </linearGradient>
    <linearGradient id="glow" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="606" width="1200" height="24" fill="${ACCENT}"/>
  <rect x="80" y="72" width="72" height="72" rx="16" fill="#ffffff"/>
  <text x="116" y="122" text-anchor="middle" font-family="${FONT}" font-size="42" font-weight="700" fill="${INK}">B</text>
  <text x="172" y="103" font-family="${FONT}" font-size="30" font-weight="600" fill="#ffffff">Burleson</text>
  <text x="172" y="132" font-family="${FONT}" font-size="17" font-weight="500" letter-spacing="3" fill="#9a9da4">HANDYMAN INSTALLATION</text>
  <text x="80" y="300" font-family="${FONT}" font-size="76" font-weight="700" fill="#ffffff">Vakwerk. Op tijd.</text>
  <text x="80" y="386" font-family="${FONT}" font-size="76" font-weight="700" fill="#ffffff">Afspraak is afspraak.</text>
  <text x="80" y="458" font-family="${FONT}" font-size="30" font-weight="500" fill="#b8bbc2">Grondwerk &#183; Transport &#183; Machinewerk &#183; Straatwerk</text>
  <text x="80" y="540" font-family="${FONT}" font-size="25" font-weight="600" fill="#f0a267">Aalten, Gelderland &#183; VCA &amp; GIB gecertificeerd</text>
</svg>`;

const targets = [
  { svg: iconSvg, file: 'apple-touch-icon.png', size: 180, background: INK },
  { svg: iconSvg, file: 'favicon-32.png', size: 32, background: INK },
  { svg: iconSvg, file: 'icon-192.png', size: 192, background: INK },
  { svg: iconSvg, file: 'icon-512.png', size: 512, background: INK },
];

for (const target of targets) {
  const buffer = await sharp(Buffer.from(target.svg))
    .resize(target.size, target.size, { fit: 'contain', background: target.background })
    .png()
    .toBuffer();
  await writeFile(path.join(publicDir, target.file), buffer);
  console.log(`✓ ${target.file}`);
}

const ogBuffer = await sharp(Buffer.from(ogSvg)).png({ quality: 90 }).toBuffer();
await writeFile(path.join(publicDir, 'og-image.png'), ogBuffer);
console.log('✓ og-image.png');
