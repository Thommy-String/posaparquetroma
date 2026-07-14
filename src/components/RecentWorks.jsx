import React, { useState, useMemo } from 'react';
import { Star } from 'lucide-react';
import { works } from '../utils/worksData';


const formatPrice = (p) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(p);

const filterCategories = {
    'all': 'Tutti',
    'prefinito': 'Prefinito',
    'prefinito-flottante': 'Flottante',
    'prefinito-spina': 'Spina',
    'spc': 'SPC',
    'laminato': 'Laminato'
};

// --- COMPONENTE CARD (Neo-Brutalist — layout verticale, prima+dopo affiancate) ---
const MinimalCard = ({ work }) => {
    const hasBeforeImage = Boolean(work.imageBefore && work.imageBefore.trim() !== '');

    return (
        <div className="w-full bg-white border-[3px] border-black rounded-[24px] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">

            {/* FOTO — prima e dopo affiancate, o solo una se manca l'altra */}
            <div className={`grid ${hasBeforeImage ? 'grid-cols-2' : 'grid-cols-1'} border-b-[3px] border-black`}>
                {hasBeforeImage && (
                    <div className="relative h-[230px] md:h-[280px] overflow-hidden border-r-[3px] border-black">
                        <img src={work.imageBefore} alt="Prima" loading="lazy" className="w-full h-full object-cover grayscale-[20%] brightness-90" />
                        {/* Location badge — sulla foto Prima */}
                        <span className="absolute top-3 left-3 bg-white border-2 border-black text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            📍 {work.location}
                        </span>
                        <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Prima</span>
                    </div>
                )}
                <div className="relative h-[230px] md:h-[280px] overflow-hidden">
                    <img src={work.imageAfter} alt="Dopo" loading="lazy" className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Dopo</span>
                    {/* Location badge solo se non c'è il "prima" */}
                    {!hasBeforeImage && (
                        <span className="absolute top-3 left-3 bg-white border-2 border-black text-[9px] font-black uppercase tracking-wide px-2 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            📍 {work.location}
                        </span>
                    )}
                </div>
            </div>

            {/* STATS BAR */}
            <div className="grid grid-cols-3 border-b-[3px] border-black">
                <div className="flex flex-col items-center justify-center py-3 border-r-[3px] border-black bg-[#FFD180]">
                    <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider mb-0.5">Superficie</span>
                    <span className="text-[17px] font-[900] text-black leading-none">{work.sqm}<span className="text-[10px] font-bold text-amber-800 ml-0.5">mq</span></span>
                </div>
                <div className="flex flex-col items-center justify-center py-3 border-r-[3px] border-black bg-[#81D4FA]">
                    <span className="text-[9px] font-bold text-blue-900 uppercase tracking-wider mb-0.5">Tempo</span>
                    <span className="text-[17px] font-[900] text-black leading-none">{work.time}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-3 bg-[#A5D6A7]">
                    <span className="text-[9px] font-bold text-green-900 uppercase tracking-wider mb-0.5">Costo posa</span>
                    <span className="text-[17px] font-[900] text-black leading-none">{formatPrice(work.price)}</span>
                </div>
            </div>

            {/* SEZIONE LAVORAZIONE */}
            <div className="p-5 pb-4 flex flex-col gap-2 bg-white">
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-black inline-block"></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-black/70">Lavorazione</span>
                </div>
                <h3 className="text-base font-[900] text-black leading-tight uppercase tracking-tighter">{work.title}</h3>
                <p className="text-sm text-gray-600 font-medium leading-snug">{work.description}</p>
            </div>

            {/* SEZIONE RECENSIONE — sfondo differenziato */}
            <div className="mt-auto border-t-[3px] border-black bg-[#FFFDE7] p-5">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block"></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-yellow-900">Recensione cliente</span>
                </div>
                <p className="text-[13px] text-gray-800 font-medium italic leading-relaxed mb-4">
                    "{work.review.text}"
                </p>
                <div className="flex items-center justify-between bg-white/70 p-3 rounded-xl border-[2px] border-black/10">
                    <div className="flex items-center gap-3">
                        <div className="shrink-0 w-8 h-8 rounded-full border-2 border-black overflow-hidden bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <img src={work.review.avatar} alt="Client" loading="lazy" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black uppercase text-gray-600 leading-none mb-1">Verificata su</span>
                            <div className="flex items-center gap-1">
                                <svg className="w-3 h-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24.81-.6z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
                                </svg>
                                <span className="text-[10px] font-bold text-gray-700">Google</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-500" />
                            ))}
                        </div>
                        <span className="text-[9px] font-bold text-gray-700 mt-0.5">5/5 stelle</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPALE DINAMICO ---
function RecentWorks({ service, category, title, showFilter = false }) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredWorks = useMemo(() => {
        // Logica per la Home Page con i filtri
        if (showFilter) {
            const sortedWorks = [...works].sort((a, b) => b.id - a.id);
            if (activeCategory === 'all') {
                return sortedWorks;
            }
            if (activeCategory === 'prefinito') {
                 return sortedWorks.filter(w => w.category.startsWith('prefinito'));
            }
            return sortedWorks.filter(w => w.category === activeCategory);
        }

        // Logica esistente per le pagine servizio
        if (category) {
            return works.filter(w => w.category === category);
        }

        const type = service?.pricingId || "";
        if (type.includes('spc')) return works.filter(w => w.category === 'spc');
        if (type.includes('laminato')) return works.filter(w => w.category === 'laminato');
        if (type.includes('prefinito')) {
            if (type === 'prefinito') {
                return works.filter(w => w.category.startsWith('prefinito'));
            }
            return works.filter(w => w.category === type);
        }

        // Fallback di sicurezza (mantiene il vecchio comportamento se nessuna condizione è soddisfatta)
        return [...works].sort((a, b) => b.id - a.id).slice(0, 6);

    }, [service, category, showFilter, activeCategory]);

    const displayTitle = title || (service ? `I nostri lavori: ${service.navLabel}` : "Costi reali di lavori finiti.");

    if (filteredWorks.length === 0) return null;

    return (
        <section className="bg-[#f4f4f0] pt-12 pb-16 md:pt-20 md:pb-24 border-t-[3px] border-black">
            <div className="container mx-auto px-4 max-w-7xl">
                
                {/* Sezione Intestazione */}
                <div className="mb-10 text-center">
                    <div className="inline-block bg-black text-white px-4 py-1 uppercase font-black tracking-widest text-xs mb-6 transform -rotate-1 rounded-md">
                        a roma e dintorni
                    </div>
                    <h2 className="text-[36px] md:text-[56px] font-black uppercase tracking-tighter leading-[1.0] max-w-3xl mx-auto text-black">
                        NEL 2025 ABBIAMO POSATO PIÙ DI{' '}
                        <span className="relative inline-block">
                            <span className="relative z-10">2.597</span>
                            <span className="absolute inset-x-0 bottom-0 h-3 md:h-4 bg-[#FFF176] -z-0 -rotate-1 rounded-sm"></span>
                        </span>
                        {' '}PACCHI DI PARQUET{' '} <br />
                        <span className="text-black/70 text-[0.6em] tracking-tight">QUALSIASI MARCHIO E FORMATO.</span>
                    </h2>
                </div>

                {/* Filtri (Stile Brutalist Buttons) */}
                {showFilter && (
                    <div className="flex justify-center flex-wrap gap-3 mb-12">
                        {Object.entries(filterCategories).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`
                                    px-5 py-2 text-xs font-black uppercase tracking-widest rounded-xl border-[2.5px] border-black transition-all duration-200
                                    ${activeCategory === key
                                        ? 'bg-[#FFF176] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-105'
                                        : 'bg-white text-black hover:bg-gray-50 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredWorks.map((work) => <MinimalCard key={work.id} work={work} />)}
                </div>

                {/* Micro Rassicurazione Finale */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">
                        Prezzi reali per la posa in opera • aggiornato a {new Date().getFullYear()}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default RecentWorks;