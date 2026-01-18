
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
    }, 1000);
  };

  const getGarbledName = (id: string) => {
    const garbled = ["Σελίδα", "Ключ", "0xFA2", "閉鎖", "Λόγος", "語言", "संस्कृत"];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return garbled[hash % garbled.length];
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-black/20">
      <div className="grid grid-cols-2 gap-[1px] bg-[#ffb000]/10 shrink-0">
        <div className="p-3 bg-black flex flex-col items-center justify-center">
          <span className="text-[7px] uppercase opacity-40 mb-1">Animus_Fuel</span>
          <div className="w-full h-1 bg-[#ffb000]/10 rounded-full overflow-hidden">
             <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${state.fuel}%` }}></div>
          </div>
        </div>
        <div className="p-3 bg-black flex flex-col items-center justify-center border-l border-[#ffb000]/10">
          <span className="text-[7px] uppercase opacity-40 mb-1">Frag_Sync</span>
          <span className="text-xs font-bold leading-none">{Object.keys(state.stationProgress).length} / 12</span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden bg-black border-b border-[#ffb000]/10">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#ffb000 1px, transparent 1px)', backgroundSize: '24px 24px'}}></div>
        
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
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center transition-all ${isSelected ? 'z-30 scale-125' : 'z-20'}`}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
            >
              {!isComp && isDecrypted && (
                <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping opacity-20"></div>
              )}
              
              <div className={`w-4 h-4 rotate-45 border-2 transition-all duration-300 ${
                isComp ? 'bg-green-500 border-green-400 shadow-[0_0_10px_#22c55e]' : 
                !isDecrypted ? 'bg-black border-white/10 text-white/10' :
                isSelected ? 'bg-white border-cyan-400 shadow-[0_0_20px_cyan]' : 
                'bg-cyan-900/30 border-cyan-700/50'
              }`}>
                {!isDecrypted && <div className="absolute inset-0 flex items-center justify-center text-[8px] font-black">-</div>}
              </div>
            </button>
          );
        })}

        <div className={`absolute bottom-0 inset-x-0 p-5 bg-black/95 border-t border-cyan-900/50 shadow-2xl transition-transform duration-300 ${selectedNodeId ? 'translate-y-0' : 'translate-y-full'}`}>
          {selectedNodeId && (
            <div className="flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1">
                  <h4 className={`text-[12px] font-black uppercase tracking-widest ${state.decryptedNodes.includes(selectedNodeId) ? 'text-cyan-400' : 'text-red-500'}`}>
                    {state.decryptedNodes.includes(selectedNodeId) ? STATIONS[selectedNodeId].title : `[ LOCKED_${getGarbledName(selectedNodeId)} ]`}
                  </h4>
                </div>
                <p className="text-[9px] opacity-50 italic truncate">
                  {state.decryptedNodes.includes(selectedNodeId) ? STATIONS[selectedNodeId].coreIdea : `Key required from memory: ${state.nodePrerequisites[selectedNodeId]?.toUpperCase() || 'ROOT'}`}
                </p>
              </div>
              <button 
                disabled={isTraveling || !!state.stationProgress[selectedNodeId]?.completedAt || !state.decryptedNodes.includes(selectedNodeId)}
                onClick={() => handleStart(selectedNodeId)}
                className="px-6 py-3 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest hover:bg-white active:scale-95 transition-all disabled:opacity-20"
              >
                {isTraveling ? 'SYNCING...' : 'ENTER'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="h-40 shrink-0 flex flex-col bg-black">
        <div className="px-3 py-1.5 border-b border-white/5 flex justify-between items-center bg-white/5">
           <span className="text-[7px] font-bold uppercase tracking-[0.4em] opacity-40">Animus_Memory_Stream</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 terminal-scrollbar space-y-4 font-mono text-[9px]">
          {state.researchLog.slice(-15).map((log, i) => (
            <div key={i} className="flex gap-4">
              <span className="opacity-20 whitespace-nowrap">[{new Date(log.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
              <p className={`${log.type === 'STORY' ? 'text-cyan-200/90 italic' : 'text-amber-500'} leading-relaxed`}>
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
