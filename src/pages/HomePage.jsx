import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Temparquettisti from '../components/Temparquettisti';
import logoImage from '../assets/logo/logo-96.webp';
import {
  COMPANY_NAME,
  WEBSITE_URL,
  PHONE_NUMBER,
  SCHEMA_ADDRESS,
  SCHEMA_GEO,
  MAIN_CATEGORY,
  PRIMARY_CITY,
  GBP_CATEGORIES,
  SERVICE_AREAS
} from '../utils/constants';

const InstallationQuiz = lazy(() => import('../components/InstallationQuiz'));
const RecentWorks = lazy(() => import('../components/RecentWorks'));
const PricingSection = lazy(() => import('../components/PricingSection'));
const ValuePropsSection = lazy(() => import('../components/ValuePropsSection'));
const ServiceFAQ = lazy(() => import('../components/ServiceFAQ'));
const DescrizioneMainCategories = lazy(() => import('../components/DescrizioneMainCategories'));

const SectionSkeleton = () => (
  <div className="container mx-auto px-4 py-10">
    <div className="h-5 w-52 bg-gray-100 rounded-full animate-pulse mb-4" />
    <div className="h-4 w-full bg-gray-50 rounded animate-pulse mb-2" />
    <div className="h-4 w-3/4 bg-gray-50 rounded animate-pulse" />
  </div>
);

const BelowFoldPlaceholder = () => (
  <div aria-hidden="true">
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10 min-h-[980px] md:min-h-[1080px]">
        <div className="h-6 w-64 bg-gray-100 rounded-full mb-6" />
        <div className="h-[840px] md:h-[920px] rounded-[32px] bg-gray-50 border border-gray-100" />
      </div>
    </div>

    <div className="bg-[#f4f4f0] border-t-[3px] border-black">
      <div className="container mx-auto px-4 py-12 min-h-[1720px] md:min-h-[1500px]">
        <div className="mx-auto h-8 w-80 bg-black/5 rounded-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-[520px] rounded-[24px] bg-white border-[3px] border-black/10" />
          ))}
        </div>
      </div>
    </div>

    <div className="bg-[#f4f4f0] py-12 px-4">
      <div className="mx-auto max-w-xl min-h-[860px]">
        <div className="h-8 w-72 bg-black/5 rounded-full mx-auto mb-10" />
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-28 rounded-2xl bg-white border-[3px] border-black/10" />
          ))}
        </div>
      </div>
    </div>

    <div className="bg-[#F5F5F7] py-24">
      <div className="container mx-auto px-4 min-h-[1320px] md:min-h-[1160px]">
        <div className="h-10 w-96 bg-black/5 rounded-full mx-auto mb-8" />
        <div className="h-20 max-w-2xl mx-auto rounded-2xl bg-white border border-gray-200 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-[420px] rounded-[24px] bg-white border border-gray-200" />
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 min-h-[520px]">
        <div className="h-8 w-72 bg-gray-100 rounded-full mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-56 rounded-3xl bg-gray-50 border border-gray-100" />
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 min-h-[420px]">
        <div className="h-8 w-80 bg-gray-100 rounded-full mx-auto mb-8" />
        <div className="h-72 rounded-3xl bg-gray-50 border border-gray-100" />
      </div>
    </div>
  </div>
);

function HomePage() {
  const [showBelowFold, setShowBelowFold] = useState(false);

  useEffect(() => {
    if (showBelowFold) return;

    let rafId;
    let isRevealed = false;

    const reveal = () => setShowBelowFold(true);

    const scheduleReveal = () => {
      if (isRevealed) return;
      isRevealed = true;
      rafId = requestAnimationFrame(reveal);
    };

    window.addEventListener('scroll', scheduleReveal, { passive: true, once: true });
    window.addEventListener('pointerdown', scheduleReveal, { passive: true, once: true });
    window.addEventListener('keydown', scheduleReveal, { passive: true, once: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleReveal);
      window.removeEventListener('pointerdown', scheduleReveal);
      window.removeEventListener('keydown', scheduleReveal);
    };
  }, [showBelowFold]);

  // 1. CONSIGLIO VIDEO: SCHEMA MARKUP
  // Questo "spiega" a Google chi sei, dove sei e cosa fai.
  // Deve corrispondere ESATTAMENTE ai dati GBP e constants.js
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness", // Importante: business locale
    "name": COMPANY_NAME,
    "image": [logoImage],
    "@id": WEBSITE_URL,
    "url": WEBSITE_URL,
    "telephone": PHONE_NUMBER,
    "priceRange": "$$", // Fascia di prezzo (opzionale)
    "address": {
      "@type": "PostalAddress",
      ...SCHEMA_ADDRESS
    },
    "geo": {
      "@type": "GeoCoordinates",
      ...SCHEMA_GEO
    },
    "areaServed": SERVICE_AREAS.map(area => ({
      "@type": "Place",
      "name": area.name
    })),
    "knowsAbout": GBP_CATEGORIES,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "07:00",
        "closes": "20:00"
      }
    ],
    "serviceType": MAIN_CATEGORY,
    "description": `Siamo ${MAIN_CATEGORY} specializzati nella posa di parquet prefinito, SPC e pavimenti in legno a ${PRIMARY_CITY} e dintorni. Sopralluogo e preventivo gratuiti.`
  };

  return (
    <>
      <Helmet>
        <title>Servizio di posa di pavimento in legno a roma | ProCasa Parquet</title>
        <meta
          name="description"
          content="Servizio di posa di pavimento in legno a roma, specializzati in posa parquet prefinito, SPC, LVT e laminato, rivestimento gradini e battiscopa. Richiedi un preventivo gratuito."
        />
        <link rel="canonical" href="https://www.posaparquetroma.it/" />
      </Helmet>

      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <Hero />

      <Temparquettisti />

      <div id="below-fold-sentinel" aria-hidden="true" className="h-px" />

      {!showBelowFold && <BelowFoldPlaceholder />}

      {showBelowFold && (
        <Suspense fallback={<SectionSkeleton />}>
          {/* QUIZ */}
          <section id="preventivatore" className="scroll-mt-28">
            <InstallationQuiz />
          </section>

          {/* Sezione Lavori Recenti */}
          <RecentWorks showFilter={true} />

          {/* FAQ HOMEPAGE GENERICHE - Subito dopo le recensioni */}
          <ServiceFAQ service={{ slug: 'home-general' }} />

          {/* Below-fold sections */}
          <PricingSection />

          <ValuePropsSection />

          <DescrizioneMainCategories />
        </Suspense>
      )}
    </>
  );
}

export default HomePage;
