
import React, { useState, useRef, useEffect } from 'react';
import { GameState, StationId } from '../types.ts';
import { STATIONS } from '../constants.tsx';
import { sfx } from '../utils/sfx.ts';

interface MissionHubProps {
  state: GameState;
  onStartStation: (id: StationId) => void;
  onShowUpgrades: () => void;
  onShowSubmission: () => void;
  isDossierUnlocked: boolean;
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
    }, 1000);
  };

  const selectedNode = selectedNodeId ? STATIONS[selectedNodeId] : null;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-black/20">
      {/* 1. STATUS GRID (Top) */}
      <div className="grid grid-cols-3 gap-[1px] bg-[#ffb000]/10 shrink-0">
        <div className="p-3 bg-black flex flex-col items-center justify-center">
          <span className="text-[7px] uppercase opacity-40 mb-1">Fuel_Reserves</span>
          <div className="w-full h-1 bg-[#ffb000]/10 rounded-full overflow-hidden">
             <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${state.fuel}%` }}></div>
          </div>
        </div>
        <div className="p-3 bg-black flex flex-col items-center justify-center border-l border-[#ffb000]/10">
          <span className="text-[7px] uppercase opacity-40 mb-1">Supplies</span>
          <span className="text-xs font-bold leading-none">{state.rations}u</span>
        </div>
        <div className="p-3 bg-black flex flex-col items-center justify-center border-l border-[#ffb000]/10">
          <span className="text-[7px] uppercase opacity-40 mb-1">Nodes_Synced</span>
          <span className="text-xs font-bold leading-none">{Object.keys(state.stationProgress).length} / 12</span>
        </div>
      </div>

      {/* 2. RESEARCH MAP */}
      <div className="flex-1 relative overflow-hidden bg-[rgba(0,0,0,0.5)] border-b border-[#ffb000]/10">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(#ffb000 1px, transparent 1px)', backgroundSize: '16px 16px'}}></div>
        
        {/* Instruction overlay if no node selected */}
        {!selectedNodeId && Object.keys(state.stationProgress).length === 0 && (
          <div className="absolute inset-x-0 top-10 flex justify-center z-40 pointer-events-none">
            <div className="bg-[#ffb000] text-black text-[9px] font-bold px-4 py-2 uppercase tracking-widest animate-bounce shadow-[0_0_20px_#ffb000] border border-black">
              Select an Active Signal (Blinking) to Begin
            </div>
          </div>
        )}

        {state.discoveredNodes.map(id => {
          const s = STATIONS[id];
          const isComp = !!state.stationProgress[id]?.completedAt;
          const isSelected = selectedNodeId === id;
          const isAvailable = !isComp;
          
          return (
            <button 
              key={id}
              onClick={() => { sfx.click(); setSelectedNodeId(id); }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all ${isSelected ? 'z-30 scale-125' : 'z-20'}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              {/* Radar pulse for interactive, non-completed nodes - intensified for user clarity */}
              {isAvailable && !isComp && (
                <div className="absolute inset-0 border-2 border-[#ffb000] rounded-full animate-ping opacity-60"></div>
              )}
              {isAvailable && !isComp && (
                <div className="absolute inset-2 border border-[#ffb000] rounded-full animate-pulse opacity-40"></div>
              )}
              
              <div className={`w-4 h-4 rotate-45 border-2 transition-all duration-300 ${
                isComp ? 'bg-green-500 border-green-400 shadow-[0_0_10px_#22c55e]' : 
                isSelected ? 'bg-white border-[#ffb000] shadow-[0_0_15px_#ffb000]' : 
                'bg-amber-900/40 border-amber-600/60 shadow-[0_0_5px_rgba(217,119,6,0.2)]'
              } ${isAvailable && !isComp ? 'animate-pulse bg-[#ffb000]/60' : ''}`}></div>
              
              {/* Tooltip for the node title (visible when selected) */}
              {isSelected && (
                <div className="absolute -top-6 whitespace-nowrap bg-[#ffb000] text-black px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-tighter">
                  {s.title}
                </div>
              )}
            </button>
          );
        })}

        {/* Floating Node Info Bar */}
        <div className={`absolute bottom-0 inset-x-0 p-4 bg-black/95 border-t border-[#ffb000]/30 shadow-2xl transition-transform duration-300 ${selectedNode ? 'translate-y-0' : 'translate-y-full'}`}>
          {selectedNode && (
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className="text-[11px] font-bold uppercase truncate tracking-widest text-[#ffb000]">{selectedNode.title}</h4>
                  <span className="text-[7px] opacity-40 font-mono">NODE:{selectedNode.id.toUpperCase()}</span>
                </div>
                <p className="text-[9px] opacity-70 italic line-clamp-1">{selectedNode.coreIdea}</p>
              </div>
              <button 
                disabled={isTraveling || !!state.stationProgress[selectedNode.id]?.completedAt}
                onClick={() => handleStart(selectedNode.id)}
                className="px-5 py-2.5 bg-[#ffb000] text-black font-bold uppercase text-[10px] tracking-tighter hover:bg-white active:scale-95 transition-all disabled:opacity-30 whitespace-nowrap"
              >
                {isTraveling ? 'SYNCING...' : !!state.stationProgress[selectedNode.id]?.completedAt ? 'STABILIZED' : 'LINK NEURAL CORE'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. LABORATORY LOG */}
      <div className="h-44 shrink-0 flex flex-col bg-black/40">
        <div className="px-3 py-1.5 border-b border-[#ffb000]/10 flex justify-between items-center bg-[#ffb000]/5">
           <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-60">System_Event_Log</span>
           <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 terminal-scrollbar space-y-2.5 font-mono">
          {state.researchLog.length === 0 && (
            <div className="text-[8px] opacity-20 uppercase animate-pulse">Waiting for neural handshake...</div>
          )}
          {state.researchLog.map((log, i) => (
            <div key={i} className="text-[8px] leading-relaxed border-l-2 border-[#ffb000]/10 pl-3">
              <div className="flex gap-3 opacity-30 mb-0.5">
                <span>[{new Date(log.t).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                <span className="font-bold">{log.type}</span>
              </div>
              <p className={`${log.type === 'ANOMALY' ? 'text-red-400' : log.type === 'ACHIEVEMENT' ? 'text-cyan-400' : 'text-[#ffb000]/90'}`}>
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
