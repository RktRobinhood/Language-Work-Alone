
import React from 'react';
import { sfx } from '../utils/sfx.ts';

interface DeathScreenProps {
  onReset: () => void;
}

const DeathScreen: React.FC<DeathScreenProps> = ({ onReset }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-red-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-12 animate-pulse">
        <div className="text-red-500 text-7xl font-black mb-4 uppercase tracking-tighter">Neural Collapse</div>
        <div className="text-red-200 text-xs font-mono uppercase tracking-[0.5em] opacity-60">Critical Integrity Failure</div>
      </div>

      <div className="max-w-md bg-black/80 border-2 border-red-500 p-8 space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
        <p className="text-red-400 font-mono text-[10px] uppercase leading-relaxed">
          Researcher neural pathways have been compromised by persistent logic paradoxes. 
          Your memory buffer has been purged to prevent permanent synaptic scarring.
        </p>
        
        <div className="h-[1px] bg-red-500/30 w-full"></div>

        <button 
          onClick={() => { sfx.scan(); onReset(); }}
          className="w-full py-4 bg-red-600 text-white font-black uppercase tracking-widest text-sm hover:bg-red-500 active:scale-95 transition-all shadow-lg"
        >
          Reboot Neural Interface
        </button>
        
        <p className="text-[8px] text-red-500/40 uppercase font-mono">
          Note: This action will restore your field clearance but reset your current exploration progress.
        </p>
      </div>
    </div>
  );
};

export default DeathScreen;
