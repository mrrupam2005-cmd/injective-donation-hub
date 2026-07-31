'use client';

import React from 'react';
import { Coins, Zap } from 'lucide-react';
import { formatInjAmount } from '../../lib/utils';

interface StakeSliderProps {
  amountInj: string;
  setAmountInj: (val: string) => void;
  maxInjBalance: string;
  estimatedGasInj?: string;
}

export const StakeSlider: React.FC<StakeSliderProps> = ({
  amountInj,
  setAmountInj,
  maxInjBalance,
  estimatedGasInj = '0.0005',
}) => {
  const maxNum = parseFloat(maxInjBalance) || 100;
  const currentNum = parseFloat(amountInj) || 0;
  const percentage = Math.min(100, Math.max(0, Math.round((currentNum / maxNum) * 100)));

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const calculated = ((val / 100) * maxNum).toFixed(2);
    setAmountInj(calculated);
  };

  const handleSetPercentage = (pct: number) => {
    const calculated = ((pct / 100) * maxNum).toFixed(2);
    setAmountInj(calculated);
  };

  return (
    <div className="w-full space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-mono font-bold text-slate-200">
          <Coins className="w-4 h-4 text-cyber-green" />
          <span>STAKE INJ VOTING WEIGHT</span>
        </label>
        <span className="text-xs font-mono text-slate-400">
          Available: <strong className="text-cyber-green font-bold">{formatInjAmount(maxInjBalance)} INJ</strong>
        </span>
      </div>

      {/* Manual Input Box */}
      <div className="relative flex items-center">
        <input
          type="number"
          step="0.1"
          min="0.1"
          max={maxInjBalance}
          value={amountInj}
          onChange={(e) => setAmountInj(e.target.value)}
          placeholder="0.00"
          className="w-full rounded-xl border border-cyber-green/40 bg-slate-950 px-4 py-3 text-lg font-mono font-bold text-cyber-green focus:border-cyber-green focus:outline-none focus:ring-1 focus:ring-cyber-green shadow-inner"
        />
        <div className="absolute right-3 flex items-center gap-2">
          <span className="text-xs font-bold font-mono text-slate-400">INJ</span>
          <button
            type="button"
            onClick={() => handleSetPercentage(100)}
            className="rounded-lg bg-cyber-green/20 border border-cyber-green/40 px-2.5 py-1 text-xs font-extrabold text-cyber-green hover:bg-cyber-green hover:text-slate-950 transition-colors"
          >
            MAX
          </button>
        </div>
      </div>

      {/* Range Slider */}
      <div className="space-y-2">
        <input
          type="range"
          min="0"
          max="100"
          value={percentage}
          onChange={handleSliderChange}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-950 accent-cyber-green"
        />

        {/* Quick Percent Pills */}
        <div className="flex items-center justify-between gap-2">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handleSetPercentage(pct)}
              className="flex-1 rounded-lg border border-slate-800 bg-slate-950 py-1 text-[11px] font-mono font-bold text-slate-400 hover:border-cyber-cyan hover:text-cyber-cyan transition-colors"
            >
              {pct}%
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Network Gas */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Estimated Network Gas:</span>
        </div>
        <span className="font-bold text-slate-200">~{estimatedGasInj} INJ</span>
      </div>
    </div>
  );
};
