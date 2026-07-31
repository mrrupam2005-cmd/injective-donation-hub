import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple Tailwind CSS class names with merge resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Truncates an Injective / Cosmos wallet address for clean UI display.
 * Example: inj14hj2tavq8fpesdwwxe544p6322ptch263k326m -> inj14h...326m
 */
export function truncateAddress(address: string | null | undefined, startChars = 6, endChars = 4): string {
  if (!address) return 'Not Connected';
  if (address.length <= startChars + endChars) return address;
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
}

/**
 * Formats a raw numerical or string amount into human-readable formatted INJ numbers.
 */
export function formatInjAmount(amount: string | number, decimals = 2): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '0.00';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Calculates percentage breakdown for FOR vs AGAINST votes.
 */
export function calculateVotePercentages(votesFor: string | number, votesAgainst: string | number): {
  forPercentage: number;
  againstPercentage: number;
  totalVotes: number;
} {
  const forNum = typeof votesFor === 'string' ? parseFloat(votesFor) : votesFor;
  const againstNum = typeof votesAgainst === 'string' ? parseFloat(votesAgainst) : votesAgainst;
  const total = forNum + againstNum;

  if (total <= 0) {
    return { forPercentage: 50, againstPercentage: 50, totalVotes: 0 };
  }

  const forPct = Math.round((forNum / total) * 1000) / 10;
  const againstPct = Math.round((againstNum / total) * 1000) / 10;

  return {
    forPercentage: forPct,
    againstPercentage: againstPct,
    totalVotes: total,
  };
}

/**
 * Calculates time remaining formatted as DD:HH:MM:SS from milliseconds.
 */
export function formatTimeRemaining(targetTimestampMs: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
} {
  const now = Date.now();
  const diff = targetTimestampMs - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, isExpired: false };
}
