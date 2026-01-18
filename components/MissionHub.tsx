
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

  const isDecrypted = (id: StationId) => state.decryptedNodes.includes(id);
  const isPrereqMet = (id: StationId) => {
    const pre = state.nodePrerequisites[id];
    return !pre || !!state.stationProgress[pre]?.completedAt;
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
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#ffb000 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
        
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
            if (isDecrypted(id)) return null;

            const prereqId = state.nodePrerequisites[id];
            if (!prereqId || !state.discoveredNodes.includes(prereqId)) return null;
            
            const start = STATIONS[prereqId];
            const end = STATIONS[id];
            const met = isPrereqMet(id);

            return (
              <g key={`lock-line-${id}`}>
                <line 
                  x1={`${start.x}%`} y1={`${start.y}%`}
                  x2={`${end.x}%`} y2={`${end.y}%`}
                  stroke={met ? '#ffb000' : '#442222'}
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity={met ? "0.6" : "0.3"}
                  filter={met ? "url(#lineGlow)" : ""}
                  className="transition-all duration-700"
                />
                <circle 
                  cx={`${end.x}%`} cy={`${end.y}%`} r="2" 
                  fill={met ? '#ffb000' : '#442222'}
                  className={met ? "animate-pulse" : ""}
                />
              </g>
            );
          })}
        </svg>

        {state.discoveredNodes.map(id => {
          const s = STATIONS[id];
          if (!s) return null;
          const isComp = !!state.stationProgress[id]?.completedAt;
          const decrypted = isDecrypted(id);
          const isSelected = selectedNodeId === id;
          
          return (
            <button 
              key={id}
              onClick={() => { sfx.click(); setSelectedNodeId(id); }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-all ${isSelected ? 'z-30 scale-125' : 'z-20'}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              {!isComp && decrypted && (
                <div className="absolute inset-0 border border-cyan-400/40 rounded-full animate-ping"></div>
              )}
              
              <div className={`w-3.5 h-3.5 rotate-45 border transition-all duration-300 ${
                isComp ? 'bg-green-500 border-green-400 shadow-[0_0_12px_#22c55e]' : 
                !decrypted ? 'bg-[#1a0a0a] border-red-500/40 text-red-500/30' :
                isSelected ? 'bg-white border-cyan-400 shadow-[0_0_20px_cyan]' : 
                'bg-cyan-900/40 border-cyan-500/60 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
              }`}>
                {!decrypted && <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black opacity-40">?</div>}
              </div>
            </button>
          );
        })}

        <div className={`absolute bottom-0 inset-x-0 p-5 bg-black/95 border-t border-[#ffb000]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 ${selectedNodeId ? 'translate-y-0' : 'translate-y-full'}`}>
          {selectedNodeId && (
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className={`text-[11px] font-black uppercase tracking-widest ${isDecrypted(selectedNodeId) ? 'text-cyan-400' : 'text-red-500/80'}`}>
                    {isDecrypted(selectedNodeId) ? STATIONS[selectedNodeId].title : `ENCRYPTED_SIGNAL`}
                  </h4>
                </div>
                <p className="text-[8px] opacity-40 italic truncate font-mono">
                  {isDecrypted(selectedNodeId) ? STATIONS[selectedNodeId].coreIdea : `HANDSHAKE_REQ: STABILIZE [${STATIONS[state.nodePrerequisites[selectedNodeId]]?.title.toUpperCase() || 'ROOT'}] FIRST.`}
                </p>
              </div>
              <button 
                disabled={isTraveling || !!state.stationProgress[selectedNodeId]?.completedAt || !isDecrypted(selectedNodeId)}
                onClick={() => handleStart(selectedNodeId)}
                className="px-6 py-2.5 bg-[#ffb000] text-black font-black uppercase text-[9px] tracking-widest hover:bg-white active:scale-95 transition-all disabled:opacity-20 shadow-[0_0_20px_rgba(255,176,0,0.2)]"
              >
                {isTraveling ? 'LINKING...' : !!state.stationProgress[selectedNodeId]?.completedAt ? 'ARCHIVED' : 'SYNCHRONIZE'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="h-52 shrink-0 flex flex-col bg-[#080808] border-t border-[#ffb000]/10">
        <div className="px-3 py-1.5 border-b border-[#ffb000]/10 bg-white/5 flex justify-between items-center">
           <span className="text-[7px] font-bold uppercase tracking-[0.4em] opacity-50">Investigator_Live_Feed</span>
           <span className="text-[6px] font-mono opacity-20 animate-pulse">RECON_MODE_ACTIVE</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 terminal-scrollbar space-y-4 font-mono text-[9px]">
          {state.researchLog.slice(-30).map((log, i) => (
            <div key={i} className={`flex gap-4 opacity-90 border-l-2 pl-3 transition-all ${
              log.type === 'STORY' ? 'border-cyan-500/60' : 
              log.type === 'ANOMALY' ? 'border-red-500/60' : 
              log.type === 'SYSTEM' ? 'border-amber-500/60' :
              'border-white/10'
            }`}>
              <div className="flex flex-col min-w-[55px] shrink-0">
                <span className="opacity-20 text-[6px] tracking-tighter">[{new Date(log.t).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className={`text-[6px] font-black tracking-widest mt-0.5 ${
                  log.type === 'ANOMALY' ? 'text-red-500' : 
                  log.type === 'STORY' ? 'text-cyan-400' : 
                  'text-[#ffb000]'
                }`}>{log.type}</span>
              </div>
              <p className={`${
                log.type === 'STORY' ? 'text-cyan-100 italic' : 
                log.type === 'ANOMALY' ? 'text-red-300' : 
                'text-[#ffb000]/80'
              } leading-relaxed break-words`}>
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
