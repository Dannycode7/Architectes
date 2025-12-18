
import React, { useState } from 'react';
import { Icons, DAILY_QUOTES, DAILY_ADVICES } from '../constants';
import DailyBar from './DailyBar';

const FeatureCard = ({ title, description, icon: Icon }: { title: string; description: string; icon: React.FC }) => (
  <div className="group relative p-8 md:p-10 bg-white dark:bg-[#050505] border border-slate-100 dark:border-white/5 hover:border-blue-400 dark:hover:border-blue-900 transition-all duration-700 shadow-sm hover:shadow-xl dark:shadow-none">
    <div className="relative z-10">
      <div className="mb-6 text-blue-600 dark:text-blue-500 transition-all duration-500 group-hover:scale-110">
        <Icon />
      </div>
      <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100 tracking-tight uppercase group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-500 leading-relaxed text-sm font-light tracking-wide group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
        {description}
      </p>
    </div>
    <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 border-b-2 border-r-2 border-blue-500/30 translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"></div>
  </div>
);

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const quote = DAILY_QUOTES[Math.floor(Date.now() / 86400000) % DAILY_QUOTES.length];
  const advice = DAILY_ADVICES[Math.floor(Date.now() / 86400000) % DAILY_ADVICES.length];

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900/30 selection:text-blue-900 transition-colors duration-700 overflow-x-hidden">
      {/* Texture de fond mystérieuse */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/p6.png')] z-[1]"></div>
      
      {/* Effets de lumière */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-200/20 dark:bg-blue-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[80%] bg-blue-100/30 dark:bg-slate-900/10 blur-[150px] rounded-full"></div>
      </div>

      {/* Navigation avec Burger */}
      <nav className="container mx-auto px-6 md:px-12 py-6 md:py-12 flex justify-between items-center relative z-[60] border-b border-slate-200 dark:border-white/5 bg-slate-50/80 dark:bg-black/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4 group cursor-default">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-700 dark:bg-blue-900 border border-blue-800 dark:border-blue-700 flex items-center justify-center font-serif text-xl md:text-3xl text-white italic shadow-lg transition-transform duration-500 group-hover:rotate-6">S</div>
          <div className="flex flex-col">
            <span className="font-black tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-xl text-slate-900 dark:text-white leading-none">SHADOW AKD</span>
            <span className="text-[7px] md:text-[9px] text-blue-600 dark:text-blue-500 font-bold tracking-[0.3em] md:tracking-[0.5em] mt-1 uppercase">Division de l'Excellence</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-14 text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 dark:text-slate-500">
          <a href="#" className="hover:text-blue-700 dark:hover:text-blue-400 transition-all hover:tracking-[0.5em]">Stratégie</a>
          <a href="#" className="hover:text-blue-700 dark:hover:text-blue-400 transition-all hover:tracking-[0.5em]">Protocole</a>
          <a href="#" className="hover:text-blue-700 dark:hover:text-blue-400 transition-all hover:tracking-[0.5em]">Archives</a>
        </div>

        {/* Burger Button Mobile */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-900 dark:text-white"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>
      </nav>

      {/* Mobile Side Menu Overlay */}
      <div className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-[#050505] shadow-2xl transition-transform duration-500 p-8 flex flex-col gap-12 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="space-y-6 mt-12">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-600/20 pb-2">Menu</h4>
            <div className="flex flex-col gap-6">
              <a href="#" className="text-lg font-bold text-slate-900 dark:text-white tracking-widest">STRATÉGIE</a>
              <a href="#" className="text-lg font-bold text-slate-900 dark:text-white tracking-widest">PROTOCOLE</a>
              <a href="#" className="text-lg font-bold text-slate-900 dark:text-white tracking-widest">ARCHIVES</a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-b border-blue-600/20 pb-2">Archives du Jour</h4>
            <div className="space-y-4">
              <div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Citation</span>
                <p className="text-xs italic dark:text-slate-300">"{quote.text}"</p>
              </div>
              <div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Conseil</span>
                <p className="text-xs dark:text-slate-400">{advice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DailyBar only visible on large screens */}
      <div className="hidden lg:block">
        <DailyBar />
      </div>

      <main className="container mx-auto px-6 md:px-12 pt-12 md:pt-36 pb-48 relative z-10">
        <div className="max-w-5xl">
          <div className="flex items-center gap-4 mb-10 overflow-hidden">
             <div className="h-[2px] w-12 md:w-16 bg-blue-600 dark:bg-blue-900"></div>
             <p className="text-blue-700 dark:text-blue-500 font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-[11px] animate-pulse">
               Système Cognitif Opérationnel
             </p>
          </div>
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-serif italic font-bold leading-[1] mb-8 md:mb-12 text-slate-900 dark:text-white tracking-tighter">
            Maîtrisez <br />
            <span className="text-blue-600 dark:text-blue-700">l'Invisible.</span>
          </h1>
          <p className="text-base md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mb-12 md:mb-16 leading-relaxed font-light tracking-wide italic">
            "Le véritable génie n'est pas celui qui gagne la partie, mais celui qui définit les règles du jeu sans que personne ne s'en aperçoive." 
            Shadow AKD vous ouvre les portes de la perception absolue.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-8">
            <button className="flex-1 sm:flex-none group relative bg-blue-700 dark:bg-blue-900 text-white px-8 md:px-12 py-4 md:py-5 font-bold rounded-none overflow-hidden transition-all shadow-xl hover:shadow-blue-200 dark:hover:shadow-blue-900/20">
              <span className="relative z-10 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs">Entrer dans la Room</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            <button className="flex-1 sm:flex-none group px-8 md:px-12 py-4 md:py-5 border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-500 font-bold rounded-none hover:bg-slate-100 dark:hover:bg-white/5 transition-all uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs text-center">
              Le Manifeste
            </button>
          </div>
        </div>

        <section className="mt-24 md:mt-48 grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-200 dark:border-white/5">
          <FeatureCard 
            title="Psychologie Noire" 
            description="Étudiez les mécanismes de défense contre la manipulation émotionnelle et apprenez à rester impassible face au chaos." 
            icon={Icons.Shield}
          />
          <FeatureCard 
            title="L'Art du Calme" 
            description="Développez une présence taciturne. Apprenez que le silence est souvent la réponse la plus bruyante dans une pièce." 
            icon={Icons.Eye}
          />
          <FeatureCard 
            title="Social Engineering" 
            description="Déchiffrez les hiérarchies invisibles. Apprenez à influencer les résultats par une analyse logique froide et précise." 
            icon={Icons.Brain}
          />
          <FeatureCard 
            title="White Room" 
            description="Une méthodologie de pensée pure. Extraction de la logique des données complexes, débarrassée de tout biais émotionnel." 
            icon={Icons.Book}
          />
        </section>

        <div className="mt-32 md:mt-64 flex flex-col items-center justify-center space-y-8 md:space-y-12 opacity-50 hover:opacity-100 transition-opacity duration-1000">
            <div className="w-[1px] h-24 md:h-40 bg-gradient-to-b from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
            <p className="text-slate-400 dark:text-slate-600 text-[8px] md:text-[10px] tracking-[0.8em] md:tracking-[1.2em] uppercase font-bold text-center px-4 max-w-2xl leading-loose">
              "L'OEIL QUI VOIT TOUT NE RÉVÈLE JAMAIS SES SECRETS"
            </p>
            <div className="w-[1px] h-24 md:h-40 bg-gradient-to-b from-transparent via-blue-200 dark:via-blue-900 to-transparent"></div>
        </div>
      </main>
    </div>
  );
};

export default Home;
