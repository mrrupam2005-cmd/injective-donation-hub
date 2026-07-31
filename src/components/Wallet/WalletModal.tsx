'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, ExternalLink, ShieldCheck } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { WALLET_PROVIDERS } from '../../lib/constants';
import { WalletType } from '../../lib/types';

export const WalletModal: React.FC = () => {
  const { isModalOpen, closeModal, connect, walletState } = useWallet();

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-cyber-green/40 bg-slate-950 p-6 shadow-neon-green backdrop-blur-2xl z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-cyber-green" />
              <h3 className="text-lg font-black text-slate-100 uppercase tracking-wider">
                Connect Wallet
              </h3>
            </div>
            <button
              onClick={closeModal}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Select your preferred Injective Cosmos or EVM wallet provider to interact with voting smart contracts.
          </p>

          {/* Wallet List */}
          <div className="mt-6 flex flex-col gap-3">
            {WALLET_PROVIDERS.map((provider) => (
              <button
                key={provider.id}
                onClick={() => {
                  connect(provider.id as WalletType);
                  closeModal();
                }}
                disabled={walletState.isConnecting}
                className="group flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:border-cyber-green/60 hover:bg-slate-900 hover:shadow-neon-green"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-cyber-green font-bold group-hover:border-cyber-green">
                    {provider.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyber-green">
                      {provider.name}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">Injective Native / EVM</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Connect</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>

          {/* Footer Security Notice */}
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-cyber-green shrink-0" />
            <span>End-to-end encrypted non-custodial CosmWasm key management.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
