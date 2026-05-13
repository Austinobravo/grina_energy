'use client';

import { useEffect } from 'react';
import { useTelemetryStore } from '@/lib/store/use-telemetry-store';

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const tick = useTelemetryStore((state) => state.tick);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [tick]);

  return <>{children}</>;
}
