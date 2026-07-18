import React from 'react';

// Import dei componenti

import RecentWorks from '../components/RecentWorks';
import ServiceDescription from '../components/ServiceDescription';
import ServiceHero from './ServiceHero';
import ServiceHeroHome from './ServiceHeroHome';
import ServiceFAQ from './ServiceFAQ';
import InstallationQuiz from '../components/InstallationQuiz';
import ServiceExplainerSection from '../components/ServiceExplainerSection';
import ServicePainPoints from './ServicePainPoints';
import ServicePainVsSolution from './ServicePainVsSolution';
import SPCProblemVsSolution from './SPCProblemVsSolution';
import Temparquettisti from './Temparquettisti';

const COMPONENT_MAP = {
  Hero: ServiceHero,
  HeroHome: ServiceHeroHome,
  Temparquettisti: Temparquettisti,
  RecentWorks: RecentWorks,
  ServiceFAQ: ServiceFAQ,
  ServiceDescription: ServiceDescription,
  InstallationQuiz: InstallationQuiz,
  ServicePainPoints: ServicePainPoints,
  ServiceExplainerSection: ServiceExplainerSection,
  ServicePainVsSolution: ServicePainVsSolution,
  SPCProblemVsSolution: SPCProblemVsSolution,
};

function ServicePageLayout({ service }) {
  if (!service) return null;

  const layout = service.layout || [
    { type: 'Hero' },
    { type: 'ServiceDescription' }
  ];

  return (
    <div className="service-page-builder">
      {layout.map((block, index) => {
        const Component = COMPONENT_MAP[block.type];
        
        // Se il componente non esiste nella mappa, lo saltiamo senza rompere tutto
        if (!Component) {
          console.error(`Componente non trovato: ${block.type}`);
          return null;
        }

        let componentProps = { service, conversionId: service.conversionId, ...block.props };

        return (
          <section key={`${block.type}-${index}`} className="block-section">
            <Component {...componentProps} />
          </section>
        );
      })}
    </div>
  );
}

export default ServicePageLayout;