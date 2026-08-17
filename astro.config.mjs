// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: vervang `site` door het definitieve productie-domein zodra dit live gaat.
// Deze waarde wordt gebruikt voor canonical URLs, Open Graph tags en de sitemap.
const SITE_URL = process.env.SITE_URL ?? 'https://burlesonhandymaninstallation.nl';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // Volledig statische output = beste Core Web Vitals en simpele hosting
  // (Netlify, Vercel, Cloudflare Pages, of gewone static hosting).
  output: 'static',
  integrations: [
    sitemap({
      // De privacy-pagina mag geïndexeerd worden, maar heeft lage prioriteit.
      serialize(item) {
        if (item.url.endsWith('/privacy/')) {
          item.priority = 0.2;
        }
        return item;
      },
    }),
  ],
  image: {
    // Astro's ingebouwde image service optimaliseert lokale afbeeldingen
    // (src/assets/**) automatisch naar moderne formaten.
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  prefetch: false,
});
