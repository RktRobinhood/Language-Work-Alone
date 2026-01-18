
import React from 'react';
import { GameState, GameStage } from '../types';
import { STATIONS } from '../constants';
import { sfx } from '../utils/sfx';

interface MissionHubProps {
  state: GameState;
  onStartStation: () => void;
  onShowUpgrades: () => void;
  onShowSubmission: () => void;
}

const MissionHub: React.FC<MissionHubProps> = ({ state, onStartStation, onShowUpgrades, onShowSubmission }) => {
  const currentStationId = state.route[state.currentStationIndex];
  const station = currentStationId ? STATIONS[currentStationId] : null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Laboratory_Operations</h2>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Target: Language_Area_of_Knowledge</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => { sfx.beep(400, 0.05); onShowUpgrades(); }} className="px-4 py-2 bg-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded hover:bg-slate-700 transition-all border border-slate-700">Tools_Terminal</button>
           <button onClick={() => { sfx.beep(400, 0.05); onShowSubmission(); }} className="px-4 py-2 bg-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest rounded hover:bg-slate-700 transition-all border border-slate-700">Dossier_Archive</button>
        </div>
      </div>

      <section className="glass-panel p-6 rounded border-emerald-500/10">
        <h3 className="text-[10px] font-mono text-emerald-500 uppercase mb-4 tracking-[0.2em] flex items-center gap-2">
           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
           Research_Status_Log
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed italic">
          {state.stage === GameStage.ORIENTATION ? 
            "Investigator orientation required. Complete the root node to verify your methodological alignment." :
            state.stage === GameStage.FIELD_RESEARCH ? 
            "Matrix stabilized. Field research phase active. Coordinate with remaining Knowledge Nodes." :
            "Matrix integrity at maximum. Final synthesis sequence initiated."}
        </p>
      </section>

      {state.stage === GameStage.ORIENTATION ? (
        <section className="glass-panel p-10 rounded text-center flex flex-col items-center gap-6 border-emerald-500/20">
           <div className="w-16 h-16 border border-emerald-500/30 rounded-full flex items-center justify-center">
              <span className="text-emerald-500 text-2xl font-mono">!</span>
           </div>
           <div className="space-y-1">
             <h3 className="text-lg font-bold text-white uppercase tracking-wider">LOCKED_MATRIX</h3>
             <p className="text-[10px] text-slate-500 font-mono uppercase">Initialize orientation sequence to unlock research map</p>
           </div>
           <button 
             onClick={onStartStation}
             className="w-full max-w-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded transition-all uppercase tracking-widest text-xs"
           >
             Stabilize_Orientation: {station?.title}
           </button>
        </section>
      ) : (
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative glass-panel rounded overflow-hidden aspect-square border-slate-800 bg-slate-900/40">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            {state.route.map((id, index) => {
              const s = STATIONS[id];
              const isCompleted = !!state.stationProgress[id]?.completedAt;
              const isCurrent = index === state.currentStationIndex;
              
              return (
                <div key={id} className="absolute transition-all duration-700" style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}>
                  <div 
                    onClick={() => isCurrent && onStartStation()}
                    className={`
                    relative w-8 h-8 rounded border flex items-center justify-center text-[9px] font-mono font-bold transition-all
                    ${isCompleted ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 
                      isCurrent ? 'bg-emerald-500 border-white text-white shadow-[0_0_15px_#10b981] animate-pulse cursor-pointer hover:scale-110' : 
                      'bg-slate-900 border-slate-800 text-slate-700'}
                  `}>
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
               <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active_Objective</h4>
               {station ? (
                 <div className="glass-panel p-6 rounded border-emerald-500/20">
                   <h5 className="text-xl font-bold text-white mb-2">{station.title}</h5>
                   <p className="text-xs text-slate-400 mb-6 leading-relaxed">{station.coreIdea}</p>
                   <button onClick={onStartStation} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded btn-lab">Uplink_Node</button>
                 </div>
               ) : (
                 <div className="glass-panel p-6 rounded border-emerald-500/20 text-center">
                   <p className="text-emerald-400 font-bold uppercase text-sm mb-4 tracking-widest">Mission_Complete</p>
                   <button onClick={onShowSubmission} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded btn-lab">Seal_Dossier</button>
                 </div>
               )}
            </div>

            <div className="glass-panel p-4 rounded border-slate-800 font-mono text-[9px] text-slate-500 space-y-2">
               <p className="uppercase text-slate-400 border-b border-slate-800 pb-1 mb-2">Internal_Comms</p>
               {state.log.slice(-3).reverse().map((l, i) => (
                 <p key={i}><span className="text-emerald-900">[{new Date(l.t).toLocaleTimeString()}]</span> {l.type} >> STATUS_OK</p>
               ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MissionHub;
