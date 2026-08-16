export interface Certificate {
  /** Korte tekstuele badge — bewust geen nagemaakte logo's. */
  abbreviation: string;
  title: string;
  description: string;
}

/**
 * Uitsluitend bevestigde certificaten.
 * Voeg hier niets aan toe zonder bevestiging vanuit het bedrijf.
 *
 * TODO: zodra officiële logo-assets beschikbaar zijn, kunnen deze
 * in `src/assets/` geplaatst en in `Certificates.astro` ingeladen worden.
 */
export const certificates: Certificate[] = [
  {
    abbreviation: 'VCA',
    title: 'VCA gecertificeerd',
    description:
      'Werken volgens de VCA-uitgangspunten voor veiligheid, gezondheid en milieu op de werkplek.',
  },
  {
    abbreviation: 'GIB',
    title: 'GIB certificaat',
    description: 'Aanvullende vakgerichte certificering voor het werken in de grond- en bouwsector.',
  },
];
