import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#07090E',
          card: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(0, 245, 155, 0.2)',
          'border-cyan': 'rgba(0, 229, 255, 0.2)',
          green: '#00F59B',
          'green-glow': '#00FF88',
          cyan: '#00E5FF',
          blue: '#3B82F6',
          purple: '#A855F7',
          pink: '#EC4899',
          danger: '#FF2A6D',
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, rgba(7, 9, 14, 0.95) 0%, rgba(15, 23, 42, 0.9) 100%)',
        'neon-glow': 'radial-gradient(circle, rgba(0, 245, 155, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        'cyan-glow': 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 245, 155, 0.35)',
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.35)',
        'neon-danger': '0 0 20px rgba(255, 42, 109, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 10px rgba(0, 245, 155, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(0, 245, 155, 0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
