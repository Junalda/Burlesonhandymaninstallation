/**
 * Verzendlogica van het contactformulier.
 *
 * Bewust gescheiden van de presentatie (`ContactForm.astro`): dit bestand
 * bevat validatie, verzending en statusafhandeling, het component bevat
 * alleen markup en styling.
 *
 * ── BACKEND-INTEGRATIE (TODO) ────────────────────────────────────────────
 * Er is nog geen verzendservice gekoppeld. Zet de omgevingsvariabele
 * `PUBLIC_CONTACT_ENDPOINT` in `.env` zodra er een endpoint is, bijvoorbeeld:
 *
 *   PUBLIC_CONTACT_ENDPOINT=https://api.example.com/contact
 *
 * Het endpoint ontvangt een POST met `Content-Type: application/json` en de
 * payload zoals beschreven in `ContactPayload` hieronder. Verwacht wordt:
 *   - HTTP 200/201  → aanvraag is daadwerkelijk verstuurd
 *   - overige codes → foutmelding voor de bezoeker
 *
 * Zolang er geen endpoint is ingesteld, wordt er GEEN succes voorgespiegeld.
 * De aanvraag wordt dan in het e-mailprogramma van de bezoeker klaargezet
 * (mailto) met de melding dat de e-mail nog daadwerkelijk verstuurd moet worden.
 * Zie README.md voor een voorbeeldimplementatie van het endpoint.
 * ─────────────────────────────────────────────────────────────────────────
 */

export interface ContactPayload {
  naam: string;
  bedrijfsnaam: string;
  email: string;
  telefoon: string;
  werkzaamheden: string;
  bericht: string;
}

type FieldName = keyof ContactPayload;

type Validator = (value: string, payload: ContactPayload) => string | null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^[+()\d\s-]{6,20}$/;

/** Validatieregels per veld. `null` betekent: geen fout. */
const validators: Record<FieldName, Validator> = {
  naam: (value) => {
    if (!value.trim()) return 'Vul uw naam in.';
    if (value.trim().length < 2) return 'Vul een geldige naam in.';
    return null;
  },
  bedrijfsnaam: () => null, // optioneel
  email: (value) => {
    if (!value.trim()) return 'Vul uw e-mailadres in.';
    if (!EMAIL_PATTERN.test(value.trim())) return 'Vul een geldig e-mailadres in.';
    return null;
  },
  telefoon: (value) => {
    if (!value.trim()) return null; // optioneel
    if (!PHONE_PATTERN.test(value.trim())) return 'Vul een geldig telefoonnummer in.';
    return null;
  },
  werkzaamheden: (value) => (value ? null : 'Kies het type werkzaamheden.'),
  bericht: (value) => {
    if (!value.trim()) return 'Omschrijf kort uw opdracht.';
    if (value.trim().length < 10) return 'Geef iets meer toelichting (minimaal 10 tekens).';
    return null;
  },
};

const FIELD_NAMES = Object.keys(validators) as FieldName[];

interface Elements {
  form: HTMLFormElement;
  status: HTMLElement;
  submit: HTMLButtonElement;
  honeypot: HTMLInputElement | null;
}

function getFieldControl(form: HTMLFormElement, name: FieldName) {
  return form.elements.namedItem(name) as
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    | null;
}

function setFieldError(form: HTMLFormElement, name: FieldName, message: string | null) {
  const control = getFieldControl(form, name);
  const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  if (!control || !errorEl) return;

  if (message) {
    control.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.hidden = false;
  } else {
    control.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.hidden = true;
  }
}

function readPayload(form: HTMLFormElement): ContactPayload {
  const data = new FormData(form);
  const read = (name: FieldName) => String(data.get(name) ?? '').trim();

  return {
    naam: read('naam'),
    bedrijfsnaam: read('bedrijfsnaam'),
    email: read('email'),
    telefoon: read('telefoon'),
    werkzaamheden: read('werkzaamheden'),
    bericht: read('bericht'),
  };
}

function validate(form: HTMLFormElement, payload: ContactPayload) {
  const errors: Partial<Record<FieldName, string>> = {};

  FIELD_NAMES.forEach((name) => {
    const message = validators[name](payload[name], payload);
    setFieldError(form, name, message);
    if (message) errors[name] = message;
  });

  return errors;
}

function setStatus(
  status: HTMLElement,
  state: 'idle' | 'error' | 'success' | 'info',
  message = '',
) {
  status.dataset.state = state;
  status.textContent = message;
  status.hidden = state === 'idle';
}

function setLoading({ form, submit }: Elements, loading: boolean) {
  form.dataset.loading = String(loading);
  submit.disabled = loading;
  submit.setAttribute('aria-busy', String(loading));
}

/** Zet de aanvraag klaar in het e-mailprogramma van de bezoeker. */
function buildMailto(recipient: string, payload: ContactPayload, workLabel: string) {
  const body = [
    `Naam: ${payload.naam}`,
    `Bedrijfsnaam: ${payload.bedrijfsnaam || '-'}`,
    `E-mail: ${payload.email}`,
    `Telefoonnummer: ${payload.telefoon || '-'}`,
    `Type werkzaamheden: ${workLabel}`,
    '',
    'Bericht:',
    payload.bericht,
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(
    `Aanvraag ${workLabel} — ${payload.naam}`,
  )}&body=${encodeURIComponent(body)}`;
}

export function initContactForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const submit = form.querySelector<HTMLButtonElement>('[data-form-submit]');
  const successPanel = document.querySelector<HTMLElement>('[data-form-success]');
  if (!status || !submit) return;

  const elements: Elements = {
    form,
    status,
    submit,
    honeypot: form.querySelector<HTMLInputElement>('[data-honeypot]'),
  };

  // Wordt bij iedere verzending opnieuw gelezen, zodat het endpoint ook
  // achteraf (bijv. door een tag manager) gezet kan worden.
  const getEndpoint = () => form.dataset.endpoint?.trim() || '';
  const recipient = form.dataset.recipient ?? '';

  if (!getEndpoint()) {
    // Zichtbaar in de console voor de ontwikkelaar, onzichtbaar voor de bezoeker.
    console.warn(
      '[contactformulier] Geen PUBLIC_CONTACT_ENDPOINT ingesteld — ' +
        'aanvragen worden klaargezet in het e-mailprogramma van de bezoeker. ' +
        'Zie src/scripts/contact-form.ts voor de integratie-instructies.',
    );
  }

  // Foutmelding verdwijnt zodra de bezoeker het veld corrigeert.
  FIELD_NAMES.forEach((name) => {
    const control = getFieldControl(form, name);
    control?.addEventListener('input', () => {
      if (control.getAttribute('aria-invalid') === 'true') {
        setFieldError(form, name, validators[name](String(control.value), readPayload(form)));
      }
    });
    control?.addEventListener('blur', () => {
      const value = String(control.value);
      if (value) setFieldError(form, name, validators[name](value, readPayload(form)));
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Honeypot: alleen bots vullen dit verborgen veld in.
    if (elements.honeypot?.value) {
      console.warn('[contactformulier] Verzending geblokkeerd door spamcontrole.');
      return;
    }

    const payload = readPayload(form);
    const errors = validate(form, payload);
    const firstError = FIELD_NAMES.find((name) => errors[name]);

    if (firstError) {
      setStatus(
        status,
        'error',
        'Niet alle velden zijn correct ingevuld. Controleer de gemarkeerde velden.',
      );
      getFieldControl(form, firstError)?.focus();
      return;
    }

    const workLabel =
      (getFieldControl(form, 'werkzaamheden') as HTMLSelectElement | null)?.selectedOptions?.[0]
        ?.textContent?.trim() ?? payload.werkzaamheden;

    const endpoint = getEndpoint();

    // Zonder gekoppelde backend: aanvraag klaarzetten in het e-mailprogramma.
    if (!endpoint) {
      window.location.href = buildMailto(recipient, payload, workLabel);
      setStatus(
        status,
        'info',
        'Uw aanvraag is klaargezet in uw e-mailprogramma. Verstuur de e-mail om de aanvraag definitief te maken.',
      );
      return;
    }

    setLoading(elements, true);
    setStatus(status, 'info', 'Bezig met versturen…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, werkzaamhedenLabel: workLabel }),
      });

      if (!response.ok) throw new Error(`Onverwachte serverstatus: ${response.status}`);

      // Succes wordt uitsluitend getoond na een bevestigde verzending.
      form.reset();
      setStatus(status, 'idle');

      if (successPanel) {
        form.hidden = true;
        successPanel.hidden = false;
        successPanel.focus();
      } else {
        setStatus(status, 'success', 'Bedankt voor uw aanvraag. Er wordt zo snel mogelijk gereageerd.');
      }
    } catch (error) {
      console.error('[contactformulier] Verzenden mislukt:', error);
      setStatus(
        status,
        'error',
        `Het verzenden is niet gelukt. Stuur uw aanvraag rechtstreeks naar ${recipient} of probeer het later opnieuw.`,
      );
    } finally {
      setLoading(elements, false);
    }
  });
}
