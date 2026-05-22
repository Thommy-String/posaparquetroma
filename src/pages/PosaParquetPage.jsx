import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ServicePageLayout from '../components/ServicePageLayout';
import { servicesData } from '../utils/servicesData';

// Questa landing page standalone usa i dati del servizio "posa-parquet-prefinito-milano"
// ma è servita al percorso /posaparquet per campagne Google Ads dedicate.
const LANDING_SLUG = 'posa-parquet-prefinito-milano';

function PosaParquetPage() {
  const service = servicesData[LANDING_SLUG];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  if (!service) return null;

  const pageTitle = 'Posa Parquet Prefinito a Milano | Preventivo Gratuito';
  const metaDescription =
    'Posa parquet prefinito a Milano: incollaggio professionale, sopralluogo gratuito e prezzi trasparenti. Squadra specializzata di parquettisti a Milano e dintorni.';
  const canonicalUrl = 'https://www.posaparquetmilano.it/posaparquet';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <ServicePageLayout service={service} />
    </>
  );
}

export default PosaParquetPage;
