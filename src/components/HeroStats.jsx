import React from 'react';
import andreaOniImage from '../assets/images/andrea-oni-parquettisti-thumb.webp';

function HeroStats() {
  return (
    <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center px-3 sm:bottom-4">
      <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/40 px-2 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:gap-2.5 sm:px-2.5 sm:py-2">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200/70 bg-white shadow-[0_6px_14px_rgba(15,23,42,0.12)] sm:h-9 sm:w-9">
          <img
            className="h-full w-full object-cover object-[center_28%]"
            src={andreaOniImage}
            alt="Andrea, il nostro capo parquettista"
            width="80"
            height="80"
            loading="lazy"
            decoding="async"
          />
        </div>

        <p className="max-w-[140px] text-left text-[9px] font-semibold leading-tight text-slate-900 sm:max-w-[190px] sm:text-[9px]">
         Foto di Andrea, il nostro capo parquettista.
        </p>
      </div>
    </div>
  );
}

export default HeroStats;