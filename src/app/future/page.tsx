'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { useProposal } from '../../hooks/useProposal';
import { ProposalCard } from '../../components/Proposal/ProposalCard';

export default function FutureProposalsPage() {
  const { proposals, isLoading } = useProposal('Future');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-100 uppercase tracking-wider">
            Upcoming Future Proposals
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Proposals scheduled for future voting start timestamps.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
        </div>
      ) : proposals.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 font-mono text-xs">
          No upcoming future proposals registered.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {proposals.map((item) => (
            <ProposalCard key={item.id} proposal={item} />
          ))}
        </div>
      )}
    </div>
  );
}
