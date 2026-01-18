
import React from 'react';
import { GameState } from '../types';
import { UPGRADES } from '../constants';
import { sfx } from '../utils/sfx';

interface TerminalUpgradesProps {
  state: GameState;
  onBuy: (id: string, cost: number) => void;
  onBack: () => void;
}

const TerminalUpgrades: React.FC<TerminalUpgradesProps> = ({ state, onBuy, onBack }) => {
  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Tools_Terminal</h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase mt-1 tracking-widest">Available_Resources: <span className="text-emerald-400 font-bold">{state.xp} XP</span></p>
        </div>
        <button onClick={onBack} className="text-[9px] font-mono text-slate-500 hover:text-white uppercase px-3 py-1.5 border border-slate-800 rounded transition-all">Return_Hub</button>
      </div>

      <div className="grid gap-4">
        {UPGRADES.map(u => {
          const isUnlocked = state.unlockedUpgrades.includes(u.id);
          const canAfford = state.xp >= u.cost;
          
          return (
            <div key={u.id} className={`glass-panel p-6 rounded border transition-all ${isUnlocked ? 'border-emerald-500/30 bg-emerald-500/5' : canAfford ? 'border-slate-700' : 'border-slate-800 opacity-50'}`}>
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center text-2xl border border-slate-700">
                  {u.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white uppercase tracking-wider text-sm">{u.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-1">{u.desc}</p>
                </div>
                {!isUnlocked ? (
                  <button 
                    disabled={!canAfford}
                    onClick={() => { sfx.confirm(); onBuy(u.id, u.cost); }}
                    className={`px-6 py-2 rounded font-mono text-[10px] font-bold uppercase transition-all ${canAfford ? 'bg-emerald-600 text-white hover:bg-emerald-500' : 'bg-slate-800 text-slate-500'}`}
                  >
                    {u.cost} XP
                  </button>
                ) : (
                  <span className="text-emerald-500 font-mono text-[10px] uppercase font-bold tracking-widest px-4 py-2 bg-emerald-500/10 rounded">ACTIVE</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 glass-panel rounded bg-slate-900/40 border-slate-800 text-center">
         <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">More laboratory tools will unlock at Clearance Level 5</p>
      </div>
    </div>
  );
};

export default TerminalUpgrades;
