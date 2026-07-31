'use client';

import React from 'react';
import { cn } from '../../lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  intensity = 'medium',
}) => {
  const blurIntensity = {
    low: 'backdrop-blur-sm bg-slate-900/40 border-slate-800/50',
    medium: 'backdrop-blur-md bg-slate-900/65 border-slate-800/80',
    high: 'backdrop-blur-xl bg-slate-950/80 border-slate-700/80 shadow-2xl',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl border transition-all duration-300',
        blurIntensity[intensity],
        className
      )}
    >
      {children}
    </div>
  );
};
