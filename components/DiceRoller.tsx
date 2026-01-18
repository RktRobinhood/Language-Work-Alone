
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
      const nextVal = Math.floor(Math.random() * 20) + 1;
      setCurrentValue(nextVal);
      rolls++;
      
      if (rolls > 20) {
        clearInterval(interval);
        const result = nextVal; // This is the absolute truth for this turn
        setFinalValue(result);
        setIsRolling(false);
        if (result >= dc) sfx.confirm(); else sfx.error();
      }
    }, 60);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-12 py-10 px-6 animate-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <h2 className="text-[10px] uppercase tracking-[0.4em] opacity-40">Roll for Epistemic Stability</h2>
        <div className="text-4xl font-black text-[#ffb000]">DC {dc}</div>
      </div>

      <div 
        className={`w-36 h-36 flex items-center justify-center border-4 rotate-45 transition-all duration-300 shadow-2xl ${
          finalValue === null ? 'border-[#ffb000]/40' : 
          finalValue >= dc ? 'border-green-500 bg-green-500/20 shadow-green-500/40 scale-110' : 
          'border-red-500 bg-red-500/20 shadow-red-500/40'
        }`}
      >
        <div className="-rotate-45 flex flex-col items-center">
           <span className={`text-6xl font-black ${isRolling ? 'animate-pulse' : ''}`}>
            {currentValue}
          </span>
          {finalValue !== null && (
             <span className="text-[9px] font-bold uppercase mt-2 tracking-widest">
               {finalValue >= dc ? 'SYNC OK' : 'PARADOX'}
             </span>
          )}
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        {finalValue === null ? (
          <button 
            onClick={startRoll}
            disabled={isRolling}
            className="w-full py-5 bg-[#ffb000] text-black font-black uppercase tracking-widest text-sm hover:bg-white active:scale-95 transition-all disabled:opacity-30 shadow-[0_0_30px_rgba(255,176,0,0.3)]"
          >
            {isRolling ? 'REACHING...' : 'STABILIZE REALITY'}
          </button>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center">
              {finalValue >= dc ? (
                <p className="text-green-500 font-bold uppercase tracking-[0.2em] animate-bounce">Neural Stabilized</p>
              ) : (
                <p className="text-red-500 font-bold uppercase tracking-[0.2em] animate-pulse">Integrity Breach</p>
              )}
            </div>
            <button 
              onClick={() => onResult(finalValue!)}
              className="w-full py-4 border-2 border-[#ffb000] text-[#ffb000] font-bold uppercase tracking-widest text-[10px] hover:bg-[#ffb000] hover:text-black transition-all"
            >
              Commit Data to Archive
            </button>
          </div>
        )}
      </div>

      <div className="text-[7px] opacity-20 uppercase tracking-[0.3em] text-center px-4 leading-relaxed">
        Stability Check result is final. Roll: {currentValue} vs DC: {dc}.
      </div>
    </div>
  );
};

export default DiceRoller;
