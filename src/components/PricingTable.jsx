// =============================================================================
// PricingTable — Tabella prezzi con design ragionato
// Gerarchia visiva, icone, colori, whitespace
// =============================================================================

import { useState, useMemo } from 'react';
import { PRICING } from '../utils/pricing';

// ── Icone inline (evitiamo dipendenze extra) ──
const icons = {
  spc: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <path d="M8 8h8v8H8z" />
      <path d="M8 2v20M16 2v20M2 8h20M2 16h20" opacity="0.3" />
    </svg>
  ),
  laminato: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" opacity="0.3" />
      <path d="M6 6h3v3H6zM15 6h3v3h-3zM6 15h3v3H6zM15 15h3v3h-3z" />
    </svg>
  ),
  prefinito: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l16 16M20 4L4 20" />
      <path d="M12 2v20M2 12h20" opacity="0.2" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  battiscopa: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="12" rx="1" />
      <path d="M4 10h16M4 14h16" opacity="0.3" />
      <path d="M4 6L4 18" strokeWidth="2" />
    </svg>
  ),
  spina: (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18" />
      <path d="M6 6h4v4H6zM14 14h4v4h-4z" />
    </svg>
  ),
};

// ── Badge colorati per categoria ──
const CATEGORY_STYLES = {
  spc: {
    badge: 'bg-violet-100 text-violet-700',
    icon: 'text-violet-500',
    row: 'border-l-violet-400',
  },
  laminato: {
    badge: 'bg-sky-100 text-sky-700',
    icon: 'text-sky-500',
    row: 'border-l-sky-400',
  },
  prefinito: {
    badge: 'bg-amber-100 text-amber-700',
    icon: 'text-amber-500',
    row: 'border-l-amber-400',
  },
  battiscopa: {
    badge: 'bg-gray-100 text-gray-600',
    icon: 'text-gray-400',
    row: 'border-l-gray-300',
  },
};

// ── Filtri disponibili ──
const FILTERS = [
  { id: 'all', label: 'Tutti i materiali' },
  { id: 'spc', label: 'SPC / Vinilico' },
  { id: 'laminato', label: 'Laminato' },
  { id: 'prefinito', label: 'Parquet Prefinito' },
  { id: 'battiscopa', label: 'Battiscopa' },
];

// ── Dati tabella ──
const ROWS = [
  {
    category: 'spc',
    label: 'SPC Dritto',
    note: 'Vinilico a click, 100% impermeabile',
    detail: 'Ideale per bagni, cucine e zone traffico',
    fornitura: '€19–35',
    posa: `€${PRICING.base.spc_dritto}`,
    posaLabel: '/mq',
  },
  {
    category: 'spc',
    label: 'SPC a Spina',
    note: 'Effetto spina, waterproof',
    detail: 'Stile classico con resistenza SPC',
    fornitura: '€26–40',
    posa: `€${PRICING.base.spc_spina}`,
    posaLabel: '/mq',
    hasSpina: true,
  },
  {
    category: 'laminato',
    label: 'Laminato Dritto',
    note: 'Resistente a graffi e urti',
    detail: 'Posa flottante, rapporto qualità/prezzo',
    fornitura: '€13–26',
    posa: `€${PRICING.base.laminato}`,
    posaLabel: '/mq',
  },
  {
    category: 'laminato',
    label: 'Laminato a Spina',
    note: 'Effetto legno a spina',
    detail: 'Design pregiato a costo contenuto',
    fornitura: '€18–29',
    posa: '€25–30',
    posaLabel: '/mq',
    hasSpina: true,
  },
  {
    category: 'prefinito',
    label: 'Prefinito Dritto',
    note: 'Vero legno, posa incollata',
    detail: 'Silenzioso, caldo, pregio naturale',
    fornitura: '€40–80',
    posa: `€${PRICING.base.prefinito_dritto}`,
    posaLabel: '/mq',
  },
  {
    category: 'prefinito',
    label: 'Prefinito "Flottante"',
    note: 'Posa rapida senza colla, legno vero',
    detail: 'Il calore del legno con la praticità della posa flottante',
    fornitura: '€50–80',
    posa: `€${PRICING.base.prefinito_flottante}`,
    posaLabel: '/mq',
  },
  {
    category: 'prefinito',
    label: 'Prefinito a Spina',
    note: 'Spina italiana, francese, ungherese',
    detail: 'Massima eleganza, artigianalità',
    fornitura: '€55–90',
    posa: `€${PRICING.base.prefinito_spina}`,
    posaLabel: '/mq',
    hasSpina: true,
  },
  {
    category: 'battiscopa',
    label: 'Battiscopa ≤ 5cm',
    note: 'Altezza standard',
    detail: 'A metro lineare, finitura coordinata',
    fornitura: '€5–8',
    posa: `€${PRICING.base.battiscopa_low}`,
    posaLabel: '/ml',
  },
  {
    category: 'battiscopa',
    label: 'Battiscopa > 5cm',
    note: 'Altezza maggiorata',
    detail: 'Per pavimenti rialzati o effetto design',
    fornitura: '€8–15',
    posa: `€${PRICING.base.battiscopa_high}`,
    posaLabel: '/ml',
  },
];

// =============================================================================
// COMPONENTE
// =============================================================================
export default function PricingTable() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredRows = useMemo(() => {
    if (activeFilter === 'all') return ROWS;
    return ROWS.filter(row => row.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="pricing-table-section" className="bg-gray-50/50">
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
        {/* ── Intestazione ── */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-[22px] font-extrabold text-gray-900">
            Listino prezzi aggiornato           </h2>
          </div>
          <p className="text-[14px] text-gray-500">
            Tutti i prezzi sono <strong className="text-gray-700">IVA esclusa</strong>.Il prezzo del materiale varia in base a qualità, spessore e finitura scelta.
          </p>
        </div>

        {/* ── Filtri a pillole ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`
                text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer
                ${activeFilter === f.id
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Legenda ── */}
        <div className="flex flex-wrap gap-3 mb-6 text-[12px]">
          <span className="inline-flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
            SPC / Vinilico
          </span>
          <span className="inline-flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            Laminato
          </span>
          <span className="inline-flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            Parquet Prefinito
          </span>
          <span className="inline-flex items-center gap-1.5 text-gray-500">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            Battiscopa
          </span>
        </div>

        {/* ── Tabella ── */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header (solo desktop) */}
          <div className="hidden sm:grid sm:grid-cols-[1fr_120px_120px] bg-gray-50 border-b border-gray-200">
            <div className="px-5 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Materiale
            </div>
            <div className="px-5 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right">
              Fornitura
            </div>
            <div className="px-5 py-3.5 text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right">
              Posa
            </div>
          </div>

          {/* Righe */}
          <div className="divide-y divide-gray-100">
            {filteredRows.length === 0 && (
              <div className="px-5 py-8 text-center text-[14px] text-gray-400">
                Nessun materiale in questa categoria.
              </div>
            )}
            {filteredRows.map((row, i) => {
              const style = CATEGORY_STYLES[row.category];
              return (
                <div
                  key={i}
                  className={`
                    grid grid-cols-1 sm:grid-cols-[1fr_120px_120px] gap-1 sm:gap-0
                    px-5 py-4
                    hover:bg-gray-50/80 transition-colors
                    border-l-4 ${style.row} border-l-0 sm:border-l-4
                  `}
                >
                  {/* Colonna materiale */}
                  <div className="flex items-start gap-3 min-w-0">
                    {/* Icona */}
                    <span className={`hidden sm:block mt-0.5 ${style.icon}`}>
                      {icons[row.category]}
                      {row.hasSpina && (
                        <span className="absolute -top-1 -right-1">{icons.spina}</span>
                      )}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] font-semibold text-gray-900">
                          {row.label}
                        </span>
                        {/* Badge categoria (mobile) */}
                        <span className={`sm:hidden inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded-full ${style.badge}`}>
                          {row.category === 'spc' && 'SPC'}
                          {row.category === 'laminato' && 'Laminato'}
                          {row.category === 'prefinito' && 'Legno'}
                          {row.category === 'battiscopa' && 'Battiscopa'}
                        </span>
                        {/* Badge spina */}
                        {row.hasSpina && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth="2">
                              <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                            Spina
                          </span>
                        )}
                      </div>
                      <span className="text-[13px] text-gray-500 leading-tight block">
                        {row.note}
                      </span>
                      <span className="text-[12px] text-gray-400 leading-tight block mt-0.5">
                        {row.detail}
                      </span>
                    </div>
                  </div>

                  {/* Fornitura */}
                  <div className="flex sm:flex-col items-baseline justify-between sm:justify-center sm:text-right sm:px-2 mt-1 sm:mt-0">
                    <span className="text-[11px] text-gray-400 sm:hidden font-medium uppercase tracking-wider">
                      Fornitura
                    </span>
                    <span className="text-[15px] font-semibold text-gray-700 tabular-nums">
                      {row.fornitura}
                    </span>
                  </div>

                  {/* Posa */}
                  <div className="flex sm:flex-col items-baseline justify-between sm:justify-center sm:text-right sm:px-2 mt-0.5 sm:mt-0">
                    <span className="text-[11px] text-gray-400 sm:hidden font-medium uppercase tracking-wider">
                      Posa
                    </span>
                    <span className="text-[16px] font-bold text-gray-900 tabular-nums">
                      {row.posa}
                      <span className="text-[12px] font-medium text-gray-400 ml-0.5">
                        {row.posaLabel}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Nota a piè di pagina ── */}
        <div className="mt-5 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold shrink-0 mt-0.5">
              i
            </span>
            <div>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                <strong className="text-gray-800">Fornitura:</strong> prezzi indicativi in base a qualità e spessore. 
              </p>
              <p className="text-[12px] text-gray-400 mt-1.5">
                Per un preventivo preciso e personalizzato, richiedi un sopralluogo gratuito — senza impegno.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}