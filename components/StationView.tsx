
import React, { useState, useEffect } from 'react';
import { Station, GameState } from '../types';
import { sfx } from '../utils/sfx';

interface StationViewProps {
  station: Station;
  onComplete: (id: any, answers: number[], draft: string, score: number) => void;
  onCancel: () => void;
  state: GameState;
  onLog: (type: string, payload: any) => void;
  onUpdateState: (updater: (prev: GameState) => GameState) => void;
}

interface ShuffledOption {
  text: string;
  originalIndex: number;
}

const StationView: React.FC<StationViewProps> = ({ station, onComplete, onCancel, state, onLog, onUpdateState }) => {
  const [step, setStep] = useState<'material' | 'checks' | 'synthesis'>('material');
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<ShuffledOption[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [wrongAnswers, setWrongAnswers] = useState<Record<number, boolean>>({});
  const [draft, setDraft] = useState('');

  // Randomize options when the current question or step changes
  useEffect(() => {
    if (step === 'checks' && station.mcqs[currentMCQ]) {
      const options = station.mcqs[currentMCQ].options.map((text, index) => ({
        text,
        originalIndex: index,
      }));
      
      // Fisher-Yates shuffle
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      setShuffledOptions(options);
    }
  }, [currentMCQ, step, station]);

  const handleMCQSubmit = (originalIndex: number) => {
    const isCorrect = originalIndex === station.mcqs[currentMCQ].answerIndex;
    
    if (isCorrect) {
      sfx.confirm();
      setAnswers(prev => ({ ...prev, [currentMCQ]: originalIndex }));
      setWrongAnswers(prev => ({ ...prev, [currentMCQ]: false }));
      if (currentMCQ < station.mcqs.length - 1) {
        setCurrentMCQ(currentMCQ + 1);
      } else {
        setStep('synthesis');
      }
    } else {
      sfx.error();
      // Integrity damage on failure
      onUpdateState(prev => ({ ...prev, integrity: Math.max(0, prev.integrity - 5) }));
      setWrongAnswers(prev => ({ ...prev, [currentMCQ]: true }));
      onLog('Validation Failure', { node: station.id });
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 pb-20">
      <div className="flex justify-between items-center border-b-2 border-[#ffb000] pb-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-[#ffb000] uppercase tracking-tighter">{station.title}</h2>
          <span className="text-[9px] font-mono opacity-50 uppercase">Protocol: Language Lab v1.0</span>
        </div>
        <button onClick={onCancel} className="vault-btn text-[10px]">Abort</button>
      </div>

      {step === 'material' && (
        <div className="flex flex-col gap-6">
          <div className="vault-panel p-4 bg-black/50">
             <h3 className="text-[10px] font-bold text-[#ffb000] uppercase mb-1">Research Source</h3>
             <p className="text-[10px] opacity-70 italic">{station.readingSource || 'Unknown Archive'}</p>
          </div>

          {station.youtubeId && (
            <div className="video-container">
              <iframe 
                src={`https://www.youtube.com/embed/${station.youtubeId}?modestbranding=1&rel=0`} 
                title="Feed" 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          <div className="vault-panel p-6 bg-black/60">
             <p className="text-sm text-[#ffb000]/95 leading-relaxed font-mono whitespace-pre-wrap">
               {station.reading}
             </p>
          </div>

          <button onClick={() => { sfx.scan(); setStep('checks'); }} className="vault-btn py-4 text-sm bg-[#ffb000] text-black">
             Begin Validation Protocol
          </button>
        </div>
      )}

      {step === 'checks' && (
        <div className="flex flex-col gap-6">
          <div className="text-center">
             <p className="text-[10px] font-bold text-[#ffb000] uppercase tracking-widest">Question {currentMCQ + 1} / {station.mcqs.length}</p>
             <div className="flex justify-center gap-1 mt-2">
               {station.mcqs.map((_, i) => (
                 <div key={i} className={`h-1 w-4 rounded-full ${i === currentMCQ ? 'bg-[#ffb000]' : i < currentMCQ ? 'bg-green-500' : 'bg-[#ffb000]/20'}`}></div>
               ))}
             </div>
          </div>

          <div className="vault-panel p-6">
            <p className="text-lg font-bold text-white mb-6 border-b border-[#ffb000]/20 pb-4">{station.mcqs[currentMCQ].question}</p>
            
            <div className="flex flex-col gap-3">
              {shuffledOptions.map((opt, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => handleMCQSubmit(opt.originalIndex)}
                  className="text-left p-4 border transition-all uppercase text-[11px] font-bold border-[#ffb000]/30 text-[#ffb000]/80 hover:bg-[#ffb000] hover:text-black active:scale-[0.98]"
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {wrongAnswers[currentMCQ] && (
               <div className="mt-6 p-4 bg-red-900/10 border border-red-500/50 animate-pulse">
                  <p className="text-[10px] font-bold text-red-500 uppercase">Integrity Alert</p>
                  <p className="text-[11px] text-red-200 leading-relaxed font-mono">Conceptual mismatch detected. Mental integrity falling. Re-read the source text carefully.</p>
               </div>
            )}
          </div>
        </div>
      )}

      {step === 'synthesis' && (
        <div className="flex flex-col gap-6">
          <div className="vault-panel p-6 bg-[#ffb000]/5 border-[#ffb000]/40">
            <p className="text-[10px] font-bold text-[#ffb000] uppercase mb-2">Synthesis Task</p>
            <p className="text-lg font-bold text-white italic leading-snug">"{station.deliverablePrompt}"</p>
          </div>
          <div className="relative">
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Record research findings in terminal buffer..."
              className="w-full h-64 bg-black/90 border-2 border-[#ffb000]/20 rounded p-6 text-sm font-mono focus:border-[#ffb000] outline-none text-[#ffb000] terminal-scrollbar"
            />
            <div className="absolute bottom-4 right-4 text-[9px] font-mono opacity-40 uppercase">
              Min Length: 20 chars | Current: {draft.length}
            </div>
          </div>
          <button 
            onClick={() => onComplete(station.id, [], draft, 100)} 
            disabled={draft.length < 20} 
            className="w-full vault-btn py-4 text-lg bg-[#ffb000] text-black shadow-[0_0_15px_rgba(255,176,0,0.3)]"
          >
            Stabilize Knowledge Node
          </button>
        </div>
      )}
    </div>
  );
};

export default StationView;
