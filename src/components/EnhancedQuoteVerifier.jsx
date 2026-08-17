// =============================================================================
// ENHANCED QUOTE VERIFIER — "Hai già ricevuto un preventivo?"
// Stile soft/premium coerente con il Carosello Lavori (NewLandingHero).
// Il prezzo della POSA è fisso per fascia; il MATERIALE viene chiesto all'utente
// (€/mq o totale) quando il preventivo include la fornitura.
// Il risultato NON è immediato: mostra ~3.5s di "calcolo" prima del verdetto.
// =============================================================================

import { useState, useMemo, useRef, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Phone,
  MessageCircle,
  Info,
  Calculator,
  Ruler,
  Package,
  Droplets,
  Shield,
  Leaf,
  BadgeCheck,
  Wrench,
  Layers,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { track } from '../utils/analytics';
import { PRICING } from '../utils/pricing';

// ── Import immagini materiali per il verdetto ──
import imgSPC from '../assets/images/parquet/dogheParquet/spcDoga.webp';
import imgSPCSpina from '../assets/images/parquet/dogheParquet/spcSpinaDoga.webp';
import imgLaminato from '../assets/images/parquet/dogheParquet/laminatoDoghe.webp';
import imgPrefinito from '../assets/images/parquet/dogheParquet/prefinitoDoga.webp';
import imgPrefinitoFlottante from '../assets/images/parquet/dogheParquet/prefinitoFlottanteDoga.webp';
import imgPrefinitoSpina from '../assets/images/parquet/dogheParquet/prefinitoSpinaDogaPosato.webp';

const MATERIAL_IMAGE_MAP = {
  'spc-dritto': imgSPC,
  'spc-spina': imgSPCSpina,
  'laminato-dritto': imgLaminato,
  'prefinito-dritto': imgPrefinito,
  'prefinito-flottante': imgPrefinitoFlottante,
  'prefinito-spina': imgPrefinitoSpina,
};

const fmt = (n) => n.toLocaleString('it-IT');

const PHONE_DISPLAY = '+39 351 580 5055';
const WHATSAPP_NUMBER = '393515805055';

// ── Fasce POSA (solo manodopera) — importate da pricing.js, fonte unica ──
const VERIFIER = PRICING.verifierRanges;
const POSA_CONFIG = {
  spc: {
    label: 'SPC',
    icon: Droplets,
    normalRange: { min: VERIFIER.spc.min, max: VERIFIER.spc.max },
    variants: [
      { value: 'dritto', label: 'Dritto' },
      { value: 'spina', label: 'A spina' },
    ],
  },
  laminato: {
    label: 'Laminato',
    icon: Shield,
    normalRange: { min: VERIFIER.laminato.min, max: VERIFIER.laminato.max },
    variants: [
      { value: 'dritto', label: 'Dritto' },
    ],
  },
  prefinito: {
    label: 'Prefinito',
    icon: Leaf,
    normalRange: { min: VERIFIER.prefinito.min, max: VERIFIER.prefinito.max },
    variants: [
      { value: 'dritto', label: 'Dritto incollato' },
      { value: 'flottante', label: 'Flottante' },
      { value: 'spina', label: 'A spina' },
    ],
  },
};

const BATTISCOPA_POSA_PER_SQM = PRICING.base.battiscopa_low; // €10/mq (solo posa)
const MIN_POSA_MQ = 40;
const POSA_MIN_TOTAL = PRICING.posaMinTotal; // €800 prezzo a corpo superfici piccole

// ── Preset rapidi ──
const PRESETS = [
  { label: 'Monolocale', sqm: 35 },
  { label: 'Bilocale', sqm: 50 },
  { label: 'Trilocale', sqm: 80 },
  { label: 'Casa', sqm: 110 },
];

const ZONE = {
  low: { label: 'Sotto fascia', color: '#F59E0B', text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', band: 'bg-amber-100' },
  normal: { label: 'In fascia', color: '#10B981', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', band: 'bg-emerald-100' },
  high: { label: 'Sopra fascia', color: '#EF4444', text: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', band: 'bg-red-100' },
};

// ── Passi del caricamento ──
const LOADING_STEPS = [
  'Confronto con il listino prezzi aggiornato…',
  'Calcolo del prezzo di posa al mq…',
  'Verifica della fascia di prezzo…',
];

// =============================================================================
// PRICE GAUGE — Clean Apple/Notion style segmented bar
// =============================================================================
function PriceGauge({ pricePerSqm, min, max }) {
  const displayMin = Math.max(0, Math.floor((min * 0.5) / 5) * 5);
  const displayMax = Math.ceil((max * 1.6) / 5) * 5;
  const range = displayMax - displayMin;
  if (range <= 0) return null;

  const normalStart = ((min - displayMin) / range) * 100;
  const normalEnd = ((max - displayMin) / range) * 100;
  const markerPos = Math.min(Math.max(((pricePerSqm - displayMin) / range) * 100, 3), 97);

  const zone = pricePerSqm < min ? 'low' : pricePerSqm > max ? 'high' : 'normal';
  const z = ZONE[zone];

  return (
    <div className="mt-6">
      {/* Barra pulita */}
      <div className="relative h-2 rounded-full bg-gray-100 overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-amber-300/70" style={{ width: `${normalStart}%` }} />
        <div
          className="absolute inset-y-0"
          style={{ left: `${normalStart}%`, width: `${Math.max(normalEnd - normalStart, 2)}%`, backgroundColor: '#34D399' }}
        />
        <div className="absolute inset-y-0 right-0 bg-red-400/70" style={{ width: `${100 - normalEnd}%` }} />

        {/* Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border-2 z-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ left: `${markerPos}%`, borderColor: z.color }}
        >
          <div className="absolute inset-[3px] rounded-full" style={{ backgroundColor: z.color }} />
        </div>
      </div>

      {/* Etichette + valori */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-[10px] font-medium text-gray-400">€{displayMin}</span>
        <span className="text-[10px] font-medium text-gray-400">fascia €{min}–{max}/mq</span>
        <span className="text-[10px] font-medium text-gray-400">€{displayMax}</span>
      </div>

      {/* Badge risultato pulito */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: z.color }} />
        <span className={`text-[12px] font-semibold ${z.text}`}>
          €{pricePerSqm}/mq di posa — {z.label}
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function EnhancedQuoteVerifier() {
  const [sqm, setSqm] = useState('');
  const [material, setMaterial] = useState('spc');
  const [variant, setVariant] = useState('dritto');
  const [mode, setMode] = useState('fornitura'); // 'solo' | 'fornitura'
  const [quotedPrice, setQuotedPrice] = useState('');
  const [materialPrice, setMaterialPrice] = useState('');
  const [materialUnit, setMaterialUnit] = useState('sqm'); // 'sqm' | 'total'
  const [includesBattiscopa, setIncludesBattiscopa] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [showMethod, setShowMethod] = useState(false);
  const timerRef = useRef(null);
  const stepsTimerRef = useRef(null);

  const config = POSA_CONFIG[material];
  const currentRange = config.normalRange;
  const materialLabel = config.label;

  // Pulisci i timer al unmount
  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
  }, []);

  const handleMaterialChange = (m) => {
    setMaterial(m);
    setVariant(POSA_CONFIG[m].variants[0].value);
    setVerdict(null);
    setCalculating(false);
    setLoadStep(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
  };
  const resetVerdict = () => {
    setVerdict(null);
    setCalculating(false);
    setLoadStep(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
  };

  // ── Calcolo: isola il costo della sola posa ──
  const liveCalc = useMemo(() => {
    const mq = Number(sqm);
    const total = Number(quotedPrice);
    if (!total || !mq) return null;

    let posaTotal = total;
    const deductions = [];

    if (mode === 'fornitura' && materialPrice) {
      const mp = Number(materialPrice);
      if (mp > 0) {
        const matCost = materialUnit === 'total' ? mp : Math.round(mp * mq);
        posaTotal -= matCost;
        deductions.push({
          label: `Materiale ${materialLabel}`,
          amount: matCost,
          detail: materialUnit === 'total' ? `€${fmt(mp)} totali` : `€${mp}/mq × ${mq} mq`,
        });
      }
    }

    if (includesBattiscopa) {
      const batCost = Math.round(mq * BATTISCOPA_POSA_PER_SQM);
      posaTotal -= batCost;
      deductions.push({ label: 'Battiscopa (posa)', amount: batCost, detail: `€${BATTISCOPA_POSA_PER_SQM}/mq × ${mq} mq` });
    }

    const pricePerSqm = Math.round(posaTotal / mq);
    return { total, mq, posaTotal, pricePerSqm, deductions };
  }, [sqm, quotedPrice, mode, materialPrice, materialUnit, includesBattiscopa, materialLabel]);

  const check = () => {
    if (!liveCalc || calculating) return;
    setVerdict(null);
    setCalculating(true);
    setLoadStep(0);

    // Avanza i passi del caricamento in sequenza (1,1s ciascuno)
    if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
    stepsTimerRef.current = setTimeout(() => setLoadStep(1), 1100);
    setTimeout(() => setLoadStep(2), 2200);
    const step3 = setTimeout(() => setLoadStep(3), 3300);
    stepsTimerRef.current = step3;

    timerRef.current = setTimeout(() => {
      const { pricePerSqm, posaTotal, mq, total } = liveCalc;
      const { min, max } = currentRange;

      let result;
      const ricalcolo = `Ricalcolo: (€${fmt(total)}${mode === 'fornitura' ? ' − materiale' : ''}${includesBattiscopa ? ' − battiscopa' : ''}) ÷ ${mq} mq = €${pricePerSqm}/mq`;
      const isSmall = mq < MIN_POSA_MQ;

      if (isSmall) {
        // Superficie piccola: il prezzo al mq è gonfiato dal minimo a corpo di €800
        if (posaTotal <= POSA_MIN_TOTAL * 1.2) {
          result = {
            type: 'normal',
            title: 'Preventivo in fascia',
            message: `Per superfici sotto i ${MIN_POSA_MQ} mq applichiamo un prezzo minimo a corpo di €${fmt(POSA_MIN_TOTAL)} di posa. Il tuo preventivo (€${fmt(posaTotal)} di sola posa per ${mq} mq) rientra in questa fascia.`,
            extra: ricalcolo,
            icon: CheckCircle,
            cta: null,
          };
        } else {
          result = {
            type: 'high',
            title: 'Sopra fascia',
            message: `€${fmt(posaTotal)} di sola posa per ${mq} mq. Anche considerando il minimo a corpo di €${fmt(POSA_MIN_TOTAL)} per superfici sotto i ${MIN_POSA_MQ} mq, sembra sopra la media: chiedi il dettaglio delle voci.`,
            extra: ricalcolo,
            icon: AlertTriangle,
            cta: {
              label: 'Confronta col nostro preventivo',
              href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Ciao! Ho verificato un preventivo di €${fmt(total)} per ${mq} mq di ${materialLabel} e risulta sopra la fascia. Posso avere un confronto?`)}`,
              tracking: 'quote_high_whatsapp_cta',
            },
          };
        }
      } else if (pricePerSqm >= min && pricePerSqm <= max) {
        result = {
          type: 'normal',
          title: 'Preventivo in fascia',
          message: `€${pricePerSqm}/mq per la sola posa di ${materialLabel} rientra nella fascia normale di €${min}–${max}/mq dei lavori a Roma. Se ti trovi bene con chi te l'ha fatto, vai tranquillo.`,
          extra: ricalcolo,
          icon: CheckCircle,
          cta: null,
        };
      } else if (pricePerSqm > max) {
        const pct = Math.round(((pricePerSqm - max) / max) * 100);
        result = {
          type: 'high',
          title: `Sopra fascia del ${pct}%`,
          message: `€${pricePerSqm}/mq contro una fascia normale di €${min}–${max}/mq. Non è per forza sbagliato: chiedi il dettaglio. Di solito la differenza sta in livellamento o smaltimento mai eseguiti.`,
          extra: ricalcolo,
          icon: AlertTriangle,
          cta: {
            label: 'Confronta col nostro preventivo',
            href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Ciao! Ho verificato un preventivo di €${fmt(total)} per ${mq} mq di ${materialLabel} e risulta sopra la fascia normale. Posso avere un confronto?`)}`,
            tracking: 'quote_high_whatsapp_cta',
          },
        };
      } else {
        result = {
          type: 'low',
          title: 'Sotto fascia',
          message: `€${pricePerSqm}/mq è sotto la fascia normale (€${min}–${max}/mq). Verifica che siano inclusi materiale di consumo, battiscopa, soglie e pulizia finale. È un prezzo molto competitivo.`,
          extra: ricalcolo,
          icon: AlertTriangle,
          cta: {
            label: 'Chiedici un preventivo certo',
            href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Ciao! Ho verificato un preventivo di €${fmt(total)} per ${mq} mq di ${materialLabel} e risulta sotto la fascia. Vorrei capire cosa include.`)}`,
            tracking: 'quote_low_whatsapp_cta',
          },
        };
      }

      setVerdict(result);
      setCalculating(false);
      setLoadStep(0);
      if (stepsTimerRef.current) clearTimeout(stepsTimerRef.current);
      track('quote_check_v2', {
        quoted_price: total,
        sqm: mq,
        material,
        variant,
        mode,
        material_price: materialPrice || null,
        material_unit: materialUnit,
        includes_battiscopa: includesBattiscopa,
        normalized_per_sqm: pricePerSqm,
        verdict: result.type,
      });
    }, 3500);
  };

  const VerdictIcon = verdict?.icon || CheckCircle;
  const verdictZone = verdict ? ZONE[verdict.type] : null;

  // Immagine materiale per il verdetto
  const materialImageKey = `${material}-${variant}`;
  const materialImage = MATERIAL_IMAGE_MAP[materialImageKey] || MATERIAL_IMAGE_MAP[`${material}-dritto`] || imgSPC;

  return (
    <>
      <section id="verificatore" className="bg-white scroll-mt-16">
        <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
          {/* ── Header ── */}
          <div className="mb-7 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-wide border border-amber-100 mb-3">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verifica gratuita
            </div>
            <h2 className="text-[26px] sm:text-[30px] font-black text-gray-900 tracking-tight leading-tight mb-2">
              Hai già un preventivo?<br />
              <span className="text-gray-400">Vediamo se è giusto.</span>
            </h2>
            <p className="text-[14px] text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
              Confrontiamo il tuo preventivo con i prezzi reali di oltre 180 lavori fatti a Roma.
              Se è in fascia, te lo diciamo.
            </p>
          </div>

          {/* ── Card principale ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header card */}
            <div className="bg-gray-50/60 border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Calculator className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-gray-900">Calcolo trasparente</h3>
                  <p className="text-[11px] text-gray-500">Ogni passaggio visibile, senza magie</p>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              {/* ── 1. Metri quadri + preset ── */}
              <div className="mb-5">
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2">
                  <Ruler className="w-4 h-4 text-gray-400" />
                  Quanti metri quadri?
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => { setSqm(String(p.sqm)); resetVerdict(); }}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                        sqm === String(p.sqm)
                          ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {p.label} · {p.sqm} mq
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={sqm}
                    onChange={(e) => { setSqm(e.target.value); resetVerdict(); }}
                    placeholder="80"
                    className="w-full border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-[16px] font-medium text-gray-900 bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] font-medium text-gray-400">mq</span>
                </div>
              </div>

              {/* ── 2. Materiale + tipo di posa ── */}
              <div className="mb-5">
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  Che pavimento è?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(POSA_CONFIG).map(([key, cfg]) => {
                    const Icon = cfg.icon;
                    const isActive = material === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleMaterialChange(key)}
                        className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl border transition-all ${
                          isActive
                            ? 'border-amber-300 bg-amber-50 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-amber-600' : 'text-gray-400'}`} />
                        <span className={`text-[12px] font-bold ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{cfg.label}</span>
                        <span className={`text-[10px] font-medium ${isActive ? 'text-amber-600' : 'text-gray-400'}`}>
                          €{cfg.normalRange.min}–{cfg.normalRange.max}/mq
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Posa (segmented control soft) */}
                <div className="relative bg-gray-100/80 rounded-xl p-0.5 inline-flex mt-3">
                  {config.variants.map((v) => (
                    <button
                      key={v.value}
                      onClick={() => { setVariant(v.value); resetVerdict(); }}
                      className={`relative z-10 px-3.5 py-2 rounded-lg text-[13px] font-semibold transition-colors whitespace-nowrap ${
                        variant === v.value
                          ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 3. Modalità: solo posa vs fornitura e posa ── */}
              <div className="mb-5">
                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-700 mb-2">
                  <Layers className="w-4 h-4 text-gray-400" />
                  Cosa include il preventivo?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setMode('solo'); resetVerdict(); }}
                    className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl border transition-all ${
                      mode === 'solo'
                        ? 'border-amber-300 bg-amber-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Wrench className={`w-5 h-5 ${mode === 'solo' ? 'text-amber-600' : 'text-gray-400'}`} />
                    <span className={`text-[13px] font-bold ${mode === 'solo' ? 'text-gray-900' : 'text-gray-600'}`}>Solo posa</span>
                    <span className="text-[10px] font-medium text-gray-400">manodopera</span>
                  </button>
                  <button
                    onClick={() => { setMode('fornitura'); resetVerdict(); }}
                    className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl border transition-all ${
                      mode === 'fornitura'
                        ? 'border-amber-300 bg-amber-50 shadow-sm'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <Package className={`w-5 h-5 ${mode === 'fornitura' ? 'text-amber-600' : 'text-gray-400'}`} />
                    <span className={`text-[13px] font-bold ${mode === 'fornitura' ? 'text-gray-900' : 'text-gray-600'}`}>Fornitura + posa</span>
                    <span className="text-[10px] font-medium text-gray-400">materiale incluso</span>
                  </button>
                </div>
              </div>

              {/* ── 4. Prezzo totale del preventivo ── */}
              <div className="mb-5">
                <label className="block text-[12px] font-semibold text-gray-700 mb-2">
                  Prezzo totale del preventivo
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-gray-400">€</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={quotedPrice}
                    onChange={(e) => { setQuotedPrice(e.target.value); resetVerdict(); }}
                    placeholder="2.400"
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-[16px] font-medium text-gray-900 bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                  />
                </div>
              </div>

              {/* ── 5. (Condizionale) Prezzo materiale ── */}
              {mode === 'fornitura' && (
                <div className="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <label className="block text-[12px] font-semibold text-gray-700 mb-2">
                    Quanto costa il materiale nel preventivo?
                  </label>
                  <div className="relative bg-gray-100/80 rounded-xl p-0.5 inline-flex mb-2">
                    <button
                      onClick={() => { setMaterialUnit('sqm'); resetVerdict(); }}
                      className={`relative z-10 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                        materialUnit === 'sqm'
                          ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      € al mq
                    </button>
                    <button
                      onClick={() => { setMaterialUnit('total'); resetVerdict(); }}
                      className={`relative z-10 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                        materialUnit === 'total'
                          ? 'bg-white text-gray-900 shadow-sm border border-gray-100'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      € totale
                    </button>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-gray-400">€</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={materialPrice}
                      onChange={(e) => { setMaterialPrice(e.target.value); resetVerdict(); }}
                      placeholder={materialUnit === 'total' ? '800' : '25'}
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-[16px] font-medium text-gray-900 bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium mt-2">
                    Se non conosci il costo esatto del materiale, guarda la voce in fattura o chiedi al fornitore.
                  </p>
                </div>
              )}

              {/* ── 6. Battiscopa (opzionale) ── */}
              <div className="mb-6">
                <button
                  onClick={() => { setIncludesBattiscopa(!includesBattiscopa); resetVerdict(); }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    includesBattiscopa
                      ? 'border-amber-300 bg-amber-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <span className="text-[13px] font-semibold text-gray-700">
                    Include battiscopa (posa)
                    <span className="block text-[10px] font-medium text-gray-400">sottraiamo €{BATTISCOPA_POSA_PER_SQM}/mq</span>
                  </span>
                  <span className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                    includesBattiscopa ? 'bg-amber-500 border-amber-500 text-white' : 'border-gray-300 bg-white text-transparent'
                  }`}>
                    ✓
                  </span>
                </button>
              </div>

              {/* ── Bottone verifica / stato calcolo ── */}
              <button
                onClick={check}
                disabled={!quotedPrice || !sqm || (mode === 'fornitura' && !materialPrice) || calculating}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold text-[16px] px-6 py-4 rounded-xl transition-all hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
              >
                {calculating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Stiamo verificando…
                  </>
                ) : (
                  <>
                    Verifica il preventivo
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* ── Nota metodologica ── */}
              <div className="mt-4">
                <button
                  onClick={() => setShowMethod(!showMethod)}
                  className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Info className="w-3.5 h-3.5" />
                  {showMethod ? 'Nascondi' : 'Come funziona'} il confronto
                  <span className={`transition-transform ${showMethod ? 'rotate-180' : ''}`}>▾</span>
                </button>
                {showMethod && (
                  <div className="mt-2.5 p-4 rounded-xl bg-gray-50 border border-gray-100 text-[12px] text-gray-500 leading-relaxed">
                    <p className="font-semibold text-gray-700 mb-1.5">Come funziona:</p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Se il preventivo include <strong>fornitura e posa</strong>, sottraiamo il costo del materiale che ci hai indicato.</li>
                      <li>Se include il <strong>battiscopa</strong>, sottraiamo €{BATTISCOPA_POSA_PER_SQM}/mq (sola posa).</li>
                      <li>Il risultato è il prezzo per metro quadro della <strong>sola posa</strong>.</li>
                      <li>Per superfici sotto i {MIN_POSA_MQ} mq consideriamo invece il prezzo minimo a corpo di €{fmt(POSA_MIN_TOTAL)}.</li>
                      <li>Lo confrontiamo con la fascia normale di €{currentRange.min}–{currentRange.max}/mq per {materialLabel} a Roma.</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* ── Verdict — Apple/Notion style ── */}
              {verdict && verdictZone && (
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {/* Hero section with material image */}
                  <div className="relative h-36 sm:h-44 bg-gray-50 overflow-hidden">
                    <img
                      src={materialImage}
                      alt={materialLabel}
                      className="w-full h-full object-cover"
                      style={{
                        maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                    
                    {/* Badge risultato */}
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100/50 shadow-xs">
                      <VerdictIcon className={`w-3.5 h-3.5 ${verdictZone.text}`} />
                      <span className={`text-[10px] font-bold ${verdictZone.text}`}>{verdict.title}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-5 py-4 sm:px-6 sm:py-5">
                    {/* Message */}
                    <p className="text-[13px] leading-relaxed text-gray-600 mb-4">{verdict.message}</p>

                    {/* Ricalcolo */}
                    <div className="bg-gray-50 rounded-xl px-3.5 py-2.5 mb-4">
                      <p className="text-[11px] text-gray-500 font-medium">{verdict.extra}</p>
                    </div>

                    {/* Price gauge or small surface notice */}
                    {Number(sqm) < MIN_POSA_MQ ? (
                      <div className="rounded-xl px-3.5 py-2.5 bg-gray-50 border border-gray-100 text-center mb-4">
                        <span className="text-[12px] font-semibold text-gray-600">
                          Prezzo a corpo minimo: €{fmt(POSA_MIN_TOTAL)} per superfici sotto i {MIN_POSA_MQ} mq
                        </span>
                      </div>
                    ) : (
                      <PriceGauge pricePerSqm={liveCalc.pricePerSqm} min={currentRange.min} max={currentRange.max} />
                    )}

                    {/* CTA */}
                    {verdict.cta && (
                      <div className="flex flex-col sm:flex-row gap-2 mt-5 pt-4 border-t border-gray-100">
                        <a
                          href={verdict.cta.href}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => track(verdict.cta.tracking, { material, sqm })}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-[12px] font-bold px-4 py-3 rounded-xl transition-all hover:shadow-md"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {verdict.cta.label}
                        </a>
                        <a
                          href={`tel:${WHATSAPP_NUMBER}`}
                          onClick={() => track('quote_verifier_call')}
                          className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white text-gray-700 text-[12px] font-bold px-4 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pop-up caricamento — Apple/Notion style ── */}
      {calculating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-md" />

          {/* Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray-900/10 w-full max-w-sm p-7">
            {/* Spinner centrale in stile Apple */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 rounded-full border-[3px] border-gray-100" />
                <div
                  className="absolute inset-0 rounded-full border-[3px] border-gray-900 border-t-transparent animate-spin"
                  style={{ animationDuration: '0.9s' }}
                />
              </div>
              <h4 className="text-[16px] font-bold text-gray-900">Stiamo verificando…</h4>
              <p className="text-[12px] text-gray-400 font-medium mt-0.5">Confronto con i prezzi di Roma</p>
            </div>

            {/* Passi */}
            <div className="space-y-3.5">
              {LOADING_STEPS.map((label, i) => {
                const isDone = loadStep > i;
                const isCurrent = loadStep === i;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3 transition-all duration-500 ${
                      isDone || isCurrent ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-1'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isDone
                          ? 'bg-emerald-500'
                          : isCurrent
                          ? 'bg-gray-900'
                          : 'bg-gray-100'
                      }`}
                    >
                      {isDone ? (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : isCurrent ? (
                        <svg className="w-3 h-3 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        <span className="text-[9px] font-bold text-gray-400">{i + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-[13px] ${
                        isDone ? 'text-gray-500 font-medium' : isCurrent ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Barra progresso */}
            <div className="mt-6 h-1 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-gray-900 transition-all duration-700 ease-out"
                style={{ width: `${((loadStep + 0.5) / LOADING_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}