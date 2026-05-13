'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTelemetryStore } from '@/lib/store/use-telemetry-store';
import { cn } from '@/lib/utils';
import { RefreshCcw, ShieldCheck, Thermometer, TrendingUp } from 'lucide-react';
import {motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function BatteriesPage() {
  const { data, history } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-foreground">Battery Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep insights into energy storage health and performance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Recalibrate SOH
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Maintenance Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Battery Visual */}
        <Card className="lg:col-span-1 border-none glass overflow-hidden flex flex-col justify-center items-center p-8 relative">
          <div className="absolute top-4 left-4 flex items-center gap-2">
             <Badge className="bg-primary/20 text-primary border-primary/30">Active</Badge>
             <span className="text-[10px] font-bold text-muted-foreground font-mono">ID: BESS-01-GRINA</span>
          </div>
          
          <div className="relative w-48 h-80 border-4 border-muted rounded-[2rem] p-2 flex flex-col justify-end overflow-hidden shadow-2xl">
             <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-16 h-4 bg-muted rounded-t-lg" />
             <motion.div 
               className="w-full bg-gradient-to-t from-primary/80 to-primary rounded-2xl"
               initial={{ height: '0%' }}
               animate={{ height: `${data.batteryLevel}%` }}
               transition={{ type: 'spring', damping: 20 }}
             >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <motion.div 
                   animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="absolute top-0 left-0 w-full h-4 bg-white/20 blur-sm" 
                />
             </motion.div>
             <div className="absolute inset-0 flex flex-col items-center justify-center mix-blend-difference">
                <span className="text-5xl font-black font-outfit text-white">{data.batteryLevel}%</span>
                <span className="text-sm font-bold uppercase tracking-widest text-white/80">Charge</span>
             </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 w-full">
             <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Status</p>
                <p className={cn(
                  "text-lg font-bold font-outfit uppercase",
                  data.batteryStatus === 'charging' ? 'text-emerald-500' : 
                  data.batteryStatus === 'discharging' ? 'text-cyan-500' : 'text-muted-foreground'
                )}>{data.batteryStatus}</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Temperature</p>
                <p className="text-lg font-bold font-outfit flex items-center justify-center gap-1 text-foreground">
                   <Thermometer className="w-4 h-4 text-amber-500" />
                   {data.batteryTemp.toFixed(1)}°C
                </p>
             </div>
          </div>
        </Card>

        {/* Analytics Charts */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-outfit text-foreground">Charge/Discharge Cycles</CardTitle>
                <CardDescription>Power flow history (Last 60 ticks)</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  Charge
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  Discharge
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="colorCharge" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-[0.05]" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis stroke="currentColor" className="opacity-40" fontSize={10} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                    <Area 
                      type="monotone" 
                      dataKey="batteryLevel" 
                      stroke="var(--primary)" 
                      fill="url(#colorCharge)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-outfit text-foreground uppercase">Degradation Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold font-outfit text-foreground">98.2%</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Health (SOH)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-500">-0.1%</p>
                    <p className="text-[9px] text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
                <div className="mt-4 h-1.5 bg-accent rounded-full">
                   <div className="h-full bg-primary w-[98.2%]" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-outfit text-foreground uppercase">Estimated Lifespan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold font-outfit text-foreground">8.4 <span className="text-sm font-normal text-muted-foreground">years</span></p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Remaining</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary opacity-20" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                   <Badge variant="outline" className="bg-primary/10 text-[9px] border-none">Optimized</Badge>
                   <p className="text-[9px] text-muted-foreground">Based on current usage patterns</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
