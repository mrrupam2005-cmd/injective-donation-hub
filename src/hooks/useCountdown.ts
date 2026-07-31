import { useState, useEffect } from 'react';
import { formatTimeRemaining } from '../lib/utils';

export function useCountdown(targetTimestampMs: number) {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeRemaining(targetTimestampMs));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = formatTimeRemaining(targetTimestampMs);
      setTimeLeft(remaining);
      if (remaining.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestampMs]);

  return timeLeft;
}
