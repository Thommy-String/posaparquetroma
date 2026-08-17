import React from 'react';
import beaPrima from '../assets/images/primaDopoLavori/BeaPrima.webp';
import beaDopo from '../assets/images/primaDopoLavori/BeaDopo.webp';
import nelyPrima from '../assets/images/primaDopoLavori/NelyPrima.webp';
import nelyDopo from '../assets/images/primaDopoLavori/NelyDopo.webp';
import prima2 from '../assets/images/primaDopoLavori/prima2.webp';
import dopo2 from '../assets/images/primaDopoLavori/dopo2.webp';
import prima5 from '../assets/images/primaDopoLavori/prima5.webp';
import dopo5 from '../assets/images/primaDopoLavori/dopo5.webp';

const ComparisonCard = ({ beforeImg, afterImg, price, timeDisplay, label, className }) => {
  return (
    <div className={`relative group w-full overflow-hidden shadow-sm border border-gray-100 rounded-xl ${className}`}>
      
      {/* Immagine PRIMA (Sinistra/Alto) - Split Verticale Semplice */}
      <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-gray-200">
          <img src={beforeImg} alt="Prima" loading="eager" className="w-[200%] h-full max-w-none object-cover filter grayscale contrast-125" />
          <div className="absolute top-2 left-2 text-[8px] font-bold text-white/90 uppercase tracking-wider drop-shadow-md">
            Prima
          </div>
      </div>

       {/* Immagine DOPO (Destra/Basso) */}
       <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-gray-100 border-l-[1.5px] border-white">
           <img src={afterImg} alt="Dopo" className="w-[200%] h-full max-w-none object-cover -ml-[100%]" />
           <div className="absolute top-2 right-2 text-[8px] font-bold text-white uppercase tracking-wider drop-shadow-md">
             Dopo
           </div>
       </div>

      {/* Info Minimal al fondo */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 flex flex-col items-center justify-end text-center">
         <p className="text-[10px] text-white/80 font-medium uppercase tracking-widest mb-0.5">{label}</p>
         <div className="flex items-center gap-2 text-white text-xs font-bold">
            <span>{price}</span>
            <span className="w-1 h-1 rounded-full bg-white/50"></span>
            <span>{timeDisplay}</span>
         </div>
      </div>
    </div>
  );
};

const HeroComparisonCards = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-2 md:px-4 py-2">
       {/* Compact Grid */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          
          <ComparisonCard 
            className="h-48 md:h-64 w-full"
            beforeImg={beaPrima} 
            afterImg={beaDopo} 
            price="€430" 
            timeDisplay="5 ore" 
            label="Posa SPC Milano"
          />

           <ComparisonCard 
            className="h-48 md:h-64 w-full"
            beforeImg={nelyPrima} 
            afterImg={nelyDopo} 
            price="€1.950" 
            timeDisplay="2 Giorni" 
            label="Parquet a Spina"
           />

           <ComparisonCard 
            className="h-48 md:h-64 w-full"
            beforeImg={prima5} 
            afterImg={dopo5} 
            price="€2.002" 
            timeDisplay="3 Giorni" 
            label="Prefinito Incollato"
           />

           <ComparisonCard 
            className="h-48 md:h-64 w-full"
            beforeImg={prima2} 
            afterImg={dopo2} 
            price="€1.750" 
            timeDisplay="3 Giorni" 
            label="Rovere Naturale"
           />

       </div>
    </div>
  );
};

export default HeroComparisonCards;
