'use client';

import React from 'react';
import { User, Tag } from 'lucide-react';
import { Proposal } from '../../lib/types';
import { StatusBadge } from './StatusBadge';
import { Countdown } from './Countdown';
import { truncateAddress } from '../../lib/utils';

interface ProposalHeaderProps {
  proposal: Proposal;
}

export const ProposalHeader: React.FC<ProposalHeaderProps> = ({ proposal }) => {
  return (
    <div className="space-y-4 border-b border-slate-800/80 pb-6">
      {/* Top Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-xl bg-cyber-green/10 border border-cyber-green/30 px-3 py-1 text-xs font-mono font-black text-cyber-green shadow-neon-green">
            PROPOSAL #{proposal.id}
          </span>
          <span className="inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-mono text-slate-300">
            <Tag className="w-3 h-3 text-cyber-cyan" />
            <span>{proposal.category}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status={proposal.status} />
          {proposal.status === 'Active' && <Countdown endTimeMs={proposal.endTime} />}
        </div>
      </div>

      {/* Main Proposal Title */}
      <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight leading-tight">
        {proposal.title}
      </h1>

      {/* Proposer Info */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <User className="w-3.5 h-3.5 text-cyber-cyan" />
        <span>Submitted by:</span>
        <span className="text-slate-200 font-bold">{truncateAddress(proposal.proposer)}</span>
      </div>
    </div>
  );
};
