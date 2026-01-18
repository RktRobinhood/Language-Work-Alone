
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
  const [answers, setAnswers] = useState<number[]>([]);
  const [draft, setDraft] = useState('');
  const [failed, setFailed] = useState(false);

  const hasLogicProbe = state.unlockedUpgrades.includes('logic_probe');

  const handleMCQSubmit = (idx: number, choice: number) => {
    sfx.beep(600, 0.05);
    const newAnswers = [...answers];
    newAnswers[idx] = choice;
    setAnswers(newAnswers);
  };

  const validateChecks = () => {
    let correct = 0;
    station.mcqs.forEach((q, i) => {
      if (answers[i] === q.answerIndex) correct++;
    });
    
    if (correct < station.mcqs.length) {
      sfx.error();
      setFailed(true);
      onLog('CALIBRATION_FAILURE', { id: station.id, msg: "Data misalignment." });
      setTimeout(() => {
        setStep('material');
        setAnswers([]);
        setFailed(false);
      }, 2500);
    } else {
      sfx.confirm();
      setStep('synthesis');
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-10 duration-500">
      <div className="flex justify-between items-start border-b border-cyan-500/20 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 uppercase tracking-tight">{station.title}</h2>
          <span className="text-[10px] font-mono text-cyan-500 uppercase">Archive Node Uplink // Active</span>
        </div>
        <button onClick={onCancel} className="text-[10px] font-mono text-slate-500 hover:text-white uppercase px-3 py-1 border border-slate-800 rounded">Disconnect</button>
      </div>

      {step === 'material' && (
        <div className="flex flex-col gap-6">
          <div className="video-container shadow-2xl border border-cyan-500/20 bg-black group">
            <iframe 
              src={`https://www.youtube.com/embed/${station.youtubeId}?modestbranding=1&rel=0`}
              title="Research Material"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-cyan-500/5 pointer-events-none group-hover:opacity-0 transition-opacity"></div>
          </div>
          
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 bg-slate-900/50 p-2 rounded">
             <span>FALLBACK: <a href={`https://www.youtube.com/watch?v=${station.youtubeId}`} target="_blank" className="text-cyan-600 underline">WATCH_ON_YT</a></span>
             <span>ID: {station.id.toUpperCase()}</span>
          </div>

          <div className="glass-panel p-6 rounded-xl border-cyan-500/20">
             <h3 className="text-xs font-mono font-bold text-cyan-500 uppercase mb-3 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                Executive Abstract
             </h3>
             <p className="text-sm text-slate-300 leading-relaxed font-medium">
               {station.reading}
             </p>
          </div>

          <button onClick={() => { sfx.scan(); setStep('checks'); }} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-5 rounded-lg transition-all uppercase tracking-widest text-sm shadow-xl shadow-cyan-900/10">
            Initiate Check
          </button>
        </div>
      )}

      {step === 'checks' && (
        <div className="flex flex-col gap-6">
          {failed ? (
            <div className="text-center py-20 flex flex-col items-center gap-6">
               <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
               <p className="text-red-400 font-mono text-sm uppercase animate-pulse">Integrity Breach // Recalibrating...</p>
            </div>
          ) : (
            <>
              <div className="text-center">
                 <h3 className="text-xs font-mono text-cyan-500 uppercase font-bold tracking-[0.4em]">Validation Protocol</h3>
                 <p className="text-[10px] text-slate-600 mt-1 uppercase">Triple-check verification required</p>
              </div>
              {station.mcqs.map((q, qIdx) => (
                <div key={qIdx} className="glass-panel p-5 rounded-xl border-slate-800">
                  <p className="font-bold text-white mb-4 text-sm">{qIdx + 1}. {q.question}</p>
                  <div className="flex flex-col gap-2">
                    {q.options.map((opt, oIdx) => {
                      // Logic Probe: Blur out one wrong answer (simple implementation: blur index 0 if it's wrong)
                      const isWrong = oIdx !== q.answerIndex;
                      const isBlurred = hasLogicProbe && isWrong && oIdx === 0;

                      return (
                        <button
                          key={oIdx}
                          disabled={isBlurred}
                          onClick={() => handleMCQSubmit(qIdx, oIdx)}
                          className={`text-left p-3 rounded-lg text-xs border transition-all ${
                            answers[qIdx] === oIdx ? 'bg-cyan-500/10 border-cyan-500 text-cyan-200' : 
                            isBlurred ? 'opacity-10 grayscale pointer-events-none' :
                            'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-mono text-[9px] mr-3 opacity-40">[{String.fromCharCode(65 + oIdx)}]</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button onClick={validateChecks} disabled={answers.filter(a => a !== undefined).length < station.mcqs.length} className="w-full bg-cyan-600 py-4 rounded-lg font-bold uppercase tracking-widest disabled:opacity-30">
                Submit Validation
              </button>
            </>
          )}
        </div>
      )}

      {step === 'synthesis' && (
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-xl border-cyan-500/20 bg-cyan-500/5">
            <h3 className="text-[10px] font-mono font-bold text-cyan-500 uppercase mb-3 tracking-widest">Synthesis Directive</h3>
            <p className="text-sm font-medium text-white italic">"{station.deliverablePrompt}"</p>
          </div>
          <textarea 
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Documenting findings..."
            className="w-full h-48 bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-sm font-mono focus:border-cyan-500 outline-none text-slate-200"
          />
          <button onClick={() => onComplete(station.id, answers, draft, 100)} disabled={draft.length < 50} className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-lg font-bold uppercase tracking-widest disabled:opacity-20 shadow-xl">
            Seal Node Archive
          </button>
        </div>
      )}
    </div>
  );
};

export default StationView;
