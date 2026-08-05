import React, { useState, useEffect, useRef } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Check, Phone, MessageCircle, Star, Droplets, Shield, Layers, Volume2, Thermometer, Tag, Hammer, Maximize2, X, Timer, ArrowRight, Truck, Play } from 'lucide-react';
import { PHONE_NUMBER } from '../utils/constants';
import { gtagReportConversion } from '../utils/analytics';
import Temparquettisti from '../components/Temparquettisti';
import RecentWorks from '../components/RecentWorks';
import ServiceFAQ from '../components/ServiceFAQ';
import ServiceExplainerSection from '../components/ServiceExplainerSection';
import { servicesData } from '../utils/servicesData';
import { works } from '../utils/worksData';

// ─── FOTO TEAM ───
import teamPhoto from '../assets/images/andrea-oni-parquettisti.webp';
import spcPosaVideo from '../assets/videos/spcPosaRoma-2.webm';

// ─── IMMAGINI PRODOTTI ───
import admira5 from '../assets/images/italwood/spcitalwood/5mm/admirinda-1403-2.webp';
import aero5 from '../assets/images/italwood/spcitalwood/5mm/aero-4213-2.webp';
import akra5 from '../assets/images/italwood/spcitalwood/5mm/akra-1406-2.webp';
import eterno5 from '../assets/images/italwood/spcitalwood/5mm/eterno-4204.webp';
import natura5 from '../assets/images/italwood/spcitalwood/5mm/natura-4211-1.webp';
import nubo5 from '../assets/images/italwood/spcitalwood/5mm/nubo-1521-1.webp';
import pera5 from '../assets/images/italwood/spcitalwood/5mm/pera-1415-1.webp';
import planato5 from '../assets/images/italwood/spcitalwood/5mm/PLANATO-1405-2.webp';
import saros5 from '../assets/images/italwood/spcitalwood/5mm/saros-1420-1.webp';
import scuro5 from '../assets/images/italwood/spcitalwood/5mm/scuro-1461-1.webp';

import atmosferoP from '../assets/images/italwood/spcitalwood/5mm_pietra/atmosfero-4102-1.webp';
import granitoP from '../assets/images/italwood/spcitalwood/5mm_pietra/granito.8063.webp';
import konkretaP from '../assets/images/italwood/spcitalwood/5mm_pietra/konkreta-4103.webp';
import magiaP from '../assets/images/italwood/spcitalwood/5mm_pietra/magia-8055-1.webp';
import mastroP from '../assets/images/italwood/spcitalwood/5mm_pietra/mastro-4010.webp';
import rigoraP from '../assets/images/italwood/spcitalwood/5mm_pietra/rigora-4020-1.webp';
import tempestaP from '../assets/images/italwood/spcitalwood/5mm_pietra/tempesta-4601-1.webp';
import teroP from '../assets/images/italwood/spcitalwood/5mm_pietra/tero-4101-1.webp';

import caldo6 from '../assets/images/italwood/spcitalwood/6mm/CALDO-1452.webp';
import dorato6 from '../assets/images/italwood/spcitalwood/6mm/DORATO-8003.webp';
import klara6 from '../assets/images/italwood/spcitalwood/6mm/KLARA-1526.webp';
import perla6 from '../assets/images/italwood/spcitalwood/6mm/PERLA-1451.webp';
import planato6 from '../assets/images/italwood/spcitalwood/6mm/PLANATO-1405-2.webp';
import songo6 from '../assets/images/italwood/spcitalwood/6mm/SONGO-1407.webp';

import admiraSpina from '../assets/images/italwood/spcitalwood/spcspina/Admirinda-1403-1.webp';
import aeroSpina from '../assets/images/italwood/spcitalwood/spcspina/Aero-4213-1.webp';
import akraSpina from '../assets/images/italwood/spcitalwood/spcspina/Akra-1406-1.webp';
import planatoSpina from '../assets/images/italwood/spcitalwood/spcspina/Planato-1405-1.webp';

// ─── ICONE SVG CUSTOM PER FORMATI ───
const IconClassico = () => (
  <svg viewBox="0 0 40 60" className="w-full h-full" fill="none">
    <rect x="4" y="4" width="32" height="52" rx="3" fill="currentColor" opacity="0.08" />
    <rect x="4" y="4" width="32" height="52" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 4 Q12 16 10 28 Q8 40 10 56" stroke="currentColor" strokeWidth="0.5" opacity="0.25" fill="none" />
    <path d="M16 4 Q18 12 16 24 Q14 36 16 56" stroke="currentColor" strokeWidth="0.4" opacity="0.2" fill="none" />
    <path d="M22 4 Q24 14 22 26 Q20 38 22 56" stroke="currentColor" strokeWidth="0.5" opacity="0.25" fill="none" />
    <path d="M28 4 Q30 10 28 22 Q26 34 28 56" stroke="currentColor" strokeWidth="0.4" opacity="0.2" fill="none" />
    <ellipse cx="14" cy="20" rx="1.5" ry="2" stroke="currentColor" strokeWidth="0.4" opacity="0.15" fill="none" />
    <ellipse cx="26" cy="36" rx="1" ry="1.5" stroke="currentColor" strokeWidth="0.4" opacity="0.15" fill="none" />
  </svg>
);

const IconXL = () => (
  <svg viewBox="0 0 40 60" className="w-full h-full" fill="none">
    <rect x="2" y="4" width="36" height="52" rx="3" fill="currentColor" opacity="0.08" />
    <rect x="2" y="4" width="36" height="52" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 4 Q10 16 8 28 Q6 40 8 56" stroke="currentColor" strokeWidth="0.6" opacity="0.2" fill="none" />
    <path d="M16 4 Q18 12 16 24 Q14 36 16 56" stroke="currentColor" strokeWidth="0.5" opacity="0.18" fill="none" />
    <path d="M24 4 Q26 14 24 26 Q22 38 24 56" stroke="currentColor" strokeWidth="0.6" opacity="0.2" fill="none" />
    <path d="M32 4 Q34 10 32 22 Q30 34 32 56" stroke="currentColor" strokeWidth="0.5" opacity="0.18" fill="none" />
    <ellipse cx="20" cy="28" rx="2" ry="2.5" stroke="currentColor" strokeWidth="0.4" opacity="0.12" fill="none" />
  </svg>
);

const IconSpina = () => (
  <svg viewBox="0 0 40 60" className="w-full h-full" fill="none">
    <rect x="4" y="4" width="32" height="52" rx="3" fill="currentColor" opacity="0.08" />
    <rect x="4" y="4" width="32" height="52" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <g stroke="currentColor" strokeWidth="1.2" opacity="0.35" strokeLinecap="round">
      <line x1="8" y1="8" x2="20" y2="20" />
      <line x1="20" y1="20" x2="32" y2="8" />
      <line x1="8" y1="20" x2="20" y2="32" />
      <line x1="20" y1="32" x2="32" y2="20" />
      <line x1="8" y1="32" x2="20" y2="44" />
      <line x1="20" y1="44" x2="32" y2="32" />
      <line x1="8" y1="44" x2="20" y2="56" />
      <line x1="20" y1="56" x2="32" y2="44" />
    </g>
  </svg>
);

const IconPietra = () => (
  <svg viewBox="0 0 40 60" className="w-full h-full" fill="none">
    <rect x="4" y="4" width="32" height="52" rx="3" fill="currentColor" opacity="0.08" />
    <rect x="4" y="4" width="32" height="52" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="4" x2="20" y2="56" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="4" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <line x1="4" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
    <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="0.3" opacity="0.15" fill="none" />
    <circle cx="28" cy="28" r="1.2" stroke="currentColor" strokeWidth="0.3" opacity="0.15" fill="none" />
    <circle cx="14" cy="44" r="0.8" stroke="currentColor" strokeWidth="0.3" opacity="0.15" fill="none" />
    <circle cx="30" cy="14" r="0.6" stroke="currentColor" strokeWidth="0.3" opacity="0.15" fill="none" />
  </svg>
);

// ─── PRODOTTI ───
const PRODUCTS = [
  {
    id: 'classico', name: 'Classico', desc: 'Effetto legno · 5mm',
    format: '177,8 × 1213,52 mm', thickness: '5 mm',
    icon: IconClassico, defaultImg: planato5, color: 'PLANATO 1405',
    scaleW: 177, scaleH: 1213,
    prezzoPieno: 32, prezzoSconto: 19, prezzoPosa: 17,
    colors: [
      { code: 'ADMIRINDA', img: admira5 }, { code: 'AERO', img: aero5 }, { code: 'AKRA', img: akra5 },
      { code: 'PLANATO', img: planato5 }, { code: 'NUBO', img: nubo5 }, { code: 'PERA', img: pera5 },
      { code: 'SAROS', img: saros5 }, { code: 'SCURO', img: scuro5 }, { code: 'NATURA', img: natura5 },
      { code: 'ETERNO', img: eterno5 },
    ],
  },
  {
    id: 'xl', name: 'XL', desc: 'Formato grande · 6mm',
    format: '228,6 × 1524 mm', thickness: '6 mm',
    icon: IconXL, defaultImg: perla6, color: 'PERLA 1451',
    scaleW: 228, scaleH: 1524,
    prezzoPieno: 33, prezzoSconto: 20, prezzoPosa: 17,
    colors: [
      { code: 'CALDO', img: caldo6 }, { code: 'DORATO', img: dorato6 }, { code: 'KLARA', img: klara6 },
      { code: 'PERLA', img: perla6 }, { code: 'SONGO', img: songo6 }, { code: 'PLANATO', img: planato6 },
    ],
  },
  {
    id: 'spina', name: 'Spina', desc: '90 gradi · 5mm',
    format: '152,5 × 610 mm', thickness: '5 mm',
    icon: IconSpina, defaultImg: admiraSpina, color: 'ADMIRINDA 1403',
    scaleW: 152, scaleH: 610,
    prezzoPieno: 37, prezzoSconto: 22, prezzoPosa: 25,
    colors: [
      { code: 'ADMIRINDA', img: admiraSpina }, { code: 'AERO', img: aeroSpina },
      { code: 'AKRA', img: akraSpina }, { code: 'PLANATO', img: planatoSpina },
    ],
  },
  {
    id: 'pietra', name: 'Pietra', desc: 'Effetto cemento · 5mm',
    format: '400 × 800 mm', thickness: '5 mm',
    icon: IconPietra, defaultImg: konkretaP, color: 'KONKRETA 4103',
    scaleW: 400, scaleH: 800,
    prezzoPieno: 37, prezzoSconto: 22, prezzoPosa: 17,
    colors: [
      { code: 'ATMOSFERO', img: atmosferoP }, { code: 'GRANITO', img: granitoP }, { code: 'KONKRETA', img: konkretaP },
      { code: 'MAGIA', img: magiaP }, { code: 'MASTRO', img: mastroP }, { code: 'RIGORA', img: rigoraP },
      { code: 'TEMPESTA', img: tempestaP }, { code: 'TERO', img: teroP },
    ],
  },
];

const VANTAGGI = [
  { icon: Shield, title: 'Prezzo di fabbrica', desc: 'Acquistiamo direttamente da Italwood, niente intermediari.', color: 'bg-green-50 text-green-600' },
  { icon: Layers, title: 'Posa inclusa', desc: 'Un unico fornitore per materiale e installazione.', color: 'bg-blue-50 text-blue-600' },
  { icon: Droplets, title: '100% impermeabile', desc: 'Nucleo Stone Plastic Composite: non teme acqua o umidità.', color: 'bg-cyan-50 text-cyan-600' },
  { icon: Volume2, title: 'Silenzioso', desc: 'Materassino fonoassorbente integrato per il massimo comfort.', color: 'bg-violet-50 text-violet-600' },
  { icon: Timer, title: 'Pronto in 1-2 giorni', desc: 'Posa rapida, calpestabile subito, zero attese.', color: 'bg-amber-50 text-amber-600' },
  { icon: Thermometer, title: 'Riscaldamento a pavimento', desc: 'Perfetto su impianti radianti, conduce il calore in modo ottimale.', color: 'bg-red-50 text-red-600' },
];

const formatEuro = (n) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

// ═══════════════════════════════════
// ═══ ANIMATED PRICE ════════════════
// ═══════════════════════════════════
const AnimatedPrice = ({ value, className = '', format = true }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('down');
  const timerRef = useRef(null);

  useEffect(() => {
    if (value === prevValue) return;
    const dir = value > prevValue ? 'up' : 'down';
    setDirection(dir);
    setAnimating(true);
    timerRef.current = setTimeout(() => {
      setPrevValue(value);
      setAnimating(false);
    }, 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [value, prevValue]);

  const display = (v) => format ? formatEuro(v) : v;

  return (
    <span className={`relative inline-block overflow-hidden ${className}`} style={{ lineHeight: 1.2 }}>
      <span
        className="block transition-all duration-300 ease-in-out"
        style={{
          transform: animating ? (direction === 'down' ? 'translateY(100%)' : 'translateY(-100%)') : 'translateY(0)',
          opacity: animating ? 0 : 1,
        }}
      >
        {display(prevValue)}
      </span>
      {animating && (
        <span
          className="absolute inset-0 block transition-all duration-300 ease-in-out"
          style={{
            transform: 'translateY(0)',
            opacity: 1,
          }}
        >
          {display(value)}
        </span>
      )}
    </span>
  );
};

// ═══════════════════════════════════
// ═══ LIGHTBOX ══════════════════════
// ═══════════════════════════════════
const Lightbox = ({ src, alt, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
    <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white z-10">
      <X className="w-8 h-8" strokeWidth={2} />
    </button>
    <img src={src} alt={alt} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
  </div>
);

// ═══════════════════════════════════
// ═══ PLANCE SCALA ══════════════════
// ═══════════════════════════════════
const PlankScale = ({ products, selected }) => {
  const MAX_MM = 1524;
  const BASE_PX = 130;

  const SpinaSVG = ({ isSelected, w, h }) => {
    const cols = 4, rows = 3;
    const tileW = Math.max(w / cols, 4), tileH = Math.max(h / rows, 4);
    const svgW = tileW * cols, svgH = tileH * rows;
    return (
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="overflow-visible">
        {Array.from({ length: rows }).map((_, row) =>
          Array.from({ length: cols }).map((_, col) => {
            const x = col * tileW, y = row * tileH;
            const isLeft = col % 2 === 0;
            return (
              <polygon key={`${row}-${col}`}
                points={isLeft ? `${x},${y + tileH} ${x + tileW},${y + tileH} ${x + tileW / 2},${y}` : `${x},${y} ${x + tileW},${y} ${x + tileW / 2},${y + tileH}`}
                fill={isSelected ? '#22c55e' : '#9ca3af'} opacity={isSelected ? 0.7 : 0.5}
                stroke={isSelected ? '#16a34a' : 'none'} strokeWidth={isSelected ? 0.5 : 0}
              />
            );
          })
        )}
      </svg>
    );
  };

  return (
    <div className="flex items-end gap-5 md:gap-7 justify-center px-2">
      {products.map((p) => {
        const isSelected = selected.id === p.id;
        const h = Math.round((p.scaleH / MAX_MM) * BASE_PX);
        const w = Math.round((p.scaleW / p.scaleH) * h);

        if (p.id === 'spina') return (
          <div key={p.id} className="flex flex-col items-center gap-2">
            <div className="flex items-end justify-center" style={{ height: `${BASE_PX}px` }}>
              <div className={`transition-all duration-200 ${isSelected ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}`}>
                <SpinaSVG isSelected={isSelected} w={Math.max(w, 12)} h={Math.max(h, 20)} />
              </div>
            </div>
            <span className={`text-[10px] font-semibold text-center ${isSelected ? 'text-green-600' : 'text-gray-400'}`}>{p.name}</span>
          </div>
        );
        if (p.id === 'pietra') return (
          <div key={p.id} className="flex flex-col items-center gap-2">
            <div className="flex items-end justify-center" style={{ height: `${BASE_PX}px` }}>
              <div className={`grid grid-cols-2 gap-0.5 transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                style={{ width: `${Math.max(w, 16)}px`, height: `${Math.max(h, 12)}px` }}>
                {[0,1,2,3].map((i) => <div key={i} className={`rounded-sm ${isSelected ? 'bg-green-400/60 ring-1 ring-green-500' : 'bg-gray-300'}`} />)}
              </div>
            </div>
            <span className={`text-[10px] font-semibold text-center ${isSelected ? 'text-green-600' : 'text-gray-400'}`}>{p.name}</span>
          </div>
        );
        return (
          <div key={p.id} className="flex flex-col items-center gap-2">
            <div className="flex items-end" style={{ height: `${BASE_PX}px` }}>
              <div title={`${p.format} · ${p.thickness}`}
                className={`rounded-sm transition-all duration-200 ${isSelected ? 'ring-2 ring-green-500 ring-offset-2 bg-green-100/80' : 'bg-gray-200 hover:bg-gray-300'}`}
                style={{ width: `${Math.max(w, 6)}px`, height: `${Math.max(h, 10)}px` }} />
            </div>
            <span className={`text-[10px] font-semibold text-center ${isSelected ? 'text-green-600' : 'text-gray-400'}`}>{p.name}</span>
          </div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════
// ═══ FLOATING PRICE CARD (Apple-style) ═══
// ═══════════════════════════════════
const PriceCard = ({ totale, conPosa, sqm, displaySqm, selectedProduct, selectedColor, visible, prezzoPieno, prezzoSconto, prezzoPosa, risparmio, giorni, collapsed, battiscopaTipo, prezzoBattiscopaFornitura, prezzoBattiscopaPosa, costoTrasporto, conMaterassino, prezzoMaterassino, prezzoSmaltimento, showFullBreakdown, onToggleBreakdown }) => {
  if (!visible) return null;

  const matUnit = conPosa ? prezzoSconto : prezzoPieno;
  const totMat = matUnit * displaySqm;
  const totPosa = conPosa ? prezzoPosa * displaySqm : 0;
  const totBattiscopaFornitura = battiscopaTipo ? prezzoBattiscopaFornitura * displaySqm : 0;
  const totBattiscopaPosa = battiscopaTipo ? prezzoBattiscopaPosa * displaySqm : 0;
  const totMaterassino = conMaterassino ? prezzoMaterassino * displaySqm : 0;
  const handleWhatsApp = () => {
    const today = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
    const msg = encodeURIComponent(
      `Preventivo ${today}\n\nProdotto: ${selectedProduct.name} (${selectedColor.code})\nSuperficie: ${sqm} mq\nFormato: ${selectedProduct.format}\n\nDettaglio:\n${conPosa ? `- Pavimento: ${formatEuro(matUnit)}/mq (scontato 40% da ${formatEuro(prezzoPieno)}/mq)\n- Posa: ${formatEuro(prezzoPosa)}/mq\n- Risparmio: ${formatEuro(risparmio)}` : `- Pavimento: ${formatEuro(matUnit)}/mq`}\n\nTotale: ${formatEuro(totale)}\n\nSito: posaparquetroma.it/spc-fornitura-posa`
    );
    gtagReportConversion({ value: totale, currency: 'EUR' });
    window.open(`https://wa.me/39${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <>
      {/* Backdrop per chiudere cliccando fuori */}
      {showFullBreakdown && (
        <div className="fixed inset-0 z-30 bg-black/20" onClick={() => onToggleBreakdown(false)} />
      )}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none px-4 pb-4 animate-[fadeUp_0.35s_ease-out]">
        <div className={`max-w-lg mx-auto w-full bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.12)] pointer-events-auto ${showFullBreakdown ? '' : 'overflow-hidden'}`}>
          <div className="px-4 py-3.5">
            {/* Close button — absolute top-right */}
            {showFullBreakdown && (
              <button onClick={() => onToggleBreakdown(false)} className="absolute top-3 right-3 z-10 shrink-0 w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 flex items-center justify-center transition-colors">
                <X className="w-4 h-4 text-red-500" strokeWidth={2.5} />
              </button>
            )}
            {/* Top row: product thumbnail + name — always visible */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                <img src={selectedColor.img} alt={selectedColor.code} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{selectedProduct.name} · {selectedColor.code}</p>
                <p className="text-[11px] text-gray-400 truncate">Superficie: {sqm} mq</p>
              </div>
              {/* Compact total + CTA — only when collapsed and breakdown is NOT open */}
              <div className={`flex items-center gap-2 shrink-0 transition-all duration-500 ease-in-out ${collapsed && !showFullBreakdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <button onClick={handleWhatsApp}
                  className="shrink-0 inline-flex items-center gap-1 bg-white hover:bg-gray-50 text-green-600 border border-green-200 px-3 py-2 rounded-lg font-semibold text-xs shadow-sm hover:shadow-md transition-all duration-200">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true" className="text-green-500 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                  </svg>
                  Salva
                </button>
              </div>
            </div>
            {/* Re-open button when closed — mostra il totale */}
            {!showFullBreakdown && (
              <div className="pb-2 space-y-2">
                <div className="flex items-center justify-between px-1">
                  <span className="text-sm font-bold text-gray-700">Totale</span>
                  <div className="flex items-center gap-1.5">
                    {conPosa && <span className="text-red-400 line-through text-lg font-bold">{formatEuro(prezzoPieno * displaySqm + prezzoPosa * displaySqm + (battiscopaTipo ? (prezzoBattiscopaFornitura + prezzoBattiscopaPosa) * displaySqm : 0) + (conMaterassino ? prezzoMaterassino * displaySqm : 0) + costoTrasporto + prezzoSmaltimento * displaySqm)}</span>}
                    <AnimatedPrice value={totale} className="text-lg font-bold text-gray-900" />
                  </div>
                </div>
                <button onClick={() => onToggleBreakdown(true)} className="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  Apri dettagli preventivo
                </button>
              </div>
            )}
            {/* Price grid: collapses with max-height transition */}
            <div className={`overflow-y-auto overflow-x-hidden transition-all duration-500 ease-in-out ${showFullBreakdown ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-2 mb-3">
                {/* ── FORNITURA ── */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">SPC {selectedProduct.name}</span>
                  <span className="font-semibold text-gray-800 flex items-baseline gap-1.5">
                    {conPosa && <span className="text-red-400 line-through text-xs font-medium whitespace-nowrap">€{prezzoPieno}/mq</span>}
                    <span className="whitespace-nowrap"><AnimatedPrice value={conPosa ? prezzoSconto : prezzoPieno} className="text-sm" /><span className="text-gray-400 text-xs font-medium">/mq</span></span>
                    {conPosa && <span className="text-[10px] font-bold text-white bg-green-500 px-1.5 py-0.5 rounded-sm">-40%</span>}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 pl-2">
                  <span>{displaySqm} mq × €{conPosa ? prezzoSconto : prezzoPieno}/mq</span>
                  <span className="font-medium"><AnimatedPrice value={conPosa ? prezzoSconto * displaySqm : prezzoPieno * displaySqm} className="text-xs" /></span>
                </div>
                {battiscopaTipo && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Battiscopa</span>
                      <span className="font-semibold text-gray-800 whitespace-nowrap"><AnimatedPrice value={prezzoBattiscopaFornitura * displaySqm} className="text-sm" /></span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 pl-2">
                      <span>{displaySqm} ml × €{prezzoBattiscopaFornitura}/ml</span>
                      <span className="font-medium"><AnimatedPrice value={prezzoBattiscopaFornitura * displaySqm} className="text-xs" /></span>
                    </div>
                  </>
                )}
                {conMaterassino && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Materassino extra Spina</span>
                      <span className="font-semibold text-gray-800 whitespace-nowrap"><AnimatedPrice value={prezzoMaterassino * displaySqm} className="text-sm" /></span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 pl-2">
                      <span>{displaySqm} mq × €{prezzoMaterassino}/mq</span>
                      <span className="font-medium"><AnimatedPrice value={prezzoMaterassino * displaySqm} className="text-xs" /></span>
                    </div>
                  </>
                )}
                <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-700">Totale fornitura</span>
                  <span className="font-semibold text-gray-800 flex items-baseline gap-1.5">
                    {conPosa && <span className="text-red-400 line-through text-xs font-medium whitespace-nowrap">€{prezzoPieno * displaySqm}</span>}
                    <AnimatedPrice value={totMat + totBattiscopaFornitura + totMaterassino} className="text-sm" />
                  </span>
                </div>

                {/* ── POSA IN OPERA (solo se conPosa) ── */}
                {conPosa && (
                  <>
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Posa in opera</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Posa pavimento SPC</span>
                        <span className="font-semibold text-gray-800 whitespace-nowrap"><AnimatedPrice value={prezzoPosa} className="text-sm" /><span className="text-gray-400 text-xs font-medium">/mq</span></span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400 pl-2">
                        <span>{displaySqm} mq × €{prezzoPosa}/mq</span>
                        <span className="font-medium"><AnimatedPrice value={prezzoPosa * displaySqm} className="text-xs" /></span>
                      </div>
                      {battiscopaTipo && (
                        <>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Posa battiscopa</span>
                            <span className="font-semibold text-gray-800 whitespace-nowrap"><AnimatedPrice value={prezzoBattiscopaPosa * displaySqm} className="text-sm" /></span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400 pl-2">
                            <span>{displaySqm} ml × €7/ml</span>
                            <span className="font-medium"><AnimatedPrice value={prezzoBattiscopaPosa * displaySqm} className="text-xs" /></span>
                          </div>
                        </>
                      )}
                      <div className="border-t border-gray-100 pt-2 flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold text-gray-700">Totale posa</span>
                        <span className="font-semibold text-gray-800"><AnimatedPrice value={totPosa + totBattiscopaPosa} className="text-sm" /></span>
                      </div>
                    </div>
                  </>
                )}

                {/* ── COSTI AGGIUNTIVI ── */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Costi fissi</p>
                  {conPosa && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Smaltimento materiale</span>
                        <span className="font-semibold text-gray-800 whitespace-nowrap"><AnimatedPrice value={prezzoSmaltimento * displaySqm} className="text-sm" /></span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400 pl-2">
                        <span>{displaySqm} mq × €2/mq</span>
                        <span className="font-medium"><AnimatedPrice value={prezzoSmaltimento * displaySqm} className="text-xs" /></span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Trasporto e scarico materiali</span>
                    <span className="font-semibold text-gray-800 whitespace-nowrap"><AnimatedPrice value={costoTrasporto} className="text-sm" /></span>
                  </div>
                </div>

                {/* ── TOTALE FINALE ── */}
                {conPosa && (
                  <div className="mt-3 pt-2 border-t border-green-100 flex items-center justify-between">
                    <span className="text-md font-black text-gray-700">Totale</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-red-400 line-through text-lg font-bold mr-1">{formatEuro(prezzoPieno * displaySqm + prezzoPosa * displaySqm + (battiscopaTipo ? (prezzoBattiscopaFornitura + prezzoBattiscopaPosa) * displaySqm : 0) + (conMaterassino ? prezzoMaterassino * displaySqm : 0) + costoTrasporto + prezzoSmaltimento * displaySqm)}</span>
                      <AnimatedPrice value={totale} className="text-lg font-bold text-gray-900" />
                    </div>
                  </div>
                )}
                {conPosa && (
                  <div className="flex items-center justify-between text-[11px] bg-green-50 -mx-4 px-4 py-2 rounded-lg">
                    <span className="text-green-700 font-bold">Promo attiva su SPC -40%</span>
                    <span className="text-green-700 font-bold">Risparmi {formatEuro(risparmio)}</span>
                  </div>
                )}
                {!conPosa && (
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">Totale</span>
                    <AnimatedPrice value={totale} className="text-lg font-bold text-gray-900" />
                  </div>
                )}
              </div>
            </div>
          </div>
        <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      </div>
    </>
  );
};

// ═══════════════════════════════════
// ═══ WORK CAROUSEL ═════════════════
// ═══════════════════════════════════
const spcWorks = works.filter(w => w.category === 'spc' && w.imageAfter).slice(0, 8);

const WorkCarousel = () => {
  const [offset, setOffset] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef(null);
  const cardW = 220 + 12; // card width + gap

  // Triple items for seamless loop
  const tripleWorks = [...spcWorks, ...spcWorks, ...spcWorks];

  useEffect(() => {
    const step = () => {
      if (!isPaused) {
        setOffset(prev => {
          const next = prev - 0.6;
          // Reset when we've scrolled through one full set
          if (Math.abs(next) >= spcWorks.length * cardW) {
            return 0;
          }
          return next;
        });
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [isPaused, spcWorks.length, cardW]);

  if (spcWorks.length === 0) return null;

  return (
    <div className="relative">
      
      <div className="overflow-hidden rounded-xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="flex gap-3 transition-none"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {tripleWorks.map((work, idx) => (
            <div key={idx} className="min-w-[220px] w-[220px] shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Photo with Google badge top-right */}
              <div className="relative h-28 overflow-hidden bg-gray-100">
                <img src={work.imageAfter} alt={work.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-1 shadow-sm">
                  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-[8px] font-bold text-gray-500">Google</span>
                </div>
                <div className="absolute bottom-1.5 left-2">
                  <span className="text-[10px] font-bold text-white drop-shadow-sm">{work.title}</span>
                  {work.sqm && <span className="text-[9px] text-white/80 ml-1">· {work.sqm} mq</span>}
                </div>
              </div>
              {/* Review */}
              <div className="p-2.5">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    {work.review?.avatar ? (
                      <img src={work.review.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-gray-400">?</div>
                    )}
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-2 h-2 fill-amber-400" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                {work.review?.text && (
                  <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">"{work.review.text}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════
// ═══ CALCOLATORE ═══════════════════
// ═══════════════════════════════════
const Calculator = () => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState(PRODUCTS[0].colors[0]);
  const [sqm, setSqm] = useState(40);
  const [displaySqm, setDisplaySqm] = useState(40);
  const [conPosa, setConPosa] = useState(true);
  const battiscopaTipo = 'bianco'; // sempre incluso, bianco di default
  const [conMaterassino, setConMaterassino] = useState(selectedProduct.id === 'spina');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showFullBreakdown, setShowFullBreakdown] = useState(false);
  const debounceTimer = useRef(null);
  const toggleRef = useRef(null);
  const calculatorRef = useRef(null);

  const prezzoPieno = selectedProduct.prezzoPieno;
  const prezzoSconto = selectedProduct.prezzoSconto;
  const prezzoPosa = selectedProduct.prezzoPosa;
  const prezzoBattiscopaFornitura = 7; // €7/ml bianco
  const prezzoBattiscopaPosa = 7; // €7 al ml posa
  const costoTrasporto = 150; // €150 fissi
  const prezzoMaterassino = 2.6; // €2.6/mq solo per spina
  const prezzoSmaltimento = 2; // €2/mq
  const matUnit = conPosa ? prezzoSconto : prezzoPieno;
  const totMat = matUnit * displaySqm;
  const totPosa = conPosa ? prezzoPosa * displaySqm : 0;
  const totBattiscopaFornitura = prezzoBattiscopaFornitura * displaySqm;
  const totBattiscopaPosa = conPosa ? prezzoBattiscopaPosa * displaySqm : 0;
  const totBattiscopa = totBattiscopaFornitura + totBattiscopaPosa;
  const totMaterassino = conMaterassino ? prezzoMaterassino * displaySqm : 0;
  const totTrasporto = costoTrasporto;
  const totSmaltimento = conPosa ? prezzoSmaltimento * displaySqm : 0;
  const totale = totMat + totPosa + totBattiscopa + totMaterassino + totTrasporto + totSmaltimento;
  const risparmio = conPosa ? (prezzoPieno - prezzoSconto) * displaySqm : 0;
  const giorni = Math.ceil(displaySqm / 70);

  // Debounce displaySqm: real value updates immediately, display waits 300ms
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDisplaySqm(sqm);
    }, 300);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [sqm]);

  // Scroll-based collapse: when calculator is scrolled past top, collapse to total-only
  useEffect(() => {
    if (!showPrice) return;
    const el = calculatorRef.current;
    if (!el) return;
    let scrollTimer = null;
    const handleScroll = () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        scrollTimer = null;
        const rect = el.getBoundingClientRect();
        // Collapse when calculator bottom is below viewport top (scrolled past)
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setCollapsed(!isInView);
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [showPrice]);

  // Show price/mq after color selection
  const handleColorSelect = (c) => {
    setSelectedColor(c);
    activatePrice();
  };

  // Show price card on first interaction
  const activatePrice = () => {
    if (!showPrice) setShowPrice(true);
  };

  // After slider move, update sqm value — price card stays visible and updates in real-time
  const handleSqmChange = (val) => {
    setSqm(val);
    activatePrice();
  };

  const handleTogglePosa = () => {
    setConPosa(!conPosa);
  };

  const handleProductChange = (p) => {
    setSelectedProduct(p);
    setSelectedColor(p.colors[0]);
    setConMaterassino(p.id === 'spina');
    activatePrice();
  };

  const handleWhatsApp = () => {
    const today = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
    let dettaglio = conPosa
      ? `- Pavimento: ${formatEuro(prezzoSconto)}/mq (scontato 40% da ${formatEuro(prezzoPieno)}/mq)\n- Posa: ${formatEuro(prezzoPosa)}/mq`
      : `- Pavimento: ${formatEuro(prezzoPieno)}/mq`;
    if (battiscopaTipo) {
      const tipoLabel = battiscopaTipo === 'tinta' ? 'tinta SPC' : 'bianco';
      dettaglio += `\n- Battiscopa ${tipoLabel} (fornitura): ${formatEuro(prezzoBattiscopaFornitura)}/ml (${displaySqm} ml)`;
      if (conPosa) {
        dettaglio += `\n- Battiscopa (posa): ${formatEuro(prezzoBattiscopaPosa)}/ml (${displaySqm} ml)`;
      }
    }
    if (conMaterassino) {
      dettaglio += `\n- Materassino extra: ${formatEuro(prezzoMaterassino)}/mq (${displaySqm} mq)`;
    }
    dettaglio += `\n- Smaltimento materiale: ${formatEuro(prezzoSmaltimento)}/mq (${displaySqm} mq)`;
    dettaglio += `\n- Trasporto e scarico: ${formatEuro(costoTrasporto)}`;
    if (conPosa) {
      dettaglio += `\n- Risparmio: ${formatEuro(risparmio)}`;
    }
    const msg = encodeURIComponent(
      `Preventivo ${today}\n\nProdotto: ${selectedProduct.name} (${selectedColor.code})\nSuperficie: ${sqm} mq\nFormato: ${selectedProduct.format}\n\nDettaglio:\n${dettaglio}\n\nTotale: ${formatEuro(totale)}\n\nSito: posaparquetroma.it/spc-fornitura-posa`
    );
    gtagReportConversion({ value: totale, currency: 'EUR' });
    window.open(`https://wa.me/39${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  const sliderPercent = ((sqm - 10) / (200 - 10)) * 100;

  return (
    <div className="w-full max-w-lg mx-auto" ref={calculatorRef}>
      <PriceCard
        totale={totale} conPosa={conPosa} sqm={sqm}
        displaySqm={displaySqm}
        selectedProduct={selectedProduct} selectedColor={selectedColor}
        visible={showPrice}
        prezzoPieno={prezzoPieno} prezzoSconto={prezzoSconto}
        prezzoPosa={prezzoPosa} risparmio={risparmio} giorni={giorni}
        collapsed={collapsed}
        battiscopaTipo={battiscopaTipo} prezzoBattiscopaFornitura={prezzoBattiscopaFornitura} prezzoBattiscopaPosa={prezzoBattiscopaPosa} costoTrasporto={costoTrasporto} conMaterassino={conMaterassino} prezzoMaterassino={prezzoMaterassino} prezzoSmaltimento={prezzoSmaltimento} showFullBreakdown={showFullBreakdown} onToggleBreakdown={setShowFullBreakdown}
      />

      {/* FOTO PRODOTTO */}
      <div className="relative mb-4">
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-lg cursor-pointer group" onClick={() => setLightboxOpen(true)}>
          <img src={selectedColor.img} alt={selectedColor.code} className="w-full h-64 md:h-80 object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
          {/* Overlay con nome e prezzo */}
          <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-lg font-bold text-white drop-shadow-sm">{selectedColor.code}</p>
                <span className="text-base font-black text-green-400 shrink-0">€{conPosa ? prezzoSconto : prezzoPieno}<span className="text-[11px] font-semibold text-green-300/80">/mq</span></span>
                {conPosa && <span className="text-sm text-red-400 line-through font-medium shrink-0">€{prezzoPieno}/mq</span>}
              </div>
              <p className="text-xs text-gray-200 mt-0.5">{selectedProduct.name} · {selectedProduct.desc}</p>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm flex items-center gap-2">
            <Maximize2 className="w-3 h-3 text-gray-500" strokeWidth={2} />
            <span className="text-[10px] font-medium text-gray-600">Ingrandisci</span>
          </div>
        </div>
      </div>

      {lightboxOpen && <Lightbox src={selectedColor.img} alt={selectedColor.code} onClose={() => setLightboxOpen(false)} />}

      {/* COLORE — fixed height to prevent layout shift */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Colore</p>
        <div className="flex flex-wrap gap-2 min-h-[104px] content-start">
          {selectedProduct.colors.map((c) => (
            <button key={c.code} onClick={() => handleColorSelect(c)}
              className={`relative w-11 h-11 rounded-xl overflow-hidden transition-all duration-200 ${
                selectedColor.code === c.code ? 'ring-2 ring-green-500 ring-offset-2 scale-110 shadow-md' : 'ring-1 ring-gray-200 hover:ring-gray-300'
              }`} title={c.code}>
              <img src={c.img} alt={c.code} className="w-full h-full object-cover" />
              {selectedColor.code === c.code && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-600/40">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* FORMATO — 2x2 grid cards with horizontal scale preview */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Formato</p>
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.map((p) => {
            const isSelected = selectedProduct.id === p.id;
            const MAX_MM = 1524;
            const isXL = p.id === 'xl';
            const BASE_PX = isXL ? 130 : 90;
            const h = Math.round((p.scaleH / MAX_MM) * BASE_PX);
            const w = Math.round((p.scaleW / p.scaleH) * h);

            return (
              <button key={p.id} onClick={() => handleProductChange(p)}
                className={`relative rounded-2xl p-4 text-left transition-all duration-200 border-2 ${
                  isSelected
                    ? 'border-green-500 bg-green-50 shadow-md shadow-green-200/50'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                }`}>
                {/* Nome formato + descrizione in alto */}
                <div className="mb-3">
                  <p className={`text-base font-bold leading-tight ${isSelected ? 'text-green-700' : 'text-gray-900'}`}>{p.name}</p>
                  <p className={`text-[11px] font-medium mt-0.5 ${isSelected ? 'text-green-600/70' : 'text-gray-400'}`}>{p.desc}</p>
                </div>
                {/* Plank drawing — allineato a sinistra */}
                <div className="flex justify-start mb-3">
                  <div className="flex flex-col items-center">
                    <div className={`relative transition-all duration-200 ${
                      isSelected ? 'bg-green-400/40 ring-1 ring-green-400' : 'bg-gray-200/70'
                    }`}
                      style={{ width: `${Math.max(h, 12)}px`, height: `${Math.max(w, 5)}px` }}>
                      {/* Width label right at the edge of plank */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-1.5 flex items-center gap-0.5 whitespace-nowrap">
                        <svg className={`w-2.5 h-2.5 shrink-0 ${isSelected ? 'text-green-400' : 'text-gray-300'}`} viewBox="0 0 8 8" fill="none">
                          <line x1="4" y1="0" x2="4" y2="8" stroke="currentColor" strokeWidth="1" />
                          <polyline points="2,6 4,8 6,6" fill="none" stroke="currentColor" strokeWidth="0.8" />
                        </svg>
                        <span className={`text-[10px] font-semibold ${isSelected ? 'text-green-500' : 'text-gray-400'} whitespace-nowrap`}>{p.scaleW} mm</span>
                      </div>
                    </div>
                    {/* Length label below, centered on plank */}
                    <div className="flex items-center gap-0.5 whitespace-nowrap mt-1">
                      <svg className={`w-2.5 h-2.5 shrink-0 ${isSelected ? 'text-green-400' : 'text-gray-300'}`} viewBox="0 0 8 8" fill="none">
                        <line x1="0" y1="4" x2="8" y2="4" stroke="currentColor" strokeWidth="1" />
                        <polyline points="2,2 0,4 2,6" fill="none" stroke="currentColor" strokeWidth="0.8" />
                      </svg>
                      <span className={`text-[10px] font-semibold ${isSelected ? 'text-green-500' : 'text-gray-400'} whitespace-nowrap`}>{p.scaleH} mm</span>
                    </div>
                  </div>
                </div>
                {/* Prezzo in fondo */}
                <div className="flex items-baseline justify-center gap-1.5 pt-1 border-t border-dashed border-gray-100">
                  {conPosa && (
                    <span className="text-xs text-red-400 line-through font-medium">€{p.prezzoPieno}</span>
                  )}
                  <span className={`text-lg font-black leading-none ${isSelected ? 'text-green-600' : 'text-gray-800'}`}>€{conPosa ? p.prezzoSconto : p.prezzoPieno}</span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-green-500' : 'text-gray-400'}`}>/mq</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SLIDER mq */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Metri quadri</span>
          <span className="text-2xl font-bold text-gray-900">{sqm} <span className="text-sm font-medium text-gray-400">mq</span></span>
        </div>
        <div className="relative">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 h-4 bg-gray-100 rounded-full w-full" />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 h-4 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-200" style={{ width: `${sliderPercent}%` }} />
          <input type="range" min="10" max="200" step="5" value={sqm}
            onChange={(e) => handleSqmChange(Number(e.target.value))}
            className="relative w-full h-4 bg-transparent rounded-full appearance-none cursor-grab active:cursor-grabbing
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:h-10
              [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-xl
              [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-green-500 [&::-webkit-slider-thumb]:cursor-grab
              [&::-webkit-slider-thumb]:active:cursor-grabbing [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:h-10 [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-xl [&::-moz-range-thumb]:border-[3px]
              [&::-moz-range-thumb]:border-green-500 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:active:cursor-grabbing
              [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-track]:bg-transparent" />
        </div>
      </div>

      {/* MATERASSINO EXTRA — obbligatorio per formato Spina */}
      {selectedProduct.id === 'spina' && (
        <div className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-violet-50 border-2 border-violet-400 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-violet-400 overflow-hidden shrink-0 flex items-center justify-center bg-violet-100">
              <Layers className="w-5 h-5 text-violet-600" strokeWidth={2} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-violet-700">Materassino fonoassorbente</p>
              <p className="text-[11px] text-violet-600 font-semibold">
                Incluso obbligatoriamente · €2,6/mq × {displaySqm} mq = {formatEuro(prezzoMaterassino * displaySqm)}
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Check className="w-5 h-5 text-violet-600" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* ── CARD POSA: video + toggle + spiegazione ── */}
      <div className={`mb-6 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
        conPosa ? 'border-green-500 shadow-lg shadow-green-100' : 'border-gray-200'
      }`}>
        <div onClick={handleTogglePosa} className="cursor-pointer">
          {/* Video */}
          <div className="relative w-full h-36 md:h-44 overflow-hidden bg-gray-100">
            <video
              src={spcPosaVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Badge stato */}
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-sm transition-all duration-300 ${
                conPosa 
                  ? 'bg-green-500/90 text-white' 
                  : 'bg-gray-500/70 text-white'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${conPosa ? 'bg-white animate-pulse' : 'bg-white/50'}`} />
                {conPosa ? 'Posa inclusa' : 'Solo materiale'}
              </span>
            </div>
          </div>

          {/* Toggle + prezzi */}
          <div className={`px-4 py-3 transition-colors duration-300 ${conPosa ? 'bg-green-50' : 'bg-white'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="text-left min-w-0 flex-1">
                <p className={`text-sm font-bold ${conPosa ? 'text-green-700' : 'text-gray-700'}`}>
                  {conPosa ? 'Posa inclusa' : 'Aggiungi la posa'}
                </p>
                <div className="flex items-baseline gap-1.5 mt-0.5 flex-wrap">
                  {conPosa ? (
                    <span className="text-[11px] text-gray-600">
                      Pavimento <span className="text-red-400 line-through">€{prezzoPieno}/mq</span>{' '}
                      <span className="text-green-600 font-bold">€{prezzoSconto}/mq</span>{' '}
                      <span className="text-gray-300">·</span>{' '} <br />
                      Posa <span className="font-bold text-gray-800">€{prezzoPosa}/mq</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-gray-400 font-semibold">Attiva subito lo sconto del 40% sul pavimento</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {conPosa && (
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] text-green-600 font-bold uppercase tracking-wide">Risparmi</span>
                    <span className="text-sm font-bold text-green-700">{formatEuro(risparmio)}</span>
                  </div>
                )}
                <div className={`relative w-12 h-7 rounded-full transition-colors duration-300 shrink-0 ${conPosa ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${conPosa ? 'left-[22px]' : 'left-0.5'}`} />
                </div>
              </div>
            </div>

            {/* Prezzo posa — visibile quando disattivo */}
            {!conPosa && (
              <div className="mt-2 flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                <span className="text-[11px] font-semibold text-gray-500">Posa in opera</span>
                <span className="text-[11px] font-bold text-gray-700">€{prezzoPosa}/mq</span>
              </div>
            )}
          </div>
        </div>

        {/* Spiegazione */}
        <div className={`px-4 py-2.5 border-t transition-colors duration-300 ${
          conPosa ? 'border-green-100 bg-green-50/50' : 'border-gray-100 bg-gray-50/50'
        }`}>
          <p className={`text-[11px] leading-relaxed ${conPosa ? 'text-green-800' : 'text-gray-500'}`}>
            {conPosa
              ? 'Pavimento scontato del 40% + posa a regola d\'arte inclusa. Ci occupiamo noi di movimentazione mobili e pulizia finale. Prezzo finale trasparente, senza sorprese.'
              : <>Attiva la posa e il pavimento passa da <span className="text-red-400 line-through">€{prezzoPieno}/mq</span> a <span className="font-bold text-green-600">€{prezzoSconto}/mq</span> con lo sconto del 40%. Un unico fornitore per materiale e installazione, zero pensieri.</>
            }
          </p>
        </div>
      </div>

      {/* Social proof — carosello lavori SPC recenti */}
      <div className="mb-6">
        <WorkCarousel />
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
};

// ═══════════════════════════════════
// ═══ PAGINA ════════════════════════
// ═══════════════════════════════════
export default function SPCFornituraPosaPage() {
  const spcService = servicesData['posa-pavimento-spc-roma'];

  return (
    <HelmetProvider>
      <Helmet>
        <title>SPC a Roma a Prezzo di Fabbrica | Fornitura + Posa -40%</title>
        <meta name="description" content="Pavimento SPC a Roma a prezzo di fabbrica. Aggiungi la posa e scontiamo il pavimento del 40%. Calcola il preventivo in 10 secondi." />
        <link rel="canonical" href="https://www.posaparquetroma.it/spc-fornitura-posa" />
      </Helmet>

      <section className="bg-white overflow-x-hidden">
        <div className="max-w-lg mx-auto px-4 py-8 md:py-12">
          {/* SOCIAL PROOF — Google recensioni */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden shrink-0">
              <img src={teamPhoto} alt="Andrea e Oni" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-[#fbbf24] text-[#fbbf24]" strokeWidth={0} />)}
                </div>
                <span className="text-sm font-bold text-gray-700">5.0</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                <svg className="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="font-semibold">467+ installazioni </span>
              </div>
            </div>
          </div>

          {/* TITOLO */}
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 text-center leading-tight tracking-tight mb-3">
            Fornitura e posa <span className="text-green-500"> SPC a Roma </span>
          </h1>

          {/* OFFERTA BADGE */}
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-center mb-4">
            <p className="text-sm font-bold text-green-800">
              <span className="text-green-500 font-black tracking-tight">🎉 Promo -40% sul pavimento</span> se aggiungi la posa
            </p>
          </div>

          {/* 3 BENEFIT CHECK sotto il titolo */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mb-6">
            {[
              { text: 'Garanzia 15 anni', icon: '🏆' },
              { text: 'Senza demolizioni', icon: '⚡' },
              { text: 'Pronto in soli 1-2 giorni', icon: '⚡' },
            ].map(({ text, icon }) => (
              <div key={text} className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg className="w-2.5 h-2.5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-500">{text}</span>
              </div>
            ))}
          </div>

          <Calculator />
        </div>
      </section>

      {/* Carte dei parquettisti */}
      <Temparquettisti />

      <ServiceExplainerSection service={spcService} />
      <RecentWorks category="spc" title="Lavori SPC reali" />
      <ServiceFAQ category="posa-pavimento-spc-roma" />
    </HelmetProvider>
  );
}
