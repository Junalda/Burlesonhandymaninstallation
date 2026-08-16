interface ImportMetaEnv {
  /**
   * Endpoint waar het contactformulier naartoe post.
   * Niet ingesteld = het formulier zet de aanvraag klaar in het
   * e-mailprogramma van de bezoeker (zie src/scripts/contact-form.ts).
   */
  readonly PUBLIC_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
