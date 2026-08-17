export interface Certificate {
  /** Korte tekstuele badge — bewust géén nagemaakt logo. */
  abbr: string;
  title: string;
  description: string;
}

/**
 * Certificaten.
 *
 * Let op: hier staan uitsluitend de aangeleverde certificaten. Er worden geen
 * logo-afbeeldingen nagemaakt; de badges zijn tekstueel vormgegeven.
 *
 * TODO (logo's): zodra officiële logo-assets beschikbaar zijn, kunnen deze in
 * `src/assets/` geplaatst en in `Certificates.astro` ingeladen worden.
 */
export const certificates: Certificate[] = [
  {
    abbr: 'VCA',
    title: 'VCA gecertificeerd',
    description:
      'Werken volgens de veiligheidsregels die opdrachtgevers in de bouw en infra hanteren.',
  },
  {
    abbr: 'GIB',
    title: 'GIB certificaat',
    description: 'Aanvullende vakinhoudelijke certificering voor werkzaamheden op locatie.',
  },
];
