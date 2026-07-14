// import HeroStats from './HeroStats';

const StarIcon = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" width="12" height="12" className={className} aria-hidden="true">
        <path fill="currentColor" d="m12 2 2.84 6.08 6.66.8-4.92 4.55 1.3 6.57L12 16.72 6.12 20l1.3-6.57L2.5 8.88l6.66-.8L12 2z" />
    </svg>
);

function Hero() {
    return (
        <section className="relative bg-white overflow-hidden">
            {/* Background Sfumato molto sottile */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/60 blur-3xl"></div>
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-50/60 blur-3xl"></div>
            </div>

            <div className="container bg-white mx-auto px-4 pb-6 pt-1 md:py-20 lg:py-24 relative z-10">
                <div className="grid grid-cols-1 items-center justify-items-center">

                    {/* --- COLONNA SINISTRA --- */}
                    <div className="text-center lg:text-left flex flex-col items-center lg:items-start">

                        {/* --- SOCIAL PROOF --- */}
                        <div className="mt-6 mb-6 flex w-full justify-center">
                            <div className="inline-flex items-center gap-2.5 px-2.5 py-2 bg-white border border-slate-200 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200">
                                    <svg width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0" aria-hidden="true">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    <span className="text-[13px] font-semibold text-slate-900 leading-none">4.9</span>
                                    <div className="flex gap-0.5" aria-hidden="true">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                className="text-amber-400"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <a
                                    href="https://www.google.com/maps/place/roma+Posa+Parquet+-+Prefinito+-+SPC+-+LVT+-+Laminato+-+Battiscopa/@45.4627338,9.1777323,12z/data=!4m8!3m7!1s0xa2a634fdc139260b:0x65ffd94880ff1f1b!8m2!3d45.4627338!4d9.1777322!9m1!1b1!16s%2Fg%2F11mm8ht18k!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYxMy4wIKXMDSoASAFQAw%3D%3D"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-[12px] font-medium text-blue-700 underline decoration-slate-500 underline-offset-3 hover:text-emerald-700 hover:decoration-emerald-700 transition-colors"
                                    aria-label="Leggi le Recensioni dei Clienti"
                                >
                                    <span>leggi le recensioni {'>'}</span>
                                </a>
                            </div>

                        </div>


                        {/* H1 - Titolo principale minimalista */}
                        <div className="text-center my-4">
                            <h1 className="text-3xl md:text-3xl lg:text-4xl font-[800] leading-none tracking-[-0.06em] text-slate-900 whitespace-nowrap">
                                Servizio Posa Parquet a <span className="text-green-700">Roma</span>
                            </h1>
                            <p className="mt-3 text-[16px] md:text-[17px]  font-semibold leading-tight text-slate-700 max-w-120 ">
                                Posiamo il tuo nuovo parquet in 1-2 giorni a prezzi fissi, senza acconti prima della posa. </p>
                        </div>

                        {/* --- IMMAGINE HERO CON BENEFITS SOPRA --- */}
                        <div className="w-full mt-8 max-w-md mx-auto">
                            {/* Immagine Hero con benefits sopra */}
                            <div className="relative">
                                {/* Benefits overlay sopra l'immagine */}
                                <div className="absolute top-4 left-0 right-0 z-10 flex flex-wrap justify-center gap-2 px-4">
                                    {[
                                        { icon: '✓', text: 'Nessun acconto prima della posa' },
                                        { icon: '✓', text: 'Prezzi chiari e fissi' },
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
                                    <img
                                        src="/hero-lcp.webp"
                                        alt="Posa parquet Spina Italiana roma"
                                        className="w-full h-full object-cover object-center"
                                        loading="eager"
                                        fetchPriority="high"
                                        decoding="async"
                                        width="768"
                                        height="512"
                                    />
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