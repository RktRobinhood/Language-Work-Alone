
import React, { useState, useEffect, useMemo } from 'react';
import { Station, GameState, LogEntry, MCQ } from '../types.ts';
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
  
  // MCQ state with randomized options
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [correctShuffledIndex, setCorrectShuffledIndex] = useState(0);

  // Scaffold State
  const [draft, setDraft] = useState('');
  const [scaffoldData, setScaffoldData] = useState<Record<string, string>>({});

  // Memoize the shuffling to happen once per currentMCQ change
  useEffect(() => {
    if (step === 'validation' && station.mcqs[currentMCQ]) {
      const mcq = station.mcqs[currentMCQ];
      const optionsWithIndices = mcq.options.map((opt, i) => ({ opt, originalIndex: i }));
      
      // Seeded-like shuffle (simple random for now, but stable within this step)
      const shuffled = [...optionsWithIndices].sort(() => Math.random() - 0.5);

      setShuffledOptions(shuffled.map(o => o.opt));
      const newCorrectIndex = shuffled.findIndex(o => o.originalIndex === mcq.answerIndex);
      setCorrectShuffledIndex(newCorrectIndex);
    }
  }, [step, currentMCQ, station.mcqs]);

  const handleMCQSubmit = (idx: number) => {
    if (idx === correctShuffledIndex) {
      sfx.confirm();
      if (currentMCQ < station.mcqs.length - 1) {
        setCurrentMCQ(currentMCQ + 1);
      } else {
        setStep('synthesis');
      }
    } else {
      sfx.error();
      onUpdateState(prev => ({ ...prev, integrity: Math.max(0, prev.integrity - 8) }));
      addLog('ANOMALY', `Logic dissonance detected at ${station.title}. Stability compromised.`);
    }
  };

  const handleSynthesisComplete = () => {
    let finalDraft = draft;
    if (station.scaffoldType === 'claim-counter') {
      finalDraft = `CLAIM: ${scaffoldData.claim || 'N/A'}\nCOUNTER: ${scaffoldData.counter || 'N/A'}`;
    } else if (station.scaffoldType === 'perspective-shift') {
      finalDraft = `ORIGINAL PERSPECTIVE: ${scaffoldData.original || 'N/A'}\nSHIFTED PERSPECTIVE: ${scaffoldData.shifted || 'N/A'}`;
    } else if (station.scaffoldType === 'ethical-eval') {
      finalDraft = `ETHICAL JUSTIFICATION: ${scaffoldData.justification || 'N/A'}\nEPISTEMIC RISK: ${scaffoldData.risk || 'N/A'}`;
    }
    
    onComplete(station.id, [], finalDraft);
  };

  const isScaffoldValid = () => {
    if (station.scaffoldType === 'standard') return draft.length > 20;
    const values = Object.values(scaffoldData) as string[];
    if (values.length === 0) return false;
    return values.every(v => v.length > 10);
  };

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden relative">
      <div className="h-10 px-4 border-b border-[#ffb000]/20 flex justify-between items-center shrink-0 bg-black z-50">
        <span className="text-[8px] font-bold uppercase tracking-widest truncate">{station.title}</span>
        <button onClick={onCancel} className="text-[7px] border border-[#ffb000]/40 px-3 py-1 uppercase opacity-60 hover:opacity-100 transition-opacity">Abort Mission</button>
      </div>

      <div className="flex-1 overflow-y-auto terminal-scrollbar p-5 pb-32">
        {step === 'reading' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-3">
              <span className="text-[7px] opacity-40 uppercase tracking-[0.3em]">Knowledge_Artifact_01</span>
              <p className="text-[13px] leading-relaxed border-l-2 border-[#ffb000]/40 pl-5 py-3 bg-[#ffb000]/5 italic text-[#ffb000]/90 whitespace-pre-wrap">
                "{station.reading}"
              </p>
              <div className="text-right text-[7px] opacity-40 uppercase">— Investigator Ref: {station.readingSource || 'ARCHIVE'}</div>
            </div>
            
            {station.youtubeId && (
              <div className="space-y-2">
                <span className="text-[7px] opacity-40 uppercase tracking-[0.3em]">Neural_Stream_Link</span>
                <div className="video-container rounded border border-[#ffb000]/20 overflow-hidden shadow-2xl relative" style={{ paddingTop: '56.25%' }}>
                  <iframe 
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${station.youtubeId}?modestbranding=1&autohide=1&showinfo=0&controls=1`} 
                    frameBorder="0" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            
            <div className="p-4 bg-white/5 border border-white/5 rounded">
              <p className="text-[9px] uppercase opacity-50 mb-2">Researcher Instructions</p>
              <p className="text-[10px] leading-relaxed opacity-80">{station.lessonPlan}</p>
            </div>
          </div>
        )}

        {step === 'validation' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-4">
              <span className="text-[8px] opacity-40 uppercase tracking-[0.5em]">Cognitive_Check_{currentMCQ + 1}/{station.mcqs.length}</span>
              <h3 className="text-base font-bold leading-tight px-4">{station.mcqs[currentMCQ].question}</h3>
            </div>
            <div className="grid gap-3">
              {shuffledOptions.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => handleMCQSubmit(i)} 
                  className="text-left p-4 border border-[#ffb000]/20 text-[10px] uppercase font-bold hover:bg-[#ffb000]/10 active:bg-[#ffb000] active:text-black transition-all group relative overflow-hidden"
                >
                  <span className="relative z-10">{opt}</span>
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ffb000] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'synthesis' && (
          <div className="h-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="p-4 bg-[#ffb000]/5 border border-[#ffb000]/20 relative overflow-hidden">
              <span className="text-[7px] opacity-50 uppercase tracking-widest block mb-2">Synthesis_Request_{station.scaffoldType.toUpperCase()}</span>
              <p className="text-[12px] font-bold italic leading-snug">{station.deliverablePrompt}</p>
            </div>
            
            {station.scaffoldType === 'claim-counter' && (
              <div className="space-y-4">
                <textarea 
                  placeholder="Knowledge Claim..."
                  className="w-full h-32 bg-black/60 border border-[#ffb000]/20 p-3 text-[10px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000]"
                  value={scaffoldData.claim || ''}
                  onChange={(e) => setScaffoldData({...scaffoldData, claim: e.target.value})}
                />
                <textarea 
                  placeholder="Counter-Claim..."
                  className="w-full h-32 bg-black/60 border border-[#ffb000]/20 p-3 text-[10px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000]"
                  value={scaffoldData.counter || ''}
                  onChange={(e) => setScaffoldData({...scaffoldData, counter: e.target.value})}
                />
              </div>
            )}

            {station.scaffoldType === 'perspective-shift' && (
              <div className="space-y-4">
                <textarea 
                  placeholder="Original Understanding..."
                  className="w-full h-32 bg-black/60 border border-[#ffb000]/20 p-3 text-[10px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000]"
                  value={scaffoldData.original || ''}
                  onChange={(e) => setScaffoldData({...scaffoldData, original: e.target.value})}
                />
                <textarea 
                  placeholder="Shifted Perspective..."
                  className="w-full h-32 bg-black/60 border border-[#ffb000]/20 p-3 text-[10px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000]"
                  value={scaffoldData.shifted || ''}
                  onChange={(e) => setScaffoldData({...scaffoldData, shifted: e.target.value})}
                />
              </div>
            )}

            {station.scaffoldType === 'ethical-eval' && (
              <div className="space-y-4">
                <textarea 
                  placeholder="Ethical Justification..."
                  className="w-full h-32 bg-black/60 border border-[#ffb000]/20 p-3 text-[10px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000]"
                  value={scaffoldData.justification || ''}
                  onChange={(e) => setScaffoldData({...scaffoldData, justification: e.target.value})}
                />
                <textarea 
                  placeholder="Epistemic Risk..."
                  className="w-full h-32 bg-black/60 border border-[#ffb000]/20 p-3 text-[10px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000]"
                  value={scaffoldData.risk || ''}
                  onChange={(e) => setScaffoldData({...scaffoldData, risk: e.target.value})}
                />
              </div>
            )}

            {station.scaffoldType === 'standard' && (
              <textarea 
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Record your observations for the archive..."
                className="w-full h-64 bg-black/80 border border-[#ffb000]/20 p-4 text-[11px] font-mono outline-none focus:border-[#ffb000] text-[#ffb000] resize-none"
              />
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black to-transparent z-[60]">
        {step === 'reading' && (
          <button 
            onClick={() => { sfx.scan(); setStep('validation'); }} 
            className="w-full py-4 bg-[#ffb000] text-black font-bold uppercase text-[11px] tracking-widest active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,176,0,0.3)]"
          >
            Initiate Verification
          </button>
        )}
        {step === 'synthesis' && (
          <button 
            onClick={handleSynthesisComplete} 
            disabled={!isScaffoldValid()} 
            className="w-full py-4 bg-[#ffb000] text-black font-bold uppercase text-[11px] tracking-widest disabled:opacity-20 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,176,0,0.3)]"
          >
            Archive Synthesis
          </button>
        )}
      </div>
    </div>
  );
};

export default StationView;
