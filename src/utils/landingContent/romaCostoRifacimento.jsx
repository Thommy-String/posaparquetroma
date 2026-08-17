// =============================================================================
// CONTENUTO DEDICATO — /roma/quanto-costa-rifare-il-pavimento
// Intento: trasparenza prezzi, preventivo online, calcolo rapido
// =============================================================================

export const costoRifacimentoContent = {
  slug: 'roma-costo-rifacimento',
  pageTitle: 'Quanto Costa Rifare il Pavimento a Roma? | Prezzi 2026 Pro Casa Parquet',
  metaDescription:
    'Prezzi trasparenti per rifare il pavimento a Roma: parquet prefinito da €27/mq, laminato da €20/mq, SPC da €17/mq. Preventivo gratuito e senza impegno. Scopri i costi reali con il nostro calcolatore online.',
  canonicalUrl: 'https://www.posaparquetroma.it/roma/quanto-costa-rifare-il-pavimento',

  // ── INSIDER TIPS ──
  insiderTips: {
    title: 'Quello che scopri solo in cantiere (e che nessuno ti dice)',
    subtitle: 'Cose che abbiamo imparato in 180+ cantieri a Roma e provincia.',
    tips: [
      {
        accent: 'amber',
        title: 'Il 90% dei pavimenti a Roma è posabile sopra',
        body: 'Piastrelle, marmo, gres, vecchio parquet: se il sottofondo è stabile e in piano, posiamo il nuovo pavimento direttamente sopra. Risparmi €15-25/mq di demolizione e smaltimento, e guadagni 5-10 giorni di tempo.',
      },
      {
        accent: 'blue',
        title: 'Il massetto non è mai perfetto. Il livellamento è quasi sempre necessario',
        body: 'A Roma molti edifici hanno assestamenti. Nel 70% dei casi serve una rasatura autolivellante (€5-10/mq). Chi ti fa un preventivo senza sopralluogo sta omettendo questa voce. Noi la includiamo solo se serve davvero.',
      },
      {
        accent: 'emerald',
        title: 'SPC e laminato sono la scelta più intelligente per Roma',
        body: 'Resistono all\'umidità (fondamentale nei piani terra e seminterrati romani), costano meno del parquet vero, e si posano in 2-3 giorni. L\'SPC è anche termicamente più confortevole d\'inverno rispetto alle piastrelle.',
      },
      {
        accent: 'violet',
        title: 'Attenzione ai preventivi "troppo belli"',
        body: 'Alcuni posatori a Roma quotano solo la posa base, poi in cantiere spuntano extra per battiscopa, livellamento, spostamento mobili, smaltimento. Il nostro prezzo include tutto quello che serve davvero, da subito.',
      },
      {
        accent: 'rose',
        title: 'I battiscopa fanno la differenza (e il prezzo)',
        body: 'Nuovo pavimento = nuovi battiscopa. Inclusi nel nostro prezzo. Scegli tra battiscopa in legno laccato bianco o in MDF effetto legno, con profili di raccordo abbinati. Non è un "extra" che scopri dopo.',
      },
    ],
  },

  // ── PRICE LEVERS (LEVE DEL PREZZO) ──
  priceLevers: {
    title: 'Cosa fa salire (o scendere) il prezzo',
    subtitle: 'Variabili reali che influenzano il costo. Così sai già cosa aspettarti.',
    baseCase: {
      label: 'Caso base: 50 mq SPC posa flottante (appartamento medio a Roma)',
      price: 850,
    },
    levers: [
      {
        label: 'Livellamento massetto (se serve)',
        delta: '250-500',
        explanation:
          'Se il sottofondo ha dislivelli superiori a 2 mm su 2 metri, va rasato con autolivellante. Costo: €5-10/mq. Lo verifichiamo al sopralluogo con una livella laser.',
      },
      {
        label: 'Spostamento mobili grandi',
        delta: 250,
        explanation:
          'Spostiamo noi i mobili. Quelli piccoli (sedie, tavolini) sono inclusi. Per mobili grandi (armadi, letti, divani, frigoriferi) c\'è un supplemento di €250 per tutto l\'appartamento.',
      },
      {
        label: 'Smaltimento vecchio pavimento (se serve demolire)',
        delta: '500-800',
        explanation:
          'Solo se il pavimento esistente non è posabile sopra. Include demolizione, rimozione macerie, trasporto in discarica autorizzata. Noi ci occupiamo di tutto.',
      },
    ],
    footerNote:
      'Prezzi IVA inclusa, manodopera e materiali di consumo. Il materiale (pavimento) lo scegli tu e lo paghi direttamente al fornitore: nessun ricarico nascosto.',
  },

  // ── LEVEL CHECKER ──
  levelChecker: {
    title: 'Ti serve davvero il livellamento?',
    body: (
      <>
        <p>Prendi una livella (o una semplice asta di metallo) e appoggiala sul pavimento in diversi punti. Se vedi luce sotto — più di 2 mm su una lunghezza di 2 metri — allora il livellamento è necessario. Stai tranquillo: al sopralluogo lo verifichiamo noi con la livella laser.</p>
      </>
    ),
    passLabel: 'Il mio pavimento è in piano',
    failLabel: 'Vedo luce sotto',
    passMessage:
      'Bene! Se il pavimento è in piano e stabile, puoi procedere con la posa flottante senza costi extra di livellamento. Risparmi €250-500.',
    failMessage:
      'Nessun problema. Il livellamento è una voce che includiamo nel preventivo dopo il sopralluogo. Costa €5-10/mq e si fa in mezza giornata. Niente sorprese: te lo diciamo prima, non dopo.',
  },

  // ── GEOGRAPHIC COVERAGE ──
  geographicCoverage: {
    title: 'Dove lavoriamo a Roma e provincia',
    subtitle: 'Copriamo tutto il territorio di Roma e comuni limitrofi, senza costi di trasferta.',
    provinces: [
      {
        name: 'Roma Centro',
        cities: 'Centro Storico, Trastevere, Prati, Parioli, Trieste-Salario, Nomentano, Tiburtino, Prenestino, Tuscolano, Appio-Latino, Aurelio, Monteverde, Portuense, Marconi, Eur, Torrino.',
      },
      {
        name: 'Roma Nord',
        cities: 'Flaminio, Cassia, Giustiniana, Prima Porta, Labaro, Grottarossa, Saxa Rubra, Balduina, Tomba di Nerone, Vigna Clara, Fleming, Corso Francia.',
      },
      {
        name: 'Roma Est e Sud',
        cities: 'Pietralata, Casal Bertone, San Lorenzo, Tor Pignattara, Centocelle, Alessandrino, Torre Spaccata, Cinecittà, Anagnina, Romanina, Tor Vergata.',
      },
      {
        name: 'Provincia di Roma',
        cities: 'Fiumicino, Ciampino, Frascati, Grottaferrata, Marino, Albano, Velletri, Aprilia, Pomezia, Ardea, Tivoli, Guidonia, Monterotondo, Mentana, Fonte Nuova.',
      },
    ],
  },

  // ── FAQ ──
  faqs: [
    {
      category: 'Preventivo e tempi',
      question: 'Serve davvero un sopralluogo per il preventivo?',
      answer:
        'Sì, e lo facciamo gratis. Solo vedendo il pavimento di persona possiamo dirti se serve il livellamento, se il fondo è posabile, e quali materiali sono compatibili. Senza sopralluogo, il preventivo è solo una stima approssimativa.',
    },
    {
      category: 'Preventivo e tempi',
      question: 'Quanto dura il lavoro per un appartamento di 80 mq a Roma?',
      answer:
        'In media 3-4 giorni lavorativi per la posa completa (pavimento + battiscopa). Se serve anche il livellamento, un giorno in più. Lavoriamo dalle 8:00 alle 17:00.',
    },
    {
      category: 'Materiali e posa',
      question: 'Quali marche di SPC consigliate per case a Roma?',
      answer:
        'Lavoriamo con tutte le marche, ma per il clima di Roma consigliamo SPC con spessore ≥5 mm (di cui almeno 0.5 mm di strato usura) e nucleo in pietra-calcare. Marche testate: Moduleo, Quick-Step, Classen, Wineo, Lico, Skema.',
    },
    {
      category: 'Materiali e posa',
      question: 'Fornite anche il materiale o solo la posa?',
      answer:
        'Facciamo solo la posa. Il materiale lo scegli e lo acquisti tu. Così sei sicuro di pagare il prezzo migliore e non c\'è nessun ricarico nascosto. Ti aiutiamo a calcolare i mq esatti e ti consigliamo i fornitori più affidabili a Roma.',
    },
  ],
};