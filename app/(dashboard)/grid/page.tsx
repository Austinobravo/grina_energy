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
  Zap, 
  Activity, 
  ArrowDownCircle, 
  ArrowUpRight, 
  TrendingDown,
  TrendingUp,
  Server,
  Globe,
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

export default function GridMonitoringPage() {
  const { data, history } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">Grid Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time synchronization with the national and local grid.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">In Sync</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
           <Card className="border-none glass">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-white font-outfit">Phase Stabilization</CardTitle>
                   <CardDescription>Live frequency and voltage harmonics monitoring.</CardDescription>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-white font-mono">50.02 Hz</p>
                   <p className="text-[10px] text-muted-foreground uppercase">Stable Range</p>
                </div>
             </CardHeader>
             <CardContent>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={history}>
                         <defs>
                            <linearGradient id="colorGrid" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                               <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                         <XAxis dataKey="time" hide />
                         <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                         <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none' }} />
                         <Area 
                           type="monotone" 
                           dataKey="batteryVoltage" 
                           stroke="var(--primary)" 
                           fill="url(#colorGrid)" 
                           strokeWidth={2}
                         />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none glass">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-white uppercase flex items-center gap-2">
                       <ArrowDownCircle className="w-4 h-4 text-primary" />
                       Grid Import
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-3xl font-bold text-white font-outfit">{data.gridImport.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">kW</span></p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                       <TrendingDown className="w-3 h-3 text-emerald-500" />
                       <span className="text-emerald-500 font-bold">-12% vs last hour</span>
                    </div>
                 </CardContent>
              </Card>
              <Card className="border-none glass">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-white uppercase flex items-center gap-2">
                       <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                       Grid Export
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-3xl font-bold text-white font-outfit">{data.gridExport.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">kW</span></p>
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                       <TrendingUp className="w-3 h-3 text-primary" />
                       <span className="text-primary font-bold">+5% vs last hour</span>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>

        <div className="space-y-6">
           <Card className="border-none glass overflow-hidden">
             <div className="p-6 bg-primary/10 border-b border-primary/20">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                      <Globe className="w-6 h-6" />
                   </div>
                   <h3 className="text-lg font-bold text-white font-outfit">Network Status</h3>
                </div>
             </div>
             <CardContent className="p-6 space-y-4">
                {[
                  { name: 'National Grid', status: 'Connected', latency: '4ms' },
                  { name: 'Local Microgrid', status: 'Connected', latency: '1ms' },
                  { name: 'Neighbour P2P', status: 'Active', latency: '12ms' },
                  { name: 'Mobile Gateway', status: 'Connected', latency: '45ms' },
                ].map((node, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                     <span className="text-sm text-white/80">{node.name}</span>
                     <div className="flex items-center gap-3">
                        <span className="text-[10px] text-muted-foreground font-mono">{node.latency}</span>
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] h-4">{node.status}</Badge>
                     </div>
                  </div>
                ))}
             </CardContent>
           </Card>

           <Card className="border-none glass bg-blue-500/5">
              <CardHeader>
                 <CardTitle className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Waves className="w-4 h-4 text-blue-500" />
                    Power Quality
                 </CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-3xl font-bold text-white font-outfit">99.8%</p>
                       <p className="text-xs text-muted-foreground mt-1">THD (Total Harmonic Distortion)</p>
                    </div>
                    <Badge variant="outline" className="border-blue-500/20 text-blue-500 bg-blue-500/10">OPTIMAL</Badge>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
