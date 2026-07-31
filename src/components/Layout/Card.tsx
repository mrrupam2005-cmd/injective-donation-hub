'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'green' | 'cyan' | 'purple' | 'danger' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glowColor = 'green',
  onClick,
}) => {
  const glowStyles = {
    green: 'border-cyber-green/20 hover:border-cyber-green/50 hover:shadow-neon-green',
    cyan: 'border-cyber-cyan/20 hover:border-cyber-cyan/50 hover:shadow-neon-cyan',
    purple: 'border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/30',
    danger: 'border-cyber-danger/20 hover:border-cyber-danger/50 hover:shadow-neon-danger',
    none: 'border-slate-800/80',
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-slate-900/60 p-6 backdrop-blur-md transition-all duration-300',
        glowStyles[glowColor],
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyber-green/5 blur-3xl pointer-events-none" />
      {children}
    </motion.div>
  );
};
