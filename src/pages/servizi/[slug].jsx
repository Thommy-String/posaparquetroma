import { useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ServicePageLayout from '../../components/ServicePageLayout';
import { servicesData } from '../../utils/servicesData';

function ServicePage() {
  const { slug } = useParams();

  const service = useMemo(() => {
    if (!slug) return null;
    return servicesData[slug] ?? null;
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  // --- PREPARAZIONE DATI SEO ---
  // Usiamo i nomi corretti che abbiamo in servicesData.js
  const finalTitle = service.pageTitle || service.title || "Servizio Posa Parquet";
  const finalDescription = service.metaDescription || service.seoDescription || `Scopri il servizio di ${finalTitle} a Milano.`;
  const canonicalUrl = `https://www.posaparquetmilano.it/servizi/${service.slug}`;

  return (
    <>
      <Helmet>
        <title>{`${finalTitle} | Milano Posa Parquet`}</title>
        <meta name="description" content={finalDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <ServicePageLayout service={service} />
    </>
  );
}

export default ServicePage;