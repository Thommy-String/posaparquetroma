import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PHONE_NUMBER } from '../utils/constants';
import { quizDatabase } from '../utils/quizData';
import { gtagReportConversion } from '../utils/analytics';

// --- IMPORT ICONE ---
import {
  ClipboardCheck, Layers, Timer, Move3d, LayoutGrid,
  Sparkles, Compass, GitBranch, Scissors, Hammer, Paintbrush, Scaling,
  Search, MessageCircle, Bookmark, CheckCircle2, HelpCircle, AlertTriangle
} from 'lucide-react';

// --- IMPORT IMMAGINI ---
import rovereNaturale from '../assets/images/parquet/rovereNaturale.webp';
import rovereSpina from '../assets/images/parquet/rovereSpina90.webp';
import parquetLaminato from '../assets/images/parquet/parquetLaminato.webp';
import parquetSPCSpina from '../assets/images/parquet/parquetSPCspina.webp';
import parquetSPC from '../assets/images/parquet/parquetSPC.webp';
import battiscopa5cm from '../assets/images/parquet/battiscopa5cm.webp';
import battiscopa10cm from '../assets/images/parquet/battiscopa10cm.webp';
import parquetFlottante from '../assets/images/primaDopoLavori/dopo2.webp';

// --- MAPPA ICONE ---
const iconMap = {
  'search': Search,
  'clipboard-check': ClipboardCheck,
  'layers': Layers,
  'timer': Timer,
  'move-3d': Move3d,
  'layout-grid': LayoutGrid,
  'sparkles': Sparkles,
  'compass': Compass,
  'git-branch': GitBranch,
  'scissors': Scissors,
  'hammer': Hammer,
  'paintbrush': Paintbrush,
  'scaling': Scaling,
};

// --- CONFIGURAZIONE PREZZI E COSTI ---
const POSA_PRICES = {
  base: {
    // PREFINITO
    prefinito_dritto: 25, 
    prefinito_spina: 30, 
    prefinito_flottante: 22,
    spina_italiana: 30,
    spina_ungherese: 35, 
    spina_francese: 35,
    flottante_dritto: 22,
    flottante_diagonale: 24, 
    flottante_spina: 28, 
    
    // ALTRI
    spc_dritto: 17, 
    spc_spina: 25,
    laminato_standard: 15,
    
    // BATTISCOPA & SCALE
    battiscopa_low: 7, 
    battiscopa_high: 9, 
    scala_parquet: 70
  },
  variables: {
    primer_su_vecchio_mq: 7,
    autolivellante_mq: 17, 
    spostamento_mobili_fisso: 150, 
    colla_al_mq: 7,
    
    // NUOVE VARIABILI BATTISCOPA
    rimozione_battiscopa_ml: 3.50, // Prezzo rimozione al metro lineare
    ripristino_muro_ml: 5.00,      // Prezzo stuccatura/ripristino al metro lineare

    // NUOVE VARIABILI RIMOZIONE DETTAGLIATA
    rimozione_moquette_mq: 7,
    rimozione_parquet_mq: 9,
    rimozione_piastrelle_mq: 15,
  }
};

// --- MAPPA NOMI UMANI ---
const SERVICE_NAME_MAP = {
  prefinito_dritto: "Incollato Dritto",
  prefinito_spina: "Incollato a Spina",
  prefinito_flottante: "Posa Flottante (no colla)",
  spina_italiana: "Spina Italiana (90°)",
  spina_ungherese: "Spina Ungherese (60°)",
  spina_francese: "Spina Francese (45°)",
  flottante_dritto: "Flottante Dritto",
  flottante_diagonale: "Flottante Diagonale",
  flottante_spina: "Spina Flottante (senza colla)",
  spc_dritto: "SPC Dritto",
  spc_spina: "SPC a Spina",
  laminato_standard: "Laminato Standard",
  laminato: "Laminato",
  battiscopa_low: "Battiscopa (H<5cm)",
  battiscopa_high: "Battiscopa (H>5cm)",
  scala_parquet: "Rivestimento Scala"
};

// --- MAPPA SFONDI ---
const SERVICE_BACKGROUND_MAP = {
  prefinito_dritto: rovereNaturale,
  prefinito_spina: rovereSpina,
  prefinito_flottante: parquetFlottante,
  spina_italiana: rovereSpina,
  spina_ungherese: 'https://noesislegno.it/nl/wp-content/uploads/2021/12/Noesis_Spina_Rovere_Sirente_1920.jpg',
  spina_francese: rovereSpina,
  flottante_dritto: parquetFlottante,
  flottante_diagonale: parquetFlottante,
  flottante_spina: parquetSPCSpina, 
  spc_dritto: parquetSPC,
  spc_spina: parquetSPCSpina,
  laminato: parquetLaminato,
  laminato_standard: parquetLaminato,
  battiscopa_low: battiscopa5cm,
  battiscopa_high: battiscopa10cm,
  scala_parquet: "https://www.valles-parquet.it/wp-content/uploads/scale-in-legno-rovere-2.jpg"
};

// --- PROCESSI DI LAVORO ---
const POSA_PROCESS_STEPS = {
  default: [
    { icon: 'search', title: 'Fase 1: Verifica', description: 'Controllo tecnico del piano di posa e umidità.' },
    { icon: 'layers', title: 'Fase 2: Installazione', description: 'Posa a regola d\'arte secondo la geometria scelta.' },
    { icon: 'sparkles', title: 'Fase 3: Consegna', description: 'Pulizia finale, montaggio accessori e verifica.' }
  ],
  battiscopa_low: [
    { icon: 'scissors', title: 'Fase 1: Taglio', description: 'Tagli a 45 gradi precisi per angoli interni ed esterni.' },
    { icon: 'hammer', title: 'Fase 2: Fissaggio', description: 'Incollaggio con polimero o chiodatura invisibile.' },
    { icon: 'paintbrush', title: 'Fase 3: Siliconatura', description: 'Sigillatura superiore per nascondere imperfezioni del muro.' }
  ],
   battiscopa_high: [
    { icon: 'scissors', title: 'Fase 1: Taglio', description: 'Tagli a 45 gradi precisi per angoli interni ed esterni.' },
    { icon: 'hammer', title: 'Fase 2: Fissaggio', description: 'Incollaggio con polimero o chiodatura invisibile.' },
    { icon: 'paintbrush', title: 'Fase 3: Siliconatura', description: 'Sigillatura superiore per nascondere imperfezioni del muro.' }
  ]
};

// --- COMPONENTI UI ---
function QuizOption({ label, description, name, value, selectedValue, onChange, background }) {
  const isSelected = selectedValue === value;
  return (
    <label className={`relative flex min-h-[140px] cursor-pointer overflow-hidden rounded-2xl border transition-all ${isSelected ? 'border-blue-500 ring-2 ring-blue-400 scale-[1.02] shadow-lg' : 'border-gray-200 hover:border-blue-200 hover:shadow-md'}`}>
      <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: `url(${background})` }} />
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px]" />
      <div className="relative z-10 flex w-full flex-col justify-end p-4 text-white">
        <span className="text-sm font-black uppercase tracking-tight drop-shadow-lg leading-tight">{label}</span>
        {description && <p className="text-[10px] text-white/90 mt-1 font-medium uppercase drop-shadow-md">{description}</p>}
      </div>
      <input type="radio" name={name} value={value} checked={isSelected} onChange={onChange} className="sr-only" />
    </label>
  );
}

function SimpleQuizOption({ label, name, value, selectedValue, onChange }) {
  const isSelected = selectedValue === value;
  return (
    <label className={`flex-1 cursor-pointer rounded-xl border px-2 py-3 md:p-4 text-center transition-all ${isSelected ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-400 text-blue-700' : 'border-gray-200 bg-white hover:border-blue-200 text-gray-600'}`}>
      <input type="radio" name={name} value={value} checked={isSelected} onChange={onChange} className="sr-only" />
      <span className="text-xs md:text-sm font-bold uppercase block">{label}</span>
    </label>
  );
}

function ServiceQuiz({ service }) {
  const pricingId = service?.pricingId;
  const config = quizDatabase[pricingId] || quizDatabase['prefinito'];

  const [unitValue, setUnitValue] = useState(50);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState({ serviceType: '', removal_type: 'none', furniture: 'no' });
  const estimateRef = useRef(null);
  const quizTopRef = useRef(null);

  const resetAnswers = (serviceType) => ({
    serviceType,
    removal_type: 'none',
    furniture: 'no',
  });

  useEffect(() => {
    if (pricingId) {
      const typeKey = pricingId.replace(/-/g, '_');
      if (POSA_PRICES.base[typeKey]) {
        setAnswers(resetAnswers(typeKey));
      }
    }
  }, [pricingId]);

  const handleServiceTypeChange = (e) => {
    const { value } = e.target;
    setAnswers(resetAnswers(value));
    setShowResult(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
    setShowResult(false);
  };

  const isBattiscopa = answers.serviceType?.includes('battiscopa');
  const unitLabel = isBattiscopa ? 'ml' : answers.serviceType?.includes('scala') ? 'gradini' : 'mq';
  
  // --- MOTORE DI CALCOLO COSTI ---
  const estimate = useMemo(() => {
    if (!answers.serviceType) return null;
    
    let baseTotal = 0;
    const items = [];
    let estimateItem = null;

    // Servizio principale
    const basePrice = POSA_PRICES.base[answers.serviceType] || POSA_PRICES.base['prefinito_dritto'];
    const mainServiceTotal = basePrice * unitValue;
    items.push({ 
        label: SERVICE_NAME_MAP[answers.serviceType] || answers.serviceType, 
        qty: unitValue, 
        unit: unitLabel, 
        price: basePrice, 
        total: mainServiceTotal 
    });
    baseTotal += mainServiceTotal;

    const answerValues = Object.values(answers);

    // Logica specifica per Battiscopa
    if (isBattiscopa) {
        if (answers.existing_skirting === 'yes') {
            const cost = POSA_PRICES.variables.rimozione_battiscopa_ml;
            const itemTotal = cost * unitValue;
            items.push({ label: 'Rimozione Vecchio Zoccolino', qty: unitValue, unit: 'ml', price: cost, total: itemTotal });
            baseTotal += itemTotal;
        }
        if (answers.wall_condition_risk === 'risk') {
            const cost = POSA_PRICES.variables.ripristino_muro_ml;
            const itemTotal = cost * unitValue;
            items.push({ label: 'Stuccatura/Ripristino Muro', qty: unitValue, unit: 'ml', price: cost, total: itemTotal });
            baseTotal += itemTotal;
        }
    } 
    // Logica per Pavimenti
    else {
        const isInhabited = answers.cantiere_status === 'abitato' || answers.furniture === 'si';
        if (isInhabited) {
            const cost = POSA_PRICES.variables.spostamento_mobili_fisso;
            items.push({ label: 'Logistica Mobili & Protezioni', qty: 1, unit: 'a corpo', price: cost, total: cost });
            baseTotal += cost;
        }

        const needsLeveling = ['uneven', 'bumpy', 'grout_lines', 'irregular'].some(flag => answerValues.includes(flag));
        if (needsLeveling) {
            const cost = POSA_PRICES.variables.autolivellante_mq;
            estimateItem = { 
                label: 'Rasatura Tecnica / Autolivellante', 
                qty: unitValue, 
                unit: 'mq', 
                price: 0,
                total: cost * unitValue, // Usato per ordinamento o fallback
                isEstimate: true,
                minTotal: cost * 3,
                maxTotal: cost * unitValue
            };
            items.push(estimateItem);
        }
        
        if (answers.removal_type && answers.removal_type !== 'none') {
            let removalCost = 0;
            let removalLabel = '';
            switch (answers.removal_type) {
                case 'moquette':
                    removalCost = POSA_PRICES.variables.rimozione_moquette_mq;
                    removalLabel = 'Rimozione Moquette/Vinile';
                    break;
                case 'parquet':
                    removalCost = POSA_PRICES.variables.rimozione_parquet_mq;
                    removalLabel = 'Rimozione Vecchio Parquet';
                    break;
                case 'piastrelle':
                    removalCost = POSA_PRICES.variables.rimozione_piastrelle_mq;
                    removalLabel = 'Rimozione Piastrelle';
                    break;
                default: break;
            }
            if (removalCost > 0) {
                const itemTotal = removalCost * unitValue;
                items.push({ label: removalLabel, qty: unitValue, unit: 'mq', price: removalCost, total: itemTotal });
                baseTotal += itemTotal;
            }
        }
    }

    const steps = POSA_PROCESS_STEPS[answers.serviceType] || POSA_PROCESS_STEPS['default'];

    let finalTotal;
    if (estimateItem) {
        finalTotal = {
            min: baseTotal + estimateItem.minTotal,
            max: baseTotal + estimateItem.maxTotal
        };
    } else {
        finalTotal = baseTotal;
    }

    return { items, total: finalTotal, steps };
  }, [answers, unitValue, unitLabel, isBattiscopa]);

  const formatCurrency = (val) => val.toLocaleString('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const formatTotalForMessage = (total) => {
    if (typeof total === 'object' && total !== null) {
      return `da ${formatCurrency(total.min)} a ${formatCurrency(total.max)}`;
    }
    return formatCurrency(total);
  };

  const handleEdit = () => {
    setShowResult(false);
    quizTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Salva la stima per l'utente
  const handleWhatsAppClick = () => {
    if (!estimate) return;

    const itemsList = estimate.items
      .map(item => `- ${item.label}: ~${item.qty} ${item.unit}`)
      .join('\n');

    const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, '');

    const lines = [
      "MEMO PREVENTIVO",
      "-----------------------",
      itemsList,
      "-----------------------",
      `TOTALE STIMATO: ${formatTotalForMessage(estimate.total)}`,
      "",
      "--- CONTATTI E INFO ---",
      `Servizio: ${service.name}`,
      `Telefono: ${PHONE_NUMBER}`,
      "",
      "Per avviare la chat con noi e fissare un sopralluogo, clicca qui:",
      `https://wa.me/${cleanPhone}`,
      "",
      `Preventivo generato su: ${window.location.href}`
    ];

    const message = lines.join("\n");
    const encodedMessage = encodeURIComponent(message);
    gtagReportConversion({
      redirectUrl: `https://wa.me/?text=${encodedMessage}`,
    });
  };

  // Invia la stima all'azienda
  const handleSendToCompany = () => {
    if (!estimate) return;

    const itemsList = estimate.items
        .map(item => `- ${item.label}: ~${item.qty} ${item.unit}`)
        .join('\n');
    
    const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, '');

    const lines = [
        `👋 Ciao, ho calcolato questa stima per *${service.name}* sul sito:`,
        "",
        ...estimate.items.map(item => `- ${item.label}: ~${item.qty} ${item.unit}`),
        "",
        `💰 *Totale Stimato:* ${formatTotalForMessage(estimate.total)}`,
        "",
        "Vorrei verificare la disponibilità e fissare un sopralluogo.",
        `Link riferimento: ${window.location.href}`
    ];

    const message = lines.join("\n");
    const encodedMessage = encodeURIComponent(message);
    gtagReportConversion({
      redirectUrl: `https://wa.me/${cleanPhone}?text=${encodedMessage}`,
    });
  };

  return (
    <section id="service-preventivatore" className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            {config.title}
          </h2>
          <p className="text-gray-500 mt-4 font-bold uppercase tracking-widest text-[10px]">Configuratore Tecnico • {service.navLabel}</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); setShowResult(true); setTimeout(() => estimateRef.current?.scrollIntoView({behavior: 'smooth'}), 100); }}>
          <div ref={quizTopRef} className="bg-white p-6 md:p-10 rounded-[32px] border border-gray-200 shadow-2xl space-y-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-50 translate-x-1/2 -translate-y-1/2" />

            {/* STEP 1: TIPO */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black shadow-lg shadow-slate-200">1</span>
                {config.question1}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {config.allowedTypes.map(type => (
                  <QuizOption 
                    key={type} label={SERVICE_NAME_MAP[type] || type} name="serviceType" value={type}
                    background={SERVICE_BACKGROUND_MAP[type]} selectedValue={answers.serviceType} onChange={handleServiceTypeChange}
                  />
                ))}
              </div>
            </div>

            {answers.serviceType && (
              <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-500">
                
                {/* STEP 2: METRATURA */}
                <div className="pt-10 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-6">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black shadow-lg shadow-slate-200">2</span>
                      Quantità
                    </h3>
                    <div className="text-right">
                        <span className="text-4xl font-black text-blue-600 block leading-none">{unitValue}</span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{unitLabel}</span>
                    </div>
                  </div>
                  <input 
                    type="range" min={10} max={200} value={unitValue} 
                    aria-label={`Seleziona la quantita in ${unitLabel}`}
                    onChange={(e) => setUnitValue(Number(e.target.value))} 
                    className="w-full h-3 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all" 
                  />
                </div>

                {/* STEP 3: DOMANDE TECNICHE */}
                {config.extraQuestions && (
                    <div className="pt-10 border-t border-gray-100 space-y-8">
                        <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight flex items-center gap-3 mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black shadow-lg shadow-slate-200">3</span>
                            Dettagli Tecnici
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            {config.extraQuestions.map((q) => {
                                // VISIBILITÀ CONDIZIONALE
                                if (q.id === 'spina_type' && !answers.serviceType.includes('spina')) return null;
                                if (q.id === 'floating_pattern' && !answers.serviceType.includes('flottante')) return null;
                                // Per battiscopa: mostra rischio muro solo se c'è vecchio battiscopa
                                if (q.id === 'wall_condition_risk' && answers.existing_skirting !== 'yes') return null;

                                return (
                                    <div key={q.id} className="animate-in fade-in">
                                        <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3 ml-1 flex items-center gap-2">
                                            <HelpCircle size={12} /> {q.question}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {q.options.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => setAnswers({ ...answers, [q.id]: opt.value })}
                                                    className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${
                                                        answers[q.id] === opt.value
                                                            ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200 shadow-sm'
                                                            : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-md'
                                                    }`}
                                                >
                                                    <div className="relative z-10">
                                                        <p className={`text-sm font-bold uppercase ${answers[q.id] === opt.value ? 'text-blue-700' : 'text-slate-700'}`}>
                                                            {opt.label}
                                                        </p>
                                                        {opt.detail && (
                                                            <p className={`text-[10px] mt-1 font-medium leading-tight ${answers[q.id] === opt.value ? 'text-blue-500' : 'text-slate-400'}`}>
                                                                {opt.detail}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {answers[q.id] === opt.value && (
                                                        <div className="absolute top-3 right-3 text-blue-600">
                                                            <CheckCircle2 size={16} />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* STEP 4: ACCESSORI (Solo per Pavimenti, NO Battiscopa) */}
                {!isBattiscopa && (
                  <div className="pt-10 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight flex items-center gap-3 mb-6">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-black shadow-lg shadow-slate-200">4</span>
                        Servizi Accessori
                    </h3>
                    <div className="grid grid-cols-1 gap-8">
                        {/* Nuova domanda per rimozione */}
                        <div>
                            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3 ml-1 flex items-center gap-2">
                                <HelpCircle size={12} /> Cosa dobbiamo rimuovere prima della posa?
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <button type="button" onClick={() => handleChange({ target: { name: 'removal_type', value: 'none' } })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${answers.removal_type === 'none' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200 shadow-sm' : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-md'}`}>
                                    <p className="text-sm font-bold uppercase">Niente, fondo pronto</p>
                                    <p className="text-[10px] mt-1 text-slate-500">Il massetto o pavimento esistente è già pulito e pronto.</p>
                                     {answers.removal_type === 'none' && <div className="absolute top-3 right-3 text-blue-600"><CheckCircle2 size={16} /></div>}
                                </button>
                                <button type="button" onClick={() => handleChange({ target: { name: 'removal_type', value: 'moquette' } })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${answers.removal_type === 'moquette' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200 shadow-sm' : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-md'}`}>
                                    <p className="text-sm font-bold uppercase">Moquette o Vinile</p>
                                    <p className="text-[10px] mt-1 text-slate-500">Rimozione di pavimentazione tessile o vinilica incollata.</p>
                                    {answers.removal_type === 'moquette' && <div className="absolute top-3 right-3 text-blue-600"><CheckCircle2 size={16} /></div>}
                                </button>
                                <button type="button" onClick={() => handleChange({ target: { name: 'removal_type', value: 'parquet' } })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${answers.removal_type === 'parquet' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200 shadow-sm' : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-md'}`}>
                                    <p className="text-sm font-bold uppercase">Vecchio Parquet</p>
                                    <p className="text-[10px] mt-1 text-slate-500">Demolizione di parquet incollato o flottante esistente.</p>
                                    {answers.removal_type === 'parquet' && <div className="absolute top-3 right-3 text-blue-600"><CheckCircle2 size={16} /></div>}
                                </button>
                                <button type="button" onClick={() => handleChange({ target: { name: 'removal_type', value: 'piastrelle' } })}
                                    className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${answers.removal_type === 'piastrelle' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-200 shadow-sm' : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-md'}`}>
                                    <p className="text-sm font-bold uppercase">Piastrelle</p>
                                    <p className="text-[10px] mt-1 text-slate-500">Demolizione di pavimento in ceramica o gres.</p>
                                    {answers.removal_type === 'piastrelle' && <div className="absolute top-3 right-3 text-blue-600"><CheckCircle2 size={16} /></div>}
                                </button>
                            </div>
                        </div>

                        {/* Domanda sui mobili rimane uguale */}
                        <div className="space-y-3">
                            <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-3 ml-1 flex items-center gap-2"><HelpCircle size={12} /> Ambienti con mobili?</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <SimpleQuizOption label="Vuoti" name="furniture" value="no" selectedValue={answers.furniture} onChange={handleChange} />
                                <SimpleQuizOption label="Arredati" name="furniture" value="si" selectedValue={answers.furniture} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                  </div>
                )}

                <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:scale-[1.01] transition-all shadow-xl shadow-slate-200 mt-8 flex items-center justify-center gap-2 group">
                  <Sparkles size={20} className="text-yellow-400 group-hover:animate-spin" /> 
                  Calcola prezzo
                </button>
              </div>
            )}
          </div>
        </form>

        {/* RISULTATI */}
        {showResult && estimate && (
          <div ref={estimateRef} className="mt-12 bg-white p-6 md:p-10 rounded-[32px] border border-gray-200 shadow-2xl animate-in zoom-in duration-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Colonna Sinistra: Stima + CTAs */}
                <div className="space-y-8">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <CheckCircle2 size={24} />
                      </div>
                      <div>
                          <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">Stima pronta</h3>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">basata sulle tue scelte di prima</p>
                      </div>
                   </div>

                   <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                      {estimate.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-start border-b border-slate-200 pb-3 last:border-0 last:pb-0">
                           <div className="text-left">
                              <p className="text-sm font-bold text-slate-700 uppercase leading-none">{item.label}</p>
                              {item.unit !== 'a corpo' && (
                                <p className="text-[10px] text-slate-400 font-bold mt-1"> ~{item.qty}{item.unit}</p>
                              )}
                           </div>
                           <div className="text-right">
                              {item.isEstimate ? (
                                <>
                                  <span className="text-base font-black text-slate-900">{`${formatCurrency(item.minTotal)} - ${formatCurrency(item.maxTotal)}`}</span>
                                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                    Stima (da 3 a {item.qty}mq)
                                  </p>
                                </>
                              ) : (
                                <>
                                  <span className="text-base font-black text-slate-900">{formatCurrency(item.total)}</span>
                                  {item.unit !== 'a corpo' && item.price > 0 && (
                                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                                        {`${formatCurrency(item.price)} al ${item.unit}`}
                                    </p>
                                  )}
                                </>
                              )}
                           </div>
                        </div>
                      ))}
                      
                      {estimate.items.some(i => i.label.includes('Rasatura')) && (
                        <div className="flex gap-2 items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                            <AlertTriangle size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-yellow-700 leading-tight"><strong>Nota Tecnica Professionale:</strong> Il costo della rasatura è da quantificare al sopralluogo insieme. L'intervento potrà essere se possibile mirato ai soli punti critici o esteso all'intera superficie, variando l'importo in base alle effettive condizioni di planarità del sottofondo.</p>
                        </div>
                      )}
                      {estimate.items.some(i => i.label.includes('Stuccatura')) && (
                        <div className="flex gap-2 items-start p-3 bg-red-50 rounded-lg border border-red-100">
                            <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-red-700 leading-tight"><strong>Attenzione:</strong> La rimozione potrebbe danneggiare l'intonaco. Incluso costo stuccatura.</p>
                        </div>
                      )}
                   </div>

                   <div className="flex justify-between items-center px-4">
                      <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Totale Stimato</span>
                      <span className="text-4xl font-black text-blue-600 tracking-tight">
                        {typeof estimate.total === 'object' 
                            ? `${formatCurrency(estimate.total.min)} - ${formatCurrency(estimate.total.max)}` 
                            : formatCurrency(estimate.total)}
                      </span>
                   </div>

                    {/* --- NUOVI CTA --- */}
                    <div className="flex flex-col gap-6 pt-6 border-t border-gray-100">
                        {/* GRUPPO 1: Azioni Secondarie (Disclaimer + Modifica) */}
                        <div className="flex flex-col gap-2">
                            <p className="text-[11px] text-gray-400 italic leading-tight text-center">
                                *Stima indicativa. Prezzo finale e tempistiche saranno confermati via Whatsapp o dopo sopralluogo.
                            </p>
                            <button type="button" onClick={handleEdit} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50">
                                Modifica Dati
                            </button>
                        </div>

                        {/* GRUPPO 2: Azione PRIMARIA (WhatsApp + Spiegazione) */}
                        <div className="flex flex-col gap-2">
                            <button onClick={handleWhatsAppClick} type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-slate-500/20 transition hover:bg-slate-900 hover:shadow-slate-500/40 active:scale-[0.98]">
                                <Bookmark className="w-5 h-5 fill-current" />
                                Salva la stima su Whatsapp
                            </button>
                            <p className="text-[10px] text-gray-500 text-center leading-snug px-2">
                                Si aprirà la chat di WhatsApp: potrai inviare un memo del preventivo <span className="font-semibold text-gray-700">a te stesso</span> per non perderlo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Colonna Destra: Fasi + CTA FINALI */}
                <div className="flex flex-col justify-between">
                    <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                       <h4 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2">
                          <Layers size={14} /> Fasi operative
                       </h4>
                       <ol className="relative border-l-2 border-blue-200 ml-2 space-y-8">
                          {estimate.steps.map((step, i) => {
                            const Icon = iconMap[step.icon] || CheckCircle2;
                            return (
                              <li key={i} className="ml-8 relative">
                                 <span className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full -left-[42px] ring-4 ring-blue-50 border border-blue-100 shadow-sm text-blue-600">
                                    <Icon size={14} />
                                 </span>
                                 <h5 className="text-sm font-bold text-slate-900 uppercase leading-tight">{step.title}</h5>
                                 <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">{step.description}</p>
                              </li>
                            )
                          })}
                       </ol>
                    </div>
                    
                    {/* CTA Finale */}
                    <div className="text-center mt-10 pt-8">
                      <p className="text-sm text-gray-700 mb-4 font-bold">Domande?</p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={handleSendToCompany} type="button" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-600">
                            WhatsApp <MessageCircle className="w-4 h-4" />
                        </button>
                        <button onClick={() => gtagReportConversion({ redirectUrl: `tel:${PHONE_NUMBER}` })} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-slate-700 bg-transparent px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100">
                          Chiamaci
                        </button>
                      </div>
                    </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ServiceQuiz;