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

import elenaDopo           from '../assets/images/primaDopoLavori/elenaDopo.webp';
import elenaPrima          from '../assets/images/primaDopoLavori/elenaPrima.webp';
import fedeDopo            from '../assets/images/primaDopoLavori/fedeDopo.webp';
import fedePrima           from '../assets/images/primaDopoLavori/fedePrima.webp';
import francescoDopo       from '../assets/images/primaDopoLavori/francescoDopo.webp';
import francescoPrima      from '../assets/images/primaDopoLavori/francescoPrima.webp';
import gabrieleDopo        from '../assets/images/primaDopoLavori/gabrieleDopo.webp';
import gabrielePrima       from '../assets/images/primaDopoLavori/gabrielePrima.webp';
import stefanoDopo         from '../assets/images/primaDopoLavori/stefanoDopo.webp';
import stefanoPrima        from '../assets/images/primaDopoLavori/stefanoPrima.webp';
import vittoriaDopo        from '../assets/images/primaDopoLavori/vittoriaDopo.webp';
import vittoriaPrima       from '../assets/images/primaDopoLavori/vittoriaPrima.webp';

// ─────────────────────────────────────────────────────────────────────────────
// DATI
// ─────────────────────────────────────────────────────────────────────────────
//
// CAMPI OPZIONALI:
//   floorCost  — costo del materiale pavimento per questo lavoro  (numero, es. 1500)
//   extras     — array di lavorazioni extra: [{ name: "descrizione", cost: 200 }]
//
// ─────────────────────────────────────────────────────────────────────────────
export const works = [

  // ── SPC ────────────────────────────────────────────────────────────────────
  {
    id: 19,
    category: 'spc',
    title: 'SPC in Bagno',
    location: 'Roma',
    sqm: 6,
    price: 800,
    floorCost: 176,
    time: '1 giorno',
    description: 'Posa nuovo SPC sulla piastrella esistente nel bagno, senza battiscopa ma con sigillatura perimetrale adatta.',
    extras: [
      { name: 'Sigillatura perimetrale', cost: 80 },
      { name: 'Smaltimento calcinacci', cost: 50 },
    ],
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
    location: 'Roma Tiburtina - RM',
    sqm: 45,
    price: 1550,
    floorCost: 1350,
    time: '2 giorni',
    description: 'Posa SPC a spina italiana fornito dal cliente, senza profili di transizione tra le porte. Posato sotto il mobile cucina con zoccolino per dare continuità. Nessun taglio porta necessario.',
    extras: [
      { name: 'Zoccolino cucina', cost: 90 },
      { name: 'Materassino fonoassorbente', cost: 320 },
    ],
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
    location: 'San Giovanni - Roma',
    sqm: 10,
    price: 800,
    floorCost: 280,
    time: '5 ore',
    description: 'Posa SPC in cucina su mattonella esistente. Pulizia del fondo, stesura materassino e posa del nuovo pavimento direttamente sopra quello vecchio.',
    extras: [
      { name: 'Materassino fonoassorbente', cost: 85 },
      { name: 'Pulizia e preparazione fondo', cost: 60 },
    ],
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
    location: 'Provincia di Roma',
    sqm: 71,
    price: 2335,
    floorCost: 2130,
    time: '3 giorni',
    description: 'Montaggio SPC/LVT a click con materassino integrato in appartamento con mobili. Posato su mattonelle esistenti con autolivellante nei punti critici.',
    extras: [
      { name: 'Autolivellante punti critici', cost: 180 },
      { name: 'Taglio porte', cost: 90 },
      { name: 'Posa battiscopa', cost: 420 },
    ],
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
    location: 'Provincia di Roma',
    sqm: 57,
    price: 1255,
    floorCost: 1425,
    time: '3 giorni',
    description: 'Montaggio SPC da 5mm con materassino integrato su pavimento esistente + battiscopa bianco ducale. Mobili presenti spostati stanza per stanza.',
    extras: [
      { name: 'Battiscopa bianco ducale', cost: 350 },
      { name: 'Spostamento mobili', cost: 120 },
      { name: 'Profili di transizione', cost: 180 },
    ],
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
    location: 'Trastevere - Roma',
    sqm: 65,
    price: 1620,
    floorCost: 1625,
    time: '2 giorni',
    description: 'Posa SPC con molti mobili. Taglio porta battente, una blindata, posa battiscopa e profili di transizione.',
    extras: [
      { name: 'Taglio porta blindata', cost: 120 },
      { name: 'Taglio porta battente', cost: 60 },
      { name: 'Battiscopa e profili transizione', cost: 380 },
      { name: 'Spostamento mobili', cost: 140 },
    ],
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
    location: 'Provincia di Roma',
    sqm: 40,
    price: 1100,
    floorCost: 1000,
    time: '2 giorni',
    description: 'Posa SPC click su parquet vecchio esistente in appartamento abitato. Mobili spostati e riposizionati. Taglio porta blindata.',
    extras: [
      { name: 'Taglio porta blindata', cost: 120 },
      { name: 'Spostamento mobili', cost: 100 },
      { name: 'Battiscopa', cost: 260 },
    ],
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
    location: 'Monteverde - Roma',
    sqm: 5,
    price: 800,
    floorCost: 150,
    time: '1 giorno',
    description: 'Installazione SPC rovere nel bagno sulle piastrelle esistenti e finitura con sigillante adatto lungo il perimetro del bagno. Siamo andati precisi intorno ai sanitari. ',
    extras: [
      { name: 'Sigillante perimetrale', cost: 70 },
      { name: 'Rimozione sanitari', cost: 120 },
    ],
    imageAfter: daniloDopo,
    imageBefore: daniloPrima,
    review: {
      text: "Lavoro eseguito con la massima professionalità e in tempi ridotti, apprezzata inoltre la puntualità. Grazie mille.",
      avatar: "https://ui-avatars.com/api/?name=D&background=1D4ED8&color=fff",
    },
  },

  {
    id: 24,
    category: 'spc',
    title: 'SPC a Posa Dritta',
    location: 'Roma',
    sqm: 55,
    price: 1100,
    floorCost: 1680,
    time: '2 giorni',
    description: 'Posa SPC a click a posa dritta su pavimento esistente con materassino integrato. Battiscopa bianco.',
    extras: [
      { name: 'Battiscopa bianco', cost: 360 },
      { name: 'Profili di transizione', cost: 40 },
    ],
    imageAfter: fedeDopo,
    imageBefore: fedePrima,
    review: {
      text: "Lavoro pulito e veloce, Andrea è stato preciso in ogni dettaglio. Pavimento trasformato in due giorni.",
      avatar: "https://ui-avatars.com/api/?name=F&background=0D8ABC&color=fff",
    },
  },
  {
    id: 25,
    category: 'spc',
    title: 'SPC a Spina Italiana',
    location: 'Provincia di Roma',
    sqm: 93,
    price: 2430,
    floorCost: 3623,
    time: '4 giorni',
    description: 'Posa SPC a spina italiana fornito dal cliente, con posa battiscopa e taglio del portone blindato. Posato su piastrelle esistenti.',
    extras: [
      { name: 'Taglio porta blindata', cost: 120 },
      { name: 'Fornitura e posa Battiscopa', cost: 1710 },
      { name: 'Smaltimento rifiuti', cost: 200 },
    ],
    imageAfter: francescoDopo,
    imageBefore: francescoPrima,
    review: {
      text: "Esperienza positiva dall'inizio alla fine. Precisi, puntuali e con un'attenzione maniacale ai dettagli.",
      avatar: "https://ui-avatars.com/api/?name=F&background=1D4ED8&color=fff",
    },
  },
  {
    id: 26,
    category: 'spc',
    title: 'SPC Effetto Legno',
    location: 'Roma',
    sqm: 87,
    price: 1750,
    floorCost: 2784,
    time: '3 giorni',
    description: 'Posa SPC effetto legno su pavimento esistente con mobili presenti. Spostamento mobili stanza per stanza e posa battiscopa.',
    extras: [
      { name: 'Spostamento mobili', cost: 250 },
      { name: 'Fornitura e posa Battiscopa', cost: 1650 },
      { name: 'Autolivellante nel salotto', cost: 725 },
    ],
    imageAfter: gabrieleDopo,
    imageBefore: gabrielePrima,
    review: {
      text: "Andrea e il team hanno fatto un lavoro eccellente. Il pavimento effetto legno è esattamente quello che cercavamo.",
      avatar: "https://ui-avatars.com/api/?name=G&background=1B4332&color=fff",
    },
  },
  {
    id: 27,
    category: 'spc',
    title: 'SPC a Spina',
    location: 'Provincia di Roma',
    sqm: 55,
    price: 1580,
    floorCost: 1375,
    time: '2 giorni',
    description: 'Posa SPC a spina su massetto con materassino. Taglio porte e posa battiscopa bianco ducale.',
    extras: [
      { name: 'Taglio porte', cost: 90 },
      { name: 'Battiscopa bianco ducale', cost: 340 },
      { name: 'Materassino', cost: 280 },
    ],
    imageAfter: stefanoDopo,
    imageBefore: stefanoPrima,
    review: {
      text: "Massima professionalità e disponibilità. Risultato impeccabile, consiglio vivamente.",
      avatar: "https://ui-avatars.com/api/?name=S&background=7C2D12&color=fff",
    },
  },
  {
    id: 28,
    category: 'spc',
    title: 'SPC su Pavimento Esistente',
    location: 'Roma',
    sqm: 30,
    price: 1050,
    floorCost: 750,
    time: '1 giorno',
    description: 'Posa SPC a click su parquet vecchio esistente, senza rimozione. Materassino fonoassorbente e battiscopa inclusi.',
    extras: [
      { name: 'Materassino fonoassorbente', cost: 180 },
      { name: 'Battiscopa', cost: 200 },
    ],
    imageAfter: vittoriaDopo,
    imageBefore: vittoriaPrima,
    review: {
      text: "Pavimento completamente rinnovato in una sola giornata. Bravissimi, lo consiglio a tutti.",
      avatar: "https://ui-avatars.com/api/?name=V&background=9D174D&color=fff",
    },
  },

  // ── PREFINITO INCOLLATO ────────────────────────────────────────────────────
  {
    id: 3,
    category: 'prefinito',
    title: 'Prefinito Dritto — Roma Tiburtina',
    location: 'Roma Tiburtina',
    sqm: 44,
    price: 1628,
    floorCost: 2200,
    time: '9 ore',
    description: 'Montaggio con collante di parquet rovere mielato largo 19cm su massetto con riscaldamento a pavimento.',
    extras: [
      { name: 'Collante specifico riscaldamento', cost: 180 },
      { name: 'Primer poliuretanico', cost: 130 },
    ],
    imageAfter: rovereNaturaleDritto,
    review: {
      text: "Avevo acquistato il parquet e mi serviva un parquettista su Roma. Consiglio.",
      avatar: "https://i.pravatar.cc/150?u=19",
    },
  },
  {
    id: 11,
    category: 'prefinito',
    title: 'Prefinito Rovere — 66 mq',
    location: '1 ora da Roma',
    sqm: 66,
    price: 1750,
    floorCost: 3300,
    time: '3 giorni',
    description: 'Posa con collante di parquet rovere naturale largo 19cm su massetto. Nessun mobile e nessun autolivellante necessario.',
    extras: [
      { name: 'Collante', cost: 220 },
      { name: 'Trasferta', cost: 100 },
    ],
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
    location: 'Roma EUR',
    sqm: 110,
    price: 2820,
    floorCost: 6600,
    time: '5 giorni',
    description: 'Montaggio con collante di parquet rovere tinto noce largo 15cm su massetto. Nessun mobile e nessun livellamento necessario.',
    extras: [
      { name: 'Collante', cost: 350 },
      { name: 'Battiscopa noce', cost: 680 },
    ],
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
    location: 'Provincia di Roma',
    sqm: 38,
    price: 1786,
    floorCost: 1900,
    time: '3 giorni',
    description: 'Posa prefinito 10mm su pavimento esistente, con graffiatura disco diamantato, primer e autolivellante.',
    extras: [
      { name: 'Graffiatura disco diamantato', cost: 150 },
      { name: 'Primer e autolivellante', cost: 280 },
      { name: 'Battiscopa', cost: 240 },
    ],
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
    location: 'Centocelle Roma',
    sqm: 79,
    price: 3250,
    floorCost: 3950,
    time: '4 giorni',
    description: 'Posa prefinito 12mm su pavimento esistente con graffiatura, primer e autolivellante.',
    extras: [
      { name: 'Graffiatura e primer', cost: 200 },
      { name: 'Autolivellante', cost: 350 },
      { name: 'Trasferta', cost: 150 },
      { name: 'Battiscopa', cost: 480 },
    ],
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
    title: 'Flottante Rovere — Tuscolana',
    location: 'Tuscolana - Roma',
    sqm: 91,
    price: 2002,
    floorCost: 4550,
    time: '3 giorni',
    description: 'Montaggio senza colla su mattonelle esistenti tramite materassino isolante. Rovere a tre strati 14mm.',
    extras: [
      { name: 'Materassino fonoassorbente', cost: 400 },
      { name: 'Battiscopa rovere', cost: 550 },
      { name: 'Profili di transizione', cost: 200 },
    ],
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
    location: 'Montesacro Roma',
    sqm: 68,
    price: 3250,
    floorCost: 3400,
    time: '2 giorni',
    description: 'Posa prefinito 14mm su pavimento esistente con materassino fornito dal cliente.',
    extras: [
      { name: 'Materassino fonoassorbente', cost: 300 },
      { name: 'Battiscopa', cost: 420 },
      { name: 'Trasferta', cost: 120 },
    ],
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
    location: 'Prenestina Roma',
    sqm: 120,
    price: 2650,
    floorCost: 6000,
    time: '4 giorni',
    description: 'Posa plancia larga 15mm su pavimento esistente livellato con materassino fornito dal cliente. Nessuna lavorazione extra.',
    extras: [
      { name: 'Materassino fonoassorbente', cost: 500 },
      { name: 'Battiscopa plancia larga', cost: 720 },
      { name: 'Autolivellante zone critiche', cost: 250 },
    ],
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
    title: 'Spina Italiana — Torre Angela',
    location: 'Torre Angela - Roma',
    sqm: 65,
    price: 2405,
    floorCost: 3900,
    time: '2 giorni',
    description: 'Montaggio con collante di rovere naturale a spina italiana largo 9cm su massetto nuovo.',
    extras: [
      { name: 'Primer per adesione', cost: 150 },
      { name: 'Collante specifico', cost: 280 },
      { name: 'Battiscopa spina', cost: 400 },
    ],
    imageAfter: rovereIta,
    review: {
      text: "Risultato eccellente e ragazzi trasparenti dall'inizio alla fine, educati!",
      avatar: "https://i.pravatar.cc/150?u=41",
    },
  },
  {
    id: 6,
    category: 'prefinito-spina',
    title: 'Spina Francese — Garbatella',
    location: 'Garbatella - Roma',
    sqm: 53,
    price: 1855,
    floorCost: 3180,
    time: '3 giorni',
    description: 'Rovere naturale a spina francese largo 9cm su marmo con graffiatura disco diamantato.',
    extras: [
      { name: 'Graffiatura disco diamantato', cost: 180 },
      { name: 'Primer e collante', cost: 240 },
      { name: 'Battiscopa', cost: 330 },
    ],
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
    location: 'Testaccio Roma',
    sqm: 32,
    price: 1184,
    floorCost: 1920,
    time: '1 giorno',
    description: 'Rovere prefinito 10mm su massetto livellato. Nessun mobile e nessuna lavorazione extra oltre al primer.',
    extras: [
      { name: 'Primer', cost: 100 },
      { name: 'Collante', cost: 140 },
    ],
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
    location: 'Roma',
    sqm: 68,
    price: 2516,
    floorCost: 4080,
    time: '3 giorni',
    description: 'Spina ungherese 10mm su massetto nuovo ben livellato. Primer per adesione impeccabile.',
    extras: [
      { name: 'Primer', cost: 150 },
      { name: 'Collante', cost: 290 },
      { name: 'Battiscopa su misura', cost: 420 },
    ],
    imageAfter: posaSpinaUngherese,
    review: {
      text: "Mi ritengo soddisfatto ad aver affidato a loro l'installazione del mio parquet. Ottimo lavoro.",
      avatar: "https://ui-avatars.com/api/?name=GV&background=0D8ABC&color=fff",
    },
  },

  {
    id: 29,
    category: 'prefinito-spina',
    title: 'Prefinito a Spina Italiana',
    location: 'Roma',
    sqm: 42,
    price: 1344,
    floorCost: 2385,
    time: '2 giorni',
    description: 'Posa prefinito rovere a spina italiana con collante su massetto, materiale fornito dal cliente. Primer specifico per adesione.',
    extras: [
      { name: 'Primer', cost: 120 },
      { name: 'Collante per prefinito', cost: 230 },
      { name: 'Battiscopa - posa', cost: 410 },
    ],
    imageAfter: elenaDopo,
    imageBefore: elenaPrima,
    review: {
      text: "La spina italiana ha un fascino unico e il lavoro di posa è stato eseguito magistralmente.",
      avatar: "https://ui-avatars.com/api/?name=E&background=6D28D9&color=fff",
    },
  },

  // ── LAMINATO ───────────────────────────────────────────────────────────────
  {
    id: 7,
    category: 'laminato',
    title: 'Laminato Grigio — 87 mq',
    location: 'Prati Roma',
    sqm: 87,
    price: 1405,
    floorCost: 1740,
    time: '3 giorni',
    description: 'Laminato 12mm grigio su materassino fonoassorbente con livellamento in alcuni punti critici.',
    extras: [
      { name: 'Materassino fonoassorbente', cost: 350 },
      { name: 'Autolivellante punti critici', cost: 120 },
      { name: 'Battiscopa bianco', cost: 520 },
    ],
    imageAfter: laminatoGrigio,
    review: {
      text: "Proprio come lo volevamo. Bravi.",
      avatar: "https://i.pravatar.cc/150?u=500",
    },
  },
  {
    id: 8,
    category: 'laminato',
    title: 'Laminato Noce — Roma Centro',
    location: 'Roma Centro',
    sqm: 46,
    price: 700,
    floorCost: 920,
    time: '8 ore',
    description: 'Laminato 10mm noce su massetto con materassino fonoassorbente. Nessun mobile, lavoro veloce. Battiscopa bianco ducale incluso.',
    extras: [
      { name: 'Materassino fonoassorbente', cost: 190 },
    ],
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
    location: 'Roma',
    sqm: 51,
    price: 1250,
    floorCost: 1020,
    time: '8 ore',
    description: 'Laminato 12mm su pavimento esistente con materassino. Molti mobili presenti — spostati e riposizionati.',
    extras: [
      { name: 'Materassino', cost: 210 },
      { name: 'Spostamento mobili', cost: 120 },
      { name: 'Battiscopa bianco', cost: 310 },
    ],
    imageAfter: laminatoRovereChiaro,
    review: {
      text: "La mia paura era avere tutti i mobili in mezzo, ma non sopportavo più il vecchio pavimento. Sono molto contenta del risultato. Consiglio.",
      avatar: "https://api.dicebear.com/7.x/identicon/svg?seed=Mario",
    },
  },
];