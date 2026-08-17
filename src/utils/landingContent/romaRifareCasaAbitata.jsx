// =============================================================================
// CONTENUTO DEDICATO — /roma/rifare-pavimenti-casa-abitata
// Intento: rendere il processo prevedibile per chi vive in casa durante i lavori
// =============================================================================

export const rifareCasaAbitataContent = {
  slug: 'roma-rifare-casa-abitata',
  pageTitle: 'Rifare i Pavimenti in Casa Abitata a Roma | Senza Traslocare | Pro Casa Parquet',
  metaDescription:
    'Rifacciamo i pavimenti nella tua casa abitata a Roma senza che tu debba traslocare. Lavoriamo stanza per stanza, spostiamo noi i mobili. La casa resta vivibile ogni sera. Preventivo gratuito.',
  canonicalUrl: 'https://www.posaparquetroma.it/roma/rifare-pavimenti-casa-abitata',

  // ── HERO ──
  hero: {
    h1: (
      <>
        Rifacciamo i pavimenti{' '}
        <span className="bg-orange-50 text-orange-900 px-2 py-0.5 transform -rotate-1 inline-block rounded-sm">
          in casa abitata
        </span>
        <br />
        <span className="text-orange-600">a Roma. Senza traslocare.</span>
      </>
    ),
    subtitle:
      'Vivi qui, hai i mobili, non vuoi andare in albergo. Lavoriamo per zone, spostiamo noi i mobili, e ogni sera la casa è pulita e vivibile. Zero stress.',
    reassuranceItems: [
      'Lavoriamo per zone',
      'Spostiamo noi i mobili',
      'La casa resta vivibile ogni sera',
    ],
  },

  // ── CRONOPROGRAMMA GIORNO PER GIORNO ──
  timeline: {
    title: 'Il cronoprogramma giorno per giorno',
    subtitle: 'Appartamento tipo da 80 mq. I tempi reali del lavoro.',
    days: [
      {
        day: 'Giorno 1',
        phases: [
          {
            time: 'Mattina (8:00-12:00)',
            title: 'Spostiamo i mobili nella Zona A, proteggiamo con teli',
            description:
              "Arriviamo alle 8:00. Spostiamo i mobili della prima zona (es. soggiorno) in un'altra stanza o al centro della stanza coperti da teli. Stendiamo il materassino e iniziamo la posa.",
          },
          {
            time: 'Pomeriggio (13:00-17:00)',
            title: 'Posa Zona A',
            description:
              'Completiamo la posa del pavimento nella prima zona. Tagliamo le tavole perimetrali, installiamo i profili di raccordo provvisori.',
          },
        ],
      },
      {
        day: 'Giorno 2',
        phases: [
          {
            time: 'Mattina (8:00-12:00)',
            title: 'Battiscopa Zona A, i mobili tornano al loro posto',
            description:
              'Installiamo i battiscopa nella Zona A. Rimettiamo i mobili al loro posto. La prima zona è completata e vivibile.',
          },
          {
            time: 'Pomeriggio (13:00-17:00)',
            title: 'Si passa alla Zona B',
            description:
              'Spostiamo i mobili della seconda zona (es. camera da letto) nella Zona A ormai completata. Stendiamo il materassino e iniziamo la posa della Zona B.',
          },
        ],
      },
      {
        day: 'Giorno 3',
        phases: [
          {
            time: 'Mattina (8:00-12:00)',
            title: 'Completamento Zona B e battiscopa',
            description:
              'Finiamo la posa della Zona B, installiamo i battiscopa e rimettiamo i mobili a posto.',
          },
          {
            time: 'Pomeriggio (13:00-16:00)',
            title: 'Rifiniture, pulizia e consegna',
            description:
              'Installiamo le soglie definitive, controlliamo ogni dettaglio, puliamo tutto con aspiratore industriale. La casa è pronta.',
          },
        ],
      },
    ],
    eveningNote:
      'Ogni sera alle 17:00 la casa è pulita e agibile. Puoi dormire a casa tua, usare il bagno e la cucina. Nessuna notte in albergo.',
  },

  // ── METODO PER ZONE ──
  zoneMethod: {
    title: 'Il metodo per zone',
    subtitle: 'Dividiamo la casa e procediamo una zona alla volta. Tu resti nella zona vivibile.',
    steps: [
      {
        zone: 'Zona A',
        description: 'Soggiorno e corridoio — Giorno 1',
        detail: 'Prima zona da posare. I mobili di questa zona vengono spostati nella Zona B o coperti.',
      },
      {
        zone: 'Zona B',
        description: 'Camera da letto — Giorno 2',
        detail: 'Seconda zona. I mobili vengono spostati nella Zona A già completata.',
      },
      {
        zone: 'Zona C',
        description: 'Seconda camera o studio — Giorno 3 (se necessario)',
        detail: 'Ultima zona. Per appartamenti sopra gli 80 mq.',
      },
    ],
    note: 'Bagno e cucina restano sempre accessibili. Se devi rifare anche quelli, li facciamo per ultimi, un giorno ciascuno, e la sera sono di nuovo utilizzabili.',
  },

  // ── OTTO DOMANDE LOGISTICHE ──
  logisticQuestions: [
    {
      question: 'Dove finiscono i mobili?',
      answer:
        "Nella zona non ancora lavorata, coperti da teli protettivi. Se lo spazio è poco, li spostiamo al centro della stanza e lavoriamo intorno, poi li spostiamo dall'altra parte. Non devi affittare un deposito.",
    },
    {
      question: 'Chi li sposta, e gli elettrodomestici?',
      answer:
        "Li spostiamo noi. I mobili piccoli (sedie, tavolini, comodini) sono inclusi nel prezzo. Per i mobili grandi (armadi, letti, divani, frigoriferi) c'è un piccolo supplemento di €250. Non devi chiamare un traslocatore.",
    },
    {
      question: 'Quanta polvere fa?',
      answer:
        "Quasi zero. La posa flottante (SPC, laminato, prefinito flottante) non produce polvere perché non si demolisce nulla e non si usa colla. I tagli li facciamo sul balcone o con aspiratore integrato. È il vantaggio più grande rispetto alla demolizione.",
    },
    {
      question: 'Posso usare il bagno e la cucina?',
      answer:
        'Sì. Bagno e cucina restano sempre accessibili. Se devi rifare anche il pavimento del bagno o della cucina, li facciamo in una giornata dedicata e la sera sono di nuovo utilizzabili (con SPC, che è impermeabile e non richiede asciugatura).',
    },
    {
      question: 'Posso dormire a casa?',
      answer:
        'Sì, tutte le notti. La camera da letto viene completata in una giornata: la mattina spostiamo il letto, posiamo il pavimento, la sera il letto è di nuovo al suo posto. Non serve prenotare hotel.',
    },
    {
      question: 'Posso lavorare da casa? Che rumore fa e in quali orari?',
      answer:
        'Lavoriamo dalle 8:00 alle 17:00. Il rumore è minimo: solo il taglio delle tavole, che facciamo a intermittenza. Se hai una call importante, basta dircelo e ci fermiamo per quei 30 minuti. Molti nostri clienti lavorano da casa durante la posa.',
    },
    {
      question: 'Cosa succede con bambini o animali?',
      answer:
        'Proteggiamo le zone di lavoro con teli e delimitazioni. I bambini possono stare nella zona non interessata dai lavori. Per gli animali, ti chiediamo di tenerli in una stanza separata durante le ore di lavoro, per la loro sicurezza e per non sporcare il pavimento appena posato.',
    },
    {
      question: 'Servono autorizzazioni condominiali?',
      answer:
        "No. La posa flottante non è un intervento strutturale: non si demolisce, non si modifica il massetto, non si produce rumore molesto. Non serve nessuna autorizzazione del condominio né comunicazione all'amministratore.",
    },
  ],

  // ── PERCHÉ POSA SOPRA ESISTENTE È L'UNICA OPZIONE ──
  whyFloatingOnly: {
    title: "Perché la posa sopra l'esistente è l'unica opzione compatibile con la casa abitata",
    comparison: [
      { aspect: 'Giorni di lavoro', floating: '2-4 giorni', demolition: '10-20 giorni' },
      { aspect: 'Macerie', floating: 'Zero', demolition: '2-3 tonnellate da smaltire' },
      { aspect: 'Polvere in casa', floating: 'Quasi zero', demolition: 'Molta, ovunque, per giorni' },
      { aspect: 'Rumore', floating: 'Tagli intermittenti', demolition: 'Martello pneumatico continuo' },
      { aspect: 'Dormire a casa', floating: 'Sì, tutte le notti', demolition: 'Impossibile per almeno 5-7 giorni' },
      { aspect: 'Usare bagno/cucina', floating: 'Sì, sempre', demolition: 'No durante i lavori in quelle stanze' },
      { aspect: 'Traslocare mobili', floating: 'Spostiamo noi, stanza per stanza', demolition: 'Va svuotata tutta la casa' },
    ],
  },

  // ── QUIZ INTRO ──
  quizIntro: 'Hai visto come funziona. Ora scopri quanto costa e in quanti giorni lo facciamo.',

  // ── FAQ ──
  faqs: [
    {
      category: 'Logistica e tempi',
      question: 'Lavorate anche nel weekend?',
      answer:
        'Sì, su richiesta lavoriamo anche il sabato senza sovrapprezzo. La domenica normalmente no, ma in casi particolari possiamo valutare. Durante il sopralluogo concordiamo le date che funzionano meglio per te.',
    },
    {
      category: 'Logistica e tempi',
      question: 'A che ora arrivate e a che ora finite?',
      answer:
        "Arriviamo alle 8:00 e finiamo alle 17:00, con pausa pranzo di un'ora. Se hai esigenze particolari (es. bambini che dormono fino a una certa ora), possiamo adattare gli orari.",
    },
    {
      category: 'Logistica e tempi',
      question: 'Come gestite le chiavi di casa?',
      answer:
        'Se sei in casa, ci apri tu. Se devi uscire, puoi lasciarci le chiavi. Molti clienti ce le lasciano per tutta la durata dei lavori: siamo assicurati e di fiducia. Se preferisci, possiamo coordinare gli orari in modo che tu sia sempre presente.',
    },
    {
      category: 'Logistica e tempi',
      question: 'Cosa succede se piove? I materiali si rovinano?',
      answer:
        "I materiali che usiamo (SPC, laminato, prefinito) sono imballati e protetti. Li trasportiamo in furgone chiuso. Se piove, li portiamo dentro subito. L'umidità atmosferica non è un problema per la posa.",
    },
    {
      category: 'Logistica e tempi',
      question: 'Quanto tempo prima devo prenotare?',
      answer:
        'Di solito abbiamo disponibilità entro 7-14 giorni dal sopralluogo. Nei periodi di alta stagione (primavera e autunno) può volerci un po\' di più. Ti consigliamo di contattarci appena hai il materiale pronto.',
    },
    {
      category: 'Logistica e tempi',
      question: 'Cosa succede se il lavoro dura più del previsto?',
      answer:
        'In 180+ lavori non ci è mai capitato di sforare i tempi dichiarati. Se dovesse succedere per un imprevisto (es. fondo più irregolare del previsto), ti avvisiamo subito e concordiamo insieme come procedere. Il prezzo extra per i giorni aggiuntivi è solo quello dei materiali di consumo, non della manodopera.',
    },
  ],
};
