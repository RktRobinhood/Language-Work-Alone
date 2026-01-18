
import React from 'react';
import { GameState } from '../types';
import { sfx } from '../utils/sfx';

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
    <div className="min-h-screen flex flex-col selection:bg-[#ffb000] selection:text-black">
      <header className="sticky top-0 z-[60] bg-[#1a1a1a]/95 backdrop-blur border-b-4 border-[#ffb000] px-6 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col cursor-pointer" onClick={() => handleNav('dashboard')}>
              <h1 className="text-2xl font-bold crt-text tracking-tighter text-[#ffb000]">Vault TOK</h1>
              <span className="text-[8px] font-mono uppercase opacity-50 -mt-1">Language Lab Protocol</span>
            </div>
            
            <nav className="hidden md:flex gap-4">
              <button 
                onClick={() => handleNav('dashboard')}
                className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border border-transparent hover:border-[#ffb000] transition-all ${activeTab === 'dashboard' ? 'bg-[#ffb000] text-black' : 'text-[#ffb000]'}`}
              >
                Status
              </button>
              <button 
                onClick={() => handleNav('upgrades')}
                className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border border-transparent hover:border-[#ffb000] transition-all ${activeTab === 'upgrades' ? 'bg-[#ffb000] text-black' : 'text-[#ffb000]'}`}
              >
                Upgrades
              </button>
              {isDossierUnlocked && (
                <button 
                  onClick={() => handleNav('submission')}
                  className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 border border-transparent border-white/20 hover:border-[#ffb000] transition-all ${activeTab === 'submission' ? 'bg-[#ffb000] text-black' : 'text-[#ffb000]'}`}
                >
                  Dossier
                </button>
              )}
            </nav>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <p className="text-[8px] uppercase opacity-50">Mental Integrity</p>
              <div className="w-16 h-1 bg-black rounded-full overflow-hidden">
                <div className={`h-full transition-all ${state.integrity < 40 ? 'bg-red-500' : 'bg-[#ffb000]'}`} style={{ width: `${state.integrity}%` }}></div>
              </div>
            </div>
            <div className="text-right min-w-[70px]">
              <p className="text-[8px] uppercase opacity-50">XP Credits</p>
              <p className="text-xs font-bold text-[#ffb000] crt-text">{state.xp}</p>
            </div>
            <div className="h-8 w-8 rounded-full border-2 border-[#ffb000] flex items-center justify-center font-bold text-[10px]">
               {state.clearanceLevel}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
