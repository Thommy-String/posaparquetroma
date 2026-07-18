import React, { useState, useMemo } from 'react';
import { pricingData } from '../utils/pricingData'; 
import { PHONE_NUMBER } from '../utils/constants';
import ProcessModal from './ProcessModal';
import PricingCard from './PricingCard';
import SummaryTable from './SummaryTable';
import ExtraServiceModal from './ExtraServiceModal'; // <--- IMPORTA IL NUOVO MODAL

// Importiamo Icone
import { 
  Layers, Wrench, LayoutGrid, PlusCircle, 
  Truck, Trash2, Disc, Paintbrush, Waves, Move, ShieldCheck
} from 'lucide-react';

// --- DEFINIZIONE DEGLI EXTRA CON DESCRIZIONI ---
const EXTRA_SERVICES = [
  // PREPARAZIONE
  { 
    id: 'ex_rip', name: 'Demolizione Vecchio Pavimento', price: '15-25', unit: 'mq', isExtra: true, icon: <Trash2 className="w-5 h-5 text-red-400" />,
    details: "Rimozione e smaltimento del vecchio pavimento (piastrelle, parquet, laminato). Preparazione del fondo: pulizia, livellamento e verifica umidità del massetto."
  },
  { 
    id: 'ex_ras', name: 'Rasatura e Livellamento Massetto', price: '8-12', unit: 'mq', isExtra: true, icon: <Waves className="w-5 h-5 text-blue-400" />,
    details: "Stesura di autolivellante o malta di livellamento per correggere pendenze e dislivelli. Fondamentale per posa incollata o per SPC/laminato in ambienti critici."
  },
  { 
    id: 'ex_prm', name: 'Verifica Umidità e Priming', price: '5-8', unit: 'mq', isExtra: true, icon: <Paintbrush className="w-5 h-5 text-yellow-500" />,
    details: "Misurazione umidità massetto con strumenti professionali. Se necessario, applicazione di primer o barriera vapore per proteggere il pavimento da risalite d\'umidità."
  },

  // ACCESSORI E FINITURE
  { 
    id: 'ex_bat', name: 'Posa Battiscopa', price: '8-12', unit: 'ml', isExtra: true, icon: <Disc className="w-5 h-5 text-gray-500" />,
    details: "Posa del battiscopa con tagli a 45° negli angoli e sigillatura con silicone acrilico. Finiture zero-gap per effetto professionale e duraturo."
  },
  { 
    id: 'ex_soglia', name: 'Profili di Soglia e Dilatazione', price: '20-30', unit: 'cad.', isExtra: true, icon: <Move className="w-5 h-5 text-green-600" />,
    details: "Installazione di profili in alluminio o PVC alle soglie, negli accessi e nei punti di dilatazione. Proteggono i bordi e permettono la corretta dilatazione del materiale."
  },

  // EXTRA LAVORAZIONE
  { 
    id: 'ex_posa', name: 'Posa a Spina o Personalizzata', price: '+8-15', unit: 'mq', isExtra: true, icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    details: "Posa con pattern decorativo (spina italiana, spina francese, 2 strisce). Richiede tracciatura laser e tagli millimetrici. Prezzo aggiunto alla posa standard."
  },
  { 
    id: 'ex_sca', name: 'Rivestimento Scale', price: '150-300', unit: 'totale', isExtra: true, icon: <Truck className="w-5 h-5 text-orange-500" />,
    details: "Rivestimento completo scala con tagli su misura, profili antiscivolo certificati e sigillatura degli angoli. Lavoro di precisione millimetrica, ogni gradino è unico."
  },
  { 
    id: 'ex_taglio', name: 'Tagli Porte e Passaggi', price: '30-60', unit: 'totale', isExtra: true, icon: <Wrench className="w-5 h-5 text-indigo-500" />,
    details: "Taglio della base degli stipiti per far scorrere il pavimento senza ostacoli. Finitura pulita e professionale per passaggi da una stanza all\'altra."
  },
];

const CATEGORIES = [
  { id: 'spc', label: 'SPC / Vinilico', icon: <Layers className="w-4 h-4"/> },
  { id: 'laminato', label: 'Laminato', icon: <Waves className="w-4 h-4"/> },
  { id: 'prefinito', label: 'Parquet Prefinito', icon: <LayoutGrid className="w-4 h-4"/> },
  { id: 'extra', label: 'Extra & Accessori', icon: <PlusCircle className="w-4 h-4"/> },
  { id: 'all', label: 'Tutti', icon: <Wrench className="w-4 h-4"/> },
];

const getCategory = (service) => {
  const id = service.id?.toLowerCase();
  if (id?.includes('spc') || id?.includes('vinilico')) return 'spc';
  if (id?.includes('laminato')) return 'laminato';
  if (id?.includes('prefinito')) return 'prefinito';
  return 'prefinito'; // default
};

function PricingSection({ defaultCategory = 'all', conversionId }) {
  const [selectedService, setSelectedService] = useState(null); // Per i servizi standard (Calcolatore)
  const [selectedExtra, setSelectedExtra] = useState(null);     // Per gli extra (Popup info)
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const filteredData = useMemo(() => {
    if (activeCategory === 'extra') return EXTRA_SERVICES;
    if (activeCategory === 'all') return pricingData;
    return pricingData.filter(service => getCategory(service) === activeCategory);
  }, [activeCategory]);

  // Gestore click unificato
  const handleRowClick = (item) => {
    if (item.isExtra) {
      // Se è extra apre il nuovo modal
      setSelectedExtra(item);
    } else {
      // Se è standard scorre alla card
      setTimeout(() => {
        const element = document.getElementById(`card-${item.id}`);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#F5F5F7]">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Listino prezzi posa parquet 2026
          </h2>
          <p className="text-gray-700">
            Scegli il tipo di pavimento per vedere i costi dettagliati e le lavorazioni extra.
          </p>
        </div>

        {/* MENU FILTRI */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap items-center justify-center bg-gray-200/60 p-1.5 rounded-2xl gap-2 backdrop-blur-md"> 
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ease-out
                    ${isActive 
                      ? 'bg-white text-gray-900 shadow-md transform scale-[1.02]' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/50'}
                  `}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* TABELLA RIASSUNTIVA */}
        <SummaryTable 
            data={filteredData} 
            onRowClick={handleRowClick} 
        />

        {/* GRIGLIA CARD (Solo standard) */}
        {activeCategory !== 'extra' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map((service) => (
               <div id={`card-${service.id}`} key={service.id}>
                  <PricingCard 
                    service={service} 
                    onShowProcessClick={setSelectedService} 
                    conversionId={conversionId}
                  />
               </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
             <p className="text-gray-600 text-sm">
               Clicca sulle voci sopra per vedere i dettagli di ogni servizio extra e accessorio.
             </p>
          </div>
        )}

      </div>

      {/* MODAL SERVIZI STANDARD (Calcolatore) */}
      <ProcessModal service={selectedService} onClose={() => setSelectedService(null)} />

      {/* MODAL SERVIZI EXTRA (Info) */}
      <ExtraServiceModal service={selectedExtra} onClose={() => setSelectedExtra(null)} />

    </section>
  );
}

export default PricingSection;