// =============================================================================
// FONTE UNICA DEI PREZZI — Pro Casa Parquet Milano
// =============================================================================
// OGNI componente che mostra un prezzo DEVE importare da qui.
// Nessun prezzo scritto a mano in nessun altro file.
// Ogni cifra è etichettata: "solo posa" / "solo fornitura" / "tutto incluso".
// =============================================================================

export const PRICING = {
  // ── Prezzi base SOLO POSA (€/mq) ──
  base: {
    spc_dritto: 20,
    spc_spina: 27,
    laminato: 20,
    prefinito_dritto: 27,
    prefinito_spina: 32,
    prefinito_flottante: 22,
    battiscopa_low: 10,
    battiscopa_high: 12,
  },

  // ── Range SOLO FORNITURA (€/mq) — indicativi, il cliente compra dove vuole ──
  fornitura: {
    spc: { min: 19, max: 35, label: 'SPC / Vinilico — fornitura indicativa' },
    spc_spina: { min: 26, max: 40, label: 'SPC a Spina — fornitura indicativa' },
    laminato: { min: 13, max: 26, label: 'Laminato — fornitura indicativa' },
    laminato_spina: { min: 18, max: 29, label: 'Laminato a Spina — fornitura indicativa' },
    prefinito_dritto: { min: 40, max: 80, label: 'Prefinito Dritto — fornitura indicativa' },
    prefinito_flottante: { min: 50, max: 80, label: 'Prefinito Flottante — fornitura indicativa' },
    prefinito_spina: { min: 55, max: 90, label: 'Prefinito a Spina — fornitura indicativa' },
    battiscopa_low: { min: 5, max: 8, label: 'Battiscopa ≤ 5cm — fornitura indicativa' },
    battiscopa_high: { min: 8, max: 15, label: 'Battiscopa > 5cm — fornitura indicativa' },
  },

  // ── Range usati dal Verificatore di Preventivi (mercato Milano, sola posa) ──
  // ALLINEATI con i prezzi base: il minimo è il nostro prezzo reale.
  verifierRanges: {
    spc: { min: 20, max: 35, defaultVariant: 'dritto' },
    laminato: { min: 20, max: 32, defaultVariant: 'dritto' },
    prefinito: { min: 22, max: 48, defaultVariant: 'dritto' },
  },

  // ── Prezzi FAQ (solo posa, range) ──
  faqPosaRange: {
    spcLaminato: { min: 20, max: 22, label: 'SPC / Laminato — solo posa' },
    spina: { min: 27, max: 32, label: 'Parquet a spina — solo posa' },
  },

  // ── Prezzi variabili / extra (solo posa / manodopera) ──
  variables: {
    primer_su_vecchio_mq: 6,
    livellamento_mq_low: 10,
    livellamento_mq_high: 15,
    rimozione_e_smaltimento_mq: 12,
    spostamento_mobili_piccoli: 50,
    spostamento_mobili_grandi: 250,
    colla_al_mq: 7,
    rimozione_battiscopa_ml: 3.50,
    taglio_porte_cad: 60,
    taglio_porta_blindata_cad: 150,
    smaltimento_rifiuti_forfait: 250,
    facchinaggio_forfait: 200,
    rimozione_moquette_mq: 7,
    rimozione_parquet_mq: 9,
    rimozione_piastrelle_mq: 15,
    ripristino_muro_ml: 5,
  },

  // ── Range hero (solo posa) ──
  heroRange: {
    min: 20,
    max: 32,
    label: 'Da €20 a €32 al mq, solo posa',
  },

  // ── Prezzi compatti (3-card starting prices) — solo posa ──
  startingPrices: [
    {
      material: 'SPC',
      price: 20,
      description: 'Vinilico a click, impermeabile. Ideale per bagni e cucine.',
      color: 'yellow',
      disclaimer: 'solo posa',
    },
    {
      material: 'Laminato',
      price: 20,
      description: 'Resistente a graffi e urti, posa flottante senza colla.',
      color: 'emerald',
      disclaimer: 'solo posa',
    },
    {
      material: 'Parquet Prefinito',
      price: 27,
      description: 'Vero legno già verniciato. Posa incollata o flottante.',
      color: 'orange',
      disclaimer: 'solo posa',
    },
  ],

  // ── Esempi calcolati (tabella) — solo posa ──
  calculatedExamples: {
    title: 'Preventivo rapido (solo posa)',
    subtitle: 'Moltiplica i mq per il prezzo al mq. Il materiale lo compri tu, dove vuoi.',
    sizes: [
      { label: 'Bilocale', sqm: 50 },
      { label: 'Trilocale', sqm: 80 },
      { label: 'Casa grande', sqm: 100 },
    ],
    materials: [
      { key: 'spc', label: 'SPC', pricePerSqm: 20, disclaimer: 'solo posa' },
      { key: 'laminato', label: 'Laminato', pricePerSqm: 20, disclaimer: 'solo posa' },
      { key: 'prefinito', label: 'Prefinito', pricePerSqm: 27, disclaimer: 'solo posa' },
    ],
  },

  // ── Tariffe minime ──
  minMq: {
    prefinito_dritto: 40,
    prefinito_spina: 40,
    prefinito_flottante: 40,
    spc_dritto: 40,
    spc_spina: 40,
    laminato: 40,
    battiscopa_low: null,
    battiscopa_high: null,
  },

  // Prezzo fisso per superfici inferiori a 40mq (€800 posa fissa)
  posaMinTotal: 800,

  minTotal: {
    battiscopa_low: 300,
    battiscopa_high: 300,
  },

  rimozioneBattiscopaMinMl: 40,
  rimozioneBattiscopaMinPrice: 80,
};

// ── Nomi servizio (etichette umane) ──
export const SERVICE_NAME_MAP = {
  prefinito_dritto: 'Posa Prefinito Dritto (solo posa)',
  prefinito_spina: 'Posa Prefinito a Spina (solo posa)',
  prefinito_flottante: 'Posa Prefinito Flottante (solo posa)',
  spc_dritto: 'Posa SPC Dritto (solo posa)',
  spc_spina: 'Posa SPC a Spina (solo posa)',
  laminato: 'Posa Laminato (solo posa)',
  battiscopa_low: 'Posa Battiscopa ≤ 5cm (solo posa)',
  battiscopa_high: 'Posa Battiscopa > 5cm (solo posa)',
};

// ── Produttività (mq/giorno) ──
export const SERVICE_PRODUCTIVITY = {
  prefinito_dritto: { unitPerDay: 35, setupBuffer: 0.5 },
  prefinito_spina: { unitPerDay: 20, setupBuffer: 0.5 },
  prefinito_flottante: { unitPerDay: 45, setupBuffer: 0.3 },
  spc_dritto: { unitPerDay: 55, setupBuffer: 0.3 },
  spc_spina: { unitPerDay: 35, setupBuffer: 0.3 },
  laminato: { unitPerDay: 60, setupBuffer: 0.3 },
  battiscopa_low: { unitPerDay: 120, setupBuffer: 0.2 },
  battiscopa_high: { unitPerDay: 100, setupBuffer: 0.2 },
  default: { unitPerDay: 40, setupBuffer: 0.4 },
};

// ── Helper: formatta un numero in euro italiani ──
export const fmtEuro = (n) => n.toLocaleString('it-IT');

// ── Helper: restituisce il prezzo posa per un servizio dato il suo pricingId ──
export function getPosaPrice(pricingId) {
  const map = {
    'spc': PRICING.base.spc_dritto,
    'laminato': PRICING.base.laminato,
    'prefinito': PRICING.base.prefinito_dritto,
    'prefinito-flottante': PRICING.base.prefinito_flottante,
    'prefinito-spina': PRICING.base.prefinito_spina,
    'battiscopa': PRICING.base.battiscopa_low,
  };
  return map[pricingId] || null;
}

// ── Helper: restituisce il range verifier per un materiale ──
export function getVerifierRange(material) {
  return PRICING.verifierRanges[material] || PRICING.verifierRanges.spc;
}