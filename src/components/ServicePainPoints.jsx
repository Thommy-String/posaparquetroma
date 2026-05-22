import React from 'react';
import { ShieldOff, Sofa, BadgeEuro } from 'lucide-react';

// Sezione Pain → Dream per SPC e Laminato — Copy Premium/Autorevole
const PAIN_POINTS = {
  'spc': [
    {
      icon: ShieldOff,
      number: '01',
      tag: 'Zero demolizioni',
      headline: 'Direttamente sul vecchio pavimento.',
      body: 'L\'SPC si installa direttamente sopra piastrelle, gres o marmo. Nessuna demolizione, nessun calcinaccio.',
      stat: 'Calpestabile subito',
      accentColor: 'amber',
    },
    {
      icon: Sofa,
      number: '02',
      tag: 'Anche con mobili',
      headline: 'Ai tuoi mobili ci pensiamo noi.',
      body: 'Spostiamo ogni elemento stanza per stanza e rimettiamo tutto al suo posto. Tu non alzi un dito.',
      stat: 'Non devi andare in hotel',
      accentColor: 'blue',
    },
    {
      icon: BadgeEuro,
      number: '03',
      tag: 'Prezzo Blindato',
      headline: 'Nessun acconto.',
      body: 'Preventivo precisi al centesimo. Il prezzo che vedi è il prezzo che paghi — dopo aver verificato il risultato alla fine di ogni giornata.',
      stat: '€0 anticipati',
      accentColor: 'emerald',
    },
  ],
  'laminato': [
    {
      icon: ShieldOff,
      number: '01',
      tag: 'Tecnologia Invisibile',
      headline: 'Le piastrelle restano lì. Il laminato le copre.',
      body: 'Niente demolizioni, niente polvere. Il nuovo pavimento si posa sopra quello esistente in 1-2 giorni.',
      stat: 'Pronto in 48 ore',
      accentColor: 'amber',
    },
    {
      icon: Sofa,
      number: '02',
      tag: 'Casa Abitata, Zero Stress',
      headline: 'Mobili pesanti? Non è un tuo problema.',
      body: 'Lavoriamo stanza per stanza: spostiamo tutto, posiamo, rimettiamo ogni cosa al suo posto.',
      stat: 'Vita quotidiana invariata',
      accentColor: 'blue',
    },
    {
      icon: BadgeEuro,
      number: '03',
      tag: 'Prezzo Blindato',
      headline: 'Il prezzo non cambia. Mai.',
      body: 'Preventivo vincolante. Nessun acconto, nessuna sorpresa. Paghi solo una parte dopo l\'inizio della posa.',
      stat: '€0 anticipati',
      accentColor: 'emerald',
    },
  ],
};

// Accent color map for pain point cards
const ACCENT_MAP = {
  amber:   { gradient: 'from-amber-400 to-amber-500', border: 'border-amber-400/40', borderSolid: 'border-amber-400/70', iconBg: 'bg-amber-400/10', iconText: 'text-amber-400', tagBg: 'bg-amber-400/10', tagText: 'text-amber-300', statBg: 'bg-amber-400/10', statText: 'text-amber-300', numText: 'text-amber-400/20', glowBg: 'bg-amber-400/5' },
  blue:    { gradient: 'from-blue-400 to-blue-500', border: 'border-blue-400/40', borderSolid: 'border-blue-400/70', iconBg: 'bg-blue-400/10', iconText: 'text-blue-400', tagBg: 'bg-blue-400/10', tagText: 'text-blue-300', statBg: 'bg-blue-400/10', statText: 'text-blue-300', numText: 'text-blue-400/20', glowBg: 'bg-blue-400/5' },
  emerald: { gradient: 'from-emerald-400 to-emerald-500', border: 'border-emerald-400/40', borderSolid: 'border-emerald-400/70', iconBg: 'bg-emerald-400/10', iconText: 'text-emerald-400', tagBg: 'bg-emerald-400/10', tagText: 'text-emerald-300', statBg: 'bg-emerald-400/10', statText: 'text-emerald-300', numText: 'text-emerald-400/20', glowBg: 'bg-emerald-400/5' },
};

const ServicePainPoints = ({ service }) => {
  if (!service || !service.pricingId) return null;

  // Get the pain points for this service's pricingId
  const points = PAIN_POINTS[service.pricingId];
  if (!points || points.length === 0) return null;

  return (
    <div className="w-full bg-[#111111] py-14 px-4 relative z-10 overflow-hidden">
      {/* Sottile glow decorativo in alto */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="max-w-md mx-auto">
        {/* Section header — premium feel */}
        <div className="text-center mb-10">
          <p className="text-[10px] font-bold text-white/25 uppercase tracking-[0.3em] mb-3">
            Come lavoriamo
          </p>
          <h3 className="text-[22px] md:text-[26px] font-[800] text-white leading-tight tracking-tight">
            Tre garanzie.<br />
            <span className="text-white/40">Nessuna in piccolo.</span>
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          {points.map((point, i) => {
            const Icon = point.icon;
            const a = ACCENT_MAP[point.accentColor] || ACCENT_MAP.amber;
            return (
              <div
                key={i}
                className={`
                  relative rounded-2xl border-2 border-dashed ${a.border}
                  bg-white/[0.02] backdrop-blur-sm
                  p-5 pt-4 text-left
                  transition-all duration-300
                  hover:bg-white/[0.05] hover:border-solid hover:${a.borderSolid}
                  group
                `}
              >
                {/* Glow decorativo nell'angolo — molto sottile */}
                <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full ${a.glowBg} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Riga superiore: numero + tag */}
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[28px] md:text-[32px] font-[900] ${a.numText} leading-none tracking-tighter select-none`}>
                    {point.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-lg ${a.iconBg} flex items-center justify-center`}>
                      <Icon size={13} className={a.iconText} strokeWidth={2.5} />
                    </div>
                    <span className={`text-[9px] ${a.tagText} font-bold uppercase tracking-[0.15em]`}>
                      {point.tag}
                    </span>
                  </div>
                </div>

                {/* Headline — grande, impattante */}
                <p className="text-[17px] md:text-[19px] font-[800] text-white/95 leading-[1.2] tracking-tight mb-2">
                  {point.headline}
                </p>

                {/* Body — spiegazione calma */}
                <p className="text-[13px] md:text-[14px] text-white/45 leading-relaxed tracking-tight mb-3">
                  {point.body}
                </p>

                {/* Stat chip */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${a.statBg} border border-white/[0.06]`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${a.gradient}`} />
                  <span className={`text-[10px] font-bold ${a.statText} uppercase tracking-widest`}>
                    {point.stat}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Divider sottile */}
        <div className="flex items-center justify-center my-10">
          <div className="w-8 h-px bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/15 mx-3" />
          <div className="w-8 h-px bg-white/10" />
        </div>

        {/* CTA — bottone bianco su dark */}
        <div className="flex justify-center mb-3 relative">
          <a
            href="https://wa.me/393342221212"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window.gtag_report_conversion === 'function') {
                window.gtag_report_conversion();
              }
            }}
            className="
              group relative inline-flex items-center gap-4
              bg-white border-[2.5px] border-white 
              px-8 py-4 rounded-xl
              text-slate-900 font-black uppercase tracking-tighter
              transition-all duration-200
              shadow-[6px_6px_0px_0px_rgba(255,255,255,0.15)]
              hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]
              hover:translate-x-1 hover:translate-y-1
              active:bg-gray-100
            "
          >
            <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.257-.154-2.874.854.854-2.874-.154-.257A8 8 0 1112 20z" fill="#25D366"/>
              </svg>
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] text-green-600 font-bold mb-1 tracking-widest uppercase">Rispondiamo in 4 min</span>
              <span className="text-xl md:text-2xl italic">Scrivici su WhatsApp</span>
            </div>
          </a>
        </div>
        {/* Micro rassicurazione */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-tighter text-white/25 underline decoration-white/8 underline-offset-4">Senza impegno · Preventivo gratis</span>
        </div>
      </div>

      {/* Sottile glow decorativo in basso */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};

export default ServicePainPoints;
