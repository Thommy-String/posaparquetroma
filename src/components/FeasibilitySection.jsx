// =============================================================================
// FeasibilitySection — Verificatore di fattibilità posa su pavimento esistente
// Stile coerente con PriceWizard: foto vere, card neo-brutalist, overlay scuri
// =============================================================================
import { useState } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { track } from '../utils/analytics';

// ── Import immagini vere (stesse usate da PriceWizard) ────────────────────
import imgLaminato from '../assets/images/parquet/dogheParquet/laminatoDoghe.webp';
import imgPrefinito from '../assets/images/parquet/dogheParquet/prefinitoDoga.webp';
import imgSPC from '../assets/images/parquet/dogheParquet/spcDoga.webp';
import imgPrefinitoFlottante from '../assets/images/parquet/dogheParquet/prefinitoFlottanteDoga.webp';
import imgPrefinitoSpina from '../assets/images/parquet/dogheParquet/prefinitoSpinaDogaPosato.webp';
import imgSPCSpina from '../assets/images/parquet/dogheParquet/spcSpinaDoga.webp';
import imgPiastrelle from '../assets/images/tipiDiPavimento/piastrelle.webp';
import imgLaminatoFloor from '../assets/images/tipiDiPavimento/laminato.webp';
import imgMarmoGranito from '../assets/images/tipiDiPavimento/marmo-granito.webp';
import imgParquetRovere from '../assets/images/tipiDiPavimento/parquetrovere.webp';
import imgMoquette from '../assets/images/tipiDiPavimento/moquette.webp';
import imgLinoleum from '../assets/images/tipiDiPavimento/linoleum.webp';

// ── Mappa immagini per tipologia pavimento ─────────────────────────────────
const FLOOR_IMAGES = {
  piastrelle: imgPiastrelle,
  gres: imgLaminatoFloor,
  marmo: imgMarmoGranito,
  cemento: imgPrefinitoSpina,
  parquet_vecchio: imgParquetRovere,
  linoleum: imgLinoleum,
  moquette: imgMoquette,
};

// ── Configurazione verdetto ────────────────────────────────────────────────
const VERDICT_CONFIG = {
  yes: {
    icon: Check,
    bg: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-500',
    text: 'text-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700',
    label: 'Si può fare',
  },
  maybe: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-500',
    text: 'text-amber-800',
    badge: 'bg-amber-100 text-amber-700',
    label: 'Dipende',
  },
  no: {
    icon: X,
    bg: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-500',
    text: 'text-red-800',
    badge: 'bg-red-100 text-red-600',
    label: 'Sconsigliato',
  },
};

// ── Card tipologia pavimento (stile MaterialCard di PriceWizard) ───────────
function FloorTypeCard({ floorType, isSelected, onClick }) {
  const verdict = VERDICT_CONFIG[floorType.verdict];
  const image = FLOOR_IMAGES[floorType.id];

  return (
    <button
      onClick={onClick}
      className={`group relative text-left rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden min-h-[150px] ${
        isSelected
          ? 'border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-x-0.5 -translate-y-0.5 scale-[1.02]'
          : 'border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      {/* ── Immagine di sfondo ── */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={floorType.label}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay scuro per leggibilità */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      {/* ── Badge verdetto (in alto a sinistra) ── */}
      <div className={`absolute top-2.5 left-2.5 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-md z-10 ${verdict.badge}`}>
        {verdict.label}
      </div>

      {/* ── Selected check (in alto a destra) ── */}
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-lg z-10">
          <Check className="w-3 h-3 text-gray-900" strokeWidth={3} />
        </div>
      )}

      {/* ── Label in basso ── */}
      <div className="relative z-10 flex flex-col justify-end min-h-[150px] p-3.5">
        <h3 className="text-[14px] sm:text-[15px] font-black text-white leading-tight drop-shadow-md">
          {floorType.label}
        </h3>
      </div>
    </button>
  );
}

// ── Pannello risposta (dopo selezione) ────────────────────────────────────
function VerdictPanel({ floorType }) {
  const verdict = VERDICT_CONFIG[floorType.verdict];
  const Icon = verdict.icon;

  return (
    <div
      className={`${verdict.bg} border-2 rounded-2xl p-4 sm:p-5 animate-in fade-in slide-in-from-top-4 duration-300`}
    >
      <div className="flex items-start gap-3">
        <div className={`${verdict.iconBg} p-2 rounded-lg flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" strokeWidth={3} />
        </div>
        <div>
          <p className={`text-[16px] font-black ${verdict.text}`}>
            {floorType.response}
          </p>
          <p className="text-[13px] sm:text-[14px] text-slate-700 mt-1.5 leading-relaxed font-medium">
            {floorType.explanation}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Componente principale ──────────────────────────────────────────────────
export default function FeasibilitySection({ data }) {
  const [selected, setSelected] = useState(null);

  if (!data || !data.floorTypes) return null;

  const handleSelect = (floorType) => {
    setSelected(floorType.id);
    track('feasibility_check', { floor_type: floorType.id, verdict: floorType.verdict });
  };

  const selectedType = data.floorTypes.find((ft) => ft.id === selected);

  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* ── Header ── */}
        <div className="text-center mb-7">
          <h2 className="text-[22px] sm:text-[28px] font-extrabold text-gray-900 tracking-tight mb-2">
            {data.title}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-gray-400 font-medium">
            {data.subtitle}
          </p>
        </div>

        {/* ── Griglia cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {data.floorTypes.map((ft) => (
            <FloorTypeCard
              key={ft.id}
              floorType={ft}
              isSelected={selected === ft.id}
              onClick={() => handleSelect(ft)}
            />
          ))}
        </div>

        {/* ── Pannello risposta ── */}
        {selectedType && <VerdictPanel floorType={selectedType} />}
      </div>
    </section>
  );
}