import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { faqsData } from '../utils/faqsData';
import oniPhoto from '../assets/images/Oni/onisim-parquettista.webp';

const FAQItem = ({ category, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`group transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isOpen 
          ? 'bg-white border-gray-200 shadow-md' 
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
      } border rounded-xl overflow-hidden`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 px-5 text-left outline-none"
      >
        <div className="flex flex-col pr-6">
          <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase font-semibold mb-1">
            {category}
          </span>
          <span className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-snug tracking-tight">
            {question}
          </span>
        </div>
        
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 ${
          isOpen 
            ? 'rotate-180 bg-gray-900 border-gray-900' 
            : 'bg-white group-hover:bg-gray-50'
        }`}>
          <ChevronDown size={16} strokeWidth={2.5} className={isOpen ? 'text-white' : 'text-gray-400'} />
        </div>
      </button>

      <div className={`grid transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1">
             <div className="border-t border-gray-100 pt-4">
                <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-600 font-medium">
                  {answer.split('**').map((part, i) => i % 2 === 1 ? <span key={i} className="font-bold text-gray-900">{part}</span> : part)}
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServiceFAQ({ category, service }) {
  // Supporta sia category stringa che service object per compatibilità
  const targetCategory = category || service?.pricingId || service?.slug || 'home-general';
  const questions = faqsData[targetCategory] || faqsData['home-general'] || [];

  if (questions.length === 0) return null;

  return (
    <section className="relative bg-white py-16 sm:py-16 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        
        <div className="relative mb-10 sm:mb-12 text-center">

          <h2 className="text-gray-900">
            <span className="block text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
             <span className='text-gray-400'>Domande?</span>
            </span>
            <span className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
              <span className="relative inline-flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200 shadow-sm">
                <img
                  src={oniPhoto}
                  alt="Oni, parquettista a Roma"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </span>
              <span className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
               Risponde un parquettista<span className="text-gray-300">.</span>
              </span>
            </span>
          </h2>

          <div className="mt-5 flex items-center justify-center gap-2.5">
            <span className="h-px w-6 bg-gray-200" aria-hidden="true" />
            <p className="text-[13px] sm:text-sm font-medium text-gray-500">
              <span className="font-semibold text-gray-600">Oni</span>
              <span className="inline-flex items-center align-middle leading-none mx-0.5">
                <svg className="h-3.5 w-3.5 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </span>
              <span className="text-gray-300"> · </span>
              posatore di PosaParquetRoma.it
            </p>
            <span className="h-px w-6 bg-gray-200" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>

      </div>

      {/* ── Animazione freccia curva Oni ── */}
      <style>{`
        .arrow-oni-from-below {
          animation: arrowOniFade 1.6s ease-in-out 0.4s infinite;
        }
        .arrow-oni-path {
          stroke-dasharray: 160;
          stroke-dashoffset: 160;
          animation: drawOniCurve 0.9s ease-out forwards;
        }
        .arrow-oni-head {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: drawOniHead 0.4s ease-out 0.6s forwards;
        }
        @keyframes arrowOniFade {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
        @keyframes drawOniCurve {
          to { stroke-dashoffset: 0; }
        }
        @keyframes drawOniHead {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}