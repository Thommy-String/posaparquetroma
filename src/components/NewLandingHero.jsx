import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { track } from '../utils/analytics';
import { works } from '../utils/worksData';
import teamImage from '../assets/images/andrea-oni-parquettisti.webp';
import ParquettistiSocialProof from './ParquettistiSocialProof';
import PriceWizard from './PriceWizard';
import imgPrefinito from '../assets/images/parquet/rovereIta.webp';
import imgFlottante from '../assets/images/parquet/rovereNaturale90.webp';
import imgSpina from '../assets/images/parquet/spinaFraRovereNaturale.webp';

const fmt = (n) => n.toLocaleString('it-IT');

const WORK_CATEGORIES = [
  { id: 'all', label: 'Tutti', img: null },
  { id: 'spc', label: 'SPC', img: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSDiXc9lWiwcstaDg3iXyjL29aR9xhSyjiFGlaHUcK4sKbx6baHSlSecfS52x_eFBxMZkZbnGU&usqp=CAc' },
  { id: 'laminato', label: 'Laminato', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqOG2D2UFBz_nSKEVKipOWNhmw7iY3OsHNrnpSOoq1nw&s=10' },
  { id: 'prefinito', label: 'Prefinito', img: imgPrefinito },
  { id: 'prefinito-flottante', label: 'Flottante', img: imgFlottante },
  { id: 'prefinito-spina', label: 'Spina', img: imgSpina },
];

// Badge colori per categoria (stile Notion)
const CATEGORY_BADGES = {
  spc: { label: 'SPC', cls: 'bg-amber-100 text-amber-800' },
  laminato: { label: 'Laminato', cls: 'bg-blue-100 text-blue-800' },
  prefinito: { label: 'Prefinito', cls: 'bg-red-100 text-red-800' },
  'prefinito-flottante': { label: 'Flottante', cls: 'bg-emerald-100 text-emerald-800' },
  'prefinito-spina': { label: 'Spina', cls: 'bg-purple-100 text-purple-800' },
};

function getCategoryBadge(category) {
  if (category.startsWith('prefinito-spina')) return CATEGORY_BADGES['prefinito-spina'];
  if (category.startsWith('prefinito-flottante')) return CATEGORY_BADGES['prefinito-flottante'];
  if (category.startsWith('prefinito')) return CATEGORY_BADGES.prefinito;
  return CATEGORY_BADGES[category] || { label: category, cls: 'bg-gray-100 text-gray-700' };
}

// Stima costo materiale al mq per categoria
const MATERIAL_COST = {
  spc: 25,
  laminato: 20,
  prefinito: 50,
  'prefinito-flottante': 50,
  'prefinito-spina': 60,
};

function getMaterialCost(category) {
  if (category.startsWith('prefinito-spina')) return MATERIAL_COST['prefinito-spina'];
  if (category.startsWith('prefinito-flottante')) return MATERIAL_COST['prefinito-flottante'];
  if (category.startsWith('prefinito')) return MATERIAL_COST.prefinito;
  return MATERIAL_COST[category] || 40;
}


const totalEstimateWithExtras = (work) => {
  let total = work.price;
  if (work.floorCost) total += work.floorCost;
  else {
    const matCost = getMaterialCost(work.category);
    total += matCost * work.sqm;
  }
  if (work.extras) work.extras.forEach(e => { total += e.cost; });
  return total;
};

function CarouselCard({ work }) {
  const hasBefore = Boolean(work.imageBefore && work.imageBefore.trim() !== '');
  const hasAfter = Boolean(work.imageAfter && work.imageAfter.trim() !== '');
  const matCost = work.floorCost !== undefined ? work.floorCost / work.sqm : getMaterialCost(work.category);
  const materialTotal = work.floorCost !== undefined ? work.floorCost : matCost * work.sqm;
  const totalEstimate = totalEstimateWithExtras(work);
  const hasExtras = work.extras && work.extras.length > 0;
  const extrasTotal = hasExtras ? work.extras.reduce((sum, e) => sum + e.cost, 0) : 0;
  const badge = getCategoryBadge(work.category);

  return (
    <div className="flex-shrink-0 w-[68vw] max-w-[290px]">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        {/* ── Foto ── */}
        {hasAfter && (
          <div className={`relative bg-gray-100 h-[155px] ${hasBefore ? 'grid grid-cols-2' : ''}`}>
            {/* Badge materiale (Notion style) */}
            <span className={`absolute top-2 left-2 z-10 inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide shadow-sm ${badge.cls}`}>
              {badge.label}
            </span>
            {hasBefore && (
              <div className="relative overflow-hidden">
                <img src={work.imageBefore} alt="" className="w-full h-full object-cover grayscale-[20%] brightness-90" loading="lazy" />
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[7px] font-bold px-1 py-0.5 rounded-sm">Prima</span>
              </div>
            )}
            <div className={`relative overflow-hidden ${hasBefore ? '' : 'h-full'}`}>
              <img src={work.imageAfter} alt="" className="w-full h-full object-cover" loading="lazy" />
              {hasBefore && (
                <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[7px] font-bold px-1 py-0.5 rounded-sm">Dopo</span>
              )}
            </div>
          </div>
        )}

        {/* ── Contenuto ── */}
        <div className="px-4 pt-4 pb-4 flex flex-col flex-1">
          {/* Stats: mq | tempo | località */}
          <div className="flex items-center text-[11px] mb-3">
            <span className="font-semibold text-gray-700">{work.sqm} mq</span>
            <span className="mx-1.5 text-gray-200">|</span>
            <span className="text-gray-500">{work.time}</span>
            <span className="mx-1.5 text-gray-200">|</span>
            <span className="text-gray-400 truncate">{work.location}</span>
          </div>

          {/* Prezzo totale — grande, protagonista */}
          <div className="mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[32px] font-black text-gray-900 leading-none tracking-tight">
                €{fmt(totalEstimate)}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">totale</span>
            </div>
          </div>

          {/* Breakdown: posa + materiale — piccoli, chiari */}
          <div className="flex items-center gap-3 text-[11px] text-gray-500 mb-3">
            <span>
              Posa <strong className="text-gray-700 font-semibold">€{fmt(work.price)}</strong>
            </span>
            <span className="text-gray-200">+</span>
            <span>
              Pavimento <strong className="text-gray-700 font-semibold">€{fmt(materialTotal)}</strong> 
            </span>
          </div>

          {/* EXTRA — solo se presenti */}
          {hasExtras && (
            <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
              {work.extras.map((extra, i) => (
                <span key={i} className="inline-flex items-center gap-1 text-[9px] font-semibold text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
                  {extra.name}: <span className="font-bold text-gray-700">€{fmt(extra.cost)}</span>
                </span>
              ))}
            </div>
          )}

          {/* Descrizione */}
          <p className="text-[11px] text-gray-500 leading-relaxed mb-3 line-clamp-2">{work.description}</p>

          {/* Recensione */}
          <div className="bg-amber-50 rounded-xl px-3 py-2.5 border border-amber-100 mt-auto">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <img src={work.review.avatar} alt="" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-amber-900 leading-snug italic line-clamp-2">"{work.review.text}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewLandingHero() {
  const [activeCategory, setActiveCategory] = useState('all');
  const scrollRef = useRef(null);
  const hasAutoScrolledRef = useRef(false);
  const snapTimerRef = useRef(null);
  const filterRefs = useRef({});
  const filterContainerRef = useRef(null);
  const [filterPos, setFilterPos] = useState({ left: 0, width: 0 });

  const filteredWorks = useMemo(() => {
    let list = activeCategory === 'all'
      ? [...works]
      : works.filter(w => w.category === activeCategory || (activeCategory === 'prefinito' && w.category.startsWith('prefinito')));
    if (activeCategory === 'all') {
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    }
    return list;
  }, [activeCategory]);

  const handleScroll = useCallback(() => {
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      const cardWidth = el.children[0]?.offsetWidth + 16 || 294;
      const maxIdx = Math.max(0, el.children.length - 1);
      const rawIdx = Math.round(el.scrollLeft / cardWidth);
      const targetIdx = Math.min(rawIdx, maxIdx);
      el.scrollTo({ left: targetIdx * cardWidth, behavior: 'smooth' });
    }, 150);
  }, []);

  // Posiziona la pillola attiva del filtro (animazione slide)
  const updateFilterPos = useCallback(() => {
    const btn = filterRefs.current[activeCategory];
    if (btn) {
      setFilterPos({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [activeCategory]);

  useEffect(() => {
    updateFilterPos();
    const onResize = () => requestAnimationFrame(updateFilterPos);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateFilterPos]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [handleScroll]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoScrolledRef.current && scrollRef.current) {
        scrollRef.current.scrollBy({ left: 310, behavior: 'smooth' });
        hasAutoScrolledRef.current = true;
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.offsetWidth + 16 || 294;
    scrollRef.current.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  // Scrolla il contenitore dei filtri per rendere visibile la pillola attiva
  useEffect(() => {
    if (!filterContainerRef.current) return;
    const btn = filterRefs.current[activeCategory];
    if (btn) {
      const container = filterContainerRef.current;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;

      if (btnLeft < scrollLeft || btnLeft + btnWidth > scrollLeft + containerWidth - 20) {
        container.scrollTo({
          left: btnLeft - containerWidth / 2 + btnWidth / 2,
          behavior: 'smooth',
        });
      }
    }
  }, [activeCategory]);

  // Legge il filtro dall'hash URL al mount (quando arriva dal MaterialCarousel)
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#new-landing-hero-([\w-]+)$/);
    if (match) {
      const cat = match[1];
      if (WORK_CATEGORIES.some(c => c.id === cat)) {
        console.log('[NewLandingHero] hash filter ->', cat);
        setActiveCategory(cat);
      }
    }
  }, []);

  // Ascolta cambiamenti hash
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#new-landing-hero-([\w-]+)$/);
      if (match) {
        const cat = match[1];
        if (WORK_CATEGORIES.some(c => c.id === cat)) {
          console.log('[NewLandingHero] hashchange filter ->', cat);
          setActiveCategory(cat);
        }
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <section id="new-landing-hero" className="bg-white scroll-mt-8">
      <div className="max-w-2xl mx-auto px-4 pt-14 sm:pt-16 pb-8">
        {/* Social proof — sopra l'H1, in cima alla pagina */}
        <ParquettistiSocialProof />

        {/* ── Titolo ── */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight text-center mt-4 mb-2 mx-8">
          Scopri quanto costa <span className='text-slate-400'>rifare il pavimento a Roma nel 2026</span> <br /> <span className='text-slate-700 text-lg font-bold underline '> in meno di 30 secondi</span>
        </h1>

      

        {/* ── PriceWizard — calcolatore passo-passo ── */}
        <PriceWizard compact />

        {/* ── Introduttivo carosello ── */}
        <div className="mb-5 relative flex justify-center mt-32">
          {/* Testo centrato */}
          <div className="text-center">
            <p className="text-[22px] sm:text-[32px] font-extrabold text-gray-900 tracking-tight mb-2">
              Quanto è costato gli altri?
            </p>
            <p className="text-[14px] text-gray-500 mb-3">
              {activeCategory !== 'all'
                ? `${WORK_CATEGORIES.find(c => c.id === activeCategory)?.label} costa in media €${getMaterialCost(activeCategory)}/mq`
                : 'guarda i prezzi reali'}
            </p>
          </div>
          
        </div>

        {/* ── Filtri unificati (segmented control con pill animata) ── */}
        <div className="mb-5 flex justify-center">
          <div
            ref={filterContainerRef}
            className="relative bg-gray-100/80 rounded-xl p-0.5 inline-flex overflow-x-auto scrollbar-none shadow-inner"
          >
            {/* Pill attiva — animazione fluida con cubic-bezier */}
            <div
              className="absolute top-0.5 bottom-0.5 rounded-lg bg-white shadow-md border border-gray-100 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ left: filterPos.left, width: filterPos.width }}
            />
            {WORK_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  ref={(el) => { filterRefs.current[cat.id] = el; }}
                  onClick={() => { setActiveCategory(cat.id); track('hero_carousel_filter', { category: cat.id }); }}
                  className={`relative z-10 shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-bold transition-colors duration-200 whitespace-nowrap ${
                    isActive ? 'text-gray-900' : 'text-gray-300 hover:text-gray-400'
                  }`}
                >
                  {cat.img ? (
                    <div className={`w-6 h-6 rounded-full overflow-hidden shrink-0 border ${isActive ? 'border-orange-200' : 'border-gray-200'} transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                      <img src={cat.img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                      <span className="text-[10px] text-gray-500">✦</span>
                    </div>
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Carosello ── */}
        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md hidden md:flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white border border-gray-200 rounded-full shadow-md hidden md:flex items-center justify-center hover:bg-gray-50"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none pb-2 pr-6"
          >
            {filteredWorks.map((work) => (
              <CarouselCard key={work.id} work={work} />
            ))}
          </div>
        </div>


      </div>

      {/* ── Animazione freccia curva ── */}
      <style>{`
        .arrow-curve-down {
          animation: arrowFade 1.6s ease-in-out 0.4s infinite;
        }
        .arrow-curve-path {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: drawCurve 0.9s ease-out forwards;
        }
        .arrow-curve-head {
          stroke-dasharray: 20;
          stroke-dashoffset: 20;
          animation: drawHead 0.4s ease-out 0.6s forwards;
        }
        .arrow-bounce {
          animation: bounceDown 2s ease-in-out infinite;
        }
        @keyframes arrowFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes drawCurve {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawHead {
          to { stroke-dashoffset: 0; }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}