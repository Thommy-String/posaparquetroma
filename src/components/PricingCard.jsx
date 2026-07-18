import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PHONE_NUMBER } from '../utils/constants';
import { gtagReportConversion } from '../utils/analytics';

function LazyVideo({ src, className }) {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const element = containerRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

// Funzione helper per le caratteristiche (gestisce stringhe tipo "Garanzia: 10 anni")
const parseFeature = (feature) => {
  if (typeof feature !== 'string') return { label: '', value: '' };
  const parts = feature.split(':');
  if (parts.length < 2) return { label: feature, value: '' };
  return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() };
};

export function PricingCard({ service, onShowProcessClick }) {
  // 1. Protezione iniziale: se non arrivano dati, non renderizzare nulla
  if (!service) return null;

  // 2. Estrazione dati sicura
  const { calculator } = service;
  const [quantity, setQuantity] = useState(calculator?.defaultValue ?? 50);
  const quantityLabel = calculator?.label ?? 'mq';
  
  // Usiamo nomi variabili coerenti con pricingData
  const pricePerUnit = service.pricePerMq ?? 0;
  const timeFactor = service.timeFactorPerMq ?? 0.05;

  // 3. Calcoli dinamici
  const estimatedCost = useMemo(() => {
    return (quantity * pricePerUnit).toLocaleString('it-IT', { 
      style: 'currency', 
      currency: 'EUR', 
      maximumFractionDigits: 0 
    });
  }, [quantity, pricePerUnit]);

  const estimatedTime = useMemo(() => {
    const days = Math.max(1, Math.ceil(quantity * timeFactor));
    return `${days} ${days > 1 ? 'Giorni' : 'Giorno'}`;
  }, [quantity, timeFactor]);

  // 4. Trasformazione sicura delle features (evita l'errore .map di undefined)
  const featureData = useMemo(() => {
    return (service.features || []).map(parseFeature);
  }, [service.features]);
  
  const thumbPositionPercentage = useMemo(() => {
    const min = calculator?.min ?? 10;
    const max = calculator?.max ?? 200;
    return ((quantity - min) / (max - min)) * 100;
  }, [quantity, calculator]);

  return (
    <div className="bg-white rounded-[24px] shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300">
      
      {/* Media (Immagine o Video) */}
      <div className="h-56 overflow-hidden relative">
        {service.mediaType === 'video' ? (
          <LazyVideo src={service.mediaSrc} className="w-full h-full bg-gray-100" />
        ) : (
          <img 
            src={service.mediaSrc} 
            alt={service.name || 'Servizio'} 
            className="w-full h-full object-cover" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
        <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">{service.name}</h3>
      </div>

      {/* Body */}
      <div className="p-6 flex-grow flex flex-col">
        
        {/* Intestazione Prezzo */}
        <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-4">
           <div>
             <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">Prezzo di partenza</span>
             <div className="flex items-baseline gap-1">
               <span className="text-2xl font-bold text-gray-900">{service.price || 'Su preventivo'}</span>
             </div>
             {service.pricePerMq && service.unit && (
                <div className="text-xs text-gray-700 mt-0.5">
                    {`€${service.pricePerMq} al ${service.unit.replace('/', '').trim()}`}
                </div>
             )}
           </div>
           {onShowProcessClick && (
             <button 
               onClick={() => onShowProcessClick(service)} 
               className="text-blue-600 text-xs font-bold bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors border border-blue-100"
             >
               Info Posa ⓘ
             </button>
           )}
        </div>

        {/* Features List */}
        <div className="space-y-2 mb-6 flex-grow">
          {featureData.length > 0 ? (
            featureData.slice(0, 3).map((f, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-700">{f.label}</span>
                <span className="font-medium text-gray-800">{f.value}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-600 italic">Dettagli tecnici disponibili su richiesta</p>
          )}
        </div>

        {/* Simulator Area */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
           {/* Slider */}
           <div className="relative mb-6 pt-5">
              <span 
                className="absolute -top-1 text-blue-600 text-xs font-bold transition-all duration-75" 
                style={{ left: `${thumbPositionPercentage}%`, transform: 'translateX(-50%)' }}
              >
                {quantity} {quantityLabel}
              </span>
              <input 
                type="range" 
                min={calculator?.min ?? 10} 
                max={calculator?.max ?? 200} 
                step={1} 
                value={quantity} 
                aria-label={`Seleziona la quantita per ${service?.title ?? service?.name ?? 'il servizio'}`}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
              />
           </div>
           
           {/* Risultati Simulazione */}
           <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-[10px] text-gray-600 uppercase font-bold">Stima Totale</p>
                <p className="text-xl font-bold text-blue-600">{estimatedCost}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-600 uppercase font-bold">Tempo Stimato</p>
                <p className="text-lg font-bold text-gray-800">{estimatedTime}</p>
              </div>
           </div>

           {/* Bottone CTA */}
            <button 
             onClick={() => {
                gtagReportConversion({
                  redirectUrl: `tel:${PHONE_NUMBER}`,
                });
             }}
             className="group relative flex items-center justify-center w-full bg-white border-[2.5px] border-slate-900 px-4 py-3.5 rounded-xl text-slate-900 font-bold uppercase tracking-tighter transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:bg-gray-50 text-sm"
           >
             <div className="flex items-center gap-2">
                <div className="p-1 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                   </svg>
                </div>
                <span>Chiama per un preventivo</span>
             </div>
            </button>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;