/**
 * Centrale bedrijfsgegevens.
 *
 * Alle componenten lezen hun bedrijfsinformatie hier vandaan, zodat een
 * wijziging (adres, e-mail, telefoonnummer) op één plek gebeurt.
 *
 * Er staan bewust GEEN verzonnen gegevens in dit bestand: geen telefoonnummer,
 * geen aantal projecten, geen jaren ervaring. Alleen wat is aangeleverd.
 */

export interface SiteContact {
  email: string;
  /** Leeg zolang er geen telefoonnummer is aangeleverd. */
  phone: string;
  /** Leeg zolang er geen WhatsApp-nummer is aangeleverd. */
  whatsapp: string;
}

export interface NavItem {
  label: string;
  href: string;
}

/** E-mailadres van het bedrijf. */
const EMAIL = 'Burlesonhandymaninstallation@gmail.com';

/**
 * Telefoon en WhatsApp zijn (nog) niet aangeleverd.
 *
 * TODO (telefoon/WhatsApp): zet `PUBLIC_PHONE` en/of `PUBLIC_WHATSAPP` in `.env`
 * — internationaal formaat zonder + of spaties, bijvoorbeeld `31612345678`.
 * Zodra een waarde is ingevuld verschijnen de bel- en WhatsApp-knoppen
 * automatisch in de header, hero, CTA-sectie, contactsectie en footer.
 * Er wordt nergens een nummer verzonnen zolang deze leeg zijn.
 */
const PHONE = import.meta.env.PUBLIC_PHONE ?? '';
const WHATSAPP = import.meta.env.PUBLIC_WHATSAPP ?? '';

export const site = {
  name: 'Burleson Handyman Installation',
  /** Korte variant voor plekken met weinig ruimte (mobiele header, footer). */
  shortName: 'Burleson',
  owner: 'Raylison Burleson',
  founded: 2024,
  kvk: '99551500',
  legalForm: 'Eenmanszaak',

  address: {
    street: 'Prinsenstraat 18 A',
    postalCode: '7121 AG',
    city: 'Aalten',
    region: 'Gelderland',
    country: 'Nederland',
    countryCode: 'NL',
  },

  contact: {
    email: EMAIL,
    phone: PHONE,
    whatsapp: WHATSAPP,
  } satisfies SiteContact,

  seo: {
    title: 'Burleson Handyman Installation | Grondwerk, Transport & Machinewerk',
    description:
      'Burleson Handyman Installation ondersteunt opdrachtgevers met grondwerk, transport, kraanwerk, shovelwerk en straatwerk. Betrouwbaar, punctueel en professioneel inzetbaar vanuit Aalten.',
    /** Wordt gebruikt voor Open Graph / Twitter cards. */
    ogImage: '/og-image.png',
    locale: 'nl_NL',
    lang: 'nl',
  },

  nav: [
    { label: 'Diensten', href: '#diensten' },
    { label: 'Over ons', href: '#over-ons' },
    { label: 'Certificaten', href: '#certificaten' },
    { label: 'Contact', href: '#contact' },
  ] satisfies NavItem[],
} as const;

/** `mailto:`-link met vooringevuld onderwerp. */
export const mailtoLink = `mailto:${site.contact.email}?subject=${encodeURIComponent(
  'Aanvraag via website',
)}`;

/** `tel:`-link, of `null` zolang er geen nummer bekend is. */
export const telLink = site.contact.phone ? `tel:+${site.contact.phone}` : null;

/** WhatsApp-link, of `null` zolang er geen nummer bekend is. */
export const whatsappLink = site.contact.whatsapp
  ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
      'Hallo Raylison, ik heb een vraag over een opdracht.',
    )}`
  : null;

/** Adres op één regel, o.a. voor de footer. */
export const addressOneLine = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
