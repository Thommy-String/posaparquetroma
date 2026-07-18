import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PHONE_NUMBER } from '../utils/constants';
import { quizDatabase } from '../utils/quizData';
import { gtagReportConversion } from '../utils/analytics';

// --- IMPORTA TUTTE LE ICONE NECESSARIE ---
import {
  ClipboardCheck, Layers, Timer, Move3d, LayoutGrid,
  Sparkles, Compass, GitBranch, Scissors, Hammer, Paintbrush, Scaling,
  Search, MessageCircle, Bookmark,
  Calculator, Settings2, Plus, Minus,
  DoorOpen, Trash2, Check, Lock, Truck, Sofa, Package, Phone, Star, PackageCheck
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

// --- TARIFFA MINIMA PER SERVIZIO (mq minimi fatturati) ---
const MIN_MQ = {
  prefinito_dritto:    40,
  prefinito_spina:     40,
  prefinito_flottante: 40,
  spc_dritto:          40,
  spc_spina:           40,
  laminato:            40,
  battiscopa_low:      null,
  battiscopa_high:     null,
};

// --- PREZZO MINIMO A CORPO PER SERVIZI IN ML (battiscopa) ---
const MIN_TOTAL = {
  battiscopa_low:  300,
  battiscopa_high: 300,
};

// Minimo ml per rimozione battiscopa vecchio (sotto 40ml → prezzo a corpo €80)
const RIM_BAT_MIN_ML = 40;
const RIM_BAT_MIN_PRICE = 80;

// --- CONFIGURAZIONE PREZZI ---
const POSA_PRICES = {
  base: {
    prefinito_dritto: 27, prefinito_spina: 32, prefinito_flottante: 22, spc_dritto: 20, spc_spina: 27,
    laminato: 20, battiscopa_low: 10, battiscopa_high: 12,
  },
  variables: {
    primer_su_vecchio_mq: 6, rimozione_e_smaltimento_mq: 12,
    spostamento_mobili_piccoli: 50, spostamento_mobili_grandi: 250,
    colla_al_mq: 7,
    rimozione_battiscopa_ml: 3.50,
    taglio_porte_cad: 60,
    taglio_porta_blindata_cad: 150,
    smaltimento_rifiuti_forfait: 250,
    facchinaggio_forfait: 200,
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
    step1Title: 'Clicca per iniziare',
    allowedTypes: ['prefinito_flottante'],
    categories: null,
  },
  'prefinito-spina': {
    step1Title: 'Clicca per iniziare',
    allowedTypes: ['prefinito_spina'],
    categories: null,
  },
  'spc': {
    step1Title: 'Che tipo di posa SPC vuoi?',
    allowedTypes: ['spc_dritto', 'spc_spina'],
    categories: null,
  },
  'laminato': {
    step1Title: 'Clicca per iniziare',
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

const CALCULATION_STEPS = [
  { title: 'Analisi dati', icon: Search },
  { title: 'Calcolo costi', icon: Calculator },
  { title: 'Riepilogo finale', icon: Check },
];

const hexToRgb = (hex) => {
  const sanitized = hex.replace('#', '');
  const bigint = parseInt(sanitized, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const rgbToHex = (r, g, b) =>
  `#${[r, g, b]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`;

const mixColor = (from, to, t) => {
  const [r1, g1, b1] = hexToRgb(from);
  const [r2, g2, b2] = hexToRgb(to);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return rgbToHex(r, g, b);
};

const getProgressColor = (progress) => {
  if (progress < 40) {
    return mixColor('#facc15', '#10b981', progress / 40);
  }
  return mixColor('#10b981', '#047857', (progress - 40) / 60);
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
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcProgress, setCalcProgress] = useState(0);
  const [calcStepIndex, setCalcStepIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const formTopRef = useRef(null);
  const estimateRef = useRef(null);
  const calcIntervalRef = useRef(null);
  const calcTimeoutRef = useRef(null);
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
    facchinaggio: 'no',
  });

  const stopCalculationAnimation = () => {
    if (calcIntervalRef.current) {
      clearInterval(calcIntervalRef.current);
      calcIntervalRef.current = null;
    }
    if (calcTimeoutRef.current) {
      clearTimeout(calcTimeoutRef.current);
      calcTimeoutRef.current = null;
    }
  };

  const adjustUnitValue = (amount) => {
    stopCalculationAnimation();
    setUnitValue(prev => {
      const next = prev + amount;
      if (next < 10) return 10;
      if (next > 1000) return 1000;
      return next;
    });
    setIsCalculating(false);
    setCalcProgress(0);
    setCalcStepIndex(0);
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
    return () => {
      stopAdjustingUnit();
      stopCalculationAnimation();
    };
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
    stopCalculationAnimation();
    setIsCalculating(false);
    setCalcProgress(0);
    setCalcStepIndex(0);
    setShowResult(false);
  };

  const handleUnitChange = (e) => {
    stopCalculationAnimation();
    setUnitValue(Number(e.target.value));
    setIsCalculating(false);
    setCalcProgress(0);
    setCalcStepIndex(0);
    setShowResult(false);
  };

  const handleCalculate = () => {
    if (!canShowDetails) return;

    stopCalculationAnimation();
    setShowResult(false);
    setIsCalculating(true);
    setCalcProgress(0);
    setCalcStepIndex(0);

    const totalDurationMs = 4000;
    const tickMs = 50;
    const stepsCount = CALCULATION_STEPS.length;
    const startTime = Date.now();
    const stagedProgress = [
      { at: 0, value: 2, step: 0 },
      { at: 480, value: 16, step: 0 },
      { at: 980, value: 18, step: 0 },
      { at: 1480, value: 42, step: 1 },
      { at: 2120, value: 45, step: 1 },
      { at: 2760, value: 74, step: 2 },
      { at: 3340, value: 78, step: 2 },
      { at: 3760, value: 92, step: 2 },
      { at: 4000, value: 100, step: 2 },
    ];

    const completeCalculation = () => {
      stopCalculationAnimation();
      setCalcProgress(100);
      setCalcStepIndex(stepsCount - 1);
      setIsCalculating(false);
      setShowResult(true);
    };

    calcIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= totalDurationMs) {
        completeCalculation();
        return;
      }

      let currentStage = stagedProgress[0];
      let nextStage = stagedProgress[stagedProgress.length - 1];

      for (let i = 0; i < stagedProgress.length - 1; i++) {
        if (elapsed >= stagedProgress[i].at && elapsed < stagedProgress[i + 1].at) {
          currentStage = stagedProgress[i];
          nextStage = stagedProgress[i + 1];
          break;
        }
      }

      const span = Math.max(1, nextStage.at - currentStage.at);
      const t = (elapsed - currentStage.at) / span;
      const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const progress = Math.round(currentStage.value + (nextStage.value - currentStage.value) * easedT);

      setCalcProgress(progress);
      setCalcStepIndex(Math.min(stepsCount - 1, currentStage.step));
    }, tickMs);

    calcTimeoutRef.current = setTimeout(() => {
      completeCalculation();
    }, totalDurationMs + 120);
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
    const { serviceType, subfloor, furniture, colla, add_battiscopa, rimozione_battiscopa, taglio_porte, taglio_porta_blindata, smaltimento, facchinaggio } = answers;

    if (!serviceType) {
      return null;
    }

    // --- MODIFICA 4: Usa la mappa dei nomi ---
    const serviceName = SERVICE_NAME_MAP[serviceType] || "Servizio";

    const baseUnitPrice = POSA_PRICES.base[serviceType] ?? 0;

    // --- TARIFFA MINIMA MQ: se i mq reali sono inferiori al minimo, si fattura il minimo ---
    const minMq = MIN_MQ[serviceType] ?? null;
    const isMinimumApplied = minMq !== null && unitValue < minMq;
    const effectiveMq = isMinimumApplied ? minMq : unitValue;

    // --- TARIFFA MINIMA A CORPO (battiscopa): se il totale è inferiore al minimo si applica il minimo ---
    const minTotal = MIN_TOTAL[serviceType] ?? null;
    const rawBaseCost = baseUnitPrice * effectiveMq;
    const isMinTotalApplied = minTotal !== null && rawBaseCost < minTotal;
    let baseCost = isMinTotalApplied ? minTotal : rawBaseCost;

    let variableItems = [];
    let total = baseCost;
    const baseItem = {
      label: serviceName,
      quantity: effectiveMq,
      unitType: unitLabel,
      unitPrice: baseUnitPrice,
      unitDisplay: unitLabel,
      displayQuantity: isMinTotalApplied
        ? `${unitValue}${unitLabel} (prezzo a corpo)`
        : isMinimumApplied
          ? `${minMq}${unitLabel} (minimo)`
          : `~${unitValue}${unitLabel}`,
      total: baseCost,
      isMinimumApplied,
      isMinTotalApplied,
      realMq: unitValue,
      minMq,
      minTotal,
    };

    if (showExtraQuestions) {
      if (subfloor === 'pavimento_esistente' && isPrefinito) {
        const unitPrice = POSA_PRICES.variables.primer_su_vecchio_mq;
        const cost = unitPrice * effectiveMq;
        variableItems.push({
          label: 'Primer su pavimento esistente',
          quantity: effectiveMq,
          unitType: 'mq',
          unitPrice,
          unitDisplay: 'mq',
          displayQuantity: `~${effectiveMq}mq`,
          total: cost,
        });
        total += cost;
      }
      if (colla === 'si') {
        const unitPrice = POSA_PRICES.variables.colla_al_mq;
        const cost = unitPrice * effectiveMq;
        variableItems.push({
          label: 'Fornitura colla',
          quantity: effectiveMq,
          unitType: 'mq',
          unitPrice,
          unitDisplay: 'mq',
          displayQuantity: `~${effectiveMq}mq`,
          total: cost,
        });
        total += cost;
      }
    }

    // --- NUOVO CALCOLO BATTISCOPA AGGIUNTIVO ---
    if (add_battiscopa === 'si' && !isBattiscopa) {
        const unitPrice = POSA_PRICES.base.battiscopa_low;
        const BAT_MIN_ML = 40;
        const batMinApplied = unitValue < BAT_MIN_ML;
        const batMinTotal = MIN_TOTAL['battiscopa_low']; // €300
        const rawCost = unitPrice * effectiveMq;
        const cost = batMinApplied ? batMinTotal : rawCost;
        variableItems.push({
          label: 'Posa Battiscopa',
          quantity: effectiveMq,
          unitType: 'ml',
          unitPrice,
          unitDisplay: 'ml',
          displayQuantity: batMinApplied ? 'Prezzo a corpo' : `~${effectiveMq}ml (stima)`,
          total: cost,
          isMinTotalApplied: batMinApplied,
        });
        total += cost;
    }

    // --- RIMOZIONE BATTISCOPA VECCHIO ---
    if (rimozione_battiscopa === 'si' && !isBattiscopa) {
        const unitPrice = POSA_PRICES.variables.rimozione_battiscopa_ml;
        const rimMinApplied = unitValue < RIM_BAT_MIN_ML;
        const rawCost = unitPrice * unitValue;
        const cost = rimMinApplied ? RIM_BAT_MIN_PRICE : rawCost;
        variableItems.push({
          label: 'Rimozione Battiscopa Vecchio',
          quantity: effectiveMq,
          unitType: 'ml',
          unitPrice,
          unitDisplay: 'ml',
          displayQuantity: rimMinApplied ? 'Prezzo a corpo' : `~${unitValue}ml (stima)`,
          total: cost,
          isMinTotalApplied: rimMinApplied,
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

    // --- FACCHINAGGIO / RITIRO MATERIALE ---
    if (facchinaggio === 'si' && !isBattiscopa) {
        const cost = POSA_PRICES.variables.facchinaggio_forfait;
        variableItems.push({
          label: 'Servizio di Facchinaggio',
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
      baseItem,
      variableItems,
      total,
      typeSteps,
      isMinimumApplied,
      isMinTotalApplied,
      minMq,
      minTotal,
      realMq: unitValue,
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
        if (facchinaggio === 'si') {
             estimatedDays += 0.25;
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

    gtagReportConversion({
      redirectUrl: `https://wa.me/${cleanPhone}?text=${encodedMessage}`,
    });
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
              <h2 className="text-2xl md:text-5xl font-[800] text-slate-900 tracking-tight leading-tight mb-4">
                Calcola il tuo <span className="bg-yellow-100 px-2 rounded-sm">preventivo</span> in 1 minuto
              </h2>
              <p className="text-sm md:text-md text-slate-500 font-medium max-w-lg mx-auto">
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 max-w-[1200px] mx-auto">
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
                              aria-label="Diminuisci i metri quadrati"
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
                              {/* Avviso tariffa minima live */}
                              {(() => {
                                const sType = answers.serviceType;
                                const minQ = MIN_MQ[sType] ?? null;
                                const minT = MIN_TOTAL[sType] ?? null;

                                // Caso 1: minimo mq (pavimenti)
                                if (!sType || minQ === null || unitValue >= minQ) {
                                  // Caso 2: minimo a corpo (battiscopa)
                                  if (minT !== null) {
                                    const rawCost = (POSA_PRICES.base[sType] ?? 0) * unitValue;
                                    if (rawCost >= minT) return null;
                                    return (
                                      <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="inline-flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-300 rounded-xl shadow-sm max-w-[230px] text-left">
                                          <span className="text-amber-500 text-base leading-none mt-0.5 flex-shrink-0">💡</span>
                                          <div>
                                            <p className="text-[11px] font-black text-amber-800 leading-tight">Prezzo a corpo</p>
                                            <p className="text-[10px] text-amber-700 leading-snug mt-0.5">
                                              Per questo intervento applichiamo un <strong>prezzo a corpo</strong> a partire da <strong>€{minT.toLocaleString('it-IT')}</strong>.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  return null;
                                }

                                // Caso 1 attivo
                                const minPrice = (POSA_PRICES.base[sType] ?? 0) * minQ;
                                return (
                                  <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="inline-flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-300 rounded-xl shadow-sm max-w-[230px] text-left">
                                      <span className="text-amber-500 text-base leading-none mt-0.5 flex-shrink-0">💡</span>
                                      <div>
                                        <p className="text-[11px] font-black text-amber-800 leading-tight">Tariffa a corpo</p>
                                        <p className="text-[10px] text-amber-700 leading-snug mt-0.5">
                                          Per questo tipo di lavoro applichiamo un <strong>prezzo a corpo</strong> a partire da <strong>€{minPrice.toLocaleString('it-IT')}</strong>.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>

                            {/* Bottone Più — neo-brutalist green shadow */}
                            <button 
                              type="button"
                              aria-label="Aumenta i metri quadrati"
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
                              aria-label="Seleziona i metri quadrati"
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
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5 xl:gap-6">

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
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€50 forfait</span>
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
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€250 forfait</span>
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
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€3,50 / ml (min. €80)</span>
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
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€10 / ml</span>
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
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€250 forfait</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Trasporto e smaltimento scarti di lavorazione. In alternativa puoi fare da solo.</span>
                              </div>
                            </button>

                            {/* ── Facchinaggio / Ritiro Materiale (indigo) ── */}
                            <button
                              type="button"
                              onClick={() => handleChange('facchinaggio', answers.facchinaggio === 'si' ? 'no' : 'si')}
                              className={`group flex flex-col items-start gap-3 px-5 py-5 rounded-xl border-[2.5px] transition-all duration-200 text-left ${
                                answers.facchinaggio === 'si'
                                  ? 'border-indigo-500 bg-indigo-50 shadow-[3px_3px_0px_0px_rgba(99,102,241,0.6)]'
                                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-[2px_2px_0px_0px_rgba(99,102,241,0.2)]'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className={`p-3 rounded-lg transition-colors ${answers.facchinaggio === 'si' ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'}`}>
                                  <PackageCheck className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                {answers.facchinaggio === 'si' && (
                                  <div className="bg-indigo-500 p-1 rounded-md">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3.5} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 w-full">
                                <span className="text-base font-bold text-slate-900 block leading-tight">Servizio di Facchinaggio</span>
                                <span className="text-sm text-slate-500 font-semibold block mt-1">€200 forfait</span>
                                <span className="text-xs text-slate-400 block leading-relaxed mt-2">Ritiriamo il materiale dal negozio con il nostro furgone e scarichiamo nel punto più comodo della casa.</span>
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
                      {!isCalculating ? (
                        <>
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
                        </>
                      ) : (
                        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-500">
                          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-5 md:p-6">
                              {(() => {
                                const activeStep = CALCULATION_STEPS[Math.min(calcStepIndex, CALCULATION_STEPS.length - 1)];
                                const ActiveIcon = activeStep.icon;

                                return (
                                  <>
                                    <div className="mb-3 flex items-center justify-between">
                                      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                                        <ActiveIcon className="w-3.5 h-3.5 text-slate-600" strokeWidth={2.5} />
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 text-center">
                                          {activeStep.title}
                                        </p>
                                      </div>
                                      <span className="text-sm md:text-base font-black text-slate-900 tabular-nums">{calcProgress}%</span>
                                    </div>

                                    <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                                      <div
                                        className="h-full rounded-full transition-[width,background-color] duration-300 ease-out"
                                        style={{ width: `${calcProgress}%`, backgroundColor: getProgressColor(calcProgress) }}
                                      />
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          </div>
                        </div>
                      )}
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
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Il tuo preventivo personalizzato
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Generato il {new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              {/* ═══ CORPO PREVENTIVO ═══ */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                  
                  {/* Riepilogo Voci */}
                  <div className="p-6 md:p-8 space-y-6">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Voci di capitolato</h4>
                      
                      {/* Voce Principale */}
                      <div className="flex items-center justify-between py-4 border-b border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-bold text-lg leading-tight">{estimate.baseItem.label}</span>
                          <span className="text-slate-500 text-left text-sm mt-1">{estimate.baseItem.displayQuantity}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-900 font-black text-xl">{formatCurrency(estimate.baseItem.total)}</span>
                        </div>
                      </div>

                      {/* Voci Extra */}
                      {estimate.variableItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                          <div className="flex flex-col">
                            <span className="text-slate-700 font-semibold text-base leading-tight">{item.label}</span>
                            <span className="text-slate-400 text-left text-xs mt-0.5">{item.displayQuantity}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-900 font-bold text-lg">{formatCurrency(item.total)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Nota Tecnica Minimi (solo se applicati) */}
                    {(estimate.isMinimumApplied || estimate.isMinTotalApplied) && (
                      <div className="p-4 bg-slate-50 rounded-2xl">
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">
                          Nota: Per piccoli interventi sotto i minimi d'opera (40mq o piccoli ml di battiscopa), viene applicata una tariffa a corpo per coprire i costi fissi di logistica e preparazione cantiere.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer con Totale e Tempi e CTA Integrate - Look Professionale */}
                  <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Durata stimata lavori</span>
                      <div className="flex items-center gap-2 text-slate-900">
                        <Timer size={14} />
                        <span className="font-extrabold text-lg">{estimate.timeEstimate?.label}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Totale Stimato</span>
                      <div className="flex flex-col items-center md:items-end">
                        <span className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                          {formatCurrency(estimate.total)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Servizio di posa, IVA esclusa</span>
                      </div>
                    </div>
                  </div>

                  {/* Pulsanti Azione Integrati - Stile Neo-Brutalist Coordinato */}
                  <div className="bg-white p-6 md:p-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* CTA WhatsApp */}
                    <button
                      onClick={handleWhatsAppClick}
                      className="group relative inline-flex items-center justify-center gap-4 bg-white border-[2.5px] border-slate-900 px-8 py-4 rounded-xl text-slate-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(37,211,102,1)] hover:shadow-[2px_2px_0px_0px_rgba(37,211,102,1)] hover:translate-x-1 hover:translate-y-1 active:bg-gray-50 w-full sm:flex-1"
                    >
                      <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                        <MessageCircle className="w-5 h-5 text-[#25D366]" strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] text-green-600 font-bold mb-1 tracking-widest uppercase text-left">Salva l'offerta</span>
                        <span className="text-lg md:text-xl italic">Vai su WhatsApp</span>
                      </div>
                    </button>

                    {/* CTA Chiama */}
                    <button
                      onClick={() => {
                        gtagReportConversion({
                          redirectUrl: `tel:${PHONE_NUMBER}`,
                        });
                      }}
                      className="group relative inline-flex items-center justify-center gap-4 bg-white border-[2.5px] border-slate-900 px-8 py-4 rounded-xl text-slate-900 font-black uppercase tracking-tighter transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] hover:shadow-[2px_2px_0px_0px_rgba(59,130,246,1)] hover:translate-x-1 hover:translate-y-1 active:bg-gray-50 w-full sm:flex-1"
                    >
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <Phone className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] text-blue-600 font-bold mb-1 tracking-widest uppercase text-left">Domande?</span>
                        <span className="text-lg md:text-xl italic">Chiamaci</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Link Modifica Dati più discreto */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
                  >
                    <Settings2 size={12} strokeWidth={2.5} />
                    Modifica i dati inseriti
                  </button>
                </div>
              </div>

                {/* Note finali */}
                <div className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-xs text-slate-400 font-medium text-center md:text-left leading-relaxed">
                      * Il preventivo è una stima basata sui dati inseriti. La conferma avverrà dopo il sopralluogo tecnico gratuito a Roma.
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-1.5 opacity-50">
                      <Lock size={12} className="text-slate-400" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocollo Prezzi 2026</span>
                    </div>
                  </div>
                </div>

              

              {/* ═══ SOCIAL PROOF MINI ═══ */}
              {!isServicePage && (
                <div className="mt-10 text-center">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                    Scelti da 347+ famiglie a roma
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