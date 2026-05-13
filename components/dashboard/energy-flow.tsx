'use client';

import { useTelemetryStore } from '@/lib/store/use-telemetry-store';
import { motion } from 'framer-motion';
import { Sun, Battery, Home, Zap, ArrowRight, ArrowLeft } from 'lucide-react';

export function EnergyFlow() {
  const { data } = useTelemetryStore();

  return (
    <div className="relative w-full h-[400px] glass rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-4 left-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Live Energy Flow</h3>
        <p className="text-2xl font-bold font-outfit">Active Grid Status</p>
      </div>

      <div className="relative w-full max-w-2xl aspect-[2/1] flex items-center justify-between">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 600 300">
          {/* Solar to Center */}
          <path d="M 100 75 Q 300 75 300 150" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
          {/* Battery to Center */}
          <path d="M 100 225 Q 300 225 300 150" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
          {/* Center to Load */}
          <path d="M 300 150 L 500 150" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
          {/* Center to Grid */}
          <path d="M 300 150 Q 300 50 500 50" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />

          {/* Animated Particles */}
          {data.solarGeneration > 0 && (
            <path d="M 100 75 Q 300 75 300 150" fill="none" stroke="var(--color-grina-emerald)" strokeWidth="3" className="power-line" />
          )}
          {data.batteryStatus === 'discharging' && (
            <path d="M 100 225 Q 300 225 300 150" fill="none" stroke="var(--color-grina-cyan)" strokeWidth="3" className="power-line" />
          )}
          {data.batteryStatus === 'charging' && (
            <path d="M 300 150 Q 300 225 100 225" fill="none" stroke="var(--color-grina-green)" strokeWidth="3" className="power-line" />
          )}
          <path d="M 300 150 L 500 150" fill="none" stroke="var(--color-grina-amber)" strokeWidth="3" className="power-line" />
          
          {data.gridExport > 0 && (
            <path d="M 300 150 Q 300 50 500 50" fill="none" stroke="var(--color-grina-purple)" strokeWidth="3" className="power-line" />
          )}
          {data.gridImport > 0 && (
            <path d="M 500 50 Q 300 50 300 150" fill="none" stroke="var(--color-grina-red)" strokeWidth="3" className="power-line" />
          )}
        </svg>

        {/* Solar Node */}
        <div className="flex flex-col items-center gap-2 -translate-x-1/2 translate-y-[-75px] absolute left-[100px] top-[150px]">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Sun className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Solar</p>
            <p className="text-lg font-bold font-outfit text-emerald-500">{data.solarGeneration} kW</p>
          </div>
        </div>

        {/* Battery Node */}
        <div className="flex flex-col items-center gap-2 -translate-x-1/2 translate-y-[75px] absolute left-[100px] top-[150px]">
          <div className={cn(
            "w-16 h-16 rounded-2xl border flex items-center justify-center transition-colors shadow-lg",
            data.batteryStatus === 'charging' ? "bg-primary/10 border-primary/20 text-primary" : 
            data.batteryStatus === 'discharging' ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-500" :
            "bg-muted border-border text-muted-foreground"
          )}>
            <Battery className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Battery</p>
            <p className="text-lg font-bold font-outfit">{data.batteryLevel}%</p>
            <p className="text-[9px] uppercase font-semibold opacity-70">{data.batteryStatus}</p>
          </div>
        </div>

        {/* Center Node (EMS Hub) */}
        <div className="flex flex-col items-center gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_40px_rgba(1,102,48,0.3)] z-10"
          >
            <Zap className="w-12 h-12 fill-current" />
          </motion.div>
          <div className="text-center pt-2">
            <p className="text-[10px] uppercase font-black tracking-tighter text-primary">GRINA ENGINE</p>
          </div>
        </div>

        {/* Load Node */}
        <div className="flex flex-col items-center gap-2 -translate-x-1/2 absolute right-[100px] top-[150px]">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg">
            <Home className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Load</p>
            <p className="text-lg font-bold font-outfit text-amber-500">{data.loadConsumption} kW</p>
          </div>
        </div>

        {/* Grid Node */}
        <div className="flex flex-col items-center gap-2 -translate-x-1/2 translate-y-[-100px] absolute right-[100px] top-[150px]">
          <div className={cn(
            "w-16 h-16 rounded-2xl border flex items-center justify-center transition-colors shadow-lg",
            data.gridExport > 0 ? "bg-purple-500/10 border-purple-500/20 text-purple-500" :
            data.gridImport > 0 ? "bg-red-500/10 border-red-500/20 text-red-500" :
            "bg-muted border-border text-muted-foreground"
          )}>
            <Zap className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground">Grid</p>
            <p className="text-lg font-bold font-outfit">
              {data.gridExport > 0 ? `-${data.gridExport} kW` : `+${data.gridImport} kW`}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 w-full px-12 flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          Generating Surplus
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          Optimizing Battery Health
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          High Load Efficiency
        </div>
      </div>
    </div>
  );
}

// Helper to make it work with CN
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
