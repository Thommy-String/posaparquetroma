import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
  Check, X, ArrowRight, Phone, MessageCircle, Timer, Shield,
  Droplets, Volume2, Thermometer, Layers, Ruler, Home,
  ChevronDown, Star, Zap
} from 'lucide-react';
import RecentWorks from '../components/RecentWorks';
import { PHONE_NUMBER } from '../utils/constants';

// Video & image assets
const heroVideo = '/videos/parquet/posaSpc.mp4';
import parquetSPC from '../assets/images/parquet/parquetSPC.webp';
import parquetSPCspina from '../assets/images/parquet/parquetSPCspina.webp';

// ─── DATI CONFRONTO PAVIMENTI (card-based, pros/cons) ───
const FLOORING_COMPARISON = [
  {
    type: 'SPC',
    label: 'Vinilico Rigido',
    price: '€35–60/mq',
    posa: '€17–25/mq',
    highlight: true,
    emoji: '👑',
    pros: ['100% impermeabile', 'Si posa sopra piastrelle', 'Pronto in 1–2 giorni', 'Sottile (4–6 mm)'],
    cons: ['Non è vero legno', 'Scelta estetica più limitata'],
    verdict: 'Il miglior rapporto qualità/prezzo per ristrutturare senza demolire.',
    bg: 'bg-yellow-50', border: 'border-black', shadow: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]', badge: 'bg-green-500',
  },
  {
    type: 'Laminato',
    label: 'Economico',
    price: '€25–47/mq',
    posa: '€17–22/mq',
    highlight: false,
    emoji: '💶',
    pros: ['Il più economico', 'Si posa a click', 'Tante fantasie'],
    cons: ['NON impermeabile', 'Si gonfia con acqua', 'Meno resistente agli urti'],
    verdict: 'Buono per budget ridotti, ma attenzione all\'umidità.',
    bg: 'bg-white', border: 'border-black/15', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]', badge: null,
  },
  {
    type: 'Prefinito',
    label: 'Legno Vero',
    price: '€60–115/mq',
    posa: '€25–35/mq',
    highlight: false,
    emoji: '🪵',
    pros: ['Vero legno naturale', 'Si può levigare', 'Valore dell\'immobile'],
    cons: ['Costa il doppio dell\'SPC', 'Serve demolire il vecchio', 'Tempi: 3–5 giorni'],
    verdict: 'Il top per chi vuole legno vero e ha budget alto.',
    bg: 'bg-white', border: 'border-black/15', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]', badge: null,
  },
  {
    type: 'Gres',
    label: 'Porcellanato',
    price: '€55–115/mq',
    posa: '€35–55/mq',
    highlight: false,
    emoji: '🧱',
    pros: ['Impermeabile', 'Durata quasi illimitata', 'Indistruttibile'],
    cons: ['Posa costosa e lunga', 'Serve demolire il vecchio', 'Tempi: 5–10 giorni', 'Freddo al tatto'],
    verdict: 'Dura una vita, ma la posa costa e richiede demolizione.',
    bg: 'bg-white', border: 'border-black/15', shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,0.08)]', badge: null,
  },
];

// ─── DATI VANTAGGI ───
const ADVANTAGES = [
  {
    icon: Droplets,
    title: '100% Impermeabile',
    description: 'A differenza del laminato e del parquet, l\'SPC è completamente waterproof. Perfetto per bagni, cucine e lavanderie.',
    color: 'bg-blue-50 text-blue-600 border-blue-100',
  },
  {
    icon: Layers,
    title: 'Si posa sopra tutto',
    description: 'Piastrelle, gres, cemento, vecchio parquet — non serve demolire nulla. Il click si aggancia sopra il pavimento esistente.',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    icon: Timer,
    title: 'Pronto in 1–2 giorni',
    description: 'Una stanza media si posa in mezza giornata. Un appartamento intero in 1–2 giorni. Calpestabile subito, zero attese.',
    color: 'bg-green-50 text-green-600 border-green-100',
  },
  {
    icon: Volume2,
    title: 'Silenzioso al calpestio',
    description: 'Il nucleo in pietra calcarea + materassino integrato garantisce comfort acustico superiore al laminato.',
    color: 'bg-violet-50 text-violet-600 border-violet-100',
  },
  {
    icon: Thermometer,
    title: 'Compatibile riscaldamento a pavimento',
    description: 'Lo spessore ridotto (4–6mm) e la stabilità dimensionale lo rendono ideale su impianti radianti.',
    color: 'bg-red-50 text-red-600 border-red-100',
  },
  {
    icon: Shield,
    title: 'Resistente a graffi e urti',
    description: 'Lo strato protettivo in PUR resiste a tacchi, zampe di animali, sedie con rotelle e cadute di oggetti.',
    color: 'bg-slate-50 text-slate-600 border-slate-200',
  },
];

// ─── DATI FAQ ───
const FAQ_DATA = [
  {
    q: 'Si può mettere il parquet SPC sopra le piastrelle?',
    a: 'Sì, è proprio il vantaggio principale dell\'SPC. Si posa a click direttamente sulle piastrelle esistenti senza demolire nulla. Basta che il pavimento sia planare (max 2mm di dislivello ogni 2 metri). Se ci sono fughe profonde, si usa un materassino compensatore.',
  },
  {
    q: 'Quanto costa posare l\'SPC al metro quadro in Lombardia?',
    a: 'Il costo della sola posa in opera varia da €17/mq (posa dritta) a €25/mq (posa a spina). Il materiale SPC di buona qualità costa €18–35/mq. In totale, per un appartamento di 70mq con posa dritta, si spendono circa €2.450–4.200 tutto incluso.',
  },
  {
    q: 'SPC o laminato: quale scegliere?',
    a: 'L\'SPC è superiore al laminato sotto quasi ogni aspetto: è 100% impermeabile (il laminato si gonfia con l\'acqua), più stabile, più silenzioso e più sottile. Costa leggermente di più, ma la differenza di durabilità è enorme. Se hai animali, bambini o zone umide, l\'SPC è la scelta giusta.',
  },
  {
    q: 'L\'SPC va bene in bagno e in cucina?',
    a: 'Assolutamente sì. Essendo impermeabile al 100%, l\'SPC è perfetto per bagni, cucine, lavanderie e qualsiasi ambiente soggetto a schizzi d\'acqua. Nessun altro pavimento in legno/simil-legno offre questa garanzia.',
  },
  {
    q: 'Si può posare l\'SPC su riscaldamento a pavimento?',
    a: 'Sì, l\'SPC è compatibile con il riscaldamento a pavimento. Lo spessore ridotto (4–6mm) permette un\'ottima trasmissione del calore. Basta rispettare una temperatura massima di 28°C sulla superficie.',
  },
  {
    q: 'Quanto dura un pavimento in SPC?',
    a: 'Un buon SPC con strato d\'usura da 0.5mm dura 15–25 anni in ambito residenziale. I modelli commerciali con strato da 0.7mm superano i 25 anni. È molto più resistente del laminato nel lungo periodo.',
  },
  {
    q: 'Si può posare SPC con i mobili in casa?',
    a: 'Sì. Spostiamo i mobili stanza per stanza durante la posa e li rimettiamo a posto. Non serve svuotare l\'intera casa. È uno dei vantaggi principali rispetto alla posa di piastrelle o parquet tradizionale.',
  },
];

// ─── FAQ COMPONENT ───
const FAQItem = ({ q, a, isOpen, onToggle }) => (
  <div className="border-b-2 border-black/10 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 px-1 text-left group"
    >
      <span className="text-[15px] md:text-[17px] font-bold text-black leading-snug pr-4">{q}</span>
      <ChevronDown
        className={`w-5 h-5 text-black/40 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        strokeWidth={2.5}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-5' : 'max-h-0 opacity-0'}`}
    >
      <p className="text-[14px] md:text-[15px] text-slate-600 font-medium leading-relaxed px-1">
        {a}
      </p>
    </div>
  </div>
);

// ─── STEP INSTALLAZIONE ───
const INSTALL_STEPS = [
  {
    step: '01',
    title: 'Preparazione del fondo',
    description: 'Verifichiamo la planarità del pavimento esistente. Se necessario, compensiamo con un materassino isolante. Nessuna demolizione.',
    accent: 'bg-yellow-50 border-yellow-200',
  },
  {
    step: '02',
    title: 'Posa a click senza colla',
    description: 'Le doghe SPC si incastrano tra loro con un sistema a click brevettato. Nessuna colla, nessun odore, nessuna attesa.',
    accent: 'bg-green-50 border-green-200',
  },
  {
    step: '03',
    title: 'Finitura e consegna',
    description: 'Installiamo il battiscopa, tagliamo le porte se necessario e puliamo tutto. Il pavimento è calpestabile immediatamente.',
    accent: 'bg-blue-50 border-blue-200',
  },
];

// ═══════════════════════════════════════════
// ═══ COMPONENTE PAGINA ═══════════════════
// ═══════════════════════════════════════════
export default function SPCInfoPage() {
  const [openFaq, setOpenFaq] = React.useState(0);

  const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, '');

  return (
    <HelmetProvider>
      <Helmet>
        <title>Pavimento SPC: Guida Completa 2025 | Costi, Posa e Vantaggi — Milano</title>
        <meta name="description" content="Tutto quello che devi sapere sul pavimento SPC: cos'è, quanto costa al mq in Lombardia, come si installa, vantaggi vs laminato e parquet. Guida aggiornata 2025." />
        <link rel="canonical" href="https://www.posaparquetmilano.it/spcinfo" />
      </Helmet>

      {/* ═══════════════════════════════════════
           SEZIONE 1 — HERO COMPATTO + TOP 3 BENEFICI
           ═══════════════════════════════════════ */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden border-b-[3px] border-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* LEFT: Headline + CTA */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1.5 bg-orange-100 border border-orange-200 rounded-[11px] mb-4 md:mb-6">
              <span className="text-[11px] font-bold tracking-tight text-orange-700">Nuovo 2026!</span>
            </div>

            <h1 className="font-[900] uppercase leading-tight tracking-tighter text-white text-[28px] md:text-[42px] mb-4">
              Pavimento{' '}
              <span className="bg-yellow-400/90 text-black px-2 py-0.5 transform -rotate-1 inline-block border border-yellow-300 rounded-sm">
                SPC
              </span>
              <br />
              <span className="text-green-400">Sopra le piastrelle</span>
            </h1>

            <p className="text-[14px] md:text-[16px] text-white/80 font-semibold leading-relaxed max-w-md mb-6 md:mb-8">
              Nessuna demolizione. Posa in 1–2 giorni. Impermeabile al 100%.
            </p>

            {/* CTA Button */}
            <a
              href="#confronto"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-tighter px-6 md:px-8 py-3 rounded-lg shadow-lg transition-all duration-200"
            >
              Vedi i prezzi
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" strokeWidth={3} />
            </a>
          </div>

          {/* RIGHT: Top 3 Benefit Cards */}
          <div className="flex-1 grid grid-cols-1 gap-3 md:gap-4">
            {[
              { emoji: '✅', title: 'Su pavimento esistente', desc: 'Piastrelle, gres, cemento — niente demolizione' },
              { emoji: '⚡', title: 'Pronto in 1–2 giorni', desc: 'Calpestabile subito. Niente attese.' },
              { emoji: '💧', title: '100% impermeabile', desc: 'Perfetto per bagni e cucine.' },
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 md:p-4 text-white text-left"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl shrink-0">{benefit.emoji}</span>
                  <div>
                    <div className="font-[900] text-[13px] md:text-[14px] uppercase tracking-tight leading-tight mb-0.5">
                      {benefit.title}
                    </div>
                    <p className="text-[11px] md:text-[12px] text-white/70 font-medium">{benefit.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SEZIONE 1B — INFO TABELLA (Costs & Timeline)
           ═══════════════════════════════════════ */}
      <section id="confronto" className="bg-gradient-to-b from-slate-900 to-slate-800 py-12 md:py-16 px-4 border-b-[3px] border-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-white font-[900] uppercase text-[20px] md:text-[28px] tracking-tight mb-8 text-center">
            📊 Info rapide su SPC
          </h2>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Costo materiale', value: '€18–35/mq', desc: 'SPC di buona qualità' },
              { label: 'Costo posa', value: '€17–25/mq', desc: 'Posa dritta o spina' },
              { label: 'Totale per 70 mq', value: '€2.450–4.200', desc: 'Materiale + manodopera' },
            ].map((info, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center text-white"
              >
                <span className="text-white/60 text-[12px] font-bold uppercase tracking-wider block mb-2">
                  {info.label}
                </span>
                <span className="text-[28px] md:text-[32px] font-[900] block mb-1">{info.value}</span>
                <p className="text-white/70 text-[12px] font-medium">{info.desc}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji: '📋', title: 'Preventivo gratuito', time: '24–48 ore' },
              { emoji: '🔨', title: 'Posa del pavimento', time: '1–2 giorni' },
              { emoji: '✨', title: 'Consegna chiavi', time: 'Immediato' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                <span className="text-3xl">{step.emoji}</span>
                <div>
                  <div className="text-white font-bold text-[13px] uppercase tracking-tight">{step.title}</div>
                  <div className="text-green-300 text-[12px] font-semibold">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SEZIONE 2 — COS'È L'SPC (Ultra-breve)
           ═══════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20 px-4 border-b-[3px] border-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-black text-white px-4 py-1 uppercase font-black tracking-widest text-xs mb-5 rounded-md">
              In 30 secondi
            </div>
            <h2 className="text-[26px] md:text-[36px] font-[900] text-black leading-[1.05] tracking-tight uppercase">
              Cos'è il pavimento SPC?
            </h2>
          </div>

          <div className="bg-slate-50 border-[3px] border-black rounded-2xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[15px] md:text-[17px] text-slate-700 font-semibold leading-relaxed mb-6">
              <strong className="text-black">SPC</strong> sta per <em>Stone Plastic Composite</em>. È un pavimento vinilico di nuova generazione
              con un nucleo rigido in pietra calcarea + PVC, ricoperto da uno strato decorativo ad alta definizione
              che imita fedelmente il legno, il cemento o la pietra.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Spessore', value: '4–6 mm', icon: Ruler },
                { label: 'Impermeabile', value: '100%', icon: Droplets },
                { label: 'Posa', value: 'A click', icon: Layers },
                { label: 'Durata', value: '15–25 anni', icon: Shield },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex flex-col items-center bg-white border-2 border-black/10 rounded-xl px-3 py-4 text-center">
                  <Icon className="w-5 h-5 text-slate-400 mb-2" strokeWidth={2} />
                  <span className="text-[18px] font-[900] text-black leading-none tracking-tight">{value}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SEZIONE 3 — CONFRONTO PAVIMENTI (Cards)
           ═══════════════════════════════════════ */}
      <section className="bg-[#f4f4f0] py-16 md:py-20 px-4 border-b-[3px] border-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-black text-white px-4 py-1 uppercase font-black tracking-widest text-xs mb-5 rounded-md">
              Confronto Prezzi
            </div>
            <h2 className="text-[26px] md:text-[36px] font-[900] text-black leading-[1.05] tracking-tight uppercase">
              Quale pavimento{' '}
              <span className="bg-[#FFF176] px-1 border-b-[3px] border-black inline-block">fa per te</span>?
            </h2>
            <p className="mt-4 text-[15px] text-slate-600 font-semibold max-w-lg mx-auto">
              Prezzi medi in Lombardia ({new Date().getFullYear()}), materiale + manodopera inclusi.
            </p>
          </div>

          {/* CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FLOORING_COMPARISON.map((item) => (
              <div
                key={item.type}
                className={`relative flex flex-col rounded-2xl border-[3px] ${item.border} ${item.bg} ${item.shadow} p-5 md:p-6 transition-all duration-200`}
              >
                {/* "Consigliato" badge */}
                {item.badge && (
                  <div className={`absolute -top-3 right-4 ${item.badge} text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    ⚡ Consigliato
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <h3 className={`text-[18px] md:text-[20px] font-[900] uppercase tracking-tight leading-none ${item.highlight ? 'text-black' : 'text-slate-800'}`}>
                      {item.type}
                    </h3>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                </div>

                {/* Price strip */}
                <div className={`flex items-center justify-between rounded-xl px-4 py-3 mb-4 ${item.highlight ? 'bg-white border-2 border-black/10' : 'bg-slate-50 border-2 border-black/5'}`}>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Totale</span>
                    <span className={`text-[20px] font-[900] leading-tight ${item.highlight ? 'text-green-700' : 'text-slate-800'}`}>{item.price}</span>
                  </div>
                  <div className="h-8 w-px bg-black/10"></div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Solo posa</span>
                    <span className="text-[15px] font-bold text-slate-600">{item.posa}</span>
                  </div>
                </div>

                {/* Pros */}
                <div className="space-y-1.5 mb-3">
                  {item.pros.map((pro) => (
                    <div key={pro} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 shrink-0" strokeWidth={3} />
                      <span className="text-[13px] font-semibold text-slate-700">{pro}</span>
                    </div>
                  ))}
                </div>

                {/* Cons */}
                <div className="space-y-1.5 mb-4">
                  {item.cons.map((con) => (
                    <div key={con} className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400 shrink-0" strokeWidth={3} />
                      <span className="text-[13px] font-medium text-slate-500">{con}</span>
                    </div>
                  ))}
                </div>

                {/* Verdict */}
                <div className="mt-auto pt-3 border-t-2 border-black/5">
                  <p className={`text-[12px] font-bold leading-snug ${item.highlight ? 'text-green-700' : 'text-slate-500'}`}>
                    💡 {item.verdict}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-6">
            Prezzi indicativi medi in Lombardia • Materiale + manodopera
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SEZIONE 4 — COME SI INSTALLA
           ═══════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20 px-4 border-b-[3px] border-black">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-black text-white px-4 py-1 uppercase font-black tracking-widest text-xs mb-5 rounded-md">
              3 Fasi
            </div>
            <h2 className="text-[26px] md:text-[36px] font-[900] text-black leading-[1.05] tracking-tight uppercase">
              Come si installa{' '}
              <span className="bg-[#FFF176] px-1 border-b-[3px] border-black inline-block">l'SPC?</span>
            </h2>
          </div>

          <div className="space-y-4">
            {INSTALL_STEPS.map((s) => (
              <div
                key={s.step}
                className={`flex items-start gap-5 p-6 rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] ${s.accent}`}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-xl font-[900] text-lg shrink-0">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-[17px] font-[900] text-black uppercase tracking-tight mb-1">{s.title}</h3>
                  <p className="text-[14px] text-slate-600 font-semibold leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mini nota */}
          <div className="mt-8 text-center">
            <p className="text-[13px] text-slate-500 font-semibold">
              <Zap className="w-4 h-4 inline -mt-0.5 text-yellow-500" /> Un appartamento di 70mq si posa in 1–2 giorni. Calpestabile subito.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SEZIONE 5 — VANTAGGI APPROFONDITI
           ═══════════════════════════════════════ */}
      <section className="bg-[#f4f4f0] py-16 md:py-20 px-4 border-b-[3px] border-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-black text-white px-4 py-1 uppercase font-black tracking-widest text-xs mb-5 rounded-md">
              Perché SPC
            </div>
            <h2 className="text-[26px] md:text-[36px] font-[900] text-black leading-[1.05] tracking-tight uppercase">
              6 Vantaggi che lo rendono{' '}
              <span className="bg-[#A5D6A7] px-1 border-b-[3px] border-black inline-block">imbattibile</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.title}
                className={`flex flex-col p-5 rounded-2xl border-[2.5px] border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 transition-all duration-200`}
              >
                <div className={`w-10 h-10 rounded-xl ${adv.color} border-2 flex items-center justify-center mb-3`}>
                  <adv.icon className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className="text-[15px] font-[900] text-black uppercase tracking-tight mb-2">{adv.title}</h3>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SEZIONE 6 — FAQ (Top-of-funnel)
           ═══════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-20 px-4 border-b-[3px] border-black">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block bg-black text-white px-4 py-1 uppercase font-black tracking-widest text-xs mb-5 rounded-md">
              Domande Frequenti
            </div>
            <h2 className="text-[26px] md:text-[36px] font-[900] text-black leading-[1.05] tracking-tight uppercase">
              Le domande che{' '}
              <span className="bg-[#FFD180] px-1 border-b-[3px] border-black inline-block">tutti fanno</span>
            </h2>
          </div>

          <div className="border-[3px] border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white px-5 md:px-8 py-2">
            {FAQ_DATA.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>

          {/* Schema FAQ markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: FAQ_DATA.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SEZIONE 7 — RECENT WORKS (Solo SPC)
           ═══════════════════════════════════════ */}
      <RecentWorks category="spc" title="Lavori SPC reali con prezzi veri" />

      {/* ═══════════════════════════════════════
           SEZIONE 8 — CTA FINALE
           ═══════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24 px-4 border-b-[3px] border-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-yellow-50/80 blur-3xl"></div>
          <div className="absolute bottom-[10%] -left-[10%] w-[35%] h-[35%] rounded-full bg-green-50/60 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h2 className="font-[900] uppercase leading-none tracking-tighter text-slate-900 text-[28px] md:text-[48px] mb-6">
            Vuoi posare{' '}
            <span className="bg-yellow-50 text-yellow-900 px-2 py-0.5 transform -rotate-1 inline-block border border-yellow-100 rounded-sm">
              SPC
            </span>
            <br />
            <span className="text-green-600">senza demolire?</span>
          </h2>

          <p className="text-[15px] md:text-[17px] text-slate-600 font-semibold leading-relaxed max-w-lg mx-auto mb-10">
            Preventivo gratuito, prezzo bloccato, nessun acconto.
            Lavoriamo in tutta la Lombardia — anche con i mobili in casa.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Chiama */}
            <a
              href={`tel:+39${cleanPhone}`}
              className="group relative flex items-center gap-4 bg-blue-50 border-[2.5px] border-blue-900 px-8 py-4 rounded-xl text-blue-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(30,58,138,1)] hover:shadow-[2px_2px_0px_0px_rgba(30,58,138,1)] hover:translate-x-1 hover:translate-y-1 active:bg-blue-100"
            >
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Phone className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-blue-600 font-bold mb-1 tracking-widest uppercase">+39 {PHONE_NUMBER}</span>
                <span className="text-xl italic">Chiama ora</span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/39${cleanPhone}?text=${encodeURIComponent('Ciao, ho letto la guida SPC sul vostro sito e vorrei un preventivo gratuito per posare SPC a casa mia.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 bg-emerald-50 border-[2.5px] border-emerald-900 px-8 py-4 rounded-xl text-emerald-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(5,83,34,1)] hover:shadow-[2px_2px_0px_0px_rgba(5,83,34,1)] hover:translate-x-1 hover:translate-y-1 active:bg-emerald-100"
            >
              <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <MessageCircle className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-emerald-600 font-bold mb-1 tracking-widest uppercase">Online 24/7</span>
                <span className="text-xl italic">Scrivici su WhatsApp</span>
              </div>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['Preventivo gratuito', 'Nessun acconto', 'Prezzo bloccato'].map((t) => (
              <div key={t} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-green-500" strokeWidth={3} />
                <span className="text-[12px] font-bold text-slate-500">{t}</span>
              </div>
            ))}
          </div>

          {/* Google review mini */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black/10 rounded-full">
            <svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-[#fbbf24] text-[#fbbf24]" strokeWidth={0} />
              ))}
            </div>
            <span className="text-[11px] font-bold text-slate-500">5.0 su Google • 47+ recensioni</span>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
}
