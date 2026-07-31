'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Zap, History, Calendar, ShieldCheck, FileText, Wallet } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Arena Home', path: '/', icon: Home },
    { name: 'Active Voting', path: '/active', icon: Zap, badge: 'Live' },
    { name: 'Past Proposals', path: '/past', icon: History },
    { name: 'Future Voting', path: '/future', icon: Calendar },
    { name: 'My Wallet', path: '/wallet', icon: Wallet },
    { name: 'Documentation', path: '/docs', icon: FileText },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 backdrop-blur-xl shadow-2xl">
        <div className="px-3 py-2 border-b border-slate-800/80 mb-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-cyber-green font-bold">
            Navigation Command
          </p>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'group flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-bold transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/10 text-cyber-green border border-cyber-green/40 shadow-neon-green'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-100 border border-transparent'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      'w-4 h-4 transition-transform group-hover:scale-110',
                      isActive ? 'text-cyber-green' : 'text-slate-400 group-hover:text-cyber-cyan'
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="rounded-full bg-cyber-green/20 px-2 py-0.5 text-[9px] font-extrabold text-cyber-green border border-cyber-green/40 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
