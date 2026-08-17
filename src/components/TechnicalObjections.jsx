import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { track } from '../utils/analytics';

export default function TechnicalObjections({ objections }) {
  const [openId, setOpenId] = useState(null);

  if (!objections || objections.length === 0) return null;

  const toggle = (id) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next) {
      track('objection_expand', { objection_id: id });
    }
  };

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
            Le domande che ti stai facendo
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Risposte oneste, con numeri veri.
          </p>
        </div>

        <div className="space-y-4">
          {objections.map((obj) => (
            <div
              key={obj.id}
              className="bg-white border-[2.5px] border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggle(obj.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-base font-black text-slate-900 pr-4 leading-snug">
                  {obj.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openId === obj.id ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openId === obj.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {obj.answer}
                    </p>

                    {obj.thicknesses && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {obj.thicknesses.map((t) => (
                          <span
                            key={t.material}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-700"
                          >
                            {t.material}
                            <span className="text-slate-400">|</span>
                            <span className="text-slate-900">{t.thickness}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}