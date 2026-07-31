'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';

interface CountdownProps {
  endTimeMs: number;
}

export const Countdown: React.FC<CountdownProps> = ({ endTimeMs }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(endTimeMs);

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-mono font-bold text-slate-400">
        <Clock className="w-3.5 h-3.5" />
        <span>VOTING CONCLUDED</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-cyber-cyan font-mono text-xs font-black">
        <Clock className="w-3.5 h-3.5 animate-pulse text-cyber-cyan" />
        <div className="flex gap-1">
          <span className="rounded-md border border-cyber-cyan/30 bg-slate-900/80 px-2 py-1 shadow-neon-cyan">
            {String(days).padStart(2, '0')}d
          </span>
          <span className="py-1 text-slate-500">:</span>
          <span className="rounded-md border border-cyber-cyan/30 bg-slate-900/80 px-2 py-1 shadow-neon-cyan">
            {String(hours).padStart(2, '0')}h
          </span>
          <span className="py-1 text-slate-500">:</span>
          <span className="rounded-md border border-cyber-cyan/30 bg-slate-900/80 px-2 py-1 shadow-neon-cyan">
            {String(minutes).padStart(2, '0')}m
          </span>
          <span className="py-1 text-slate-500">:</span>
          <span className="rounded-md border border-cyber-cyan/30 bg-slate-900/80 px-2 py-1 text-cyber-green shadow-neon-green">
            {String(seconds).padStart(2, '0')}s
          </span>
        </div>
      </div>
    </div>
  );
};
