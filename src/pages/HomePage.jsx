import React from 'react';
import Hero from '../components/Hero';
import InstallationQuiz from '../components/InstallationQuiz';
import RecentWorks from '../components/RecentWorks';

// Below-fold: importazioni dirette — evitiamo decine di micro-chunk separati
// che creano waterfall di rete e bloccano il rendering.
import PricingSection from '../components/PricingSection';
import ValuePropsSection from '../components/ValuePropsSection';
import QuickFloorConsult from '../components/QuickFloorConsult';
import ServiceFAQ from '../components/ServiceFAQ';
import DescrizioneMainCategories from '../components/DescrizioneMainCategories';
import logoImage from '../assets/logo/favicon.png';
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

function HomePage() {

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
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup)}
      </script>

      <Hero />

      {/* QUIZ */}
      <section id="preventivatore" className="scroll-mt-28">
        <InstallationQuiz />
      </section>

      {/* Sezione Lavori Recenti */}
      <RecentWorks showFilter={true} />

      {/* Below-fold sections — caricamento diretto (bundle unico, zero waterfall) */}
      <PricingSection />

      <ValuePropsSection />

      {/* 2. CHECK SOTTOFONDO (QuickFloorConsult) */}
      <section id="check-sottofondo" className="scroll-mt-28">
        <QuickFloorConsult />
      </section>

      {/* FAQ HOMEPAGE GENERICHE */}
      <ServiceFAQ service={{ slug: 'home-general' }} />

      <DescrizioneMainCategories />
    </>
  );
}

export default HomePage;
