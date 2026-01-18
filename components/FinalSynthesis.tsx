
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
    prompt: "You recall a conversation with a native speaker. The logic feels unstable.",
    choiceA: { label: "Force Literal Sync", sync: 5, integrity: -10, msg: "Meaning held, but your neural link frayed." },
    choiceB: { label: "Allow Semantic Drift", sync: 10, integrity: -5, msg: "Fluidity accepted. Sync rate improves." }
  },
  {
    id: 2,
    prompt: "The Animus detects a contradiction between Sapir-Whorf and Universal Grammar.",
    choiceA: { label: "Prioritize Biological Instinct", sync: 8, integrity: -5, msg: "Chomskyan patterns stabilized." },
    choiceB: { label: "Prioritize Cultural Filter", sync: 12, integrity: -15, msg: "Deep Whorfian integration achieved. System stress high." }
  },
  {
    id: 3,
    prompt: "A memory of a 'lost language' appears. It has no word for the current crisis.",
    choiceA: { label: "Impose Modern Vocabulary", sync: -5, integrity: 10, msg: "Anachronism detected. Desync risk minimized." },
    choiceB: { label: "Inhabit the Silence", sync: 15, integrity: -20, msg: "Pure knowledge unlocked. Desynchronization imminent." }
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
    <div className={`h-full bg-cyan-950/20 flex flex-col p-8 transition-colors duration-500 ${showFlash ? 'bg-white/20' : ''}`}>
      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-2">
          <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">Reconciling Memory Corridor</span>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">Synaptic Dilemma {step + 1}/{DILEMMAS.length}</h2>
        </div>

        <div className="w-full max-w-sm p-6 border-2 border-cyan-400 bg-black/60 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <p className="text-sm font-bold leading-relaxed mb-8 italic">"{currentDilemma.prompt}"</p>
          
          <div className="grid gap-4">
            <button 
              onClick={() => handleChoice(currentDilemma.choiceA)}
              className="w-full py-4 px-4 border border-cyan-400 text-cyan-400 font-bold uppercase text-[10px] tracking-widest hover:bg-cyan-400 hover:text-black transition-all"
            >
              {currentDilemma.choiceA.label}
            </button>
            <button 
              onClick={() => handleChoice(currentDilemma.choiceB)}
              className="w-full py-4 px-4 border border-cyan-400 text-cyan-400 font-bold uppercase text-[10px] tracking-widest hover:bg-cyan-400 hover:text-black transition-all"
            >
              {currentDilemma.choiceB.label}
            </button>
          </div>
        </div>

        <div className="flex gap-12">
           <div className="flex flex-col items-center">
             <span className="text-[8px] opacity-40 uppercase mb-1">Local Sync</span>
             <span className="text-xl font-black text-cyan-400">{Math.floor(currentSync)}%</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-[8px] opacity-40 uppercase mb-1">Animus Stability</span>
             <span className="text-xl font-black text-[#ffb000]">{state.integrity}%</span>
           </div>
        </div>
      </div>

      <div className="text-[7px] text-cyan-400/30 uppercase text-center tracking-[0.3em]">
        Warning: High semantic drift may cause permanent desynchronization of the knowledge dossier.
      </div>
    </div>
  );
};

export default FinalSynthesis;
