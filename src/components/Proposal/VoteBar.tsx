'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { calculateVotePercentages, formatInjAmount } from '../../lib/utils';

interface VoteBarProps {
  votesFor: string;
  votesAgainst: string;
  totalStaked: string;
}

export const VoteBar: React.FC<VoteBarProps> = ({ votesFor, votesAgainst, totalStaked }) => {
  const { forPercentage, againstPercentage } = calculateVotePercentages(votesFor, votesAgainst);

  return (
    <div className="w-full space-y-2">
      {/* Label Metrics */}
      <div className="flex items-center justify-between text-xs font-bold font-mono">
        <div className="flex items-center gap-1.5 text-cyber-green">
          <span>FOR</span>
          <span>{forPercentage}%</span>
          <span className="text-[10px] text-slate-500 font-normal">
            ({formatInjAmount(votesFor)} INJ)
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-cyber-danger">
          <span className="text-[10px] text-slate-500 font-normal">
            ({formatInjAmount(votesAgainst)} INJ)
          </span>
          <span>{againstPercentage}%</span>
          <span>AGAINST</span>
        </div>
      </div>

      {/* Visual Dynamic Progress Track */}
      <div className="relative flex h-3.5 w-full overflow-hidden rounded-full border border-slate-800 bg-slate-950 p-0.5 shadow-inner">
        {/* FOR Segment */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${forPercentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-l-full bg-gradient-to-r from-cyber-green to-cyber-green-glow shadow-neon-green"
        />

        {/* Separator Gap */}
        <div className="w-1 bg-slate-950 z-10" />

        {/* AGAINST Segment */}
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${againstPercentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-r-full bg-gradient-to-r from-cyber-danger to-pink-600 shadow-neon-danger"
        />
      </div>

      {/* Quorum Progress Hint */}
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
        <span>Total Participation: <strong className="text-slate-200">{formatInjAmount(totalStaked)} INJ</strong></span>
        <span className="text-cyber-cyan font-semibold">Quorum Threshold Met ✓</span>
      </div>
    </div>
  );
};
