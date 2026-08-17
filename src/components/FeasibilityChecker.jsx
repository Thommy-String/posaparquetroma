import { useState } from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import { track } from '../utils/analytics';

const verdictConfig = {
  yes: {
    icon: Check,
    bg: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-emerald-500',
    text: 'text-emerald-800',
    label: 'Sì, si può fare',
  },
  maybe: {
    icon: AlertTriangle,
    bg: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-amber-500',
    text: 'text-amber-800',
    label: 'Dipende',
  },
  no: {
    icon: X,
    bg: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-500',
    text: 'text-red-800',
    label: 'No',
  },
};

export default function FeasibilityChecker({ data }) {
  const [selected, setSelected] = useState(null);

  if (!data) return null;

  const handleSelect = (floorType) => {
    setSelected(floorType.id);
    track('feasibility_check', { floor_type: floorType.id });
  };

  const selectedType = data.floorTypes.find((ft) => ft.id === selected);
  const config = selectedType ? verdictConfig[selectedType.verdict] : null;
  const Icon = config?.icon;

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
            {data.title}
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">{data.subtitle}</p>
        </div>

        {/* Griglia opzioni pavimento */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {data.floorTypes.map((ft) => (
            <button
              key={ft.id}
              onClick={() => handleSelect(ft)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-[2.5px] transition-all duration-200 text-center ${
                selected === ft.id
                  ? 'border-slate-900 bg-slate-50 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] -translate-x-0.5 -translate-y-0.5'
                  : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,0.2)]'
              }`}
            >
              <span className="text-2xl">{ft.icon}</span>
              <span className="text-xs font-bold text-slate-700 leading-tight">{ft.label}</span>
            </button>
          ))}
        </div>

        {/* Risultato */}
        {selectedType && config && (
          <div
            className={`${config.bg} border-[2.5px] rounded-2xl p-5 animate-in fade-in slide-in-from-top-4 duration-300`}
          >
            <div className="flex items-start gap-3">
              <div className={`${config.iconBg} p-2 rounded-lg flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <div>
                <p className={`text-lg font-black ${config.text}`}>{selectedType.response}</p>
                <p className="text-sm text-slate-700 mt-1.5 leading-relaxed font-medium">
                  {selectedType.explanation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}