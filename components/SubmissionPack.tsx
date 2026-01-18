
import React from 'react';
import { GameState, StationId } from '../types';
import { STATIONS } from '../constants';

interface SubmissionPackProps {
  state: GameState;
  onBack: () => void;
}

const SubmissionPack: React.FC<SubmissionPackProps> = ({ state, onBack }) => {
  const completedCount = Object.keys(state.stationProgress).filter(id => state.stationProgress[id].completedAt).length;

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-10 duration-500 pb-20">
      <div className="glass-panel p-8 rounded-xl border-green-500/20 no-print">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-green-500/10 rounded-full mb-4 border border-green-500/20">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Research Dossier Stabilized</h2>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">Validated for External Peer Review</p>
        </div>

        <div className="space-y-6 mb-8">
           <div className="bg-black/40 p-6 rounded-lg border border-white/5 font-mono text-xs space-y-2">
              <div className="flex justify-between"><span>ENV_ID:</span> <span className="text-cyan-400">{state.seed.substring(0, 12)}</span></div>
              <div className="flex justify-between"><span>ENGAGEMENT:</span> <span className="text-cyan-400">{Math.floor(state.totalActiveTime / 60)}M</span></div>
              <div className="flex justify-between"><span>CLEARANCE:</span> <span className="text-cyan-400">LEVEL {state.clearanceLevel}</span></div>
              <div className="flex justify-between"><span>INTEGRITY:</span> <span className="text-green-400">{state.integrity}%</span></div>
              <div className="flex justify-between"><span>NODES_SYNCED:</span> <span className="text-green-400">{completedCount}</span></div>
           </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-5 rounded-lg shadow-xl flex items-center justify-center gap-3 transition-all"
        >
          GENERATE PDF RESEARCH LOG
        </button>
        <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed font-mono uppercase">
          Set 'Destination' to 'Save as PDF' in the print dialog.
        </p>
      </div>

      <button onClick={onBack} className="text-center text-slate-500 text-[10px] font-mono uppercase hover:text-cyan-400 no-print tracking-widest">
        Return to Research Terminal
      </button>

      {/* PRINT LAYOUT */}
      <div className="hidden print:block p-12 text-slate-900 font-serif bg-white">
        <div className="border-b-4 border-black pb-6 mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tight">TOK Research Dossier</h1>
            <p className="text-sm italic text-slate-600">Knowledge Framework Investigation Log // Area: Language</p>
          </div>
          <div className="text-right text-xs font-mono">
            <p>Session Hash: {state.seed}</p>
            <p>Generated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <section className="mb-10 p-6 border border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">Investigator Profile</h2>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <p><strong>Clearance:</strong> Level {state.clearanceLevel}</p>
            <p><strong>Total Engagement:</strong> {Math.floor(state.totalActiveTime / 60)} minutes</p>
            <p><strong>Mental Integrity:</strong> {state.integrity}%</p>
            <p><strong>Archive Nodes:</strong> {completedCount} stabilized</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-8 uppercase tracking-wider border-b-2 border-slate-200">Knowledge Synthesis</h2>
          {Object.entries(state.stationProgress).map(([id, progress], index) => {
            // Fix: Cast progress to the specific type to resolve 'unknown' property errors when accessing completedAt and draft
            const p = progress as { startTime: number; completedAt?: number; failedAttempts: number; draft?: string; };
            if (!p?.completedAt) return null;
            // Fix: Cast id to StationId to ensure type safety with STATIONS lookup
            const station = STATIONS[id as StationId];
            return (
              <div key={id} className="mb-12 break-inside-avoid">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-black text-white px-3 py-1 font-mono text-sm">NODE_{index + 1}</span>
                  <h3 className="font-bold text-2xl">{station.title}</h3>
                </div>
                <div className="pl-6 border-l-4 border-slate-100 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Investigation Prompt:</p>
                    <p className="text-sm italic leading-relaxed">{station.deliverablePrompt}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Researcher Findings:</p>
                    <div className="text-base whitespace-pre-wrap leading-relaxed">
                      {p.draft}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-200 text-[10px] text-center text-slate-400 uppercase tracking-[0.4em]">
          End of Official Research Report // Verification Required for External Feedback
        </footer>
      </div>
      <style>{`
        @media print {
          .no-print { display: none; }
          body { background: white; color: black; }
          .vault-panel { border-color: #000; }
        }
      `}</style>
    </div>
  );
};

export default SubmissionPack;
