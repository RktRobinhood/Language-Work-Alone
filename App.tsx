import React, { useState, useEffect, useCallback } from 'react';
import { GameState, StationId, LogEntry, GameStage } from './types';
import { STATIONS, PUZZLES, UPGRADES } from './constants';
import { SeededRNG } from './utils/rng';
import { sfx } from './utils/sfx';

// Components
import Layout from './components/Layout';
import StationView from './components/StationView';
import PuzzleModal from './components/PuzzleModal';
import MissionHub from './components/MissionHub';
import SubmissionPack from './components/SubmissionPack';
import TerminalUpgrades from './components/TerminalUpgrades';

const STORAGE_KEY = 'vault_tok_final_v5';
const MIN_WORK_TIME = 50 * 60; // 50 Minutes
const REVEAL_DATE = new Date("2026-01-19T10:30:00+01:00").getTime(); // Jan 19, 2026, 10:30 AM CET

const App: React.FC = () => {
  const [state, setState] = useState<GameState | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'station' | 'submission' | 'upgrades'>('dashboard');
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(PUZZLES[0]);
  const [isDossierUnlocked, setIsDossierUnlocked] = useState(false);

  // Verbose mounting for debugging
  useEffect(() => {
    console.log("[Vault Terminal] Handshaking with browser environment...");
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log("[Vault Terminal] Recovering existing profile...", parsed);
        setState(parsed);
      } catch (e) {
        console.error("[Vault Terminal] Session corruption detected. Re-initializing.", e);
        createNewSession();
      }
    } else {
      console.log("[Vault Terminal] No session found. Creating fresh inhabitant profile.");
      createNewSession();
    }
  }, []);

  const createNewSession = () => {
    const seed = `${Math.random().toString(36).substring(7)}-${Date.now()}`;
    const allIds = Object.keys(STATIONS) as StationId[];

    // Starting nodes (students start in different locations based on seed)
    const rng = new SeededRNG(seed);
    const shuffled = rng.shuffle(allIds);
    const initialNodes = [shuffled[0], shuffled[1]];

    const initialState: GameState = {
      seed,
      stage: GameStage.FIELD_RESEARCH,
      totalActiveTime: 0,
      discoveredNodes: initialNodes,
      earnedTools: [],
      currentStationId: null,
      stationProgress: {},
      xp: 0,
      clearanceLevel: 1,
      dataIntegrity: 100,
      log: [{ t: Date.now(), type: 'System Online', payload: { version: '0.5.1' } }],
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
        
        // Save frequently
        if (updated.totalActiveTime % 5 === 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }

        // Dossier Gate
        const isTimeMet = updated.totalActiveTime >= MIN_WORK_TIME;
        const isDateMet = Date.now() >= REVEAL_DATE;
        if ((isTimeMet || isDateMet) && !isDossierUnlocked) {
          console.log("[Vault Terminal] Research minimum met. Dossier Access Granted.");
          setIsDossierUnlocked(true);
        }

        // Random Lab Events
        if (Math.random() < 0.0007 && activeTab === 'dashboard' && !showPuzzle) {
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
    sfx.scan();
    console.log(`[Vault Terminal] Navigating to node: ${id}`);
    setState(prev => prev ? ({ ...prev, currentStationId: id }) : null);
    setActiveTab('station');
  };

  const handleCompleteStation = (stationId: StationId, answers: number[], draft: string, score: number) => {
    sfx.confirm();
    console.log(`[Vault Terminal] Node recovery successful: ${stationId}`);
    setState(prev => {
      if (!prev) return null;
      const boost = prev.unlockedUpgrades.includes('pip_boy') ? 1.15 : 1;
      const xpGain = 500 * boost;
      
      const station = STATIONS[stationId];
      const newTools = [...prev.earnedTools];
      if (station.rewardTool && !newTools.includes(station.rewardTool)) {
        newTools.push(station.rewardTool);
      }

      // Discover neighbors (Fog of War)
      const newlyDiscovered = station.neighbors.filter(n => !prev.discoveredNodes.includes(n));
      const updatedNodes = [...prev.discoveredNodes, ...newlyDiscovered];

      const newState = {
        ...prev,
        xp: prev.xp + Math.floor(xpGain),
        earnedTools: newTools,
        discoveredNodes: updatedNodes,
        stationProgress: {
          ...prev.stationProgress,
          [stationId]: { completedAt: Date.now(), draft, failedAttempts: 0, startTime: Date.now() }
        },
        currentStationId: null,
        clearanceLevel: Math.floor((prev.xp + xpGain) / 1000) + 1
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
    addLog('Area Explored', { node: stationId });
    setActiveTab('dashboard');
  };

  if (!state) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-0.5 bg-[#ffb000] animate-pulse mb-6"></div>
        <h1 className="text-2xl font-mono uppercase crt-text mb-4">Establishing Secure Connection...</h1>
        <p className="text-xs opacity-50 font-mono max-w-xs">Initializing Vault Terminal Handshake. Check your internet if this hangs.</p>
      </div>
    );
  }

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
              setState(prev => prev ? ({ ...prev, xp: prev.xp + 100 }) : null);
              addLog('Malfunction Fixed', { id: currentPuzzle.id });
            } else {
              sfx.error();
              setState(prev => prev ? ({ ...prev, dataIntegrity: Math.max(0, prev.dataIntegrity - 5) }) : null);
              addLog('Security Breach', { id: currentPuzzle.id });
            }
          }}
        />
      )}
    </Layout>
  );
};

export default App;