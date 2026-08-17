// =============================================================================
// CONTENUTO DEDICATO — /roma/pavimento-su-pavimento-esistente
// Intento: rassicurare che posare sopra il pavimento esistente è possibile, duraturo, sicuro
// =============================================================================

export const pavimentoEsistenteContent = {
  slug: 'roma-pavimento-esistente',
  pageTitle: 'Posa Pavimento su Pavimento Esistente a Roma | Senza Demolizioni | Pro Casa Parquet',
  metaDescription:
    'Posiamo il nuovo pavimento sopra il vecchio a Roma senza demolire. SPC, laminato, parquet prefinito. Zero polvere, zero macerie, in 2-3 giorni. Preventivo gratuito e sopralluogo incluso.',
  canonicalUrl: 'https://www.posaparquetroma.it/roma/pavimento-su-pavimento-esistente',

  // ── HERO ──
  hero: {
    h1: (
      <>
        Coprire il vecchio pavimento a Roma{' '}
        <span className="text-orange-600">senza demolire?</span>
      </>
    ),
    subtitle:
      'Nuovo pavimento in 2-3 giorni senza costi di smaltimento. Scopri qui se il tuo pavimento è adatto per la sovrapposizione.',
  },

  // ── FEASIBILITY CHECKER ──
  feasibilityChecker: {
    title: 'Che pavimento hai adesso?',
    subtitle: 'Clicca sul tuo pavimento e scopri subito se si può posare sopra.',
    floorTypes: [
      {
        id: 'piastrelle',
        label: 'Piastrelle / Ceramica',
        verdict: 'yes',
        response: 'Sì, si può posare sopra.',
        explanation:
          'Le piastrelle sono una base ideale per la posa flottante. Il nuovo pavimento (SPC, laminato o parquet prefinito) si appoggia su un materassino isolante senza bisogno di colla. Le piastrelle restano intatte sotto.',
      },
      {
        id: 'gres',
        label: 'Gres porcellanato',
        verdict: 'yes',
        response: 'Sì, si può posare sopra.',
        explanation:
          'Il gres porcellanato è una base eccellente: duro, planare e stabile. La posa flottante sopra è una delle soluzioni più rapide e sicure.',
      },
      {
        id: 'marmo',
        label: 'Marmo o granito',
        verdict: 'yes',
        response: 'Sì, si può posare sopra.',
        explanation:
          'Il marmo è una base eccellente: è planare, stabile e non trattiene umidità. La posa flottante sopra marmo è una delle situazioni più semplici e veloci.',
      },
      {
        id: 'parquet_vecchio',
        label: 'Parquet in legno',
        verdict: 'maybe',
        response: 'Dipende dalle condizioni.',
        explanation:
          'Se il vecchio parquet è stabile, non si muove e non ha doghe sollevate, si può posare sopra. Se invece scricchiola o ha parti danneggiate, va rimosso. Durante il sopralluogo gratuito verifichiamo lo stato reale.',
      },
      {
        id: 'linoleum',
        label: 'Linoleum / PVC',
        verdict: 'maybe',
        response: 'Dipende dallo stato.',
        explanation:
          'Se il linoleum è ben incollato e non si solleva, possiamo posare sopra. Se è staccato o presenta bolle, va rimosso. In ogni caso non può essere incollato sopra: solo posa flottante.',
      },
      {
        id: 'moquette',
        label: 'Moquette / Tappeto',
        verdict: 'no',
        response: 'No, va rimossa prima.',
        explanation:
          'La moquette non è una base adatta: è morbida, trattiene polvere e umidità, e il pavimento sopra non sarebbe stabile. La rimozione è semplice e veloce: in mezza giornata si toglie tutto.',
      },
    ],
  },

  // ── HOW IT WORKS ──
  howItWorks: [
    {
      step: '1',
      title: 'Sopralluogo gratuito',
      description:
        'Veniamo a vedere il tuo pavimento, misuriamo l\'umidità con l\'igrometro a sonda, controlliamo planarità e stabilità. Ti diciamo subito se è posabile sopra.',
      time: '30 minuti',
    },
    {
      step: '2',
      title: 'Scegli il pavimento',
      description:
        'Ti spieghiamo le differenze tra SPC, laminato e parquet prefinito. Ti diamo i campioni da vedere a casa tua. Scegli con calma, senza pressioni.',
      time: 'Quando vuoi',
    },
    {
      step: '3',
      title: 'Prepariamo la base',
      description:
        'Stendiamo il materassino fonoassorbente (1,5-2 mm). Se serve una rasatura autolivellante, la facciamo in mezza giornata. Rimuoviamo e sostituiamo i battiscopa.',
      time: 'Mezza giornata',
    },
    {
      step: '4',
      title: 'Posiamo il nuovo pavimento',
      description:
        'Posiamo il pavimento con posa flottante (a incastro). Nessuna colla, nessun chiodo, nessuna polvere. In 2-3 giorni l\'appartamento è pronto.',
      time: '2-3 giorni',
    },
  ],

  // ── TECHNICAL OBJECTIONS ──
  technicalObjections: [
    {
      id: 'height',
      question: 'La posa sopra rialza il pavimento. Le porte si apriranno ancora?',
      thicknesses: [
        { material: 'SPC', thickness: '4-6 mm + 1,5 mm materassino' },
        { material: 'Laminato', thickness: '7-8 mm + 2 mm materassino' },
        { material: 'Prefinito', thickness: '10-14 mm + 2 mm materassino' },
      ],
      answer:
        'L\'aumento totale è di soli 6-16 mm (meno di 2 cm). La maggior parte delle porte ha almeno 2-3 cm di spazio sotto. Se necessario, possiamo accorciare le porte di 5 mm senza problemi. Al sopralluogo misuriamo tutte le porte.',
    },
    {
      id: 'humidity',
      question: 'E se c\'è umidità sotto il vecchio pavimento?',
      answer:
        'Misuriamo l\'umidità del massetto con un igrometro a sonda. Se il valore è sotto il 2% (normale per un massetto asciutto), possiamo posare senza problemi. Se c\'è umidità di risalita, stendiamo una barriera vapore prima del materassino.',
    },
    {
      id: 'tiles',
      question: 'Le piastrelle sotto non si romperanno col peso?',
      answer:
        'No. Il peso è distribuito uniformemente dal materassino e dal pavimento flottante. Se una piastrella è già rotta o si muove, la ripariamo prima con malta rapida. Una piastrella integra non si rompe per il semplice peso di una persona che ci cammina sopra.',
    },
    {
      id: 'sound',
      question: 'Camminandoci sopra farà rumore vuoto?',
      answer:
        'No. Il materassino fonoassorbente (1,5-2 mm) che mettiamo sotto elimina il rumore di calpestio. Inoltre isola acusticamente verso il piano di sotto. Se vuoi la massima insonorizzazione, usiamo un materassino da 3 mm con pellicola acustica integrata.',
    },
    {
      id: 'warranty',
      question: 'La garanzia del pavimento vale anche con posa sopra esistente?',
      answer:
        'Sì, assolutamente. I produttori di SPC, laminato e prefinito prevedono esplicitamente la posa flottante su pavimento esistente nei loro manuali di posa. La garanzia del materiale resta pienamente valida.',
    },
    {
      id: 'value',
      question: 'Il valore dell\'immobile diminuisce se non si demolisce?',
      answer:
        'No, anzi. Togliendo il vecchio pavimento e lasciando quello nuovo, il valore percepito è lo stesso. E un pavimento posato sopra, se hai usato un materiale di qualità come l\'SPC o il parquet prefinito, è un plus in fase di vendita. Inoltre risparmi denaro che puoi investire in altre migliorie.',
    },
  ],

  // ── WHERE POSSIBLE ──
  wherePossible: {
    title: 'Dove si può fare (e dove no)',
    items: [
      { room: 'Soggiorno / Open space', possible: true, note: 'Molto comune' },
      { room: 'Camera da letto', possible: true, note: 'Molto comune' },
      { room: 'Corridoio / Ingresso', possible: true, note: 'Molto comune' },
      { room: 'Cucina', possible: true, note: 'Con SPC impermeabile' },
      { room: 'Bagno', possible: true, note: 'Solo con SPC impermeabile' },
      { room: 'Box / Garage (con umidità di risalita)', possible: false, note: 'Serve barriera vapore' },
      { room: 'Balcone / Terrazzo', possible: false, note: 'Solo piastrelle da esterno' },
      { room: 'Cantina con muffa attiva', possible: false, note: 'Prima risolvere l\'umidità' },
    ],
  },

  // ── FAQ ──
  faqs: [
    {
      category: 'Fattibilità',
      question: 'Si può posare su qualsiasi tipo di pavimento?',
      answer:
        'Quasi tutti. Piastrelle, marmo, gres, vecchio parquet, linoleum: se sono stabili e in piano, si può fare. Le uniche eccezioni sono moquette, pavimenti molto irregolari e superfici con umidità di risalita attiva.',
    },
    {
      category: 'Fattibilità',
      question: 'Se una piastrella è rotta, cosa fate?',
      answer:
        'La ripariamo prima della posa. Riempiamo la rottura con malta autolivellante a presa rapida. In 30 minuti è asciutta e possiamo procedere. È incluso nel prezzo.',
    },
    {
      category: 'Durata e manutenzione',
      question: 'Quanto dura un pavimento posato sopra l\'esistente?',
      answer:
        'La durata dipende dal materiale scelto, non dal fatto che sia posato sopra. Un SPC di qualità dura 15-25 anni. Un laminato 10-20 anni. Un parquet prefinito 20-30+ anni (può essere levigato 2-3 volte). La posa sopra non riduce la durata in alcun modo.',
    },
  ],
};