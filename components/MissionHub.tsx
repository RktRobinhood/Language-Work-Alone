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
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in duration-500">
      <div className="border-b-2 border-[#ffb000] pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold crt-text mb-1 uppercase tracking-tighter">Vault Communications Hub</h2>
          <div className="flex flex-wrap gap-2 md:gap-4 text-[10px] md:text-[11px] font-mono text-[#ffb000]/60 uppercase">
             <span>Vault: 76-TOK</span>
             <span>ID: {state.seed.substring(0, 8)}</span>
             <span>Nodes Found: {state.discoveredNodes.length} / {Object.keys(STATIONS).length}</span>
             <span>Stability: {state.dataIntegrity}%</span>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button onClick={onShowUpgrades} className="vault-btn text-[9px] flex-1">Shop Upgrades</button>
           {isDossierUnlocked && (
              <button onClick={onShowSubmission} className="vault-btn text-[9px] flex-1 bg-[#ffb000] text-[#0a0a0a]">Export Dossier</button>
           )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        {/* Inventory & Tools */}
        <div className="lg:col-span-1 space-y-6">
           <div className="vault-panel p-5">
              <h3 className="text-xs font-bold mb-4 uppercase border-b border-[#ffb000]/30 pb-2">Technical Inventory</h3>
              <div className="grid grid-cols-2 gap-2">
                {['Compass of Relativity', 'Animacy Lens', 'Technical Decryptor', 'Censorship Bypass', 'Universal Key', 'Nuance Filter', 'Mnemonic Rhythm', 'Archive Key', 'Etiquette Manual', 'Map Overlay', 'Diagnostic Patch', 'Irony Detector'].map(tool => {
                  const hasIt = state.earnedTools.includes(tool);
                  return (
                    <div key={tool} className={`text-[9px] p-2 border flex items-center justify-center text-center leading-tight transition-all duration-700 ${hasIt ? 'bg-[#ffb000] text-[#0a0a0a] border-white' : 'border-[#ffb000]/10 opacity-10'}`}>
                      {tool}
                    </div>
                  );
                })}
              </div>
           </div>

           <div className="vault-panel p-5 bg-black/40 hidden md:block">
              <h4 className="text-[10px] font-bold uppercase mb-3 text-[#ffb000]/40">Internal Communications</h4>
              <div className="terminal-scrollbar max-h-40 overflow-y-auto space-y-1.5 font-mono text-[9px] opacity-60">
                 {state.log.slice().reverse().map((l, i) => (
                   <p key={i}>> {new Date(l.t).toLocaleTimeString()}: {l.type}</p>
                 ))}
              </div>
           </div>
        </div>

        {/* Map - Fog of War logic */}
        <div className="lg:col-span-2 vault-panel p-2 relative min-h-[450px] md:min-h-[550px] overflow-hidden bg-black/80">
           {/* Map Grid Background */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage: 'linear-gradient(#ffb000 1px, transparent 1px), linear-gradient(90deg, #ffb000 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
           
           {Object.values(STATIONS).map((s) => {
             const isDiscovered = state.discoveredNodes.includes(s.id);
             const isCompleted = !!state.stationProgress[s.id]?.completedAt;
             const hasBenefit = s.benefitFromTool && state.earnedTools.includes(s.benefitFromTool);

             // Hidden node
             if (!isDiscovered) return (
                <div key={s.id} className="absolute w-1.5 h-1.5 bg-[#ffb000]/10 rounded-full transform -translate-x-1/2 -translate-y-1/2" style={{left: `${s.x}%`, top: `${s.y}%`}}></div>
             );

             return (
               <div 
                key={s.id} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{left: `${s.x}%`, top: `${s.y}%`}}
               >
                 <button 
                  onClick={() => onStartStation(s.id)}
                  className={`relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300 ${isCompleted ? 'scale-90 opacity-40' : 'hover:scale-125 node-active'}`}
                 >
                   <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full transition-colors ${isCompleted ? 'fill-green-900/50 stroke-green-500' : 'fill-transparent stroke-current stroke-2 text-[#ffb000]'}`}>
                     <rect x="15" y="15" width="70" height="70" transform="rotate(45 50 50)" />
                   </svg>
                   <span className="relative z-10 text-[9px] md:text-[10px] font-bold uppercase crt-text">
                     {isCompleted ? 'OK' : s.id.substring(0, 3)}
                   </span>
                   
                   {/* Info Hover (hidden on tiny screens) */}
                   <div className="hidden md:block absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-[#0a0a0a] border border-[#ffb000] p-3 text-[10px] opacity-0 group-hover:opacity-100 z-50 pointer-events-none transition-opacity uppercase shadow-2xl">
                     <p className="font-bold mb-1.5 border-b border-[#ffb000]/20 pb-1">{s.title}</p>
                     <p className="opacity-70 normal-case mb-2 leading-tight">{s.coreIdea}</p>
                     {s.rewardTool && <p className="text-cyan-500 text-[8px] mt-1 italic">Reward: {s.rewardTool}</p>}
                     {hasBenefit && !isCompleted && <p className="text-green-400 text-[8px] mt-1 font-bold">Optimization Active</p>}
                   </div>

                   {hasBenefit && !isCompleted && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500/30 rounded-full animate-ping"></div>
                   )}
                 </button>
               </div>
             );
           })}

           <div className="absolute bottom-6 left-6 text-[9px] md:text-[10px] font-mono opacity-20 uppercase tracking-[0.3em]">
              Explorer Mode Active
           </div>
        </div>
      </div>

      {!isDossierUnlocked && (
        <div className="mt-4 md:mt-8 text-[10px] md:text-[11px] font-mono text-center uppercase tracking-widest opacity-30 animate-pulse px-4">
           Complete 50 minutes of discovery to unlock final research dossier export.
        </div>
      )}
    </div>
  );
};

export default MissionHub;