/**
 * Ingetogen scroll-animatie.
 *
 * Elementen met `data-reveal` faden zachtjes omhoog zodra ze in beeld komen.
 * Bewust minimaal: één IntersectionObserver, geen library, geen scroll-listener,
 * en elk element wordt na het tonen meteen losgekoppeld.
 *
 * Respecteert `prefers-reduced-motion`: dan wordt alles direct getoond.
 */

const SELECTOR = '[data-reveal]';

function showAll(elements: Iterable<Element>): void {
  for (const element of elements) {
    element.classList.add('is-visible');
  }
}

function init(): void {
  const elements = document.querySelectorAll<HTMLElement>(SELECTOR);
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    showAll(elements);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    {
      // Iets vóór de onderrand activeren, zodat de animatie natuurlijk aanvoelt.
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08,
    },
  );

  for (const element of elements) {
    // Elementen die al bij het laden in beeld staan (hero) niet laten wachten.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
      element.classList.add('is-visible');
      continue;
    }
    observer.observe(element);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
