/**
 * Minimalistische lijniconen (24x24, stroke-based).
 *
 * Inline SVG houdt het aantal requests laag en voorkomt layout shift.
 * Voeg nieuwe iconen toe door een entry aan `icons` toe te voegen —
 * het type `IconName` volgt automatisch.
 */
export const icons = {
  excavation: `<path d="M3 20.5h18"/><path d="M6.5 17.5h7l1.5-4.5h-10z"/><path d="M12.8 13 16 7"/><path d="M16 7 19.5 4.5"/>`,
  crane: `<path d="M8.5 20.5h7"/><path d="M12 20.5V5"/><path d="M3.5 5h17"/><path d="M12 5 8.5 9"/><path d="M6.5 5v3.5"/><path d="M5 8.5h3"/>`,
  loader: `<circle cx="7.4" cy="17.6" r="2.4"/><circle cx="15.4" cy="17.6" r="2.4"/><path d="M9.8 17.6h3.2"/><path d="M4.6 15.2v-3.1a1 1 0 0 1 1-1h4.1l1.8 2.7v1.4"/><path d="M12.4 12 18 9.2"/><path d="M18 7.8v6.4h3"/>`,
  paving: `<rect x="3" y="5" width="18" height="14" rx="1.6"/><path d="M3 12h18"/><path d="M9 5v7"/><path d="M15 12v7"/>`,
  truck: `<path d="M2.6 6h10.6v10H2.6z"/><path d="M13.2 9.6h3.5l2.7 2.9V16h-6.2z"/><circle cx="7" cy="18.4" r="2"/><circle cx="16.6" cy="18.4" r="2"/>`,
  package: `<path d="m12 2.9 8.4 4.2v9.8L12 21.1 3.6 16.9V7.1z"/><path d="m3.6 7.1 8.4 4.2 8.4-4.2"/><path d="M12 11.3v9.8"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.4 2.1"/>`,
  shield: `<path d="M12 2.9 4.6 6v5.5c0 4.4 3 8.2 7.4 9.6 4.4-1.4 7.4-5.2 7.4-9.6V6z"/><path d="m8.9 11.9 2.2 2.2 4-4.3"/>`,
  tools: `<path d="M15.9 3.6a5 5 0 0 0-6 6.5l-6.3 6.3a2 2 0 0 0 0 2.8l1.2 1.2a2 2 0 0 0 2.8 0l6.3-6.3a5 5 0 0 0 6.5-6l-3.1 3.1-2.7-.7-.7-2.7z"/>`,
  layers: `<path d="m12 3.2 8.4 4.3-8.4 4.3-8.4-4.3z"/><path d="m4.2 12 7.8 4 7.8-4"/><path d="m4.2 16.4 7.8 4 7.8-4"/>`,
  chat: `<path d="M20.5 12.4c0 4-3.8 7.2-8.5 7.2-1 0-2-.15-2.9-.42L3.5 21l1.5-4.1A6.8 6.8 0 0 1 3.5 12.4c0-4 3.8-7.2 8.5-7.2s8.5 3.2 8.5 7.2z"/>`,
  check: `<path d="m4.5 12.5 5 5 10-11"/>`,
  arrowRight: `<path d="M4.5 12h15"/><path d="m13 5.5 6.5 6.5-6.5 6.5"/>`,
  arrowDown: `<path d="M12 4.5v15"/><path d="m5.5 13 6.5 6.5 6.5-6.5"/>`,
  mail: `<rect x="2.8" y="5" width="18.4" height="14" rx="2.2"/><path d="m3.4 6.6 8.6 6 8.6-6"/>`,
  pin: `<path d="M19 10.4c0 5.2-7 11.1-7 11.1s-7-5.9-7-11.1a7 7 0 1 1 14 0z"/><circle cx="12" cy="10.2" r="2.6"/>`,
  phone: `<path d="M20.5 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.6 17.6 0 0 1-7.7-2.8 17.4 17.4 0 0 1-5.3-5.3A17.6 17.6 0 0 1 2.7 5.4a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.6c.1 1 .3 1.9.6 2.8a1.8 1.8 0 0 1-.4 1.9l-1.1 1.1a14 14 0 0 0 5.3 5.3l1.1-1.1a1.8 1.8 0 0 1 1.9-.4c.9.3 1.8.5 2.8.6a1.8 1.8 0 0 1 1.6 1.8z"/>`,
  whatsapp: `<path d="M20.6 11.8a8.5 8.5 0 0 1-12.6 7.5L3.5 20.6l1.4-4.4A8.5 8.5 0 1 1 20.6 11.8z"/><path d="M9.2 9.1c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.4.5c-.1.2-.2.3 0 .6a7 7 0 0 0 2.7 2.2c.3.1.4.1.6-.1l.5-.6c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.3.4.5a2 2 0 0 1-1.9 1.7 8 8 0 0 1-5-3.1 4.5 4.5 0 0 1-1-2.4c0-.8.3-1.5.9-2z"/>`,
  building: `<path d="M4 20.6V5.4A1.4 1.4 0 0 1 5.4 4h7.2A1.4 1.4 0 0 1 14 5.4v15.2"/><path d="M14 10h4.6A1.4 1.4 0 0 1 20 11.4v9.2"/><path d="M2.8 20.6h18.4"/><path d="M7 8h4M7 12h4M7 16h4M17 14h0M17 17.5h0"/>`,
  badge: `<circle cx="12" cy="9" r="6"/><path d="m8.4 14.2-1.2 7 4.8-2.6 4.8 2.6-1.2-7"/><path d="m9.8 9 1.6 1.6 3-3.2"/>`,
  menu: `<path d="M3.5 7h17"/><path d="M3.5 12h17"/><path d="M3.5 17h17"/>`,
  close: `<path d="m6 6 12 12"/><path d="m18 6-12 12"/>`,
  user: `<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>`,
} as const;

export type IconName = keyof typeof icons;
