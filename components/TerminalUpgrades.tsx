
import React from 'react';
import { GameState } from '../types';
import { UPGRADES } from '../constants';

interface TerminalUpgradesProps {
  state: GameState;
  onBuy: (id: string, cost: number) => void;
  onBack: () => void;
}

const TerminalUpgrades: React.FC<TerminalUpgradesProps> = ({ state, onBuy, onBack }) => {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Lab Terminal</h2>
        <span className="text-xs font-mono text-cyan-400">CREDITS: {state.xp} XP</span>
      </div>

      <div className="grid gap-4">
        {UPGRADES.map(u => {
          const isUnlocked = state.unlockedUpgrades.includes(u.id);
          const canAfford = state.xp >= u.cost;
          
          return (
            <div key={u.id} className={`glass-panel p-6 rounded-xl border-2 transition-all ${isUnlocked ? 'border-green-500/40' : canAfford ? 'border-cyan-500/30' : 'border-slate-800 opacity-50'}`}>
              <div className="flex items-center gap-4">
                <span className="text-3xl">{u.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-white uppercase tracking-wider">{u.name}</h3>
                  <p className="text-xs text-slate-400">{u.desc}</p>
                </div>
                {!isUnlocked ? (
                  <button 
                    disabled={!canAfford}
                    onClick={() => onBuy(u.id, u.cost)}
                    className={`px-4 py-2 rounded font-mono text-xs font-bold uppercase transition-all ${canAfford ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-slate-800 text-slate-500'}`}
                  >
                    {u.cost} XP
                  </button>
                ) : (
                  <span className="text-green-500 font-mono text-xs uppercase font-bold">UNLOCKED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <button onClick={onBack} className="w-full py-4 border border-slate-700 text-slate-500 font-mono text-xs uppercase rounded hover:text-white hover:border-white transition-all">
        Exit Terminal
      </button>
    </div>
  );
};

export default TerminalUpgrades;
