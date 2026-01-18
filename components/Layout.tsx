
import React from 'react';
import { GameState } from '../types';
import { sfx } from '../utils/sfx';

interface LayoutProps {
  state: GameState;
  children: React.ReactNode;
  activeTab: string;
  onNav: (tab: any) => void;
}

const Layout: React.FC<LayoutProps> = ({ state, children, activeTab, onNav }) => {
  return (
    <div className="min-h-screen flex flex-col no-print bg-[#0f172a] text-slate-100">
      <header className="sticky top-0 z-[60] bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-col cursor-pointer" onClick={() => { sfx.beep(440, 0.05); onNav('dashboard'); }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded shadow-[0_0_8px_#10b981] animate-pulse"></div>
                <h1 className="text-[11px] font-mono font-bold tracking-[0.2em] text-emerald-500 uppercase">
                  TOK_LAB_v1.2
                </h1>
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">Clinical_Research_Portal</span>
            </div>

            <nav className="hidden md:flex items-center gap-4 ml-8">
              {['dashboard', 'upgrades', 'submission'].map(tab => (
                <button
                  key={tab}
                  onClick={() => { sfx.beep(500, 0.05); onNav(tab); }}
                  className={`text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 rounded transition-all ${
                    activeTab === tab ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab === 'dashboard' ? 'Core_Hub' : tab === 'submission' ? 'Archives' : tab}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex gap-4 font-mono text-right">
            <div className="px-3 border-r border-slate-800">
              <p className="text-[8px] uppercase text-slate-500 mb-0.5">Integrity</p>
              <div className="flex items-center gap-2">
                <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full transition-all ${state.dataIntegrity < 40 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${state.dataIntegrity}%` }}></div>
                </div>
                <p className={`text-[10px] font-bold ${state.dataIntegrity < 40 ? 'text-red-400' : 'text-emerald-400'}`}>{state.dataIntegrity}%</p>
              </div>
            </div>
            <div>
              <p className="text-[8px] uppercase text-slate-500 mb-0.5">Clearance</p>
              <p className="text-[10px] font-bold text-emerald-400">LVL_{state.clearanceLevel}</p>
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
