/**
 * Contactformulier — logica.
 *
 * Gescheiden van de presentatie (`src/components/ContactForm.astro`):
 * dit bestand bevat uitsluitend validatie, verzending en toestandsbeheer.
 *
 * ---------------------------------------------------------------------------
 * BACKEND-INTEGRATIEPUNT
 * ---------------------------------------------------------------------------
 * Er is nog geen verzendservice gekoppeld. Zolang `PUBLIC_CONTACT_ENDPOINT`
 * leeg is, wordt er NIETS verstuurd en wordt er ook GEEN succes voorgespiegeld:
 * het formulier zet de aanvraag klaar in een vooringevulde e-mail en zegt er
 * eerlijk bij dat het bericht nog niet digitaal verzonden is.
 *
 * Koppelen doe je zo:
 *   1. Zet `PUBLIC_CONTACT_ENDPOINT` in `.env` (zie `.env.example`).
 *   2. De endpoint ontvangt een POST met `Content-Type: application/json`:
 *        { naam, bedrijfsnaam, email, telefoon, type, bericht }
 *   3. Bij succes een 2xx teruggeven; bij fouten een 4xx/5xx.
 *
 * Geschikte opties: Formspree, Web3Forms, Netlify Forms, of een eigen
 * serverless function die de aanvraag via Resend/Postmark doorstuurt naar
 * Burlesonhandymaninstallation@gmail.com.
 */

import { site } from '../data/site';

const ENDPOINT = (import.meta.env.PUBLIC_CONTACT_ENDPOINT ?? '').trim();

type FieldName = 'naam' | 'bedrijfsnaam' | 'email' | 'telefoon' | 'type' | 'bericht';

type FormValues = Record<FieldName, string>;

type Tone = 'success' | 'error' | 'info';

interface Validator {
  required: boolean;
  /** Geeft een foutmelding terug, of `null` als de waarde in orde is. */
  validate?: (value: string) => string | null;
  requiredMessage: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Ruime telefooncheck: cijfers, spaties, +, -, haakjes; minimaal 8 cijfers. */
const PHONE_PATTERN = /^[+()\d\s-]{8,}$/;

const validators: Record<FieldName, Validator> = {
  naam: {
    required: true,
    requiredMessage: 'Vul uw naam in.',
    validate: (value) => (value.trim().length < 2 ? 'Vul uw volledige naam in.' : null),
  },
  bedrijfsnaam: {
    required: false,
    requiredMessage: '',
  },
  email: {
    required: true,
    requiredMessage: 'Vul uw e-mailadres in.',
    validate: (value) =>
      EMAIL_PATTERN.test(value.trim()) ? null : 'Controleer het e-mailadres, bijv. naam@bedrijf.nl.',
  },
  telefoon: {
    required: false,
    requiredMessage: '',
    validate: (value) =>
      value.trim() === '' || PHONE_PATTERN.test(value.trim())
        ? null
        : 'Controleer het telefoonnummer.',
  },
  type: {
    required: true,
    requiredMessage: 'Kies het type werkzaamheden.',
  },
  bericht: {
    required: true,
    requiredMessage: 'Omschrijf kort de werkzaamheden.',
    validate: (value) =>
      value.trim().length < 10 ? 'Geef iets meer toelichting (minimaal 10 tekens).' : null,
  },
};

const FIELD_NAMES = Object.keys(validators) as FieldName[];

function init(): void {
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
  const status = document.getElementById('contact-status');
  const statusTitle = document.getElementById('contact-status-title');
  const statusText = document.getElementById('contact-status-text');

  if (!form || !status || !statusTitle || !statusText) return;

  const getControl = (name: FieldName) =>
    form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;

  const getErrorNode = (name: FieldName) => document.getElementById(`${name}-error`);

  /* ---------------------------------------------------------------------- */
  /* Toestand                                                                */
  /* ---------------------------------------------------------------------- */

  function setStatus(tone: Tone, title: string, html: string): void {
    status!.dataset.tone = tone;
    statusTitle!.textContent = title;
    statusText!.innerHTML = html;
    status!.hidden = false;
  }

  function clearStatus(): void {
    status!.hidden = true;
    delete status!.dataset.tone;
    statusTitle!.textContent = '';
    statusText!.textContent = '';
  }

  function setFieldError(name: FieldName, message: string | null): void {
    const control = getControl(name);
    const errorNode = getErrorNode(name);
    if (!control || !errorNode) return;

    errorNode.textContent = message ?? '';
    if (message) {
      control.setAttribute('aria-invalid', 'true');
    } else {
      control.removeAttribute('aria-invalid');
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Validatie                                                               */
  /* ---------------------------------------------------------------------- */

  function validateField(name: FieldName): string | null {
    const control = getControl(name);
    if (!control) return null;

    const value = control.value ?? '';
    const rules = validators[name];

    if (rules.required && value.trim() === '') return rules.requiredMessage;
    if (value.trim() === '') return null;

    return rules.validate ? rules.validate(value) : null;
  }

  /** Valideert alles en geeft de eerste ongeldige veldnaam terug. */
  function validateAll(): FieldName | null {
    let firstInvalid: FieldName | null = null;

    for (const name of FIELD_NAMES) {
      const message = validateField(name);
      setFieldError(name, message);
      if (message && !firstInvalid) firstInvalid = name;
    }

    return firstInvalid;
  }

  // Fouten verdwijnen zodra de bezoeker het veld corrigeert.
  for (const name of FIELD_NAMES) {
    const control = getControl(name);
    if (!control) continue;

    control.addEventListener('blur', () => {
      if (control.getAttribute('aria-invalid') === 'true' || control.value.trim() !== '') {
        setFieldError(name, validateField(name));
      }
    });

    control.addEventListener('input', () => {
      if (control.getAttribute('aria-invalid') === 'true') {
        setFieldError(name, validateField(name));
      }
    });

    control.addEventListener('change', () => {
      if (control.getAttribute('aria-invalid') === 'true') {
        setFieldError(name, validateField(name));
      }
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Waarden verzamelen                                                      */
  /* ---------------------------------------------------------------------- */

  function collectValues(): FormValues {
    const values = {} as FormValues;
    for (const name of FIELD_NAMES) {
      values[name] = (getControl(name)?.value ?? '').trim();
    }
    return values;
  }

  /** Leesbaar label bij de gekozen optie (i.p.v. de technische waarde). */
  function typeLabel(value: string): string {
    const select = getControl('type') as HTMLSelectElement | null;
    if (!select) return value;
    const option = Array.from(select.options).find((item) => item.value === value);
    return option?.textContent?.trim() ?? value;
  }

  /** Vooringevulde e-mail als terugvaloptie zolang er geen endpoint is. */
  function buildMailto(values: FormValues): string {
    const lines = [
      `Naam: ${values.naam}`,
      `Bedrijfsnaam: ${values.bedrijfsnaam || '-'}`,
      `E-mail: ${values.email}`,
      `Telefoonnummer: ${values.telefoon || '-'}`,
      `Type werkzaamheden: ${typeLabel(values.type)}`,
      '',
      values.bericht,
    ];

    const subject = `Aanvraag ${typeLabel(values.type)} — ${values.naam}`;
    return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  }

  /* ---------------------------------------------------------------------- */
  /* Verzenden                                                               */
  /* ---------------------------------------------------------------------- */

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.state === 'submitting') return;

    clearStatus();

    // Honeypot: alleen bots vullen dit veld in. Stilzwijgend negeren.
    const honeypot = form.elements.namedItem('website') as HTMLInputElement | null;
    if (honeypot && honeypot.value !== '') return;

    const firstInvalid = validateAll();
    if (firstInvalid) {
      const control = getControl(firstInvalid);
      control?.focus();
      setStatus(
        'error',
        'Nog even controleren',
        'Enkele velden zijn nog niet volledig ingevuld. De gemarkeerde velden hieronder hebben aandacht nodig.',
      );
      return;
    }

    const values = collectValues();

    // Geen backend gekoppeld → niets versturen, geen nep-succes tonen.
    if (ENDPOINT === '') {
      const mailto = buildMailto(values);
      setStatus(
        'info',
        'Nog niet verzonden — uw e-mail staat klaar',
        `Online verzenden is voor deze website nog niet geactiveerd. Uw aanvraag is klaargezet in een e-mail; controleer of uw e-mailprogramma opent en verstuur het bericht. Lukt dat niet? Mail dan rechtstreeks naar <a href="mailto:${site.contact.email}">${site.contact.email}</a>.`,
      );
      window.location.href = mailto;
      return;
    }

    form.dataset.state = 'submitting';

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Verzenden mislukt (${response.status})`);

      form.reset();
      for (const name of FIELD_NAMES) setFieldError(name, null);

      setStatus(
        'success',
        'Bedankt voor uw aanvraag',
        'Uw bericht is verstuurd. U ontvangt zo snel mogelijk een reactie.',
      );
    } catch {
      setStatus(
        'error',
        'Verzenden is niet gelukt',
        `Er ging iets mis bij het versturen. Probeer het later opnieuw of mail rechtstreeks naar <a href="mailto:${site.contact.email}">${site.contact.email}</a>.`,
      );
    } finally {
      form.dataset.state = 'idle';
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
