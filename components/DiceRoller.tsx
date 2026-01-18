
import React, { useState, useEffect } from 'react';
import { sfx } from '../utils/sfx.ts';

interface DiceRollerProps {
  dc: number;
  onResult: (roll: number) => void;
}

const DiceRoller: React.FC<DiceRollerProps> = ({ dc, onResult }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [currentValue, setCurrentValue] = useState(1);
  const [finalValue, setFinalValue] = useState<number | null>(null);

  const startRoll = () => {
    if (isRolling || finalValue !== null) return;
    setIsRolling(true);
    sfx.scan();
    
    let rolls = 0;
    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 20) + 1);
      rolls++;
      if (rolls > 20) {
        clearInterval(interval);
        const result = Math.floor(Math.random() * 20) + 1;
        setFinalValue(result);
        setIsRolling(false);
        if (result >= dc) sfx.confirm(); else sfx.error();
      }
    }, 60);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-12 py-10 px-6">
      <div className="text-center space-y-2">
        <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-40">Roll for Epistemic Stability</h2>
        <div className="text-4xl font-black text-[#ffb000]">DC {dc}</div>
      </div>

      <div 
        className={`w-32 h-32 flex items-center justify-center border-4 rotate-45 transition-all duration-300 ${
          finalValue === null ? 'border-[#ffb000]/40' : 
          finalValue >= dc ? 'border-green-500 bg-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.5)] scale-110' : 
          'border-red-500 bg-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.5)]'
        }`}
      >
        <div className="-rotate-45 flex flex-col items-center">
           <span className={`text-6xl font-black ${isRolling ? 'animate-pulse' : ''}`}>
            {currentValue}
          </span>
          {finalValue !== null && (
             <span className="text-[8px] font-bold uppercase mt-1">
               {finalValue >= dc ? 'Critical Success' : 'Paradox Triggered'}
             </span>
          )}
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        {finalValue === null ? (
          <button 
            onClick={startRoll}
            disabled={isRolling}
            className="w-full py-5 bg-[#ffb000] text-black font-black uppercase tracking-widest text-sm hover:bg-white active:scale-95 transition-all disabled:opacity-30 shadow-[0_0_30px_rgba(255,176,0,0.2)]"
          >
            {isRolling ? 'SYNCING...' : 'ROLL D20'}
          </button>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center">
              {finalValue >= dc ? (
                <p className="text-green-500 font-bold uppercase tracking-widest animate-bounce">Neural Stability: VERIFIED</p>
              ) : (
                <p className="text-red-500 font-bold uppercase tracking-widest animate-pulse">Epistemic Fail: DISSONANCE</p>
              )}
            </div>
            <button 
              onClick={() => onResult(finalValue)}
              className="w-full py-4 border-2 border-[#ffb000] text-[#ffb000] font-bold uppercase tracking-widest text-xs hover:bg-[#ffb000] hover:text-black transition-all"
            >
              Commit Synthesis
            </button>
          </div>
        )}
      </div>

      <div className="text-[7px] opacity-20 uppercase tracking-widest text-center px-4 leading-relaxed">
        Stability Check (D20): You must match or exceed the Difficulty Class (DC). Results are logged in the persistent Research Archive.
      </div>
    </div>
  );
};

export default DiceRoller;
