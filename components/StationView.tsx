
import React, { useState, useEffect } from 'react';
import { Station, GameState } from '../types';
import { sfx } from '../utils/sfx';

interface StationViewProps {
  station: Station;
  onComplete: (id: any, answers: number[], draft: string, score: number) => void;
  onCancel: () => void;
  state: GameState;
  onLog: (type: string, payload: any) => void;
}

const StationView: React.FC<StationViewProps> = ({ station, onComplete, onCancel, state, onLog }) => {
  const [step, setStep] = useState<'material' | 'checks' | 'synthesis'>('material');
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [wrongAnswers, setWrongAnswers] = useState<Record<number, boolean>>({});
  const [draft, setDraft] = useState('');

  const hasBenefit = station.benefitFromTool && state.earnedTools.includes(station.benefitFromTool);
  const hasRadMask = state.unlockedUpgrades.includes('rad_mask');

  // Skip logic for tool benefit
  useEffect(() => {
    if (step === 'checks' && hasBenefit && currentMCQ === 0) {
      console.log(`[Vault Terminal] Tool '${station.benefitFromTool}' bypassing initial validation logic.`);
      sfx.confirm();
      setAnswers(prev => ({ ...prev, 0: station.mcqs[0].answerIndex }));
      setCurrentMCQ(1);
    }
  }, [step, hasBenefit, currentMCQ, station.mcqs, station.benefitFromTool]);

  const handleMCQSubmit = (choice: number) => {
    const isCorrect = choice === station.mcqs[currentMCQ].answerIndex;
    
    if (isCorrect) {
      sfx.confirm();
      setAnswers(prev => ({ ...prev, [currentMCQ]: choice }));
      setWrongAnswers(prev => ({ ...prev, [currentMCQ]: false }));
      if (currentMCQ < station.mcqs.length - 1) {
        setCurrentMCQ(currentMCQ + 1);
      } else {
        setStep('synthesis');
      }
    } else {
      sfx.error();
      setWrongAnswers(prev => ({ ...prev, [currentMCQ]: true }));
      onLog('Calibration Error', { node: station.id });
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in slide-in-from-right-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-[#ffb000] pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#ffb000] uppercase tracking-tighter crt-text">{station.title}</h2>
          <p className="text-[11px] font-mono text-[#ffb000]/60 uppercase mt-2">Current Phase: {step.toUpperCase()}</p>
        </div>
        <button onClick={onCancel} className="vault-btn text-[11px]">Abort Uplink</button>
      </div>

      {step === 'material' && (
        <div className="flex flex-col gap-8">
          <div className="vault-panel p-6 bg-black/50 border-[#ffb000]/30">
             <h3 className="text-xs font-bold text-[#ffb000] uppercase mb-3">Objective</h3>
             <p className="text-[11px] opacity-80 leading-relaxed italic">{station.lessonPlan}</p>
          </div>

          <div className="video-container shadow-2xl">
            <iframe 
              src={`https://www.youtube.com/embed/${station.youtubeId}?modestbranding=1&rel=0&autoplay=1`}
              title="Vault Education Feed"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="vault-panel p-10 bg-black/60">
             <p className="text-lg text-[#ffb000]/95 leading-relaxed font-mono whitespace-pre-wrap">
               {station.reading}
             </p>
          </div>

          <button onClick={() => { sfx.scan(); setStep('checks'); }} className="vault-btn py-6 text-xl shadow-[0_0_20px_rgba(255,176,0,0.2)]">
             Begin Validation
          </button>
        </div>
      )}

      {step === 'checks' && (
        <div className="flex flex-col gap-10">
          <div className="text-center">
             <h3 className="text-xs font-bold text-[#ffb000] uppercase tracking-[0.4em]">Step {currentMCQ + 1} of 3</h3>
             {hasBenefit && <p className="text-[10px] text-cyan-400 font-bold uppercase mt-2 animate-pulse">Encryption Bypassed by Tool</p>}
          </div>

          <div className="vault-panel p-10">
            <p className="text-2xl font-bold text-white mb-10 border-b border-[#ffb000]/20 pb-6">{station.mcqs[currentMCQ].question}</p>
            
            <div className="flex flex-col gap-4">
              {station.mcqs[currentMCQ].options.map((opt, oIdx) => {
                const isEliminated = hasRadMask && oIdx !== station.mcqs[currentMCQ].answerIndex && oIdx === 0;
                return (
                  <button
                    key={oIdx}
                    disabled={isEliminated}
                    onClick={() => handleMCQSubmit(oIdx)}
                    className={`text-left p-5 border-2 transition-all uppercase text-sm font-bold tracking-wide ${
                      isEliminated ? 'opacity-5 grayscale pointer-events-none' :
                      'border-[#ffb000]/30 text-[#ffb000]/80 hover:bg-[#ffb000] hover:text-[#0a0a0a]'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {wrongAnswers[currentMCQ] && (
               <div className="mt-10 p-6 bg-red-900/10 border-2 border-red-500/50 rounded animate-in fade-in slide-in-from-top-4">
                  <p className="text-xs font-bold text-red-500 uppercase mb-2">Data Corruption Hint</p>
                  <p className="text-sm text-red-200 leading-relaxed font-mono">RE-EVALUATE: Re-examine the provided text for keywords. TOK requires precise conceptual mapping of language frameworks.</p>
               </div>
            )}
          </div>

          <button onClick={() => setStep('material')} className="text-center text-[10px] font-bold uppercase opacity-40 hover:opacity-100 underline underline-offset-8 transition-all">
            Return to Study Material
          </button>
        </div>
      )}

      {step === 'synthesis' && (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8">
          <div className="vault-panel p-10 bg-[#ffb000]/5 border-[#ffb000]/40">
            <h4 className="text-[11px] font-bold text-[#ffb000] uppercase mb-6 tracking-[0.3em]">Research Synthesis Directive</h4>
            <p className="text-2xl font-bold text-white italic leading-snug">"{station.deliverablePrompt}"</p>
          </div>
          <div className="relative">
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Record synthesis findings here..."
              className="w-full h-80 bg-black/90 border-2 border-[#ffb000]/20 rounded p-10 text-lg font-mono focus:border-[#ffb000] outline-none text-[#ffb000] placeholder:opacity-10 transition-colors"
            />
          </div>
          <button 
            onClick={() => onComplete(station.id, [], draft, 100)} 
            disabled={draft.length < 50} 
            className="w-full vault-btn py-6 text-2xl shadow-[0_0_30px_rgba(255,176,0,0.3)]"
          >
            Finalize Node Recovery
          </button>
        </div>
      )}
    </div>
  );
};

export default StationView;
