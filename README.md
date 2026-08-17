# Burleson Handyman Installation — website

One-page website voor **Burleson Handyman Installation** (Raylison Burleson, Aalten):
grondwerk, transport, kraan-, shovel- en straatwerk.

Gebouwd met [Astro](https://astro.build) — statische output, geen framework-runtime,
zeer weinig JavaScript.

## Aan de slag

```bash
npm install
npm run dev      # http://localhost:4321
```

| Commando          | Wat het doet                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Ontwikkelserver met live reload                     |
| `npm run build`   | Typecontrole (`astro check`) + productiebuild → `dist/` |
| `npm run preview` | De productiebuild lokaal bekijken                   |

## Projectstructuur

```
public/                    Statische bestanden (favicon, icons, og-image, robots.txt, manifest)
src/
  components/
    Header.astro           Sticky navigatie + mobiel menu
    Hero.astro             Hero met CTA's en trust-indicatoren
    Services.astro         Dienstenkaarten
    Benefits.astro         "Waarom Burleson" — werkwijze
    About.astro            De vakman achter het bedrijf
    Certificates.astro     VCA / GIB badges
    CtaBanner.astro        Donkere CTA-sectie
    Contact.astro          Contactgegevens + formulier
    ContactForm.astro      Formulier — alleen presentatie
    Footer.astro           Footer
    Button.astro           Herbruikbare knop (link of button)
    SectionHeading.astro   Eyebrow + kop + intro
    Logo.astro             Wordmerk
    Icon.astro / icons.ts  Inline lijniconen (geen icon-library)
    SEO.astro              Meta tags, Open Graph, Twitter, JSON-LD
  data/
    site.ts                Bedrijfsgegevens, navigatie, SEO-teksten
    services.ts            Diensten (voedt ook de keuzelijst in het formulier)
    benefits.ts            Werkwijze-punten
    certificates.ts        Certificaten
  layouts/BaseLayout.astro Basispagina met <head>, header en footer
  pages/
    index.astro            Homepage
    privacy.astro          Privacyverklaring
  scripts/
    reveal.ts              Subtiele fade-up bij scrollen
    contact-form.ts        Formulierlogica (validatie, verzenden, statussen)
  styles/global.css        Design tokens + globale stijlen
```

## Nog in te vullen

Alle punten hieronder staan als `TODO` in de code, met uitleg op de plek zelf.

### 1. Domein

`astro.config.mjs` → `SITE_URL` (of de omgevingsvariabele `SITE_URL`) en de
`Sitemap:`-regel in `public/robots.txt`. Deze waarde bepaalt de canonical URLs,
Open Graph tags en de sitemap.

### 2. Contactformulier koppelen

Het formulier is volledig werkend (validatie, foutmeldingen, laadtoestand,
honeypot), maar er is **nog geen verzendservice gekoppeld**. Zolang dat zo is,
wordt er niets verstuurd én wordt er geen succes voorgespiegeld: de aanvraag
wordt klaargezet in een vooringevulde e-mail, met een duidelijke melding.

Koppelen:

1. Zet `PUBLIC_CONTACT_ENDPOINT` in `.env` (zie `.env.example`).
2. De endpoint krijgt een `POST` met `Content-Type: application/json`:
   ```json
   { "naam": "", "bedrijfsnaam": "", "email": "", "telefoon": "", "type": "", "bericht": "" }
   ```
3. Antwoord met een 2xx-status bij succes.

Geschikte diensten: Formspree, Web3Forms, Netlify Forms, of een eigen serverless
function die via Resend/Postmark doorstuurt naar
`Burlesonhandymaninstallation@gmail.com`.

De logica staat in `src/scripts/contact-form.ts`, los van de opmaak in
`src/components/ContactForm.astro`.

### 3. Telefoonnummer en WhatsApp

Er is bewust geen nummer verzonnen. Zet `PUBLIC_PHONE` en/of `PUBLIC_WHATSAPP`
in `.env` (internationaal formaat zonder `+` of spaties, bijv. `31612345678`).
De bel- en WhatsApp-knoppen verschijnen dan automatisch in de header, hero,
CTA-sectie, contactsectie en de JSON-LD kan worden aangevuld.

### 4. Beeldmateriaal

Er is nog geen fotografie aangeleverd; de hero en het portret werken nu met een
eigen vormgegeven vlak. Toevoegen:

- **Hero:** `src/assets/hero.jpg` → zie de instructies bovenin `src/components/Hero.astro`
- **Portret:** `src/assets/raylison.jpg` → zie `src/components/About.astro`

Gebruik `astro:assets` (`<Image />`) zodat de afbeeldingen automatisch worden
geoptimaliseerd en lazy geladen.

### 5. Certificaatlogo's

De VCA- en GIB-badges zijn bewust tekstueel; er zijn geen logo's nagemaakt.
Zodra officiële assets beschikbaar zijn, kunnen ze in `Certificates.astro`
worden ingeladen.

## SEO & techniek

- Semantische HTML, één `<h1>`, logische kopstructuur
- Meta description, canonical, Open Graph en Twitter/X cards (`src/components/SEO.astro`)
- JSON-LD `ProfessionalService` met alleen bevestigde gegevens
  (naam, eigenaar, e-mail, adres, KVK, diensten) — geen verzonnen velden
- `sitemap-index.xml` via `@astrojs/sitemap`, plus `robots.txt`
- Favicon (SVG + PNG), apple-touch-icon, web app manifest, OG-afbeelding
- Systeemlettertypen: geen externe requests, geen layout shift
- JavaScript: alleen twee kleine modules (scroll-reveal en formulier)
- Toegankelijkheid: skip-link, zichtbare focusstates, tikdoelen ≥ 44px,
  `prefers-reduced-motion` wordt gerespecteerd, formulierfouten via `role="alert"`

## Hosting

De build is volledig statisch (`dist/`) en werkt op elke statische host —
Netlify, Vercel, Cloudflare Pages of gewone webhosting.

Vergeet niet `SITE_URL` (en eventueel `PUBLIC_CONTACT_ENDPOINT`, `PUBLIC_PHONE`,
`PUBLIC_WHATSAPP`) als omgevingsvariabelen in te stellen bij de hostingpartij.
