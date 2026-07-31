'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Vote, Coins, Users, PlusCircle, ArrowUpRight } from 'lucide-react';
import { useProposal } from '../hooks/useProposal';
import { ProposalCard } from '../components/Proposal/ProposalCard';
import { Card } from '../components/Layout/Card';
import { formatInjAmount } from '../lib/utils';
import { useWallet } from '../hooks/useWallet';

export default function HomePage() {
  const { proposals, isLoading, createProposal } = useProposal();
  const { walletState, openModal } = useWallet();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Protocol');
  const [durationDays, setDurationDays] = useState(7);
  const [deposit, setDeposit] = useState('50');

  const activeProposals = proposals.filter((p) => p.status === 'Active');
  const featuredProposal = activeProposals[0] || proposals[0];

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletState.isConnected || !walletState.address) {
      openModal();
      return;
    }
    await createProposal(
      { title, description, category, durationDays, initialDepositInj: deposit },
      walletState.address
    );
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-cyber-green/30 bg-slate-950 p-8 shadow-neon-green backdrop-blur-2xl"
      >
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyber-green/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyber-green/40 bg-cyber-green/10 px-3 py-1 text-xs font-mono font-bold text-cyber-green shadow-neon-green mb-3">
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>COSMWASM GOVERNANCE ENGINE LIVE</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
              Injective <span className="text-cyber-green text-glow-green">Voting Arena</span>
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed font-mono">
              Participate in high-stakes protocol governance, stake INJ, and shape the decentralized future of financial infrastructure.
            </p>
          </div>

          <button
            onClick={() => {
              if (!walletState.isConnected) openModal();
              else setShowCreateModal(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyber-green to-cyber-cyan px-6 py-3.5 text-sm font-black text-slate-950 shadow-neon-green transition-all hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            <span>CREATE PROPOSAL</span>
          </button>
        </div>

        {/* Global Telemetry Metrics */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-800/80 pt-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Total Proposals</span>
            <div className="flex items-center gap-2">
              <Vote className="w-4 h-4 text-cyber-cyan" />
              <span className="text-xl font-mono font-black text-slate-100">{proposals.length}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Active Proposals</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyber-green animate-ping" />
              <span className="text-xl font-mono font-black text-cyber-green">{activeProposals.length}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Total INJ Staked</span>
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-cyber-green" />
              <span className="text-xl font-mono font-black text-slate-100">
                {formatInjAmount(proposals.reduce((a, b) => a + parseFloat(b.totalStaked), 0))}
              </span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-slate-400">Active Voters</span>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyber-cyan" />
              <span className="text-xl font-mono font-black text-slate-100">1,420+</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Arena Proposal */}
      {featuredProposal && (
        <div className="space-y-3">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-cyber-cyan flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Featured Governance Battle</span>
          </h2>
          <ProposalCard proposal={featuredProposal} />
        </div>
      )}

      {/* Proposal Grid Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-300">
            All Arena Proposals ({proposals.length})
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 rounded-2xl bg-slate-900/60 animate-pulse border border-slate-800" />
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

      {/* Create Proposal Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setShowCreateModal(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />
          <div className="relative w-full max-w-lg rounded-3xl border border-cyber-green/40 bg-slate-950 p-6 shadow-neon-green z-10 space-y-4">
            <h3 className="text-lg font-black text-slate-100 uppercase tracking-wider">
              Submit Governance Proposal
            </h3>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400">Proposal Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. INJ Burn Rate Optimization"
                  className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-100 focus:border-cyber-green focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-100 focus:border-cyber-green focus:outline-none"
                >
                  <option value="Protocol">Protocol Upgrade</option>
                  <option value="Treasury">Treasury Allocation</option>
                  <option value="Parameter">Parameter Change</option>
                  <option value="Software Upgrade">Software Upgrade</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide technical rationale and execution details..."
                  className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-100 focus:border-cyber-green focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={durationDays}
                    onChange={(e) => setDurationDays(parseInt(e.target.value) || 7)}
                    className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-100 focus:border-cyber-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400">Deposit (INJ)</label>
                  <input
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-slate-100 focus:border-cyber-green focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 rounded-xl border border-slate-800 py-2.5 text-xs font-bold text-slate-400 hover:bg-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-cyber-green py-2.5 text-xs font-bold text-slate-950 shadow-neon-green hover:scale-105 transition-transform"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
