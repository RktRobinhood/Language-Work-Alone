
import React from 'react';
import { GameState } from '../types';

interface LayoutProps {
  state: GameState;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ state, children }) => {
  return (
    <div className="min-h-screen flex flex-col no-print bg-[#020617] text-slate-100">
      <header className="sticky top-0 z-[60] glass-panel border-b border-cyan-500/30 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-500 rounded-sm shadow-[0_0_8px_#06b6d4] animate-pulse"></div>
              <h1 className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">
                TOK_LAB_v5.0
              </h1>
            </div>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[9px] font-mono text-slate-500 uppercase">Clearance:</span>
               <span className="text-[10px] font-mono text-cyan-200 font-bold">{state.clearanceLevel}</span>
            </div>
          </div>
          
          <div className="flex gap-4 font-mono text-right">
            <div className="px-3 border-r border-slate-800">
              <p className="text-[8px] uppercase text-slate-500">Integrity</p>
              <p className={`text-xs font-bold ${state.dataIntegrity < 40 ? 'text-red-500' : 'text-green-500'}`}>{state.dataIntegrity}%</p>
            </div>
            <div>
              <p className="text-[8px] uppercase text-slate-500">Research_XP</p>
              <p className="text-xs font-bold text-cyan-400">{state.xp}</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-2xl mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}></div>
    </div>
  );
};

export default Layout;
