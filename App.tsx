
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, StationId, LogEntry, GameStage } from './types.ts';
import { STATIONS, PUZZLES, UPGRADES, LINGUISTIC_JOKES } from './constants.tsx';
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

const STORAGE_KEY = 'vault_tok_v16_narrative_stable';
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

  const generateNarrativeLog = (stationId: StationId, success: boolean, roll: number) => {
    const station = STATIONS[stationId];
    const languages = ["Spanish", "French", "German", "Japanese", "Mandarin", "Arabic", "Portuguese"];
    const lang = languages[Math.floor(Math.random() * languages.length)];
    
    if (success) {
      const successMsgs = [
        `[BRIDGE_OK] : Node [${station.title}] semantic map verified. Source node confirms: "Completado" (${lang}).`,
        `[RECON_SUCCESS] : Roll ${roll} bypassed cognitive barriers. The ${lang} echoes of the past are no longer noise, but signal.`,
        `[SYNC_DONE] : [${station.title}] data successfully integrated. Investigator Note: "C'est magnifique!"`,
        `[DATA_EXTRACT] : You've extracted the hidden TOK logic from [${station.title}]. The network expands.`
      ];
      addLog('STORY', successMsgs[Math.floor(Math.random() * successMsgs.length)]);
    } else {
      const failMsgs = [
        `[BLEED_ERROR] : [${station.title}] translation failed. Neural echo in ${lang}: "Das ist nicht gut." -20 Integrity.`,
        `[SYNC_FAIL] : Roll ${roll} too low. Meaning slipped through your fingers like a ghost in the machine.`,
        `[PARADOX_DET] : Cultural bias triggered a logic loop at [${station.title}]. Connection dropped.`,
        `[FAILSAFE] : Your attempt to bridge [${station.title}] resulted in a "faux pas" of neural proportions.`
      ];
      addLog('ANOMALY', failMsgs[Math.floor(Math.random() * failMsgs.length)]);
    }
  };

  const createNewSession = useCallback(() => {
    const seed = `${Math.random().toString(36).substring(7)}-${Date.now()}`;
    const allIds = Object.keys(STATIONS) as StationId[];
    const rng = new SeededRNG(seed);
    const shuffled = rng.shuffle([...allIds]);
    
    const prereqs: Record<string, StationId> = {};
    const startingNodes = [shuffled[0], shuffled[1], shuffled[2]];
    
    const pathPool = [...startingNodes];
    for (let i = 3; i < shuffled.length; i++) {
      const randomPre = pathPool[Math.floor(rng.next() * pathPool.length)];
      prereqs[shuffled[i]] = randomPre;
      pathPool.push(shuffled[i]);
    }

    const initialState: GameState = {
      seed,
      stage: GameStage.FIELD_RESEARCH,
      totalActiveTime: 0,
      clearanceLevel: 1,
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
      researchLog: [{ t: Date.now(), type: 'STORY', msg: 'Animus sequence initiated. Investigator initialized. "El mapa no es el territorio." 3 entry nodes discovered.' }],
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
        if (parsed && !parsed.clearanceLevel) parsed.clearanceLevel = 1;
        if (!parsed.discoveredNodes || !parsed.nodePrerequisites) throw new Error("Incomplete state");
        setState(parsed);
      } catch (e) {
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, [createNewSession]);

  useEffect(() => {
    if (!state || state.stage === GameStage.COMPLETE) return;
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const joke = LINGUISTIC_JOKES[Math.floor(Math.random() * LINGUISTIC_JOKES.length)];
        addLog('STORY', `[VOX_OVERRIDE]: ${joke}`);
        
        if (Math.random() > 0.6 && !showPuzzle) {
          setCurrentPuzzle(PUZZLES[Math.floor(Math.random() * PUZZLES.length)]);
          setShowPuzzle(true);
          addLog('SYSTEM', 'Logic Malfunction detected. Neural recalibration required.');
        }
      }
    }, 40000);
    return () => clearInterval(interval);
  }, [state, showPuzzle, addLog]);

  useEffect(() => {
    if (!state) return;
    if (state.integrity <= 0 && !showDeathScreen) {
      setShowDeathScreen(true);
      sfx.glitch();
      addLog('ANOMALY', 'NEURAL_COLLAPSE: Critical desynchronization. Purging volatile memory.');
    }
  }, [state?.integrity, showDeathScreen, addLog]);

  const handleStartStation = (id: StationId) => {
    if (!state) return;
    const isDecrypted = state.decryptedNodes.includes(id);
    if (!isDecrypted) {
      sfx.error();
      sfx.glitch();
      const pre = state.nodePrerequisites[id];
      const mix = `[ACCESS_DENIED] : Handshake Error. NECESITAS la llave de [${STATIONS[pre]?.title.toUpperCase() || 'ROOT'}]. 请先同步. Vous devez stabiliser le pont d'abord. Access forbidden!`;
      addLog('ANOMALY', mix);
      return;
    }

    const station = STATIONS[id];
    const fuelCost = (station.fuelCost || 10) * (state.unlockedUpgrades.includes('fuel_cell') ? 0.5 : 1);
    const rationCost = Math.max(0, (station.rationCost || 2) - (state.unlockedUpgrades.includes('mre_pack') ? 1 : 0));

    if (state.fuel < fuelCost || state.rations < rationCost) {
      sfx.error();
      addLog('RESEARCH', '[SYS_WARN] : Insufficient neural energy. Feed the Animus or rest.');
      return;
    }

    addLog('STORY', `[PROJECTING] : Linking to ${station.title}. Maintaining focus...`);
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
    generateNarrativeLog(stationId, success, roll);

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
        fuel: Math.min(100, prev.fuel + (success ? 10 : 2)),
        clearanceLevel: Math.floor(completedIds.length / 3) + 1
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      return nextState;
    });
    setActiveTab('dashboard');
  };

  if (!state) return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#050505] text-[#ffb000] p-10 text-center">
      <div className="w-12 h-12 border-4 border-t-[#ffb000] border-[#ffb000]/10 rounded-full animate-spin mb-6 shadow-[0_0_20px_#ffb00033]"></div>
      <h2 className="text-xl font-bold uppercase tracking-[0.3em] mb-2 crt-text animate-pulse">Establishing Neural Link</h2>
      <p className="text-[9px] font-mono opacity-40 uppercase tracking-[0.5em]">Hydrating Memory Corridors...</p>
      <div className="mt-8 text-[7px] opacity-20 font-mono uppercase">
        Checking clearance level... OK <br/>
        Validating encryption... OK <br/>
        Syncing with Laboratory Feed...
      </div>
    </div>
  );

  const stabilizedCount = Object.keys(state.stationProgress).length;

  return (
    <Layout state={state} onNav={setActiveTab} activeTab={activeTab} stabilizedCount={stabilizedCount}>
      <div className="h-full flex flex-col relative">
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
