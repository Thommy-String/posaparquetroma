// =============================================================================
// PriceWizard — Step-by-step calculator (Apple/Notion style)
// Include costo materiale + posa + extra. Materiali in griglia 2 colonne.
// =============================================================================
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Check, ArrowRight, Ruler, RotateCcw, Truck, PaintBucket, Hammer, DoorOpen, Trash2, Wrench, Shield, Star, Droplets, Zap, TreePine, Sparkles, MessageCircle } from 'lucide-react';
import { track, openWhatsAppWithTracking, trackPriceShown } from '../utils/analytics';
import { PRICING, fmtEuro } from '../utils/pricing';

// ── Passi del caricamento finale ──
const LOADING_STEPS = [
  'Calcolo del costo della posa…',
  'Aggiunta del materiale selezionato…',
  'Inclusione degli extra richiesti…',
  'Generazione del preventivo finale…',
];

// ── Import immagini doghe ──────────────────────────────────────────────────
import imgLaminato from '../assets/images/parquet/dogheParquet/laminatoDoghe.webp';
import imgPrefinito from '../assets/images/parquet/dogheParquet/prefinitoDoga.webp';
import imgSPC from '../assets/images/parquet/dogheParquet/spcDoga.webp';
import imgPrefinitoFlottante from '../assets/images/parquet/dogheParquet/prefinitoFlottanteDoga.webp';
import imgPrefinitoSpina from '../assets/images/parquet/dogheParquet/prefinitoSpinaDogaPosato.webp';
import imgSPCSpina from '../assets/images/parquet/dogheParquet/spcSpinaDoga.webp';

// ── Badge colors per categoria ────────────────────────────────────────────
const CATEGORY_STYLES = {
  spc: {
    badge: 'bg-indigo-100 text-indigo-700',
    accent: '#6366f1',
    border: 'border-indigo-200',
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    light: 'from-indigo-50',
  },
  laminato: {
    badge: 'bg-emerald-100 text-emerald-700',
    accent: '#10b981',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    light: 'from-emerald-50',
  },
  legno: {
    badge: 'bg-orange-100 text-orange-700',
    accent: '#ea580c',
    border: 'border-orange-200',
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    light: 'from-orange-50',
  },
};

// ── Material options (griglia 2 colonne, ordinati per categoria) ──────────
const MATERIALS = [
  { id: 'spc', name: 'SPC Effetto Legno', shortDesc: 'Impermeabile, resistente, posa a click', pros: ['Impermeabile 100%', 'Anti-graffio'], posaPrice: PRICING.base.spc_dritto, matRange: PRICING.fornitura.spc, image: imgSPC, category: 'spc' },
  { id: 'spc-spina', name: 'SPC Spina Italiana', shortDesc: 'Design a spina, resistenza SPC', pros: ['Design a spina', 'Impermeabile'], posaPrice: PRICING.base.spc_spina, matRange: PRICING.fornitura.spc_spina, image: imgSPCSpina, category: 'spc' },
  { id: 'laminato', name: 'Laminato', shortDesc: 'Economico, resistente, posa flottante', pros: ['Economico', 'Resistente ai graffi'], posaPrice: PRICING.base.laminato, matRange: PRICING.fornitura.laminato, image: imgLaminato, category: 'laminato' },
  { id: 'prefinito', name: 'Parquet Prefinito', shortDesc: 'Legno vero, posa incollata o flottante', pros: ['Legno vero', 'Verniciatura UV'], posaPrice: PRICING.base.prefinito_dritto, matRange: PRICING.fornitura.prefinito_dritto, image: imgPrefinito, category: 'legno' },
  { id: 'prefinito-flottante', name: 'Prefinito Flottante', shortDesc: 'Legno vero, posa rapida senza colla', pros: ['Posa pulita e veloce', 'Posa facile'], posaPrice: PRICING.base.prefinito_flottante, matRange: PRICING.fornitura.prefinito_flottante, image: imgPrefinitoFlottante, category: 'legno' },
  { id: 'prefinito-spina', name: 'Prefinito a Spina', shortDesc: 'Eleganza senza tempo, posa artistica', pros: ['Design elegante', 'Legno vero'], posaPrice: PRICING.base.prefinito_spina, matRange: PRICING.fornitura.prefinito_spina, image: imgPrefinitoSpina, category: 'legno' },
];

// ── Quality tiers ─────────────────────────────────────────────────────────
const QUALITY_TIERS = [
  { id: 'standard', label: 'Standard', tagline: 'Voglio qualità al prezzo giusto', icon: Shield, textColor: 'text-emerald-700', borderColor: 'border-emerald-200', bgColor: 'bg-emerald-50', accent: '#10b981', accentBg: 'bg-emerald-500', accentText: 'text-white', iconBg: 'bg-emerald-100 text-emerald-700', badgeBg: 'bg-emerald-100 text-emerald-700', features: ['Leroy Merlin, Tecnomat ...', 'Miglior qualità prezzo'], gradient: 'from-emerald-50 to-white' },
  { id: 'premium', label: 'Premium', tagline: 'Voglio qualcosa di più', icon: Star, textColor: 'text-amber-500', borderColor: 'border-amber-300', bgColor: 'bg-amber-50', accent: '#f59e0b', accentBg: 'bg-amber-400', accentText: 'text-amber-950', iconBg: 'bg-amber-400 text-amber-950', badgeBg: 'bg-amber-100 text-amber-700', features: ['Marchi affidabili', 'Qualità superiore'], gradient: 'from-amber-50 to-white' },
];

// ── Quality tier selector — cinematografico ───────────────────────────────
function QualitySelector({ selected, onSelect, material }) {
  const matMin = material.matRange.min;
  const matMax = material.matRange.max;

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-[26px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-2">Che qualità vuoi?</h2>
        <p className="text-[15px] text-gray-400">Scegli la qualità del materiale</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {QUALITY_TIERS.map((tier) => {
          const Icon = tier.icon;
          const isActive = selected === tier.id;
          const matPrice = tier.id === 'standard' ? matMin : matMax;

          return (
            <button
              key={tier.id}
              onClick={() => onSelect(tier.id)}
              className={`group relative text-left rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer bg-gradient-to-br ${tier.gradient} ${
                isActive
                  ? 'scale-[1.02] shadow-xl'
                  : 'hover:-translate-y-1 hover:shadow-lg'
              }`}
              style={{ border: `2px solid ${isActive ? tier.accent : tier.borderColor}` }}
            >
              {/* ── Top accent bar — sempre colorata ── */}
              <div
                className="h-1.5 w-full transition-all duration-500"
                style={{
                  backgroundColor: isActive ? tier.accent : `${tier.accent}55`,
                  opacity: isActive ? 1 : 0.6,
                }}
              />

              {/* ── Content ── */}
              <div className="p-5">
                {/* Icon + label — icona sempre colorata */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? tier.iconBg + ' scale-110' : tier.badgeBg
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-[17px] font-black tracking-tight ${tier.textColor}`}>
                      {tier.label}
                    </h3>
                  </div>
                </div>

                {/* Tagline — sempre visibile */}
                <p className="text-[11px] font-semibold mb-4 text-gray-700">
                  {tier.tagline}
                </p>

                {/* Prezzo — grande, colorato */}
                <div className="mb-4">
                  <span className={`text-[32px] font-black leading-none tracking-tight ${tier.textColor}`}>
                    €{matPrice}
                  </span>
                  <span className="text-[12px] text-gray-500 font-medium ml-1">/mq</span>
                </div>

                {/* Feature pills — colorate sempre */}
                <div className="flex flex-wrap gap-1.5">
                  {tier.features.map((f) => (
                    <span key={f} className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-full ${tier.badgeBg}`}>
                      <Check className="w-2 h-2" strokeWidth={3} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Preset SQM buttons ────────────────────────────────────────────────────
const PRESET_SQM = [20, 35, 50, 70, 100];

// ── Optional extras ───────────────────────────────────────────────────────
const EXTRAS = [
  { id: 'smaltimento_macerie', label: 'Rimozione vecchio pavimento', description: 'Smontaggio e smaltimento del vecchio pavimento', price: PRICING.variables.rimozione_e_smaltimento_mq, unit: 'in tutto', icon: Trash2, perSqm: true, color: 'bg-rose-50 border-rose-200 text-rose-600', iconBg: 'bg-rose-100 text-rose-600' },
  { id: 'livellamento', label: 'Livellamento pavimento', description: 'Massetto autolivellante per superfici irregolari', price: PRICING.variables.livellamento_mq_low, unit: 'in tutto', icon: PaintBucket, perSqm: true, color: 'bg-sky-50 border-sky-200 text-sky-600', iconBg: 'bg-sky-100 text-sky-600' },
  { id: 'spostamento_mobili_piccoli', label: 'Spostamento mobili piccoli', description: 'Sedie, tavoli, complementi d\'arredo leggeri', price: PRICING.variables.spostamento_mobili_piccoli, unit: 'in tutto', icon: Truck, perSqm: false, color: 'bg-amber-50 border-amber-200 text-amber-600', iconBg: 'bg-amber-100 text-amber-600' },
  { id: 'spostamento_mobili_grandi', label: 'Spostamento mobili grandi', description: 'Armadi, divani, letti, mobili ingombranti', price: PRICING.variables.spostamento_mobili_grandi, unit: 'in tutto', icon: Truck, perSqm: false, color: 'bg-orange-50 border-orange-200 text-orange-600', iconBg: 'bg-orange-100 text-orange-600' },
  { id: 'taglio_porte', label: 'Taglio porte', description: 'Rifilatura inferiore per il nuovo pavimento', price: PRICING.variables.taglio_porte_cad, unit: 'cad.', icon: DoorOpen, perSqm: false, color: 'bg-purple-50 border-purple-200 text-purple-600', iconBg: 'bg-purple-100 text-purple-600' },
  { id: 'rimozione_battiscopa', label: 'Rimozione battiscopa', description: 'Rimozione e smaltimento battiscopa esistenti', price: PRICING.variables.rimozione_battiscopa_ml, unit: 'al ml', icon: Hammer, perSqm: false, color: 'bg-stone-50 border-stone-200 text-stone-600', iconBg: 'bg-stone-100 text-stone-600' },
  { id: 'facchinaggio', label: 'Trasporto extra', description: 'Ritiro, trasporto e scarico materiali al piano se acquisti da un altro negozio e hai bisogno che ci occupiamo noi del trasporto', price: PRICING.variables.facchinaggio_forfait, unit: 'in tutto', icon: Wrench, perSqm: false, color: 'bg-teal-50 border-teal-200 text-teal-600', iconBg: 'bg-teal-100 text-teal-600' },
];

// ── Progress bar (Apple style) — linea tratteggiata che collega i pallini ──
function ProgressBar({ step, totalSteps }) {
  const labels = ['Pavimento', 'Qualità', 'Metri', 'Extra', 'Prezzo'];
  const stepWidth = 100 / totalSteps; // 20% per step
  const dotCenter = stepWidth / 2; // 10% — centro del primo pallino
  const progressWidth = step === 1 ? 0 : ((step - 1) / (totalSteps - 1)) * (100 - stepWidth);
  return (
    <div className="mb-8 select-none">
      <div className="relative">
        {/* Linea di sfondo — tratteggiata, collega centro a centro dei pallini */}
        <div
          className="absolute top-[7px] h-px"
          style={{
            left: `${dotCenter}%`,
            right: `${dotCenter}%`,
            backgroundImage: 'linear-gradient(to right, #e5e7eb 4px, transparent 4px)',
            backgroundSize: '8px 1px',
          }}
        />
        {/* Linea di progresso — verde, sopra quella di sfondo */}
        <div
          className="absolute top-[7px] h-px bg-emerald-500 transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{
            left: `${dotCenter}%`,
            width: `${progressWidth}%`,
            backgroundImage: 'linear-gradient(to right, #10b981 4px, transparent 4px)',
            backgroundSize: '8px 1px',
          }}
        />
        {/* Pallini + label — ogni step occupa esattamente 20% */}
        <div className="flex">
          {labels.map((label, i) => {
            const stepNum = i + 1;
            const isCurrent = stepNum === step;
            const isCompleted = stepNum < step;
            return (
              <div key={label} className="flex flex-col items-center gap-1.5 z-10" style={{ width: `${stepWidth}%`, minWidth: 0 }}>
                {/* Pallino */}
                <div
                  className={`rounded-full transition-all duration-500 ${
                    isCurrent
                      ? 'pw-dot-current w-[15px] h-[15px] bg-emerald-500 ring-[3px] ring-emerald-500/15'
                      : isCompleted
                      ? 'w-[13px] h-[13px] bg-emerald-500'
                      : 'w-[13px] h-[13px] bg-gray-200'
                  }`}
                />
                <span
                  className={`text-[9px] sm:text-[10px] font-medium transition-colors duration-500 whitespace-nowrap ${
                    isCurrent
                      ? 'text-emerald-600'
                      : isCompleted
                      ? 'text-emerald-500'
                      : 'text-gray-300'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Material card — immagine come sfondo full-bleed ───────────────────────
function MaterialCard({ material, isSelected, onClick }) {
  const cat = CATEGORY_STYLES[material.category];

  return (
    <button
      onClick={onClick}
      className={`group relative text-left rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden min-h-[230px] ${
        isSelected
          ? `${cat.border} shadow-xl scale-[1.02]`
          : 'border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      {/* ── Immagine come sfondo full-card ── */}
      <div className="absolute inset-0">
        <img
          src={material.image}
          alt={material.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-[1deg]"
          loading="lazy"
        />
        {/* Overlay scuro per leggibilità — più forte in basso */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

        {/* Overlay color categoria quando selezionata */}
        {isSelected && (
          <div className={`absolute inset-0 ${cat.bg} mix-blend-multiply opacity-30`} />
        )}
      </div>

      {/* ── Badge categoria — colorato, sopra la foto ── */}
      <div className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md z-10 ${cat.badge}`}>
        {material.category === 'spc' ? 'SPC' : material.category === 'laminato' ? 'Laminato' : 'Legno'}
      </div>

      {/* Selected check — in alto a destra */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-lg z-10">
          <Check className="w-3 h-3 text-gray-900" />
        </div>
      )}

      {/* ── Contenuto sopra la foto ── */}
      <div className="relative z-10 flex flex-col min-h-[230px] p-3.5">
        {/* Spaziatore per badge */}
        <div className="flex-1" />

        {/* Nome + descrizione */}
        <div className="mb-2">
          <h3 className="text-[15px] font-black text-white leading-tight drop-shadow-md">{material.name}</h3>
          <p className="text-[10px] text-white/70 leading-snug mt-0.5">{material.shortDesc}</p>
        </div>

        {/* Price row — glass dark */}
        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10 mb-2">
          <div className="flex-1">
            <p className="text-[8px] text-white/50 font-semibold uppercase tracking-wide">Posa</p>
            <p className="text-[13px] font-extrabold text-white">€{material.posaPrice}<span className="text-[9px] text-white/50 font-medium">/mq</span></p>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex-1">
            <p className="text-[8px] text-white/50 font-semibold uppercase tracking-wide">Materiale</p>
            <p className="text-[13px] font-extrabold text-white">€{material.matRange.min}–{material.matRange.max}<span className="text-[9px] text-white/50 font-medium">/mq</span></p>
          </div>
        </div>

        {/* Pros pills — glass */}
        <div className="flex flex-wrap gap-1.5">
          {material.pros.map((pro, i) => (
            <span key={i} className="inline-flex items-center gap-1 text-[8px] font-semibold px-1.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white/80 border border-white/10">
              <span className="w-1 h-1 rounded-full bg-white/60" />
              {pro}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

// ── SQM input ─────────────────────────────────────────────────────────────
function SqmInput({ value, onChange, onPreset }) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"><Ruler className="w-6 h-6" /></div>
        <input type="number" inputMode="numeric" min={1} max={500} value={value || ''} onChange={(e) => onChange(Number(e.target.value) || 0)} placeholder="Inserisci i metri quadri" className="w-full pl-14 pr-5 py-5 text-[24px] font-bold text-gray-900 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none transition-all duration-300 focus:border-gray-900 focus:bg-white focus:shadow-xl focus:shadow-gray-900/10 placeholder:text-gray-300" autoFocus />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-3">Oppure scegli una misura</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_SQM.map((sqm) => (
            <button key={sqm} onClick={() => onPreset(sqm)} className={`px-5 py-3 rounded-xl text-[14px] font-bold transition-all duration-200 cursor-pointer ${value === sqm ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-100'}`}>{sqm} m²</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Extras selector ───────────────────────────────────────────────────────
function ExtrasSelector({ selected, onToggle, sqm }) {
  return (
    <div className="space-y-3">
      {EXTRAS.map((extra) => {
        const Icon = extra.icon;
        const isActive = selected.includes(extra.id);
        const extraCost = extra.perSqm ? extra.price * sqm : extra.price;
        return (
          <button key={extra.id} onClick={() => onToggle(extra.id)} className={`w-full text-left rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${isActive ? `${extra.color} shadow-md` : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'}`}>
            <div className="flex items-center gap-4 p-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isActive ? extra.iconBg : 'bg-gray-50 text-gray-400'}`}><Icon className="w-5 h-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-bold text-gray-900">{extra.label}</h4>
                  {isActive && <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full"><Check className="w-2.5 h-2.5" />Aggiunto</span>}
                </div>
                <p className="text-[12px] text-gray-500">{extra.description}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-[16px] font-extrabold transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>+€{fmtEuro(extraCost)}</p>
                <p className="text-[10px] text-gray-400">{extra.unit}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Price display — Apple/Notion style ────────────────────────────────────
function PriceDisplay({ posaTotal, matCost, material, quality, sqm, extras, extrasTotal, isVisible, onWhatsApp }) {
  if (!isVisible || !material || !sqm) return null;
  const grandTotalMin = posaTotal + (material.matRange.min * sqm) + extrasTotal;
  const grandTotalMax = posaTotal + (material.matRange.max * sqm) + extrasTotal;
  const matTotal = matCost * sqm;

  const cat = CATEGORY_STYLES[material.category];

  return (
    <div
      className="transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      {/* ── Hero price card ── */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-900/5 p-7 sm:p-8 mb-4">
        {/* Label */}
        <div className="flex items-center gap-2 mb-5">
          <div className={`w-2 h-2 rounded-full ${cat.bg}`} />
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
            Preventivo indicativo
          </span>
        </div>

        {/* Price range — large, clean */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[40px] sm:text-[48px] font-extrabold text-gray-900 leading-none tracking-tight">
              €{fmtEuro(grandTotalMin)}
            </span>
            <span className="text-[18px] text-gray-300 font-bold mx-1">–</span>
            <span className="text-[40px] sm:text-[48px] font-extrabold text-gray-900 leading-none tracking-tight">
              €{fmtEuro(grandTotalMax)}
            </span>
          </div>
          <p className="text-[13px] text-gray-400 font-medium mt-1">
            Costo totale stimato per {sqm} m² di {material.name.toLowerCase()}
          </p>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-xl px-3.5 py-3">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-0.5">Posa</p>
            <p className="text-[16px] font-bold text-gray-900">€{fmtEuro(posaTotal)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3.5 py-3">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-0.5">Materiale</p>
            <p className="text-[16px] font-bold text-gray-900">€{fmtEuro(matTotal)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3.5 py-3">
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-[0.1em] mb-0.5">Extra</p>
            <p className="text-[16px] font-bold text-gray-900">
              {extras.length > 0 ? `+€${fmtEuro(extrasTotal)}` : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Detailed breakdown ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-7 space-y-5">
        <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
          Dettaglio voci
        </h3>

        {/* Posa */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[14px] font-semibold text-gray-900">Posa in opera</span>
            <span className="text-[14px] font-semibold text-gray-900">€{fmtEuro(posaTotal)}</span>
          </div>
          <p className="text-[12px] text-gray-400">{sqm} m² × €{material.posaPrice}/mq — {material.name}</p>
        </div>

        <div className="h-px bg-gray-50" />

        {/* Materiale */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-gray-900">Materiale</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${quality === 'premium' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                {quality === 'premium' ? 'Premium' : 'Standard'}
              </span>
            </div>
            <span className="text-[14px] font-semibold text-gray-900">€{fmtEuro(matTotal)}</span>
          </div>
          <p className="text-[12px] text-gray-400">{sqm} m² × €{matCost}/mq</p>
        </div>

        {/* Extra — solo se presenti */}
        {extras.length > 0 && (
          <>
            <div className="h-px bg-gray-50" />
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[14px] font-semibold text-gray-900">Extra e accessori</span>
                <span className="text-[14px] font-semibold text-gray-900">+€{fmtEuro(extrasTotal)}</span>
              </div>
              <div className="space-y-2">
                {extras.map((extraId) => {
                  const extra = EXTRAS.find(e => e.id === extraId);
                  if (!extra) return null;
                  const cost = extra.perSqm ? extra.price * sqm : extra.price;
                  const Icon = extra.icon;
                  return (
                    <div key={extraId} className="flex items-center gap-3 py-1.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${extra.iconBg}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-700">{extra.label}</p>
                        <p className="text-[11px] text-gray-400">{extra.description}</p>
                      </div>
                      <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap">+€{fmtEuro(cost)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ── Total row ── */}
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between pt-1">
          <span className="text-[15px] font-bold text-gray-900">Totale stimato</span>
          <div className="text-right">
            <span className="text-[22px] font-extrabold text-gray-900">€{fmtEuro(grandTotalMin)}</span>
            <span className="text-[13px] text-gray-300 font-bold mx-1">–</span>
            <span className="text-[22px] font-extrabold text-gray-900">€{fmtEuro(grandTotalMax)}</span>
          </div>
        </div>
      </div>

      {/* ── WhatsApp CTA — Apple/Notion style ── */}
      <div className="mt-6">
        <button
          onClick={onWhatsApp}
          className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-gray-900 font-semibold text-[15px] border border-gray-200 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] cursor-pointer shadow-sm hover:shadow-md"
        >
          <MessageCircle className="w-5 h-5 text-[#25D366]" />
          <span>Salva il preventivo su WhatsApp</span>
        </button>
        <p className="mt-2.5 text-[11px] text-gray-400 text-center leading-relaxed">
          Nessun obbligo di acquisto — salvalo in chat
        </p>
      </div>

      {/* ── Disclaimer ── */}
      <p className="mt-4 text-[11px] text-gray-400 leading-relaxed text-center">
        I prezzi sono indicativi. Un sopralluogo gratuito è consigliato.
      </p>
    </div>
  );
}

// ── Animated step — crossfade elegante (fade + scala + blur, zero movimenti verticali) ──
function AnimatedStep({ children, stepKey }) {
  const [state, setState] = useState({ key: stepKey, leaving: null });
  const childrenRef = useRef(children);

  if (stepKey !== state.key) {
    setState({
      key: stepKey,
      leaving: { id: `${state.key}-${Date.now()}`, children: childrenRef.current },
    });
  }

  childrenRef.current = children;

  useEffect(() => {
    if (!state.leaving) return;
    const timer = setTimeout(() => {
      setState((s) =>
        s.leaving && s.leaving.id === state.leaving.id ? { ...s, leaving: null } : s
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [state.leaving]);

  return (
    <div className="pw-stage">
      {state.leaving && (
        <div key={`leaving-${state.leaving.id}`} className="pw-step pw-step-exit" aria-hidden="true">
          {state.leaving.children}
        </div>
      )}
      <div key={state.key} className="pw-step pw-step-enter">
        {children}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function PriceWizard({ compact = false }) {
  const [step, setStep] = useState(1);
  const [selectedMat, setSelectedMat] = useState(null);
  const [quality, setQuality] = useState(null);
  const [sqm, setSqm] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [calculating, setCalculating] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const timerRef = useRef(null);
  const stepsTimerRef = useRef(null);

  const matCost = useMemo(() => !selectedMat || !quality ? 0 : quality === 'standard' ? selectedMat.matRange.min : selectedMat.matRange.max, [selectedMat, quality]);
  const posaTotal = useMemo(() => !selectedMat || !sqm ? 0 : selectedMat.posaPrice * sqm, [selectedMat, sqm]);
  const extrasTotal = useMemo(() => selectedExtras.reduce((sum, extraId) => { const extra = EXTRAS.find(e => e.id === extraId); if (!extra) return sum; return sum + (extra.perSqm ? extra.price * sqm : extra.price); }, 0), [selectedExtras, sqm]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
  }, []);

  const handleSelectMat = useCallback((mat) => { setSelectedMat(mat); track('price_wizard_material', { material: mat.id, category: mat.category }); setTimeout(() => setStep(2), 280); }, []);
  const handleSelectQuality = useCallback((tier) => { setQuality(tier); track('price_wizard_quality', { tier, material: selectedMat?.id }); setTimeout(() => setStep(3), 220); }, [selectedMat]);
  const handleSqmChange = useCallback((val) => { setSqm(val); }, []);
  const handlePresetSqm = useCallback((val) => { setSqm(val); track('price_wizard_sqm_preset', { sqm: val }); }, []);
  const handleContinueToExtras = useCallback(() => { if (sqm > 0) { setStep(4); track('price_wizard_to_extras', { sqm }); } }, [sqm]);
  const handleToggleExtra = useCallback((extraId) => { setSelectedExtras((prev) => { const next = prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]; track('price_wizard_extra_toggle', { extra: extraId, active: next.includes(extraId) }); return next; }); }, []);
  const handleContinueToResult = useCallback(() => {
    if (calculating) return;
    setCalculating(true);
    setLoadStep(0);

    if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
    stepsTimerRef.current = setTimeout(() => setLoadStep(1), 800);
    setTimeout(() => setLoadStep(2), 1600);
    setTimeout(() => setLoadStep(3), 2400);
    const step4 = setTimeout(() => setLoadStep(4), 3200);
    stepsTimerRef.current = step4;

    timerRef.current = setTimeout(() => {
      setStep(5);
      setCalculating(false);
      setLoadStep(0);
      trackPriceShown({
        source: 'pricewizard',
        serviceLabel: selectedMat?.name,
        sqm,
        posa: posaTotal,
        total: posaTotal + (selectedMat.matRange.min * sqm) + extrasTotal,
      });
    }, 3600);
  }, [calculating, selectedMat, quality, sqm, posaTotal, matCost, selectedExtras, extrasTotal]);
  const handleReset = useCallback(() => {
    setStep(1); setSelectedMat(null); setQuality(null); setSqm(0); setSelectedExtras([]);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
    setCalculating(false); setLoadStep(0);
    track('price_wizard_reset');
  }, []);

  // CTA WhatsApp — traccia la conversione Lead per Google Ads e apre il messaggio precompilato
  const handleWhatsApp = useCallback(() => {
    if (!selectedMat || !quality || sqm <= 0) return;
    const grandTotalMin = posaTotal + (selectedMat.matRange.min * sqm) + extrasTotal;
    const grandTotalMax = posaTotal + (selectedMat.matRange.max * sqm) + extrasTotal;
    const extrasList = selectedExtras.length > 0
      ? selectedExtras.map((id) => {
          const extra = EXTRAS.find(e => e.id === id);
          return extra ? `• ${extra.label}: +€${fmtEuro(extra.perSqm ? extra.price * sqm : extra.price)}` : null;
        }).filter(Boolean).join('\n')
      : '';
    const message = [
      'Ciao, ho appena fatto il preventivo sul sito:',
      `• Pavimento: ${selectedMat.name}`,
      `• Qualità: ${quality === 'premium' ? 'Premium' : 'Standard'}`,
      `• Superficie: ${sqm} m²`,
      ...(extrasList ? [`• Extra:\n${extrasList}`] : []),
      '',
      `• Stima: €${fmtEuro(grandTotalMin)} – €${fmtEuro(grandTotalMax)}`,
    ].join('\n');
    openWhatsAppWithTracking({
      message, serviceLabel: selectedMat.name, sqm,
      posa: posaTotal, total: grandTotalMin, source: 'pricewizard',
    });
  }, [selectedMat, quality, sqm, posaTotal, matCost, extrasTotal, selectedExtras]);

  return (
    <section id="price-wizard" className={`bg-white ${compact ? 'py-4 sm:py-6' : 'py-10 sm:py-16'} pt-16`}>
      <div className={`${compact ? 'max-w-2xl mx-auto' : 'max-w-2xl mx-auto px-4'}`}>
        <ProgressBar step={step} totalSteps={5} />

        <AnimatedStep stepKey={step}>
          {step === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-[22px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-2">Scegli il tuo pavimento</h2>
                <p className="text-[15px] text-gray-400 max-w-md mx-auto">Non chiediamo email o telefono</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {MATERIALS.map((mat) => (
                  <MaterialCard key={mat.id} material={mat} isSelected={selectedMat?.id === mat.id} onClick={() => handleSelectMat(mat)} />
                ))}
              </div>
            </div>
          )}

          {step === 2 && selectedMat && (
            <QualitySelector selected={quality} onSelect={handleSelectQuality} material={selectedMat} />
          )}

          {step === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-[26px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-2">Quanti metri quadri?</h2>
                <p className="text-[15px] text-gray-400">Inserisci la superficie del tuo ambiente</p>
              </div>
              <SqmInput value={sqm} onChange={handleSqmChange} onPreset={handlePresetSqm} />
              <div className="mt-8 flex justify-center">
                <button onClick={handleContinueToExtras} disabled={!sqm || sqm <= 0} className={`inline-flex items-center gap-2.5 px-10 py-4 rounded-xl text-[15px] font-bold transition-all duration-300 cursor-pointer ${sqm > 0 ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}>
                  Continua <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-[26px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-2">Aggiungi optional</h2>
                <p className="text-[15px] text-gray-400">Seleziona i servizi extra che ti servono — puoi saltare questo passaggio</p>
              </div>
              <ExtrasSelector selected={selectedExtras} onToggle={handleToggleExtra} sqm={sqm} />
              <div className="mt-8 flex justify-center">
                <button onClick={handleContinueToResult} className="inline-flex items-center gap-2.5 px-10 py-4 rounded-xl text-[15px] font-bold bg-gray-900 text-white shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer">
                  Vedi il prezzo finale <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-[26px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-2">Ecco il costo totale</h2>
                <p className="text-[15px] text-gray-400">Posa + materiale + extra — prezzo indicativo</p>
              </div>
              <PriceDisplay posaTotal={posaTotal} matCost={matCost} material={selectedMat} quality={quality} sqm={sqm} extras={selectedExtras} extrasTotal={extrasTotal} isVisible={true} onWhatsApp={handleWhatsApp} />
              <div className="mt-6 flex justify-center">
                <button onClick={handleReset} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-gray-400 bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 cursor-pointer">
                  <RotateCcw className="w-4 h-4" /> Ricomincia da capo
                </button>
              </div>
            </div>
          )}
        </AnimatedStep>
      </div>

      {/* ── Pop-up caricamento — Apple/Notion style ── */}
      {calculating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-md" />

          <div className="relative rounded-3xl shadow-2xl shadow-gray-900/10 w-full max-w-sm overflow-hidden">
            {/* ── Immagine come sfondo completo del pop-up ── */}
            {selectedMat && (
              <>
                <img
                  src={selectedMat.image}
                  alt={selectedMat.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay scuro leggero per mantenere leggibile il testo */}
                <div className="absolute inset-0 bg-black/60" />
              </>
            )}

            <div className="relative z-10 p-7">
              {/* Badge materiale */}
              {selectedMat && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm mb-5">
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedMat.category === 'spc' ? 'bg-indigo-500' : selectedMat.category === 'laminato' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                  <span className="text-[10px] font-bold text-gray-700">{selectedMat.name}</span>
                </div>
              )}

              <div className="flex flex-col items-center mb-5">
                <div className="relative w-11 h-11 mb-3">
                  <div className="absolute inset-0 rounded-full border-[3px] border-white/25" />
                  <div className="absolute inset-0 rounded-full border-[3px] border-white border-t-transparent animate-spin"
                    style={{ animationDuration: '0.9s' }}
                  />
                </div>
                <h4 className="text-[15px] font-bold text-white">Calcolo del preventivo…</h4>
                <p className="text-[11px] text-white/60 font-medium mt-0.5">Posa + materiale + extra</p>
              </div>

              <div className="space-y-3">
                {LOADING_STEPS.map((label, i) => {
                  const isDone = loadStep > i;
                  const isCurrent = loadStep === i;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 transition-all duration-500 ${
                        isDone || isCurrent ? 'opacity-100 translate-x-0' : 'opacity-35 translate-x-1'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isDone
                            ? 'bg-emerald-500'
                            : isCurrent
                            ? 'bg-white'
                            : 'bg-white/15'
                        }`}
                      >
                        {isDone ? (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : isCurrent ? (
                          <svg className="w-3 h-3 text-gray-900 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <span className="text-[9px] font-bold text-white/70">{i + 1}</span>
                        )}
                      </div>
                      <span className={`text-[12px] ${isDone ? 'text-white/70 font-medium' : isCurrent ? 'text-white font-semibold' : 'text-white/45 font-medium'}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 h-1 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full bg-white transition-all duration-700 ease-out"
                  style={{ width: `${((loadStep + 0.5) / LOADING_STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}