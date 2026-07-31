'use client';

import React from 'react';
import { ProposalStatus } from '../../lib/types';
import { CYBER_THEME } from '../../styles/theme';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: ProposalStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = CYBER_THEME.statusColors[status] || CYBER_THEME.statusColors.Active;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider backdrop-blur-md',
        config.badge,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      <span>{status}</span>
    </span>
  );
};
