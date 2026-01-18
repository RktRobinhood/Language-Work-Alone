
import React from 'react';
import { GameState, StationId } from '../types';
import { STATIONS } from '../constants';

interface MissionHubProps {
  state: GameState;
  onStartStation: (id: StationId) => void;
  onShowUpgrades: () => void;
  onShowSubmission: () => void;
  isDossierUnlocked: boolean;
}

const MissionHub: React.FC<MissionHubProps> = ({ state, onStartStation, onShowUpgrades, onShowSubmission, isDossierUnlocked }) => {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="border-b-2 border-[#ffb000] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold crt-text mb-1 uppercase tracking-tighter">Vault Communications Hub</h2>
          <div className="flex gap-4 text-[11px] font-mono text-[#ffb000]/70 uppercase">
             <span>Vault: 76-TOK</span>
             <span>Status: {state.dataIntegrity > 50 ? 'Stable' : 'Unstable'}</span>
             <span>Active Nodes: {Object.keys(state.stationProgress).length} / {state.route.length}</span>
          </div>
        </div>
        <div className="flex gap-2">
           <button onClick={onShowUpgrades} className="vault-btn text-[10px]">Shop Upgrades</button>
           {isDossierUnlocked && (
              <button onClick={onShowSubmission} className="vault-btn text-[10px] bg-[#ffb000] text-black">Export Dossier</button>
           )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Inventory & Tools */}
        <div className="lg:col-span-1 space-y-4">
           <div className="vault-panel p-5">
              <h3 className="text-xs font-bold mb-4 uppercase border-b border-[#ffb000]/30 pb-2">Tool Collection</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Cardinal Compass', 'Technical Decryptor', 'Censorship Bypass', 'Spirit Lens', 'Mnemonic Charm'].map(tool => (
                  <div key={tool} className={`text-[9px] p-2 border flex items-center justify-center text-center leading-tight ${state.earnedTools.includes(tool) ? 'bg-[#ffb000] text-black border-white' : 'border-[#ffb000]/20 opacity-40'}`}>
                    {tool}
                  </div>
                ))}
              </div>
           </div>

           <div className="vault-panel p-5 bg-black/40">
              <h4 className="text-[10px] font-bold uppercase mb-2 text-[#ffb000]/50">Communication Log</h4>
              <div className="terminal-scrollbar max-h-40 overflow-y-auto space-y-1 font-mono text-[9px] opacity-60">
                 {state.log.slice().reverse().map((l, i) => (
                   <p key={i}>> {new Date(l.t).toLocaleTimeString()}: {l.type} - Data Pack {i + 1} Ready</p>
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Map Terminal */}
        <div className="lg:col-span-2 vault-panel p-2 relative min-h-[500px] overflow-hidden bg-black/50">
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'linear-gradient(#ffb000 1px, transparent 1px), linear-gradient(90deg, #ffb000 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
           
           {state.route.map((id) => {
             const s = STATIONS[id];
             const isCompleted = !!state.stationProgress[id]?.completedAt;
             const hasBenefit = s.benefitFromTool && state.earnedTools.includes(s.benefitFromTool);

             return (
               <div 
                key={id} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{left: `${s.x}%`, top: `${s.y}%`}}
               >
                 <button 
                  onClick={() => onStartStation(id)}
                  className={`relative w-12 h-12 flex items-center justify-center transition-all ${isCompleted ? 'text-white' : 'text-[#ffb000] hover:scale-125'}`}
                 >
                   <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full ${isCompleted ? 'fill-green-600' : 'fill-transparent stroke-current stroke-2'}`}>
                     <rect x="10" y="10" width="80" height="80" transform="rotate(45 50 50)" />
                   </svg>
                   <span className="relative z-10 text-[10px] font-bold uppercase">
                     {isCompleted ? '✓' : id.substring(0, 2)}
                   </span>
                   
                   {/* Tool Tip */}
                   <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-32 bg-black border border-[#ffb000] p-2 text-[9px] opacity-0 group-hover:opacity-100 z-50 pointer-events-none transition-opacity uppercase text-center">
                     <p className="font-bold mb-1">{s.title}</p>
                     <p className="opacity-60">{s.coreIdea}</p>
                     {hasBenefit && <p className="text-green-400 mt-1 font-bold">Tool Bonus Active</p>}
                   </div>

                   {hasBenefit && !isCompleted && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                   )}
                 </button>
               </div>
             );
           })}

           <div className="absolute bottom-4 right-4 text-[9px] font-mono opacity-30 text-right uppercase">
              Field Map 0.4.2<br/>Select node to begin recovery
           </div>
        </div>
      </div>

      {!isDossierUnlocked && (
        <div className="text-[10px] font-mono text-center uppercase tracking-widest opacity-40 animate-pulse">
           Stabilization protocol active. Dossier export locked until system integrity confirmed.
        </div>
      )}
    </div>
  );
};

export default MissionHub;
