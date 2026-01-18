import React from 'react';
import { GameState } from '../types.ts';
import { sfx } from '../utils/sfx.ts';

interface LayoutProps {
  state: GameState;
  children: React.ReactNode;
  activeTab: string;
  onNav: (tab: any) => void;
  isDossierUnlocked: boolean;
}

const Layout: React.FC<LayoutProps> = ({ state, children, activeTab, onNav, isDossierUnlocked }) => {
  const handleNav = (tab: string) => {
    sfx.nav();
    onNav(tab);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#050505] text-[#ffb000] overflow-hidden">
      {/* ARCHIVAL HEADER */}
      <header className="h-12 border-b border-[#ffb000]/20 px-4 flex items-center justify-between bg-black/40 z-50 shrink-0">
        <div className="flex items-center gap-2">
          <div className="text-[10px] font-bold tracking-tighter opacity-80 uppercase">
            Vault_TOK <span className="opacity-30 px-1">//</span> Lab.Terminal
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <div className="flex flex-col items-end">
             <span className="opacity-40 text-[7px] uppercase leading-none mb-1">Stability</span>
             <div className="w-12 h-1 bg-[#ffb000]/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#ffb000] transition-all" style={{ width: `${state.integrity}%` }}></div>
             </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="opacity-40 text-[7px] uppercase leading-none mb-1">Credits</span>
            <span className="font-bold">{state.xp}</span>
          </div>
        </div>
      </header>
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>

      {/* MINIMAL MOBILE NAV */}
      <nav className="h-16 border-t border-[#ffb000]/20 bg-black/80 flex items-stretch shrink-0 pb-safe">
        <button 
          onClick={() => handleNav('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${activeTab === 'dashboard' ? 'bg-[#ffb000]/10 border-t-2 border-[#ffb000]' : 'opacity-40'}`}
        >
          <span className="text-[8px] font-bold uppercase tracking-widest mt-1">Network</span>
        </button>
        <button 
          onClick={() => handleNav('upgrades')}
          className={`flex-1 flex flex-col items-center justify-center transition-all ${activeTab === 'upgrades' ? 'bg-[#ffb000]/10 border-t-2 border-[#ffb000]' : 'opacity-40'}`}
        >
          <span className="text-[8px] font-bold uppercase tracking-widest mt-1">Systems</span>
        </button>
        {isDossierUnlocked && (
          <button 
            onClick={() => handleNav('submission')}
            className={`flex-1 flex flex-col items-center justify-center transition-all ${activeTab === 'submission' ? 'bg-[#ffb000]/10 border-t-2 border-[#ffb000]' : 'opacity-40'}`}
          >
            <span className="text-[8px] font-bold uppercase tracking-widest mt-1">Archive</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Layout;