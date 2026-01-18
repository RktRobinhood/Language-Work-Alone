
import React from 'react';
import { GameState } from '../types.ts';
import { sfx } from '../utils/sfx.ts';

interface LayoutProps {
  state: GameState;
  children: React.ReactNode;
  activeTab: string;
  onNav: (tab: any) => void;
  stabilizedCount: number;
}

const Layout: React.FC<LayoutProps> = ({ state, children, activeTab, onNav, stabilizedCount }) => {
  const handleNav = (tab: string) => {
    sfx.nav();
    onNav(tab);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#050505] text-[#ffb000] overflow-hidden">
      <header className="h-14 border-b border-[#ffb000]/20 px-4 flex items-center justify-between bg-black/40 z-50 shrink-0">
        <div className="flex flex-col">
          <div className="text-[10px] font-bold tracking-[0.1em] opacity-80 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#ffb000] animate-pulse rounded-full"></span>
            Animus_TOK_v9
          </div>
          <div className="text-[7px] opacity-40 uppercase tracking-widest mt-0.5">Linguistic_Memory_Corridor</div>
        </div>
        
        <div className="flex items-center gap-6 text-[10px] font-mono">
          <div className="flex flex-col items-end">
             <span className="opacity-40 text-[7px] uppercase leading-none mb-1">Global_Sync</span>
             <span className="font-black text-cyan-400">{Math.floor(state.syncRate)}%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="opacity-40 text-[7px] uppercase leading-none mb-1">Stability</span>
            <div className={`w-16 h-1 bg-white/10 rounded-full overflow-hidden`}>
              <div className={`h-full transition-all duration-1000 ${state.integrity > 30 ? 'bg-[#ffb000]' : 'bg-red-500 shadow-[0_0_10px_red]'}`} style={{ width: `${state.integrity}%` }}></div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>

      <nav className="h-16 border-t border-[#ffb000]/20 bg-black/90 flex items-stretch shrink-0 pb-safe">
        <button 
          onClick={() => handleNav('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${activeTab === 'dashboard' ? 'bg-[#ffb000]/10 border-t-2 border-[#ffb000]' : 'opacity-30'}`}
        >
          <span className="text-[8px] font-bold uppercase tracking-widest">Network</span>
        </button>
        <button 
          onClick={() => handleNav('upgrades')}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${activeTab === 'upgrades' ? 'bg-[#ffb000]/10 border-t-2 border-[#ffb000]' : 'opacity-30'}`}
        >
          <span className="text-[8px] font-bold uppercase tracking-widest">Animus</span>
        </button>
        {stabilizedCount >= 6 && (
          <button 
            onClick={() => handleNav('endgame')}
            className={`flex-1 flex flex-col items-center justify-center transition-all animate-pulse ${activeTab === 'endgame' ? 'bg-cyan-500/20 border-t-2 border-cyan-400' : 'opacity-50 text-cyan-500'}`}
          >
            <span className="text-[8px] font-bold uppercase tracking-widest">RECONCILE</span>
          </button>
        )}
        {(state.stage === 'complete' || stabilizedCount >= 10) && (
          <button 
            onClick={() => handleNav('submission')}
            className={`flex-1 flex flex-col items-center justify-center transition-all ${activeTab === 'submission' ? 'bg-green-500/10 border-t-2 border-green-500' : 'opacity-30 text-green-500'}`}
          >
            <span className="text-[8px] font-bold uppercase tracking-widest">Archive</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Layout;
