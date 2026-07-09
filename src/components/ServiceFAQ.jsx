import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqsData } from '../utils/faqsData';

const FAQItem = ({ category, question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className={`group mb-4 transition-all duration-300 ${
        isOpen ? 'bg-white' : 'bg-white hover:bg-gray-50'
      } border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 px-6 text-left outline-none"
      >
        <div className="flex flex-col pr-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/70 mb-1">
            {category}
          </span>
          <span className="text-[18px] md:text-[20px] font-black tracking-tight text-black uppercase leading-tight">
            {question}
          </span>
        </div>
        
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-[3px] border-black transition-all duration-500 ${
          isOpen 
            ? 'rotate-[135deg] bg-[#FFF176]' 
            : 'bg-white group-hover:bg-gray-100'
        }`}>
          <Plus size={22} strokeWidth={3} className="text-black" />
        </div>
      </button>

      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-2">
             <div className="border-t-[3px] border-black/5 pt-4">
                <p className="max-w-3xl text-[16px] md:text-[17px] leading-relaxed text-black/70 font-bold">
                  {answer.split('**').map((part, i) => i % 2 === 1 ? <span key={i} className="bg-[#FFF176] px-1">{part}</span> : part)}
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
    <section className="bg-[#f4f4f0] py-12 px-4">
      <div className="mx-auto max-w-xl">
        
        <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter italic">
                Domande Frequenti
            </h2>
            <div className="mt-2 inline-block bg-[#81D4FA] border-[2px] border-black px-3 py-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-black">Tutto quello che devi sapere</p>
            </div>
        </div>

        <div className="space-y-4">
          {questions.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
}