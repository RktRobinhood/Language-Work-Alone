
import React, { useState } from 'react';
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

  const hasLogicProbe = state.unlockedUpgrades.includes('logic_probe');

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
      onLog('PEDAGOGICAL_RETRY', { q: currentMCQ, id: station.id });
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{station.title}</h2>
          <div className="flex items-center gap-4 mt-1">
             <span className="text-[9px] font-mono text-emerald-500 uppercase">Uplink_Active</span>
             <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`w-3 h-1 rounded-full ${step === 'material' ? 'bg-slate-800' : (step === 'synthesis' || i < currentMCQ) ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                ))}
             </div>
          </div>
        </div>
        <button onClick={onCancel} className="text-[9px] font-mono text-slate-500 hover:text-white uppercase px-3 py-1.5 border border-slate-800 rounded transition-all">Abort_Research</button>
      </div>

      {step === 'material' && (
        <div className="flex flex-col gap-6">
          <div className="video-container shadow-xl border border-slate-800">
            <iframe 
              src={`https://www.youtube.com/embed/${station.youtubeId}?modestbranding=1&rel=0&autoplay=0`}
              title="Research_Source"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="glass-panel p-6 rounded border-slate-800">
             <h3 className="text-[10px] font-mono font-bold text-emerald-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Research_Summary_v1.0
             </h3>
             <p className="text-sm text-slate-300 leading-relaxed font-medium">
               {station.reading}
             </p>
          </div>

          <button onClick={() => { sfx.scan(); setStep('checks'); }} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded btn-lab shadow-lg shadow-emerald-900/10">
            Verify_Knowledge_Alignment
          </button>
        </div>
      )}

      {step === 'checks' && (
        <div className="flex flex-col gap-8">
          <div className="text-center">
             <h3 className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-[0.3em]">Validation_Check {currentMCQ + 1}/{station.mcqs.length}</h3>
             <p className="text-[9px] text-slate-500 mt-1 uppercase">Pedagogical feedback loop active</p>
          </div>

          <div className="glass-panel p-8 rounded border-slate-800">
            <p className="font-bold text-white mb-8 text-lg">{station.mcqs[currentMCQ].question}</p>
            
            <div className="flex flex-col gap-3">
              {station.mcqs[currentMCQ].options.map((opt, oIdx) => {
                const isSelected = answers[currentMCQ] === oIdx;
                const isWrong = wrongAnswers[currentMCQ] && oIdx !== station.mcqs[currentMCQ].answerIndex;
                const isCorrectOption = oIdx === station.mcqs[currentMCQ].answerIndex;

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleMCQSubmit(oIdx)}
                    className={`text-left p-4 rounded text-xs border transition-all relative overflow-hidden group ${
                      isSelected ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200' : 
                      'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span><span className="font-mono text-[9px] mr-4 opacity-40">[{String.fromCharCode(65 + oIdx)}]</span> {opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {wrongAnswers[currentMCQ] && (
               <div className="mt-6 p-4 bg-red-500/5 border border-red-500/20 rounded animate-in fade-in slide-in-from-top-2">
                  <p className="text-[10px] font-mono text-red-400 uppercase font-bold tracking-widest mb-1">Misalignment_Detected</p>
                  <p className="text-[11px] text-slate-400">RESEARCH HINT: Review the research summary. Pay close attention to the specific TOK methods or ethics mentioned.</p>
               </div>
            )}
          </div>

          <button onClick={() => setStep('material')} className="text-center text-[9px] font-mono text-slate-500 uppercase hover:text-emerald-500 transition-all underline underline-offset-4 tracking-widest">
            Re-review_Source_Material
          </button>
        </div>
      )}

      {step === 'synthesis' && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="glass-panel p-6 rounded border-emerald-500/20 bg-emerald-500/5">
            <h3 className="text-[10px] font-mono font-bold text-emerald-500 uppercase mb-3 tracking-widest">Synthesis_Prompt</h3>
            <p className="text-sm font-medium text-white italic">"{station.deliverablePrompt}"</p>
          </div>
          <div className="relative">
            <textarea 
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Enter researcher synthesis here... (Min 50 chars)"
              className="w-full h-56 bg-slate-900/80 border border-slate-800 rounded p-6 text-sm font-mono focus:border-emerald-500 outline-none text-slate-200"
            />
            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-slate-600">
               BUFFER_LOAD: {draft.length}
            </div>
          </div>
          <button 
            onClick={() => onComplete(station.id, Object.values(answers), draft, 100)} 
            disabled={draft.length < 50} 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded btn-lab shadow-xl shadow-emerald-900/20"
          >
            Archive_Synthesis_Report
          </button>
        </div>
      )}
    </div>
  );
};

export default StationView;
