'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Proposal } from '../../lib/types';
import { Card } from '../Layout/Card';
import { StatusBadge } from './StatusBadge';
import { Countdown } from './Countdown';
import { VoteBar } from './VoteBar';

interface ProposalCardProps {
  proposal: Proposal;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  return (
    <Card glowColor={proposal.status === 'Active' ? 'green' : 'none'} className="space-y-5">
      {/* Top Card Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-slate-950 border border-slate-800 px-2.5 py-1 text-xs font-mono font-extrabold text-cyber-green">
            #{proposal.id}
          </span>
          <span className="text-xs font-mono text-slate-400 font-bold">{proposal.category}</span>
        </div>
        <StatusBadge status={proposal.status} />
      </div>

      {/* Title & Description */}
      <div>
        <Link href={`/proposal/${proposal.id}`} className="group">
          <h3 className="text-lg font-black text-slate-100 group-hover:text-cyber-green transition-colors line-clamp-2">
            {proposal.title}
          </h3>
        </Link>
        <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {proposal.description}
        </p>
      </div>

      {/* Vote Progress */}
      <VoteBar
        votesFor={proposal.votesFor}
        votesAgainst={proposal.votesAgainst}
        totalStaked={proposal.totalStaked}
      />

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
        {proposal.status === 'Active' ? (
          <Countdown endTimeMs={proposal.endTime} />
        ) : (
          <span className="text-xs font-mono text-slate-500">Voting Closed</span>
        )}

        <div className="flex items-center gap-3">
          {proposal.userVoted && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-cyber-cyan">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Voted {proposal.userVoted}</span>
            </span>
          )}

          <Link
            href={`/proposal/${proposal.id}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-cyber-green/40 bg-cyber-green/10 px-3.5 py-1.5 text-xs font-mono font-bold text-cyber-green hover:bg-cyber-green hover:text-slate-950 transition-all duration-300"
          >
            <span>CAST VOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
