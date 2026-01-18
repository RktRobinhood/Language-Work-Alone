
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
    <div className="flex flex-col gap-8 animate-in slide-in-from-right-4">
      <div className="border-b-2 border-[#ffb000] pb-4">
        <h2 className="text-3xl font-bold crt-text text-[#ffb000] uppercase">PIP-BOY_UPGRADE_SERVICES</h2>
        <p className="text-[10px] opacity-50 uppercase tracking-widest">Available_Credits: {state.xp} XP</p>
      </div>

      <div className="grid gap-6">
        {UPGRADES.map(u => {
          const isUnlocked = state.unlockedUpgrades.includes(u.id);
          const canAfford = state.xp >= u.cost;
          return (
            <div key={u.id} className={`vault-panel p-6 border-2 transition-all ${isUnlocked ? 'border-emerald-500 bg-emerald-900/10' : canAfford ? 'border-[#ffb000]' : 'border-[#ffb000]/20 opacity-40'}`}>
              <div className="flex items-center gap-6">
                <div className="text-4xl">{u.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold uppercase">{u.name}</h3>
                  <p className="text-xs opacity-60 font-mono">{u.desc}</p>
                </div>
                {!isUnlocked ? (
                  <button 
                    disabled={!canAfford}
                    onClick={() => onBuy(u.id, u.cost)}
                    className="vault-btn px-8"
                  >
                    {u.cost} XP
                  </button>
                ) : (
                  <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs">INSTALLED</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <button onClick={onBack} className="vault-btn py-4 opacity-50 hover:opacity-100">RETURN_TO_STATUS_HUB</button>
    </div>
  );
};

export default TerminalUpgrades;
