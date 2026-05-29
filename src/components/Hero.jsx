import { COMPANY_NAME } from '../utils/constants';
import rovereMielato from '../assets/images/parquet/rovereMielato.webp';
import povSpinaIta from '../assets/images/primaDopoLavori/povSpinaIta.webp';
import HeroStats from './HeroStats';
import { Star } from 'lucide-react';

function Hero() {
    return (
        <section className="relative bg-white overflow-hidden">
            {/* Background Sfumato molto sottile */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/60 blur-3xl"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-50/60 blur-3xl"></div>
            </div>

            <div className="container bg-white mx-auto px-4 pb-6 pt-1 md:py-20 lg:py-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* --- COLONNA SINISTRA --- */}
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start">

                        {/* --- SOCIAL PROOF --- */}
                        <div className="flex flex-col items-center gap-2 mt-6 mb-6">
                            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/70 border border-[#E5E5E5] rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-300 cursor-default">

                                {/* 5 Stelle Lucenti con Glow */}
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className="fill-[#fbbf24] text-[#fbbf24] filter drop-shadow-[0_0_3px_rgba(251,191,36,0.6)]"
                                            strokeWidth={0}
                                        />
                                    ))}
                                </div>



                                {/* Rating + Logo Google */}
                                <div className="flex items-center gap-2">


                                    {/* Logo Google SVG Originale */}
                                    <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>

                                    {/* Separatore */}
                                    <div className="h-3 w-px bg-gray-200"></div>

                                    <div className="flex items-center gap-1.5 opacity-80">
                                        <span className="text-[11px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100 font-medium uppercase tracking-[-0.07em]">
                                            Posatori Parquet - Milano e dintorni
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* H1 - Titolo principale minimalista */}
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-[900] leading-none tracking-[-0.06em] text-slate-900 text-center">
                            Posa parquet a <span className="text-green-500">Milano</span> in <span className="text-green-500">1-2 giorni</span>
                        </h1>

                        {/* --- IMMAGINE HERO CON BENEFITS SOPRA --- */}
                        <div className="w-full mt-8 max-w-md mx-auto">
                            {/* Immagine Hero con benefits sopra */}
                            <div className="relative">
                                {/* Benefits overlay sopra l'immagine */}
                                <div className="absolute top-4 left-0 right-0 z-10 flex flex-wrap justify-center gap-2 px-4">
                                    {[
                                        { icon: '✓', text: 'Non paghi nessun acconto prima della posa' },
                                        { icon: '✓', text: 'Prezzi chiari' },
                                        { icon: '✓', text: 'Preventivo e Sopralluogo Gratuiti' }
                                    ].map((item, i) => (
                                        <div key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/30 backdrop-blur-xs border border-green-400 rounded-full text-[11px]">
                                            <span className="text-white font-bold">{item.icon}</span>
                                            <span className="text-white font-semibold">{item.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Immagine */}
                                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-64">
                                    <img src={povSpinaIta} alt="Posa parquet Spina Italiana Milano" className="w-full h-full object-cover object-center" loading="eager" />
                                </div>
                            </div>

                            {/* HERO STATS - sotto immagine */}
                            <div className="w-full my-6">
                                <HeroStats />
                            </div>

                            {/* Mini listino prezzi - Apple Premium Style con guide visive e badge */}
                            <div className="mt-8">
                                {/* Intestazione Apple Style con gerarchia */}
                                <div className="mb-6">
                                    <p className="text-[12px] font-medium text-slate-400 uppercase tracking-[0.15em] mb-1">Listino prezzi</p>
                                    <p className="text-[13px] font-semibold text-slate-600">{new Date().toLocaleString('it-IT', { month: 'long', year: 'numeric' })}</p>
                                </div>

                                {/* Lista opzioni - Uniforme */}
                                <div className="space-y-3">
                                    {[
                                        { label: 'Posa SPC (vinilico a click)', price: '€20', sub: '/mq', badge: { text: 'Popolare', color: 'bg-green-100 text-green-600' } },
                                        { label: 'Posa SPC a spina', price: '€27', sub: '/mq' },
                                        { label: 'Posa laminato', price: '€20', sub: '/mq' },
                                        { label: 'Posa parquet prefinito', price: '€27', sub: '/mq' , badge: { text: 'Il più amato', color: 'bg-yellow-100 text-yellow-700' }  },
                                        { label: 'Posa prefinito a spina', price: '€32', sub: '/mq', badge: { text: 'TOP', color: 'bg-purple-100 text-purple-700' } },
                                        { label: 'Posa zoccolino', price: '€10', sub: '/ml' },
                                    ].map(({ label, price, oldPrice, sub, badge }) => (
                                        <div key={label} className="flex items-center justify-between gap-3 px-1 py-3 rounded-lg hover:bg-slate-50/50 transition-colors duration-200">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-[15px] text-slate-700 font-semibold">{label}</span>
                                                {badge && (
                                                    <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${badge.color}`}>
                                                        {badge.text}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 border-b border-dashed border-slate-200/80"></div>
                                            <div className="flex items-baseline gap-2">
                                                {oldPrice && <span className="text-[14px] line-through text-red-300 font-medium">{oldPrice}</span>}
                                                <span className="text-[16px] font-bold text-slate-900">{price}</span>
                                                <span className="text-[12px] text-slate-400">{sub}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Footer minimalista */}
                                <p className="text-[10px] text-slate-400 text-center mt-4 pt-3 border-t border-slate-100">Manodopera · IVA inclusa · Sopralluogo gratuito</p>
                            </div>
                        </div>

                    </div>

                    {/* --- COLONNA DESTRA (Immagine Desktop Only) --- */}
                    <div className="hidden lg:block relative">
                        {/* Pattern decorativo */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 opacity-20"
                            style={{ backgroundImage: 'radial-gradient(#2563eb 2px, transparent 2px)', backgroundSize: '24px 24px' }}>
                        </div>

                        <div className="relative z-10 group">
                            {/* Immagine */}
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white transform transition-transform duration-700 group-hover:scale-[1.01]">
                                    <img
                                    src={rovereMielato}
                                    alt={`Posa parquet ${COMPANY_NAME}`}
                                    className="w-full h-auto object-cover max-h-[600px]"
                                    loading="eager"
                                />

                                {/* Label flottante */}
                                <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 bg-white p-3 md:p-5 rounded-3xl shadow-2xl border border-gray-100 animate-bounce-slow">
                                    <p className="text-sm font-bold text-gray-900">Posa parquet in 24h</p>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Garanzia Pro Casa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;