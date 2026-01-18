
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, StationId, LogEntry, GameStage } from './types';
import { STATIONS, PUZZLES, UPGRADES } from './constants';
import { SeededRNG } from './utils/rng';
import { sfx } from './utils/sfx';

// Helper components
import Layout from './components/Layout';
import StationView from './components/StationView';
import PuzzleModal from './components/PuzzleModal';
import MissionHub from './components/MissionHub';
import SubmissionPack from './components/SubmissionPack';
import TerminalUpgrades from './components/TerminalUpgrades';

const STORAGE_KEY = 'tok_lang_lab_clinical_v1';

const App: React.FC = () => {
  const [state, setState] = useState<GameState | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'station' | 'submission' | 'upgrades'>('dashboard');
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [currentPuzzle, setCurrentPuzzle] = useState(PUZZLES[0]);
  const [isInitialized, setIsInitialized] = useState(false);

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
    setIsInitialized(true);
  }, []);

  const createNewSession = () => {
    const seed = `${Math.random().toString(36).substring(7)}-${Date.now()}`;
    const rng = new SeededRNG(seed);
    const allIds = Object.keys(STATIONS) as StationId[];
    const route = rng.shuffle(allIds).slice(0, 6); 

    const initialState: GameState = {
      seed,
      stage: GameStage.ORIENTATION,
      totalActiveTime: 0,
      route,
      currentStationIndex: 0,
      stationProgress: {},
      xp: 0,
      clearanceLevel: 1,
      dataIntegrity: 100,
      log: [{ t: Date.now(), type: 'SESSION_INITIALIZED', payload: { seed } }],
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  const addLog = useCallback((type: string, payload: any) => {
    setState(prev => {
      if (!prev) return null;
      const newLog: LogEntry = { t: Date.now(), type, payload };
      return { ...prev, log: [...prev.log.slice(-10), newLog] };
    });
  }, []);

  const handleCompleteStation = (stationId: StationId, answers: number[], draft: string, score: number) => {
    sfx.confirm();
    setState(prev => {
      if (!prev) return null;
      const xpGain = 400 * (prev.unlockedUpgrades.includes('signal_boost') ? 1.2 : 1);
      const newXp = prev.xp + Math.floor(xpGain);
      const newClearance = Math.floor(newXp / 1200) + 1;
      
      const nextIndex = prev.currentStationIndex + 1;
      const nextStage = nextIndex >= prev.route.length ? GameStage.FINAL_SYNTHESIS : 
                        prev.stage === GameStage.ORIENTATION ? GameStage.FIELD_RESEARCH : prev.stage;

      return {
        ...prev,
        stage: nextStage,
        xp: newXp,
        clearanceLevel: newClearance,
        stationProgress: {
          ...prev.stationProgress,
          [stationId]: { completedAt: Date.now(), draft, failedAttempts: prev.stationProgress[stationId]?.failedAttempts || 0 }
        },
        currentStationIndex: nextIndex
      };
    });
    
    addLog('NODE_SECURED', { id: stationId });
    setActiveTab('dashboard');
  };

  const buyUpgrade = (id: string, cost: number) => {
    setState(prev => {
      if (!prev || prev.xp < cost) return prev;
      sfx.confirm();
      return {
        ...prev,
        xp: prev.xp - cost,
        unlockedUpgrades: [...prev.unlockedUpgrades, id],
        dataIntegrity: id === 'data_integrity' ? Math.min(100, prev.dataIntegrity + 20) : prev.dataIntegrity
      };
    });
  };

  if (!isInitialized || !state) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
           <p className="font-mono text-emerald-500 text-xs tracking-widest uppercase animate-pulse">Initializing Lab Interface...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout state={state} onNav={setActiveTab} activeTab={activeTab}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <MissionHub 
            state={state} 
            onStartStation={() => { sfx.scan(); setActiveTab('station'); }} 
            onShowUpgrades={() => { sfx.scan(); setActiveTab('upgrades'); }}
            onShowSubmission={() => { sfx.scan(); setActiveTab('submission'); }}
          />
        )}
        
        {activeTab === 'station' && state.currentStationIndex < state.route.length && (
          <StationView 
            station={STATIONS[state.route[state.currentStationIndex]]}
            onComplete={handleCompleteStation}
            onCancel={() => { sfx.error(); setActiveTab('dashboard'); }}
            state={state}
            onLog={addLog}
          />
        )}

        {activeTab === 'upgrades' && (
          <TerminalUpgrades 
            state={state} 
            onBuy={buyUpgrade} 
            onBack={() => { sfx.beep(300, 0.05); setActiveTab('dashboard'); }} 
          />
        )}

        {activeTab === 'submission' && (
          <SubmissionPack state={state} onBack={() => { sfx.beep(300, 0.05); setActiveTab('dashboard'); }} />
        )}
      </div>

      {showPuzzle && (
        <PuzzleModal 
          puzzle={currentPuzzle} 
          onClose={(success) => {
            setShowPuzzle(false);
            if (success) sfx.confirm(); else sfx.error();
          }}
        />
      )}
    </Layout>
  );
};

export default App;
