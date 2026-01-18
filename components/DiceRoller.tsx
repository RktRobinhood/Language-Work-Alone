
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
    <div className="h-full flex flex-col items-center justify-center space-y-12 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-xs uppercase tracking-[0.4em] opacity-40">Roll for Epistemic Stability</h2>
        <div className="text-3xl font-bold text-[#ffb000]">DC {dc}</div>
      </div>

      <div 
        className={`w-32 h-32 flex items-center justify-center border-4 rotate-45 transition-all duration-300 ${
          finalValue === null ? 'border-[#ffb000]/40' : 
          finalValue >= dc ? 'border-green-500 bg-green-500/10 shadow-[0_0_40px_rgba(34,197,94,0.3)]' : 
          'border-red-500 bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.3)]'
        }`}
      >
        <span className={`-rotate-45 text-5xl font-black ${isRolling ? 'animate-pulse' : ''}`}>
          {currentValue}
        </span>
      </div>

      <div className="w-full max-w-xs space-y-4">
        {finalValue === null ? (
          <button 
            onClick={startRoll}
            disabled={isRolling}
            className="w-full py-5 bg-[#ffb000] text-black font-black uppercase tracking-widest text-sm hover:bg-white active:scale-95 transition-all disabled:opacity-30"
          >
            {isRolling ? 'ROLLING...' : 'ROLL D20'}
          </button>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center">
              {finalValue >= dc ? (
                <p className="text-green-500 font-bold uppercase tracking-widest animate-bounce">Neural Stability Confirmed</p>
              ) : (
                <p className="text-red-500 font-bold uppercase tracking-widest animate-pulse">Epistemic Failure Imminent</p>
              )}
            </div>
            <button 
              onClick={() => onResult(finalValue)}
              className="w-full py-4 border-2 border-[#ffb000] text-[#ffb000] font-bold uppercase tracking-widest text-xs hover:bg-[#ffb000] hover:text-black transition-all"
            >
              Continue Execution
            </button>
          </div>
        )}
      </div>

      <div className="text-[8px] opacity-20 uppercase tracking-widest text-center px-10">
        Consequences: Success grants maximum XP & Fuel. Failure results in -15 Integrity loss and reduced data yield.
      </div>
    </div>
  );
};

export default DiceRoller;
