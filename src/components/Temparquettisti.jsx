import React from 'react';

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

const SpecialMove = ({ title, description, cost, damage, themeColor }) => {
  // Dividiamo la descrizione in due parti: Abilità (prima del punto) ed Effetto
  const parts = description.split('Effetto:');
  const abilita = parts[0];
  const effetto = parts[1] || "";

  return (
    <div className={`mt-3 md:mt-5 rounded-lg md:rounded-xl border-[2px] md:border-[3px] border-black p-2 md:p-3 shadow-[2px_2px_0px_rgba(0,0,0,0.2)] ${themeColor}`}>
      <div className="flex items-center justify-between border-b-[1px] md:border-b-[2px] border-black/20 pb-1.5 mb-1.5">
        <div className="flex items-center gap-1.5 md:gap-2">
          <div className="text-[12px] md:text-[16px] tracking-tighter leading-none">{cost}</div>
          <div className="text-[11px] md:text-[15px] font-black uppercase text-slate-900 leading-none">{title}</div>
        </div>
        <div className="text-[14px] md:text-[18px] font-black text-slate-900 leading-none">{damage}</div>
      </div>
      
      {/* Abilità: solo etichetta rossa */}
      <div className="text-[9.5px] md:text-[13px] text-slate-800 font-bold leading-tight mb-1">
        <span className="font-black text-red-600 uppercase text-[8px] md:text-[10px] mr-1">Abilità:</span>
        {abilita.replace('Abilità:', '')}
      </div>
      
      {/* Effetto: solo etichetta verde */}
      {effetto && (
        <div className="text-[9.5px] md:text-[13px] text-slate-800 font-bold leading-tight">
          <span className="font-black text-emerald-700 uppercase text-[8px] md:text-[10px] mr-1">Effetto:</span>
          {effetto.trim()}
        </div>
      )}
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
  auraAnimationClass 
}) => (
  <div className="relative isolate">
    {/* AURA ANIMATA IN LOOP (Il bordo magico dietro la carta) */}
    <div className={`absolute -inset-1.5 md:-inset-2.5 rounded-[16px] md:rounded-[28px] blur-md -z-10 ${auraAnimationClass}`}></div>

    {/* Contenitore Carta */}
    <div className={`group relative rounded-[12px] md:rounded-[24px] border-[3px] md:border-[5px] border-[#27272a] ${cardBg} overflow-hidden transition-transform duration-300 hover:-translate-y-1 cursor-pointer`}>
      
      {/* Effetto Shine Olografico (visibile al passaggio del mouse/touch) */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>

      <div className="p-2 md:p-4">
        {/* Header Carta */}
        <div className="flex items-center justify-between mb-1.5 md:mb-2 px-1">
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
        <div className="relative h-[230px] md:h-[460px] bg-slate-800 border-[2px] md:border-[4px] border-slate-300 rounded-[4px] md:rounded-[8px] overflow-hidden shadow-inner mb-2 md:mb-3">
          <img 
            src={imgSrc} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/40 pointer-events-none"></div>
        </div>

        

        {/* Statistiche Base */}
        <div className="px-0.5 md:px-2 my-6">
          {stats.map((s) => (
            <StatBar key={s.label} value={s.value} label={s.label} color={s.color} />
          ))}
        </div>

        {/* Attacco/Mossa Speciale */}
        <SpecialMove 
          title={move.title} 
          cost={move.cost}
          damage={move.damage}
          description={move.description} 
          themeColor={moveTheme} 
        />

        {/* Footer Carta */}
        <div className="mt-3 md:mt-4 pt-2 border-t-[1px] md:border-t-[2px] border-black/10 flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-4 px-1">
          <div className="flex gap-0 md:gap-1 text-[8px] md:text-[12px] text-amber-500 drop-shadow-sm">
            ⭐⭐⭐⭐⭐
          </div>
          <p className="text-[12px] md:text-[12px] text-slate-400 font-medium italic leading-tight tracking-[-0.06em] text-center md:text-right">
            "{description}"
          </p>
        </div>
        
      </div>
    </div>
  </div>
);

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
          <div className="shrink-0 w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full border-[3px] md:border-[4px] border-black bg-white overflow-hidden shadow-[4px_4px_0px_#000000]">
            <img src={duoPhoto} alt="Andrea e Oni" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-[28px] md:text-[42px] font-black tracking-tight text-slate-900 leading-[1.05]">
              Scegli il tuo posatore.
            </h2>
            <p className="text-[16px] md:text-[22px] font-bold text-slate-600 mt-1 md:mt-2">
              (O prendili entrambi in squadra)
            </p>
          </div>
        </div>

        {/* Griglia Carte: grid-cols-2 sempre fissa, ma ora i testi si leggono! */}
        <div className="grid grid-cols-2 gap-4 md:gap-12 max-w-5xl mx-auto">
          
          <GameCard
            name="Andrea"
            stage="Artigiano Esperto"
            hp="320"
            cardBg="bg-gradient-to-br from-amber-50 to-orange-100"
            auraAnimationClass="animate-aura-fire"
            imgSrc={andreaPhoto}
            description="La sua tolleranza per i lavori approssimativi è pari a zero."
            stats={[
              { label: 'Precisione', value: 99, color: '#F97316' },
              { label: 'Controllo Massetto', value: 95, color: '#3B82F6' },
              { label: 'Ordine in cantiere', value: 100, color: '#10B981' },
            ]}
            move={{
              title: 'Sigillo del Nord',
              cost: '⚡',
              damage: '190',
              description: 'Posa con la resistenza dell\'ingegneria tedesca. Effetto: Il tuo pavimento sopravviverà ai cani, ai bambini e forse anche alla fine del mondo.'
            }}
            moveTheme="bg-orange-100/80 border-orange-300"
          />

          <GameCard
            name="Onisim"
            stage="Parquettista esperto"
            hp="340"
            cardBg="bg-gradient-to-br from-purple-50 to-fuchsia-100"
            auraAnimationClass="animate-aura-neon"
            imgSrc={oniPhoto}
            description="Tratta ogni singola asse di legno come un pezzo unico da museo."
            stats={[
              { label: 'Precisione', value: 99, color: '#8B5CF6' },
              { label: 'Gusto estetico', value: 100, color: '#EC4899' },
              { label: 'Effetto Wow', value: 100, color: '#0EA5E9' },
            ]}
            move={{
              title: 'Tocco di Lusso',
              cost: '✨',
              damage: '120',
          description: 'Allinea le doghe in modo ipnotico con maniacalità ossessiva. Effetto: il tuo pavimento diventa un\'opera d\'arte e i vicini muoiono d\'invidia.'            }}
            moveTheme="bg-purple-200/60 border-purple-300"
          />

        </div>
      </div>
    </section>
  );
}