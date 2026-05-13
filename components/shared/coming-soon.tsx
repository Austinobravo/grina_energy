'use client';

import { Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-accent/50 flex items-center justify-center text-muted-foreground animate-pulse">
        <Construction className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold font-outfit">Module Under Development</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The <span className="text-primary font-bold">{feature}</span> module is currently being optimized for industrial deployment. Stay tuned for updates.
        </p>
      </div>
      <Button asChild className="bg-primary">
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
