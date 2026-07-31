'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldAlert, Globe } from 'lucide-react';
import { WalletButton } from './WalletButton';
import { NETWORK_CONFIG } from '../../lib/config';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="relative h-10 w-44">
            <Image
              src="/logo.svg"
              alt="Injective Voting Arena"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Network & Environment Indicator */}
        <div className="hidden lg:flex items-center gap-2 rounded-full border border-cyber-green/30 bg-slate-900/60 px-4 py-1.5 backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 text-cyber-green animate-spin-slow" />
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            {NETWORK_CONFIG.network}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyber-green" />
          <span className="text-[10px] font-mono text-slate-400">
            {NETWORK_CONFIG.chainId}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <WalletButton />
        </div>
      </div>
    </header>
  );
};
