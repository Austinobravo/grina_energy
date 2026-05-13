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
  PieChart as PieChartIcon, 
  TrendingUp, 
  Zap, 
  Sun, 
  Battery, 
  LayoutDashboard,
  ArrowRight
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';

export default function EnergyOverviewPage() {
  const { data } = useTelemetryStore();

  const powerMix = [
    { name: 'Solar', value: data.solarGeneration, color: 'var(--color-grina-emerald)' },
    { name: 'Battery', value: data.batteryStatus === 'discharging' ? Math.abs(data.batteryCurrent * 0.48) : 0, color: 'var(--primary)' },
    { name: 'Grid', value: data.gridImport, color: 'var(--color-grina-amber)' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">Energy Flow Analytics</h1>
          <p className="text-muted-foreground mt-1">Holistic breakdown of energy generation, storage, and usage.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none glass">
           <CardHeader>
              <CardTitle className="text-white font-outfit">Current Power Mix</CardTitle>
              <CardDescription>Real-time source distribution for your current load.</CardDescription>
           </CardHeader>
           <CardContent>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                         data={powerMix}
                         cx="50%"
                         cy="50%"
                         innerRadius={80}
                         outerRadius={120}
                         paddingAngle={8}
                         dataKey="value"
                       >
                         {powerMix.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                       <Tooltip 
                         contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px' }}
                         itemStyle={{ color: '#fff' }}
                       />
                       <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                 </ResponsiveContainer>
              </div>
           </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="border-none glass bg-emerald-500/5">
              <CardHeader className="pb-2">
                 <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-bold text-white uppercase flex items-center gap-2">
                       <Sun className="w-4 h-4 text-emerald-500" />
                       Renewable Index
                    </CardTitle>
                    <Badge className="bg-emerald-500/20 text-emerald-500 border-none">High</Badge>
                 </div>
              </CardHeader>
              <CardContent>
                 <div className="flex items-end justify-between">
                    <div>
                       <p className="text-4xl font-bold text-white font-outfit">82%</p>
                       <p className="text-xs text-muted-foreground mt-1">Solar Utilization Rate</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs font-bold text-emerald-500">+15%</p>
                       <p className="text-[10px] text-muted-foreground">vs. Industry Average</p>
                    </div>
                 </div>
                 <div className="mt-6 space-y-2">
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[82%]" />
                    </div>
                    <p className="text-[10px] text-muted-foreground">System is prioritizing solar and battery over grid.</p>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-none glass">
              <CardHeader>
                 <CardTitle className="text-sm font-bold text-white uppercase flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Consumption Efficiency
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-4">
                    {[
                      { label: 'Baseload', value: '1.2 kW', pct: 30 },
                      { label: 'Dynamic Loads', value: '2.4 kW', pct: 60 },
                      { label: 'System Losses', value: '0.2 kW', pct: 10 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                         <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{item.label}</span>
                            <span className="text-white font-bold">{item.value}</span>
                         </div>
                         <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${item.pct}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
