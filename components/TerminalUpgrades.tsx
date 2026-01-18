import React from 'react';
import { GameState } from '../types.ts';
import { UPGRADES } from '../constants.tsx';
import { sfx } from '../utils/sfx.ts';

interface TerminalUpgradesProps {
  state: GameState;
  onBuy: (id: string, cost: number) => void;
  onBack: () => void;
}

const TerminalUpgrades: React.FC<TerminalUpgradesProps> = ({ state, onBuy, onBack }) => {
  const handleBuy = (id: string, cost: number) => {
    sfx.confirm();
    onBuy(id, cost);
  };

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden">
      <div className="p-4 border-b border-[#ffb000]/20 flex justify-between items-center bg-[#ffb000]/5 shrink-0">
        <h2 className="text-[10px] font-bold uppercase tracking-widest">System_Calibration</h2>
        <span className="text-[10px] font-mono text-cyan-500">{state.xp} CR</span>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scrollbar p-4 space-y-3">
        {UPGRADES.map(u => {
          const isUnlocked = state.unlockedUpgrades.includes(u.id);
          const canAfford = state.xp >= u.cost;
          return (
            <div key={u.id} className={`p-4 border transition-all ${isUnlocked ? 'border-green-500/40 bg-green-500/5' : canAfford ? 'border-[#ffb000]/40' : 'border-[#ffb000]/10 opacity-30'}`}>
              <div className="flex items-center gap-4">
                <div className="text-xl shrink-0 opacity-80">{u.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[10px] font-bold uppercase truncate">{u.name}</h3>
                  <p className="text-[8px] opacity-60 italic mt-0.5">{u.desc}</p>
                </div>
                {!isUnlocked ? (
                  <button 
                    disabled={!canAfford}
                    onClick={() => handleBuy(u.id, u.cost)}
                    className="px-3 py-1.5 bg-[#ffb000] text-black font-bold uppercase text-[9px] whitespace-nowrap"
                  >
                    {u.cost}
                  </button>
                ) : (
                  <span className="text-green-500 text-[8px] font-bold uppercase tracking-widest">Active</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 shrink-0">
        <button onClick={onBack} className="w-full py-3 border border-[#ffb000]/40 text-[9px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
          Close Terminal
        </button>
      </div>
    </div>
  );
};

export default TerminalUpgrades;