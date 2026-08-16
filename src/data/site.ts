/**
 * Centrale bedrijfsgegevens.
 *
 * Alle componenten lezen hun gegevens hier vandaan, zodat NAW-gegevens,
 * e-mailadres en SEO-teksten op één plek onderhouden worden.
 *
 * Uitsluitend bevestigde informatie opnemen — geen aannames over
 * ervaringsjaren, aantallen klanten of extra certificaten.
 */

export interface SiteAddress {
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  legalForm: string;
  owner: string;
  founded: string;
  kvk: string;
  email: string;
  /**
   * Telefoonnummer zoals het op de site getoond wordt.
   * Laat leeg (null) als er geen nummer is — verzin nooit een nummer.
   * De telefoon-CTA's verschijnen automatisch zodra dit is ingevuld.
   */
  phone: string | null;
  /**
   * Hetzelfde nummer in internationale notatie voor de `tel:`-link,
   * zodat bellen ook vanuit het buitenland werkt.
   */
  phoneInternational: string | null;
  /**
   * WhatsApp-nummer, internationaal zonder + en zonder spaties.
   * Zodra dit is ingevuld verschijnt de WhatsApp-CTA automatisch in de
   * header, de CTA-sectie en de contactsectie.
   */
  whatsapp: string | null;
  address: SiteAddress;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    locale: string;
    /** Bestand in /public — vervang door een echte og-afbeelding (1200x630). */
    ogImage: string;
  };
}

export const site: SiteConfig = {
  name: 'Burleson Handyman Installation',
  shortName: 'Burleson',
  legalForm: 'Eenmanszaak',
  owner: 'Raylison Burleson',
  founded: '2024',
  kvk: '99551500',
  email: 'Burlesonhandymaninstallation@gmail.com',
  phone: '06 57 92 03 03',
  phoneInternational: '+31657920303',
  whatsapp: '31657920303',
  address: {
    street: 'Prinsenstraat 18 A',
    postalCode: '7121 AG',
    city: 'Aalten',
    region: 'Gelderland',
    country: 'Nederland',
    countryCode: 'NL',
  },
  seo: {
    title: 'Burleson Handyman Installation | Grondwerk, Transport & Machinewerk',
    description:
      'Burleson Handyman Installation ondersteunt opdrachtgevers met grondwerk, transport, kraanwerk, shovelwerk en straatwerk. Betrouwbaar, punctueel en professioneel inzetbaar vanuit Aalten.',
    keywords: [
      'grondwerker Aalten',
      'grondwerk Aalten',
      'kraanmachinist',
      'shovelmachinist',
      'stratenmaker',
      'transport Aalten',
      'grondwerk Gelderland',
      'kraanmachinist Gelderland',
      'Burleson Handyman Installation',
    ],
    locale: 'nl_NL',
    // Gegenereerd met `node scripts/generate-assets.mjs`.
    // Vervang door een foto-gebaseerde variant zodra er beeldmateriaal is.
    ogImage: '/og-image.png',
  },
};

/** `mailto:`-link met vooringevulde onderwerpregel. */
export const mailtoLink = `mailto:${site.email}?subject=${encodeURIComponent(
  'Aanvraag via website — Burleson Handyman Installation',
)}`;

/** WhatsApp-link; `null` zolang er geen nummer bekend is. */
export const whatsappLink = site.whatsapp
  ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      'Goedendag Raylison, ik heb een vraag over een opdracht.',
    )}`
  : null;

/** Telefoonlink in internationale notatie; `null` zolang er geen nummer bekend is. */
export const telLink = site.phoneInternational
  ? `tel:${site.phoneInternational.replace(/[^\d+]/g, '')}`
  : null;

export const formattedAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
