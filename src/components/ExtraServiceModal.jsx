import React from 'react';
import { ArrowUpRight, ShieldCheck, Info } from 'lucide-react';

function ExtraServiceModal({ service, onClose }) {
  if (!service) return null;

  // LOGICA DI ADATTAMENTO DATI
  // Se il servizio ha già "sections" (es. SPC, Laminato), usiamo quelle.
  // Se è un EXTRA (che ha "details"), creiamo una sezione fittizia per il layout Bento.
  const displaySections = service.sections || [
    {
      id: '01',
      title: 'Dettagli Servizio',
      description: service.details || "Informazione non disponibile",
      detail: `Tariffa: ${service.price}€ / ${service.unit}`,
      icon: '💡',
      size: 'big'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Overlay per chiudere cliccando fuori */}
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-[#F5F5F7] w-full max-w-5xl rounded-[3rem] overflow-hidden relative shadow-2xl my-auto animate-in fade-in zoom-in duration-300">
        
        {/* Bottone Chiudi */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
        >
          <ArrowUpRight className="rotate-45" size={24} />
        </button>

        <section className="py-16 px-6 md:px-12 font-sans">
          <div className="max-w-6xl mx-auto">
            
            {/* Header */}
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 text-blue-600 mb-4">
                 <ShieldCheck size={20} />
                 <span className="text-xs font-black uppercase tracking-[0.2em]">Scheda Tecnica roma</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-tight">
                {service.name || service.title}<br/>
                <span className="text-slate-400 font-medium text-2xl md:text-3xl italic">Lavorazione Professionale</span>
              </h2>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {displaySections.map((item, idx) => {
                // Supporto per i vecchi dati (paragraphs) se presenti
                const desc = item.description || (item.paragraphs && item.paragraphs[0]);
                const det = item.detail || (item.bullets && item.bullets[0]?.label) || "Servizio Certificato";

                return (
                  <div 
                    key={idx}
                    className={`group relative overflow-hidden rounded-[2.5rem] bg-white p-8 md:p-10 border border-slate-100 flex flex-col justify-between transition-all duration-500 hover:shadow-xl ${
                      item.size === 'big' ? 'md:col-span-2' : 'md:col-span-1'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="text-3xl bg-slate-50 w-16 h-16 flex items-center justify-center rounded-2xl border border-slate-100">
                        {item.icon || "🛠️"}
                      </div>
                      <span className="text-slate-100 font-mono text-xl font-bold italic">/{item.id || idx + 1}</span>
                    </div>

                    <div className="mt-12">
                      <h3 className="text-2xl font-bold text-black tracking-tight mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-lg leading-snug mb-6">
                        {desc}
                      </p>
                      <div className="pt-5 border-t border-slate-50">
                        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                          <div className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />
                          {det}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer CTA */}
            <div className="mt-12 flex flex-col items-center">
               <button 
                onClick={onClose}
                className="group flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-bold text-lg transition-all hover:bg-slate-800"
               >
                  Ho capito, chiudi
                  <ArrowUpRight size={20} className="opacity-50 group-hover:opacity-100" />
               </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ExtraServiceModal;