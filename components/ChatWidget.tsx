
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { chatWithShadow } from '../services/gemini';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'shadow_akd_history_fr_v3';

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Échec de la lecture de l'historique", e);
      }
    }
    return [{
      id: 'initial',
      role: 'assistant',
      content: 'L\'analyse peut commencer. Que souhaitez-vous déconstruire aujourd\'hui ?',
      timestamp: Date.now(),
    }];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const clearHistory = () => {
    if (window.confirm("Confirmer l'effacement définitif de toutes les données de session ?")) {
      const initialMessage: Message = {
        id: 'initial-' + Date.now(),
        role: 'assistant',
        content: 'Données purgées. Le système est prêt pour une nouvelle analyse.',
        timestamp: Date.now(),
      };
      setMessages([initialMessage]);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.slice(-10).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await chatWithShadow(input, history as any);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        imageUrl: response.imageUrl,
        thought: response.thought,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erreur de connexion Shadow:", error);
      const errorMessage: Message = {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: "Connexion instable. Répétez votre transmission.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-950/90 dark:bg-black/95 backdrop-blur-xl animate-in fade-in zoom-in duration-500 overflow-hidden">
      {/* Conteneur principal: mt/mb sur Desktop, Full Screen sur Mobile */}
      <div className="flex flex-col w-full max-w-5xl h-full sm:h-[90vh] sm:my-8 bg-white dark:bg-black sm:rounded-[32px] md:rounded-[40px] border-x border-slate-200 dark:border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden relative">
        
        {/* Overlay d'ambiance scanline */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.01] dark:opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-8 border-b border-slate-100 dark:border-white/5 bg-white dark:bg-black relative z-20">
          <div className="flex items-center gap-3 md:gap-5">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-700 dark:bg-blue-950 flex items-center justify-center font-serif text-white italic text-xl md:text-3xl shadow-xl rounded-xl md:rounded-2xl border border-blue-600 dark:border-blue-900/50">S</div>
            <div>
              <h3 className="text-sm md:text-lg font-black text-slate-900 dark:text-white tracking-tight uppercase">Interface Shadow</h3>
              <p className="text-[8px] md:text-[10px] text-blue-600 dark:text-blue-500 uppercase tracking-[0.4em] font-black">Sécurité : White Room</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={clearHistory}
              title="Réinitialiser"
              className="p-2 md:p-3 text-slate-400 hover:text-red-600 dark:hover:text-red-500 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
            <button onClick={onClose} className="p-2 md:p-3 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        </div>

        {/* Zone de messages (Scroll) */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-10 space-y-8 md:space-y-12 bg-slate-50/50 dark:bg-black/50 custom-scrollbar relative z-10 scroll-smooth">
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12 pb-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                <div className={`
                  max-w-[90%] md:max-w-[75%] p-4 md:p-8 rounded-[24px] md:rounded-[32px] text-sm md:text-base relative shadow-lg transition-all duration-500 border
                  ${m.role === 'user' 
                    ? 'bg-blue-700 border-blue-600 text-white rounded-tr-none' 
                    : 'bg-white dark:bg-[#0a0a0a] border-slate-100 dark:border-white/5 text-slate-800 dark:text-slate-300 rounded-tl-none'
                  }
                `}>
                  <div className={`text-[8px] md:text-[10px] mb-3 md:mb-4 font-black uppercase tracking-[0.2em] md:tracking-[0.3em] opacity-40 flex items-center gap-2`}>
                    <span className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-current"></span>
                    {m.role === 'assistant' ? 'SHADOW' : 'CLIENT'} — {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {m.content && <div className="leading-relaxed font-light tracking-wide whitespace-pre-wrap text-sm md:text-base">{m.content}</div>}
                  {m.imageUrl && (
                    <div className="mt-6 md:mt-8 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-white/10 overflow-hidden shadow-2xl">
                      <img src={m.imageUrl} alt="Projection Visuelle" className="w-full object-cover" />
                    </div>
                  )}
                  {m.thought && (
                     <details className="mt-6 md:mt-8 text-[10px] md:text-[11px] text-slate-500 dark:text-slate-500 border-t border-slate-100 dark:border-white/5 pt-4 md:pt-6 cursor-pointer group">
                       <summary className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors uppercase font-black tracking-[0.3em] md:tracking-[0.4em] list-none flex items-center gap-2">
                         <span className="w-1.5 h-[2px] bg-current"></span>
                         LOGIQUE FROIDE
                       </summary>
                       <div className="italic mt-3 md:mt-4 opacity-80 leading-relaxed py-3 md:py-4 pl-4 md:pl-6 border-l-2 border-blue-100 dark:border-blue-900/30 bg-blue-50/10 dark:bg-blue-900/5 rounded-r-2xl">
                         {m.thought}
                       </div>
                     </details>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#0a0a0a] border border-slate-100 dark:border-white/5 p-4 md:p-6 rounded-[24px] md:rounded-[32px] rounded-tl-none flex flex-col gap-3 min-w-[120px] md:min-w-[160px] shadow-lg">
                  <div className="flex gap-1.5 md:gap-2">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  </div>
                  <span className="text-[8px] md:text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] md:tracking-[0.5em] animate-pulse">Calcul...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Zone de saisie - Toujours visible en bas */}
        <div className="p-4 md:p-10 bg-white dark:bg-black border-t border-slate-100 dark:border-white/5 relative z-20 mt-auto">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSend} className="flex gap-3 md:gap-5 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Declarez votre intention..."
                className="flex-1 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-full px-6 md:px-10 py-3 md:py-5 text-sm md:text-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-700 font-light"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center bg-blue-700 dark:bg-blue-900 hover:bg-blue-800 disabled:opacity-30 text-white rounded-full transition-all shadow-xl hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="md:w-7 md:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
            <div className="mt-3 md:mt-6 flex justify-between items-center px-2 md:px-4">
               <p className="text-[7px] md:text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] md:tracking-[0.4em] font-black">
                WHITE ROOM PROTOCOL • ACTIVE
              </p>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f622;
          border-radius: 20px;
        }
        @media (min-width: 768px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWidget;
