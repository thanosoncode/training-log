import { useEffect, useState } from 'react';

export const useCountdown = (timeToComplete: number, count: number) => {
  const interval = timeToComplete / count;
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    if (currentCount < count) {
      const timeout = setTimeout(() => {
        setCurrentCount((prevCount) => prevCount + 1);
      }, interval);

      return () => clearTimeout(timeout);
    }
  }, [currentCount, count, interval]);

  return currentCount;
};
