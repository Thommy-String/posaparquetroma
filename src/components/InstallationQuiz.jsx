import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PHONE_NUMBER } from '../utils/constants';
import { quizDatabase } from '../utils/quizData';

// --- IMPORTA TUTTE LE ICONE NECESSARIE ---
import {
  ClipboardCheck, Layers, Timer, Move3d, LayoutGrid,
  Sparkles, Compass, GitBranch, Scissors, Hammer, Paintbrush, Scaling,
  Search, MessageCircle, Bookmark,
  Calculator, Settings2, Plus, Minus,
  DoorOpen, Trash2, Check, Lock, Truck, Sofa, Package, Phone, Star
} from 'lucide-react';
import rovereNaturale from '../assets/images/parquet/rovereNaturale.webp';
import rovereSpina from '../assets/images/parquet/rovereNaturaleSpinaItaliana.webp';
import parquetLaminato from '../assets/images/parquet/parquetLaminato.webp';
import parquetSPCSpina from '../assets/images/parquet/parquetSPCspina.webp';
import parquetSPC from '../assets/images/parquet/parquetSPC.webp';
import battiscopa5cm from '../assets/images/parquet/battiscopa5cm.webp';
import battiscopa10cm from '../assets/images/parquet/battiscopa10cm.webp';
import parquetFlottante from '../assets/images/primaDopoLavori/dopo2.webp'

// --- MAPPA ICONE PER LE FASI ---
const iconMap = {
  'search': (props) => <Search {...props} />, // <-- ICONA AGGIUNTA
  'clipboard-check': (props) => <ClipboardCheck {...props} />,
  'layers': (props) => <Layers {...props} />,
  'timer': (props) => <Timer {...props} />,
  'move-3d': (props) => <Move3d {...props} />,
  'layout-grid': (props) => <LayoutGrid {...props} />,
  'sparkles': (props) => <Sparkles {...props} />,
  'compass': (props) => <Compass {...props} />,
  'git-branch': (props) => <GitBranch {...props} />,
  'scissors': (props) => <Scissors {...props} />,
  'hammer': (props) => <Hammer {...props} />,
  'paintbrush': (props) => <Paintbrush {...props} />,
  'scaling': (props) => <Scaling {...props} />,
};

// --- CONFIGURAZIONE PREZZI ---
const POSA_PRICES = {
  base: {
    prefinito_dritto: 25, prefinito_spina: 30, prefinito_flottante: 22, spc_dritto: 17, spc_spina: 25,
    laminato: 17, battiscopa_low: 7, battiscopa_high: 9,
  },
  variables: {
    primer_su_vecchio_mq: 5, rimozione_e_smaltimento_mq: 12,
    spostamento_mobili_piccoli: 90, spostamento_mobili_grandi: 150,
    colla_al_mq: 7,
    rimozione_battiscopa_ml: 3.50,
    taglio_porte_cad: 60,
    taglio_porta_blindata_cad: 150,
    smaltimento_rifiuti_forfait: 100,
  }
};

// --- DATABASE PROCESSI (Invariato) ---
const POSA_PROCESS_STEPS = {
  prefinito_dritto: [
    { icon: 'clipboard-check', title: 'Fase 1: Preparazione Fondo', description: 'Verifica umidità e planarità del massetto. Stesura del collante ecologico.' },
    { icon: 'layers', title: 'Fase 2: Posa Incollata Dritta', description: 'Incolliamo ogni tavola con precisione, garantendo una posa solida, stabile e silenziosa.' },
    { icon: 'timer', title: 'Fase 3: Assestamento (24-48h)', description: 'Il pavimento necessita di 24-48 ore per l\'asciugatura completa della colla prima di poter essere calpestato.' }
  ],
  prefinito_flottante: [
    { icon: 'move-3d', title: 'Fase 1: Posa del Materassino', description: 'Stendiamo un materassino fonoassorbente di alta qualità per proteggere il legno e ridurre il rumore.' },
    { icon: 'layout-grid', title: 'Fase 2: Posa Flottante', description: 'Le tavole in legno nobile vengono posate a secco incastrandole (o incollando solo l\'incastro maschio-femmina).' },
    { icon: 'sparkles', title: 'Fase 3: Finitura Immediata', description: 'Il pavimento è subito calpestabile non essendo incollato a terra. Installiamo il battiscopa e consegnamo.' }
  ],
  prefinito_spina: [
    { icon: 'compass', title: 'Fase 1: Tracciatura Millimetrica', description: 'La posa a spina (Italiana, Francese o Ungherese) richiede una tracciatura a terra precisa dell\'asse centrale.' },
    { icon: 'git-branch', title: 'Fase 2: Incollaggio a Schema', description: 'Ogni singola tavola viene incollata al massetto seguendo lo schema con massima precisione.' },
    { icon: 'timer', title: 'Fase 3: Assestamento (48h)', description: 'Data la complessità, attendiamo 48 ore per garantire l\'adesione perfetta di ogni elemento.' }
  ],
  spc_dritto: [
    { icon: 'move-3d', title: 'Fase 1: Posa del Materassino', description: 'Stendiamo il materassino isolante specifico per SPC, che serve a compensare micro-irregolarità.' },
    { icon: 'layout-grid', title: 'Fase 2: Installazione a Click', description: 'La posa avviene a secco, senza colla. Le doghe vengono incastrate tra loro con il sistema a click.' },
    { icon: 'sparkles', title: 'Fase 3: Finitura e Uso Immediato', description: 'Installiamo il battiscopa. Il pavimento è flottante, quindi calpestabile e arredabile subito.' }
  ],
  spc_spina: [
    { icon: 'compass', title: 'Fase 1: Tracciatura e Materassino', description: 'Stendiamo il materassino e tracciamo l\'asse di posa per la spina, che richiede più precisione.' },
    { icon: 'layout-grid', title: 'Fase 2: Installazione a Click (Spina)', description: 'La posa avviene a secco, incastrando le doghe con lo schema a spina dedicato.' },
    { icon: 'sparkles', title: 'Fase 3: Finitura e Uso Immediato', description: 'Installiamo il battiscopa. Il pavimento è flottante e subito calpestabile.' }
  ],
  laminato: [
    { icon: 'move-3d', title: 'Fase 1: Posa del Tappetino', description: 'Stendiamo il tappetino isolante, essenziale per il comfort acustico e per proteggere il laminato.' },
    { icon: 'layout-grid', title: 'Fase 2: Posa Flottante a Click', description: 'Le tavole di laminato vengono posate a secco, incastrandole l\'una con l\'altra.' },
    { icon: 'sparkles', title: 'Fase 3: Finitura Immediata', description: 'Dopo aver posato le tavole, installiamo il battiscopa. Il pavimento è subito pronto.' }
  ],
  battiscopa_low: [
    { icon: 'scissors', title: 'Fase 1: Taglio di Precisione', description: 'Eseguiamo tagli a 45° precisi sugli angoli (interni ed esterni) per giunzioni invisibili.' },
    { icon: 'hammer', title: 'Fase 2: Fissaggio', description: 'Fissiamo il battiscopa alla parete utilizzando collanti specifici o chiodini in acciaio quasi invisibili.' },
    { icon: 'paintbrush', title: 'Fase 3: Sigillatura', description: 'Per un look pulito e finito, sigilliamo la parte superiore del battiscopa e gli angoli.' }
  ],
  battiscopa_high: [
    { icon: 'scissors', title: 'Fase 1: Taglio di Precisione', description: 'Eseguiamo tagli a 45° precisi sugli angoli (interni ed esterni) per giunzioni invisibili.' },
    { icon: 'hammer', title: 'Fase 2: Fissaggio', description: 'Fissiamo il battiscopa alla parete utilizzando collanti specifici o chiodini in acciaio quasi invisibili.' },
    { icon: 'paintbrush', title: 'Fase 3: Sigillatura', description: 'Per un look pulito e finito, sigilliamo la parte superiore del battiscopa e gli angoli.' }
  ],
};

// --- MODIFICA 4: MAPPA DEI NOMI PULITI ---
const SERVICE_NAME_MAP = {
  prefinito_dritto: "Posa Prefinito Dritto",
  prefinito_spina: "Posa Prefinito a Spina",
  prefinito_flottante: "Posa Prefinito Flottante",
  spc_dritto: "Posa SPC Dritto",
  spc_spina: "Posa SPC a Spina",
  laminato: "Posa Laminato",
  battiscopa_low: "Posa Battiscopa (<= 5cm)",
  battiscopa_high: "Posa Battiscopa (> 5cm)",
};

const SERVICE_BACKGROUND_MAP = {
  prefinito_dritto: rovereNaturale,
  prefinito_spina: rovereSpina,
  prefinito_flottante: parquetFlottante,
  spc_dritto: parquetSPC,
  spc_spina: parquetSPCSpina,
  laminato: parquetLaminato,
  battiscopa_low: battiscopa5cm,
  battiscopa_high: battiscopa10cm,
};

const SERVICE_PRODUCTIVITY = {
  prefinito_dritto: { unitPerDay: 35, setupBuffer: 0.5 },
  prefinito_spina: { unitPerDay: 20, setupBuffer: 0.5 },
  prefinito_flottante: { unitPerDay: 45, setupBuffer: 0.3 },
  spc_dritto: { unitPerDay: 55, setupBuffer: 0.3 },
  spc_spina: { unitPerDay: 35, setupBuffer: 0.3 },
  laminato: { unitPerDay: 60, setupBuffer: 0.3 },
  battiscopa_low: { unitPerDay: 120, setupBuffer: 0.2 },
  battiscopa_high: { unitPerDay: 100, setupBuffer: 0.2 },
  default: { unitPerDay: 40, setupBuffer: 0.4 },
};

// --- ICONE E LABEL PERSONALIZZATE PER I BOTTONI DELLA CTA (Estimate) ---

// Configurazione per le pagine di servizio: mappa pricingId → opzioni Step 1
const SERVICE_PAGE_CONFIG = {
  'prefinito': {
    step1Title: 'Che tipo di posa vuoi?',
    allowedTypes: ['prefinito_dritto', 'prefinito_spina', 'prefinito_flottante'],
    categories: null, // Mostra come griglia singola
  },
  'prefinito-flottante': {
    step1Title: 'Posa flottante selezionata',
    allowedTypes: ['prefinito_flottante'],
    categories: null,
  },
  'prefinito-spina': {
    step1Title: 'Posa a spina selezionata',
    allowedTypes: ['prefinito_spina'],
    categories: null,
  },
  'spc': {
    step1Title: 'Che tipo di posa SPC vuoi?',
    allowedTypes: ['spc_dritto', 'spc_spina'],
    categories: null,
  },
  'laminato': {
    step1Title: 'Posa laminato selezionata',
    allowedTypes: ['laminato'],
    categories: null,
  },
  'battiscopa': {
    step1Title: 'Altezza del battiscopa',
    allowedTypes: ['battiscopa_low', 'battiscopa_high'],
    categories: null,
  },
  'scala-parquet': {
    step1Title: 'Rivestimento scala',
    allowedTypes: [],
    categories: null,
  },
};

// --- MAPPA COLORI PASTEL PER SERVIZI ---
const SERVICE_COLOR_MAP = {
  'prefinito': { bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-100', accent: 'text-orange-600' },
  'prefinito-flottante': { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-100', accent: 'text-amber-600' },
  'prefinito-spina': { bg: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-100', accent: 'text-pink-600' },
  'spc': { bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-100', accent: 'text-green-600' },
  'laminato': { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-100', accent: 'text-emerald-600' },
  'battiscopa': { bg: 'bg-slate-50', text: 'text-slate-900', border: 'border-slate-100', accent: 'text-slate-600' },
  'scala-parquet': { bg: 'bg-violet-50', text: 'text-violet-900', border: 'border-violet-100', accent: 'text-violet-600' },
};

const whatsappButton = {
  label: "Invia a Me Stesso",
  icon: MessageCircle,
  bg: "bg-[#25D366]",
  hoverBg: "hover:bg-[#128C7E]",
  textColor: "text-white"
};
const callButton = {
  label: "Chiama Ora",
  icon: PHONE_NUMBER ? PHONE_NUMBER : '',
  // Stili allineati con la Hero
  bg: "bg-white",
  border: "border-slate-900",
  textColor: "text-slate-900",
  shadow: "shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]"
};

// Componente helper per le card-bottone in stile neo-brutalist
function QuizOption({ label, description, name, value, selectedValue, onChange, background, price }) {
  const isSelected = selectedValue === value;

  // Stile "Card Rettangolare" neo-brutalist per le opzioni con immagine (Step 1)
  if (background) {
    return (
      <label
        className={`group relative flex min-h-[140px] cursor-pointer overflow-hidden rounded-2xl border-[3px] transition-all duration-200 ${
          isSelected
            ? 'border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] -translate-x-1 -translate-y-1'
            : 'border-slate-200 hover:border-slate-900 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,0.4)]'
        }`}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => onChange(name, value)}
          className="sr-only"
        />

        {/* Immagine di sfondo */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 ${
            isSelected ? 'scale-110' : 'group-hover:scale-105'
          }`}
          style={{ backgroundImage: `url(${background})` }}
        />
        
        {/* Overlay scuro */}
        <div className={`absolute inset-0 transition-colors duration-300 ${
          isSelected ? 'bg-slate-900/25' : 'bg-slate-900/35 group-hover:bg-slate-900/20'
        }`} />
        
        {/* Contenuto */}
        <div className="relative z-10 flex w-full flex-col justify-between p-5 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-lg font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight block uppercase tracking-tighter">{label}</span>
              {description && (
                <p className="text-xs text-white/90 mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] font-bold">{description}</p>
              )}
            </div>
            {/* Checkmark neo-brutalist */}
            {isSelected && (
              <div className="bg-[#A5D6A7] p-1.5 rounded-lg border-[2.5px] border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex-shrink-0 ml-2">
                <Check className="w-3.5 h-3.5 text-slate-900" strokeWidth={3.5} />
              </div>
            )}
          </div>
          
          {/* Prezzo in basso */}
          {price && (
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-black drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] leading-none">{price}€</span>
              <span className="text-[11px] text-white/80 font-bold uppercase">/mq</span>
            </div>
          )}
        </div>
      </label>
    );
  }

  // Stile "List Item" neo-brutalist per le altre opzioni
  return (
    <label
      className={`group flex items-center justify-between cursor-pointer rounded-xl border-[2.5px] px-4 py-3 transition-all duration-200 ${isSelected
          ? 'border-slate-900 bg-slate-50 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]'
          : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,0.2)]'
        }`}
    >
      <div className="flex flex-col">
        <span className={`text-base font-bold ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
          {label}
        </span>
        {description && (
          <p className="text-sm text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      
      <div className={`w-5 h-5 rounded-md border-[2.5px] flex items-center justify-center transition-all ${
        isSelected ? 'border-slate-900 bg-slate-900' : 'border-slate-300 group-hover:border-slate-400'
      }`}>
        {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3.5} />}
      </div>

      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}

// Il componente principale del Quiz
function InstallationQuiz({ service }) {
  // Configurazione per pagina di servizio (se presente)
  const pricingId = service?.pricingId;
  const pageConfig = pricingId ? SERVICE_PAGE_CONFIG[pricingId] : null;
  const isServicePage = Boolean(pageConfig);
  // Mai auto-selezionare: l'utente sceglie sempre
  const autoSelectedType = null;

  const [unitValue, setUnitValue] = useState(50);
  const unitTimerRef = useRef(null);
  const [showResult, setShowResult] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const formTopRef = useRef(null);
  const estimateRef = useRef(null);
  const [answers, setAnswers] = useState({
    serviceType: '',
    subfloor: 'pavimento_esistente',
    furniture: 'no',
    colla: 'no',
    add_battiscopa: 'no',
    rimozione_battiscopa: 'no',
    taglio_porte: 0,
    taglio_porta_blindata: 0,
    smaltimento: 'no',
  });

  const adjustUnitValue = (amount) => {
    setUnitValue(prev => {
      const next = prev + amount;
      if (next < 10) return 10;
      if (next > 1000) return 1000;
      return next;
    });
    setShowResult(false);
  };

  const startAdjustingUnit = (amount) => {
    adjustUnitValue(amount);
    unitTimerRef.current = setTimeout(() => {
      unitTimerRef.current = setInterval(() => {
        adjustUnitValue(amount);
      }, 60);
    }, 400);
  };

  const stopAdjustingUnit = () => {
    if (unitTimerRef.current) {
      clearTimeout(unitTimerRef.current);
      clearInterval(unitTimerRef.current);
      unitTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopAdjustingUnit();
  }, []);

  const handleChange = (nameOrEvent, directValue) => {
    // Supporta sia chiamata diretta (name, value) che evento nativo (e)
    let name, value;
    if (typeof nameOrEvent === 'string') {
      name = nameOrEvent;
      value = directValue;
    } else {
      name = nameOrEvent.target.name;
      value = nameOrEvent.target.value;
    }
    setAnswers(prev => ({ ...prev, [name]: value }));
    if (name === 'serviceType' && value) {
      setIsExpanded(true);
    }
    setShowResult(false);
  };

  const handleUnitChange = (e) => {
    setUnitValue(Number(e.target.value));
    setShowResult(false);
  };

  const handleCalculate = () => {
    setShowResult(true);
    // Piccolo delay per permettere il render/animazione prima dello scroll
    setTimeout(() => {
        if(estimateRef.current) {
            estimateRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
  };

  // --- LOGICA DINAMICA (Invariata) ---
  const isBattiscopa = answers.serviceType?.includes('battiscopa') ?? false;
  const unitLabel = isBattiscopa ? 'ml' : 'mq';
  const canShowDetails = isExpanded && Boolean(answers.serviceType);
  const showExtraQuestions = canShowDetails && !isBattiscopa;
  const showBattiscopaOption = canShowDetails && !isBattiscopa;
  const isFloatingService = ['laminato', 'spc_dritto', 'spc_spina', 'prefinito_flottante'].includes(answers.serviceType);
  const isPrefinito = ['prefinito_dritto', 'prefinito_spina'].includes(answers.serviceType);
  const requiresGlueQuestion = showExtraQuestions && !isFloatingService;

  const thumbPositionPercentage = useMemo(() => {
    const min = 10, max = 200;
    return ((unitValue - min) / (max - min)) * 100;
  }, [unitValue]);

  // --- MOTORE DI CALCOLO AGGIORNATO ---
  const estimate = useMemo(() => {
    const { serviceType, subfloor, furniture, colla, add_battiscopa, rimozione_battiscopa, taglio_porte, taglio_porta_blindata, smaltimento } = answers;

    if (!serviceType) {
      return null;
    }

    // --- MODIFICA 4: Usa la mappa dei nomi ---
    const serviceName = SERVICE_NAME_MAP[serviceType] || "Servizio";

    const baseUnitPrice = POSA_PRICES.base[serviceType] ?? 0;
    let baseCost = baseUnitPrice * unitValue;
    let variableItems = [];
    let total = baseCost;
    const baseItem = {
      label: serviceName,
      quantity: unitValue,
      unitType: unitLabel,
      unitPrice: baseUnitPrice,
      unitDisplay: unitLabel,
      displayQuantity: `~${unitValue}${unitLabel}`,
      total: baseCost,
    };

    if (showExtraQuestions) {
      if (subfloor === 'pavimento_esistente' && isPrefinito) {
        const unitPrice = POSA_PRICES.variables.primer_su_vecchio_mq;
        const cost = unitPrice * unitValue;
        variableItems.push({
          label: 'Primer su pavimento esistente',
          quantity: unitValue,
          unitType: 'mq',
          unitPrice,
          unitDisplay: 'mq',
          displayQuantity: `~${unitValue}mq`,
          total: cost,
        });
        total += cost;
      }
      if (colla === 'si') {
        const unitPrice = POSA_PRICES.variables.colla_al_mq;
        const cost = unitPrice * unitValue;
        variableItems.push({
          label: 'Fornitura colla',
          quantity: unitValue,
          unitType: 'mq',
          unitPrice,
          unitDisplay: 'mq',
          displayQuantity: `~${unitValue}mq`,
          total: cost,
        });
        total += cost;
      }
    }

    // --- NUOVO CALCOLO BATTISCOPA AGGIUNTIVO ---
    if (add_battiscopa === 'si' && !isBattiscopa) {
        const unitPrice = 7; // Costo fisso €7 al ml
        const cost = unitPrice * unitValue;
        variableItems.push({
          label: 'Posa Battiscopa',
          quantity: unitValue,
          unitType: 'ml',
          unitPrice,
          unitDisplay: 'ml',
          displayQuantity: `~${unitValue}ml (stima)`,
          total: cost,
        });
        total += cost;
    }

    // --- RIMOZIONE BATTISCOPA VECCHIO ---
    if (rimozione_battiscopa === 'si' && !isBattiscopa) {
        const unitPrice = POSA_PRICES.variables.rimozione_battiscopa_ml;
        const cost = unitPrice * unitValue;
        variableItems.push({
          label: 'Rimozione Battiscopa Vecchio',
          quantity: unitValue,
          unitType: 'ml',
          unitPrice,
          unitDisplay: 'ml',
          displayQuantity: `~${unitValue}ml (stima)`,
          total: cost,
        });
        total += cost;
    }

    // --- TAGLIO PORTE ---
    if (taglio_porte > 0 && !isBattiscopa) {
        const unitPrice = POSA_PRICES.variables.taglio_porte_cad;
        const cost = unitPrice * taglio_porte;
        variableItems.push({
          label: 'Taglio Porte',
          quantity: taglio_porte,
          unitType: 'cad',
          unitPrice,
          unitDisplay: 'cad',
          displayQuantity: `${taglio_porte} ${taglio_porte === 1 ? 'porta' : 'porte'}`,
          total: cost,
        });
        total += cost;
    }

    // --- TAGLIO PORTA BLINDATA ---
    if (taglio_porta_blindata > 0 && !isBattiscopa) {
        const unitPrice = POSA_PRICES.variables.taglio_porta_blindata_cad;
        const cost = unitPrice * taglio_porta_blindata;
        variableItems.push({
          label: 'Taglio Porta Blindata',
          quantity: taglio_porta_blindata,
          unitType: 'cad',
          unitPrice,
          unitDisplay: 'cad',
          displayQuantity: `${taglio_porta_blindata} ${taglio_porta_blindata === 1 ? 'porta' : 'porte'}`,
          total: cost,
        });
        total += cost;
    }

    // --- SMALTIMENTO RIFIUTI (forfait fisso) ---
    if (smaltimento === 'si' && !isBattiscopa) {
        const cost = POSA_PRICES.variables.smaltimento_rifiuti_forfait;
        variableItems.push({
          label: 'Smaltimento Rifiuti',
          quantity: 1,
          unitType: 'voce',
          unitPrice: cost,
          unitDisplay: 'voce',
          displayQuantity: 'Forfait',
          total: cost,
        });
        total += cost;
    }

    if (furniture === 'piccoli' || furniture === 'grandi') {
      const unitPrice = furniture === 'piccoli'
        ? POSA_PRICES.variables.spostamento_mobili_piccoli
        : POSA_PRICES.variables.spostamento_mobili_grandi;
      const label = furniture === 'piccoli' ? 'Spostamento Piccoli Mobili' : 'Spostamento Grandi Mobili';
      variableItems.push({
        label,
        quantity: 1,
        unitType: 'voce',
        unitPrice,
        unitDisplay: 'voce',
        displayQuantity: 'Forfait',
        total: unitPrice,
      });
      total += unitPrice;
    }

    let typeStepsKey = serviceType;
    if (serviceType.includes('prefinito_spina')) typeStepsKey = 'prefinito_spina';

    const typeSteps = POSA_PROCESS_STEPS[typeStepsKey];

    return {
      // --- MODIFICA 4: Label pulita ---
      baseItem,
      variableItems,
      total,
      typeSteps,
      timeEstimate: (() => {
        const productivity = SERVICE_PRODUCTIVITY[serviceType] || SERVICE_PRODUCTIVITY.default;
        let estimatedDays = (productivity.setupBuffer ?? 0) + (unitValue / (productivity.unitPerDay || 1));

        if (furniture === 'piccoli') {
          estimatedDays += 0.2;
        }
        if (furniture === 'grandi') {
          estimatedDays += 0.4;
        }
        if (colla === 'si' && requiresGlueQuestion) {
          estimatedDays += 0.15;
        }
        if (add_battiscopa === 'si') {
             estimatedDays += 0.2;
        }
        if (rimozione_battiscopa === 'si') {
             estimatedDays += 0.15;
        }
        if (taglio_porte > 0) {
             estimatedDays += taglio_porte * 0.05;
        }
        if (taglio_porta_blindata > 0) {
             estimatedDays += taglio_porta_blindata * 0.1;
        }
        if (smaltimento === 'si') {
             estimatedDays += 0.15;
        }

        const adjustedDays = Math.max(0, estimatedDays - 0.3);
        const displayDays = Math.max(1, Math.floor(adjustedDays));
        const label = displayDays === 1 ? '1 giorno' : `${displayDays} giorni`;

        return { days: displayDays, label };
      })(),
    };
    // --- MODIFICA 2: Aggiunta 'pavimento_esistente' alla dipendenza ---
  }, [unitValue, answers, showExtraQuestions, isBattiscopa, unitLabel]);

  useEffect(() => {
    if (!requiresGlueQuestion && answers.colla !== 'no') {
      setAnswers(prev => ({ ...prev, colla: 'no' }));
    }
  }, [requiresGlueQuestion, answers.colla]);

  useEffect(() => {
    if (showResult && estimateRef.current) {
      estimateRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showResult]);

  // Se siamo su una pagina servizio senza tipi supportati (es. scala-parquet), non renderizziamo il quiz
  if (isServicePage && pageConfig.allowedTypes.length === 0) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answers.serviceType) {
      setShowResult(false);
      return;
    }
    setShowResult(true);
  };

  const handleEdit = () => {
    // Non nascondiamo più il risultato, portiamo solo su
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formatCurrency = (value) =>
    value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

  const formatUnitRate = (value, unitDisplay, unitType) => {
    if (unitType === 'voce') return null;
    const amount = value.toLocaleString('it-IT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${amount} €/${unitDisplay}`;
  };

  // Funzione per SALVARE il preventivo (lo invia a sé stessi o apre WA)
  const handleWhatsAppClick = () => {
    // 1. Traccia l'intenzione (opzionale)
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }

    if (!estimate) return;

    // 1. Prepara la lista
    const allItems = [estimate.baseItem, ...estimate.variableItems].filter(Boolean);
    const itemsList = allItems
      .map(item => `- ${item.label}: ${item.displayQuantity}`)
      .join('\n');

    // 2. Pulisce il numero di telefono per il link
    const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, '');

    // 3. Costruisce il messaggio rivolto all'azienda
    const lines = [
      "👋 Ciao, ho appena calcolato questo preventivo sul vostro sito e vorrei maggiori informazioni:",
      "",
      itemsList,
      "",
      `*Totale Stimato: ${formatCurrency(estimate.total)}*`,
      "",
      `Link configuratore: ${window.location.href}`
    ];

    const message = lines.join("\n");
    const encodedMessage = encodeURIComponent(message);

    // Apre direttamente la chat con l'azienda
    window.location.href = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  };

  // Funzione per INVIARE il preventivo ALL'AZIENDA (Alias di handleWhatsAppClick per compatibilità o logica futura)
  const handleSendToCompany = handleWhatsAppClick;

  return (
    <section id="home-preventivatore" className="pt-16 pb-24 bg-white relative overflow-hidden">
      {/* Background sfumato sottile */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-50/40 blur-3xl"></div>
        <div className="absolute top-[60%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-50/40 blur-3xl"></div>
      </div>

      <div className={`relative z-10 ${isServicePage ? 'w-full px-0' : 'container mx-auto px-4'}`}>
        
        {/* Intestazione Sezione */}
        <div className={`text-center mb-4 ${isServicePage ? 'px-4 max-w-3xl mx-auto' : 'max-w-3xl mx-auto'}`}>
         
          {isServicePage ? (
            <>
              {(() => {
                const colors = SERVICE_COLOR_MAP[pricingId] || SERVICE_COLOR_MAP['prefinito'];
                const titleText = quizDatabase[pricingId]?.title || 'Calcola il tuo prezzo su misura';
                const parts = titleText.split(' ');
                const firstWord = parts[0];
                const restWords = parts.slice(1).join(' ');
                
                return (
                  <h2 className="font-[900] uppercase leading-none tracking-tighter text-slate-900 text-[28px] md:text-[48px] mb-2">
                    {firstWord}{' '}
                    <span className={`${colors.bg} ${colors.text} px-2 py-0.5 transform -rotate-1 inline-block border ${colors.border} rounded-sm`}>
                      {restWords?.split(' ')[0] || 'prezzo'}
                    </span>
                    {restWords?.split(' ').slice(1).length > 0 && (
                      <>
                        <br /><span className={colors.accent}>{restWords?.split(' ').slice(1).join(' ')}</span>
                      </>
                    )}
                  </h2>
                );
              })()}
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-5xl font-[800] text-slate-900 tracking-tight leading-tight mb-4">
                Calcola il tuo <span className="bg-yellow-100 px-2 rounded-sm">preventivo</span> in 1 minuto
              </h2>
              <p className="text-base md:text-lg text-slate-500 font-medium max-w-lg mx-auto">
                Seleziona il servizio, inserisci i metri e scopri subito il prezzo.
              </p>
            </>
          )}
        </div>


        <div className={isServicePage ? 'w-full' : 'max-w-5xl mx-auto'}>
          {/* --- IL FORM --- */}
          <form onSubmit={handleSubmit} className="relative z-10">
            {/* Card Form Stile Documento */}
            {/* Rimosso pointer-events-none e opacity reduction su showResult per permettere modifica diretta */}
            <div className={`bg-white overflow-hidden transition-all duration-500 ease-in-out ${isServicePage ? 'rounded-none border-0' : 'rounded-2xl border border-slate-200 shadow-lg'}`}>
              
              {/* Barra di progresso decorativa in alto */}
              <div className="h-1.5 w-full bg-emerald-100">
                 <div 
                   className="h-full bg-emerald-500 rounded-r-full transition-all duration-500 ease-out"
                   style={{ 
                     width: canShowDetails 
                       ? (showResult ? '100%' : '66%') 
                       : '33%' 
                   }}
                 />
              </div>

              <div className="p-6 md:p-10">
                {/* Step 1 - Tipo di servizio */}
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border-[2px] border-slate-900 text-white font-black text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,0.3)]">1</span>
                    <h3 ref={formTopRef} className="text-xl font-bold text-slate-900">
                       {isServicePage ? (pageConfig.step1Title || 'Scegli il tipo') : 'Scegli il tuo pavimento'}
                    </h3>
                  </div>
                  
                  {/* ── SERVICE PAGE: mostra le opzioni filtrate ── */}
                  {isServicePage && pageConfig.allowedTypes.length > 0 && (
                    <div className={`grid ${pageConfig.allowedTypes.length === 1 ? 'grid-cols-1 max-w-xs' : 'grid-cols-2 md:grid-cols-3'} gap-4`}>
                      {pageConfig.allowedTypes.map((typeKey) => (
                        <QuizOption
                          key={typeKey}
                          label={SERVICE_NAME_MAP[typeKey]?.replace('Posa ', '') || typeKey}
                          name="serviceType"
                          value={typeKey}
                          background={SERVICE_BACKGROUND_MAP[typeKey]}
                          price={POSA_PRICES.base[typeKey]}
                          selectedValue={answers.serviceType}
                          onChange={handleChange}
                        />
                      ))}
                    </div>
                  )}

                  {/* ── HOMEPAGE: full 2-category grid ── */}
                  {!isServicePage && (
                    <>
                      {/* CATEGORIA 1: PARQUET LEGNO (PREFINITO) */}
                      <div className="mb-12">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Parquet in Legno (Prefinito)</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <QuizOption label="Parquet prefinito" description="Posa Incollata" name="serviceType" value="prefinito_dritto" background={SERVICE_BACKGROUND_MAP.prefinito_dritto} price={POSA_PRICES.base.prefinito_dritto} selectedValue={answers.serviceType} onChange={handleChange} />
                            <QuizOption label="Prefinito Spina" description="Tutti i tipi di spina" name="serviceType" value="prefinito_spina" background={SERVICE_BACKGROUND_MAP.prefinito_spina} price={POSA_PRICES.base.prefinito_spina} selectedValue={answers.serviceType} onChange={handleChange} />
                            <QuizOption label="Prefinito Flottante" description="Senza Colla" name="serviceType" value="prefinito_flottante" background={SERVICE_BACKGROUND_MAP.prefinito_flottante} price={POSA_PRICES.base.prefinito_flottante} selectedValue={answers.serviceType} onChange={handleChange} />
                          </div>
                      </div>

                      {/* CATEGORIA 2: VINILICI E LAMINATI */}
                      <div className="mb-6">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center">Vinilici (SPC) & Laminati</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             <QuizOption label="SPC Dritto" description="Vinilico Click" name="serviceType" value="spc_dritto" background={SERVICE_BACKGROUND_MAP.spc_dritto} price={POSA_PRICES.base.spc_dritto} selectedValue={answers.serviceType} onChange={handleChange} />
                             <QuizOption label="SPC Spina" description="Vinilico Spina" name="serviceType" value="spc_spina" background={SERVICE_BACKGROUND_MAP.spc_spina} price={POSA_PRICES.base.spc_spina} selectedValue={answers.serviceType} onChange={handleChange} />
                             <QuizOption label="Laminato" description="Flottante Click" name="serviceType" value="laminato" background={SERVICE_BACKGROUND_MAP.laminato} price={POSA_PRICES.base.laminato} selectedValue={answers.serviceType} onChange={handleChange} />
                          </div>
                      </div>
                    </>
                  )}

                </div>

                <div className={`transition-all duration-700 ease-in-out overflow-hidden ${canShowDetails ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    
                    <div className="py-8"></div> {/* Spaziatore bianco */}
                    
                    <hr className="border-slate-100 mb-8" />
                    
                    {/* Step 2 - Quantità */}
                    <div className="pb-12 border-b border-slate-100 mb-10">
                       <div className="flex items-center gap-3 mb-8">
                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border-[2px] border-slate-900 text-white font-black text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,0.3)]">2</span>
                        <h3 className="text-xl font-bold text-slate-900">
                          Quanto è grande l'area?
                        </h3>
                      </div>
                      
                      <div className="bg-slate-50 rounded-xl p-8 border-[2px] border-slate-200 flex flex-col items-center justify-center">
                          
                          <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">
                            Metri Quadrati
                          </label>

                          <div className="flex items-center justify-between w-full max-w-[340px] mb-8 select-none">
                            {/* Bottone Meno — neo-brutalist */}
                            <button 
                              type="button"
                              onMouseDown={() => startAdjustingUnit(-1)}
                              onMouseUp={stopAdjustingUnit}
                              onMouseLeave={stopAdjustingUnit}
                              onTouchStart={(e) => { e.preventDefault(); startAdjustingUnit(-1); }}
                              onTouchEnd={stopAdjustingUnit}
                              className="w-14 h-14 flex items-center justify-center rounded-xl border-[2.5px] border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer hover:bg-slate-50"
                            >
                              <Minus className="w-6 h-6 text-slate-900" strokeWidth={3} />
                            </button>

                            <div className="flex flex-col items-center flex-1">
                              <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-slate-900 tabular-nums leading-none tracking-tighter">
                                  {unitValue}
                                </span>
                                <span className="text-xl font-bold text-slate-400">{unitLabel}</span>
                              </div>
                            </div>

                            {/* Bottone Più — neo-brutalist green shadow */}
                            <button 
                              type="button"
                              onMouseDown={() => startAdjustingUnit(1)}
                              onMouseUp={stopAdjustingUnit}
                              onMouseLeave={stopAdjustingUnit}
                              onTouchStart={(e) => { e.preventDefault(); startAdjustingUnit(1); }}
                              onTouchEnd={stopAdjustingUnit}
                              className="w-14 h-14 flex items-center justify-center rounded-xl border-[2.5px] border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer hover:bg-slate-50"
                            >
                              <Plus className="w-6 h-6 text-slate-900" strokeWidth={3} />
                            </button>
                          </div>
                      
                          {/* Slider */}
                          <div className="w-full max-w-sm px-4 opacity-60 hover:opacity-100 transition-opacity">
                            <input
                              type="range" min={5} max={250} step={1} value={unitValue} onChange={handleUnitChange}
                              className="range-quiz"
                              style={{
                                background: `linear-gradient(to right, #0f172a ${((unitValue - 5) / (250 - 5)) * 100}%, #e2e8f0 ${((unitValue - 5) / (250 - 5)) * 100}%)`
                              }}
                            />
                            <div className="flex justify-between text-[10px] text-slate-400 mt-3 font-bold uppercase tracking-widest">
                              <span>Min 5</span>
                              <span>250+</span>
                            </div>
                          </div>
                      </div>
                    </div>

                    {/* Step 3 - Logistica & Extra */}
                    {(showExtraQuestions || (!showExtraQuestions && canShowDetails)) && (
                      <div className="pb-4">
                         <div className="flex items-center gap-3 mb-6">
                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border-[2px] border-slate-900 text-white font-black text-sm shadow-[2px_2px_0px_0px_rgba(15,23,42,0.3)]">3</span>
                          <h3 className="text-xl font-bold text-slate-900">
                            Dettagli & Servizi Extra
                          </h3>
                        </div>

                        {/* Nascondi solo Sottofondo/Colla per SPC e Laminato */}
                        {answers.serviceType && !answers.serviceType.includes('spc') && answers.serviceType !== 'laminato' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Sottofondo & Superficie */}
                            {showExtraQuestions && (
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-base font-bold text-slate-700 mb-2">Superficie di posa</label>
                                  <div className="space-y-2">
                                    <QuizOption label="Pavimento esistente" description="Copre il vecchio" name="subfloor" value="pavimento_esistente" selectedValue={answers.subfloor} onChange={handleChange} />
                                    <QuizOption label="Massetto" name="subfloor" value="massetto" selectedValue={answers.subfloor} onChange={handleChange} />
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Colla */}
                            {requiresGlueQuestion && (
                              <div className="space-y-6">
                                <div>
                                  <label className="block text-base font-bold text-slate-700 mb-2">Hai bisogno anche della colla?</label>
                                  <div className="space-y-2">
                                    <QuizOption label="Aggiungete la colla al preventivo" description={`+${POSA_PRICES.variables.colla_al_mq}€/mq`} name="colla" value="si" selectedValue={answers.colla} onChange={handleChange} />
                                    <QuizOption label="Ho già la colla" name="colla" value="no" selectedValue={answers.colla} onChange={handleChange} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                      {/* --- SERVIZI EXTRA TOGGLEABILI (Larger Colored Cards) --- */}
                      {showBattiscopaOption && (
                        <div className="mt-10 pt-8 border-t-2 border-dashed border-slate-200">
                          <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Servizi aggiuntivi (opzionali)</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                            {/* ── Piccoli Mobili (amber) ── */}
                            <button
                              type="button"
                              onClick={() => handleChange('furniture', answers.furniture === 'piccoli' ? 'no' : 'piccoli')}
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 text-left ${
                                answers.furniture === 'piccoli'
                                  ? 'border-amber-500 bg-amber-50 shadow-[3px_3px_0px_0px_rgba(245,158,11,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-[2px_2px_0px_0px_rgba(245,158,11,0.2)]'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.furniture === 'piccoli' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'}`}>
                                  <Package className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                {answers.furniture === 'piccoli' && (
                                  <div className="bg-amber-500 p-1 rounded-md">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Spostamento Piccoli Mobili</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€90 forfait</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Sedie, tavolini, oggetti leggeri</span>
                              </div>
                            </button>

                            {/* ── Grandi Mobili (orange) ── */}
                            <button
                              type="button"
                              onClick={() => handleChange('furniture', answers.furniture === 'grandi' ? 'no' : 'grandi')}
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 text-left ${
                                answers.furniture === 'grandi'
                                  ? 'border-orange-500 bg-orange-50 shadow-[3px_3px_0px_0px_rgba(249,115,22,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-orange-300 hover:shadow-[2px_2px_0px_0px_rgba(249,115,22,0.2)]'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.furniture === 'grandi' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'}`}>
                                  <Sofa className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                {answers.furniture === 'grandi' && (
                                  <div className="bg-orange-500 p-1 rounded-md">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Spostamento Grandi Mobili</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€150 forfait</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Armadi, divani, librerie pesanti</span>
                              </div>
                            </button>

                            {/* ── Rimozione Battiscopa (red) ── */}
                            <button
                              type="button"
                              onClick={() => handleChange('rimozione_battiscopa', answers.rimozione_battiscopa === 'si' ? 'no' : 'si')}
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 text-left ${
                                answers.rimozione_battiscopa === 'si'
                                  ? 'border-red-500 bg-red-50 shadow-[3px_3px_0px_0px_rgba(239,68,68,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-red-300 hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,0.2)]'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.rimozione_battiscopa === 'si' ? 'bg-red-500 text-white' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>
                                  <Trash2 className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                {answers.rimozione_battiscopa === 'si' && (
                                  <div className="bg-red-500 p-1 rounded-md">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Rim. Battiscopa esistente</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€3,50 / ml</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Stacchiamo il vecchio zoccolino</span>
                              </div>
                            </button>

                            {/* ── Posa Battiscopa (emerald) ── */}
                            <button
                              type="button"
                              onClick={() => handleChange('add_battiscopa', answers.add_battiscopa === 'si' ? 'no' : 'si')}
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 text-left ${
                                answers.add_battiscopa === 'si'
                                  ? 'border-emerald-500 bg-emerald-50 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-[2px_2px_0px_0px_rgba(16,185,129,0.2)]'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.add_battiscopa === 'si' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'}`}>
                                  <Hammer className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                {answers.add_battiscopa === 'si' && (
                                  <div className="bg-emerald-500 p-1 rounded-md">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Posa Nuovo Battiscopa</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€7 / ml</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Taglio a 45°, incollaggio e sigillatura</span>
                              </div>
                            </button>

                            

                            {/* ── Taglio Porte (blue, stepper) ── */}
                            <div
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 ${
                                answers.taglio_porte > 0
                                  ? 'border-blue-500 bg-blue-50 shadow-[3px_3px_0px_0px_rgba(59,130,246,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-blue-300'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.taglio_porte > 0 ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                                  <DoorOpen className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Taglio Porte</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€60 / cad</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Accorciamo le porte al nuovo livello</span>
                              </div>
                              {/* Stepper in fondo */}
                              <div className="w-full flex items-center justify-center gap-2 pt-2 border-t border-blue-200/50">
                                <button type="button" onClick={() => handleChange('taglio_porte', Math.max(0, answers.taglio_porte - 1))}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border-[2px] border-blue-400 bg-white hover:bg-blue-100 transition-all active:scale-95">
                                  <Minus className="w-4 h-4 text-blue-600" strokeWidth={3} />
                                </button>
                                <div className="flex-1 text-center">
                                  <span className="text-lg font-black text-slate-900 tabular-nums">{answers.taglio_porte}</span>
                                  <span className="text-[10px] text-slate-500 font-bold block">quantità</span>
                                </div>
                                <button type="button" onClick={() => handleChange('taglio_porte', Math.min(20, answers.taglio_porte + 1))}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border-[2px] border-blue-400 bg-white hover:bg-blue-100 transition-all active:scale-95">
                                  <Plus className="w-4 h-4 text-blue-600" strokeWidth={3} />
                                </button>
                              </div>
                            </div>

                            {/* ── Porta Blindata (violet, stepper) ── */}
                            <div
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 ${
                                answers.taglio_porta_blindata > 0
                                  ? 'border-violet-500 bg-violet-50 shadow-[3px_3px_0px_0px_rgba(139,92,246,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-violet-300'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.taglio_porta_blindata > 0 ? 'bg-violet-500 text-white' : 'bg-violet-50 text-violet-600 group-hover:bg-violet-100'}`}>
                                  <Lock className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Porta Blindata</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€150 / cad</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Smontaggio, taglio e rimontaggio</span>
                              </div>
                              {/* Stepper in fondo */}
                              <div className="w-full flex items-center justify-center gap-2 pt-2 border-t border-violet-200/50">
                                <button type="button" onClick={() => handleChange('taglio_porta_blindata', Math.max(0, answers.taglio_porta_blindata - 1))}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border-[2px] border-violet-400 bg-white hover:bg-violet-100 transition-all active:scale-95">
                                  <Minus className="w-4 h-4 text-violet-600" strokeWidth={3} />
                                </button>
                                <div className="flex-1 text-center">
                                  <span className="text-lg font-black text-slate-900 tabular-nums">{answers.taglio_porta_blindata}</span>
                                  <span className="text-[10px] text-slate-500 font-bold block">quantità</span>
                                </div>
                                <button type="button" onClick={() => handleChange('taglio_porta_blindata', Math.min(10, answers.taglio_porta_blindata + 1))}
                                  className="w-8 h-8 flex items-center justify-center rounded-lg border-[2px] border-violet-400 bg-white hover:bg-violet-100 transition-all active:scale-95">
                                  <Plus className="w-4 h-4 text-violet-600" strokeWidth={3} />
                                </button>
                              </div>
                            </div>

                            {/* ── Smaltimento Rifiuti (teal) ── */}
                            <button
                              type="button"
                              onClick={() => handleChange('smaltimento', answers.smaltimento === 'si' ? 'no' : 'si')}
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 text-left ${
                                answers.smaltimento === 'si'
                                  ? 'border-teal-500 bg-teal-50 shadow-[3px_3px_0px_0px_rgba(20,184,166,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-teal-300 hover:shadow-[2px_2px_0px_0px_rgba(20,184,166,0.2)]'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.smaltimento === 'si' ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-600 group-hover:bg-teal-100'}`}>
                                  <Truck className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                {answers.smaltimento === 'si' && (
                                  <div className="bg-teal-500 p-1 rounded-md">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Smaltimento Rifiuti</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€50-150 forfait</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Trasporto e smaltimento scarti di lavorazione. In alternativa puoi fare da solo.</span>
                              </div>
                            </button>

                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* BOTTONE CALCOLA */}
                  {!showResult && (
                    <div className="pt-8 mt-6 border-t-2 border-slate-100 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4">
                      
                      <button
                        type="button"
                        onClick={handleCalculate}
                        disabled={!canShowDetails}
                        className={`group relative flex items-center justify-center gap-3 bg-white border-[2.5px] border-slate-900 px-10 py-4 rounded-xl text-slate-900 font-black uppercase tracking-tighter transition-all duration-200 ${canShowDetails
                          ? 'shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 active:bg-slate-50'
                          : 'opacity-40 cursor-not-allowed border-slate-300 text-slate-400 shadow-none'
                          }`}
                      >
                         <div className={`p-1.5 rounded-lg transition-colors ${canShowDetails ? 'bg-slate-100 group-hover:bg-slate-200' : 'bg-slate-100'}`}>
                            <Calculator className="w-5 h-5 text-slate-900" strokeWidth={2.5} />
                         </div>
                        <span className="text-lg">Mostra la Stima</span>
                      </button>
                      
                       <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-3">
                         Risultato immediato — Senza impegno
                       </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>

          {/* --- IL BLOCCO DEI RISULTATI --- */}
          {showResult && estimate && (
            <div
              ref={estimateRef}
              className="mt-14 animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
              {/* ═══ TITOLO SEZIONE RISULTATO ═══ */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Stima calcolata</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-[800] text-slate-900 tracking-tight">
                  Ecco il tuo <span className="bg-yellow-100 px-1.5 rounded-sm">preventivo</span>
                </h3>
                <div className="flex items-center justify-center gap-3 mt-3">
                  <span className="text-xs text-slate-400 font-medium">{new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="text-slate-200">•</span>
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    <Settings2 size={12} /> Modifica dati
                  </button>
                </div>
              </div>

              {/* ═══ CORPO PREVENTIVO ═══ */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="p-6 md:p-10">
                    
                  {/* Voce base */}
                  <div className="mb-5">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Servizio principale</p>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                       <div className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center rounded-md bg-slate-300 text-white text-[10px] font-black">1</div>
                          <div>
                             <p className="font-bold text-slate-900 text-base leading-tight">{estimate.baseItem.label}</p>
                             <span className="text-xs text-slate-400 font-mono font-medium">{estimate.baseItem.displayQuantity}</span>
                          </div>
                       </div>
                       <div className="text-right pl-4">
                         <p className="font-mono font-extrabold text-lg text-slate-900">{formatCurrency(estimate.baseItem.total)}</p>
                         <span className="text-xs text-slate-400 font-medium">{formatCurrency(estimate.baseItem.unitPrice)}/{estimate.baseItem.unitDisplay}</span>
                       </div>
                    </div>
                  </div>

                  {/* Voci variabili */}
                  {estimate.variableItems.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Servizi aggiuntivi</p>
                      <div className="space-y-2">
                        {estimate.variableItems.map((item, index) => {
                          const unitRate = formatUnitRate(item.unitPrice, item.unitDisplay, item.unitType);
                          return (
                            <div key={`${item.label}-${index}`} className="flex items-center justify-between px-4 py-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
                               <div className="flex items-center gap-3">
                                  <div className="w-5 h-5 flex items-center justify-center rounded-md bg-slate-200 text-slate-500 text-[10px] font-black">{index + 2}</div>
                                  <div>
                                     <p className="font-semibold text-slate-800 text-base leading-tight">{item.label}</p>
                                     <span className="text-xs text-slate-400 font-mono font-medium">{item.displayQuantity}</span>
                                  </div>
                               </div>
                               <div className="text-right pl-4">
                                 <p className="font-mono font-bold text-base text-slate-900">{formatCurrency(item.total)}</p>
                                 {unitRate && <span className="text-xs text-slate-400 font-medium">{unitRate}</span>}
                               </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── Totale + Tempi ── */}
                  <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Tempo stimato */}
                        <div className="flex items-center gap-3 bg-slate-50 px-5 py-4 rounded-xl border border-slate-200">
                           <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                              <Timer className="w-5 h-5 text-slate-500" />
                           </div>
                           <div>
                              <p className="text-xs uppercase font-black text-slate-400 tracking-wider">Tempi stimati</p>
                              <p className="font-extrabold text-xl text-slate-900 leading-none mt-0.5">{estimate.timeEstimate?.label}</p>
                           </div>
                        </div>

                        {/* Totale */}
                        <div className="flex items-center gap-3 bg-slate-900 px-5 py-4 rounded-xl">
                           <div className="flex-1">
                              <p className="text-xs uppercase font-black text-slate-400 tracking-wider">Totale stimato</p>
                              <p className="text-2xl md:text-3xl font-black text-white tracking-tighter leading-none mt-0.5">{formatCurrency(estimate.total)}</p>
                              <p className="text-xs text-slate-500 font-medium mt-1">IVA esclusa • Solo manodopera</p>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* ═══ CTA SECTION ═══ */}
              <div className="mt-8 flex flex-col items-center">
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
                  
                  {/* CTA Salva Preventivo su WhatsApp — Hero-style neo-brutalist */}
                  <button
                    onClick={handleWhatsAppClick}
                    className="group relative inline-flex items-center justify-center gap-4 bg-white border-[2.5px] border-slate-900 px-8 py-4 rounded-xl text-slate-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 active:bg-gray-50 w-full sm:flex-1"
                  >
                    <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.257-.154-2.874.854.854-2.874-.154-.257A8 8 0 1112 20z" fill="#25D366"/>
                      </svg>
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-xs text-green-600 font-bold mb-1 tracking-widest uppercase">Salva il preventivo</span>
                      <span className="text-lg md:text-xl italic">Vai su WhatsApp</span>
                    </div>
                  </button>

                  {/* CTA Chiama — Hero-style neo-brutalist */}
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    onClick={() => {
                      if (typeof window.gtag_report_conversion === 'function') {
                        window.gtag_report_conversion();
                      }
                    }}
                    className="group relative inline-flex items-center justify-center gap-4 bg-white border-[2.5px] border-slate-900 px-8 py-4 rounded-xl text-slate-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 active:bg-gray-50 w-full sm:flex-1"
                  >
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Phone className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-xs text-blue-600 font-bold mb-1 tracking-widest uppercase">+39 334 222 1212</span>
                      <span className="text-lg md:text-xl italic">Chiamaci</span>
                    </div>
                  </a>
                </div>

                <p className="text-xs text-slate-500 font-medium text-center mt-4 leading-relaxed max-w-md">
                  Salva il preventivo su WhatsApp per non perderlo.<br/>Nessun obbligo d'acquisto — preventivo gratuito.
                </p>
              </div>

              {/* ═══ SOCIAL PROOF MINI ═══ */}
              {!isServicePage && (
                <div className="mt-10 text-center">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Scelti da 347+ famiglie a Milano
                  </p>
                  <div className="max-w-xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6">
                    <div className="flex items-center justify-center gap-3">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5 opacity-70" />
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-slate-700 ml-1">4.9/5</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                      "Professionali, puntuali e meticolosi. Hanno trasformato completamente la nostra casa."
                    </p>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default InstallationQuiz;
