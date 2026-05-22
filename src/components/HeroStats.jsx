import React from 'react';
import { Check } from 'lucide-react';
import rovereNaturale from '../assets/images/parquet/rovereNaturale.webp';
import rovereMielato from '../assets/images/parquet/rovereMielato.webp';
import rovereSpinaItaliana from '../assets/images/parquet/rovereNaturaleSpinaItaliana.webp';
import rovere90 from '../assets/images/parquet/rovereNaturale90.webp';
import rovereIta from '../assets/images/parquet/rovereIta.webp';
import rovereSpina90 from '../assets/images/parquet/rovereSpina90.webp';

const parquetImages = [
  { src: rovereNaturale, alt: 'Rovere naturale' },
  { src: rovereMielato, alt: 'Rovere mielato' },
  { src: rovereSpinaItaliana, alt: 'Rovere spina italiana' },
  { src: rovere90, alt: 'Rovere 90°' },
  { src: rovereIta, alt: 'Rovere italiana' },
  { src: rovereSpina90, alt: 'Rovere spina 90°' },
];

function HeroStats() {
  return (
    <div className="flex flex-col gap-4 pt-2 items-center text-center">
      
      {/* Face-pile parquet - Cerchi più grandi */}
      <div className="flex items-center -space-x-3">
        {parquetImages.slice(0, 6).map((img, index) => (
          <div key={index} className="relative transition-transform hover:scale-110 duration-300">
            <img
              className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md"
              src={img.src}
              alt={img.alt}
            />
          </div>
        ))}
      </div>

      {/* Stat text - Minimalista e pulito */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-center gap-2">
          <p className="text-[15px] font-bold text-slate-900">
            314+ parquet installati
          </p>
          <Check className="w-5 h-5 text-green-500 flex-shrink-0" strokeWidth={3} />
        </div>
        <p className="text-[13px] text-slate-500">
          ogni anno a Milano e dintorni
        </p>
      </div>
    </div>
  );
}

export default HeroStats;