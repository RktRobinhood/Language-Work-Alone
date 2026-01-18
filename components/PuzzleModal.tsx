
import React, { useState, useEffect } from 'react';
import { Puzzle } from '../types';
import { sfx } from '../utils/sfx';

interface PuzzleModalProps {
  puzzle: Puzzle;
  onClose: (success: boolean) => void;
}

const PuzzleModal: React.FC<PuzzleModalProps> = ({ puzzle, onClose }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    sfx.glitch();
  }, []);

  const handleSubmit = () => {
    if (input.toLowerCase().trim() === puzzle.solution.toLowerCase()) {
      onClose(true);
    } else {
      sfx.error();
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  const handleSkip = () => {
    sfx.nav();
    onClose(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" />
      <div className={`relative w-full max-w-sm bg-slate-900 border-2 ${error ? 'border-red-500 animate-shake' : 'border-sky-500'} p-6 rounded-lg shadow-2xl transition-all`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-sky-500/20 rounded flex items-center justify-center text-sky-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-sky-400">LAB MALFUNCTION</h2>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Logic Gate Override Required</p>
          </div>
        </div>

        <p className="text-sm font-mono text-slate-300 mb-6 bg-slate-950 p-4 rounded border border-slate-800">
          {puzzle.prompt}
        </p>

        <input 
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ENTER OVERRIDE CODE"
          className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-center font-mono focus:border-sky-500 outline-none text-sky-400 uppercase mb-4"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

        <div className="flex gap-2">
           <button 
            onClick={handleSubmit}
            className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded transition-all"
          >
            VALIDATE
          </button>
           <button 
            onClick={handleSkip}
            className="px-4 bg-slate-800 text-slate-400 font-bold rounded hover:bg-slate-700"
          >
            SKIP
          </button>
        </div>
        
        <p className="text-[10px] text-center text-slate-600 mt-4 uppercase font-mono">
          Reward: {puzzle.reward} | Failure Penalty: Reputation Loss
        </p>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s linear infinite; }
      `}</style>
    </div>
  );
};

export default PuzzleModal;
