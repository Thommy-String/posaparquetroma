// =============================================================================
// /roma/rifare-pavimenti-casa-abitata
// Landing page per traffico Google Ads — query "rifare pavimenti casa abitata"
// =============================================================================
// Mobile-first (375px), nessun form, nessuna raccolta dati.
// =============================================================================

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, Clock, CheckCircle } from 'lucide-react';
import { track } from '../../utils/analytics';
import { rifareCasaAbitataContent as content } from '../../utils/landingContent/romaRifareCasaAbitata.jsx';
import PricingTable from '../../components/PricingTable';
import ServiceFAQ from '../../components/ServiceFAQ';
import EnhancedQuoteVerifier from '../../components/EnhancedQuoteVerifier';
import MaterialCarousel from '../../components/MaterialCarousel';
import PriceWizard from '../../components/PriceWizard';
import ParquettistiSocialProof from '../../components/ParquettistiSocialProof';

// =============================================================================
// HERO: intento — "rifaccio i pavimenti ma vivo in casa, come funziona?"
// =============================================================================
function HeroSection() {
  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 pt-14 sm:pt-16 pb-8">
        <ParquettistiSocialProof />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight text-center mt-4 mb-3 mx-4">
          Rifacciamo i pavimenti{' '}
          <span className="bg-orange-50 text-orange-900 px-2 py-0.5 inline-block rounded-sm">
            in casa abitata
          </span>
          <br />
          <span className="text-orange-600">a Roma. Senza traslocare.</span>
        </h1>

        <p className="text-[15px] text-gray-500 leading-relaxed text-center max-w-lg mx-auto mb-4">
          Vivi qui, hai i mobili, non vuoi andare in albergo. Lavoriamo per zone, spostiamo noi i
          mobili, e ogni sera la casa è pulita e vivibile. Zero stress.
        </p>

        <div className="flex flex-wrap justify-center gap-2">
          {content.hero.reassuranceItems.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-[11px] font-bold text-emerald-800"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION: CRONOPROGRAMMA GIORNO PER GIORNO (subito dopo la hero — è l'intento)
// =============================================================================
function TimelineSection() {
  const { timeline } = content;
  const [expandedDay, setExpandedDay] = useState(0);

  const toggleDay = (i) => {
    setExpandedDay(i);
    track('timeline_day_toggle', { day: timeline.days[i].day });
  };

  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-1">{timeline.title}</h2>
        <p className="text-[14px] text-gray-500 mb-5">{timeline.subtitle}</p>

        <div className="space-y-3">
          {timeline.days.map((day, i) => (
            <div
              key={i}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                expandedDay === i ? 'bg-white border-orange-200 shadow-md' : 'bg-white border-gray-200 hover:shadow-sm'
              }`}
            >
              <button
                className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggleDay(i)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black shrink-0 ${
                      expandedDay === i ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[14px] font-bold text-gray-900">{day.day}</span>
                </div>
                {expandedDay === i ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>

              {expandedDay === i && (
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-100 pt-4 space-y-4">
                    {day.phases.map((phase, j) => (
                      <div key={j} className="flex gap-3">
                        <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="block text-[11px] font-semibold text-orange-600 uppercase tracking-wide mb-1">
                            {phase.time}
                          </span>
                          <h4 className="text-[14px] font-bold text-gray-900 mb-1">{phase.title}</h4>
                          <p className="text-[13px] text-gray-600 leading-relaxed">{phase.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-[13px] text-emerald-800 leading-relaxed font-medium">{timeline.eveningNote}</p>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION: METODO PER ZONE
// =============================================================================
function ZoneMethodSection() {
  const { zoneMethod } = content;

  return (
    <section className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-1">{zoneMethod.title}</h2>
        <p className="text-[14px] text-gray-500 mb-5">{zoneMethod.subtitle}</p>

        <div className="space-y-3">
          {zoneMethod.steps.map((step, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl px-4 py-4 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-orange-500 shrink-0" />
                <h3 className="text-[15px] font-bold text-gray-900">{step.zone}</h3>
              </div>
              <p className="text-[13px] font-semibold text-gray-700 mb-1">{step.description}</p>
              <p className="text-[13px] text-gray-500 leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <p className="text-[13px] text-amber-800 leading-relaxed font-medium">{zoneMethod.note}</p>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION: CONFRONTO POSA FLOTTANTE VS DEMOLIZIONE
// =============================================================================
function WhyFloatingOnlySection() {
  const { whyFloatingOnly } = content;

  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{whyFloatingOnly.title}</h2>

        <div className="overflow-hidden border border-gray-200 rounded-xl">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-bold text-gray-700">Aspetto</th>
                <th className="text-left px-4 py-3 font-bold text-emerald-700">Posa sopra esistente</th>
                <th className="text-left px-4 py-3 font-bold text-red-700">Demolizione</th>
              </tr>
            </thead>
            <tbody>
              {whyFloatingOnly.comparison.map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'}>
                  <td className="px-4 py-3 text-gray-900 font-semibold align-top">{row.aspect}</td>
                  <td className="px-4 py-3 text-gray-700 align-top">
                    <span className="inline-flex items-start gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {row.floating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 align-top">
                    <span className="inline-flex items-start gap-1">
                      <span className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-400 font-bold leading-none">✕</span>
                      {row.demolition}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION: DOMANDE LOGISTICHE
// =============================================================================
function LogisticQuestionsSection() {
  const { logisticQuestions } = content;
  const [expanded, setExpanded] = useState({});

  const toggle = (i) => {
    setExpanded(prev => ({ ...prev, [i]: !prev[i] }));
    if (!expanded[i]) track('logistic_question_toggle', { index: i });
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-1">Le domande che ti stai facendo</h2>
        <p className="text-[14px] text-gray-500 mb-5">Logistica, orari, chiavi, convivenza col cantiere.</p>

        <div className="space-y-2">
          {logisticQuestions.map((q, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-sm">
              <button
                className="w-full text-left px-4 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggle(i)}
              >
                <span className="flex-1 min-w-0 mr-2 text-[14px] font-bold text-gray-900">{q.question}</span>
                {expanded[i] ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {expanded[i] && (
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-[14px] text-gray-600 leading-relaxed">{q.answer}</p>
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
// SECTION: FAQ
// =============================================================================
function FAQSection() {
  return <ServiceFAQ category="rifare-pavimenti-casa-abitata-roma" />;
}

// =============================================================================
// PAGE
// =============================================================================
export default function RomaRifareCasaAbitataPage() {
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
        {/* 1. Hero su misura: risolve l'intento "vivo in casa, come facciamo?" */}
        <HeroSection />

        {/* 2. Cronoprogramma giorno per giorno — subito, è il core della pagina */}
        <TimelineSection />

        {/* 3. Metodo per zone */}
        <ZoneMethodSection />

        {/* 4. Scegli il pavimento (PriceWizard) */}
        <PriceWizard compact />

        {/* 5. MaterialCarousel — esplora i materiali */}
        <MaterialCarousel />

        {/* 6. Confronto posa flottante vs demolizione */}
        <WhyFloatingOnlySection />

        {/* 7. Domande logistiche */}
        <LogisticQuestionsSection />

        {/* 8. Pricing + verificatore preventivi */}
        <PricingTable />
        <EnhancedQuoteVerifier />

        {/* 9. FAQ */}
        <FAQSection />
      </main>
    </>
  );
}
