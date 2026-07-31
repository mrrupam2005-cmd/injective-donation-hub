/**
 * Centralized theme constants and design tokens for Injective Voting Arena.
 * Enforces dark futuristic cyberpunk aesthetic with neon green and cyan accents.
 */

export const CYBER_THEME = {
  colors: {
    bgDark: '#07090E',
    cardBg: 'rgba(15, 23, 42, 0.65)',
    cardBgHover: 'rgba(30, 41, 59, 0.75)',
    borderGreen: 'rgba(0, 245, 155, 0.25)',
    borderCyan: 'rgba(0, 229, 255, 0.25)',
    neonGreen: '#00F59B',
    neonGreenGlow: '#00FF88',
    neonCyan: '#00E5FF',
    neonBlue: '#3B82F6',
    neonPurple: '#A855F7',
    neonPink: '#EC4899',
    neonDanger: '#FF2A6D',
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
  },
  glass: {
    panel: 'bg-slate-900/60 backdrop-blur-md border border-slate-800/80 shadow-2xl rounded-2xl',
    panelGlowGreen: 'bg-slate-900/70 backdrop-blur-lg border border-cyber-green/30 shadow-neon-green rounded-2xl',
    panelGlowCyan: 'bg-slate-900/70 backdrop-blur-lg border border-cyber-cyan/30 shadow-neon-cyan rounded-2xl',
    button: 'relative inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl overflow-hidden',
  },
  statusColors: {
    Active: {
      badge: 'bg-cyber-green/10 text-cyber-green border-cyber-green/30 shadow-neon-green',
      dot: 'bg-cyber-green animate-ping',
    },
    Passed: {
      badge: 'bg-cyber-cyan/10 text-cyber-cyan border-cyber-cyan/30 shadow-neon-cyan',
      dot: 'bg-cyber-cyan',
    },
    Rejected: {
      badge: 'bg-cyber-danger/10 text-cyber-danger border-cyber-danger/30 shadow-neon-danger',
      dot: 'bg-cyber-danger',
    },
    Future: {
      badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      dot: 'bg-purple-400',
    },
  },
};

export const MOTION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  scaleHover: {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  },
  glowHover: {
    rest: { boxShadow: '0 0 0px rgba(0,0,0,0)' },
    hover: { boxShadow: '0 0 20px rgba(0, 245, 155, 0.4)' },
  },
};
