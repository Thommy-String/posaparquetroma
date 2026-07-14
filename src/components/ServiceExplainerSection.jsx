import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Calculator } from 'lucide-react';

// --- Video paths (served from public/) ---
const posaSpcVideo = '/videos/parquet/posaSpc.mp4';
const posaLaminatoVideo = '/videos/parquet/posaLaminato.mp4';
const posaPrefinitoVideo = '/videos/parquet/posaPrefinitoIncollato.mp4';
const posaPrefinitoFlottanteVideo = '/videos/parquet/posaPrefinitoFlottante.mp4';
const posaPrefinitoSpinaVideo = '/videos/parquet/posaPrefinitoSpina.mp4';
const posaBattiscopaVideo = '/videos/parquet/posaBattiscopa.mp4';

import heroScale from '../assets/images/parquet/posaScala.webp';

function LazyVideo({ src, className }) {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const element = containerRef.current;
    if (!element || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

// --- Contenuto per ogni pricingId ---
const EXPLAINER_DATA = {
  'spc': {
    badge: 'Cos\'è l\'SPC',
    headline: (
      <>
        Il pavimento che <span className="bg-[#FFF176] px-1 border-b-[3px] border-black inline-block">copre il vecchio</span>{' '}
        senza demolizioni.
      </>
    ),
    intro: 'SPC è il pavimento in polvere di pietra a incastro click di nuova generazione. In Italia è diventato la scelta numero uno per chi vuole cambiare pavimento senza demolizioni, polvere o mesi di attesa.',
    steps: [
      {
        number: '01',
        color: 'bg-[#FFD180]',
        title: 'Direttamente sulle piastrelle',
        text: 'L\'SPC si posa a incastro click sopra qualsiasi pavimento esistente in buono stato. Nessuna colla, nessun martello pneumatico.',
      },
      {
        number: '02',
        color: 'bg-[#FFF59D]',
        title: '100% impermeabile',
        text: 'Nucleo in PVC rigido: resiste ad acqua, umidità e calpestio intenso. Perfetto per cucine, bagni e corridoi.',
      },
      {
        number: '03',
        color: 'bg-[#A5D6A7]',
        title: 'In 1-2 giorni è finito',
        text: 'Una stanza media si posa in mezza giornata. Calpestabile subito, senza tempi di asciugatura.',
      },
    ],
    media: { type: 'video', src: posaSpcVideo },
    accentBorder: 'border-[#81D4FA]',
  },
  'laminato': {
    badge: 'Cos\'è il Laminato',
    headline: (
      <>
        Resistente, economico.{' '}
        <span className="bg-[#FFF176] px-1 border-b-[3px] border-black inline-block">Subito pronto.</span>
      </>
    ),
    intro: 'Il pavimento laminato è composto da strati di HDF ad alta densità con un film decorativo in legno. Offre il look del parquet a un costo inferiore, con installazione rapidissima su qualsiasi fondo.',
    steps: [
      {
        number: '01',
        color: 'bg-[#FFD180]',
        title: 'Su materassino isolante',
        text: 'Posiamo un materassino fonoassorbente che riduce il rumore da calpestio e isola dal freddo. Poi il laminato si aggancia a click.',
      },
      {
        number: '02',
        color: 'bg-[#FFF59D]',
        title: 'Anche su pavimento esistente',
        text: 'Se il fondo è livellato, copriamo il vecchio pavimento direttamente. Zero demolizioni, zero polvere.',
      },
      {
        number: '03',
        color: 'bg-[#A5D6A7]',
        title: 'Resistenza AC4-AC5',
        text: 'I nostri laminati hanno classi di resistenza professionale: adatti anche ad uso commerciale leggero e case con animali.',
      },
    ],
    media: { type: 'video', src: posaLaminatoVideo },
    accentBorder: 'border-[#A5D6A7]',
  },
  'prefinito': {
    badge: 'Cos\'è il Prefinito',
    headline: (
      <>
        Legno vero,{' '}
        <span className="bg-[#FFD180] px-1 border-b-[3px] border-black inline-block">posa rapida.</span>
      </>
    ),
    intro: 'Il parquet prefinito è composto da uno strato nobile di legno massiccio (2-4mm) su un supporto multistrato. Unisce la bellezza del legno naturale alla stabilità dimensionale: non si deforma con il calore o l\'umidità.',
    steps: [
      {
        number: '01',
        color: 'bg-[#FFD180]',
        title: 'Analisi del massetto',
        text: 'Prima di posare, misuriamo umidità e planarità. Un massetto fuori norma causa scricchiolii e distacchi nel tempo.',
      },
      {
        number: '02',
        color: 'bg-[#FFF59D]',
        title: 'Incollaggio professionale',
        text: 'Usiamo collanti elastici EC1 certificati. Ogni tavola viene pressata e controllata. La resa finale è silenziosa e solida.',
      },
      {
        number: '03',
        color: 'bg-[#A5D6A7]',
        title: 'Calpestabile in 24h',
        text: 'Dopo la posa con colla, bastano 24 ore di attesa. Con la posa flottante è immediatamente calpestabile.',
      },
    ],
    media: { type: 'video', src: posaPrefinitoVideo },
    accentBorder: 'border-[#FFD180]',
  },
  'prefinito-flottante': {
    badge: 'Posa Flottante',
    headline: (
      <>
        Senza colla,{' '}
        <span className="bg-[#A5D6A7] px-1 border-b-[3px] border-black inline-block">senza demolizioni.</span>
      </>
    ),
    intro: 'La posa flottante è il metodo più veloce e pulito per posare un parquet prefinito. Le doghe si aganciano tra loro a click e "galleggiano" su un materassino tecnico senza essere incollate al fondo.',
    steps: [
      {
        number: '01',
        color: 'bg-[#FFD180]',
        title: 'Materassino tecnico',
        text: 'Stendiamo un materassino fonoassorbente e barriera a vapore. Isola termicamente e riduce il rumore da calpestio.',
      },
      {
        number: '02',
        color: 'bg-[#FFF59D]',
        title: 'Click su click',
        text: 'Ogni doga si aggancia alla precedente con un sistema a incastro. Veloci da posare, facili da smontare in futuro.',
      },
      {
        number: '03',
        color: 'bg-[#A5D6A7]',
        title: 'Pronto subito',
        text: 'Nessun tempo di attesa per la colla. Il pavimento flottante è calpestabile immediatamente dopo la posa.',
      },
    ],
    media: { type: 'video', src: posaPrefinitoFlottanteVideo },
    accentBorder: 'border-[#A5D6A7]',
  },
  'prefinito-spina': {
    badge: 'Posa a Spina',
    headline: (
      <>
        Geometria perfetta.{' '}
        <span className="bg-[#FFF59D] px-1 border-b-[3px] border-black inline-block">Effetto sartoriale.</span>
      </>
    ),
    intro: 'La posa a spina (italiana, francese o ungherese) è uno schema decorativo che trasforma il pavimento in un elemento di design. Ogni angolo richiede precisione millimetrica e una tracciatura laser preliminare.',
    steps: [
      {
        number: '01',
        color: 'bg-[#FFD180]',
        title: 'Tracciatura laser',
        text: 'Prima di posare la prima doga, tracciamo l\'asse di simmetria dell\'ambiente con livella laser. Da questo dipende tutto.',
      },
      {
        number: '02',
        color: 'bg-[#FFF59D]',
        title: 'Taglio di precisione',
        text: 'Ogni angolo, ogni incrocio, ogni fine-corsa è tagliato con troncatrice. Non esistono doghe "a occhio".',
      },
      {
        number: '03',
        color: 'bg-[#A5D6A7]',
        title: 'Incollaggio elastico',
        text: 'Usiamo collante MS-Polymer che si incolla e rimane elastico nel tempo, evitando distacchi con variazioni di temperatura.',
      },
    ],
    media: { type: 'video', src: posaPrefinitoSpinaVideo },
    accentBorder: 'border-[#FFF59D]',
  },
  'battiscopa': {
    badge: 'La posa del Battiscopa',
    headline: (
      <>
        Il dettaglio che{' '}
        <span className="bg-[#FFD180] px-1 border-b-[3px] border-black inline-block">fa la differenza.</span>
      </>
    ),
    intro: 'Un battiscopa posato male rovina un pavimento perfetto. Angoli aperti, giunzioni storte, silicone giallo che cola. Il battiscopa è l\'ultima operazione — ma si vede per sempre.',
    steps: [
      {
        number: '01',
        color: 'bg-[#FFD180]',
        title: 'Taglio a 45°',
        text: 'Ogni angolo interno ed esterno viene tagliato a 45° con troncatrice. Nessuna giunzione visibile, nessun gap.',
      },
      {
        number: '02',
        color: 'bg-[#FFF59D]',
        title: 'Fissaggio pulito',
        text: 'Incolliamo con silicone da costruzione o micro-chiodini invisibili. La parete rimane intatta.',
      },
      {
        number: '03',
        color: 'bg-[#A5D6A7]',
        title: 'Sigillatura finale',
        text: 'Chiudiamo la fuga superiore con silicone acrilico verniciabile, tono su tono con la parete. Effetto zero-gap.',
      },
    ],
    media: { type: 'video', src: posaBattiscopaVideo },
    accentBorder: 'border-[#FFD180]',
  },
  'scala-parquet': {
    badge: 'Rivestimento Scale',
    headline: (
      <>
        La scala diventa{' '}
        <span className="bg-[#A5D6A7] px-1 border-b-[3px] border-black inline-block">protagonista.</span>
      </>
    ),
    intro: 'Rivestire una scala esistente in legno o SPC è un lavoro di precisione. Ogni gradino ha dimensioni diverse, ogni alzata deve essere sagomata su misura. Niente prefabbricato: tutto misurato e tagliato in cantiere.',
    steps: [
      {
        number: '01',
        color: 'bg-[#FFD180]',
        title: 'Rilievo gradino per gradino',
        text: 'Misuriamo alzata e pedata di ogni singolo gradino. Le scale raramente sono perfettamente uniformi.',
      },
      {
        number: '02',
        color: 'bg-[#FFF59D]',
        title: 'Taglio e sagomatura',
        text: 'Ogni pedata e alzata viene tagliata su misura con margine preciso per la copertura del naso del gradino.',
      },
      {
        number: '03',
        color: 'bg-[#A5D6A7]',
        title: 'Profili antiscivolo',
        text: 'Installiamo profili in alluminio o acciaio sul bordo di ogni pedata. Sicurezza certificata, estetica pulita.',
      },
    ],
    media: { type: 'image', src: heroScale },
    accentBorder: 'border-[#A5D6A7]',
  },
};

// Palette pastel coordinata — 3 colori nuovi per ogni card
// Card 1: rosa cipria  Card 2: azzurro carta  Card 3: lilla/lavanda
const STEP_COLORS = [
  'bg-[#FECDD3]', // rosa cipria
  'bg-[#BAE6FD]', // azzurro carta
  'bg-[#DDD6FE]', // lavanda
];

// --- COMPONENTE PRINCIPALE ---
export function ServiceExplainerSection({ service }) {
  const pricingId = service?.pricingId;
  const data = EXPLAINER_DATA[pricingId];

  if (!data) return null;

  const scrollToQuiz = (e) => {
    e.preventDefault();
    const quiz = document.getElementById('home-preventivatore');
    if (quiz) {
      quiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white py-16 px-4 relative z-10 border-b-[3px] border-black overflow-hidden font-sans">

      {/* Decorazioni brutaliste di sfondo */}
      <div className="absolute top-6 left-4 text-black/5 font-black text-[120px] leading-none select-none pointer-events-none rotate-6">
        ///
      </div>
      <div className="absolute bottom-6 right-4 text-black/5 font-black text-[80px] leading-none select-none pointer-events-none -rotate-3">
        →→→
      </div>

      <div className="max-w-md mx-auto relative z-10">

        {/* Badge + Headline */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-black text-white px-4 py-1 uppercase font-black tracking-widest text-sm mb-5 transform rotate-1 rounded-md">
            {data.badge}
          </div>
          <h2 className="text-[28px] md:text-[36px] font-[900] text-black leading-[1.05] tracking-tight uppercase">
            {data.headline}
          </h2>
        </div>

        {/* Video / Foto */}
        <div className="relative w-full rounded-2xl overflow-hidden border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10 aspect-video bg-black">
          {data.media.type === 'video' ? (
            <LazyVideo src={data.media.src} className="w-full h-full bg-black" />
          ) : (
            <img
              src={data.media.src}
              alt="Servizio"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-2 bg-black/80 text-white px-3 py-1.5 rounded-lg">
              <Play className="w-3 h-3 fill-white text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">Come lavoriamo</span>
            </div>
          </div>
        </div>

        {/* Intro text */}
        <p className="text-[16px] md:text-[18px] font-[700] text-slate-700 leading-relaxed mb-10 border-l-[4px] border-black pl-4">
          {data.intro}
        </p>

        {/* 3 step cards — nuovi colori pastello */}
        <div className="flex flex-col gap-5">
          {data.steps.map((step, i) => (
            <div
              key={i}
              className={`
                relative w-full ${STEP_COLORS[i % STEP_COLORS.length]} text-black
                px-6 py-7
                border-[3px] border-black rounded-2xl
                shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-1 hover:translate-y-1
                transition-all duration-200
              `}
            >
              <div className="flex items-center justify-between mb-3 border-b-[2px] border-black/10 pb-3">
                <h4 className="text-[18px] md:text-[20px] font-[900] uppercase tracking-tight leading-tight text-black">
                  {step.title}
                </h4>
                <span className="text-4xl font-black opacity-20 leading-none select-none">
                  {step.number}
                </span>
              </div>
              <p className="text-[15px] md:text-[16px] font-[700] text-black/80 leading-snug">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* CTA — scroll al quiz */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={scrollToQuiz}
            className="
              inline-flex items-center gap-3
              bg-[#FFF176] text-black
              px-8 py-4 rounded-2xl
              font-black uppercase tracking-tighter text-base
              border-[3px] border-black
              shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]
              hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
              hover:translate-x-1 hover:translate-y-1
              transition-all duration-200
            "
          >
            <Calculator className="w-5 h-5" />
            Calcola il tuo preventivo online
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}

export default ServiceExplainerSection;
