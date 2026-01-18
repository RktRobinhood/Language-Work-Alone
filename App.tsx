
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

const STORAGE_KEY = 'vault_tok_v9_sync';
const SYNC_THRESHOLD = 6; // Nodes needed for endgame

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
    
    const prereqs: Record<string, StationId> = {};
    for (let i = 2; i < shuffled.length; i++) {
      const randomPre = shuffled[Math.floor(rng.next() * i)];
      prereqs[shuffled[i]] = randomPre;
    }

    const initialState: GameState = {
      seed,
      stage: GameStage.FIELD_RESEARCH,
      totalActiveTime: 0,
      discoveredNodes: [shuffled[0], shuffled[1]],
      decryptedNodes: [shuffled[0], shuffled[1]],
      nodePrerequisites: prereqs,
      currentStationId: null,
      lastPosition: { x: STATIONS[shuffled[0]].x, y: STATIONS[shuffled[0]].y },
      stationProgress: {},
      xp: 0,
      syncRate: 0,
      integrity: 100,
      fuel: 100,
      rations: 20,
      researchLog: [{ t: Date.now(), type: 'STORY', msg: 'The Animus awakens. You are in the "Language Lab" memory cluster. Synchronization at 0%. Locate the first morphology node.' }],
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
        // Migration check
        if (!parsed.syncRate && parsed.syncRate !== 0) parsed.syncRate = 0;
        setState(parsed);
      } catch (e) {
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
      addLog('STORY', 'DESYNCHRONIZATION COMPLETE. Your linguistic core has been purged. Re-entering memory corridor...');
    }
  }, [state?.integrity, showDeathScreen, addLog]);

  const handleStartStation = (id: StationId) => {
    if (!state) return;
    const isDecrypted = state.decryptedNodes.includes(id);
    if (!isDecrypted) {
      sfx.error();
      addLog('ANOMALY', 'Memory block encrypted. Stabilize prerequisite nodes to unlock this linguistic cluster.');
      return;
    }

    const station = STATIONS[id];
    const fuelCost = (station.fuelCost || 10) * (state.unlockedUpgrades.includes('fuel_cell') ? 0.5 : 1);
    const rationCost = Math.max(0, (station.rationCost || 2) - (state.unlockedUpgrades.includes('mre_pack') ? 1 : 0));

    if (state.fuel < fuelCost || state.rations < rationCost) {
      sfx.error();
      addLog('RESEARCH', 'Low Sync Fuel. Your consciousness cannot maintain the projection of this location.');
      return;
    }

    addLog('STORY', `Syncing with memory cluster: ${station.title}. Hold steady.`);
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
    const station = STATIONS[stationId];
    const success = roll >= finalDC;
    
    if (success) {
      sfx.confirm();
      addLog('STORY', `SYNC SUCCESS: Memory Fragment ${roll} matched the sequence. Data stream: OK.`);
    } else {
      sfx.error();
      addLog('STORY', `SYNC FAILED: Data corruption in roll ${roll}. Desynchronization penalty applied.`);
    }

    setState(prev => {
      if (!prev) return null;
      const boost = (prev.unlockedUpgrades.includes('pip_boy') ? 1.25 : 1) * rewardMod;
      const baseXP = success ? 500 : 200;
      const xpGain = baseXP * boost;
      const neighbors = station.neighbors;
      const integrityLoss = success ? 0 : 20;

      const newDiscovered = Array.from(new Set([...prev.discoveredNodes, ...neighbors]));
      const completedIds = [...Object.keys(prev.stationProgress), stationId];
      const newlyDecrypted = newDiscovered.filter(id => {
        const prereq = prev.nodePrerequisites[id];
        return !prereq || completedIds.includes(prereq);
      });

      const updatedProgress = {
        ...prev.stationProgress,
        [stationId]: { completedAt: Date.now(), draft, rollResult: roll }
      };

      const newSyncRate = Math.min(100, (Object.keys(updatedProgress).length / 12) * 100);

      return {
        ...prev,
        xp: prev.xp + Math.floor(xpGain),
        syncRate: newSyncRate,
        integrity: Math.max(0, prev.integrity - integrityLoss),
        discoveredNodes: newDiscovered,
        decryptedNodes: Array.from(new Set([...prev.decryptedNodes, ...newlyDecrypted])),
        stationProgress: updatedProgress,
        currentStationId: null,
        rations: prev.rations + (success ? 4 : 1),
        fuel: Math.min(100, prev.fuel + (success ? 10 : 2))
      };
    });
    setActiveTab('dashboard');
  };

  if (!state) return null;

  const stabilizedCount = Object.keys(state.stationProgress).length;

  return (
    <>
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
                setState(prev => prev ? ({ ...prev, xp: prev.xp - cost, unlockedUpgrades: [...prev.unlockedUpgrades, id] }) : null);
                addLog('ACHIEVEMENT', `Animus Upgrade Configured: ${UPGRADES.find(u => u.id === id)?.name}`);
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
                setState(prev => prev ? ({ ...prev, stage: GameStage.COMPLETE, syncRate: sync }) : null);
                setActiveTab('submission');
                addLog('SYNC', `FINAL SYNCHRONIZATION COMPLETE. Global Sync Rate: ${sync}%. Saving to history.`);
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
                addLog('STORY', 'Memory corridor bypass successful. Integrity reinforced.');
                const r = currentPuzzle.reward;
                setState(prev => prev ? ({ 
                  ...prev, 
                  xp: prev.xp + (r.xp || 0),
                  fuel: Math.min(100, prev.fuel + (r.fuel || 0)),
                  integrity: Math.min(100, prev.integrity + (r.integrity || 0))
                }) : null);
              } else {
                addLog('STORY', 'Bypass failed. Desynchronization shockwave detected.');
                setState(prev => prev ? ({ ...prev, integrity: Math.max(0, prev.integrity - 10) }) : null);
              }
            }}
          />
        )}
      </Layout>
      {showDeathScreen && <DeathScreen onReset={createNewSession} />}
    </>
  );
};

export default App;
