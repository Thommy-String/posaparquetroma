// src/utils/worksData.js
// ─────────────────────────────────────────────────────────────────────────────
// Database centralizzato di tutti i lavori completati.
// Per aggiungere un nuovo lavoro: copia un blocco, assegna un id univoco,
// imposta la category corretta e compila i campi.
//
// CATEGORIE DISPONIBILI:
//   'spc' | 'prefinito' | 'prefinito-flottante' | 'prefinito-spina' | 'laminato' | 'battiscopa' | 'scala-parquet'
// ─────────────────────────────────────────────────────────────────────────────

// ── IMMAGINI ─────────────────────────────────────────────────────────────────
import rovereIta            from '../assets/images/parquet/rovereIta.webp';
import rovereNaturaleDritto from '../assets/images/parquet/rovereNaturale.webp';
import spinaFrancese        from '../assets/images/parquet/spinaFraRovereNaturale.webp';

import roverePrima          from '../assets/images/primaDopoLavori/prima2.webp';
import rovereDopo           from '../assets/images/primaDopoLavori/dopo2.webp';
import rovereNoce           from '../assets/images/primaDopoLavori/prefinitoNoce.webp';
import rovereNaturale       from '../assets/images/primaDopoLavori/rovereNaturaleDritto.webp';
import rovereChiaro         from '../assets/images/primaDopoLavori/rovereChiaro.webp';
import prefinitoDrittoRovere from '../assets/images/primaDopoLavori/prefinitoDrittoRovere.webp';
import rovereFlottante      from '../assets/images/primaDopoLavori/rovereFlottante.webp';
import prefinitoFlottanteLargo from '../assets/images/primaDopoLavori/prefinitoFlottanteLargo.webp';
import rovereSpinaItaMobili from '../assets/images/primaDopoLavori/rovereSpinaItaMobili.webp';
import posaSpinaUngherese   from '../assets/images/primaDopoLavori/posaSpinaUngherese.webp';

import spcSpinaPrima        from '../assets/images/primaDopoLavori/prima5.webp';
import spcSpinaDopo         from '../assets/images/primaDopoLavori/dopo5.webp';
import montaggioSPCRovere   from '../assets/images/primaDopoLavori/montaggioSPCRovere.webp';

import beaDopo              from '../assets/images/primaDopoLavori/BeaDopo-card-330.webp';
import beaPrima             from '../assets/images/primaDopoLavori/BeaPrima-card-330.webp';
import castiglioniDopo      from '../assets/images/primaDopoLavori/castiglioniDopo.webp';
import castiglioniPrima     from '../assets/images/primaDopoLavori/castiglioniPrima.webp';
import igorDopo             from '../assets/images/primaDopoLavori/igorDopo-card-330.webp';
import igorPrima            from '../assets/images/primaDopoLavori/igorPrima-card-330.webp';
import daniloDopo           from '../assets/images/primaDopoLavori/daniloDopo-card-330.webp';
import daniloPrima          from '../assets/images/primaDopoLavori/daniloPrima-card-330.webp';

const barbaraPrima = '/service-images/spc-hero-before-640.webp';
const barbaraDopo = '/service-images/spc-hero-after-640.webp';
const rescaldinaPrima = '/service-images/spc-rescaldina-prima-640.webp';
const rescaldinaDopo = '/service-images/spc-rescaldina-dopo-640.webp';

import laminatoGrigio       from '../assets/images/primaDopoLavori/laminatoGrigio.webp';
import laminatoNoce         from '../assets/images/primaDopoLavori/laminatoNoce.webp';
import laminatoRovereChiaro from '../assets/images/primaDopoLavori/laminatoRovereChiaro.webp';

// ─────────────────────────────────────────────────────────────────────────────
// DATI
// ─────────────────────────────────────────────────────────────────────────────
export const works = [

  // ── SPC ────────────────────────────────────────────────────────────────────
  {
    id: 19,
    category: 'spc',
    title: 'SPC in Bagno',
    location: 'Bergamo',
    sqm: 6,
    price: 650,
    time: '1 giorno',
    description: 'Posa nuovo SPC sulla piastrella esistente nel bagno, senza battiscopa ma con sigillatura perimetrale adatta.',
    imageAfter: barbaraDopo,
    imageBefore: barbaraPrima,
    review: {
      text: "Abbiamo affidato ad Andrei i lavori per il bagno e siamo rimasti molto soddisfatti. È un professionista bravo, preciso e veloce. Ha svolto il lavoro in modo impeccabile, curando ogni dettaglio. Consigliatissimo!",
      avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVfhR4-IEinuhlzK4DlrTfnlPyEbewMhhfEZ6jFRsk8sgJQrXaV=s48-c-rp-mo-ba4-br100",
    },
  },
  {
    id: 20,
    category: 'spc',
    title: 'SPC a Spina Italiana',
    location: 'Legnano - MI',
    sqm: 45,
    price: 1550,
    time: '2 giorni',
    description: 'Posa SPC a spina italiana fornito dal cliente, senza profili di transizione tra le porte. Posato sotto il mobile cucina con zoccolino per dare continuità. Nessun taglio porta necessario.',
    imageAfter: rescaldinaDopo,
    imageBefore: rescaldinaPrima,
    review: {
      text: "Ho contattato Thomas per offerta posa pavimento spc. Dal sopralluogo di Andrea posatore al lavoro finale, ho trovato solo professionalità, lavoro impeccabile! Ringrazio Andrea che in 2 giornate intense, è riuscito a stravolgere i nostri ambienti con un lavoro impeccabile di posa pavimento e zoccolino. Se cercate veri professionisti li trovate a occhi chiusi in questa azienda. Top!",
      avatar: "https://ui-avatars.com/api/?name=MC&background=0D8ABC&color=fff",
    },
  },
  {
    id: 21,
    category: 'spc',
    title: 'Nuovo ambiente in SPC',
    location: 'Sesto San Giovanni - Milano',
    sqm: 10,
    price: 430,
    time: '5 ore',
    description: 'Posa SPC in cucina su mattonella esistente. Pulizia del fondo, stesura materassino e posa del nuovo pavimento direttamente sopra quello vecchio.',
    imageAfter: beaDopo,
    imageBefore: beaPrima,
    review: {
      text: "Professionalità, precisione e grande attenzione ai dettagli. Il lavoro è stato eseguito con cura impeccabile, rispettando tempi e aspettative. Il risultato finale ha valorizzato gli ambienti, superando le nostre aspettative. Grazie mille Andrea e Thomas!",
      avatar: "https://ui-avatars.com/api/?name=B&background=0D8ABC&color=fff",
    },
  },
  {
    id: 1,
    category: 'spc',
    title: 'SPC a Spina Italiana — 71 mq',
    location: 'Provincia di Milano',
    sqm: 71,
    price: 2335,
    time: '3 giorni',
    description: 'Montaggio SPC/LVT a click con materassino integrato in appartamento con mobili. Posato su mattonelle esistenti con autolivellante nei punti critici.',
    imageAfter: spcSpinaDopo,
    imageBefore: spcSpinaPrima,
    review: {
      text: "Super precisi, il parquet è stupendo e la cucina è proprio come la volevo! Bravo Andrea il parquettista!",
      avatar: "https://i.pravatar.cc/150?u=13",
    },
  },
  {
    id: 10,
    category: 'spc',
    title: 'SPC a Click — 57 mq con Battiscopa',
    location: 'Provincia di Milano',
    sqm: 57,
    price: 1255,
    time: '3 giorni',
    description: 'Montaggio SPC da 5mm con materassino integrato su pavimento esistente + battiscopa bianco ducale. Mobili presenti spostati stanza per stanza.',
    imageAfter: montaggioSPCRovere,
    review: {
      text: "Puliti e puntuali dal primo preventivo all'ultimo giorno di montaggio. Molto contento.",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=g",
    },
  },
  {
    id: 4,
    category: 'spc',
    title: 'SPC — Taglio Porte e Battiscopa',
    location: 'San Siro - Milano',
    sqm: 65,
    price: 1620,
    time: '2 giorni',
    description: 'Posa SPC con molti mobili. Taglio porta battente, una blindata, posa battiscopa e profili di transizione.',
    imageAfter: castiglioniDopo,
    imageBefore: castiglioniPrima,
    review: {
      text: "Posato a regola d'arte. Perfetto per questo appartamento in affitto.",
      avatar: "https://i.pravatar.cc/150?u=21",
    },
  },
  {
    id: 22,
    category: 'spc',
    title: 'SPC su Pavimento Esistente',
    location: 'Provincia di Milano',
    sqm: 40,
    price: 1100,
    time: '2 giorni',
    description: 'Posa SPC click su parquet vecchio esistente in appartamento abitato. Mobili spostati e riposizionati. Taglio porta blindata.',
    imageAfter: igorDopo,
    imageBefore: igorPrima,
    review: {
      text: "Thomas e Andrei grandi,fortissimi. Lavoro perfetto. Prezzo veramente ottimo. Bravi bravi. Grazie 😊",
      avatar: "https://ui-avatars.com/api/?name=I&background=1B4332&color=fff",
    },
  },
  {
    id: 23,
    category: 'spc',
    title: 'SPC Rovere Chiaro',
    location: 'Rozzano - MI',
    sqm: 5,
    price: 1056,
    time: '1 giorno',
    description: 'Installazione SPC rovere nel bagno sulle piastrelle esistenti e finitura con sigillante adatto lungo il perimetro del bagno. Siamo andati precisi intorno ai sanitari. ',
    imageAfter: daniloDopo,
    imageBefore: daniloPrima,
    review: {
      text: "Lavoro eseguito con la massima professionalità e in tempi ridotti, apprezzata inoltre la puntualità. Grazie mille.",
      avatar: "https://ui-avatars.com/api/?name=D&background=1D4ED8&color=fff",
    },
  },

  // ── PREFINITO INCOLLATO ────────────────────────────────────────────────────
  {
    id: 3,
    category: 'prefinito',
    title: 'Prefinito Dritto — Porta Nuova',
    location: 'Porta Nuova - Milano',
    sqm: 44,
    price: 1628,
    time: '9 ore',
    description: 'Montaggio con collante di parquet rovere mielato largo 19cm su massetto con riscaldamento a pavimento.',
    imageAfter: rovereNaturaleDritto,
    review: {
      text: "Avevo acquistato il parquet e mi serviva un parquettista su Milano. Consiglio.",
      avatar: "https://i.pravatar.cc/150?u=19",
    },
  },
  {
    id: 11,
    category: 'prefinito',
    title: 'Prefinito Rovere — 66 mq',
    location: '1 ora da Milano',
    sqm: 66,
    price: 1750,
    time: '3 giorni',
    description: 'Posa con collante di parquet rovere naturale largo 19cm su massetto. Nessun mobile e nessun autolivellante necessario.',
    imageAfter: rovereNaturale,
    review: {
      text: "Ottimo lavoro Andrea e Massimiliano.",
      avatar: "https://ui-avatars.com/api/?name=GP&background=0D8ABC&color=fff",
    },
  },
  {
    id: 12,
    category: 'prefinito',
    title: 'Prefinito Noce — 110 mq',
    location: 'Provincia di Milano',
    sqm: 110,
    price: 2820,
    time: '5 giorni',
    description: 'Montaggio con collante di parquet rovere tinto noce largo 15cm su massetto. Nessun mobile e nessun livellamento necessario.',
    imageAfter: rovereNoce,
    review: {
      text: "Prezzi e tempi chiari, lavorerò sicuramente ancora e consiglio ad amici.",
      avatar: "https://ui-avatars.com/api/?name=AF&background=0D8ABC&color=fff",
    },
  },
  {
    id: 13,
    category: 'prefinito',
    title: 'Prefinito Chiaro — su Esistente',
    location: 'Provincia di Milano',
    sqm: 38,
    price: 1786,
    time: '3 giorni',
    description: 'Posa prefinito 10mm su pavimento esistente, con graffiatura disco diamantato, primer e autolivellante.',
    imageAfter: rovereChiaro,
    review: {
      text: "Qualche lavorazione in più necessaria, ma il pavimento sotto era storto. Ho fatto la cosa giusta.",
      avatar: "https://i.pravatar.cc/150?u=20",
    },
  },
  {
    id: 14,
    category: 'prefinito',
    title: 'Prefinito Rovere Senza Nodi',
    location: '2 ore da Milano',
    sqm: 79,
    price: 3250,
    time: '4 giorni',
    description: 'Posa prefinito 12mm su pavimento esistente con graffiatura, primer e autolivellante.',
    imageAfter: prefinitoDrittoRovere,
    review: {
      text: "Pavimento rinato senza togliere quello sotto. Risultato impeccabile, caldo, accogliente...",
      avatar: "https://ui-avatars.com/api/?name=A&background=0D8ABC&color=fff",
    },
  },

  // ── PREFINITO FLOTTANTE ────────────────────────────────────────────────────
  {
    id: 2,
    category: 'prefinito-flottante',
    title: 'Flottante Rovere — Navigli',
    location: 'Navigli - Milano',
    sqm: 91,
    price: 2002,
    time: '3 giorni',
    description: 'Montaggio senza colla su mattonelle esistenti tramite materassino isolante. Rovere a tre strati 14mm.',
    imageAfter: rovereDopo,
    imageBefore: roverePrima,
    review: {
      text: "Molto soddisfatta, trovati su Google. Tempi previsti di 3 giorni rispettati.",
      avatar: "https://i.pravatar.cc/150?u=25",
    },
  },
  {
    id: 15,
    category: 'prefinito-flottante',
    title: 'Flottante Rovere — 68 mq',
    location: '2 ore da Milano',
    sqm: 68,
    price: 3250,
    time: '2 giorni',
    description: 'Posa prefinito 14mm su pavimento esistente con materassino fornito dal cliente.',
    imageAfter: rovereFlottante,
    review: {
      text: "Soluzione comoda senza togliere il pavimento esistente. Bravi!",
      avatar: "https://ui-avatars.com/api/?name=A&background=0D8ABC&color=fff",
    },
  },
  {
    id: 16,
    category: 'prefinito-flottante',
    title: 'Flottante Plancia Larga — 120 mq',
    location: 'Provincia di Milano',
    sqm: 120,
    price: 2650,
    time: '4 giorni',
    description: 'Posa plancia larga 15mm su pavimento esistente livellato con materassino fornito dal cliente. Nessuna lavorazione extra.',
    imageAfter: prefinitoFlottanteLargo,
    review: {
      text: "Velocissimi nelle risposte, sempre disponibili. Il nuovo parquet è stupendo.",
      avatar: "https://ui-avatars.com/api/?name=MD&background=0D8ABC&color=fff",
    },
  },

  // ── PREFINITO SPINA ────────────────────────────────────────────────────────
  {
    id: 5,
    category: 'prefinito-spina',
    title: 'Spina Italiana — Calvairate',
    location: 'Calvairate - Milano',
    sqm: 65,
    price: 2405,
    time: '2 giorni',
    description: 'Montaggio con collante di rovere naturale a spina italiana largo 9cm su massetto nuovo.',
    imageAfter: rovereIta,
    review: {
      text: "Risultato eccellente e ragazzi trasparenti dall'inizio alla fine, educati!",
      avatar: "https://i.pravatar.cc/150?u=41",
    },
  },
  {
    id: 6,
    category: 'prefinito-spina',
    title: 'Spina Francese — Cerro Maggiore',
    location: 'Cerro Maggiore - Milano',
    sqm: 53,
    price: 1855,
    time: '3 giorni',
    description: 'Rovere naturale a spina francese largo 9cm su marmo con graffiatura disco diamantato.',
    imageAfter: spinaFrancese,
    review: {
      text: "Bravi, esperienza positiva.",
      avatar: "https://i.pravatar.cc/150?u=46",
    },
  },
  {
    id: 17,
    category: 'prefinito-spina',
    title: 'Spina Italiana — 32 mq',
    location: 'Provincia di Milano',
    sqm: 32,
    price: 1184,
    time: '1 giorno',
    description: 'Rovere prefinito 10mm su massetto livellato. Nessun mobile e nessuna lavorazione extra oltre al primer.',
    imageAfter: rovereSpinaItaMobili,
    review: {
      text: "Un ringraziamento a tutta la squadra preparata e puntuale. Trovati su Google.",
      avatar: "https://ui-avatars.com/api/?name=PL&background=0D8ABC&color=fff",
    },
  },
  {
    id: 18,
    category: 'prefinito-spina',
    title: 'Spina Ungherese — 68 mq',
    location: 'Milano',
    sqm: 68,
    price: 2516,
    time: '3 giorni',
    description: 'Spina ungherese 10mm su massetto nuovo ben livellato. Primer per adesione impeccabile.',
    imageAfter: posaSpinaUngherese,
    review: {
      text: "Mi ritengo soddisfatto ad aver affidato a loro l'installazione del mio parquet. Ottimo lavoro.",
      avatar: "https://ui-avatars.com/api/?name=GV&background=0D8ABC&color=fff",
    },
  },

  // ── LAMINATO ───────────────────────────────────────────────────────────────
  {
    id: 7,
    category: 'laminato',
    title: 'Laminato Grigio — 87 mq',
    location: 'Provincia di Milano',
    sqm: 87,
    price: 1405,
    time: '3 giorni',
    description: 'Laminato 12mm grigio su materassino fonoassorbente con livellamento in alcuni punti critici.',
    imageAfter: laminatoGrigio,
    review: {
      text: "Proprio come lo volevamo. Bravi.",
      avatar: "https://i.pravatar.cc/150?u=500",
    },
  },
  {
    id: 8,
    category: 'laminato',
    title: 'Laminato Noce — Milano Centro',
    location: 'Milano Centro',
    sqm: 46,
    price: 700,
    time: '8 ore',
    description: 'Laminato 10mm noce su massetto con materassino fonoassorbente. Nessun mobile, lavoro veloce. Battiscopa bianco ducale incluso.',
    imageAfter: laminatoNoce,
    review: {
      text: "5 stelle.",
      avatar: "https://ui-avatars.com/api/?name=M&background=0D8ABC&color=fff",
    },
  },
  {
    id: 9,
    category: 'laminato',
    title: 'Laminato Rovere Chiaro — 51 mq',
    location: 'Milano',
    sqm: 51,
    price: 1250,
    time: '8 ore',
    description: 'Laminato 12mm su pavimento esistente con materassino. Molti mobili presenti — spostati e riposizionati.',
    imageAfter: laminatoRovereChiaro,
    review: {
      text: "La mia paura era avere tutti i mobili in mezzo, ma non sopportavo più il vecchio pavimento. Sono molto contenta del risultato. Consiglio.",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Mario",
    },
  },
];
