
import React from 'react';
import { DAILY_QUOTES, DAILY_ADVICES } from '../constants';

const DailyBar: React.FC = () => {
  const quote = DAILY_QUOTES[Math.floor(Date.now() / 86400000) % DAILY_QUOTES.length];
  const advice = DAILY_ADVICES[Math.floor(Date.now() / 86400000) % DAILY_ADVICES.length];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-4 px-6 relative z-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Citation du jour</span>
          <p className="text-sm font-serif italic text-slate-700 dark:text-slate-300">
            "{quote.text}" — <span className="font-sans font-bold not-italic">{quote.author}</span>
          </p>
        </div>
        <div className="hidden md:block w-px h-10 bg-slate-200 dark:bg-slate-800"></div>
        <div className="flex-1 text-center md:text-right">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">Conseil stratégique</span>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-light">
            {advice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyBar;
