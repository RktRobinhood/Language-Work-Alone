
import React from 'react';
import { GameState, StationId } from '../types';
import { STATIONS } from '../constants';

interface DashboardProps {
  state: GameState;
  onStartStation: (id: StationId) => void;
  onShowSubmission: () => void;
  isSubmissionUnlocked: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ state, onStartStation, onShowSubmission, isSubmissionUnlocked }) => {
  const currentStationId = state.route[state.currentStationIndex];
  const currentStation = currentStationId ? STATIONS[currentStationId] : null;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Active Research Node */}
      <section className="glass-panel p-6 rounded-xl border-cyan-500/10 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
        
        <h2 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping"></span>
          Active Knowledge Node
        </h2>
        
        {currentStation ? (
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{currentStation.title}</h3>
            <p className="text-slate-400 mb-8 leading-relaxed text-lg">{currentStation.coreIdea}</p>
            
            <button 
              onClick={() => onStartStation(currentStationId)}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-cyan-900/20 active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <span className="uppercase tracking-[0.15em] text-sm">Synchronize With Node</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Research Phase Complete</h3>
            <p className="text-slate-500 uppercase font-mono text-xs">All selected nodes have been stabilized.</p>
          </div>
        )}
      </section>

      {/* Progress Map */}
      <section>
        <div className="flex justify-between items-end mb-4 font-mono">
           <h2 className="text-[10px] text-slate-500 uppercase tracking-widest">Research Dossier Mapping</h2>
           <span className="text-[10px] text-cyan-500 font-bold">{state.currentStationIndex} / {state.route.length} Verified</span>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {state.route.map((id, i) => {
            const isCompleted = state.stationProgress[id]?.completedAt;
            const isCurrent = i === state.currentStationIndex;
            return (
              <div key={id} className={`h-1.5 rounded-full transition-all duration-700 ${isCompleted ? 'bg-cyan-500' : isCurrent ? 'bg-slate-700 border border-cyan-500/30' : 'bg-slate-800'}`}>
                {isCurrent && <div className="h-full w-full bg-cyan-400 animate-pulse rounded-full"></div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lab Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={onShowSubmission}
          disabled={!isSubmissionUnlocked}
          className={`glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-2 transition-all border-2 ${
            isSubmissionUnlocked 
            ? 'border-cyan-500/50 hover:bg-cyan-500/10 cursor-pointer' 
            : 'border-slate-800 opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm font-bold uppercase tracking-widest">Finalize Report</span>
          {!isSubmissionUnlocked && (
             <span className="text-[10px] font-mono text-slate-500 uppercase">System Lock: {Math.max(0, 50 - Math.floor(state.totalActiveTime / 60))}m Remaining</span>
          )}
        </button>

        <div className="glass-panel p-6 rounded-xl border-slate-800">
           <h4 className="text-[10px] font-mono text-slate-500 uppercase mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
              Laboratory Feed
           </h4>
           <div className="max-h-24 overflow-y-auto font-mono text-[9px] text-slate-500 flex flex-col gap-1.5">
              {state.log.slice(-5).reverse().map((l, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-cyan-900">[{new Date(l.t).toLocaleTimeString()}]</span>
                  <span className="uppercase text-slate-400">{l.type.replace(/_/g, ' ')}</span>
                  <span className="text-slate-600">>> READY</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
