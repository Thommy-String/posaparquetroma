import React from 'react';
import { ArrowRight, CheckCircle2, Banknote, ShieldCheck, Sofa, UserCheck, MessageCircle } from 'lucide-react';

const ValuePropsSection = () => {
  const props = [
    {
      title: "TI FIDARESTI DI UN ACCONTO? NOI NO. PAGHI SOLO DOPO CHE INIZIAMO.",
      tag: "ACCONTO ZERO",
      tagColor: "bg-blue-100 text-blue-700",
      buttonColor: "bg-blue-50",
      subtitle: "Non chiediamo anticipi. Paghi solo a fine giornata, quando il pavimento è già posato e calpestabile. Se il lavoro dura più giorni, dividiamo il totale al termine di ogni giornata. Ad esempio, su un intervento da €1.500 in due giorni, pagherai €750 a fine prima giornata e i restanti €750 solo quando il parquet è completamente posato e rifinito.",
      cta: "Domande? Parliamone su WhatsApp",
      fuds: "Senza impegno",
      icon: <Banknote className="w-5 h-5" />,
      image: "https://i.ebayimg.com/images/g/NCAAAOSwRetf3deR/s-l1200.jpg",
    },
    {
      title: "SAI GIÀ QUANTO PAGHI PRIMA DI INIZIARE, PRECISO AL CENTESIMO.",
      tag: "PREZZO BLOCCATO",
      tagColor: "bg-orange-100 text-orange-700",
      buttonColor: "bg-orange-50",
      subtitle: "Basta preventivi che lievitano 'per imprevisti'. Il nostro prezzo include tutto: posa, collanti certificati, battiscopa e pulizia finale. Niente voci extra scoperte a lavori iniziati. Il prezzo pattuito è quello che paghi.",
      cta: "Ottieni preventivo gratis su WhatsApp",
      fuds: "Senza impegno.",
      icon: <ShieldCheck className="w-5 h-5" />,
      image: "https://www.nikkisplate.com/wp-content/uploads/2023/03/Modern-white-oak-flooring-ideas-2.jpeg",
      reverse: true
    },
    {
      title: "ANCHE IN CASE CON MOBILI. LAVORIAMO SENZA SMONTARE TUTTO.",
      tag: "CASA ABITATA",
      tagColor: "bg-green-100 text-green-700",
      buttonColor: "bg-green-50",
      subtitle: "Hai mobili in casa e non puoi svuotare tutto? Nessun problema. Siamo abituati a lavorare in ambienti abitati: spostiamo i mobili stanza per stanza durante la posa e li rimettiamo a posto prima di andarcene. Zero stress per te.",
      cta: "Hai mobili da spostare? Scrivici ora",
      fuds: "Risposta in pochi minuti.",
      icon: <Sofa className="w-5 h-5" />,
      image: "https://static.vecteezy.com/system/resources/thumbnails/032/384/976/small/furniture-on-white-background-ai-generative-photo.jpg",
    },
    {
      title: "SOLO PARQUETTISTI ESPERTI. NESSUN IMPROVVISATO.",
      tag: "SICUREZZA",
      tagColor: "bg-purple-100 text-purple-700",
      buttonColor: "bg-purple-50",
      subtitle: "Sappiamo chi lavora a casa tua: solo parquettisti specializzati con anni di esperienza su prefinito incollato, SPC a click e posa a spina. Niente subappalti a sconosciuti. Rispetto assoluto per il tuo immobile e per i tuoi spazi.",
      cta: "Chiedi chi verrà a fare il sopralluogo",
      fuds: "Personale qualificato e certificato",
      icon: <UserCheck className="w-5 h-5" />,
      image: "https://dpr-parquet.com/wp-content/uploads/2022/12/posa_in_opera.jpg",
      reverse: true
    },
    {
      title: "OTTIENI IL TUO PREVENTIVO REALE IN 10 MINUTI.",
      tag: "VELOCITÀ",
      tagColor: "bg-yellow-100 text-yellow-700",
      buttonColor: "bg-yellow-50",
      subtitle: "Non aspettare giorni per un appuntamento. Mandaci le foto del pavimento su WhatsApp con le dimensioni della stanza: riceverai una stima tecnica precisa in tempo reale, valida come pre-sopralluogo gratuito.",
      cta: "Scrivici su WhatsApp. Sempre online",
      fuds: "Senza impegno. Zero insistenza o spam.",
      icon: <MessageCircle className="w-5 h-5" />,
      image: "https://www.rossatopavimenti.it/wp-content/uploads/2022/12/posa-pavimento-legno-lisca-di-pesce-noale.jpg",
    }
  ];

  const handleWhatsAppClick = (propTitle) => {
    // Evento Conversione Google Ads
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-XXXXXXXXX/YYYYYYYYYYYY', // Sostituisci con il tuo ID reale
      });
    }

    const phoneNumber = "393342221212";
    const message = encodeURIComponent(`Ciao! Vorrei informazioni su: ${propTitle}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-white py-16 md:py-28 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-40">
        {props.map((prop, index) => (
          <div 
            key={index} 
            className={`flex flex-col gap-10 md:gap-20 items-center ${prop.reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}
          >
            {/* --- TESTO --- */}
            <div className="w-full md:w-1/2 space-y-6">
              {/* Tag Notion-Style Colorato */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md font-bold text-[11px] uppercase tracking-wider ${prop.tagColor} shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]`}>
                {prop.icon}
                {prop.tag}
              </div>
              
              <h2 className="text-3xl md:text-5xl font-[900] text-slate-900 leading-[0.95] uppercase tracking-tighter">
                {prop.title}
              </h2>
              
              <p className="text-[15px] md:text-lg text-slate-600 leading-relaxed border-l-4 border-slate-900 pl-5">
                {prop.subtitle}
              </p>

              <div className="pt-4 flex flex-col items-start gap-4">
                {/* Bottone Brutalista con il colore del Tag */}
                <button 
                  onClick={() => handleWhatsAppClick(prop.title)}
                  className={`
                    group relative inline-flex items-center gap-3
                    border-[2.5px] border-slate-900 
                    px-8 py-4 rounded-xl
                    text-slate-900 font-black uppercase tracking-tighter text-sm
                    transition-all duration-200
                    shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]
                    hover:shadow-[1px_1px_0px_0px_rgba(15,23,42,1)]
                    hover:translate-x-0.5 hover:translate-y-0.5
                    ${prop.buttonColor}
                  `}
                >
                  {prop.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* FUDS */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-bold uppercase tracking-tight">
                  <div className="p-0.5 bg-green-100 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  </div>
                  {prop.fuds}
                </div>
              </div>
            </div>

            {/* --- IMMAGINE --- */}
            <div className="w-full md:w-1/2">
              <div className={`
                relative aspect-[4/3] overflow-hidden 
                border-[3px] border-slate-900 rounded-[2.5rem]
                shadow-[15px_15px_0px_0px_rgba(15,23,42,1)]
                ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}
                hover:rotate-0 transition-transform duration-500
              `}>
                <img 
                  src={prop.image} 
                  alt={prop.title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValuePropsSection;