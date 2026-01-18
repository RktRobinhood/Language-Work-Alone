
import React, { useState } from 'react';
import { GameState, StationId } from '../types';
import { STATIONS } from '../constants';
import { sfx } from '../utils/sfx';

interface MissionHubProps {
  state: GameState;
  onStartStation: (id: StationId) => void;
  onShowUpgrades: () => void;
  onShowSubmission: () => void;
  isDossierUnlocked: boolean;
}

const MissionHub: React.FC<MissionHubProps> = ({ state, onStartStation, onShowUpgrades, onShowSubmission, isDossierUnlocked }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<StationId | null>(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [carPos, setCarPos] = useState(state.lastPosition || { x: 50, y: 50 });

  const handleNodeClick = (id: StationId) => {
    sfx.click();
    setSelectedNodeId(id);
  };

  const startJourney = (id: StationId) => {
    if (isTraveling) return;
    const s = STATIONS[id];
    
    // Check resources
    const fCost = (s.fuelCost || 0) * (state.unlockedUpgrades.includes('fuel_cell') ? 0.5 : 1);
    const rCost = Math.max(0, (s.rationCost || 0) - (state.unlockedUpgrades.includes('mre_pack') ? 1 : 0));

    if (state.fuel < fCost || state.rations < rCost) {
      sfx.error();
      return;
    }

    sfx.scan();
    setIsTraveling(true);
    setCarPos({ x: s.x, y: s.y });
    
    setTimeout(() => {
      setIsTraveling(false);
      onStartStation(id);
    }, 1500);
  };

  const selectedNode = selectedNodeId ? STATIONS[selectedNodeId] : null;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
      {/* Survival Stats Bar */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="vault-panel p-2 flex flex-col items-center">
          <span className="text-[8px] uppercase opacity-50">Fuel Level</span>
          <span className={`text-xs font-bold ${state.fuel < 20 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>{Math.floor(state.fuel)}%</span>
        </div>
        <div className="vault-panel p-2 flex flex-col items-center">
          <span className="text-[8px] uppercase opacity-50">Rations</span>
          <span className={`text-xs font-bold ${state.rations < 3 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>{state.rations} units</span>
        </div>
        <div className="vault-panel p-2 flex flex-col items-center">
          <span className="text-[8px] uppercase opacity-50">Mental Integrity</span>
          <span className={`text-xs font-bold ${state.integrity < 30 ? 'text-red-500 animate-pulse' : 'text-[#ffb000]'}`}>{state.integrity}%</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
          <div className="vault-panel p-4 h-full flex flex-col">
            <h3 className="text-xs font-bold mb-4 uppercase border-b border-[#ffb000]/30 pb-2">Active Network</h3>
            <div className="space-y-2 overflow-y-auto max-h-[250px] lg:max-h-none terminal-scrollbar pr-2">
              {state.discoveredNodes.map(id => {
                const s = STATIONS[id];
                const isCompleted = !!state.stationProgress[id]?.completedAt;
                return (
                  <button 
                    key={id}
                    onClick={() => handleNodeClick(id)}
                    className={`w-full text-left p-2 border transition-all flex justify-between items-center ${selectedNodeId === id ? 'bg-[#ffb000]/20 border-[#ffb000]' : 'border-[#ffb000]/10'}`}
                  >
                    <div className="truncate">
                      <p className="text-[10px] font-bold uppercase truncate">{s.title}</p>
                      <p className="text-[8px] opacity-40 uppercase">{isCompleted ? 'STABLE' : 'PENDING'}</p>
                    </div>
                    <span className="text-[12px] ml-2">{isCompleted ? '✓' : '⚡'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
          <div className="vault-panel relative h-[350px] md:h-[450px] bg-black/80 overflow-hidden">
             <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'linear-gradient(#ffb000 1px, transparent 1px), linear-gradient(90deg, #ffb000 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
             
             {Object.values(STATIONS).map((s) => {
               const isDiscovered = state.discoveredNodes.includes(s.id);
               const isCompleted = !!state.stationProgress[s.id]?.completedAt;
               if (!isDiscovered) return <div key={s.id} className="absolute w-1 h-1 bg-white/5 rounded-full" style={{left: `${s.x}%`, top: `${s.y}%`}}></div>;

               return (
                 <button 
                  key={s.id}
                  onClick={() => handleNodeClick(s.id)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all ${selectedNodeId === s.id ? 'z-20 scale-125' : 'z-10'}`}
                  style={{left: `${s.x}%`, top: `${s.y}%`}}
                 >
                   <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full ${isCompleted ? 'fill-green-900/40 stroke-green-500' : selectedNodeId === s.id ? 'fill-[#ffb000]/20 stroke-[#ffb000]' : 'fill-transparent stroke-[#ffb000]/60'}`}>
                     <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" strokeWidth="4" />
                   </svg>
                   <span className="relative z-10 text-[7px] font-bold">{s.id.substring(0, 3).toUpperCase()}</span>
                 </button>
               );
             })}

             <div className="absolute w-6 h-6 pointer-events-none z-30 flex items-center justify-center transition-all duration-[1500ms] ease-in-out" style={{ left: `${carPos.x}%`, top: `${carPos.y}%`, transform: `translate(-50%, -50%)` }}>
                <span className="text-lg filter drop-shadow-[0_0_5px_rgba(255,176,0,0.8)]">🏎️</span>
             </div>
          </div>

          <div className={`vault-panel p-4 transition-all min-h-[120px] ${selectedNode ? 'opacity-100' : 'opacity-30'}`}>
            {selectedNode ? (
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white uppercase">{selectedNode.title}</h4>
                  <p className="text-[10px] opacity-70 italic mb-3">"{selectedNode.coreIdea}"</p>
                  <div className="flex gap-4 text-[9px] font-mono mb-4">
                     <span className="text-blue-400">Fuel: {Math.floor((selectedNode.fuelCost || 0) * (state.unlockedUpgrades.includes('fuel_cell') ? 0.5 : 1))}</span>
                     <span className="text-green-400">Rations: {Math.max(0, (selectedNode.rationCost || 0) - (state.unlockedUpgrades.includes('mre_pack') ? 1 : 0))}</span>
                  </div>
                </div>
                <button 
                  disabled={isTraveling || !!state.stationProgress[selectedNode.id]?.completedAt}
                  onClick={() => startJourney(selectedNode.id)}
                  className="w-full vault-btn py-2 text-xs bg-[#ffb000] text-black"
                >
                  {isTraveling ? 'INITIATING...' : !!state.stationProgress[selectedNode.id]?.completedAt ? 'ARCHIVE SEALED' : 'ENGAGE EXPLORER'}
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6">
                <p className="text-[10px] font-mono uppercase opacity-50 tracking-widest">Select Destination Node</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionHub;
