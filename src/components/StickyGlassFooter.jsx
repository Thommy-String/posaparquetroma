import React, { useState, useEffect } from 'react';
import { PHONE_NUMBER } from '../utils/constants';
import { gtagReportConversion } from '../utils/analytics';

const hasCookieConsentChoice = () => document.cookie.indexOf('gdpr_consent=') !== -1;

const StickyGlassFooter = ({ 
    subtitle = "Nessun obbligo di acquisto.",
}) => {
    
    // Nascondi il footer finché il cookie banner è visibile
    const [cookieDismissed, setCookieDismissed] = useState(() => {
        return hasCookieConsentChoice();
    });

    useEffect(() => {
        const syncCookieState = () => setCookieDismissed(hasCookieConsentChoice());

        syncCookieState();
        window.addEventListener('gdpr-consent-changed', syncCookieState);

        return () => window.removeEventListener('gdpr-consent-changed', syncCookieState);
    }, []);

    // Rimuove spazi per il link api whatsapp
    const cleanPhone = PHONE_NUMBER ? PHONE_NUMBER.replace(/\s+/g, '') : "393342221212";

    const handleWhatsApp = () => {
        const message = "Ciao, vorrei un preventivo per posa parquet...";
        const encodedMessage = encodeURIComponent(message);
        gtagReportConversion({
            redirectUrl: `https://wa.me/${cleanPhone}?text=${encodedMessage}`,
        });
    };

    const handleCall = () => {
        gtagReportConversion({
            redirectUrl: `tel:${cleanPhone}`,
        });
    };

    return (
        // Non renderizzare il footer se il cookie banner è ancora visibile
        // Evita sovrapposizione e conflitto di touch/click su mobile
        !cookieDismissed ? null :
        <div className="fixed bottom-0 left-0 right-0 z-[999] flex justify-center w-full pb-3 pointer-events-none px-3">
            {/* Card Container - Due CTA side-by-side */}
            <div className="relative w-full max-w-[500px] pointer-events-auto transition-transform hover:scale-[1.01] duration-300">
                
                {/* Sfondo Vetro */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[20px] backdrop-saturate-150 rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"></div>

                {/* Contenuto */}
                <div className="relative flex flex-col items-center justify-center px-3 py-2.5 gap-2">
    
                    
                    {/* Due Bottoni Side-by-side */}
                    <div className="flex gap-2 w-full">
                        
                        {/* Bottone WhatsApp - Trasparente */}
                        <button
                            onClick={handleWhatsApp}
                            className="flex-1 group relative flex items-center justify-center gap-2.5
                                bg-transparent
                                border border-emerald-500/35
                                px-3 py-2.5
                                rounded-xl
                                text-slate-800/90
                                font-bold
                                transition-all duration-200
                                shadow-none
                                hover:bg-emerald-50/10
                                hover:-translate-y-[0px]
                                active:bg-emerald-50/15
                                text-left"
                        >
                            {/* Icona WhatsApp */}
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white border border-emerald-500/40">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.257-.154-2.874.854.854-2.874-.154-.257A8 8 0 1112 20z" fill="currentColor"/>
                                </svg>
                            </span>
                            <span className="flex min-w-0 flex-col items-start leading-none">
                                <span className="text-[12px] font-extrabold uppercase tracking-[0.02em]">WhatsApp</span>
                                <span className="text-[9px] font-semibold text-slate-700/80 normal-case">Preventivo gratis</span>
                            </span>
                        </button>

                        {/* Bottone Chiama - Trasparente */}
                        <button
                            onClick={handleCall}
                            className="flex-1 group relative flex items-center justify-center gap-2.5
                                bg-transparent
                                border border-blue-500/35
                                px-3 py-2.5
                                rounded-xl
                                text-slate-800/90
                                font-bold
                                transition-all duration-200
                                shadow-none
                                hover:bg-blue-50/10
                                hover:-translate-y-[0px]
                                active:bg-blue-50/15
                                text-left"
                        >
                            {/* Icona Telefono */}
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white border border-blue-500/40">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </span>
                            <span className="flex min-w-0 flex-col items-start leading-none">
                                <span className="text-[12px] font-extrabold uppercase tracking-[0.02em]">Chiama ora</span>
                                <span className="text-[9px] font-semibold text-slate-700/80 normal-case">07:00 - 20:00</span>
                            </span>
                        </button>

                    </div>

                    {/* Sottotitolo */}
                    <p className="text-[9px] font-medium text-slate-500 leading-tight text-center">
                        {subtitle}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default StickyGlassFooter;
