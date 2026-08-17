import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { track } from '../utils/analytics';

export default function LogisticQuestions({ questions }) {
  const [openId, setOpenId] = useState(null);

  if (!questions || questions.length === 0) return null;

  const toggle = (index) => {
    const next = openId === index ? null : index;
    setOpenId(next);
    if (next !== null) {
      track('logistic_question_expand', { question_index: index });
    }
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
            Le 8 domande che ti stai facendo
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Risposte dirette, senza giri di parole.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((q, i) => (
            <div
              key={i}
              className="bg-white border-[2.5px] border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-base font-black text-slate-900 pr-4 leading-snug">
                  {q.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openId === i ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2.5}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openId === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{q.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}