import React, { useState, useRef, useEffect } from 'react';
import { Star, MoveHorizontal } from 'lucide-react';
import HeroStats from './HeroStats';
import InstallationQuiz from './InstallationQuiz';
import { pricingData } from '../utils/pricingData';
import { COMPANY_NAME } from '../utils/constants';

// --- IMPORT IMMAGINI PRIMA/DOPO per le card ---
import beaPrima from '../assets/images/primaDopoLavori/BeaPrima.webp';
import beaDopo from '../assets/images/primaDopoLavori/BeaDopo.webp';
import nelyPrima from '../assets/images/primaDopoLavori/NelyPrima.webp';
import nelyDopo from '../assets/images/primaDopoLavori/NelyDopo.webp';
import prima2 from '../assets/images/primaDopoLavori/prima2.webp';
import dopo2 from '../assets/images/primaDopoLavori/dopo2.webp';
import prima5 from '../assets/images/primaDopoLavori/prima5.webp';
import dopo5 from '../assets/images/primaDopoLavori/dopo5.webp';
import rovereNaturaleDritto from '../assets/images/primaDopoLavori/rovereNaturaleDritto.webp';
import rovereFlottante from '../assets/images/primaDopoLavori/rovereFlottante.webp';
import prefinitoFlottanteLargo from '../assets/images/primaDopoLavori/prefinitoFlottanteLargo.webp';
import rovereSpinaItaMobili from '../assets/images/primaDopoLavori/rovereSpinaItaMobili.webp';
import posaSpinaUngherese from '../assets/images/primaDopoLavori/posaSpinaUngherese.webp';
import prefinitoDrittoRovere from '../assets/images/primaDopoLavori/prefinitoDrittoRovere.webp';
import laminatoGrigio from '../assets/images/primaDopoLavori/laminatoGrigio.webp';
import laminatoNoce from '../assets/images/primaDopoLavori/laminatoNoce.webp';
import laminatoRovereChiaro from '../assets/images/primaDopoLavori/laminatoRovereChiaro.webp';
import battiscopa10cm from '../assets/images/parquet/battiscopa10cm.webp';
import battiscopa5cm from '../assets/images/parquet/battiscopa5cm.webp';
import posaScala from '../assets/images/parquet/posaScala.webp';
import rivestimentoScaleRovere from '../assets/images/parquet/rivestimentoScaleRovere.webp';
import igorPrima from '../assets/images/primaDopoLavori/igorPrima.webp';
import igorDopo from '../assets/images/primaDopoLavori/igorDopo.webp';
import barbaraPrimaSPC from '../assets/images/primaDopoLavori/barbaraPrimaSPC.webp';
import barbaraSPCbagno from '../assets/images/primaDopoLavori/barbaraSPCbagno.webp';

// Avatar condiviso per tutte le recensioni hero
const HERO_REVIEW_AVATAR = 'https://i.pinimg.com/736x/be/47/31/be47314b9091f59b453b0328fd9942a8.jpg';
const SPC_HERO_BEFORE_IMAGE = '/service-images/spc-hero-before-640.webp';
const SPC_HERO_AFTER_IMAGE = '/service-images/spc-hero-after-640.webp';

// Mappa: pricingId → coppie di immagini prima/dopo per le 2 card comparison
const COMPARISON_DATA = {
  'prefinito': [
    {
      beforeImg: prima2, afterImg: dopo2, price: '€2.002', time: '3 Giorni', label: 'Posa a colla prefinito',
      review: {
        text: 'Molto soddisfatta, trovati su Google. Tempi previsti di 3 giorni rispettati. Il pavimento è bellissimo.',
        author: 'Valentina C.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
    {
      beforeImg: rovereNaturaleDritto, afterImg: prefinitoDrittoRovere, price: '€1.750', time: '3 Giorni', label: 'Rovere Naturale',
      review: {
        text: 'Risultato eccellente e ragazzi trasparenti dall\'inizio alla fine. Prezzi e tempi chiari.',
        author: 'Giorgio P.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
  ],
  'prefinito-flottante': [
    {
      beforeImg: prima2, afterImg: dopo2, price: '€2.002', time: '3 Giorni', label: 'Installazione Flottante',
      review: {
        text: 'Soluzione comoda senza togliere il pavimento esistente. Bravi e puntuali!',
        author: 'Anna M.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
    {
      beforeImg: rovereFlottante, afterImg: prefinitoFlottanteLargo, price: '€2.650', time: '4 Giorni', label: 'Plancia Larga',
      review: {
        text: 'Velocissimi nelle risposte, sempre disponibili. Il nuovo parquet è stupendo.',
        author: 'Marco D.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
  ],
  'prefinito-spina': [
    {
      beforeImg: nelyPrima, afterImg: nelyDopo, price: '€1.950', time: '2 Giorni', label: 'Spina Francese',
      review: {
        text: 'Bravi, esperienza positiva. La spina francese è venuta perfetta, ogni tavola allineata.',
        author: 'Nely R.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
    {
      beforeImg: rovereSpinaItaMobili, afterImg: posaSpinaUngherese, price: '€2.405', time: '2 Giorni', label: 'Spina Italiana',
      review: {
        text: 'Mi ritengo soddisfatto ad aver affidato a loro l\'installazione del mio parquet a spina. Ottimo lavoro.',
        author: 'Giovanni V.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
  ],
  'spc': [
    {
      beforeImg: SPC_HERO_BEFORE_IMAGE, afterImg: SPC_HERO_AFTER_IMAGE, price: '€850', time: '2 Giorni', label: 'Bagno SPC Bergamo - Barbara',
      review: {
        text: 'Abbiamo affidato ad Andrei i lavori per il bagno e siamo rimasti molto soddisfatti. È un professionista bravo, preciso e veloce. Ha svolto il lavoro in modo impeccabile, curando ogni dettaglio. Consigliatissimo!',
        author: 'Barbara D.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
    {
      beforeImg: beaPrima, afterImg: beaDopo, price: '€430', time: '5 ore', label: 'Nuovo ambiente in SPC',
      review: {
        text: 'Professionalità, precisione e grande attenzione ai dettagli. Il lavoro è stato eseguito con cura impeccabile, rispettando tempi e aspettative. Grazie mille Andrea e Thomas!',
        author: 'Beatrice M.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
  ],
  'laminato': [
    {
      beforeImg: laminatoGrigio, afterImg: laminatoNoce, price: '€1.405', time: '2 Giorni', label: 'Laminato effetto Noce',
      review: {
        text: 'Proprio come lo volevamo. Bravi, velocissimi e puliti. Consigliatissimi.',
        author: 'Marco F.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
    {
      beforeImg: laminatoRovereChiaro, afterImg: laminatoGrigio, price: '€700', time: '8 ore', label: 'Laminato Grigio moderno',
      review: {
        text: 'La mia paura era avere tutti i mobili in mezzo, ma non sopportavo più il vecchio pavimento. Sono molto contenta del risultato.',
        author: 'Giulia R.',
        avatar: HERO_REVIEW_AVATAR,
      },
    },
  ],
  'battiscopa': [
    { beforeImg: battiscopa5cm, afterImg: battiscopa10cm, price: '€430', time: '5 ore', label: 'Installazione Battiscopa' },
    { beforeImg: battiscopa10cm, afterImg: battiscopa5cm, price: '€350', time: '4 ore', label: 'Battiscopa su misura' },
  ],
  'scala-parquet': [
    { beforeImg: posaScala, afterImg: rivestimentoScaleRovere, price: '€2.002', time: '3 Giorni', label: 'Nuovo Rivestimento Scale' },
    { beforeImg: rivestimentoScaleRovere, afterImg: posaScala, price: '€1.800', time: '2 Giorni', label: 'Gradini in vero Rovere' },
  ],
};

// Titoli dinamici per l'H1 — Stile Stencil Urban Pastel
const SERVICE_TITLES = {
  'prefinito': (
    <>
      Il vero <span className="bg-orange-50 text-orange-900 px-2 py-0.5 transform -rotate-1 inline-block border border-orange-100 rounded-sm">Parquet</span>
      <br /><span className="text-orange-600">Pronto all&apos;Uso</span> in tempi record.
      <br /><span className="text-slate-400 text-[0.5em] align-middle ml-2 decoration-slice decoration-orange-200 underline font-black">Nobiltà del legno, posa rapida.</span>
    </>
  ),
  'prefinito-flottante': (
    <>
      Parquet <span className="bg-amber-50 text-amber-900 px-2 py-0.5 transform rotate-1 inline-block border border-amber-100 rounded-sm">Flottante</span>
      <br /><span className="text-amber-600">Zero Colla</span> e subito calpestabile.
      <br /><span className="text-slate-400 text-[0.5em] align-middle ml-2 decoration-slice decoration-amber-200 underline font-black">Posa rapida senza sporcare.</span>
    </>
  ),
  'prefinito-spina': (
    <>
      Parquet <span className="bg-pink-50 text-pink-900 px-2 py-0.5 transform -rotate-1 inline-block border border-pink-100 rounded-sm">a Spina</span>
      <br /><span className="text-pink-600">Precisione Laser</span> e incollaggio certificato.
      <br /><span className="text-slate-400 text-[0.5em] align-middle ml-2 decoration-slice decoration-pink-200 underline font-black">Geometrie perfette, casa trasformata.</span>
    </>
  ),
  'spc': (
    <>
       Servizio posa SPC <span className="text-yellow-500">a Milano</span>
      <br />pronto in soli <span className="text-green-600">1–2 giorni</span> <span className="text-red-600">senza demolire il pavimento</span>
      <br /><span className="text-slate-400 text-[0.7em] align-middle ml-2 decoration-slice decoration-yellow-200 underline font-bold">sopra il vecchio, anche in case con mobili.</span>
    </>
  ),
  'laminato': (
    <>
      Posa <span className="bg-emerald-50 text-emerald-900 px-2 py-0.5 transform rotate-1 inline-block border border-emerald-100 rounded-sm">Laminato</span>
      <br /><span className="text-emerald-600">Massima Resistenza</span> per tutta la casa.
      <br /><span className="text-slate-400 text-[0.5em] align-middle ml-2 decoration-slice decoration-emerald-200 underline font-black">Estetica legno, durezza estrema.</span>
    </>
  ),
  'battiscopa': (
    <>
      Finiture con <span className="bg-slate-50 text-slate-900 px-2 py-0.5 transform rotate-1 inline-block border border-slate-200 rounded-sm">Battiscopa</span>
      <br /><span className="text-slate-600">Dettagli Sartoriali</span> per ogni ambiente.
      <br /><span className="text-slate-400 text-[0.5em] align-middle ml-2 decoration-slice decoration-slate-300 underline font-black">Il tocco finale che fa la differenza.</span>
    </>
  ),
  'scala-parquet': (
    <>
      Le tue <span className="bg-violet-50 text-violet-900 px-2 py-0.5 transform rotate-1 inline-block border border-violet-100 rounded-sm">Scale</span>
      <br /><span className="text-violet-600">Rivestite in Legno</span> su misura.
      <br /><span className="text-slate-400 text-[0.5em] align-middle ml-2 decoration-slice decoration-violet-200 underline font-black">Sagomatura millimetrica, finitura sartoriale.</span>
    </>
  ),
};

// --- CARD PRIMA/DOPO (Identica alla Home) ---
const ComparisonCard = ({ beforeImg, afterImg, price, timeDisplay, label, className }) => (
  <div className={`relative group w-full overflow-hidden shadow-sm border border-gray-100 rounded-xl ${className}`}>
    {/* PRIMA */}
    <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-gray-200">
      <img src={beforeImg} alt="Prima" loading="eager" className="w-[200%] h-full max-w-none object-cover filter grayscale contrast-125" />
      <div className="absolute top-2 left-2 text-[8px] font-bold text-white/90 uppercase tracking-wider drop-shadow-md">Situazione Iniziale</div>
    </div>
    {/* DOPO */}
    <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-gray-100 border-l-[1.5px] border-white">
      <img src={afterImg} alt="Dopo" className="w-[200%] h-full max-w-none object-cover -ml-[100%]" />
      <div className="absolute top-2 right-2 text-[8px] font-bold text-white uppercase tracking-wider drop-shadow-md">Risultato Finale</div>
    </div>
    {/* Info */}
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 flex flex-col items-center justify-end text-center">
      <p className="text-[10px] text-white/80 font-medium uppercase tracking-widest mb-0.5">{label}</p>
      <div className="flex items-center gap-2 text-white text-xs font-bold">
        <span>{price}</span>
        <span className="w-1 h-1 rounded-full bg-white/50"></span>
        <span>{timeDisplay}</span>
      </div>
    </div>
  </div>
);

// --- COMPONENTE SLIDER PRIMA/DOPO ---
const BeforeAfterSlider = ({ beforeImg, afterImg, pricingId, priceDisplay, servicePricingId }) => {
  // ...existing code...
  // Solo l'animazione iniziale usa setState per il primo render.
  const positionRef = useRef(50);
  const sliderLineRef = useRef(null);
  const clipRef = useRef(null);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragRectRef = useRef(null);

  // Funzione per applicare la posizione al DOM direttamente (zero re-render)
  const applyPosition = (percent) => {
    positionRef.current = percent;
    if (clipRef.current) {
      clipRef.current.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    }
    if (sliderLineRef.current) {
      sliderLineRef.current.style.left = `${percent}%`;
    }
  };

  // Animazione iniziale per far capire all'utente che può muovere lo slider
  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = 1500;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const offset = Math.sin(progress * Math.PI * 2) * 15;
        applyPosition(50 + offset);
        animationFrame = requestAnimationFrame(animate);
      } else {
        applyPosition(50);
      }
    };

    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleMove = (clientX) => {
    const rect = dragRectRef.current || containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    applyPosition(percent);
  };

  // Listener globali con riferimenti stabili (useEffect una sola volta)
  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      handleMove(e.clientX);
    };
    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return;
      handleMove(e.touches[0].clientX);
    };
    const onEnd = () => {
      isDraggingRef.current = false;
      dragRectRef.current = null;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, []); // ← Montato una sola volta, nessuna funzione anonima duplicata

  return (
    <div
      className="group relative w-full h-[280px] md:h-[360px] overflow-hidden bg-slate-50 select-none cursor-ew-resize"
      ref={containerRef}
      onMouseDown={(e) => {
        isDraggingRef.current = true;
        dragRectRef.current = containerRef.current?.getBoundingClientRect() || null;
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        isDraggingRef.current = true;
        dragRectRef.current = containerRef.current?.getBoundingClientRect() || null;
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* IMMAGINE DOPO (Sfondo - sempre intera) */}
      <img
        src={afterImg}
        alt="Risultato Finale"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* IMMAGINE PRIMA (Sopra - clippata dinamicamente) */}
      <div
        ref={clipRef}
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `polygon(0 0, 50% 0, 50% 100%, 0 100%)` }}
      >
        <img
          src={beforeImg}
          alt="Situazione Iniziale"
          className="absolute inset-0 w-full h-full object-cover filter grayscale-[40%] brightness-90 contrast-110 pointer-events-none"
        />
      </div>

      {/* SLIDER HANDLE LINE & BUTTON */}
      <div
        ref={sliderLineRef}
        className="absolute top-0 bottom-0 z-20"
        style={{ left: '50%' }}
      >
        {/* Linea verticale bianca */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"></div>

        {/* Cerchietto con frecce al centro */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-ew-resize text-slate-800 transition-transform active:scale-95 group-hover:scale-105">
          <MoveHorizontal size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* BADGE PREZZO — Top Right */}
      {priceDisplay && (
        <div className="absolute top-4 right-4 z-30 bg-white border-2 border-black rounded-xl px-3 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[10px] font-black text-gray-700 uppercase tracking-wider mb-0.5 leading-none">Montaggio da</p>
          <p className="text-[18px] font-black text-black leading-none">{priceDisplay}</p>
        </div>
      )}

      {/* LABEL PRIMA - DOPO — Bottom */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-between px-4 pointer-events-none">
        <span className="text-[11px] font-black text-white uppercase tracking-wider drop-shadow-md bg-black/40 px-2.5 py-1 rounded">PRIMA</span>
        <span className="text-[11px] font-black text-white uppercase tracking-wider drop-shadow-md bg-black/40 px-2.5 py-1 rounded">DOPO</span>
      </div>

      {/* CHECKLIST CARD — Bottom Left (Solo per SPC) */}
      {servicePricingId === 'spc' && (
        <div className="absolute bottom-4 left-4 z-30 bg-white border-2 border-black rounded-lg px-3.5 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]">
          <div className="space-y-2">
            {/* Check 1 */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-md flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-[11px] font-bold text-slate-900 leading-tight">Sul pavimento esistente</span>
            </div>
            {/* Check 2 */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-md flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-[11px] font-bold text-slate-900 leading-tight">Anche in case con mobili</span>
            </div>
            {/* Check 3 */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-md flex items-center justify-center shrink-0">
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-[11px] font-bold text-slate-900 leading-tight">Posa rapida: 1-2 giorni</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


function ServiceHeroHome({ service }) {
  if (!service) return null;

  const pricingId = service.pricingId || '';
  const serviceTitle = SERVICE_TITLES[pricingId] || service.hero?.h1 || 'pavimento';
  const comparisons = COMPARISON_DATA[pricingId] || COMPARISON_DATA['prefinito'];
  const priceInfo = pricingData.find(p => p.id === pricingId) || {};

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background sfumato */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/60 blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-50/60 blur-3xl"></div>
      </div>

      <div className="w-full bg-white mx-auto px-3 pb-6 pt-2 md:pt-32 lg:pt-36 relative z-10 overflow-x-clip">
        <div className="flex flex-col items-center">

          {/* --- COLONNA CENTRALE --- */}
          <div className="text-center flex flex-col items-center w-full max-w-md mx-auto">

            {/* --- SOCIAL PROOF --- */}
            <div className="flex flex-col items-center gap-2 mt-3 mb-1">
              {pricingId === 'spc' ? (
                // Badge speciale per SPC
                <div className="inline-flex flex-col items-center gap-2 px-4 py-3 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  {/* Google 5 Stelle */}
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-[#fbbf24] text-[#fbbf24]" strokeWidth={0} />
                      ))}
                    </div>
                    <span className="text-[12px] font-semibold text-gray-700">punteggio 5/5</span>
                  </div>
                  
                  <div className="text-center space-y-1">
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide block">Posiamo a Milano e Dintorni</span>
                  </div>
                </div>
              ) : (
                // Badge standard per altri servizi
                <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/70 border border-[#E5E5E5] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 cursor-default">
                  {/* 5 Stelle */}
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#fbbf24] text-[#fbbf24] filter drop-shadow-[0_0_3px_rgba(251,191,36,0.6)]" strokeWidth={0} />
                    ))}
                  </div>
                  {/* Google Logo */}
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <div className="h-3 w-px bg-gray-200"></div>
                    <div className="flex items-center gap-1.5 opacity-80">
                      <span className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100 font-bold uppercase tracking-[-0.08em]">
                        milano e dintorni
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* H1 */}
            <h1 className="my-4 md:my-3 text-center px-0 w-full overflow-hidden">
              <span className="block font-[900] uppercase leading-none tracking-tighter text-slate-900 break-words text-[20px] md:text-[28px]">
                {React.isValidElement(serviceTitle) ? (
                  serviceTitle
                ) : (
                  <>{serviceTitle}</>
                )}
              </span>
            </h1>

            {/* --- IMMAGINE PRIMA/DOPO STATICHE + RECENSIONE --- */}
            <div className="w-full px-2 py-2 md:py-3 mb-0">
              {comparisons && comparisons.length > 0 && (() => {
                const comp = comparisons[0];
                return (
                  <div className="w-full border-[3px] border-black rounded-[24px] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    {/* FOTO STATICHE PRIMA/DOPO SIDE-BY-SIDE */}
                    <div className="relative w-full h-[280px] md:h-[360px] bg-gray-100 flex overflow-hidden">
                      {/* PRIMA (Sinistra) */}
                      <div className="w-1/2 relative bg-gray-200">
                        <img
                          src={comp.beforeImg}
                          alt="Prima"
                          loading="eager"
                          fetchPriority="high"
                          decoding="async"
                          className="w-full h-full object-cover filter grayscale-[40%] brightness-90 contrast-110"
                        />
                        <div className="absolute bottom-3 left-3 text-[10px] font-black text-white uppercase tracking-wider drop-shadow-md bg-black/40 px-2.5 py-1 rounded">PRIMA</div>
                      </div>

                      {/* DOPO (Destra) */}
                      <div className="w-1/2 relative border-l-[2px] border-white">
                        <img
                          src={comp.afterImg}
                          alt="Dopo"
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 right-3 text-[10px] font-black text-white uppercase tracking-wider drop-shadow-md bg-black/40 px-2.5 py-1 rounded">DOPO</div>
                      </div>

                      {/* INFO BADGE — Top Right */}
                      {service.priceDisplay && (
                        <div className="absolute top-4 right-4 z-30 bg-white border-2 border-black rounded-xl px-3 py-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <p className="text-[9px] font-black text-gray-700 uppercase tracking-wider mb-1 leading-none text-center">OFFERTA: Posa da</p>
                          <div className="flex flex-col items-center gap-1">
                            {pricingId === 'spc' && (
                              <p className="text-[13px] font-black text-red-600 line-through leading-none">€25</p>
                            )}
                            <p className="text-[18px] font-black text-black leading-none text-center">{service.priceDisplay}</p>
                          </div>
                          {pricingId === 'spc' && (
                            <div className="space-y-1.5 mt-2 pt-2 border-t border-gray-200">
                              {['Zero acconti prima', 'Paghi a fine giornata', 'Prezzi onesti'].map((text, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <svg className="w-3 h-3 text-green-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                  <p className="text-[10px] font-black text-gray-800 uppercase tracking-wider leading-tight">{text}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* CHECKLIST VANTAGGI — sotto l'immagine */}
                    <div className="bg-white border-t-[3px] border-black px-5 py-4 flex justify-center">
                      <div className="inline-flex flex-col items-start gap-2.5">
                        {[
                          'Pronto in 1–2 giorni',
                          'Sul pavimento esistente',
                          'Anche in case con mobili',
                        ].map((text, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-green-500 rounded-md flex items-center justify-center shrink-0">
                              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span className="text-[13px] font-black text-slate-900 uppercase tracking-tight leading-tight">{text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* CTA BUTTONS — 2 pulsanti */}
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full mt-2 mb-3">

              {/* CHIAMA ORA */}
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-full relative">
                  <div className="absolute inset-0 bg-white/40 blur-3xl scale-150 -z-10 rounded-full"></div>
                  <a
                    href="tel:+393342221212"
                    onClick={(e) => {
                      if (typeof window.gtag !== 'undefined') {
                        window.gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYY' });
                      }
                    }}
                    className="group relative flex items-center gap-4 w-full bg-blue-50 border-[2.5px] border-blue-900 px-8 py-4 rounded-xl text-blue-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(30,58,138,1)] hover:shadow-[2px_2px_0px_0px_rgba(30,58,138,1)] hover:translate-x-1 hover:translate-y-1 active:bg-blue-100 justify-center"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] text-blue-600 font-bold mb-1 tracking-widest uppercase">+39 334 222 1212</span>
                      <span className="text-xl md:text-2xl italic">Chiama ora</span>
                    </div>
                  </a>
                </div>
                <div className="w-full mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/></svg>
                    <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Nessun obbligo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/></svg>
                    <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Preventivo gratuito</span>
                  </div>
                </div>
              </div>

              {/* SCRIVICI ORA (WhatsApp) */}
              <div className="flex flex-col items-center max-w-xs">
                <div className="w-full relative">
                  <div className="absolute inset-0 bg-white/40 blur-3xl scale-150 -z-10 rounded-full"></div>
                  <a
                    href="https://wa.me/393342221212?text=Ciao%20Posa%20Parquet%20Milano%2C%20sono%20interessato%20a%20una%20consulenza%20gratuita"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window.gtag !== 'undefined') {
                        window.gtag('event', 'conversion', { 'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYY' });
                      }
                    }}
                    className="group relative flex items-center gap-4 w-full bg-emerald-50 border-[2.5px] border-emerald-900 px-8 py-4 rounded-xl text-emerald-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(5,83,34,1)] hover:shadow-[2px_2px_0px_0px_rgba(5,83,34,1)] hover:translate-x-1 hover:translate-y-1 active:bg-emerald-100 justify-center"
                  >
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor" className="text-emerald-600"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.257-.154-2.874.854.854-2.874-.154-.257A8 8 0 1112 20z" fill="currentColor" className="text-emerald-600"/>
                      </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[10px] text-emerald-600 font-bold mb-1 tracking-widest uppercase">online 24/7</span>
                      <span className="text-xl md:text-2xl italic">Scrivici ora</span>
                    </div>
                  </a>
                </div>
                <div className="w-full mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/></svg>
                    <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Risposta immediata</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/></svg>
                    <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Senza impegno</span>
                  </div>
                </div>
              </div>

            </div>

            {/* HERO STATS */}
            <div className="w-full my-4 lg:mb-10 flex justify-center">
              <HeroStats />
            </div>

            {/* PREVENTIVATORE ONLINE — InstallationQuiz integrato nella hero */}
            <InstallationQuiz service={service} />

          </div>
        </div>
      </div>

    </section>
  );
}

export default ServiceHeroHome;
