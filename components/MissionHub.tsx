
import React, { useState, useRef, useEffect } from 'react';
import { GameState, StationId } from '../types.ts';
import { STATIONS } from '../constants.tsx';
import { sfx } from '../utils/sfx.ts';

interface MissionHubProps {
  state: GameState;
  onStartStation: (id: StationId) => void;
  onShowEndgame: () => void;
  isEndgameUnlocked: boolean;
}

const MissionHub: React.FC<MissionHubProps> = ({ state, onStartStation }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<StationId | null>(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.researchLog]);

  const handleStart = (id: StationId) => {
    if (isTraveling) return;
    setIsTraveling(true);
    sfx.scan();
    setTimeout(() => {
      setIsTraveling(false);
      onStartStation(id);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-black/40">
      <div className="grid grid-cols-2 gap-[1px] bg-[#ffb000]/10 shrink-0">
        <div className="p-3 bg-black flex flex-col items-center justify-center">
          <span className="text-[7px] uppercase opacity-40 mb-1 tracking-widest">Neural_Fuel</span>
          <div className="w-full h-1 bg-[#ffb000]/10 rounded-full overflow-hidden">
             <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${state.fuel}%` }}></div>
          </div>
        </div>
        <div className="p-3 bg-black flex flex-col items-center justify-center border-l border-[#ffb000]/10">
          <span className="text-[7px] uppercase opacity-40 mb-1 tracking-widest">Sync_State</span>
          <span className="text-xs font-bold text-cyan-400 font-mono">{Object.keys(state.stationProgress).length} / 12</span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-[#050505] border-b border-[#ffb000]/10">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#ffb000 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
        
        {/* SVG PREREQUISITE LINES - ONLY FOR LOCKED NODES */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {state.discoveredNodes.map(id => {
            // ONLY show line if the node is currently LOCKED (not decrypted)
            if (state.decryptedNodes.includes(id)) return null;

            const prereqId = state.nodePrerequisites[id];
            // Prerequisite must also be discovered to show the line
            if (!prereqId || !state.discoveredNodes.includes(prereqId)) return null;
            
            const start = STATIONS[prereqId];
            const end = STATIONS[id];
            const isPrereqStabilized = !!state.stationProgress[prereqId]?.completedAt;

            return (
              <g key={`lock-line-${id}`}>
                <line 
                  x1={`${start.x}%`} y1={`${start.y}%`}
                  x2={`${end.x}%`} y2={`${end.y}%`}
                  stroke={isPrereqStabilized ? '#ffb000' : '#331111'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity={isPrereqStabilized ? "0.6" : "0.2"}
                  filter={isPrereqStabilized ? "url(#lineGlow)" : ""}
                  className="transition-all duration-700"
                />
                <circle 
                  cx={`${end.x}%`} cy={`${end.y}%`} r="3" 
                  fill={isPrereqStabilized ? '#ffb000' : '#331111'}
                  className={isPrereqStabilized ? "animate-pulse" : ""}
                />
              </g>
            );
          })}
        </svg>

        {state.discoveredNodes.map(id => {
          const s = STATIONS[id];
          if (!s) return null;
          const isComp = !!state.stationProgress[id]?.completedAt;
          const isDecrypted = state.decryptedNodes.includes(id);
          const isSelected = selectedNodeId === id;
          
          return (
            <button 
              key={id}
              onClick={() => { sfx.click(); setSelectedNodeId(id); }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all ${isSelected ? 'z-30 scale-125' : 'z-20'}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              {!isComp && isDecrypted && (
                <div className="absolute inset-0 border border-cyan-400/30 rounded-full animate-ping"></div>
              )}
              
              <div className={`w-3.5 h-3.5 rotate-45 border transition-all duration-300 ${
                isComp ? 'bg-green-500 border-green-400 shadow-[0_0_10px_#22c55e]' : 
                !isDecrypted ? 'bg-black border-red-500/20 text-red-500/10' :
                isSelected ? 'bg-white border-cyan-400 shadow-[0_0_15px_cyan]' : 
                'bg-cyan-900/40 border-cyan-500/50'
              }`}>
                {!isDecrypted && <div className="absolute inset-0 flex items-center justify-center text-[7px] font-black opacity-20">-</div>}
              </div>
            </button>
          );
        })}

        <div className={`absolute bottom-0 inset-x-0 p-5 bg-black/95 border-t border-cyan-900/50 shadow-2xl transition-transform duration-300 ${selectedNodeId ? 'translate-y-0' : 'translate-y-full'}`}>
          {selectedNodeId && (
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className={`text-[11px] font-black uppercase tracking-widest ${state.decryptedNodes.includes(selectedNodeId) ? 'text-cyan-400' : 'text-red-500 opacity-60'}`}>
                    {state.decryptedNodes.includes(selectedNodeId) ? STATIONS[selectedNodeId].title : `ENCRYPTED_SIGNAL`}
                  </h4>
                </div>
                <p className="text-[8px] opacity-40 italic truncate font-mono">
                  {state.decryptedNodes.includes(selectedNodeId) ? STATIONS[selectedNodeId].coreIdea : `PREREQ: STABILIZE [${STATIONS[state.nodePrerequisites[selectedNodeId]]?.title.toUpperCase() || 'ROOT'}]`}
                </p>
              </div>
              <button 
                disabled={isTraveling || !!state.stationProgress[selectedNodeId]?.completedAt || !state.decryptedNodes.includes(selectedNodeId)}
                onClick={() => handleStart(selectedNodeId)}
                className="px-6 py-2.5 bg-cyan-500 text-black font-black uppercase text-[9px] tracking-widest hover:bg-white active:scale-95 transition-all disabled:opacity-20 shadow-lg shadow-cyan-900/20"
              >
                {isTraveling ? 'LINKING...' : !!state.stationProgress[selectedNodeId]?.completedAt ? 'STABILIZED' : 'SYNCHRONIZE'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="h-44 shrink-0 flex flex-col bg-black">
        <div className="px-3 py-1.5 border-b border-[#ffb000]/10 bg-white/5 flex justify-between items-center">
           <span className="text-[7px] font-bold uppercase tracking-[0.4em] opacity-40">Animus_Neural_Log</span>
           <span className="text-[6px] font-mono opacity-20">STREAM_ACTIVE</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 terminal-scrollbar space-y-3 font-mono text-[9px]">
          {state.researchLog.slice(-30).map((log, i) => (
            <div key={i} className={`flex gap-4 opacity-90 border-l pl-3 transition-all ${log.type === 'STORY' ? 'border-cyan-500' : log.type === 'ANOMALY' ? 'border-red-500' : 'border-white/10'}`}>
              <div className="flex flex-col min-w-[50px]">
                <span className="opacity-20 text-[6px]">[{new Date(log.t).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}]</span>
                <span className={`text-[6px] font-black tracking-tighter ${log.type === 'ANOMALY' ? 'text-red-500' : 'text-cyan-600'}`}>{log.type}</span>
              </div>
              <p className={`${log.type === 'STORY' ? 'text-cyan-200 italic font-medium' : log.type === 'ANOMALY' ? 'text-red-300' : 'text-amber-500'} leading-relaxed`}>
                {log.msg}
              </p>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MissionHub;
