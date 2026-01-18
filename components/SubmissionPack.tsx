
import React from 'react';
import { GameState, StationId } from '../types.ts';
import { STATIONS } from '../constants.tsx';

interface SubmissionPackProps {
  state: GameState;
  onBack: () => void;
}

const SubmissionPack: React.FC<SubmissionPackProps> = ({ state, onBack }) => {
  const completedCount = Object.keys(state.stationProgress).filter(id => state.stationProgress[id].completedAt).length;

  return (
    <div className="h-full flex flex-col p-6 gap-6 overflow-y-auto terminal-scrollbar pb-24">
      <div className="vault-panel p-6 bg-green-900/10 border-green-500/30 no-print">
        <h2 className="text-2xl font-bold uppercase tracking-tighter text-green-400 mb-2">Research Dossier Stabilized</h2>
        <p className="text-[10px] opacity-60 uppercase mb-6 tracking-[0.2em]">Validated for External Peer Review</p>
        
        <div className="bg-black/40 p-4 rounded border border-white/5 font-mono text-[10px] space-y-2 mb-6">
           <div className="flex justify-between"><span>CLEARANCE:</span> <span className="text-cyan-400">LEVEL {state.clearanceLevel}</span></div>
           <div className="flex justify-between"><span>STABILITY:</span> <span className="text-green-400">{state.integrity}%</span></div>
           <div className="flex justify-between"><span>NODES SYNCED:</span> <span className="text-green-400">{completedCount}</span></div>
        </div>

        <button 
          onClick={() => window.print()}
          className="w-full h-14 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase text-xs tracking-widest shadow-xl transition-all"
        >
          Generate PDF Research Log
        </button>
      </div>

      <button onClick={onBack} className="text-center opacity-40 text-[9px] uppercase tracking-[0.3em] hover:opacity-100 no-print">
        Return to Terminal
      </button>

      {/* PRINT LAYOUT */}
      <div className="hidden print:block p-12 text-black font-serif bg-white">
        <div className="border-b-4 border-black pb-6 mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tight">TOK Research Dossier</h1>
            <p className="text-sm italic text-slate-600">Knowledge Framework Investigation Log // Theme: Language</p>
          </div>
          <div className="text-right text-[10px] font-mono">
            <p>Hash: {state.seed}</p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <section className="mb-10 p-6 border-2 border-black bg-slate-50">
          <h2 className="text-xl font-bold mb-4 uppercase">Researcher Profile</h2>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <p><strong>Clearance:</strong> Level {state.clearanceLevel}</p>
            <p><strong>Integrity:</strong> {state.integrity}%</p>
            <p><strong>Nodes Sync:</strong> {completedCount}</p>
            <p><strong>Time:</strong> {Math.floor(state.totalActiveTime / 60)} minutes</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 uppercase border-b-2 border-black">Laboratory Feed (Events & Anomalies)</h2>
          <div className="space-y-4">
            {state.researchLog.map((log, i) => (
              <div key={i} className="text-[10px] font-mono border-l-4 border-slate-200 pl-4 py-1">
                <span className="opacity-40">[{new Date(log.t).toLocaleTimeString()}] [{log.type}]</span>
                <p className="mt-1">{log.msg}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="break-before-page">
          <h2 className="text-xl font-bold mb-8 uppercase border-b-2 border-black">Conceptual Synthesis</h2>
          {Object.entries(state.stationProgress).map(([id, progress], index) => {
            const p = progress as any;
            if (!p?.completedAt) return null;
            const station = STATIONS[id as StationId];
            return (
              <div key={id} className="mb-10 border-b border-slate-100 pb-10 break-inside-avoid">
                <h3 className="font-bold text-xl mb-4">{index + 1}. {station.title}</h3>
                <div className="space-y-4 pl-6 border-l-2 border-slate-900">
                  <div>
                    <p className="text-[9px] font-bold uppercase text-slate-400">Knowledge Question Context:</p>
                    <p className="text-sm italic">{station.deliverablePrompt}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-slate-400">Investigator Synthesis:</p>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{p.draft}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-200 text-[9px] text-center opacity-40 uppercase tracking-[0.4em]">
          End of Investigation Dossier // IB TOK Laboratory Protocol 1.0
        </footer>
      </div>
      <style>{`
        @media print {
          .no-print { display: none; }
          body { background: white; color: black; }
        }
      `}</style>
    </div>
  );
};

export default SubmissionPack;
