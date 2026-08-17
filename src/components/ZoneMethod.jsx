import { MapPin } from 'lucide-react';

export default function ZoneMethod({ data }) {
  if (!data) return null;

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
            {data.title}
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">{data.subtitle}</p>
        </div>

        <div className="space-y-4">
          {data.steps.map((step, i) => (
            <div
              key={i}
              className="bg-white border-[3px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,0.8)]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-600 border-[2.5px] border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <span className="text-sm font-black text-slate-900 uppercase">{step.zone}</span>
                  <span className="block text-xs text-slate-500 font-medium">{step.description}</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{step.detail}</p>
            </div>
          ))}
        </div>

        {data.note && (
          <p className="text-xs text-slate-500 mt-5 leading-relaxed text-center font-medium">
            {data.note}
          </p>
        )}
      </div>
    </section>
  );
}