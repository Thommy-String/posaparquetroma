// =============================================================================
// ANALYTICS & TRACKING — Pro Casa Parquet
// =============================================================================
// Questo modulo è l'UNICO punto di emissione eventi per tutto il sito.
// GTM smista verso Google Ads, GA4, Meta e PostHog.
// NON installare SDK direttamente nel codice del sito.
// =============================================================================

import { PHONE_NUMBER } from './constants';

// ── Configurazione ──────────────────────────────────────────────────────────

// Parametri campagna da catturare all'atterraggio
const CLICK_PARAMS = ['gclid', 'fbclid', 'cid', 'aid', 'kw', 'mt', 'dev'];

const CITY = 'roma';
const CITY_PREFIX = 'R';

// ── Riferimento sessione ────────────────────────────────────────────────────

/**
 * Genera un codice riferimento breve per la sessione.
 * Formato: R-ABCDE (R=Roma, M=Milano + 5 caratteri alfanumerici)
 */
export function genRef() {
  return CITY_PREFIX + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

/**
 * Cattura i parametri della campagna all'atterraggio e genera/mantiene
 * un riferimento di sessione persistente in localStorage.
 * Non sovrascrive un contesto esistente se l'utente arriva senza parametri ads.
 */
export function captureClickContext() {
  const p = new URLSearchParams(window.location.search);
  const stored = JSON.parse(localStorage.getItem('pp_click') || 'null');

  // Sessione senza click pubblicitario e contesto già presente: non sovrascrivere
  if (!p.get('gclid') && !p.get('fbclid') && stored) return stored;

  const ctx = {
    ref: stored?.ref || genRef(),
    ts: Date.now(),
    landing: window.location.pathname,
  };

  CLICK_PARAMS.forEach((k) => {
    const v = p.get(k);
    if (v) ctx[k] = v;
  });

  localStorage.setItem('pp_click', JSON.stringify(ctx));
  return ctx;
}

/**
 * Restituisce il contesto di click corrente (senza modificarlo).
 */
export function getClickContext() {
  return JSON.parse(localStorage.getItem('pp_click') || '{}');
}

// ── Fascia di prezzo ────────────────────────────────────────────────────────

const PRICE_BANDS = [
  { max: 1000, label: '0-1k' },
  { max: 3000, label: '1-3k' },
  { max: 6000, label: '3-6k' },
  { max: 12000, label: '6-12k' },
  { max: Infinity, label: '12k+' },
];

/**
 * Discretizza un prezzo in una fascia statisticamente utilizzabile.
 */
export function getPriceBand(price) {
  for (const band of PRICE_BANDS) {
    if (price <= band.max) return band.label;
  }
  return '12k+';
}

// ── Livello eventi unico ────────────────────────────────────────────────────

/**
 * Emette un evento nel dataLayer. GTM smisterà verso tutte le destinazioni.
 * Questo è l'UNICO punto di emissione. Non chiamare gtag/fbq direttamente.
 */
export function track(event, params = {}) {
  const ctx = JSON.parse(localStorage.getItem('pp_click') || '{}');

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
    ref: ctx.ref || null,
    gclid: ctx.gclid || null,
    city: CITY,
  });
}

// ── Eventi contatto (Lead / generico) ───────────────────────────────────────

/**
 * Emette un evento di contatto nel dataLayer.
 * - contact_click_qualified: utente ha visto il prezzo (lead qualificato, conversione primaria)
 * - contact_click: contatto generico senza preventivo (conversione secondaria)
 *
 * Il valore inviato è sempre la posa (price), non il totale (price_total).
 * price_total è un parametro di report, non di bidding.
 */
export function trackContact({ channel = 'whatsapp', source = 'quiz', serviceLabel, sqm, posa, total, qualified = false } = {}) {
  const eventName = qualified ? 'contact_click_qualified' : 'contact_click';

  track(eventName, {
    channel,
    source,
    service: serviceLabel || null,
    sqm: sqm || null,
    price: posa || null,       // ← valore conversione = posa (solo manodopera)
    price_total: total || null, // ← parametro report = totale (posa + materiale + extra)
    qualified,
  });
}

// ── Costruzione messaggio WhatsApp ──────────────────────────────────────────

/**
 * Costruisce il messaggio WhatsApp precompilato includendo il riferimento.
 * Usato sia dal quiz (con dati preventivo) che dallo sticky (senza).
 */
export function buildWhatsAppMessage({ serviceLabel, sqm, price, isSticky = false } = {}) {
  const ctx = JSON.parse(localStorage.getItem('pp_click') || '{}');
  const refLine = `Rif. ${ctx.ref || 'diretto'}`;

  if (isSticky || !serviceLabel) {
    // Messaggio breve per CTA sticky (senza dati preventivo)
    const lines = [
      'Ciao, vorrei un preventivo per la posa del pavimento.',
      '',
      refLine,
    ];
    return lines.join('\n');
  }

  // Messaggio completo dal quiz
  const lines = [
    'Ciao, ho appena fatto il preventivo sul sito:',
    `• Servizio: ${serviceLabel}`,
    `• Superficie: ${sqm} mq`,
    `• Stima: € ${price.toLocaleString('it-IT')}`,
    '',
    refLine,
  ];
  return lines.join('\n');
}

/**
 * Apre WhatsApp con il messaggio precompilato dopo aver tracciato la conversione.
 * Sostituisce la vecchia gtagReportConversion.
 * Usa trackContact per distinguere lead qualificati (con preventivo) da contatti generici.
 */
export function openWhatsAppWithTracking({ message, serviceLabel, sqm, price, posa, total, source = 'quiz' } = {}) {
  const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, '');
  const finalMessage = message || buildWhatsAppMessage({ serviceLabel, sqm, price, isSticky: source === 'sticky' });
  const encodedMessage = encodeURIComponent(finalMessage);

  // Lead qualificato (true) se proviene da quiz/pricewizard con preventivo,
  // contatto generico (false) se da sticky/header senza preventivo.
  const qualified = source !== 'sticky' && source !== 'header' && Boolean(posa);

  trackContact({
    channel: 'whatsapp',
    source,
    serviceLabel,
    sqm,
    posa,
    total,
    qualified,
  });

  window.location.href = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Traccia la visualizzazione del prezzo (preventivo mostrato all'utente).
 * Centralizza l'evento per evitare duplicazioni tra wizard, quiz e altri componenti.
 */
export function trackPriceShown({ source, serviceLabel, sqm, posa, total } = {}) {
  track('price_shown', {
    source,
    service_label: serviceLabel || null,
    sqm: sqm || null,
    posa: posa || null,
    total: total || null,
  });
}

/**
 * Traccia una chiamata telefonica e reindirizza.
 * Usa trackContact per distinguere lead qualificati (con preventivo) da contatti generici.
 */
export function openCallWithTracking({ source = 'quiz', serviceLabel, sqm, price, posa, total } = {}) {
  const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, '');

  // Lead qualificato (true) se proviene da quiz/pricewizard con preventivo,
  // contatto generico (false) se da sticky/header senza preventivo.
  const qualified = source !== 'sticky' && source !== 'header' && Boolean(posa);

  trackContact({
    channel: 'phone',
    source,
    serviceLabel,
    sqm,
    posa,
    total,
    qualified,
  });

  // Nessuna chiamata gtag diretta: il dataLayer smista a GTM (evita doppi conteggi).
  window.location.href = `tel:${cleanPhone}`;
}