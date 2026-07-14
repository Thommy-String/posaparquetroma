import React, { useEffect, useRef, useState } from 'react';
import { Ruler, Timer, CheckCircle2 } from 'lucide-react';

// --- IMPORT IMMAGINI REALI ---
import rovereIta from '../assets/images/parquet/rovereIta.webp';
import roverePrima from '../assets/images/primaDopoLavori/prima2.webp';
import rovereDopo from '../assets/images/primaDopoLavori/dopo2.webp';
import roverePrima3 from '../assets/images/primaDopoLavori/prima3.webp';
import rovereDopo3 from '../assets/images/primaDopoLavori/dopo3.webp';
import rovereNaturaleDritto from '../assets/images/parquet/rovereNaturale.webp';
import rovereNoce from '../assets/images/primaDopoLavori/prefinitoNoce.webp';
import rovereNaturale from '../assets/images/primaDopoLavori/rovereNaturaleDritto.webp';
import rovereChiaro from '../assets/images/primaDopoLavori/rovereChiaro.webp';
import prefinitoDrittoRovere from '../assets/images/primaDopoLavori/prefinitoDrittoRovere.webp';
import rovereFlottante from '../assets/images/primaDopoLavori/rovereFlottante.webp';
import prefinitoFlottanteLargo from '../assets/images/primaDopoLavori/prefinitoFlottanteLargo.webp';
import rovereSpinaItaMobili from '../assets/images/primaDopoLavori/rovereSpinaItaMobili.webp';
import posaSpinaUngherese from '../assets/images/primaDopoLavori/posaSpinaUngherese.webp';
import spcSpinaPrima5 from '../assets/images/primaDopoLavori/prima5.webp';
import spcSpinaDopo5 from '../assets/images/primaDopoLavori/dopo5.webp';
import montaggioSPCRovere from '../assets/images/primaDopoLavori/montaggioSPCRovere.webp';
import BeaDopo from '../assets/images/primaDopoLavori/BeaDopo.webp';
import BeaPrima from '../assets/images/primaDopoLavori/BeaPrima.webp';
import spinaFrancese from '../assets/images/parquet/spinaFraRovereNaturale.webp';
import laminatoGrigio from '../assets/images/primaDopoLavori/laminatoGrigio.webp';
import laminatoNoce from '../assets/images/primaDopoLavori/laminatoNoce.webp';
import laminatoRovereChiaro from '../assets/images/primaDopoLavori/laminatoRovereChiaro.webp';

// --- DATI REALI (IMPORTATI DAL TUO FILE) ---
const rawWorks = [
    { id: 2, category: 'prefinito-flottante', title: 'Prefinito Flottante', location: 'Navigli', sqm: 91, price: 2002, time: '3gg', imageAfter: rovereDopo, review: { text: "Tempi rispettati.", avatar: "https://i.pravatar.cc/150?u=25" } },
    { id: 3, category: 'prefinito', title: 'Prefinito Dritto', location: 'P.ta Nuova', sqm: 44, price: 1628, time: '9h', imageAfter: rovereNaturaleDritto, review: { text: "Consiglio...", avatar: "https://i.pravatar.cc/150?u=19" } },
    { id: 19, category: 'spc', title: 'SPC Cucina', location: 'Sesto S.G.', sqm: 10, price: 430, time: '5h', imageAfter: BeaDopo, review: { text: "Precisione top...", avatar: "https://ui-avatars.com/api/?name=B&background=0D8ABC&color=fff" } },
    { id: 1, category: 'spc', title: 'SPC Spina 90°', location: 'Prov. MILANO', sqm: 71, price: 1562, time: '2gg', imageAfter: spcSpinaDopo5, review: { text: "Parquet stupendo!", avatar: "https://i.pravatar.cc/150?u=13" } },
    { id: 10, category: 'spc', title: 'SPC Click', location: 'roma Sud', sqm: 57, price: 1255, time: '3gg', imageAfter: montaggioSPCRovere, review: { text: "Puntuali e precisi...", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=g" } },
    { id: 4, category: 'spc', title: 'SPC Affitto', location: 'Studi MILANO', sqm: 74, price: 1410, time: '3gg', imageAfter: rovereDopo3, review: { text: "Regola d'arte...", avatar: "https://i.pravatar.cc/150?u=21" } },
    { id: 5, category: 'prefinito-spina', title: 'Spina Italiana', location: 'Calvairate', sqm: 65, price: 2405, time: '2gg', imageAfter: rovereIta, review: { text: "Eccellente...", avatar: "https://i.pravatar.cc/150?u=41" } },
    { id: 6, category: 'prefinito-spina', title: 'Spina Francese', location: 'Cerro Magg.', sqm: 53, price: 1855, time: '2gg', imageAfter: spinaFrancese, review: { text: "Esperienza positiva.", avatar: "https://i.pravatar.cc/150?u=46" } },
    { id: 7, category: 'laminato', title: 'Laminato Grigio', location: 'Hinterland', sqm: 87, price: 1405, time: '2gg', imageAfter: laminatoGrigio, review: { text: "Bravo Andrea il parquettista.", avatar: "https://i.pravatar.cc/150?u=500" } },
    { id: 8, category: 'laminato', title: 'Laminato Noce', location: 'roma Centro', sqm: 46, price: 700, time: '8h', imageAfter: laminatoNoce, review: { text: "5 stelle.", avatar: "https://ui-avatars.com/api/?name=M&background=0D8ABC&color=fff" } },
    { id: 9, category: 'laminato', title: 'Rovere Chiaro', location: 'roma', sqm: 51, price: 1250, time: '8h', imageAfter: laminatoRovereChiaro, review: { text: "Risultato finale top.", avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Mario" } },
    { id: 11, category: 'prefinito', title: 'Rovere 19cm', location: 'Lodi', sqm: 66, price: 1750, time: '3gg', imageAfter: rovereNaturale, review: { text: "Ottimo lavoro.", avatar: "https://ui-avatars.com/api/?name=GP&background=0D8ABC&color=fff" } },
    { id: 12, category: 'prefinito', title: 'Noce Scuro', location: 'Prov. MILANO', sqm: 110, price: 2820, time: '4gg', imageAfter: rovereNoce, review: { text: "Prezzi chiari.", avatar: "https://ui-avatars.com/api/?name=AF&background=0D8ABC&color=fff" } },
    { id: 13, category: 'prefinito', title: 'Rovere Chiaro', location: 'Prov. MILANO', sqm: 38, price: 1786, time: '3gg', imageAfter: rovereChiaro, review: { text: "Fatto la cosa giusta.", avatar: "https://i.pravatar.cc/150?u=20" } },
    { id: 14, category: 'prefinito', title: 'Rovere Select', location: 'Bergamo', sqm: 79, price: 3250, time: '4gg', imageAfter: prefinitoDrittoRovere, review: { text: "Impeccabile...", avatar: "https://ui-avatars.com/api/?name=A&background=0D8ABC&color=fff" } },
    { id: 16, category: 'prefinito-flottante', title: 'Plancia Larga', location: 'Legnano', sqm: 120, price: 2650, time: '4gg', imageAfter: prefinitoFlottanteLargo, review: { text: "Velocissimi...", avatar: "https://ui-avatars.com/api/?name=MD&background=0D8ABC&color=fff" } },
];

// --- LOGICA AUTOMATICA PER LE DIMENSIONI ---
// Assegna ciclicamente 'tall' (alto) e 'small' (basso) per creare il mosaico
// Pattern: Tall, Small, Small, Tall... (si incastra bene nella griglia 2 righe)
const works = rawWorks.map((work, index) => ({
    ...work,
    size: index % 3 === 0 ? 'tall' : 'small' 
}));

// Funzione per filtrare e riassegnare le dimensioni in base alla categoria
const getFilteredWorks = (category) => {
    if (!category) return works;
    let filtered;
    // Per 'prefinito' base, includi anche flottante e spina (come fa RecentWorks)
    if (category === 'prefinito') {
        filtered = rawWorks.filter(w => w.category.startsWith('prefinito'));
    } else {
        filtered = rawWorks.filter(w => w.category === category);
    }
    // Se meno di 3 lavori, mostra tutti (fallback)
    if (filtered.length < 3) return works;
    return filtered.map((work, index) => ({
        ...work,
        size: index % 3 === 0 ? 'tall' : 'small'
    }));
};

const PinterestCard = ({ work }) => {
    // Calcolo altezza rigida in pixel per evitare errori di Tailwind
    const isTall = work.size === 'tall';
    const heightStyle = { height: isTall ? '300px' : '145px' };
    const spanClass = isTall ? 'row-span-2' : 'row-span-1';

    return (
        <div 
            className={`relative w-[220px] ${spanClass} flex-shrink-0 rounded-xl overflow-hidden group border border-gray-200 shadow-sm bg-gray-200 select-none`}
            style={heightStyle} 
        >
            {/* FOTO */}
            <img 
                src={work.imageAfter} 
                alt={work.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                draggable="false"
            />
            {/* Gradiente Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

            {/* BADGE Location */}
            <div className="absolute top-2 left-2">
                <span className="bg-gray-600/20 backdrop-blur-xl px-1.5 py-0.5 rounded text-[8px] font-bold text-white border border-white/10 uppercase tracking-wide">
                    {work.location}
                </span>
            </div>

            {/* INFO Bottom */}
            <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col justify-end">
                <div className="flex justify-between items-end mb-1">
                    <h4 className="text-[11px] font-bold text-white uppercase leading-none drop-shadow-md truncate pr-1">{work.title}</h4>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-[20px] font-black text-emerald-400 leading-none shadow-black drop-shadow-md">€{work.price}</span>
                    <span className="text-[9px] text-white/70 font-medium">il montaggio</span>
                </div>

                <div className="flex gap-2 border-t border-white/20 pt-2">
                    <div className="flex items-center gap-1">
                        <Ruler size={11} className="text-green-300" />
                        <span className="text-[12px] font-bold text-white">{work.sqm}mq</span>
                    </div>
                    <div className="w-px h-2.5 bg-white/30"></div>
                    <div className="flex items-center gap-1">
                        <Timer size={11} className="text-amber-300" />
                        <span className="text-[12px] font-bold text-white">{work.time}</span>
                    </div>
                </div>
                
                {/* Review solo sui box alti */}
                {isTall && (
                    <div className="mt-2 flex items-center gap-1.5 opacity-80 bg-black/20 p-1 rounded backdrop-blur-sm">
                         <img src={work.review.avatar} className="w-4 h-4 rounded-full border border-white/50" alt="" />
                         <span className="text-[9px] text-white italic truncate">"{work.review.text}"</span>
                    </div>
                )}
            </div>
        </div>
    );
};

function CompactSocialProof({ category }) {
    // Filtra per categoria se specificata, altrimenti mostra tutti
    const filteredWorks = getFilteredWorks(category);
    // Duplichiamo 4 volte per garantire loop infinito fluido su schermi larghi
    const items = [...filteredWorks, ...filteredWorks, ...filteredWorks, ...filteredWorks];
    
    // Refs per manipolazione diretta del DOM e stato
    const scrollContainerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    
    // Stato mutabile per l'animazione (evita re-render)
    const state = useRef({
        pos: 0,
        isDragging: false,
        startX: 0,
        startPos: 0,
        velocity: 0,
        lastTime: 0,
        animationFrameId: null,
        resumeTimeout: null
    });

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const animate = (time) => {
            if (!state.current.lastTime) state.current.lastTime = time;
            const delta = time - state.current.lastTime;
            state.current.lastTime = time;

            // Logica di scrolling
            if (!state.current.isDragging && !isPaused) {
                // Velocità costante auto-scroll (regola il 0.5 per velocità)
                state.current.pos += 0.5; 
            }

            // Infinite Loop Logic
            // Assumiamo che il contenuto totale sia diviso in 4 parti (items = works x 4)
            // Il reset avviene quando abbiamo scorso 1/4 del contenuto totale (un set completo)
            // container.scrollWidth è la larghezza totale.
            const singleSetWidth = container.scrollWidth / 4;
            
            // Se singleSetWidth è 0 (non ancora renderizzato), salta
            if (singleSetWidth > 0) {
                if (state.current.pos >= singleSetWidth) {
                    state.current.pos -= singleSetWidth;
                } else if (state.current.pos < 0) {
                    state.current.pos += singleSetWidth;
                }
            }

            // Applica trasformazione
            container.style.transform = `translate3d(-${state.current.pos}px, 0, 0)`;

            state.current.animationFrameId = requestAnimationFrame(animate);
        };

        state.current.animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (state.current.animationFrameId) {
                cancelAnimationFrame(state.current.animationFrameId);
            }
            if (state.current.resumeTimeout) {
                clearTimeout(state.current.resumeTimeout);
            }
        };
    }, [isPaused, items]); // Dipendenze minime

    // --- EVENTI TOUCH (MOBILE) ---
    const handleTouchStart = (e) => {
        state.current.isDragging = true;
        state.current.startX = e.touches[0].clientX;
        state.current.startPos = state.current.pos;
        setIsPaused(true);
        if (state.current.resumeTimeout) clearTimeout(state.current.resumeTimeout);
    };

    const handleTouchMove = (e) => {
        if (!state.current.isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = state.current.startX - currentX;
        // Aggiorna posizione
        state.current.pos = state.current.startPos + diff;
    };

    const handleTouchEnd = () => {
        state.current.isDragging = false;
        // Riprendi dopo 4 secondi
        state.current.resumeTimeout = setTimeout(() => {
            setIsPaused(false);
        }, 4000);
    };

    // --- EVENTI MOUSE (DESKTOP) ---
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);


    return (
        <section className="py-8 bg-white border-t border-gray-100 overflow-hidden" style={{ minHeight: '360px' }}>
            <div 
                className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing" 
                style={{ height: '310px' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                
                {/* TRACKER ANIMATO (JS Controlled) */}
                <div 
                    ref={scrollContainerRef}
                    className="flex h-full w-max will-change-transform" // Rimosso animate-pinterest-scroll
                >
                    <div className="grid grid-rows-2 grid-flow-col gap-3 h-full px-4">
                        {items.map((work, index) => (
                            <PinterestCard key={`${work.id}-${index}`} work={work} />
                        ))}
                    </div>
                </div>

                {/* Sfumature */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FBFBFA] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#FBFBFA] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    );
}

export default CompactSocialProof;