import { Check, X } from 'lucide-react';

export default function WherePossible({ data }) {
  if (!data) return null;

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
            {data.title}
          </h2>
        </div>

        <div className="space-y-2">
          {data.items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 p-4 rounded-xl border-[2.5px] ${
                item.possible
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : 'border-red-200 bg-red-50/50'
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  item.possible ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              >
                {item.possible ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                ) : (
                  <X className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-black text-slate-900">{item.room}</span>
                {item.note && (
                  <span className="text-xs text-slate-500 ml-2 font-medium">{item.note}</span>
                )}
              </div>
              <span
                className={`text-xs font-black uppercase ${
                  item.possible ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {item.possible ? 'Sì' : 'No'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}