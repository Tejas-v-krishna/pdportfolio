import { useState, useEffect } from 'react';

const ISTFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
});

/**
 * Returns the current IST time as a formatted string, updated every second.
 * Using a module-level interval + subscriber pattern so only ONE setInterval
 * runs regardless of how many components use this hook.
 */
let timeString = ISTFormatter.format(new Date());
let subscribers = 0;
let intervalId: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function tick() {
  timeString = ISTFormatter.format(new Date());
  listeners.forEach((fn) => fn());
}

export function useIST(): string {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    subscribers++;
    const update = () => forceUpdate((n) => n + 1);
    listeners.add(update);

    if (!intervalId) {
      intervalId = setInterval(tick, 1000);
    }

    return () => {
      listeners.delete(update);
      subscribers--;
      if (subscribers === 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, []);

  return timeString;
}

/** Returns current time as a Date object (for NavigationMenu's toLocaleTimeString) */
export function useISTDate(): Date {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    subscribers++;
    const update = () => setDate(new Date());
    listeners.add(update);
    if (!intervalId) intervalId = setInterval(tick, 1000);
    return () => {
      listeners.delete(update);
      subscribers--;
      if (subscribers === 0 && intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
  }, []);
  return date;
}
