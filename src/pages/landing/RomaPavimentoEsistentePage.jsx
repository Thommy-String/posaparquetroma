// =============================================================================
// /roma/pavimento-su-pavimento-esistente
// Landing page per traffico Google Ads — query "posa pavimento su esistente"
// =============================================================================
// Mobile-first (375px), nessun form, nessuna raccolta dati.
// =============================================================================

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, XCircle } from 'lucide-react';
import { track } from '../../utils/analytics';
import { pavimentoEsistenteContent as content } from '../../utils/landingContent/romaPavimentoEsistente.jsx';
import PricingTable from '../../components/PricingTable';
import ServiceFAQ from '../../components/ServiceFAQ';
import EnhancedQuoteVerifier from '../../components/EnhancedQuoteVerifier';
import MaterialCarousel from '../../components/MaterialCarousel';
import PriceWizard from '../../components/PriceWizard';
import ParquettistiSocialProof from '../../components/ParquettistiSocialProof';
import FeasibilitySection from '../../components/FeasibilitySection';
import WorksCarousel from '../../components/WorksCarousel';
import heroImageSpina from '../../assets/images/parquet/coprirePavimentoEsistente/coprirePiastrelleConSPCspina.webp';
import rovereImage from '../../assets/images/parquet/coprirePavimentoEsistente/coprirePiastrelleConSPCrovere.webp';

// =============================================================================
// HERO: intento — "posso posare sopra il pavimento che ho già?"
// =============================================================================
function HeroSection() {
  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 pt-14 sm:pt-16 pb-8">
        <ParquettistiSocialProof />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight text-center mt-4 mb-3 mx-4">
       Vuoi coprire il vecchio pavimento a Roma{' '}
    <span className="text-orange-600">senza demolizioni?</span>
        </h1>

        <p className="text-[15px] text-gray-500 leading-relaxed text-center max-w-md mx-auto mb-2">
          Nuovo pavimento in 2-3 giorni senza costi di smaltimento. Scopri qui se il tuo pavimento è adatto per la sovrapposizione.
        </p>

        <img
          src={heroImageSpina}
          alt="Posa SPC spina di pesce su pavimento esistente — coprire piastrelle senza demolizione"
          fetchPriority="high"
          decoding="async"
          className="w-full h-128 sm:h-96 object-cover rounded-xl mt-4"
        />
      </div>
    </section>
  );
}


// =============================================================================
// SECTION: OBIEZIONI TECNICHE
// =============================================================================
function TechnicalObjectionsSection() {
  const { technicalObjections } = content;
  const [expanded, setExpanded] = useState({});

  const toggle = (i) => {
    setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
    if (!expanded[i]) track('objection_toggle', { id: technicalObjections[i].id });
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-5">Dubbi tecnici? Ecco le risposte</h2>

        <div className="space-y-3">
          {technicalObjections.map((obj, i) => (
            <div key={obj.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-sm">
              <button
                className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggle(i)}
              >
                <div className="flex-1 min-w-0 mr-2">
                  <span className="text-[14px] font-bold text-gray-900">{obj.question}</span>
                  {obj.thicknesses && (
                    <div className="flex gap-2 mt-2">
                      {obj.thicknesses.map((t, j) => (
                        <span key={j} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                          {t.material}: {t.thickness}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full shrink-0">
                  {expanded[i] ? 'Chiudi' : 'Scopri'}
                </span>
              </button>
              {expanded[i] && (
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-[14px] text-gray-600 leading-relaxed">{obj.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION: COME FUNZIONA
// =============================================================================
function HowItWorksSection() {
  const { howItWorks } = content;

  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-5">Come funziona, passo dopo passo</h2>

        <div className="space-y-0">
          {howItWorks.map((step, i) => (
            <div key={i} className="flex gap-4 relative pb-6 last:pb-0">
              {i < howItWorks.length - 1 && (
                <div className="absolute left-[19px] top-12 bottom-0 w-0.5 bg-gray-200" />
              )}
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 text-[14px] font-black z-10">
                {step.step}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-[15px] font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-[14px] text-gray-600 leading-relaxed">{step.description}</p>
                <span className="inline-block mt-2 text-[11px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                  {step.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION: DOVE SI PUÒ FARE E DOVE NO
// =============================================================================
function WherePossibleSection() {
  const { wherePossible } = content;

  return (
    <section className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-32">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{wherePossible.title}</h2>

        <div className="space-y-2">
          {wherePossible.items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 hover:shadow-sm ${
                item.possible
                  ? 'bg-white border-gray-200'
                  : 'bg-red-50/50 border-red-100'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.possible ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
                <span className="text-[14px] font-bold text-gray-900">{item.room}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.note && (
                  <span className="text-[11px] text-gray-500 hidden sm:inline">{item.note}</span>
                )}
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  item.possible
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {item.possible ? 'Sì' : 'No'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION: FAQ
// =============================================================================
function FAQSection() {
  return <ServiceFAQ category="posa-pavimento-su-esistente-roma" />;
}

// =============================================================================
// PAGE
// =============================================================================
export default function RomaPavimentoEsistentePage() {
  return (
    <>
      <Helmet>
        <title>{content.pageTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={content.canonicalUrl} />
        <meta property="og:title" content={content.pageTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={content.canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        {/* 1. Hero su misura: risolve l'intento "posso posare sopra?" */}
        <HeroSection />

        {/* 2. Verificatore di fattibilità — subito, è il core della pagina */}
        <FeasibilitySection data={content.feasibilityChecker} />

        

        {/* 3. Carosello lavori reali con filtri per materiale (nasconde gli incollati) */}
        <WorksCarousel hideIncollati />

        {/* 4. Vantaggi posa su esistente — foto rovere come sfondo split + card */}
        <section className="bg-white">
          <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              {/* Left: full-height image as background with overlay text */}
              <div className="sm:w-[45%] relative min-h-[280px] sm:min-h-[500px]">
                <img
                  src={rovereImage}
                  alt="Posa SPC dogato su pavimento esistente"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/90 backdrop-blur-sm rounded-full mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-[11px] font-semibold text-white tracking-wide uppercase">I vantaggi</span>
                  </div>
                  <h2 className="text-[22px] sm:text-[26px] font-bold text-white leading-tight">
                    Perché posare{' '}
                    <span className="text-orange-300">
                      sopra
                    </span>{' '}
                    il vecchio pavimento?
                  </h2>
                </div>
              </div>
              {/* Right: benefit cards */}
              <div className="sm:w-[55%] p-6 sm:p-8">
                <div className="space-y-3">
                  {[
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-500">
                          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      ),
                      badge: 'Zero macerie',
                      title: 'Niente demolizioni',
                      desc: 'Risparmi sui costi di smaltimento e niente sporco in casa.'
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-500">
                          <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      ),
                      badge: '2-3 giorni',
                      title: 'Tempi rapidi',
                      desc: 'Posa in 2-3 giorni, non devi traslocare.'
                    },
                    {
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-orange-500">
                          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M15 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      ),
                      badge: 'Quasi tutti',
                      title: 'Adatto a quasi tutti i pavimenti',
                      desc: 'Piastrelle, marmo, gres, vecchio parquet — se è stabile, ci posiamo sopra.'
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 p-4 rounded-xl bg-white/90 border border-gray-200 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0 group-hover:bg-orange-100 group-hover:border-orange-200 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="text-[15px] font-bold text-gray-900">{item.title}</h3>
                          <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded-md">{item.badge}</span>
                        </div>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MaterialCarousel — esplora i materiali */}
        <MaterialCarousel />

        {/* 6. Obiezioni tecniche */}
        <TechnicalObjectionsSection />


        {/* 8. Dove si può fare */}
        <WherePossibleSection />

         {/*  FAQ */}
        <FAQSection />

        {/* Scegli il pavimento (PriceWizard) */}
        <PriceWizard compact />

        {/* Pricing + verificatore preventivi */}
        <PricingTable />
        <EnhancedQuoteVerifier />

      </main>
    </>
  );
}
