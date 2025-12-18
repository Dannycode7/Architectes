
import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import ChatWidget from './components/ChatWidget';
import { Icons } from './constants';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className="min-h-screen transition-colors duration-700 bg-slate-50 dark:bg-black">
      <Home />
      
      {/* Contrôles flottants (Toggle et Chat) */}
      <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[400] flex flex-col items-center gap-6">
        
        {/* Toggle Thème - Plus stylé */}
        <button
          onClick={toggleTheme}
          className="w-14 h-14 rounded-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 shadow-xl flex items-center justify-center text-slate-600 dark:text-blue-500 hover:scale-110 transition-all duration-500 group"
          title={theme === 'light' ? 'Activer le Protocole Obscur' : 'Rétablir la Lumière'}
        >
          {theme === 'light' ? (
            <Icons.Moon />
          ) : (
            <Icons.Sun />
          )}
          <div className="absolute inset-0 rounded-full border border-blue-500/0 group-hover:border-blue-500/40 animate-pulse duration-1000"></div>
        </button>

        {/* Bouton Chat - Plus grand et mystérieux */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative group focus:outline-none"
        >
          {!isChatOpen && (
            <>
              <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-10 group-hover:opacity-30 duration-[2000ms]"></div>
              <div className="absolute inset-[-12px] border border-blue-200/50 dark:border-blue-900/30 rounded-full animate-[spin_25s_linear_infinite]"></div>
              <div className="absolute inset-[-6px] border border-blue-100/30 dark:border-blue-800/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            </>
          )}
          <div className={`
            relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-700 shadow-[0_0_50px_rgba(0,0,0,0.3)]
            ${isChatOpen 
              ? 'bg-slate-900 dark:bg-white rotate-180 scale-90' 
              : 'bg-blue-700 dark:bg-blue-900 border border-blue-600 dark:border-blue-800 group-hover:scale-110 shadow-blue-500/10'
            }
          `}>
            {isChatOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={theme === 'dark' ? 'black' : 'white'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
              <div className="flex flex-col items-center gap-1.5 transition-all duration-500 group-hover:gap-2">
                 <div className="w-10 h-[3px] bg-white rounded-full"></div>
                 <div className="w-8 h-[3px] bg-blue-300 dark:bg-blue-400 rounded-full opacity-60"></div>
                 <div className="w-6 h-[3px] bg-blue-200 dark:bg-blue-500 rounded-full opacity-30"></div>
              </div>
            )}
          </div>
          {!isChatOpen && (
             <div className="absolute right-28 md:right-32 top-1/2 -translate-y-1/2 px-8 py-3 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 text-[11px] text-blue-700 dark:text-blue-500 font-black opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-6 group-hover:translate-x-0 whitespace-nowrap tracking-[0.5em] uppercase pointer-events-none rounded-full shadow-2xl hidden sm:block">
               INITIALISER <span className="text-slate-400 dark:text-slate-600">SHADOW</span>
             </div>
          )}
        </button>
      </div>

      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <footer className="py-24 px-6 text-center text-[11px] text-slate-400 dark:text-slate-700 uppercase tracking-[0.6em] border-t border-slate-200 dark:border-white/5 bg-white dark:bg-black transition-colors duration-700">
        ARCHIVES SHADOW AKD &copy; {new Date().getFullYear()} • TOUS DROITS RÉSERVÉS AU SYSTÈME
      </footer>

      <style>{`
        * {
          transition: background-color 0.7s ease, border-color 0.7s ease, color 0.7s ease;
        }
        
        ::selection {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .dark ::selection {
          background: rgba(59, 130, 246, 0.4);
          color: white;
        }

        @keyframes pulse-soft {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        .shadow-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
        }
        
        .dark .shadow-glow {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.05);
        }
      `}</style>
    </div>
  );
};

export default App;
