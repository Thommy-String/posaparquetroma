import React from 'react';
import { PRIMARY_CITY, PHONE_NUMBER } from '../utils/constants';
import { pricingData } from '../utils/pricingData';
import { Star, CheckCircle, Armchair, Hammer, Layers as Layers2, Paintbrush, Sofa, Puzzle, Footprints } from 'lucide-react';

// Mappa icone usate nei servizi (evita import * da lucide-react)
const ICON_MAP = {
  Armchair, Hammer, Layers2, Paintbrush, Sofa, Puzzle, Footprints, CheckCircle,
  DropletOff: CheckCircle, Gavel: Hammer, PaintBucket: Paintbrush, Slice: CheckCircle,
};

function ServiceHero({ service }) {
    if (!service) return null;

    const priceInfo = pricingData.find(p => p.id === service.pricingId) || {};
    const displayPrice = service.priceDisplay || priceInfo.price;

    return (
        <section className="w-full pt-8 pb-12 bg-[#fbfbfa] text-[#1a1a1a] font-sans">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* --- SUPER-HEADER: BREADCRUMB / CATEGORY --- */}
                <div className="flex justify-center mb-6">
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-blue-100">
                        Servizio Specializzato • {PRIMARY_CITY}
                    </span>
                </div>

                {/* --- HERO TITLE & SUBTITLE --- */}
                <div className="text-center mb-10 max-w-4xl mx-auto">
                    <h1 className="text-[34px] md:text-[60px] font-[900] uppercase leading-none tracking-tighter text-slate-900 mb-6">
                        {service.hero.h1}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
                        {service.hero.subtitle}
                    </p>
                </div>

                {/* --- VISUAL CORE: IMAGE/VIDEO & PRICE BADGE --- */}
                <div className="relative w-full mb-12">
                    <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-white">
                        {service.imageSrc ? (
                            <img
                                src={service.imageSrc}
                                alt={service.pageTitle || 'Servizio parquet roma'}
                                className="w-full h-[280px] md:h-[480px] object-cover"
                            />
                        ) : (
                            <video
                                src={service.videoSrc || "https://www.w3schools.com/howto/rain.mp4"}
                                autoPlay muted loop playsInline
                                className="w-full h-[280px] md:h-[480px] object-cover"
                            />
                        )}
                    </div>

                    {/* Badge Prezzo Integrato con la Visual */}
                    <div className="absolute -bottom-6 right-6 md:right-12 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex flex-col items-center min-w-[120px]">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">da soli</span>
                        <div className="flex items-start">
                            <span className="text-lg font-bold text-slate-900 mt-1">€</span>
                            <span className="text-4xl font-black text-slate-900 leading-none">{displayPrice}</span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase mt-1">al mq</span>
                    </div>
                </div>

                {/* --- VALIDATION BAR --- */}
                <div className="flex flex-wrap justify-center items-center gap-6 mb-12 pb-8 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-slate-700">4.9/5 Rating Google</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500" />
                        <span className="text-xs font-bold text-slate-600 tracking-tight">Posa Certificata</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200 hidden md:block"></div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <Footprints size={16} />
                        <span className="text-xs font-bold tracking-tight">Sopralluogo Gratuito</span>
                    </div>
                </div>

                {/* --- CTA BUTTONS --- */}
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full mb-12">
                    
                    {/* --- BOTTONE CHIAMA ORA --- */}
                    <div className="flex flex-col items-center max-w-xs">
                        <div className="w-full relative">
                            <div className="absolute inset-0 bg-white/40 blur-3xl scale-150 -z-10 rounded-full"></div>

                            <a
                                href={`tel:${PHONE_NUMBER}`}
                                onClick={(e) => {
                                    if (typeof window.gtag !== 'undefined') {
                                        window.gtag('event', 'conversion', {
                                            'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYY',
                                        });
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
                                    <span className="text-[10px] text-blue-600 font-bold mb-1 tracking-widest uppercase">{PHONE_NUMBER}</span>
                                    <span className="text-xl md:text-2xl italic">Chiama ora</span>
                                </div>
                            </a>
                        </div>

                        <div className="w-full mt-3 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/>
                                </svg>
                                <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Nessun obbligo</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/>
                                </svg>
                                <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Preventivo gratuito</span>
                            </div>
                        </div>
                    </div>

                    {/* --- BOTTONE SCRIVICI ORA --- */}
                    <div className="flex flex-col items-center max-w-xs">
                        <div className="w-full relative">
                            <div className="absolute inset-0 bg-white/40 blur-3xl scale-150 -z-10 rounded-full"></div>

                            <a
                                href={`https://wa.me/${PHONE_NUMBER.replace(/[^0-9]/g, '')}?text=Ciao%20Posa%20Parquet%20roma%2C%20sono%20interessato%20a%20una%20consulenza%20gratuita`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => {
                                    if (typeof window.gtag !== 'undefined') {
                                        window.gtag('event', 'conversion', {
                                            'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYY',
                                        });
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
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/>
                                </svg>
                                <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Risposta immediata</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#A5D6A7" strokeWidth="0"/>
                                </svg>
                                <span className="text-[11px] md:text-[12px] text-slate-600 font-semibold">Senza impegno</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- KEY FEATURES (GRID) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.features?.slice(0, 3).map((feat, index) => {
                        const IconComponent = ICON_MAP[feat.icon] || CheckCircle;

                        return (
                            <div key={index} className="flex flex-col items-center flex-1 px-1 group">
                                {/* Icona Mini */}
                                <div className="mb-2 p-1.5 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                    <IconComponent
                                        size={16}
                                        className={`${feat.color || "text-blue-500"} opacity-70`}
                                        strokeWidth={2}
                                    />
                                </div>

                                {/* Testo in linea e compresso */}
                                <div className="text-center">
                                    <h3 className="text-[11px] md:text-[12px] font-black uppercase tracking-tighter text-slate-900 leading-none">
                                        {feat.tag}
                                    </h3>
                                    <p className="hidden sm:block text-[10px] text-slate-400 font-medium mt-1 leading-tight tracking-tight">
                                        {feat.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ServiceHero;