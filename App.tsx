
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, StationId, LogEntry, GameStage } from './types.ts';
import { STATIONS, PUZZLES, UPGRADES } from './constants.tsx';
import { SeededRNG } from './utils/rng.ts';
import { sfx } from './utils/sfx.ts';

// Components
import Layout from './components/Layout.tsx';
import StationView from './components/StationView.tsx';
import PuzzleModal from './components/PuzzleModal.tsx';
import MissionHub from './components/MissionHub.tsx';
import SubmissionPack from './components/SubmissionPack.tsx';
import TerminalUpgrades from './components/TerminalUpgrades.tsx';
import DeathScreen from './components/DeathScreen.tsx';
import FinalSynthesis from './components/FinalSynthesis.tsx';

const STORAGE_KEY = 'vault_tok_v12_final';
const SYNC_THRESHOLD = 6; 

const App: React.FC = () => {
  const [state, setState] = useState<GameState | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'station' | 'submission' | 'upgrades' | 'endgame'>('dashboard');
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(PUZZLES[0]);
  const [showDeathScreen, setShowDeathScreen] = useState(false);

  const addLog = useCallback((type: LogEntry['type'], msg: string) => {
    setState(prev => {
      if (!prev) return null;
      const newEntry: LogEntry = { t: Date.now(), type, msg };
      return { ...prev, researchLog: [...prev.researchLog, newEntry] };
    });
  }, []);

  const createNewSession = useCallback(() => {
    const seed = `${Math.random().toString(36).substring(7)}-${Date.now()}`;
    const allIds = Object.keys(STATIONS) as StationId[];
    const rng = new SeededRNG(seed);
    const shuffled = rng.shuffle([...allIds]);
    
    // Prerequisite logic: Guarantee starting path
    const prereqs: Record<string, StationId> = {};
    const startingNodes = [shuffled[0], shuffled[1], shuffled[2]];
    
    // Every node from index 3 onwards must have a prereq from the pool of nodes that came BEFORE it
    for (let i = 3; i < shuffled.length; i++) {
      const randomPre = shuffled[Math.floor(rng.next() * i)];
      prereqs[shuffled[i]] = randomPre;
    }

    const initialState: GameState = {
      seed,
      stage: GameStage.FIELD_RESEARCH,
      totalActiveTime: 0,
      discoveredNodes: startingNodes,
      decryptedNodes: startingNodes,
      nodePrerequisites: prereqs,
      currentStationId: null,
      lastPosition: { x: STATIONS[shuffled[0]].x, y: STATIONS[shuffled[0]].y },
      stationProgress: {},
      xp: 0,
      syncRate: 0,
      integrity: 100,
      fuel: 100,
      rations: 20,
      researchLog: [{ t: Date.now(), type: 'STORY', msg: 'Animus sequence initiated. "El mapa no es el territorio." 3 entry nodes decrypted. Use the network map to bridge semantic gaps.' }],
      unlockedUpgrades: []
    };
    
    setState(initialState);
    setShowDeathScreen(false);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.discoveredNodes || !parsed.nodePrerequisites) throw new Error("Incomplete save state");
        setState(parsed);
      } catch (e) {
        console.error("Critical error in save state. Purging memory...", e);
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, [createNewSession]);

  useEffect(() => {
    if (!state) return;
    if (state.integrity <= 0 && !showDeathScreen) {
      setShowDeathScreen(true);
      sfx.glitch();
      addLog('STORY', 'NEURAL COLLAPSE DETECTED. Desynchronization complete.');
    }
  }, [state?.integrity, showDeathScreen, addLog]);

  const handleStartStation = (id: StationId) => {
    if (!state) return;
    const isDecrypted = state.decryptedNodes.includes(id);
    if (!isDecrypted) {
      sfx.error();
      const pre = state.nodePrerequisites[id];
      addLog('ANOMALY', `FAILED: Memory encrypted. Requires decryption key from [${STATIONS[pre]?.title.toUpperCase() || 'ROOT'}].`);
      return;
    }

    const station = STATIONS[id];
    const fuelCost = (station.fuelCost || 10) * (state.unlockedUpgrades.includes('fuel_cell') ? 0.5 : 1);
    const rationCost = Math.max(0, (station.rationCost || 2) - (state.unlockedUpgrades.includes('mre_pack') ? 1 : 0));

    if (state.fuel < fuelCost || state.rations < rationCost) {
      sfx.error();
      addLog('RESEARCH', 'Low neural fuel. Sync aborted.');
      return;
    }

    addLog('STORY', `Syncing with cluster: ${station.title}. Hold steady.`);
    sfx.scan();
    setState(prev => prev ? ({ 
      ...prev, 
      currentStationId: id,
      fuel: prev.fuel - fuelCost,
      rations: prev.rations - rationCost
    }) : null);
    setActiveTab('station');
  };

  const handleCompleteStation = (stationId: StationId, roll: number, draft: string, finalDC: number, rewardMod: number) => {
    const success = roll >= finalDC;
    
    if (success) {
      sfx.confirm();
      addLog('STORY', `SYNC OK: Roll ${roll} verified sequence. Bridge established.`);
    } else {
      sfx.error();
      addLog('STORY', `SYNC ERROR: Roll ${roll} failed. Neural scarring detected.`);
    }

    setState(prev => {
      if (!prev) return null;
      const boost = (prev.unlockedUpgrades.includes('pip_boy') ? 1.25 : 1) * rewardMod;
      const baseXP = success ? 500 : 200;
      const neighbors = STATIONS[stationId].neighbors;
      const updatedProgress = {
        ...prev.stationProgress,
        [stationId]: { completedAt: Date.now(), draft, rollResult: roll }
      };

      const newDiscovered = Array.from(new Set([...prev.discoveredNodes, ...neighbors]));
      const completedIds = Object.keys(updatedProgress);
      const newlyDecrypted = newDiscovered.filter(id => {
        const prereq = prev.nodePrerequisites[id];
        return !prereq || completedIds.includes(prereq);
      });

      const nextState: GameState = {
        ...prev,
        xp: prev.xp + Math.floor(baseXP * boost),
        syncRate: Math.min(100, Math.floor((completedIds.length / 12) * 100)),
        integrity: Math.max(0, prev.integrity - (success ? 0 : 20)),
        discoveredNodes: newDiscovered,
        decryptedNodes: Array.from(new Set([...prev.decryptedNodes, ...newlyDecrypted])),
        stationProgress: updatedProgress,
        currentStationId: null,
        rations: prev.rations + (success ? 4 : 1),
        fuel: Math.min(100, prev.fuel + (success ? 10 : 2))
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      return nextState;
    });
    setActiveTab('dashboard');
  };

  if (!state) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black text-[#ffb000]">
      <div className="w-10 h-10 border-2 border-t-[#ffb000] border-[#ffb000]/20 rounded-full animate-spin mb-4"></div>
      <p className="text-[10px] font-mono animate-pulse uppercase tracking-widest">Hydrating Memory Corridors...</p>
    </div>
  );

  const stabilizedCount = Object.keys(state.stationProgress).length;

  return (
    <Layout state={state} onNav={setActiveTab} activeTab={activeTab} stabilizedCount={stabilizedCount}>
      <div className="h-full flex flex-col">
        {activeTab === 'dashboard' && (
          <MissionHub 
            state={state} 
            onStartStation={handleStartStation} 
            onShowEndgame={() => setActiveTab('endgame')}
            isEndgameUnlocked={stabilizedCount >= SYNC_THRESHOLD}
          />
        )}
        
        {activeTab === 'station' && state.currentStationId && (
          <StationView 
            station={STATIONS[state.currentStationId]}
            onComplete={handleCompleteStation}
            onCancel={() => { sfx.error(); setState(prev => prev ? ({ ...prev, currentStationId: null }) : null); setActiveTab('dashboard'); }}
            state={state}
            onUpdateState={(updater) => setState(prev => prev ? updater(prev) : null)}
            addLog={addLog}
          />
        )}

        {activeTab === 'upgrades' && (
          <TerminalUpgrades 
            state={state} 
            onBuy={(id, cost) => {
              const nextState = { ...state, xp: state.xp - cost, unlockedUpgrades: [...state.unlockedUpgrades, id] };
              setState(nextState);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
              sfx.confirm();
            }} 
            onBack={() => setActiveTab('dashboard')} 
          />
        )}

        {activeTab === 'submission' && (
          <SubmissionPack state={state} onBack={() => setActiveTab('dashboard')} />
        )}

        {activeTab === 'endgame' && (
          <FinalSynthesis 
            state={state} 
            onSyncFinish={(sync) => {
              const nextState = { ...state, stage: GameStage.COMPLETE, syncRate: sync };
              setState(nextState);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
              setActiveTab('submission');
            }}
            onIntegrityLoss={(amt) => setState(prev => prev ? ({ ...prev, integrity: Math.max(0, prev.integrity - amt) }) : null)}
          />
        )}
      </div>

      {showPuzzle && (
        <PuzzleModal 
          puzzle={currentPuzzle} 
          onClose={(success) => {
            setShowPuzzle(false);
            if (success) {
              const r = currentPuzzle.reward;
              setState(prev => prev ? ({ ...prev, xp: prev.xp + (r.xp || 0), integrity: Math.min(100, prev.integrity + (r.integrity || 0)) }) : null);
            }
          }}
        />
      )}

      {showDeathScreen && <DeathScreen onReset={createNewSession} />}
    </Layout>
  );
};

export default App;
