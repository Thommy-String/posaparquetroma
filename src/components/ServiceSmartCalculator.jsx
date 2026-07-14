import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Package, Layers, MessageCircle, Minus, Plus, Check, Trash2, Sofa, Lamp, DoorOpenIcon, DoorClosed, Send, SaveAllIcon, SaveIcon, LucideSave } from 'lucide-react';

// Definiamo gli Extra disponibili globalmente
const GLOBAL_EXTRAS = [
    { 
        id: 'furniture', 
        label: 'Spostamento Piccoli Mobili', 
        price: 50, 
        type: 'fixed',
        icon: Lamp,
        description: 'Gestione arredi stanza'
    },
    { 
        id: 'furniture-big', 
        label: 'Spostamento Grandi Mobili', 
        price: 150, 
        type: 'fixed',
        icon: Sofa,
        description: 'Gestione arredi stanza'
    },
    { 
        id: 'removal', 
        label: 'Rimozione Vecchio Battiscopa', 
        price: 3, 
        type: 'variable',
        icon: Trash2,
        description: 'Inclusa discarica'
    },
    { 
        id: 'skirting', 
        label: 'Posa nuovo Battiscopa', 
        price: 7, 
        type: 'variable',
        icon: Layers,
        description: 'Installazione nuovo battiscopa'
    },
    { 
        id: 'portaInterna', 
        label: 'Taglio porta interna', 
        price: 45, 
        type: 'fixed',
        icon: DoorOpenIcon,
        description: 'Adattamento altezza'
    },
     { 
        id: 'portaBlindata', 
        label: 'Taglio porta blindata', 
        price: 120, 
        type: 'fixed',
        icon: DoorClosed,
        description: 'Adattamento sicurezza'
    },
];

function ServiceScientificCalc({ serviceData }) {
    if (!serviceData) return null;

    // 1. Configurazioni
    const minVal = serviceData.calculator?.min || 10;
    const maxVal = serviceData.calculator?.max || 200;
    const defaultVal = serviceData.calculator?.defaultValue || 45;
    const step = serviceData.calculator?.step || 1;
    const basePrice = serviceData.pricePerMq;
    const unitLabel = serviceData.calculator?.label || 'mq';

    // Stato locale
    const [quantity, setQuantity] = useState(defaultVal);
    const [selectedExtras, setSelectedExtras] = useState([]);

    // Resetta lo stato se cambia il servizio
    useEffect(() => {
        setQuantity(serviceData.calculator?.defaultValue || 45);
        setSelectedExtras([]);
    }, [serviceData]);

    // --- LOGICA FILTRO EXTRA INTELLIGENTE ---
    const availableExtras = useMemo(() => {
        return GLOBAL_EXTRAS.filter(extra => {
            // Es. Se il servizio è battiscopa, nascondi l'extra battiscopa per evitare duplicati
            if (serviceData.id.includes('battiscopa') && extra.id === 'skirting') return false;
            return true;
        });
    }, [serviceData.id]);

    // --- LOGICA RAPID FIRE ---
    const timerRef = useRef(null);
    const intervalRef = useRef(null);

    const updateQuantity = (amount) => {
        setQuantity(prev => {
            const next = prev + amount;
            if (next > maxVal) return maxVal;
            if (next < minVal) return minVal;
            return next;
        });
    };

    const startChange = (amount) => {
        updateQuantity(amount);
        timerRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                updateQuantity(amount);
            }, 50); 
        }, 400); 
    };

    const stopChange = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const toggleExtra = (extraId) => {
        setSelectedExtras(prev => 
            prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
        );
    };

    // --- CALCOLI FINALI ---
    const { totalCost, estimatedDays, extrasCost } = useMemo(() => {
        const base = quantity * basePrice;
        let extrasTotal = 0;
        selectedExtras.forEach(id => {
            const option = availableExtras.find(opt => opt.id === id);
            if (option) {
                extrasTotal += option.type === 'fixed' ? option.price : option.price * quantity;
            }
        });

        const days = Math.max(1, Math.ceil(quantity * (serviceData.timeFactorPerMq || 0.03)));
        
        return { totalCost: base + extrasTotal, estimatedDays: days, extrasCost: extrasTotal };
    }, [quantity, selectedExtras, basePrice, serviceData.timeFactorPerMq, availableExtras]);

    const percentage = ((quantity - minVal) / (maxVal - minVal)) * 100;

    // --- WHATSAPP & CONVERSION TRACKING ---
    const handleWhatsAppClick = (actionType) => {
        const extraNames = selectedExtras.map(id => availableExtras.find(o => o.id === id)?.label).join(', ');
        
        // Messaggio leggermente diverso in base al bottone cliccato (opzionale, ma utile per te)
        const intro = actionType === 'write' ? "Ciao! Vorrei maggiori informazioni su questo preventivo:" : "Ciao! Sto salvando questo preventivo:";

        const text = `👋 ${intro} *${serviceData.name}*\n` +
                     `📐 Quantità: ${quantity} ${unitLabel}\n` +
                     `💶 Prezzo Base: €${basePrice}/${unitLabel}\n` +
                     (extraNames ? `➕ Extra richiesti: ${extraNames}\n` : '') +
                     `💰 *TOTALE STIMATO: €${totalCost}*\n` +
                     `⏱ Tempo previsto: ~${estimatedDays} gg lavorativi`;
        
        // 1. TRACKING GOOGLE ADS (Per entrambi i pulsanti)
        if (typeof window.gtag_report_conversion === 'function') {
            window.gtag_report_conversion();
        }
        
        // 2. APERTURA WHATSAPP
        window.open(`https://wa.me/393342221212?text=${encodeURIComponent(text)}`, '_self');
    };

    return (
        <div className="w-full max-w-[480px] mx-auto mb-12 px-4 font-sans text-slate-900">
            
            {/* 1. TAG PREZZO BASE - Riprogettato più pulito */}
            <div className="flex justify-center -mb-4 relative z-20">
                <div className="px-5 py-2 bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-black">
                         €{basePrice}/{unitLabel} <span className="text-black/40 mx-1">•</span> roma & Hinterland
                    </span>
                </div>
            </div>

            {/* CONTAINER CARD - Stile Neo-Brutalist coerente */}
            <div className="bg-white rounded-[40px] border-[3px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative z-10 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                
                {/* 2. ZONA INPUT QUANTITÀ */}
                <div className="p-10 pb-12 bg-[#F8FAFC]">
                    <div className="flex flex-col items-center">
                        <div className="px-3 py-1 bg-black text-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-8">
                           Step 1: Dimensione Stanza
                        </div>

                        {/* CONTROLLI +/- */}
                        <div className="flex items-center justify-center gap-10 select-none w-full mb-12">
                            <button 
                                onMouseDown={() => startChange(-step)}
                                onMouseUp={stopChange}
                                onMouseLeave={stopChange}
                                onTouchStart={(e) => { e.preventDefault(); startChange(-step); }}
                                onTouchEnd={stopChange}
                                className="w-16 h-16 rounded-2xl bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black hover:bg-slate-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all touch-none"
                            >
                                <Minus size={28} strokeWidth={4} />
                            </button>

                            <div className="flex flex-col items-center min-w-[140px]">
                                <div className="relative">
                                    <span className="text-8xl font-black tracking-tighter tabular-nums text-black leading-none">
                                        {quantity}
                                    </span>
                                    <span className="absolute -right-8 bottom-2 text-xl font-black text-black/20 uppercase">{unitLabel}</span>
                                </div>
                            </div>

                            <button 
                                onMouseDown={() => startChange(step)}
                                onMouseUp={stopChange}
                                onMouseLeave={stopChange}
                                onTouchStart={(e) => { e.preventDefault(); startChange(step); }}
                                onTouchEnd={stopChange}
                                className="w-16 h-16 rounded-2xl bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black hover:bg-slate-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all touch-none"
                            >
                                <Plus size={28} strokeWidth={4} />
                            </button>
                        </div>

                        {/* SLIDER - Più spesso e bold */}
                        <div className="w-full px-4 relative group">
                            <div className="h-4 bg-white border-[3px] border-black rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-[#81D4FA] border-r-[3px] border-black transition-all duration-100 ease-out" 
                                    style={{ width: `${percentage}%` }} 
                                />
                            </div>
                            <input
                                type="range"
                                min={minVal}
                                max={maxVal}
                                step={step}
                                value={quantity}
                                aria-label={`Seleziona la quantita in ${unitLabel}`}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="absolute -top-1 inset-x-0 w-full h-6 opacity-0 cursor-pointer z-30" 
                            />
                        </div>
                    </div>
                </div>

                {/* 3. ZONA OUTPUT TOTALE - Ultra High Contrast */}
                <div className="bg-black text-white p-10 relative border-y-[3px] border-black">
                    <div className="flex flex-col items-center relative z-10">
                        <span className="text-[10px] font-black text-[#81D4FA] uppercase tracking-[0.2em] mb-4">
                            Investimento Stimato
                        </span>
                        <div className="flex items-center justify-center leading-none mb-6">
                            <span className="text-4xl font-black text-white/20 mr-3">€</span>
                            <span className="text-8xl font-[900] tracking-tighter tabular-nums">
                                {totalCost.toLocaleString()}
                            </span>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 flex items-center gap-2">
                                <Timer size={14} className="text-[#81D4FA]" />
                                <span className="text-[11px] font-black uppercase">{estimatedDays} GIORNI</span>
                            </div>
                            <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 flex items-center gap-2">
                                <Package size={14} className="text-[#81D4FA]" />
                                <span className="text-[11px] font-black uppercase">CHIAVI IN MANO</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. SEZIONE EXTRA + CTA DOPPIA */}
                <div className="bg-white p-10 pt-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[2px] flex-grow bg-black/10" />
                        <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] whitespace-nowrap">
                            Step 2: Personalizza
                        </span>
                        <div className="h-[2px] flex-grow bg-black/10" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-12">
                        {availableExtras.map((opt) => {
                            const isSelected = selectedExtras.includes(opt.id);
                            const displayCost = opt.type === 'fixed' ? opt.price : opt.price * quantity;
                            
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => toggleExtra(opt.id)}
                                    className={`
                                        flex flex-col gap-3 p-4 rounded-2xl border-[3px] text-left transition-all duration-200 active:scale-95
                                        ${isSelected 
                                            ? 'bg-[#81D4FA] border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                                            : 'bg-white border-slate-100 text-slate-400 hover:border-black hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start w-full">
                                        {isSelected ? <Check size={18} strokeWidth={4} /> : <opt.icon size={18} strokeWidth={2.5} />}
                                        <span className={`text-[10px] font-black ${isSelected ? 'text-black' : 'text-slate-400'}`}>+€{displayCost}</span>
                                    </div>
                                    <span className="text-[11px] font-black uppercase leading-tight">{opt.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* --- DOPPIA CTA STILE HERO BRUTALISTA --- */}
                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={() => handleWhatsAppClick('write')}
                            className="
                                group relative w-full inline-flex items-center justify-center gap-4
                                bg-[#25D366] border-[3px] border-black 
                                px-6 py-5 rounded-[20px]
                                text-black font-black uppercase tracking-tighter
                                transition-all duration-200
                                shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                                hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:translate-x-1 hover:translate-y-1
                                active:translate-x-2 active:translate-y-2 active:shadow-none
                            "
                        >
                            <MessageCircle size={28} strokeWidth={3} />
                            <div className="flex flex-col items-start leading-none text-left">
                                <span className="text-[10px] text-black/60 font-black mb-1 tracking-widest uppercase">Chat Rapida</span>
                                <span className="text-2xl font-[900] italic">PRENOTA ORA</span>
                            </div>
                        </button>

                        <button 
                            onClick={() => handleWhatsAppClick('save')}
                            className="
                                group relative w-full inline-flex items-center justify-center gap-3
                                bg-white border-[3px] border-black 
                                px-6 py-4 rounded-[20px]
                                text-black font-black uppercase tracking-tighter
                                transition-all duration-200
                                hover:bg-slate-50 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                                hover:translate-x-1 hover:translate-y-1
                            "
                        >
                            <LucideSave size={20} strokeWidth={3} />
                            <span className="text-base italic">Salva Preventivo</span>
                        </button>
                        
                        <div className="flex items-center justify-center gap-2 mt-2 opacity-40">
                            <span className="w-1 h-1 rounded-full bg-black/60" />
                            <p className="text-[9px] text-black font-black uppercase tracking-widest">Nessun impegno • Solo trasparenza</p>
                            <span className="w-1 h-1 rounded-full bg-black/60" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ServiceScientificCalc;