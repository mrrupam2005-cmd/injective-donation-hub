'use client';

import React from 'react';
import { Wallet, LogOut, ChevronDown } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { truncateAddress } from '../../lib/utils';

export const WalletButton: React.FC = () => {
  const { walletState, openModal, disconnect } = useWallet();

  if (!walletState.isConnected) {
    return (
      <button
        onClick={openModal}
        className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyber-green to-cyber-cyan px-5 py-2.5 text-sm font-black text-slate-950 shadow-neon-green transition-all duration-300 hover:scale-105 hover:shadow-neon-cyan"
      >
        <Wallet className="w-4 h-4 transition-transform group-hover:rotate-12" />
        <span>CONNECT WALLET</span>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden sm:flex items-center gap-2 rounded-xl border border-cyber-cyan/30 bg-slate-900/80 px-3 py-1.5 backdrop-blur-md">
        <span className="text-xs font-semibold text-slate-400">INJ:</span>
        <span className="text-xs font-mono font-bold text-cyber-cyan">{walletState.injBalance}</span>
      </div>

      <div className="relative group">
        <button
          onClick={openModal}
          className="flex items-center gap-2 rounded-xl border border-cyber-green/40 bg-slate-900/90 px-4 py-2 text-xs font-mono font-bold text-cyber-green shadow-neon-green backdrop-blur-md transition-all duration-300 hover:border-cyber-green"
        >
          <span className="h-2 w-2 rounded-full bg-cyber-green animate-pulse" />
          <span>{truncateAddress(walletState.injAddress)}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-48 rounded-xl border border-slate-800 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-xl z-50">
          <div className="px-3 py-2 border-b border-slate-800/80">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Connected Provider</p>
            <p className="text-xs font-bold text-slate-200 mt-0.5">{walletState.walletType}</p>
          </div>
          <button
            onClick={disconnect}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-cyber-danger hover:bg-cyber-danger/10 transition-colors mt-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Disconnect Wallet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
