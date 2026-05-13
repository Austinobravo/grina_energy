'use client';

import { useTelemetryStore } from '@/lib/store/use-telemetry-store';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Terminal, 
  Database, 
  RefreshCcw, 
  ArrowDownCircle, 
  Play, 
  Pause,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function TelemetryPage() {
  const { history, data } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight">Live Telemetry</h1>
          <p className="text-muted-foreground mt-1">High-frequency streaming data from industrial gateways.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass">
            <Pause className="w-4 h-4 mr-2" />
            Pause Stream
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <Download className="w-4 h-4 mr-2" />
            Export Buffer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <Card className="xl:col-span-3 border-none glass bg-accent/30 font-mono">
          <CardHeader className="border-b border-border/50 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-emerald-500">Live Stream Buffer</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-500/60">CONNECTED // WS_GATEWAY_01</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[600px] overflow-y-auto custom-scrollbar">
            <div className="p-4 space-y-1">
              <AnimatePresence initial={false}>
                {[...history].reverse().map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] py-1 border-b border-border/30 last:border-0 flex gap-4"
                  >
                    <span className="text-muted-foreground opacity-50">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-primary font-bold">INFO</span>
                    <span className="text-foreground/80">
                      TELEMETRY_RX: solar={entry.solarGeneration}kW, load={entry.loadConsumption}kW, bat={entry.batteryLevel}%, stat={entry.batteryStatus.toUpperCase()}
                    </span>
                    <span className="ml-auto text-muted-foreground opacity-30 tracking-tighter">CHECKSUM_OK</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="border-none glass">
            <CardHeader>
              <CardTitle className="text-sm font-outfit">Stream Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Packets/Sec</span>
                <span className="text-sm font-bold font-mono">42.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Latency</span>
                <span className="text-sm font-bold font-mono text-emerald-500">12ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Buffer Health</span>
                <span className="text-sm font-bold font-mono">100%</span>
              </div>
              <div className="pt-4 border-t border-white/5">
                <Button variant="outline" className="w-full glass text-xs h-9">
                  <RefreshCcw className="w-3 h-3 mr-2" />
                  Reset Connection
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none glass">
            <CardHeader>
              <CardTitle className="text-sm font-outfit">Active Nodes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Gateway-Main', status: 'Active', load: '12%' },
                { name: 'Sensor-Node-A', status: 'Active', load: '4%' },
                { name: 'Inverter-Bridge', status: 'Idle', load: '0%' },
              ].map((node, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-accent/20">
                  <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] font-bold">{node.name}</span>
                  </div>
                  <Badge variant="outline" className="text-[8px] h-4 px-1 bg-emerald-500/10 text-emerald-500 border-none">{node.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
