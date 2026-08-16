// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: vervang dit door het definitieve productiedomein zodra dit bekend is.
// Deze waarde wordt gebruikt voor de sitemap, canonical URL's en Open Graph URL's.
const SITE_URL = 'https://burlesonhandymaninstallation.nl';

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  build: {
    // Losse CSS-bestanden per pagina houden de eerste render licht.
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
