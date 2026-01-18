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

const STORAGE_KEY = 'vault_tok_final_v5_survival';
const MIN_WORK_TIME = 50 * 60; // 50 Minutes

const App: React.FC = () => {
  const [state, setState] = useState<GameState | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'station' | 'submission' | 'upgrades'>('dashboard');
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(PUZZLES[0]);
  const [isDossierUnlocked, setIsDossierUnlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (e) {
        createNewSession();
      }
    } else {
      createNewSession();
    }
  }, []);

  const createNewSession = () => {
    const seed = `${Math.random().toString(36).substring(7)}-${Date.now()}`;
    const allIds = Object.keys(STATIONS) as StationId[];
    const rng = new SeededRNG(seed);
    const shuffled = rng.shuffle(allIds);
    const initialNodes = [shuffled[0], shuffled[1]];
    const startNode = STATIONS[shuffled[0]];

    const initialState: GameState = {
      seed,
      stage: GameStage.FIELD_RESEARCH,
      totalActiveTime: 0,
      discoveredNodes: initialNodes,
      earnedTools: [],
      currentStationId: null,
      lastPosition: { x: startNode.x, y: startNode.y },
      stationProgress: {},
      xp: 0,
      clearanceLevel: 1,
      integrity: 100,
      fuel: 100,
      rations: 20,
      log: [{ t: Date.now(), type: 'System Online', payload: { version: '1.0.0' } }],
      unlockedUpgrades: []
    };
    
    setState(initialState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
  };

  useEffect(() => {
    if (!state) return;
    const interval = setInterval(() => {
      setState(prev => {
        if (!prev) return null;
        const updated = { ...prev, totalActiveTime: prev.totalActiveTime + 1 };
        
        if (updated.totalActiveTime % 10 === 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }

        const isTimeMet = updated.totalActiveTime >= MIN_WORK_TIME;
        if (isTimeMet && !isDossierUnlocked) {
          setIsDossierUnlocked(true);
        }

        if (Math.random() < 0.0005 && activeTab === 'dashboard' && !showPuzzle) {
          setCurrentPuzzle(PUZZLES[Math.floor(Math.random() * PUZZLES.length)]);
          setShowPuzzle(true);
        }

        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state, activeTab, isDossierUnlocked, showPuzzle]);

  const addLog = useCallback((type: string, payload: any) => {
    setState(prev => {
      if (!prev) return null;
      return { ...prev, log: [...prev.log.slice(-15), { t: Date.now(), type, payload }] };
    });
  }, []);

  const handleStartStation = (id: StationId) => {
    const station = STATIONS[id];
    const fuelCost = (station.fuelCost || 0) * (state?.unlockedUpgrades.includes('fuel_cell') ? 0.5 : 1);
    const rationCost = Math.max(0, (station.rationCost || 0) - (state?.unlockedUpgrades.includes('mre_pack') ? 1 : 0));

    if (state && (state.fuel < fuelCost || state.rations < rationCost)) {
      sfx.error();
      addLog('Insufficient Resources', { id });
      return;
    }

    sfx.scan();
    setState(prev => prev ? ({ 
      ...prev, 
      currentStationId: id,
      lastPosition: { x: station.x, y: station.y },
      fuel: prev.fuel - fuelCost,
      rations: prev.rations - rationCost
    }) : null);
    setActiveTab('station');
  };

  const handleCompleteStation = (stationId: StationId, answers: number[], draft: string, score: number) => {
    sfx.confirm();
    setState(prev => {
      if (!prev) return null;
      const boost = prev.unlockedUpgrades.includes('pip_boy') ? 1.15 : 1;
      const xpGain = 500 * boost;
      
      const station = STATIONS[stationId];
      const newlyDiscovered = station.neighbors.filter(n => !prev.discoveredNodes.includes(n));
      const updatedNodes = [...prev.discoveredNodes, ...newlyDiscovered];

      const newState = {
        ...prev,
        xp: prev.xp + Math.floor(xpGain),
        discoveredNodes: updatedNodes,
        stationProgress: {
          ...prev.stationProgress,
          [stationId]: { completedAt: Date.now(), draft, failedAttempts: 0, startTime: Date.now() }
        },
        currentStationId: null,
        clearanceLevel: Math.floor((prev.xp + xpGain) / 1000) + 1,
        rations: prev.rations + 2,
        fuel: Math.min(100, prev.fuel + 5)
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
    addLog('Node Stabilized', { node: stationId });
    setActiveTab('dashboard');
  };

  if (!state) return null;

  return (
    <Layout state={state} onNav={setActiveTab} activeTab={activeTab} isDossierUnlocked={isDossierUnlocked}>
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-8">
        {activeTab === 'dashboard' && (
          <MissionHub 
            state={state} 
            onStartStation={handleStartStation} 
            onShowUpgrades={() => setActiveTab('upgrades')}
            onShowSubmission={() => setActiveTab('submission')}
            isDossierUnlocked={isDossierUnlocked}
          />
        )}
        
        {activeTab === 'station' && state.currentStationId && (
          <StationView 
            station={STATIONS[state.currentStationId]}
            onComplete={handleCompleteStation}
            onCancel={() => { sfx.error(); setState(prev => prev ? ({ ...prev, currentStationId: null }) : null); setActiveTab('dashboard'); }}
            state={state}
            onLog={addLog}
            onUpdateState={(updater) => setState(prev => prev ? updater(prev) : null)}
          />
        )}

        {activeTab === 'upgrades' && (
          <TerminalUpgrades 
            state={state} 
            onBuy={(id, cost) => {
              setState(prev => prev ? ({ ...prev, xp: prev.xp - cost, unlockedUpgrades: [...prev.unlockedUpgrades, id] }) : null);
              sfx.confirm();
            }} 
            onBack={() => setActiveTab('dashboard')} 
          />
        )}

        {activeTab === 'submission' && (
          <SubmissionPack state={state} onBack={() => setActiveTab('dashboard')} />
        )}
      </div>

      {showPuzzle && (
        <PuzzleModal 
          puzzle={currentPuzzle} 
          onClose={(success) => {
            setShowPuzzle(false);
            if (success) {
              sfx.confirm();
              const r = currentPuzzle.reward;
              setState(prev => prev ? ({ 
                ...prev, 
                xp: prev.xp + (r.xp || 0),
                fuel: Math.min(100, prev.fuel + (r.fuel || 0)),
                rations: prev.rations + (r.rations || 0),
                integrity: Math.min(100, prev.integrity + (r.integrity || 0))
              }) : null);
            } else {
              sfx.error();
              setState(prev => prev ? ({ ...prev, integrity: Math.max(0, prev.integrity - 10) }) : null);
            }
          }}
        />
      )}
    </Layout>
  );
};

export default App;