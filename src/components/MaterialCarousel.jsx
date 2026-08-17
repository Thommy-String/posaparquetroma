// =============================================================================
// MaterialCarousel — Cinematic Game-Style Product Showcase
// Navigazione manuale — niente auto-play.
// =============================================================================
import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp, TrendingUp } from 'lucide-react';

// ── Import immagini doghe ──────────────────────────────────────────────────
import imgLaminato from '../assets/images/parquet/dogheParquet/laminatoDoghe.webp';
import imgPrefinito from '../assets/images/parquet/dogheParquet/prefinitoDoga.webp';
import imgSPC from '../assets/images/parquet/dogheParquet/spcDoga.webp';
import imgPrefinitoFlottante from '../assets/images/parquet/dogheParquet/prefinitoFlottanteDoga.webp';
import imgPrefinitoSpina from '../assets/images/parquet/dogheParquet/prefinitoSpinaDogaPosato.webp';
import imgSPCSpina from '../assets/images/parquet/dogheParquet/spcSpinaDoga.webp';

// ── Data dei materiali ─────────────────────────────────────────────────────
const MATERIALS = [
  {
    id: 'spc',
    name: 'SPC Effetto Legno',
    tagline: '100% Impermeabile e Resistente.',
    description: 'Pavimento in polvere di pietra che resiste ad acqua, graffi e calpestio intenso. Perfetto per bagni, cucine e locali commerciali. Posa a click senza colla anche su pavimento esistente.',
    image: imgSPC,
    accent: '#6366f1',
    category: 'spc',
    price: 'da €19 - €35/mq',
    specs: [
      { label: 'Costo', value: 60, color: 'bg-emerald-500' },
      { label: 'Costo Posa',       value: 45, color: 'bg-blue-500' },
      { label: 'Resistenza',       value: 90, color: 'bg-indigo-500' },
      { label: 'Impermeabilità',   value: 90, color: 'bg-cyan-500' },
      { label: 'Isolamento Acustico', value: 70, color: 'bg-rose-500' },
    ],
  },
  {
    id: 'spc-spina',
    name: 'SPC Spina Italiana',
    tagline: 'L\'eleganza della spina, la resistenza SPC.',
    description: 'Il formato a spina incontra la tecnologia SPC. Impermeabile, resistente e con un design senza tempo. Posa a click senza colla anche su pavimenti esistenti.',
    image: imgSPCSpina,
    accent: '#8b5cf6',
    category: 'spc',
    price: 'da €26 - €40/mq',
    specs: [
      { label: 'Costo', value: 70, color: 'bg-emerald-500' },
      { label: 'Costo Posa',       value: 60, color: 'bg-blue-500' },
      { label: 'Resistenza',       value: 90, color: 'bg-indigo-500' },
      { label: 'Impermeabilità',   value: 90, color: 'bg-cyan-500' },
      { label: 'Isolamento Acustico', value: 70, color: 'bg-rose-500' },
    ],
  },
  {
    id: 'prefinito',
    name: 'Parquet Prefinito Rovere',
    tagline: 'Legno vero, subito calpestabile.',
    description: 'Nobiltà del legno massello con verniciatura UV in fabbrica. Posa pulita, calpestio immediato e tutto il calore del legno. Per chi non scende a compromessi.',
    image: imgPrefinito,
    accent: '#f59e0b',
    category: 'prefinito',
    price: 'da €40 - €80/mq',
    specs: [
      { label: 'Costo', value: 90, color: 'bg-emerald-500' },
      { label: 'Costo Posa',       value: 80, color: 'bg-blue-500' },
      { label: 'Resistenza',       value: 60, color: 'bg-indigo-500' },
      { label: 'Impermeabilità',   value: 40, color: 'bg-cyan-500' },
      { label: 'Isolamento Acustico', value: 90, color: 'bg-rose-500' },
    ],
  },
  {
    id: 'prefinito-flottante',
    name: 'Prefinito "Flottante"',
    tagline: 'Posa rapida senza colla, legno vero.',
    description: 'Il calore del legno con la praticità della posa flottante. Ideale per chi vuole il vero parquet senza lavori invasivi.',
    image: imgPrefinitoFlottante,
    accent: '#eab308',
    category: 'prefinito-flottante',
    price: 'da €50 - €80/mq',
    specs: [
      { label: 'Costo', value: 90, color: 'bg-emerald-500' },
      { label: 'Costo Posa',       value: 65, color: 'bg-blue-500' },
      { label: 'Resistenza',       value: 50, color: 'bg-indigo-500' },
      { label: 'Impermeabilità',   value: 40, color: 'bg-cyan-500' },
      { label: 'Isolamento Acustico', value: 75, color: 'bg-rose-500' },
    ],
  },
  {
    id: 'prefinito-spina',
    name: 'Prefinito a Spina',
    tagline: 'Italiana, Francese o Ungherese',
    description: 'Il pavimento dei sogni. Le spine posate a 90 45 o 60 gradi. Vengono incollate per un risultato eterno.',
    image: imgPrefinitoSpina,
    accent: '#d97706',
    category: 'prefinito-spina',
    price: 'da €55 - €90/mq',
    specs: [
      { label: 'Costo', value: 90, color: 'bg-emerald-500' },
      { label: 'Costo Posa',       value: 90, color: 'bg-blue-500' },
      { label: 'Resistenza',       value: 60, color: 'bg-indigo-500' },
      { label: 'Impermeabilità',   value: 40, color: 'bg-cyan-500' },
      { label: 'Isolamento Acustico', value: 90, color: 'bg-rose-500' },
    ],
  },
  {
    id: 'laminato',
    name: 'Laminato Effetto Legno',
    tagline: 'Economico. Bello.',
    description: 'Legno HDF ad alta densità con superficie melamminica anti-graffio. La soluzione perfetta per chi cerca un pavimento bello e resistente, con il miglior rapporto qualità-prezzo.',
    image: imgLaminato,
    accent: '#10b981',
    category: 'laminato',
    price: 'da €13 - €26/mq',
    specs: [
      { label: 'Costo', value: 30, color: 'bg-emerald-500' },
      { label: 'Costo Posa',       value: 50, color: 'bg-blue-500' },
      { label: 'Resistenza',       value: 80, color: 'bg-indigo-500' },
      { label: 'Impermeabilità',   value: 70, color: 'bg-cyan-500' },
      { label: 'Isolamento Acustico', value: 40, color: 'bg-rose-500' },
    ],
  },
];

// ── Ranking Pill ─────────────────────────────────────────────────────────────
function RankingPill({ mat, rank, isActive, onClick }) {
  const baseCls = isActive
    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105'
    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5';

  return (
    <button
      onClick={onClick}
      data-active={isActive || undefined}
      className={`relative shrink-0 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group ${baseCls}`}
      aria-label={`Vai a ${mat.name}`}
    >
      {/* Rank number */}
      <span className={`text-[10px] font-black leading-none tracking-tighter ${isActive ? 'text-white/40' : 'text-gray-200 group-hover:text-gray-300'}`}>
        #{rank}
      </span>

      {/* Colored dot */}
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-300"
        style={{
          backgroundColor: mat.accent,
          transform: isActive ? 'scale(1.4)' : 'scale(1)',
        }}
      />

      {/* Name */}
      <span className="text-[11px] font-bold leading-tight whitespace-nowrap">
        {mat.name}
      </span>

      {/* Price tag */}
      <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md leading-none ${isActive ? 'bg-white/15 text-white/80' : 'bg-gray-100 text-gray-400'}`}>
        {mat.price}
      </span>

      {/* Active glow */}
      {isActive && (
        <span
          className="absolute inset-0 rounded-xl opacity-20 blur-sm -z-10"
          style={{ backgroundColor: mat.accent }}
        />
      )}
    </button>
  );
}

// ─ SpecBar ──────────────────────────────────────────────────────────────────────────────────
function SpecBar({ label, value, color, animate, accent }) {
  return (
    <div className="flex items-center gap-3 group">
      <span className="text-[11px] tracking-[0.15em] text-gray-400 w-28 shrink-0 text-right font-semibold uppercase">
        {label}
      </span>
      <div className="flex-1 h-[3px] bg-gray-200/60 rounded-full overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all duration-[1400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${color}`}
          style={{
            width: animate ? `${value}%` : '0%',
            opacity: animate ? 1 : 0,
            boxShadow: animate ? `0 0 6px ${accent}40` : 'none',
          }}
        />
      </div>
      <span className="text-[12px] font-bold text-gray-500 w-8 text-right tabular-nums opacity-0 transition-opacity duration-500"
        style={{ opacity: animate ? 1 : 0 }}
      >
        {value}
      </span>
    </div>
  );
}

// ── Single Slide ─────────────────────────────────────────────────────────────
function Slide({ material, isActive, index, onCtaClick }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setAnimate(true), 150);
      return () => clearTimeout(t);
    }
    setAnimate(false);
  }, [isActive]);

  return (
    <div
      className="w-full shrink-0 px-0 transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
      style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(30px)',
        filter: isActive ? 'blur(0px)' : 'blur(8px)',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
    >
      {/* Sfondo con gradiente dinamico */}
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-1000"
        style={{
          opacity: isActive ? 0.08 : 0,
          background: `radial-gradient(ellipse at 70% 30%, ${material.accent}22 0%, transparent 70%)`,
        }}
      />

      {/* Watermark sfondo immagine */}
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-[1200ms]"
        style={{
          opacity: isActive ? 0.5 : 0,
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: `${material.accent}08` }} />
        <img
          src={material.image}
          alt=""
          aria-hidden="true"
          loading={index === 0 ? 'eager' : 'lazy'}
          className="absolute right-0 top-1/2 -translate-y-1/2 h-[85%] w-auto object-contain select-none pointer-events-none"
          style={{
            filter: 'grayscale(0.15) contrast(1.0)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Indicatore di progresso superiore */}
        <div className="h-[2px] bg-gray-100 rounded-full mb-6 md:mb-10 overflow-hidden max-w-md">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: animate ? '100%' : '0%',
              backgroundColor: material.accent,
            }}
          />
        </div>

        <div className="relative">
          <div className="max-w-xl space-y-5 md:space-y-6">
            {/* Numero slide + foto badge */}
            <div
              className="flex items-center gap-3 transition-all duration-700"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              <span
                className="text-[24px] md:text-[40px] font-bold leading-none tracking-tighter"
                style={{ color: `${material.accent}52` }}
              >
                {material.price}
              </span>
              <div className="h-px flex-1 max-w-[60px]" style={{ backgroundColor: `${material.accent}44` }} />
              {/* Badge foto materiale */}
              <div
                className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 transition-all duration-500"
                style={{
                  borderColor: `${material.accent}66`,
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'scale(1)' : 'scale(0.5)',
                }}
              >
                <img
                  src={material.image}
                  alt={material.name}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Titolo */}
            <div
              className="transition-all duration-700 delay-100"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(15px)',
              }}
            >
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.08] tracking-tight">
                {material.name}
              </h3>
              <p className="text-base sm:text-lg text-gray-400 mt-2 font-medium leading-snug">
                {material.tagline}
              </p>
            </div>

            {/* Descrizione */}
            <p
              className="text-sm sm:text-base text-gray-500 leading-relaxed transition-all duration-700 delay-200"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(15px)',
              }}
            >
              {material.description}
            </p>

            {/* Separatore */}
            <div
              className="w-12 h-[2px] transition-all duration-700 delay-300"
              style={{
                opacity: animate ? 1 : 0,
                backgroundColor: material.accent,
                transform: animate ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />

            {/* Barre caratteristiche */}
            <div
              className="space-y-2.5 transition-all duration-700 delay-[400ms]"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {material.specs.map((spec) => (
                <SpecBar key={spec.label} {...spec} animate={animate} accent={material.accent} />
              ))}
            </div>

            {/* CTA — Guarda lavori reali con prezzi */}
            <div
              className="pt-2 transition-all duration-700 delay-[600ms]"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <button
                onClick={onCtaClick}
                className="group inline-flex items-center gap-2 text-[13px] font-bold tracking-wide uppercase transition-all duration-300 cursor-pointer"
                style={{ color: material.accent }}
              >
                  <span className="relative">
                    Guarda lavori di {material.name}
                    <span
                      className="absolute bottom-0 left-0 w-full h-[2px] transition-transform duration-300 origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100"
                      style={{ backgroundColor: material.accent }}
                    />
                  </span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function MaterialCarousel({ title = 'I pavimenti più scelti in assoluto.' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const rankingScrollRef = useRef(null);

  const total = MATERIALS.length;

  const goTo = useCallback((dir) => {
    setActiveIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return total - 1;
      if (next >= total) return 0;
      return next;
    });
  }, [total]);

  // Auto-scroll ranking strip to keep active pill visible
  useEffect(() => {
    if (!rankingScrollRef.current) return;
    const activeBtn = rankingScrollRef.current.querySelector('[data-active="true"]');
    if (activeBtn) {
      const container = rankingScrollRef.current;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;

      // If button is out of view, scroll to it
      if (btnLeft < scrollLeft || btnLeft + btnWidth > scrollLeft + containerWidth - 20) {
        container.scrollTo({
          left: btnLeft - containerWidth / 2 + btnWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeIndex]);

  // Scroll al carosello lavori reali (NewLandingHero) con filtro categoria pre-impostato
  const handleCtaClick = useCallback(() => {
    const activeMat = MATERIALS[activeIndex];
    const cat = activeMat?.category || 'all';
    window.location.hash = `new-landing-hero-${cat}`;
    const el = document.getElementById('new-landing-hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'ArrowRight') goTo(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goTo]);

  return (
    <section
      className="relative bg-white py-12 sm:py-20 md:py-28 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header con classifica visibile */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase font-semibold mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Classifica 2026
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              {title}
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => goTo(-1)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = MATERIALS[activeIndex]?.accent || '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all duration-200 cursor-pointer hover:shadow-lg bg-white/80 backdrop-blur-sm"
              aria-label="Precedente"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => goTo(1)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.borderColor = MATERIALS[activeIndex]?.accent || '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center transition-all duration-200 cursor-pointer hover:shadow-lg bg-white/80 backdrop-blur-sm"
              aria-label="Successivo"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Ranking Strip — tutta la classifica visibile e selezionabile ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 mb-8 md:mb-10">
        <div
          ref={rankingScrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 sm:-mx-0 px-4 sm:px-0"
        >
          {MATERIALS.map((mat, i) => (
            <RankingPill
              key={mat.id}
              mat={mat}
              rank={i + 1}
              isActive={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
        {/* Gradient fade per hint di scroll */}
        <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none sm:hidden" />
      </div>

      {/* Carosello */}
      <div className="relative" ref={containerRef}>
        <div className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[520px]">
          {MATERIALS.map((mat, i) => (
            <div
              key={mat.id}
              className="absolute inset-0"
              style={{
                zIndex: i === activeIndex ? 10 : 0,
              }}
            >
              <Slide
                material={mat}
                index={i}
                isActive={i === activeIndex}
                onCtaClick={handleCtaClick}
              />
            </div>
          ))}
        </div>

        {/* Frecce laterali grandi — compaiono su hover */}
        <button
          onClick={() => goTo(-1)}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-xl hover:bg-white flex items-center justify-center transition-all duration-300 cursor-pointer group"
          style={{
            opacity: isHovering ? 1 : 0,
          }}
          aria-label="Precedente"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
        </button>

        <button
          onClick={() => goTo(1)}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-lg hover:shadow-xl hover:bg-white flex items-center justify-center transition-all duration-300 cursor-pointer group"
          style={{
            opacity: isHovering ? 1 : 0,
          }}
          aria-label="Successivo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
        </button>
      </div>

      {/* Pagination dots — pillole accent-color */}
      <div className="flex justify-center items-center gap-3 mt-10 sm:mt-14">
        {MATERIALS.map((mat, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className="relative rounded-full transition-all duration-500 cursor-pointer overflow-hidden"
            style={{
              width: i === activeIndex ? '32px' : '8px',
              height: '8px',
              backgroundColor: i === activeIndex ? `${mat.accent}` : '#e5e7eb',
            }}
            aria-label={`Vai a ${mat.name}`}
          >
            {i === activeIndex && (
              <div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  backgroundColor: `${mat.accent}44`,
                  animation: 'pulse 2s infinite',
                }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}