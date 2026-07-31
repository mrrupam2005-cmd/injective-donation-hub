'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception for debugging telemetry
    console.error('App Runtime Exception:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <div className="rounded-3xl border border-cyber-danger/40 bg-slate-950 p-8 shadow-neon-danger max-w-md w-full backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyber-danger/10 text-cyber-danger border border-cyber-danger/30">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h2 className="mt-4 text-xl font-black text-slate-100 uppercase tracking-wider">
          System Anomaly Detected
        </h2>
        <p className="mt-2 text-xs font-mono text-slate-400">
          {error.message || 'An unexpected error occurred while interacting with the Injective node.'}
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 rounded-xl bg-cyber-green px-4 py-2 text-xs font-bold text-slate-950 shadow-neon-green hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-initialize</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 hover:border-cyber-cyan transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Arena Command</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
