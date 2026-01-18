
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

  // If they have the tool, we skip the first question for them as a reward
  useEffect(() => {
    if (step === 'checks' && hasBenefit && currentMCQ === 0) {
      sfx.confirm();
      setAnswers(prev => ({ ...prev, 0: station.mcqs[0].answerIndex }));
      setCurrentMCQ(1);
    }
  }, [step, hasBenefit, currentMCQ, station.mcqs]);

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
      onLog('DATA_MISALIGNMENT', { node: station.id });
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 pb-20">
      <div className="flex justify-between items-center border-b-2 border-[#ffb000] pb-4">
        <div>
          <h2 className="text-3xl font-bold text-[#ffb000] uppercase tracking-tighter">{station.title}</h2>
          <p className="text-[10px] font-mono text-[#ffb000]/60 uppercase mt-1">Recovery Phase: {step.toUpperCase()}</p>
        </div>
        <button onClick={onCancel} className="vault-btn text-[10px]">Cancel Link</button>
      </div>

      {step === 'material' && (
        <div className="flex flex-col gap-6">
          <div className="vault-panel p-5 bg-black/40">
             <h3 className="text-xs font-bold text-[#ffb000] uppercase mb-2">Lesson Plan</h3>
             <p className="text-[10px] opacity-70 italic">{station.lessonPlan}</p>
          </div>

          <div className="video-container shadow-xl">
            <iframe 
              src={`https://www.youtube.com/embed/${station.youtubeId}?modestbranding=1&rel=0`}
              title="Vault Education Broadcast"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="vault-panel p-8 bg-black/40">
             <p className="text-base text-[#ffb000]/90 leading-relaxed font-mono whitespace-pre-wrap">
               {station.reading}
             </p>
          </div>

          <button onClick={() => { sfx.scan(); setStep('checks'); }} className="vault-btn py-5 text-lg">
             Begin Knowledge Check
          </button>
        </div>
      )}

      {step === 'checks' && (
        <div className="flex flex-col gap-8">
          <div className="text-center">
             <h3 className="text-xs font-bold text-[#ffb000] uppercase tracking-[0.3em]">Validation Step {currentMCQ + 1} of 3</h3>
             {hasBenefit && <p className="text-[9px] text-green-400 font-bold uppercase mt-1 animate-pulse">Tool Bonus: Knowledge Pre-Validated</p>}
          </div>

          <div className="vault-panel p-8">
            <p className="text-xl font-bold text-white mb-8 border-b border-[#ffb000]/20 pb-4">{station.mcqs[currentMCQ].question}</p>
            
            <div className="flex flex-col gap-3">
              {station.mcqs[currentMCQ].options.map((opt, oIdx) => {
                const isEliminated = hasRadMask && oIdx !== station.mcqs[currentMCQ].answerIndex && oIdx === 0;
                return (
                  <button
                    key={oIdx}
                    disabled={isEliminated}
                    onClick={() => handleMCQSubmit(oIdx)}
                    className={`text-left p-4 border-2 transition-all uppercase text-sm font-bold ${
                      isEliminated ? 'opacity-10 grayscale pointer-events-none' :
                      'border-[#ffb000]/30 text-[#ffb000]/70 hover:bg-[#ffb000] hover:text-black'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {wrongAnswers[currentMCQ] && (
               <div className="mt-8 p-6 bg-red-900/20 border-2 border-red-500/50 rounded animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-red-500 uppercase mb-2">Integrity Alert</p>
                  <p className="text-sm text-red-200">PEDAGOGICAL HINT: Look back at the broadcast text for keywords like "Ethics", "Group", or "Shared Knowledge". Precise conceptual mapping is required.</p>
               </div>
            )}
          </div>

          <button onClick={() => setStep('material')} className="text-center text-[10px] font-bold uppercase opacity-50 hover:opacity-100 underline underline-offset-4">
            Return to Broadcast
          </button>
        </div>
      )}

      {step === 'synthesis' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="vault-panel p-8 bg-[#ffb000]/5 border-[#ffb000]/50">
            <h4 className="text-[10px] font-bold text-[#ffb000] uppercase mb-4 tracking-widest">Final Synthesis Directive</h4>
            <p className="text-xl font-bold text-white italic">"{station.deliverablePrompt}"</p>
          </div>
          <div className="relative">
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Record your findings for the archives..."
              className="w-full h-72 bg-black/80 border-2 border-[#ffb000]/30 rounded p-8 text-base font-mono focus:border-[#ffb000] outline-none text-[#ffb000] placeholder:opacity-20"
            />
          </div>
          <button 
            onClick={() => onComplete(station.id, [], draft, 100)} 
            disabled={draft.length < 50} 
            className="w-full vault-btn py-5 text-xl"
          >
            Seal Node Archive
          </button>
        </div>
      )}
    </div>
  );
};

export default StationView;
