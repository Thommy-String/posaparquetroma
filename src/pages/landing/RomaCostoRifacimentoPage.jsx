// =============================================================================
// /roma/quanto-costa-rifare-il-pavimento
// Landing page per traffico Google Ads — query "quanto costa rifare il pavimento"
// =============================================================================
// Mobile-first (375px), nessun form, nessuna raccolta dati.
// Tutti i prezzi da src/utils/pricing.js — fonte unica.
// =============================================================================

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { track } from '../../utils/analytics';
import { costoRifacimentoContent as content } from '../../utils/landingContent/romaCostoRifacimento';
import NewLandingHero from '../../components/NewLandingHero';
import PricingTable from '../../components/PricingTable';
import ServiceFAQ from '../../components/ServiceFAQ';
import EnhancedQuoteVerifier from '../../components/EnhancedQuoteVerifier';
import MaterialCarousel from '../../components/MaterialCarousel';

// =============================================================================
// HELPER: format currency
// =============================================================================
const fmt = (n) => n.toLocaleString('it-IT');

// =============================================================================
// SECTION 1: HERO (nuovo componente con filtri)
// =============================================================================
function HeroSection() {
  return <NewLandingHero />;
}

// =============================================================================
// MAPPING: accent → tailwind classes for InsiderTips cards
// =============================================================================
const TIP_STYLES = {
  amber:   { bg: 'bg-amber-50',   border: 'border-amber-200',   dot: 'bg-amber-400' },
  blue:    { bg: 'bg-blue-50',    border: 'border-blue-200',    dot: 'bg-blue-400' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-400' },
  violet:  { bg: 'bg-violet-50',  border: 'border-violet-200',  dot: 'bg-violet-400' },
  rose:    { bg: 'bg-rose-50',    border: 'border-rose-200',    dot: 'bg-rose-400' },
};

// =============================================================================
// SECTION 4: QUELLO CHE SCOPRI SOLO IN CANTIERE (spostato in alto)
// =============================================================================
function InsiderTips() {
  const { insiderTips } = content;
  return (
    <section className="bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-1">{insiderTips.title}</h2>
        <p className="text-[14px] text-gray-500 mb-5">{insiderTips.subtitle}</p>

        <div className="space-y-4">
          {insiderTips.tips.map((tip, i) => {
            const s = TIP_STYLES[tip.accent] || TIP_STYLES.amber;
            return (
              <div
                key={i}
                className={`${s.bg} ${s.border} border rounded-xl px-4 py-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                  <h3 className="text-[15px] font-bold text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-[14px] text-gray-600 leading-relaxed">{tip.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 5: LEVE DEL PREZZO
// =============================================================================
function PriceLevers() {
  const { priceLevers } = content;
  const [expanded, setExpanded] = useState({});

  const toggle = (i) => {
    const next = { ...expanded, [i]: !expanded[i] };
    setExpanded(next);
    if (!expanded[i]) {
      track('price_lever_toggle', { lever: priceLevers.levers[i].label, delta: priceLevers.levers[i].delta });
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-1">{priceLevers.title}</h2>
        <p className="text-[14px] text-gray-500 mb-5">{priceLevers.subtitle}</p>

        {/* Base case */}
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4">
          <span className="text-[13px] text-gray-500">{priceLevers.baseCase.label}</span>
          <span className="float-right text-[16px] font-extrabold text-gray-900">
            €{fmt(priceLevers.baseCase.price)}
          </span>
        </div>

        {/* Levers */}
        <div className="space-y-2">
          {priceLevers.levers.map((lever, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm">
              <button
                className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => toggle(i)}
              >
                <div className="flex-1 min-w-0 mr-2">
                  <span className="text-[14px] font-medium text-gray-900">{lever.label}</span>
                  <span className="text-[14px] font-bold text-orange-600 ml-2">
                    +€{typeof lever.delta === 'number' ? fmt(lever.delta) : lever.delta}
                  </span>
                </div>
                {expanded[i] ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {expanded[i] && (
                <div className="px-4 pb-3">
                  <p className="text-[13px] text-gray-600 leading-relaxed">{lever.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-[13px] text-gray-500 mt-4 italic">{priceLevers.footerNote}</p>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 7: TI SERVE DAVVERO IL LIVELLAMENTO?
// =============================================================================
function LevelChecker() {
  const { levelChecker } = content;
  const [result, setResult] = useState(null);

  const handleCheck = (r) => {
    setResult(r);
    track('level_check', { result: r });
  };

  return (
    <section className="bg-amber-50 border-y border-amber-100">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-4">{levelChecker.title}</h2>
        <div className="text-[14px] text-gray-700 leading-relaxed mb-5">{levelChecker.body}</div>

        <div className="flex gap-3 mb-4">
          <button
            className={`flex-1 py-3 rounded-lg font-bold text-[15px] transition-all duration-200 ${
              result === 'pass'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-white border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:shadow-sm'
            }`}
            onClick={() => handleCheck('pass')}
          >
            {levelChecker.passLabel}
          </button>
          <button
            className={`flex-1 py-3 rounded-lg font-bold text-[15px] transition-all duration-200 ${
              result === 'fail'
                ? 'bg-red-500 text-white shadow-md'
                : 'bg-white border-2 border-red-300 text-red-700 hover:bg-red-50 hover:shadow-sm'
            }`}
            onClick={() => handleCheck('fail')}
          >
            {levelChecker.failLabel}
          </button>
        </div>

        {result === 'pass' && (
          <div className="bg-emerald-100 border border-emerald-300 rounded-lg px-4 py-3">
            <p className="text-[14px] text-emerald-800 font-medium flex items-start gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {levelChecker.passMessage}
            </p>
          </div>
        )}
        {result === 'fail' && (
          <div className="bg-red-100 border border-red-300 rounded-lg px-4 py-3">
            <p className="text-[14px] text-red-800 font-medium flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {levelChecker.failMessage}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}


// =============================================================================
// SECTION 10: DOVE LAVORIAMO
// =============================================================================
function GeographicCoverage() {
  const { geographicCoverage } = content;
  return (
    <section className="bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-[22px] font-extrabold text-gray-900 mb-1">{geographicCoverage.title}</h2>
        <p className="text-[14px] text-gray-500 mb-5">{geographicCoverage.subtitle}</p>

        <div className="space-y-3">
          {geographicCoverage.provinces.map((prov, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg px-4 py-3 transition-all duration-200 hover:shadow-sm">
              <h3 className="text-[14px] font-bold text-gray-900 mb-1">{prov.name}</h3>
              <p className="text-[13px] text-gray-600 leading-relaxed">{prov.cities}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 11: FAQ
// =============================================================================
function FAQSection() {
  return <ServiceFAQ category="quanto-costa-rifare-pavimento-roma" />;
}

// =============================================================================
// PAGE
// =============================================================================
export default function RomaCostoRifacimentoPage() {
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
        <HeroSection />
        
        <MaterialCarousel />

        <FAQSection />

        <PricingTable />
        <InsiderTips />
        <PriceLevers />
        <EnhancedQuoteVerifier />
        <LevelChecker />
        <GeographicCoverage />
      </main>

    </>
  );
}
