import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ServiceHeroHome from '../../components/ServiceHeroHome';
import RecentWorks from '../../components/RecentWorks';
import ServiceExplainerSection from '../../components/ServiceExplainerSection';
import ServicePainVsSolution from '../../components/ServicePainVsSolution';
import ServiceDescription from '../../components/ServiceDescription';
import ServiceFAQ from '../../components/ServiceFAQ';
import InstallationQuiz from '../../components/InstallationQuiz';
import Temparquettisti from '../../components/Temparquettisti';
import { servicesData } from '../../utils/servicesData';

// Landing page: "Prezzi pavimento SPC a Roma"
// Route: /roma/pavimento-spc-prezzi

const BASE_SLUG = 'posa-pavimento-spc-roma';

function RomaSPCPrezziPage() {
  const baseService = servicesData[BASE_SLUG];
  if (!baseService) return null;

  const service = {
    ...baseService,
    slug: 'roma-spc-prezzi',
    pageTitle: 'Prezzi Pavimento SPC a Roma | €17/mq Posa | Pro Casa Parquet',
    metaDescription:
      'Pavimento SPC a Roma a partire da €17/mq per la posa. Impermeabile, silenzioso e posato direttamente sul vecchio pavimento senza demolizioni. Calcola il tuo preventivo online o richiedi un sopralluogo gratuito.',
    hero: {
      ...baseService.hero,
      h1: (
        <>
          Pavimento SPC{' '}
          <span className="bg-yellow-50 text-yellow-900 px-2 py-0.5 transform -rotate-1 inline-block rounded-sm">
            a Roma
          </span>
          <br />
          <span className="text-orange-600">da €17/mq per la posa.</span>
          <br />
          <span className="text-slate-400 text-[0.4em] md:text-[0.6em] align-middle ml-2 decoration-slice decoration-yellow-200 underline font-black">
            Impermeabile, silenzioso, senza demolizioni.
          </span>
        </>
      ),
      subtitle: "Vuoi un pavimento nuovo a Roma senza i costi di una ristrutturazione completa? L'SPC si posa direttamente sopra il tuo pavimento esistente, è 100% impermeabile, calpestabile subito e costa meno di quanto pensi.",
    },
  };

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }, []);

  const canonicalUrl = 'https://www.posaparquetroma.it/roma/pavimento-spc-prezzi';

  return (
    <>
      <Helmet>
        <title>{service.pageTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={service.pageTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <ServiceHeroHome service={service} />
      <RecentWorks service={service} />
      <ServiceExplainerSection service={service} />
      <ServicePainVsSolution service={service} />
      <ServiceDescription service={service} />
      <section id="home-preventivatore"><InstallationQuiz service={service} /></section>
      <Temparquettisti />
      <ServiceFAQ service={service} />
    </>
  );
}

export default RomaSPCPrezziPage;