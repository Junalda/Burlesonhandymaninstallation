# Burleson Handyman Installation — website

One-page website voor **Burleson Handyman Installation**: grondwerk, transport, kraanwerk,
shovelwerk, straatwerk en pakkettentransport vanuit Aalten (Gelderland).

Gebouwd met [Astro](https://astro.build), zonder frontend-framework en met minimale JavaScript.

## Aan de slag

```bash
npm install
npm run dev      # http://localhost:4321
```

| Script            | Wat het doet                                              |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Ontwikkelserver met hot reload                             |
| `npm run build`   | Typecontrole (`astro check`) + productiebuild naar `dist/` |
| `npm run preview` | Lokale preview van de productiebuild                       |

## Projectstructuur

```
public/                     Statische bestanden (favicons, og-image, robots.txt, manifest)
scripts/generate-assets.mjs Genereert favicons + Open Graph-afbeelding
src/
├── components/
│   ├── Header.astro        Sticky navigatie + mobiel menu
│   ├── Hero.astro          Hero met CTA's en trust-indicatoren
│   ├── Services.astro      Dienstenoverzicht (kaarten)
│   ├── Benefits.astro      "Waarom Burleson" — werkwijze
│   ├── About.astro         Over Raylison Burleson
│   ├── Certificates.astro  VCA- en GIB-badges
│   ├── CtaBanner.astro     Donkere CTA-sectie
│   ├── Contact.astro       Contactgegevens + formulier
│   ├── ContactForm.astro   Presentatie van het formulier
│   ├── Footer.astro        Footer
│   ├── Button.astro        Herbruikbare knop (link of button)
│   ├── Icon.astro          Inline SVG-iconen
│   ├── Logo.astro          Woordmerk
│   ├── Seo.astro           Meta-, Open Graph- en Twitter-tags
│   └── StructuredData.astro  JSON-LD (schema.org)
├── data/                   Herbruikbare datastructuren (zie hieronder)
├── layouts/BaseLayout.astro
├── pages/                  index, privacy, 404
├── scripts/contact-form.ts Validatie- en verzendlogica van het formulier
└── styles/global.css       Designsysteem (kleuren, typografie, knoppen, kaarten)
```

## Inhoud aanpassen

Bijna alle teksten en gegevens staan in `src/data/`:

- **`site.ts`** — bedrijfsnaam, eigenaar, KvK, e-mail, adres, SEO-titel en -omschrijving.
- **`services.ts`** — de diensten. Deze lijst vult zowel de dienstenkaarten als de
  keuzelijst "Type werkzaamheden" in het contactformulier.
- **`benefits.ts`** — de punten in de sectie "Waarom Burleson Handyman Installation?".
- **`certificates.ts`** — VCA en GIB.
- **`navigation.ts`** — menu- en footerlinks.

## Telefoon en WhatsApp

Beide staan in `src/data/site.ts` en gebruiken hetzelfde nummer:

```ts
phone: '06 57 92 03 03',        // zoals getoond op de site
phoneInternational: '+31657920303', // voor de tel:-link en schema.org
whatsapp: '31657920303',        // wa.me-formaat: zonder + en zonder spaties
```

Wijzig het nummer op deze ene plek; header, CTA-sectie, contactsectie, footer en de
gestructureerde data volgen automatisch. Zet een waarde op `null` om de bijbehorende knoppen
te verbergen.

De WhatsApp-knop in de header wordt op schermen smaller dan 900 px compact (alleen het icoon)
en blijft ook op mobiel zichtbaar, zodat bezoekers die via WhatsApp of een doorverwijzing
binnenkomen overal op de pagina met één tik kunnen reageren.

## Openstaande integratiepunten (TODO)

### 1. Backend voor het contactformulier

Het formulier valideert en verstuurt, maar er is **nog geen verzendservice gekoppeld**. Zolang
dat zo is, wordt er géén verzending voorgespiegeld: de aanvraag wordt klaargezet in het
e-mailprogramma van de bezoeker, met de melding dat de e-mail nog verstuurd moet worden.

Koppel een endpoint via `.env` (zie `.env.example`):

```
PUBLIC_CONTACT_ENDPOINT=https://api.voorbeeld.nl/contact
```

Het endpoint ontvangt een `POST` met `Content-Type: application/json`:

```json
{
  "naam": "Jan de Vries",
  "bedrijfsnaam": "De Vries Infra BV",
  "email": "jan@devriesinfra.nl",
  "telefoon": "0612345678",
  "werkzaamheden": "kraanwerk",
  "bericht": "…",
  "werkzaamhedenLabel": "Kraanwerk"
}
```

Een `2xx`-antwoord toont het succespaneel; elke andere status toont een foutmelding met het
e-mailadres als alternatief. De logica staat in `src/scripts/contact-form.ts`.

Wil je het endpoint binnen dit project draaien, dan is een server-adapter nodig
(bijvoorbeeld `@astrojs/netlify`, `@astrojs/vercel` of `@astrojs/node`). Een minimale route
ziet er dan zo uit:

```ts
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  // TODO: hier de e-mail daadwerkelijk versturen (bijv. Resend, Postmark of SMTP).
  // Geef pas een 2xx terug wanneer de verzending is gelukt.

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

Zet daarna `PUBLIC_CONTACT_ENDPOINT=/api/contact`.

### 2. Beeldmateriaal

Er is nog geen fotomateriaal aangeleverd. De hero en de over-ons-sectie zijn zo gebouwd dat ze
ook zonder foto af zijn. Toevoegen kan zonder herontwerp:

- **Hero** — plaats een foto in `src/assets/hero.jpg`; in `Hero.astro` staat bovenaan een
  becommentarieerd `<Image>`-blok dat het `.hero__canvas`-element vervangt.
- **Portret** — plaats een foto in `src/assets/raylison.jpg`; zie het vergelijkbare blok in
  `About.astro`.

Gebruik `astro:assets` (`<Image />`) zodat afbeeldingen automatisch worden geoptimaliseerd en
onder de vouw lui geladen worden.

### 3. Domein

Het domein staat op twee plekken en moet worden aangepast zodra het definitief is:

- `astro.config.mjs` (`SITE_URL` — bepaalt sitemap, canonical en Open Graph-URL's)
- `public/robots.txt` (regel `Sitemap:`)

### 4. Privacyverklaring

`src/pages/privacy.astro` beschrijft alleen wat de website nu daadwerkelijk doet. Laat de tekst
juridisch controleren en aanvullen zodra bekend is welke verwerkers (e-mail-, formulier- of
hostingpartij, statistieken) worden gebruikt.

## Techniek

- **Statische build** — geen server nodig; te hosten op elke statische host.
- **JavaScript** — circa 6 kB, volledig inline in de HTML; geen losse scriptrequests.
- **Toegankelijkheid** — semantische HTML, skip-link, zichtbare focusstates, tikdoelen van
  minimaal 44 px, tekstcontrast op AA-niveau, `prefers-reduced-motion` wordt gerespecteerd.
  Inhoud blijft zichtbaar als JavaScript uitvalt: de scroll-animatie draait zichzelf dan terug.
- **SEO** — canonical, Open Graph, Twitter-kaart, sitemap (`@astrojs/sitemap`), `robots.txt`
  en JSON-LD (`ProfessionalService` + `WebSite`) met uitsluitend bevestigde gegevens.
- **Afbeeldingsassets** — favicons en de Open Graph-afbeelding worden gegenereerd met
  `node scripts/generate-assets.mjs`.

## Merkrichtlijnen

- Kleur: off-white en warm grijs, bijna-zwart voor tekst, één accentkleur (bouworanje `#c2540a`)
  voor CTA's, iconen en actieve states — bewust spaarzaam.
- Toon: direct, professioneel en praktisch. Geen loze claims: er staan bewust geen uitspraken
  over ervaringsjaren, klantaantallen of projecten op de site zolang die niet bevestigd zijn.
- Positionering: grondwerk, transport, machinewerk en projectondersteuning — niet klusjeswerk.
