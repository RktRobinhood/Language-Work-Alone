import React, { useState } from 'react';
import { Station, GameState, LogEntry } from '../types.ts';
import { sfx } from '../utils/sfx.ts';

interface StationViewProps {
  station: Station;
  onComplete: (id: any, answers: number[], draft: string) => void;
  onCancel: () => void;
  state: GameState;
  onUpdateState: (updater: (prev: GameState) => GameState) => void;
  addLog: (type: LogEntry['type'], msg: string) => void;
}

const StationView: React.FC<StationViewProps> = ({ station, onComplete, onCancel, state, onUpdateState, addLog }) => {
  const [step, setStep] = useState<'reading' | 'validation' | 'synthesis'>('reading');
  const [currentMCQ, setCurrentMCQ] = useState(0);
  const [draft, setDraft] = useState('');

  const handleMCQSubmit = (idx: number) => {
    if (idx === station.mcqs[currentMCQ].answerIndex) {
      sfx.confirm();
      if (currentMCQ < station.mcqs.length - 1) {
        setCurrentMCQ(currentMCQ + 1);
      } else {
        setStep('synthesis');
      }
    } else {
      sfx.error();
      onUpdateState(prev => ({ ...prev, integrity: Math.max(0, prev.integrity - 5) }));
      addLog('ANOMALY', `Logic dissonance detected at ${station.title}. Stability compromised.`);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Mini-Header */}
      <div className="h-10 px-4 border-b border-[#ffb000]/20 flex justify-between items-center shrink-0">
        <span className="text-[8px] font-bold uppercase tracking-widest truncate">{station.title}</span>
        <button onClick={onCancel} className="text-[7px] border border-[#ffb000]/40 px-2 py-0.5 uppercase opacity-60">Abort</button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto terminal-scrollbar p-4 pb-24">
        {step === 'reading' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[7px] opacity-40 uppercase tracking-widest">Knowledge_Artifact</span>
              <p className="text-sm leading-relaxed border-l-2 border-[#ffb000]/40 pl-4 py-2 bg-[#ffb000]/5 italic">
                {station.reading}
              </p>
              <div className="text-right text-[7px] opacity-30 uppercase">— Source: {station.readingSource}</div>
            </div>
            
            {station.youtubeId && (
              <div className="video-container rounded border border-[#ffb000]/20">
                <iframe src={`https://www.youtube.com/embed/${station.youtubeId}?modestbranding=1&autohide=1&showinfo=0&controls=1`} frameBorder="0" allowFullScreen></iframe>
              </div>
            )}
          </div>
        )}

        {step === 'validation' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="text-center">
              <span className="text-[7px] opacity-40 uppercase tracking-[0.4em]">Knowledge_Verification_{currentMCQ + 1}/{station.mcqs.length}</span>
              <h3 className="text-sm font-bold mt-2 leading-snug">{station.mcqs[currentMCQ].question}</h3>
            </div>
            <div className="grid gap-2">
              {station.mcqs[currentMCQ].options.map((opt, i) => (
                <button key={i} onClick={() => handleMCQSubmit(i)} className="text-left p-3 border border-[#ffb000]/20 text-[10px] uppercase hover:bg-[#ffb000]/10 active:bg-[#ffb000] active:text-black transition-all">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'synthesis' && (
          <div className="h-full flex flex-col gap-4 animate-in fade-in duration-300">
            <div className="p-3 bg-[#ffb000]/5 border border-[#ffb000]/20">
              <span className="text-[7px] opacity-40 uppercase tracking-widest block mb-1">Synthesize_Findings</span>
              <p className="text-[11px] font-bold italic leading-snug">{station.deliverablePrompt}</p>
            </div>
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Record your observations for the archive..."
              className="flex-1 min-h-[160px] bg-black/80 border border-[#ffb000]/20 p-4 text-[11px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000] resize-none"
            />
          </div>
        )}
      </div>

      {/* Persistent Bottom Action (Reachability) */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-black/90 border-t border-[#ffb000]/20 z-50">
        {step === 'reading' && (
          <button onClick={() => { sfx.scan(); setStep('validation'); }} className="w-full py-3 bg-[#ffb000] text-black font-bold uppercase text-[10px] tracking-widest active:scale-95 transition-transform">
            Verify Knowledge
          </button>
        )}
        {step === 'synthesis' && (
          <button 
            onClick={() => onComplete(station.id, [], draft)} 
            disabled={draft.length < 15} 
            className="w-full py-3 bg-[#ffb000] text-black font-bold uppercase text-[10px] tracking-widest disabled:opacity-20 active:scale-95 transition-transform"
          >
            Archive Synthesis
          </button>
        )}
      </div>
    </div>
  );
};

export default StationView;