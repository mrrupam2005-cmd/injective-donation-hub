'use client';

import React from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { VoteOption } from '../../lib/types';
import { cn } from '../../lib/utils';

interface VoteButtonsProps {
  selectedOption: VoteOption | null;
  onSelectOption: (option: VoteOption) => void;
  disabled?: boolean;
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({
  selectedOption,
  onSelectOption,
  disabled = false,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {/* VOTE FOR CARD */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelectOption('FOR')}
        className={cn(
          'group relative flex flex-col items-center justify-center rounded-2xl border p-6 transition-all duration-300 backdrop-blur-md',
          selectedOption === 'FOR'
            ? 'border-cyber-green bg-cyber-green/15 shadow-neon-green text-cyber-green scale-102'
            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyber-green/50 hover:bg-slate-900/90'
        )}
      >
        {selectedOption === 'FOR' && (
          <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-cyber-green" />
        )}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyber-green/10 text-cyber-green border border-cyber-green/30 group-hover:scale-110 transition-transform">
          <ThumbsUp className="w-7 h-7" />
        </div>
        <h4 className="mt-3 text-lg font-black tracking-wider uppercase">VOTE FOR</h4>
        <p className="mt-1 text-xs text-slate-400 font-mono">Approve governance changes</p>
      </button>

      {/* VOTE AGAINST CARD */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSelectOption('AGAINST')}
        className={cn(
          'group relative flex flex-col items-center justify-center rounded-2xl border p-6 transition-all duration-300 backdrop-blur-md',
          selectedOption === 'AGAINST'
            ? 'border-cyber-danger bg-cyber-danger/15 shadow-neon-danger text-cyber-danger scale-102'
            : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyber-danger/50 hover:bg-slate-900/90'
        )}
      >
        {selectedOption === 'AGAINST' && (
          <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-cyber-danger" />
        )}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/30 group-hover:scale-110 transition-transform">
          <ThumbsDown className="w-7 h-7" />
        </div>
        <h4 className="mt-3 text-lg font-black tracking-wider uppercase">VOTE AGAINST</h4>
        <p className="mt-1 text-xs text-slate-400 font-mono">Reject proposal changes</p>
      </button>
    </div>
  );
};
