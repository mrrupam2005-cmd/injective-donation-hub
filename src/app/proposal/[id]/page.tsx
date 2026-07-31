'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';
import { ProposalHeader } from '../../../components/Proposal/ProposalHeader';
import { VoteBar } from '../../../components/Proposal/VoteBar';
import { VoteButtons } from '../../../components/Proposal/VoteButtons';
import { StakeSlider } from '../../../components/Proposal/StakeSlider';
import { GlassPanel } from '../../../components/Layout/GlassPanel';
import { ProposalService } from '../../../services/proposalService';
import { Proposal, VoteOption } from '../../../lib/types';
import { useWallet } from '../../../hooks/useWallet';
import { useProposal } from '../../../hooks/useProposal';

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const proposalId = parseInt(params.id as string, 10);

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<VoteOption | null>(null);
  const [stakeAmount, setStakeAmount] = useState('50.0');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { walletState, openModal } = useWallet();
  const { castVote } = useProposal();

  useEffect(() => {
    async function loadDetail() {
      setLoading(true);
      const data = await ProposalService.getProposalById(proposalId);
      setProposal(data);
      if (data?.userVoted) {
        setSelectedOption(data.userVoted);
      }
      setLoading(false);
    }
    if (proposalId) loadDetail();
  }, [proposalId]);

  const handleVoteExecution = async () => {
    if (!walletState.isConnected || !walletState.address) {
      openModal();
      return;
    }
    if (!selectedOption || !proposal) return;

    setIsSubmitting(true);
    try {
      const updated = await castVote(
        {
          proposalId: proposal.id,
          option: selectedOption,
          amountInj: stakeAmount,
        },
        walletState.address
      );
      setProposal(updated);
    } catch (error) {
      // Handled in hook toast
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 bg-slate-900 animate-pulse rounded-lg" />
        <div className="h-64 bg-slate-900 animate-pulse rounded-2xl border border-slate-800" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-12 text-center">
        <h2 className="text-xl font-bold text-slate-200">Proposal #{proposalId} Not Found</h2>
        <Link href="/" className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-cyber-green hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Command Center</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyber-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Arena Overview</span>
      </Link>

      {/* Proposal Header */}
      <ProposalHeader proposal={proposal} />

      {/* Two Column Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description & Vote Bar */}
        <div className="lg:col-span-2 space-y-6">
          <GlassPanel className="p-6 space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyber-cyan">
              Technical Rationale & Description
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
              {proposal.description}
            </p>
          </GlassPanel>

          <GlassPanel className="p-6 space-y-4">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-cyber-green">
              Live Governance Quorum & Consensus
            </h3>
            <VoteBar
              votesFor={proposal.votesFor}
              votesAgainst={proposal.votesAgainst}
              totalStaked={proposal.totalStaked}
            />
          </GlassPanel>
        </div>

        {/* Right Column: Voting Action Panel */}
        <div className="space-y-6">
          <GlassPanel intensity="high" className="p-6 space-y-6 border-cyber-green/40 shadow-neon-green">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-sm font-black uppercase text-slate-100 font-mono">
                Voting Command Panel
              </h3>
              <ShieldCheck className="w-4 h-4 text-cyber-green" />
            </div>

            {proposal.status !== 'Active' ? (
              <div className="flex items-center gap-2 rounded-xl bg-slate-900 p-4 text-xs font-mono text-slate-400">
                <Lock className="w-4 h-4 text-slate-500" />
                <span>Voting phase concluded for Proposal #{proposal.id}.</span>
              </div>
            ) : (
              <>
                {/* Vote Buttons Selection */}
                <VoteButtons
                  selectedOption={selectedOption}
                  onSelectOption={setSelectedOption}
                />

                {/* Stake Amount Slider */}
                <StakeSlider
                  amountInj={stakeAmount}
                  setAmountInj={setStakeAmount}
                  maxInjBalance={walletState.injBalance || '150.00'}
                />

                {/* Submit Vote Trigger */}
                <button
                  disabled={!selectedOption || isSubmitting}
                  onClick={handleVoteExecution}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyber-green to-cyber-cyan py-4 text-sm font-black text-slate-950 shadow-neon-green hover:scale-102 transition-all disabled:opacity-50 disabled:hover:scale-100 font-mono tracking-wider"
                >
                  {isSubmitting
                    ? 'BROADCASTING VOTE...'
                    : walletState.isConnected
                    ? selectedOption
                      ? `CAST ${selectedOption} VOTE (${stakeAmount} INJ)`
                      : 'SELECT VOTE OPTION FIRST'
                    : 'CONNECT WALLET TO VOTE'}
                </button>
              </>
            )}
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
