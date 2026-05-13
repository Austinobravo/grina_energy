'use client';

import { useTelemetryStore } from '@/lib/store/use-telemetry-store';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Activity, 
  Thermometer, 
  RefreshCcw, 
  Power, 
  Settings2,
  Cpu,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function InvertersPage() {
  const { data } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">Inverter Management</h1>
          <p className="text-muted-foreground mt-1">Control and monitor industrial power conversion units.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11 text-red-500 hover:text-red-600">
            <Power className="w-4 h-4 mr-2" />
            Emergency Stop
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Restart Controller
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Inverter Card */}
        <Card className="lg:col-span-2 border-none glass overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-white font-outfit">GRINA-INV-ALPHA-01</CardTitle>
                  <CardDescription>Primary Three-Phase Hybrid Inverter</CardDescription>
                </div>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-500 border-none px-4 py-1">OPERATIONAL</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                   <p className="text-xs font-bold text-muted-foreground uppercase">Output Frequency</p>
                   <p className="text-4xl font-bold text-white font-mono">50.02 <span className="text-sm font-normal text-muted-foreground">Hz</span></p>
                </div>
                <div className="space-y-2">
                   <p className="text-xs font-bold text-muted-foreground uppercase">Efficiency</p>
                   <p className="text-4xl font-bold text-emerald-500 font-mono">{data.inverterEfficiency.toFixed(1)}%</p>
                </div>
                <div className="space-y-2">
                   <p className="text-xs font-bold text-muted-foreground uppercase">AC Output Power</p>
                   <p className="text-4xl font-bold text-white font-mono">{data.loadConsumption.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">kW</span></p>
                </div>
             </div>

             <div className="mt-12 space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="text-lg font-bold text-white font-outfit">Phase Balancing</h3>
                   <Badge variant="outline" className="border-white/10 text-muted-foreground">Balanced</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {['Phase L1', 'Phase L2', 'Phase L3'].map((phase, i) => (
                     <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{phase}</p>
                        <div className="flex justify-between items-end">
                           <span className="text-xl font-bold text-white">230.5V</span>
                           <span className="text-xs text-primary">12.4A</span>
                        </div>
                        <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary w-[85%]" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Control Panel */}
        <div className="space-y-6">
           <Card className="border-none glass">
             <CardHeader>
                <CardTitle className="text-white font-outfit">Control Parameters</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Grid Tie Mode</span>
                      <Badge className="bg-primary/20 text-primary border-none">ACTIVE</Badge>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Island Mode Support</span>
                      <Badge variant="outline" className="border-white/10 text-muted-foreground">READY</Badge>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Peak Shaving</span>
                      <Badge className="bg-emerald-500/20 text-emerald-500 border-none">ENABLED</Badge>
                   </div>
                </div>
                <div className="pt-6 border-t border-white/5">
                   <Button variant="outline" className="w-full glass h-11 group">
                      <Settings2 className="w-4 h-4 mr-2 group-hover:rotate-45 transition-transform" />
                      Advanced Settings
                   </Button>
                </div>
             </CardContent>
           </Card>

           <Card className="border-none glass bg-amber-500/5">
             <CardHeader>
                <CardTitle className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                   <Thermometer className="w-4 h-4 text-amber-500" />
                   Thermal Profile
                </CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex items-end justify-between">
                   <div>
                      <p className="text-4xl font-bold text-white">42.5°C</p>
                      <p className="text-xs text-muted-foreground mt-1">Core Temperature</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-bold text-emerald-500">SAFE</p>
                      <p className="text-[10px] text-muted-foreground">Fan Speed: 42%</p>
                   </div>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
