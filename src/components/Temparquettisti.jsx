import React, { useState } from 'react';

import andreaPhoto from '../assets/images/primaDopoLavori/barbaraPrimaSPC.webp';
import oniPhoto from '../assets/images/Oni/onisim parquettista eseperto.webp';
import duoPhoto from '../assets/images/andrea-oni-parquettisti.webp';

const StatBar = ({ value, label, color = '#000000' }) => {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
  
  return (
    <div className="flex flex-col mb-2 md:mb-3">
      <div className="flex items-end justify-between mb-1">
        <span className="text-[9px] md:text-[12px] font-black uppercase tracking-tight text-slate-800 leading-none">
          {label}
        </span>
        <span className="text-[10px] md:text-[14px] font-black leading-none text-slate-900">
          {safeValue}
        </span>
      </div>
      <div className="h-2 md:h-3 w-full bg-slate-200 rounded-full border-[1px] md:border-[2px] border-black overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
        <div
          className="h-full border-r-[1px] md:border-r-[2px] border-black transition-all duration-1000"
          style={{
            width: `${safeValue}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

const SpecialMove = ({ title, description, cost, damage, themeColor, variant = 'legendary' }) => {
  // Dividiamo la descrizione in due parti: Abilità (prima del punto) ed Effetto
  const parts = description.split('Effetto:');
  const abilita = parts[0];
  const effetto = parts[1] || "";

  return (
    <div className={`mt-3 md:mt-5 rounded-lg md:rounded-xl border-[2px] md:border-[3px] border-black p-2 md:p-3 shadow-[0_8px_24px_rgba(0,0,0,0.16)] relative overflow-hidden ${themeColor}`}>
      <div className={`absolute inset-0 opacity-40 pointer-events-none ${variant === 'fire' ? 'bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.45),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.35),_transparent_40%)]' : 'bg-[radial-gradient(circle_at_top_left,_rgba(196,181,253,0.45),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.22),_transparent_40%)]'}`}></div>
      <div className="absolute inset-x-3 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
      <div className="relative z-10">
      <div className="flex items-center justify-between border-b-[1px] md:border-b-[2px] border-black/20 pb-1.5 mb-1.5">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="text-[12px] md:text-[16px] tracking-tighter leading-none drop-shadow-sm">{cost}</div>
          <div className="text-[11px] md:text-[15px] font-black uppercase text-slate-900 leading-none">{title}</div>
        </div>
        <div className="text-[14px] md:text-[18px] font-black text-slate-900 leading-none">{damage}</div>
      </div>
      
      {/* Abilità: solo etichetta rossa */}
      <div className="text-[11px] md:text-[13px] text-slate-800 font-bold leading-tight mb-1">
        <span className="font-black text-red-600 uppercase text-[8px] md:text-[10px] mr-1">Abilità:</span>
        {abilita.replace('Abilità:', '')}
      </div>
      
      {/* Effetto: solo etichetta verde */}
      {effetto && (
        <div className="text-[11px] md:text-[13px] text-slate-800 font-bold leading-tight">
          <span className="font-black text-emerald-700 uppercase text-[8px] md:text-[10px] mr-1">Effetto:</span>
          {effetto.trim()}
        </div>
      )}
      </div>
    </div>
  );
};

const GameCard = ({ 
  name, 
  stage, 
  hp, 
  elementIcon, 
  imgSrc, 
  type, 
  weight, 
  description, 
  stats, 
  move, 
  moveTheme, 
  cardBg,
  auraAnimationClass,
  backStory,
  backAccent,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
  <button
    type="button"
    onClick={() => setIsFlipped((v) => !v)}
    className="relative isolate h-full w-full text-left [perspective:1800px]"
    aria-pressed={isFlipped}
    aria-label={`Scopri il profilo di ${name}`}
  >
    {/* AURA ANIMATA IN LOOP (Il bordo magico dietro la carta) */}
    <div className={`absolute -inset-1.5 md:-inset-2.5 rounded-[16px] md:rounded-[28px] blur-md -z-10 ${auraAnimationClass}`}></div>

    <div
      className={`relative h-full min-h-[760px] md:min-h-[860px] w-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
    >
      <div className={`group absolute inset-0 rounded-[12px] md:rounded-[24px] border-[3px] md:border-[5px] border-[#27272a] ${cardBg} overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01] cursor-pointer h-full shadow-[0_14px_32px_rgba(15,23,42,0.18)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]`}>
        {/* Effetto Shine Olografico (visibile al passaggio del mouse/touch) */}
        <div className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

        <div className="p-2 md:p-4 flex flex-col h-full min-h-0 relative">
        <div className="absolute inset-x-0 top-0 h-16 opacity-30 pointer-events-none bg-gradient-to-b from-white/60 to-transparent"></div>
        {/* Header Carta */}
        <div className="relative z-10 flex items-center justify-between mb-1.5 md:mb-2 px-1">
          <div className="flex flex-col">
            <span className="text-[7px] md:text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none mb-0.5">{stage}</span>
            <h3 className="text-[16px] md:text-[26px] font-black text-slate-900 uppercase tracking-tighter leading-none">{name}</h3>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5">
            <span className="text-[9px] md:text-[12px] font-medium text-red-600 tracking-tighter">HP</span>
            <span className="text-[14px] md:text-[22px] font-black text-red-600 leading-none">{hp}</span>
            <span className="text-[14px] md:text-[20px] drop-shadow-md">{elementIcon}</span>
          </div>
        </div>

        {/* Frame Immagine */}
        <div className="relative h-[320px] md:h-[480px] bg-slate-800 border-[2px] md:border-[4px] border-slate-300 rounded-[4px] md:rounded-[8px] overflow-hidden shadow-[0_10px_24px_rgba(15,23,42,0.18)] mb-2 md:mb-3 flex-shrink-0">
          <img 
            src={imgSrc} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40 pointer-events-none"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.28),_transparent_25%),radial-gradient(circle_at_80%_80%,_rgba(255,255,255,0.18),_transparent_20%)] pointer-events-none"></div>
        </div>

        

        {/* Statistiche Base */}
        <div className="px-0.5 md:px-2 mt-1 mb-0 min-h-0">
          {stats.map((s) => (
            <StatBar key={s.label} value={s.value} label={s.label} color={s.color} />
          ))}
        </div>

        {/* Attacco/Mossa Speciale */}
        <div className="mt-1 md:mt-2">
          <SpecialMove 
            title={move.title} 
            cost={move.cost}
            damage={move.damage}
            description={move.description} 
            themeColor={moveTheme} 
            variant={name === 'Andrea' ? 'fire' : 'arcane'}
          />
        </div>

        <div className="flex-1"></div>

        {/* Footer Carta */}
        <div className="mt-auto pt-1.5 border-t-[1px] md:border-t-[2px] border-black/10 flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4 px-1 shrink-0">
          <div className="flex gap-0 md:gap-1 text-[8px] md:text-[12px] text-amber-500 drop-shadow-sm">
            ⭐⭐⭐⭐⭐
          </div>
          <p className="text-[12px] md:text-[12px] text-slate-400 font-medium italic leading-tight tracking-[-0.06em] text-center md:text-right">
            "{description}"
          </p>
        </div>

        
        
      </div>
      </div>

      <div className={`absolute inset-0 rounded-[12px] md:rounded-[24px] border-[3px] md:border-[5px] border-[#27272a] overflow-hidden h-full shadow-[0_14px_32px_rgba(15,23,42,0.18)] [transform:rotateY(180deg)_translateZ(1px)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] ${backAccent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.2),_transparent_30%)] opacity-60 pointer-events-none"></div>
        <div className="relative z-10 flex h-full flex-col p-3 md:p-4">
          <div className="flex items-start justify-between gap-3 border-b border-black/10 pb-2.5 mb-3">
            <div>
              <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.25em] text-slate-500">Carta Leggendaria</p>
              <h4 className="text-[20px] md:text-[28px] font-black uppercase tracking-tight text-slate-900 leading-none mt-1">{name}</h4>
              <p className="text-[10px] md:text-[12px] font-bold text-slate-600 mt-1">{stage}</p>
            </div>
            <div className="text-[22px] md:text-[28px] drop-shadow-sm">{move.cost}</div>
          </div>

          <div className="space-y-3 text-slate-800">
            {backStory.map((paragraph, index) => (
              <p key={index} className="text-[12px] md:text-[14px] leading-snug font-semibold">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-auto pt-3 border-t border-black/10 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">Aura dominante</p>
              <p className="text-[12px] md:text-[14px] font-black text-slate-900">{name === 'Andrea' ? 'Ordine, precisione, affidabilità' : 'Estetica, ritmo, sensibilità'}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </button>
  );
};

export default function Temparquettisti() {
  return (
    <section className="border-t-[4px] border-black bg-[#f8f8f6] overflow-hidden">
      
      {/* CSS CUSTOM PER LE AUREE ANIMATE IN LOOP */}
      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
          /* Aura di Andrea: Respira/Pulsa come il fuoco */
          @keyframes aura-fire {
            0%, 100% { opacity: 0.5; transform: scale(0.98); }
            50% { opacity: 1; transform: scale(1.02); }
          }
          /* Aura di Oni: Fluisce come magia al neon */
          @keyframes aura-neon {
            0% { background-position: 0% 50%; opacity: 0.7; }
            50% { background-position: 100% 50%; opacity: 1; }
            100% { background-position: 0% 50%; opacity: 0.7; }
          }
          .animate-aura-fire {
            background: linear-gradient(135deg, #ea580c, #fbbf24);
            animation: aura-fire 3s ease-in-out infinite;
          }
          .animate-aura-neon {
            background: linear-gradient(270deg, #8b5cf6, #ec4899, #3b82f6);
            background-size: 200% 200%;
            animation: aura-neon 4s ease infinite;
          }
        `}
      </style>

      <div className="max-w-6xl mx-auto px-3 md:px-4 py-10 md:py-16">
        
        {/* Intestazione Sezione */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-5 mb-10 md:mb-14 text-center md:text-left">
          <div className="shrink-0 w-[90px] h-[90px] md:w-[110px] md:h-[110px] rounded-full border-[3px] md:border-[4px] border-black bg-white overflow-hidden shadow-[4px_4px_0px_#000000]">
            <img src={duoPhoto} alt="Andrea e Oni" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[28px] md:text-[42px] font-black tracking-tight text-slate-900 leading-[1.05]">
              Scegli il tuo posatore.
            </p>
           <p>(o mettili in squadra insieme)</p>
          </div>
        </div>

        {/* Due card su stesso rigo (desktop e mobile) */}
        <div className="mt-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-4 md:gap-12 items-stretch">
            <div className="h-full">
              <GameCard
              name="Andrea"
              stage="Artigiano Esperto"
              hp="320"
              cardBg="bg-gradient-to-br from-amber-50 to-orange-100"
              auraAnimationClass="animate-aura-fire"
              imgSrc={andreaPhoto}
              description="La sua tolleranza per i lavori approssimativi è pari a zero."
              stats={[
                { label: 'Precisione', value: 99, color: '#F5AD1B' },
                { label: 'Tolleranza errori', value: 3, color: '#F97316' },
                { label: 'Pulizia in cantiere', value: 99, color: '#73C7C3' },
              ]}
              move={{
                title: 'Sigillo del Nord',
                cost: '⚡',
                damage: '190',
                description:
                  "Posa con la precisione dell'ingegneria tedesca ottenuta lavorando 10 anni in Germania del nord. Effetto: Il tuo pavimento sopravviverà ai cani, ai bambini e forse anche alla fine del mondo.",
              }}
              moveTheme="bg-orange-100/80 border-orange-300"
              backAccent="bg-[linear-gradient(160deg,_#fff7ed_0%,_#fde68a_45%,_#fdba74_100%)]"
              backStory={[
                'Andrea è quello che entra in casa, guarda il sottofondo, osserva i dettagli e capisce subito.',
                'Ha formato il suo metodo lavorando a lungo in Germania: precisione, ordine e tolleranza zero per le scorciatoie che poi presentano il conto.',
                'Se vuoi un parquettista che ragiona da artigiano vero e ti dice le cose come stanno, Andrea è la carta che vuoi pescare.',
              ]}
              />
            </div>

            <div className="h-full">
              <GameCard
              name="Oni"
              stage="Esteta del Legno"
              hp="340"
              cardBg="bg-gradient-to-br from-violet-50 to-pink-100"
              auraAnimationClass="animate-aura-neon"
              imgSrc={oniPhoto}
              description="Trasforma ogni stanza in un'opera. Per lui ogni vena è un dettaglio da rispettare."
              stats={[
                { label: 'Velocità', value: 99, color: '#43E7F0' },
                { label: 'Pazienza', value: 80, color: '#F0D843' },
                { label: 'Cura dettagli', value: 99, color: '#8B5CF6' },
              ]}
              move={{
                title: 'Tocco di Lusso',
                cost: '✨',
                damage: '175',
                description:
                  'Allinea le tavole con precisione ipnotica. Effetto: Il risultato è troppo bello, i vicini muoiono di invidia.',
              }}
              moveTheme="bg-violet-100/70 border-violet-300"
              backAccent="bg-[linear-gradient(160deg,_#f5f3ff_0%,_#e9d5ff_40%,_#f9a8d4_100%)]"
              backStory={[
                'Oni ha un occhio diverso: dove altri vedono solo tavole, lui vede ritmo, luce, continuità e armonia dentro la stanza.',
                'È il tipo di parquettista che si accorge subito di una fuga storta, di una vena che non dialoga con l’ambiente, di un dettaglio che può cambiare tutto.',
                'Se cerchi un risultato che oltre a essere fatto bene abbia anche presenza, carattere e impatto visivo, Oni è la carta che cambia la partita.',
              ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}