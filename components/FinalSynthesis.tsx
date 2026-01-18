
import React, { useState, useEffect } from 'react';
import { GameState } from '../types.ts';
import { sfx } from '../utils/sfx.ts';

interface FinalSynthesisProps {
  state: GameState;
  onSyncFinish: (sync: number) => void;
  onIntegrityLoss: (amt: number) => void;
}

const DILEMMAS = [
  {
    id: 1,
    prompt: "You recall a conversation with a native speaker whose language has no word for 'Self'. The Animus logic destabilizes.",
    choiceA: { label: "Force Literal Sync", sync: 5, integrity: -15, msg: "Meaning held, but your neural link frayed." },
    choiceB: { label: "Inhabit the Silence", sync: 15, integrity: -5, msg: "Fluidity accepted. Sync rate improves as the ego fades." }
  },
  {
    id: 2,
    prompt: "The system detects a fatal contradiction between cultural filters and universal logic.",
    choiceA: { label: "Stabilize Universals", sync: 8, integrity: -10, msg: "Logical patterns reinforced. Integrity drops due to loss of nuance." },
    choiceB: { label: "Stabilize Nuance", sync: 12, integrity: -25, msg: "Pure relativity integration achieved. System stress critical." }
  },
  {
    id: 3,
    prompt: "Final Reconciliation: Is language a cage for the mind, or the key that unlocks it?",
    choiceA: { label: "The Cage (Determinism)", sync: -10, integrity: 20, msg: "Boundaries accepted. Stability restored." },
    choiceB: { label: "The Key (Evolution)", sync: 20, integrity: -30, msg: "Boundaries shattered. Infinite potential, infinite risk." }
  }
];

const FinalSynthesis: React.FC<FinalSynthesisProps> = ({ state, onSyncFinish, onIntegrityLoss }) => {
  const [step, setStep] = useState(0);
  const [currentSync, setCurrentSync] = useState(state.syncRate);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    sfx.glitch();
  }, []);

  const handleChoice = (effect: { sync: number, integrity: number, msg: string }) => {
    sfx.confirm();
    setShowFlash(true);
    setCurrentSync(prev => Math.min(100, Math.max(0, prev + effect.sync)));
    onIntegrityLoss(Math.abs(effect.integrity));
    
    setTimeout(() => {
      setShowFlash(false);
      if (step < DILEMMAS.length - 1) {
        setStep(step + 1);
      } else {
        onSyncFinish(Math.floor(currentSync + effect.sync));
      }
    }, 800);
  };

  const currentDilemma = DILEMMAS[step];

  return (
    <div className={`h-full bg-cyan-950/20 flex flex-col p-8 transition-colors duration-500 ${showFlash ? 'bg-white/40' : ''}`}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-2">
          <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Reconciling Memory Corridor</span>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase crt-text">Synaptic Reconciliation {step + 1}/{DILEMMAS.length}</h2>
        </div>

        <div className="w-full max-w-sm p-6 border-2 border-cyan-400 bg-black/60 shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-md">
          <p className="text-sm font-bold leading-relaxed mb-10 italic text-cyan-50">"{currentDilemma.prompt}"</p>
          
          <div className="grid gap-4">
            <button 
              onClick={() => handleChoice(currentDilemma.choiceA)}
              className="w-full py-5 px-4 border-2 border-cyan-400 text-cyan-400 font-bold uppercase text-[10px] tracking-widest hover:bg-cyan-400 hover:text-black transition-all active:scale-95"
            >
              {currentDilemma.choiceA.label}
            </button>
            <button 
              onClick={() => handleChoice(currentDilemma.choiceB)}
              className="w-full py-5 px-4 border-2 border-cyan-400 text-cyan-400 font-bold uppercase text-[10px] tracking-widest hover:bg-cyan-400 hover:text-black transition-all active:scale-95"
            >
              {currentDilemma.choiceB.label}
            </button>
          </div>
        </div>

        <div className="flex gap-16">
           <div className="flex flex-col items-center">
             <span className="text-[9px] opacity-40 uppercase mb-2 tracking-widest">Global Sync</span>
             <span className="text-2xl font-black text-cyan-400">{Math.floor(currentSync)}%</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-[9px] opacity-40 uppercase mb-2 tracking-widest">Stability</span>
             <span className="text-2xl font-black text-[#ffb000]">{state.integrity}%</span>
           </div>
        </div>
      </div>

      <div className="text-[8px] text-cyan-400/40 uppercase text-center tracking-[0.4em] mb-4">
        Warning: Desynchronization in this phase will purge all research progress.
      </div>
    </div>
  );
};

export default FinalSynthesis;
