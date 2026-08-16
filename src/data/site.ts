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
   * TODO: vul in zodra er een zakelijk telefoonnummer beschikbaar is.
   * Laat leeg (null) als er geen nummer is — verzin nooit een nummer.
   * Zodra dit is ingevuld verschijnen de telefoon-CTA's automatisch.
   */
  phone: string | null;
  /**
   * TODO: vul in zodra WhatsApp gebruikt wordt.
   * Formaat: internationaal nummer zonder + of spaties, bijv. '31612345678'.
   * Zodra dit is ingevuld verschijnt de WhatsApp-CTA automatisch in de
   * CTA-sectie, de header en de contactsectie.
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
  phone: null,
  whatsapp: null,
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

/** Telefoonlink; `null` zolang er geen nummer bekend is. */
export const telLink = site.phone ? `tel:${site.phone.replace(/[^\d+]/g, '')}` : null;

export const formattedAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
