import heroPrefinito from '../assets/images/parquet/rovereNaturale.webp';
import heroPrefinitoFlottante from '../assets/images/parquet/rovereMielato.webp';
import heroPrefinitoSpina from '../assets/images/parquet/spinaFraRovereNaturale.webp';
import heroLaminato from '../assets/images/parquet/parquetLaminato.webp';
import heroBattiscopa from '../assets/images/parquet/battiscopa10cm.webp';
import heroScale from '../assets/images/parquet/posaScala.webp';
import misuraUmiditaMassetto from '../assets/images/parquet/misuraUmiditaMassetto.webp';
import tracciaturaLaserParquet from '../assets/images/parquet/tracciaturaLaserParquet.webp';
import posaParquetIncollato from '../assets/images/parquet/posaParquetIncollato.webp';
import posaParquetFlottante from '../assets/images/parquet/posaParquetFlottante.webp';
import fotoRivestimentoGradini from "../assets/images/parquet/rivestimentoScaleRovere.webp"
import povSpinaIta from '../assets/images/primaDopoLavori/povSpinaIta.webp';

//video — served from public/ to avoid bundling into JS
const videoPosaPrefinitoIncollato = '/videos/parquet/posaPrefinitoIncollato.mp4';
const videoPosaPrefinitoFlottante = '/videos/parquet/posaPrefinitoFlottante.mp4';
const videoPosaPrefinitoSpina = '/videos/parquet/posaPrefinitoSpina.mp4';
const videoPosaSPC = '/videos/parquet/posaSpc.mp4';
const videoPosaBattiscopa = '/videos/parquet/posaBattiscopa.mp4';
const spcAnimation = '/videos/parquet/SPCANIMATION.mp4';
import laminatoImage from '../assets/images/parquet/montaggioLaminato.webp';


export const servicesData = {
  'posa-parquet-prefinito-roma': {
    order: 1,
    navLabel: 'Posa parquet prefinito',
    slug: 'posa-parquet-prefinito-roma',
    pricingId: 'prefinito',
    pageTitle: 'Posa Parquet Prefinito a roma',
    metaDescription:
      'Posa parquet prefinito a roma: analisi del massetto, incollaggio professionale e finiture certificate. Squadra specializzata si parquettisti',
    hero: {
      h1: (
        <>
          Il vero <span className="bg-orange-50 text-orange-900 px-2 py-0.5 transform -rotate-1 inline-block rounded-sm">Parquet</span>
          <br /><span className="text-orange-600">Pronto all&apos;Uso</span> in tempi record.
          <br /><span className="text-slate-400 text-[0.4em] md:text-[0.6em] align-middle ml-2 decoration-slice decoration-orange-200 underline font-black">Nobiltà del legno, posa rapida.</span>
        </>
      ),
      subtitle: 'Tutto il calore del vero legno massello, già protetto e rifinito in fabbrica per una posa pulita e un calpestio immediato dopo poche ore.',
      image: heroPrefinito,
    },
    overview:
      'Il parquet prefinito nasce per chi desidera il calore del legno con tempi di cantiere rapidi. Con roma Posa Parquet ottieni un sopralluogo tecnico, se necessario la preparazione del sottofondo e la posa professionale con collanti certificati EC1.',
    sections: [
      {
        id: '01',
        title: 'Diagnosi Massetto',
        description: 'Al sopralluogo rileviamo l’umidità con igrometro a carburo e verifichiamo la planarità.',
        detail: 'Preveniamo distacchi e scricchiolii futuri.',
        icon: '📏',
        size: 'big',
        image: misuraUmiditaMassetto
      },
      {
        id: '02',
        title: 'Posa in opera ',
        description: 'Le mani dei nostri parquettisti hanno anni di esperienza. Che sia una posa incollata o flottante, ogni tavola è posata con cura.',
        detail: 'Ambiente salubre e massima tenuta meccanica.',
        icon: '🧪',
        size: 'small',
        image: posaParquetIncollato
      },
      {
        id: '04',
        title: 'Collaudo Finale',
        description: 'Pulizia dell\'ambiente di lavoro e consegna finale.',
        detail: 'Pronto per il calpestio dopo 24h se installazione con collante, o subito se installazione flottante (con materassino).',
        icon: '✨',
        size: 'big',
        image: heroPrefinito
      }
    ],
    priceDisplay: "€27 / mq",
    videoSrc: videoPosaPrefinitoIncollato,
    stats: {
      projects: "180+",
      mq: "6.200",
      year: "2025"
    },
    layout: [
      { type: 'HeroHome' },
      { type: 'Temparquettisti' },
      { type: 'RecentWorks', props: { category: 'prefinito', title: 'I nostri ultimi lavori' } },
      { type: 'ServiceExplainerSection' },
      { type: 'ServicePainVsSolution' },
      { type: 'ServiceDescription' },
      { type: 'ServiceFAQ' },
    ],
    features: [
      {
        id: 'senza-sbatti',
        icon: 'Footprints', // Nome della lucide-icon
        tag: 'Calpestabile subito',
        label: 'Anche su pavimento esistente',
        color: 'text-blue-400'
      },
      {
        id: 'casa-piena',
        icon: 'Armchair',
        tag: 'Anche in case abitate con mobili',
        label: 'Anche in case abitate con mobili',
        color: 'text-amber-400'
      },
      {
        id: 'tipo',
        icon: 'Hammer', // Nome della lucide-icon
        tag: 'Montaggio con o senza colla',
        label: 'incollato: €25 / mq - flottante: €22 / mq',
        color: 'text-green-400'
      },
    ]
  },
  'posa-parquet-prefinito-flottante-roma': {
    order: 2,
    navLabel: 'Prefinito flottante',
    slug: 'posa-parquet-prefinito-flottante-roma',
    pricingId: 'prefinito-flottante',
    pageTitle: 'Posa Parquet Prefinito Flottante a roma',
    metaDescription:
      'Posa parquet prefinito flottante a roma: materassino certificato, posa a click e battiscopa coordinati. Squadra roma Posa Parquet.',
    hero: {
      h1: (
        <>
          Parquet <span className="bg-amber-50 text-amber-900 px-2 py-0.5 transform rotate-1 inline-block rounded-sm">Flottante</span>
          <br /><span className="text-amber-600">Zero Colla</span> e subito calpestabile.
          <br /><span className="text-slate-400 text-[0.4em] md:text-[0.6em] align-middle ml-2 decoration-slice decoration-amber-200 underline font-black">Posa rapida senza sporcare.</span>
        </>
      ),
      subtitle: 'Il comfort del legno con posa senza colla: veloce, pulita e subito calpestabile.',
      image: heroPrefinitoFlottante,
    },
    overview:
      'Il prefinito flottante è ideale per ristrutturazioni rapide: posa a click su materassino tecnico, zero colla e possibilità di sostituire singole doghe nel tempo.',
    sections: [
      {
        id: '00',
        title: 'Controllo sottofondo esistente',
        description: 'Al sopralluogo rileviamo l’umidità con igrometro a carburo e verifichiamo la planarità.',
        detail: 'Preveniamo distacchi e scricchiolii futuri.',
        icon: '📏',
        size: 'big',
        image: 'https://media.adeo.com/media/556713/media.png?width=300'
      },
      {
        id: '01',
        title: 'Inizio posa - Stesura materassino',
        description: 'Posa di materassino per isolamento acustico + eventuale barriera a vapore.',
        detail: 'Comfort termico e abbattimento rumore calpestio.',
        icon: '🛡️',
        size: 'big',
        image: 'https://media.adeo.com/media/556713/media.png?width=300'
      },
      {
        id: '02',
        title: 'Posa flottante',
        description: 'Assemblaggio senza colla: veloce, pulito e immediatamente utilizzabile.',
        detail: 'Ideale per case abitate e uffici.',
        icon: '🧩',
        size: 'small',
        image: posaParquetFlottante
      },
      {
        id: '03',
        title: 'Battiscopa',
        description: 'Se previsto come da accordi: finitura con tagli precisi a 45 gradi e sigillatura.',
        detail: 'Zero rigonfiamenti nel tempo.',
        icon: '🔨',
        size: 'small',
        image: heroPrefinitoFlottante
      },
      {
        id: '04',
        title: 'Consegna',
        description: 'Pulizia dell\'area di lavoro e chiusura. Il sistema flottante in futuro permette di sostituire singole doghe senza smontare tutta la stanza.',
        detail: 'Manutenzione facile per tutta la vita. Calpestabile subito dopo la posa.',
        icon: '📦',
        size: 'big',
        image: heroPrefinitoFlottante
      }
    ],
     priceDisplay: "€22 / mq",
    videoSrc: videoPosaPrefinitoFlottante,
    stats: {
      projects: "180+",
      mq: "6.200",
      year: "2025"
    },
    layout: [
      { type: 'HeroHome' },
      { type: 'Temparquettisti' },
      { type: 'RecentWorks', props: { category: 'prefinito-flottante', title: 'I nostri ultimi lavori' } },
      { type: 'ServiceExplainerSection' },
      { type: 'ServicePainVsSolution' },
      { type: 'ServiceDescription' },
      { type: 'ServiceFAQ' },
    ],
    features: [
      {
       id: 'materassino',
       icon: 'DropletOff',
       tag: 'Senza colla',
       label: 'apoggiato su tappeto isolante',
       color: 'text-green-400'
     },
      {
        id: 'SENZA COLLA',
        icon: 'Layers2', // Nome della lucide-icon
        tag: 'Su materassino',
        label: 'posa senza colla anche su pavimento esistente',
        color: 'text-blue-400'
      },
      {
        id: 'casa-piena',
        icon: 'Sofa',
        tag: 'Anche in case con mobili',
        label: 'Anche in case abitate con mobili',
        color: 'text-amber-400'
      },
      
    ]
  },
  'posa-parquet-prefinito-spina-roma': {
    order: 3,
    navLabel: 'Prefinito a spina',
    slug: 'posa-parquet-prefinito-spina-roma',
    pricingId: 'prefinito-spina',
    pageTitle: 'Posa Parquet Prefinito a Spina a Roma | Spina italiana, spina francese, spina ungherese',
    metaDescription:
      'Posa parquet prefinito a spina a roma: tracciatura laser, incollaggio professionale e finiture sartoriali. Prenota un sopralluogo con noi di roma Posa Parquet.',
    hero: {
      h1: (
        <>
          Parquet <span className="bg-pink-50 text-pink-900 px-2 py-0.5 transform -rotate-1 inline-block rounded-sm">a Spina</span>
          <br /><span className="text-pink-600">Precisione Laser</span> e incollaggio certificato.
          <br /><span className="text-slate-400 text-[0.4em] md:text-[0.6em] align-middle ml-2 decoration-slice decoration-pink-200 underline font-black">Geometrie perfette, casa trasformata.</span>
        </>
      ),
      subtitle: 'Spina italiana, francese o ungherese: precisione millimetrica e incollaggio che dura.',
      image: heroPrefinitoSpina,
    },
    heroBeforeImage: heroPrefinitoSpina,
    heroAfterImage: povSpinaIta,
    overview:
      'Studiamo geometrie e simmetrie, tagliamo ogni doga a misura e incolliamo con collanti elastici certificati per uno schema a spina stabile e scenografico.',
   sections: [
    {
        id: '00',
        title: 'Controllo sottofondo esistente',
        description: 'Al sopralluogo rileviamo l’umidità con e verifichiamo la planarità.',
        detail: 'Stabilità eterna per schemi complessi.',
        icon: '🕵🏻‍♂️',
        size: 'small',
        image: 'https://mrsander.co.uk/wp-content/uploads/chevron-vs-herringbone-engineered-oak-herringbone-parquet-glue-down.jpeg'
      },
      {
        id: '01',
        title: 'Tracciatura',
        description: 'Tracciatura per centrare la geometria della spina negli ambienti.',
        detail: 'Simmetria perfetta tra corridoi e stanze.',
        icon: '📐',
        size: 'big',
        image: tracciaturaLaserParquet
      },
      {
        id: '03',
        title: 'Posa a spina',
        description: 'Gestione spina italiana, francese o ungherese con tagli di precisione.',
        detail: 'Verso di posa a scelta del cliente, anche diagonale.',
        icon: '👷🏼‍♂️',
        size: 'small',
        image: heroPrefinitoSpina
      },
      {
        id: '04',
        title: 'Consegna Finale',
        description: 'Pulizia dell\'ambiente di lavoro e consegna finale.',
        detail: 'Pronto per il calpestio dopo 24h.',
        icon: '✨',
        size: 'big',
        image: heroPrefinito
      }
    ],
     priceDisplay: "€32 / mq",
    videoSrc: videoPosaPrefinitoSpina,
    stats: {
      projects: "180+",
      mq: "6.200",
      year: "2025"
    },
    layout: [
      { type: 'HeroHome' },
      { type: 'Temparquettisti' },
      { type: 'RecentWorks', props: { category: 'prefinito-spina', title: 'I nostri ultimi lavori' } },
      { type: 'ServiceExplainerSection' },
      { type: 'ServicePainVsSolution' },
      { type: 'ServiceDescription' },
      { type: 'ServiceFAQ' },
    ],
    features: [
      {
       id: 'tipologie',
       icon: 'Gavel',
       tag: 'Tutti i tipi di spina',
       label: 'spina italiana, francese o ungherese',
       color: 'text-green-400'
     },
      {
        id: 'collante',
        icon: 'PaintBucket', // Nome della lucide-icon
        tag: 'posa incollata',
        label: 'su massetto o su pavimenti esistenti',
        color: 'text-blue-400'
      },
      {
        id: 'casa-piena',
        icon: 'Armchair',
        tag: 'Anche in case abitate con mobili',
        label: 'Anche in case abitate con mobili',
        color: 'text-amber-400'
      },
    ]
  },
  'posa-pavimento-spc-roma': {
    order: 4,
    navLabel: 'Posa SPC a click',
    slug: 'posa-pavimento-spc-roma',
    pricingId: 'spc',
    pageTitle: 'Posa SPC a Roma',
    metaDescription:
      "Posa parquet SPC a click a roma senza colla. Pavimento vinilico 100% impermeabile, stabile e silenzioso anche su piastrelle esistenti. Sopralluogo e preventivo gratuiti.",
    hero: {
      h1: (
        <>
          Installiamo il tuo SPC
          <br /><span>in <span className="bg-yellow-50 text-yellow-900 px-3 py-1 transform inline-block rounded-md font-bold">1–2 giorni</span> <span className="bg-red-50 text-red-900 px-3 py-1 transform inline-block rounded-md font-bold">senza demolizioni</span></span>
          <br /><span className="text-slate-400 text-sm font-normal mt-2 block">sul pavimento esistente, anche con mobili</span>
        </>
      ),
      subtitle: 'Il pavimento tecnologico ultra-sottile che installiamo sopra il tuo vecchio pavimento senza polvere, senza macerie e senza accorciare le porte.',
      image: videoPosaSPC,
    },
    overview:
      'SPC abbina l’estetica del legno alla resistenza della pietra. È impermeabile e perfetto per bagni, cucine e locali commerciali. Ci occupiamo di tutto: dalla verifica del supporto alla posa a click con finiture coordinate.',
    sections: [
  {
    id: '01',
    title: 'Sopralluogo Gratuito',
    description: 'Analisi planarità del sottofondo e altezze porte.',
    detail: 'Eliminiamo il rischio di imprevisti o costi extra dopo l’inizio.',
    icon: '📏',
    size: 'big'
  },
  {
    id: '02',
    title: 'Preventivo',
    descripion: 'Documento dettagliato con tutte le voci viste insieme.',
    detail: 'Trasparenza totale: sai esattamente cosa paghi.',
    icon: '📄',
    size: 'small'
  },
  {
    id: '03',
    title: 'Conferma e inizio Posa',
    description: 'Installazione SPC a incastro click anche su pavimenti esistenti ben livellati, senza polvere o colle chimiche.',
    detail: 'Ambiente calpestabile subito dopo la posa.',
    icon: '👷🏼‍♂️',
    size: 'small'
  },
  {
    id: '04',
    title: 'Chiusura e Pulizia',
    description: 'Finitura battiscopa se prevista e pulizia dello spazio di lavoro.',
    detail: 'Ti riconsegniamo la casa pronta da vivere.',
    icon: '✨',
    size: 'big'
  }
],
    priceDisplay: "€20 / mq",
    videoSrc: spcAnimation,
    stats: {
      projects: "180+",
      mq: "6.200",
      year: "2025"
    },
    layout: [
      { type: 'HeroHome' },
      { type: 'Temparquettisti' },
      { type: 'RecentWorks', props: { category: 'spc', title: 'Nel 2025 Abbiamo posato più di 2595 pacchi di SPC. Qualsiasi marchio e formato.' } },
      { type: 'ServiceExplainerSection' },
      { type: 'SPCProblemVsSolution' },
      { type: 'ServicePainPoints' },
      { type: 'ServiceDescription' },
    ],
    features: [
      {
       id: 'incastro',
       icon: 'Hammer',
       tag: 'Sul pavimento esistente',
       label: 'tempi medi montaggio: 1-2 giorni',
       color: 'text-blue-400'
     },
     {
        id: 'casa-piena',
        icon: 'Armchair',
        tag: 'Anche in case con mobili',
        label: 'Anche in case abitate con mobili',
        color: 'text-amber-400'
      },
      {
        id: 'colla',
        icon: 'DropletOff',
        tag: 'senza colla o demolizioni',
        label: 'direttamente sul pavimento esistente',
        color: 'text-green-400'
      },

    ]
  },
  'posa-pavimento-laminato-roma': {
    order: 5,
    navLabel: 'Posa laminato',
    slug: 'posa-pavimento-laminato-roma',
    pricingId: 'laminato',
    pageTitle: 'Posa Pavimento Laminato a roma | Installazione rapida e pulita',
    metaDescription:
      'Posa parquet laminato a roma su materassino, tagli a misura e rifiniture sartoriali. Preventivo rapido online.',
    hero: {
      h1: (
        <>
          Posa <span className="bg-emerald-50 text-emerald-900 px-2 py-0.5 transform rotate-1 inline-block rounded-sm">Laminato</span>
          <br /><span className="text-emerald-600">Massima Resistenza</span> per tutta la casa.
          <br /><span className="text-slate-400 text-[0.4em] md:text-[0.6em] align-middle ml-2 decoration-slice decoration-emerald-200 underline font-black">Estetica legno, durezza estrema.</span>
        </>
      ),
      subtitle: 'La soluzione ideale per chi cerca un pavimento bello come il legno ma estremamente resistente ai graffi, agli urti e al calpestio intenso.',
      image: heroLaminato,
    },
    overview:
      'Il laminato è l’alleato ideale per un restyling veloce: si posa flottante, resiste a graffi e usura e richiede poca manutenzione. Studiamo il progetto, prepariamo il piano di posa e montiamo battiscopa e profili per un risultato coerente con il tuo stile.',
     sections: [
  {
    id: '01',
    title: 'Sopralluogo Tecnico',
    description: 'Analisi planarità del sottofondo e altezze porte.',
    detail: 'Eliminiamo il rischio di imprevisti o costi extra dopo l’inizio.',
    icon: '📏',
    size: 'big'
  },
  {
    id: '02',
    title: 'Ricezione Preventivo',
    description: 'Documento dettagliato con tutte le voci viste insieme.',
    detail: 'Trasparenza totale: sai esattamente cosa paghi.',
    icon: '📄',
    size: 'small'
  },
  {
    id: '03',
    title: 'Conferma e inizio Posa',
    description: 'Stesura materassino isolante e successiva installazione parquet laminato a incastro anche su pavimenti esistenti ben livellati, senza polvere o colle chimiche.',
    detail: 'Ambiente calpestabile subito dopo la posa.',
    icon: '👷🏼‍♂️',
    size: 'small'
  },
  {
    id: '04',
    title: 'Chiusura e Pulizia',
    description: 'Finitura battiscopa se prevista e pulizia dello spazio di lavoro.',
    detail: 'Ti riconsegniamo la casa pronta da vivere.',
    icon: '✨',
    size: 'big'
  }
],
     priceDisplay: "20 / mq",
    imageSrc: laminatoImage,
    stats: {
      projects: "180+",
      mq: "6.200",
      year: "2025"
    },
    layout: [
      { type: 'HeroHome' },
      { type: 'Temparquettisti' },
      { type: 'RecentWorks', props: { category: 'laminato', title: 'I nostri ultimi lavori' } },
      { type: 'ServiceExplainerSection' },
      { type: 'ServicePainVsSolution' },
      { type: 'ServicePainPoints' },
      { type: 'ServiceDescription' },
    ],
    features: [
      {
       id: 'incastro',
       icon: 'Puzzle',
       tag: 'posa rapida sul vecchio pavimento',
       label: 'a incastro su materassino isolante',
       color: 'text-green-400'
     },
      {
        id: 'colla',
        icon: 'DropletOff', // Nome della lucide-icon
        tag: 'senza colla',
        label: 'su pavimenti esistenti ben livellati',
        color: 'text-blue-400'
      },
      {
        id: 'casa-piena',
        icon: 'Armchair',
        tag: 'Anche in case con mobili',
        label: 'Anche in case abitate con mobili',
        color: 'text-amber-400'
      },
    ]
  },
  'posa-battiscopa-roma': {
    order: 6,
    navLabel: 'Posa battiscopa',
    slug: 'posa-battiscopa-roma',
    pricingId: 'battiscopa',
    pageTitle: 'Posa Battiscopa a roma | Tagli e finiture pulite',
    metaDescription:
      'Posa professionale battiscopa a roma: rilievo, taglio a 45°, incollaggio e sigillatura. Sopralluogo e preventivo gratuiti online',
    hero: {
      h1: (
        <>
          Finiture con <span className="bg-slate-50 text-slate-900 px-2 py-0.5 transform rotate-1 inline-block rounded-sm">Battiscopa</span>
          <br /><span className="text-slate-600">Dettagli Sartoriali</span> per ogni ambiente.
          <br /><span className="text-slate-400 text-[0.4em] md:text-[0.6em] align-middle ml-2 decoration-slice decoration-slate-300 underline font-black">Il tocco finale che fa la differenza.</span>
        </>
      ),
      subtitle: 'Battiscopa in legno, PVC o alluminio installati con precisione millimetrica per proteggere le tue pareti e incorniciare il tuo nuovo pavimento.',
      image: heroBattiscopa,
    },
    overview:
      'Un battiscopa perfetto chiude il lavoro in modo professionale. Realizziamo sopralluogo, tagliamo con troncatrice a 45°, incolliamo o fissiamo con chiodini invisibili e sigilliamo la parte superiore per un risultato rifinito.',
    sections: [
      {
        id: '01',
        title: 'Rilievo',
        description: 'Misurazione dei lineari e consulenza sulla scelta del battiscopa (MDF, Legno, Alluminio).',
        detail: 'Soluzioni coordinate al pavimento e alle pareti.',
        icon: '🕵🏻‍♂️',
        size: 'big',
        image: 'https://m.media-amazon.com/images/I/61gfc0lQ2+L.jpg'
      },
      {
        id: '02',
        title: 'Inizio Posa',
        description: 'Tagli millimetrici per incroci perfetti e incollaggio angoli senza sbavature.',
        detail: 'Incroci perfetti anche su muri fuori squadro.',
        icon: '⚙️',
        size: 'small',
        image: 'https://lirp.cdn-website.com/bf9fdae6/dms3rep/multi/opt/massimo_gambino_lucidatura_pavimenti_016-432w.jpg'
      },
      {
        id: '03',
        title: 'Fissaggio Smart',
        description: 'Incollaggio a presa rapida o micro-chiodini in acciaio.',
        detail: 'Tenuta estrema senza sporcare le pareti.',
        icon: '📌',
        size: 'small',
        image: 'https://prestoimpresa.it/cdn/shop/products/Battiscopa55959659_grande.jpg?v=1673983876'
      },
      {
        id: '04',
        title: 'Sigillatura',
        description: 'Chiusura delle fughe d’ombra con silicone acrilico verniciabile o tono su tono.',
        detail: 'Effetto ottico uniforme e pulizia facilitata.',
        icon: '🖌️',
        size: 'big',
        image: heroBattiscopa
      }
    ],
     priceDisplay: "€5-7 / ml",
    videoSrc: videoPosaBattiscopa,
    stats: {
      projects: "180+",
      mq: "6.200",
      year: "2025"
    },
    layout: [
      { type: 'HeroHome' },
      { type: 'Temparquettisti' },
      { type: 'ServiceExplainerSection' },
      { type: 'ServicePainVsSolution' },
      { type: 'ServiceFAQ' },
      { type: 'ServiceDescription' },
    ],
    features: [
      {
       id: 'tagli',
       icon: 'Slice',
       tag: 'Tagli precisi',
       label: 'a 45 gradi per incroci perfetti',
       color: 'text-green-400'
     },
      {
        id: 'sigillatura',
        icon: 'Paintbrush', // Nome della lucide-icon
        tag: 'Sigillatura pulita',
        label: 'pulita per finitura estetica',
        color: 'text-blue-400'
      },
    ]
  },
  'rivestimento-scale-roma': {
    order: 7,
    navLabel: 'Rivestimento scale',
    slug: 'rivestimento-scale-roma',
    pricingId: 'scala-parquet',
    pageTitle: 'Rivestimento Scale in Parquet a roma | Progettazione su misura',
    metaDescription:
      'Rivestiamo scale a roma con legno prefinito, pedate antiscivolo e finiture coordinate. Sopralluogo e preventivo gratuiti.',
    hero: {
      h1: (
        <>
          Le tue <span className="bg-violet-50 text-violet-900 px-2 py-0.5 transform rotate-1 inline-block rounded-sm">Scale</span>
          <br /><span className="text-violet-600">Rivestite in Legno</span> su misura.
          <br /><span className="text-slate-400 text-[0.4em] md:text-[0.6em] align-middle ml-2 decoration-slice decoration-violet-200 underline font-black">Sagomatura millimetrica, finitura sartoriale.</span>
        </>
      ),
      subtitle: 'Sagomatura millimetrica, profili antiscivolo e finiture coordinate per scale perfette.',
      image: heroScale,
    },
    overview:
      'Trasformiamo la tua scala con rivestimenti in legno o SPC che si integrano con il pavimento esistente. Uniamo rilievo tridimensionale, taglio CNC e montaggio in opera per un risultato di design resistente nel tempo.',
    sections: [
      {
        id: '01',
        title: 'Rilievo',
        description: 'Controllo di alzate e pedate per replicare esattamente la geometria della scala.',
        detail: 'Precisione su ogni gradino.',
        icon: '📐',
        size: 'big',
        image: 'https://m.media-amazon.com/images/I/61gfc0lQ2+L.jpg'
      },
      {
        id: '03',
        title: 'Posa Strutturale',
        description: 'Incollaggio solido per garantire stabilità e silenziosità al calpestio.',
        detail: 'Eliminiamo scricchiolii e movimenti nel tempo.',
        icon: '🏗️',
        size: 'small',
        image: 'https://www.casiraghiparquet.com/wp-content/uploads/2019/04/scala-in-rovere.jpg'
      },
      {
        id: '04',
        title: 'Safety Check',
        description: 'Installazione di profili antiscivolo e collaudo finale di ogni singola alzata.',
        detail: 'Sicurezza prima di tutto.',
        icon: '🛡️',
        size: 'big',
        image: fotoRivestimentoGradini
      }
    ],
      priceDisplay: "€90 / gradino",
    videoSrc: fotoRivestimentoGradini,
    stats: {
      projects: "180+",
      mq: "6.200",
      year: "2025"
    },
    layout: [
      { type: 'HeroHome' },
      { type: 'Temparquettisti' },
      { type: 'ServiceExplainerSection' },
      { type: 'ServicePainVsSolution' },
      { type: 'ServiceFAQ' },
      { type: 'ServiceDescription' },
    ],
    features: [
      {
       id: 'tagli',
       icon: 'Slice',
       tag: 'Rivestimento completo o parziale',
       label: 'per incroci perfetti',
       color: 'text-green-400'
     },
      {
        id: 'tipo',
        icon: 'Paintbrush', // Nome della lucide-icon
        tag: 'finiture precise',
        label: 'rivestimento completo o parziale',
        color: 'text-blue-400'
      },
    ]
  },
};
