'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <div className="relative overflow-hidden rounded-3xl border border-cyber-green/40 bg-slate-950 p-8 shadow-neon-green max-w-md w-full backdrop-blur-2xl">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyber-green/10 blur-3xl pointer-events-none" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyber-green/10 text-cyber-green border border-cyber-green/30">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="mt-4 text-4xl font-black text-slate-100 font-mono text-glow-green">
          404
        </h1>
        <h2 className="mt-1 text-lg font-bold text-cyber-cyan uppercase tracking-wider">
          Proposal Route Out of Bounds
        </h2>
        <p className="mt-2 text-xs font-mono text-slate-400">
          The requested governance route or proposal ID does not exist on the Injective CosmWasm ledger.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyber-green to-cyber-cyan px-5 py-2.5 text-xs font-black text-slate-950 shadow-neon-green hover:scale-105 transition-transform"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO ARENA</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
