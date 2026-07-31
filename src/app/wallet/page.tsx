'use client';

import React from 'react';
import { Wallet, Coins, ShieldCheck, Award, ExternalLink, ArrowRight } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { GlassPanel } from '../../components/Layout/GlassPanel';
import { formatInjAmount, truncateAddress } from '../../lib/utils';
import { NETWORK_CONFIG } from '../../lib/config';

export default function WalletPage() {
  const { walletState, openModal, disconnect } = useWallet();

  if (!walletState.isConnected) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <GlassPanel className="p-8 max-w-md w-full border-cyber-cyan/30 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30">
            <Wallet className="w-8 h-8" />
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-100 uppercase tracking-wider">
            Wallet Disconnected
          </h2>
          <p className="mt-2 text-xs font-mono text-slate-400">
            Connect your Keplr, Leap, MetaMask, or Ninji wallet to inspect INJ voting power and vote history.
          </p>
          <button
            onClick={openModal}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyber-green to-cyber-cyan py-3 text-xs font-black text-slate-950 shadow-neon-green hover:scale-105 transition-transform"
          >
            CONNECT WALLET NOW
          </button>
        </GlassPanel>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Wallet Header Card */}
      <GlassPanel intensity="high" className="p-6 border-cyber-green/30 shadow-neon-green">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyber-green/10 text-cyber-green border border-cyber-green/30">
              <Wallet className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-slate-100 font-mono">
                  {truncateAddress(walletState.injAddress)}
                </span>
                <span className="rounded-full bg-cyber-green/20 px-2 py-0.5 text-[10px] font-mono font-bold text-cyber-green border border-cyber-green/30">
                  {walletState.walletType}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Connected to Injective {NETWORK_CONFIG.network} ({NETWORK_CONFIG.chainId})
              </p>
            </div>
          </div>

          <button
            onClick={disconnect}
            className="rounded-xl border border-cyber-danger/30 bg-cyber-danger/10 px-4 py-2 text-xs font-mono font-bold text-cyber-danger hover:bg-cyber-danger hover:text-slate-950 transition-all"
          >
            Disconnect Wallet
          </button>
        </div>
      </GlassPanel>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassPanel className="p-6 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400">Available INJ Balance</span>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-cyber-green" />
            <span className="text-2xl font-mono font-black text-slate-100">
              {formatInjAmount(walletState.injBalance)} INJ
            </span>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400">Calculated Voting Power</span>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-cyber-cyan" />
            <span className="text-2xl font-mono font-black text-cyber-cyan">
              {formatInjAmount(walletState.votingPower)} VP
            </span>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400">Security Multiplier</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyber-green" />
            <span className="text-2xl font-mono font-black text-cyber-green">1.5x Staked</span>
          </div>
        </GlassPanel>
      </div>

      {/* Historical Voter Activity */}
      <GlassPanel className="p-6 space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-200">
          Voter On-Chain Ledger History
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs font-mono">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">Proposal #102</span>
                <span className="rounded bg-cyber-green/20 px-2 py-0.5 text-[10px] text-cyber-green">Voted FOR</span>
              </div>
              <p className="text-[11px] text-slate-400">Stake Weight: 250.0 INJ</p>
            </div>
            <a
              href={`${NETWORK_CONFIG.explorerUrl}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-cyber-cyan hover:underline"
            >
              <span>Tx Details</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs font-mono">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">Proposal #103</span>
                <span className="rounded bg-cyber-green/20 px-2 py-0.5 text-[10px] text-cyber-green">Voted FOR</span>
              </div>
              <p className="text-[11px] text-slate-400">Stake Weight: 500.0 INJ</p>
            </div>
            <a
              href={`${NETWORK_CONFIG.explorerUrl}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-cyber-cyan hover:underline"
            >
              <span>Tx Details</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
