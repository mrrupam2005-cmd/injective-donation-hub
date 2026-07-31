'use client';

import React from 'react';
import { History } from 'lucide-react';
import { useProposal } from '../../hooks/useProposal';
import { ProposalCard } from '../../components/Proposal/ProposalCard';

export default function PastProposalsPage() {
  const { proposals, isLoading } = useProposal('Passed');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
          <History className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-100 uppercase tracking-wider">
            Past Proposal Archives
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            Historical record of passed and executed CosmWasm proposals.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
          ))}
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
