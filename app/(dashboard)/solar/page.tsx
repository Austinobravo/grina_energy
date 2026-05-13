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
  Sun, 
  TrendingUp, 
  Zap, 
  AlertTriangle,
  ArrowRight,
  LayoutDashboard,
  Waves
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

export default function SolarPage() {
  const { data, history } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-foreground">Solar Generation</h1>
          <p className="text-muted-foreground mt-1">Real-time performance of your distributed solar arrays.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
           <Sun className="w-4 h-4 text-emerald-500 animate-spin-slow" />
           <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Optimal Yield</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
           <Card className="border-none glass">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-foreground font-outfit">Active Generation</CardTitle>
                   <CardDescription>Live power output from all connected solar strings.</CardDescription>
                </div>
                <div className="text-right">
                   <p className="text-4xl font-bold text-emerald-500 font-mono">{data.solarGeneration.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">kW</span></p>
                </div>
             </CardHeader>
             <CardContent>
                <div className="h-[350px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={history}>
                         <defs>
                            <linearGradient id="colorSolarMain" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                               <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-[0.05]" vertical={false} />
                         <XAxis dataKey="time" hide />
                         <YAxis stroke="currentColor" className="opacity-40" fontSize={10} axisLine={false} tickLine={false} />
                         <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                         <Area 
                           type="monotone" 
                           dataKey="solarGeneration" 
                           stroke="var(--primary)" 
                           fill="url(#colorSolarMain)" 
                           strokeWidth={3}
                         />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'String Array A', status: 'Online', output: '4.2 kW', health: 98 },
                { name: 'String Array B', status: 'Online', output: '3.8 kW', health: 95 },
                { name: 'String Array C', status: 'Offline', output: '0.0 kW', health: 42 },
                { name: 'East Roof Array', status: 'Online', output: '1.2 kW', health: 99 },
              ].map((array, i) => (
                <div key={i} className="p-6 rounded-2xl bg-accent/30 border border-border/50 flex justify-between items-center group hover:bg-accent/50 transition-colors">
                   <div>
                      <p className="text-sm font-bold text-foreground">{array.name}</p>
                      <p className={`text-[10px] font-bold uppercase mt-1 ${array.status === 'Online' ? 'text-emerald-500' : 'text-red-500'}`}>
                         {array.status}
                      </p>
                   </div>
                   <div className="text-right">
                      <p className="text-lg font-bold text-foreground font-mono">{array.output}</p>
                      <div className="mt-1 h-1 w-20 bg-accent rounded-full overflow-hidden">
                         <div className={`h-full ${array.health > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${array.health}%` }} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-6">
           <Card className="border-none glass bg-emerald-500/5">
              <CardHeader>
                 <CardTitle className="text-sm font-bold text-foreground uppercase tracking-wider">Daily Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Energy Generated</p>
                    <p className="text-3xl font-bold text-foreground font-outfit">42.5 <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Peak Power</p>
                    <p className="text-3xl font-bold text-foreground font-outfit">8.4 <span className="text-sm font-normal text-muted-foreground">kW</span></p>
                 </div>
                 <div className="pt-6 border-t border-border/50">
                    <div className="flex items-center gap-2 text-emerald-500">
                       <Zap className="w-4 h-4" />
                       <span className="text-xs font-bold uppercase">System Efficiency: 96.2%</span>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-none glass">
              <CardHeader>
                 <CardTitle className="text-foreground font-outfit">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                       <Waves className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] text-muted-foreground uppercase font-bold">CO2 Offset</p>
                       <p className="text-lg font-bold text-foreground">{data.carbonSaved.toFixed(1)} kg</p>
                    </div>
                 </div>
                 <div className="p-4 rounded-xl border border-border/50 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Equivalent Trees Planted</p>
                    <p className="text-2xl font-bold text-emerald-500">24</p>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
