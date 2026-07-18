import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COMPANY_NAME, PHONE_NUMBER } from '../utils/constants';
import { gtagReportConversion } from '../utils/analytics';
import { serviceNavLinks } from '../utils/serviceNavLinks';
import logoImage from '../assets/logo/logo-96-white-bands.webp';

const ChevronRightIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const PhoneIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// --- COLORI PER OGNI SERVIZIO ---
const SERVICE_COLORS = {
  'posa-parquet-prefinito-roma': { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  'posa-parquet-prefinito-flottante-roma': { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  'posa-parquet-prefinito-spina-roma': { text: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' },
  'posa-pavimento-spc-roma': { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  'posa-pavimento-laminato-roma': { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  'posa-battiscopa-roma': { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
  'rivestimento-scale-roma': { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
};

function Header({ conversionId }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Modifica: Header sempre visibile al caricamento (sia mobile che desktop).
  // Lo scroll handler lo nasconderà quando l'utente scrolla giù.
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isVisibleRef = useRef(true);
  const isMenuOpenRef = useRef(false);
  const isMobileRef = useRef(false);
  const location = useLocation();

  // 1. Chiudi il menu quando cambia la rotta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  // Evita letture di window.innerWidth a ogni scroll.
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => {
      isMobileRef.current = media.matches;
    };

    updateIsMobile();
    media.addEventListener('change', updateIsMobile);

    return () => media.removeEventListener('change', updateIsMobile);
  }, []);

  // 2. Gestione Scroll (Nascondi scendendo, Mostra salendo)
  // Usa useRef + confronto per evitare re-render inutili su ogni pixel di scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;

        // Se il menu è aperto, l'header DEVE restare visibile
        if (isMenuOpenRef.current) {
          setIsVisible(true);
          lastScrollY.current = window.scrollY;
          return;
        }

        const currentScrollY = window.scrollY;
        const isMobile = isMobileRef.current;
        let newVisible = isVisibleRef.current;

        if (!isMobile) {
          if (currentScrollY < 10) {
            newVisible = true;
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            newVisible = false;
          } else if (currentScrollY < lastScrollY.current) {
            newVisible = true;
          }
        } else {
          // Mobile: mostra sempre in cima, nascondi scrollando giù, mostra scrollando su
          if (currentScrollY < 10) {
            newVisible = true;
          } else if (currentScrollY > lastScrollY.current) {
            newVisible = false;
          } else if (currentScrollY < lastScrollY.current) {
            newVisible = true;
          }
        }

        lastScrollY.current = currentScrollY;

        // Aggiorna stato solo se cambia davvero (evita re-render inutili)
        if (newVisible !== isVisibleRef.current) {
          isVisibleRef.current = newVisible;
          setIsVisible(newVisible);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Blocca lo scroll del sito quando il menu è aperto
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const serviceLinks = useMemo(() => {
    return serviceNavLinks
      .filter((s) => s.slug && s.navLabel)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }, []);

  // Controlla se siamo su una service page (inclusa la landing page /posaparquet)
  const isServicePage = location.pathname.startsWith('/servizi/') || location.pathname.startsWith('/posaparquet');

  return (
    <>
      {/* --- HEADER BAR (FISSO MA A SCOMPARSA) --- */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[60] bg-white/90 backdrop-blur-md border-b border-gray-100 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ height: 'var(--header-height, 4rem)' }} 
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between h-full">
          
          {/* 1. LOGO & BRANDING */}
          {isServicePage ? (
            <div className="flex items-center gap-3 z-[61] cursor-default">
              <img src={logoImage} alt={COMPANY_NAME} className="h-9 md:h-11 w-auto" width="96" height="96" />
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold tracking-tight leading-none text-gray-900">
                  PosaParquetRoma.it 
                </span>
                  <span className="text-[10px] font-medium uppercase tracking-tighter text-gray-700 leading-tight">
                  n.1 a roma e dintorni
                </span>
              </div>
            </div>
          ) : (
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 z-[61]">
              <img src={logoImage} alt={COMPANY_NAME} className="h-9 md:h-11 w-auto" width="96" height="96" />
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold tracking-tight leading-none text-gray-900">
                  PosaParquetroma.it 
                </span>
                  <span className="text-[10px] font-medium tracking-tighter text-gray-700 leading-tight">
                  Posatori esperti su roma e dintorni
                </span>
              </div>
            </Link>
          )}

          {/* 2. LATO DESTRO (HAMBURGER) */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* CTA TELEFONO CON ORARI (SOSTITUISCE HAMBURGER) */}
            <button 
              onClick={() => {
                gtagReportConversion({
                  sendTo: conversionId,
                  redirectUrl: `tel:${PHONE_NUMBER}`,
                });
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg hover:bg-green-50 transition-colors z-[61] border border-green-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 flex-shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm md:text-base font-black text-gray-900">{PHONE_NUMBER}</span>
                <span className="text-[9px] font-bold text-green-800 uppercase tracking-wider">07:00 - 20:00</span>
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* --- MENU A TUTTO SCHERMO (OVERLAY) --- */}
      <div 
        className={`fixed inset-0 bg-white z-[50] transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}
        // Padding top adattato alla nuova altezza più sottile
        style={{ paddingTop: '70px' }} 
      >
        {/* Contenitore scrollabile */}
        <div className="h-full overflow-y-auto px-6 pb-20">
          <div className="container mx-auto max-w-2xl flex flex-col gap-8 py-4">

            {/* Sezione SERVIZI CON COLORI */}
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-3">
                Servizi Pavimenti
              </h3>
              <div className="flex flex-col gap-2">
                {serviceLinks.map((s) => {
                  const colors = SERVICE_COLORS[s.slug] || { text: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
                  return (
                    <Link 
                      key={s.slug} 
                      to={`/servizi/${s.slug}`}
                      className={`py-3 px-4 rounded-lg border-2 font-bold text-base transition-all hover:shadow-md ${colors.bg} ${colors.border} ${colors.text} flex justify-between items-center group`}
                    >
                      {s.navLabel}
                      <ChevronRightIcon className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sezione LINK PRINCIPALI */}
            <div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-200 pb-3">
                Navigazione
              </h3>
              <div className="flex flex-col gap-2">
                <Link to="/" className="py-3 px-4 rounded-lg border border-gray-200 font-bold text-base text-gray-900 hover:bg-gray-50 transition-colors flex justify-between items-center group">
                  Home
                  <ChevronRightIcon className="text-gray-300 group-hover:text-gray-600" />
                </Link>
              </div>
            </div>

            {/* CONTATTI FOOTER DEL MENU */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <button onClick={() => {
                    gtagReportConversion({
                      sendTo: conversionId,
                      redirectUrl: `tel:${PHONE_NUMBER}`,
                    });
                  }} className="flex justify-center items-center gap-3 w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors text-base">
                <PhoneIcon /> {PHONE_NUMBER}
                </button>
            </div>

          </div>
        </div>
      </div>

      {/* --- SPACER (EVITA CHE IL CONTENUTO FINISCA SOTTO L'HEADER) --- */}
      <div className="h-16 md:h-16 w-full"></div>
    </>
  );
}

export default Header;