'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-cyber-green border-t-transparent shadow-neon-green" />
        <span className="text-xs font-mono font-bold text-cyber-green">INJ</span>
      </div>
      <p className="text-xs font-mono font-bold text-cyber-cyan uppercase tracking-widest animate-pulse">
        Synchronizing Injective CosmWasm Ledger...
      </p>
    </div>
  );
}
