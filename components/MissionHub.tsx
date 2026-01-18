
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
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">
      {/* Brand Header */}
      <section className="glass-panel p-6 rounded-xl border-cyan-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></div>
        </div>
        <div className="flex items-center gap-4 mb-3">
          <div className="text-cyan-500 text-3xl font-mono">⌬</div>
          <div>
            <h2 className="text-xs font-mono font-bold text-cyan-500 uppercase tracking-widest">TOK Laboratory // Research Hub</h2>
            <p className="text-[10px] text-slate-500 font-mono uppercase">Stage: {state.stage.replace('_', ' ')}</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 font-medium italic">
          {state.stage === GameStage.ORIENTATION ? 
            "Investigator, the core is unstable. Complete the Orientation Node to unlock the full Knowledge Matrix." :
            state.stage === GameStage.FIELD_RESEARCH ? 
            "Field access granted. Explore the stabilized nodes to build the Final Dossier." :
            "All nodes secured. Final Synthesis required."}
        </p>
      </section>

      {/* Map or Orientation View */}
      {state.stage === GameStage.ORIENTATION ? (
        <section className="glass-panel p-8 rounded-xl border-amber-500/20 bg-amber-500/5 text-center flex flex-col items-center gap-6">
           <div className="w-20 h-20 border-2 border-amber-500/50 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-amber-500 text-3xl">!</span>
           </div>
           <div className="space-y-2">
             <h3 className="text-lg font-bold text-white uppercase tracking-wider">Locked: Knowledge Matrix</h3>
             <p className="text-xs text-slate-500 font-mono">STABILIZE ORIENTATION NODE TO CONTINUE</p>
           </div>
           <button 
             onClick={onStartStation}
             className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-4 rounded-lg shadow-xl shadow-amber-900/20 transition-all uppercase tracking-widest text-sm"
           >
             Begin Orientation: {station?.title}
           </button>
        </section>
      ) : (
        <section className="relative glass-panel rounded-xl overflow-hidden aspect-square border-cyan-500/10 bg-slate-900/40">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          </div>

          {state.route.map((id, index) => {
            const s = STATIONS[id];
            const isCompleted = !!state.stationProgress[id]?.completedAt;
            const isCurrent = index === state.currentStationIndex;
            
            return (
              <div 
                key={id}
                className="absolute transition-all duration-700"
                style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div 
                  onClick={() => isCurrent && onStartStation()}
                  className={`
                  relative w-10 h-10 rounded-lg border flex items-center justify-center text-[10px] font-mono font-bold transition-all
                  ${isCompleted ? 'bg-green-500/20 border-green-500 text-green-400' : 
                    isCurrent ? 'bg-cyan-500 border-white text-white shadow-[0_0_20px_#06b6d4] animate-pulse cursor-pointer hover:scale-110' : 
                    'bg-slate-950 border-slate-700 text-slate-700'}
                `}>
                  {index + 1}
                  {isCurrent && <div className="absolute -inset-1 border border-cyan-400 rounded-lg animate-ping"></div>}
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-4 left-4 text-[8px] font-mono text-cyan-800 uppercase tracking-widest">Matrix_Render_v2.0</div>
        </section>
      )}

      {/* Action Area */}
      {state.stage === GameStage.FIELD_RESEARCH && (
        <div className="grid grid-cols-2 gap-4">
           <button onClick={onShowUpgrades} className="glass-panel p-4 rounded-xl border-cyan-500/20 hover:bg-cyan-500/10 transition-all flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <div className="text-left">
                <p className="text-[10px] font-mono font-bold text-cyan-400">RESEARCH_TOOLS</p>
                <p className="text-[8px] text-slate-500">UNLOCK LAB BUFFS</p>
              </div>
           </button>
           <button onClick={onShowSubmission} className="glass-panel p-4 rounded-xl border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-3">
              <span className="text-xl">▤</span>
              <div className="text-left">
                <p className="text-[10px] font-mono font-bold text-slate-400">VIEW_DOSSIER</p>
                <p className="text-[8px] text-slate-500">DATA_ARCHIVE</p>
              </div>
           </button>
        </div>
      )}
    </div>
  );
};

export default MissionHub;
