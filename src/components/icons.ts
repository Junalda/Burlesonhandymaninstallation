/**
 * Iconenset — minimale lijniconen, inline als SVG.
 *
 * Bewust geen icon-library: dit scheelt een dependency en een netwerkrequest,
 * en houdt de bundle op nul kilobyte JavaScript.
 *
 * Alle iconen zijn getekend op een 24×24 viewBox en gebruiken `currentColor`,
 * zodat ze de tekstkleur van hun context overnemen.
 */

export interface IconDefinition {
  /** De inhoud van de <svg> (paths, rects, circles). */
  body: string;
  /** Iconen die met vulling werken i.p.v. lijnen. */
  filled?: boolean;
}

const iconMap = {
  /* --- Diensten ---------------------------------------------------------- */
  excavator: {
    body: `<path d="M2 17.5h20" /><path d="M4.5 21h15" /><path d="M7 14V6.9a1 1 0 0 1 1.6-.8L15 10.7" /><path d="M11.5 14H19a1 1 0 0 1 1 1v2.5h-9.5V15a1 1 0 0 1 1-1z" />`,
  },
  crane: {
    body: `<path d="M3 6.5h18" /><path d="M12 6.5V21" /><path d="M8.5 21h7" /><path d="M12 6.5 8 10.5" /><path d="M17.5 6.5v4" /><path d="M15.5 10.5h4v3.5h-4z" />`,
  },
  loader: {
    body: `<circle cx="7" cy="17.5" r="2.5" /><circle cx="15.5" cy="17.5" r="2.5" /><path d="M9.5 17.5h3.5" /><path d="M4.5 15V11h6l2.5 4" /><path d="M13 11.5 16.5 7" /><path d="M16.5 6.5h4V11h-4z" />`,
  },
  paving: {
    body: `<rect x="2.5" y="4.5" width="8.5" height="6" rx="1.2" /><rect x="13" y="4.5" width="8.5" height="6" rx="1.2" /><rect x="2.5" y="13.5" width="8.5" height="6" rx="1.2" /><rect x="13" y="13.5" width="8.5" height="6" rx="1.2" />`,
  },
  truck: {
    body: `<path d="M3 6.5h10.5v10H3z" /><path d="M13.5 10h3.9a1 1 0 0 1 .8.4l2.4 3.2a1 1 0 0 1 .2.6v2.3h-7.3z" /><circle cx="7" cy="17.5" r="2" /><circle cx="17" cy="17.5" r="2" />`,
  },
  package: {
    body: `<path d="M12 2.8 3.5 7.4v9.2L12 21.2l8.5-4.6V7.4z" /><path d="M3.5 7.4 12 12l8.5-4.6" /><path d="M12 12v9.2" /><path d="m7.75 5.1 8.5 4.6" />`,
  },

  /* --- Voordelen --------------------------------------------------------- */
  clock: {
    body: `<circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.4 2" />`,
  },
  shield: {
    body: `<path d="M12 2.8 4.5 6v6c0 4.4 3.1 7.9 7.5 9.2 4.4-1.3 7.5-4.8 7.5-9.2V6z" /><path d="m8.8 11.9 2.3 2.3 4.1-4.4" />`,
  },
  tools: {
    body: `<path d="M16.4 3.2a5.5 5.5 0 0 0-4.9 7.8l-7.6 7.6a1.85 1.85 0 0 0 2.6 2.6l7.6-7.6a5.5 5.5 0 0 0 7.8-4.9 5.5 5.5 0 0 0-.4-2l-3.2 3.2-2.9-2.9 3.2-3.2a5.5 5.5 0 0 0-2.2-.6z" />`,
  },
  grid: {
    body: `<rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />`,
  },
  chat: {
    body: `<path d="M20.5 12.4c0 4.1-3.8 7.4-8.5 7.4a9.8 9.8 0 0 1-2.6-.35L4 21.2l1.5-3.9A7 7 0 0 1 3.5 12.4C3.5 8.3 7.3 5 12 5s8.5 3.3 8.5 7.4z" />`,
  },

  /* --- Interface --------------------------------------------------------- */
  arrowRight: {
    body: `<path d="M4.5 12h14.5" /><path d="m13 6 6 6-6 6" />`,
  },
  arrowDown: {
    body: `<path d="M12 4.5v14.5" /><path d="m6 13 6 6 6-6" />`,
  },
  mail: {
    body: `<rect x="2.8" y="5" width="18.4" height="14" rx="2.4" /><path d="m3.5 7.5 7.3 5a2 2 0 0 0 2.4 0l7.3-5" />`,
  },
  mapPin: {
    body: `<path d="M12 21.5s7-5.9 7-11a7 7 0 1 0-14 0c0 5.1 7 11 7 11z" /><circle cx="12" cy="10.3" r="2.6" />`,
  },
  phone: {
    body: `<path d="M8 3.5H5.2A2.2 2.2 0 0 0 3 5.9c.5 8 6.1 13.6 14.1 14.1a2.2 2.2 0 0 0 2.4-2.2V15l-4.3-1.6-2 2a13.6 13.6 0 0 1-5.6-5.6l2-2z" />`,
  },
  check: {
    body: `<path d="m20 6.5-10.5 11L4 12" />`,
  },
  checkCircle: {
    body: `<circle cx="12" cy="12" r="9" /><path d="m8.3 12.2 2.6 2.6 4.8-5.3" />`,
  },
  alert: {
    body: `<circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.2" /><path d="M12 16.4h.01" />`,
  },
  menu: {
    body: `<path d="M3.5 6.5h17" /><path d="M3.5 12h17" /><path d="M3.5 17.5h17" />`,
  },
  close: {
    body: `<path d="m6 6 12 12" /><path d="m18 6-12 12" />`,
  },
  spinner: {
    body: `<path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5" />`,
  },

  /* --- Merk -------------------------------------------------------------- */
  whatsapp: {
    filled: true,
    body: `<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.24-8.25zM8.53 7.33c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.75 2.67 4.25 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.55-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.47z" />`,
  },
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof iconMap;

/** Alle iconen, uniform getypeerd zodat `filled` altijd uitleesbaar is. */
export const icons: Record<IconName, IconDefinition> = iconMap;
