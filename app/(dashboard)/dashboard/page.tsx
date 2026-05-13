'use client';

import { EnergyFlow } from '@/components/dashboard/energy-flow';
import { StatCards } from '@/components/dashboard/stat-cards';
import { useTelemetryStore } from '@/lib/store/use-telemetry-store';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, 
  Battery as BatteryIcon, 
  Zap, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Cpu,
  BrainCircuit,
  Smartphone,
  Info,
  Lightbulb,
  Droplets,
  WashingMachine
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { history, data } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-foreground">System Dashboard</h1>
          <p className="text-muted-foreground mt-1">Industrial Intelligence for SolarGrid-A1</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <Cpu className="w-4 h-4 mr-2" />
            BESS Control
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            <Smartphone className="w-4 h-4 mr-2" />
            Open GrinaPay
          </Button>
        </div>
      </div>

      {/* GrinaPay Outcome Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border-none glass bg-primary/10 border-primary/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Energy Status</p>
              <p className="text-xs text-muted-foreground mt-0.5">Battery charged to {data.batteryLevel}% using solar (₦0 cost)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 border-none glass bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Market Earnings</p>
              <p className="text-xs text-muted-foreground mt-0.5">Sold 30 kWh to neighbors last night (earned ₦3,600)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-1 border-none glass bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Smart Tip</p>
              <p className="text-xs text-muted-foreground mt-0.5">Run water pump now (free solar power available)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <EnergyFlow />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none glass">
              <CardHeader>
                <CardTitle className="font-outfit text-foreground">Smart Load Recommendations</CardTitle>
                <CardDescription>Optimized scheduling for high-power appliances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Water Pump</p>
                      <p className="text-[10px] text-muted-foreground">Optimal: 12:00 PM - 2:00 PM</p>
                    </div>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none">RECOMMENDED</Badge>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                      <WashingMachine className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Washing Machine</p>
                      <p className="text-[10px] text-muted-foreground">Delay until: 1:30 PM (Peak Solar)</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-muted-foreground border-border/50">SCHEDULED</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none glass">
              <CardHeader>
                 <CardTitle className="font-outfit text-foreground">AI Strategy</CardTitle>
                 <CardDescription>Intelligent Charging & Discharging</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                   <div className="flex-1 space-y-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase">Next Goal</p>
                      <p className="text-sm text-foreground">Optimize for Grid Arbitrage</p>
                   </div>
                   <BrainCircuit className="w-8 h-8 text-primary opacity-50" />
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Efficiency Index</span>
                      <span>{data.inverterEfficiency.toFixed(1)}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-accent/30 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${data.inverterEfficiency}%` }}
                        className="h-full bg-primary" 
                      />
                   </div>
                </div>
                <Button variant="outline" className="w-full glass text-xs h-9">Configure AI Model</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none glass bg-primary/5">
            <CardHeader>
              <CardTitle className="font-outfit flex items-center gap-2 text-foreground">
                <BatteryIcon className="w-5 h-5 text-primary" />
                Battery Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted/20"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="58"
                      fill="transparent"
                      stroke="var(--primary)"
                      strokeWidth="8"
                      strokeDasharray={364.4}
                      initial={{ strokeDashoffset: 364.4 }}
                      animate={{ strokeDashoffset: 364.4 - (364.4 * data.batteryLevel) / 100 }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                    <span className="text-3xl font-bold font-outfit text-foreground">{data.batteryLevel}%</span>
                    <span className="text-[10px] uppercase font-bold text-muted-foreground">SOC</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/30 p-3 rounded-xl border border-border/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Voltage</p>
                  <p className="text-lg font-bold text-foreground font-mono">{data.batteryVoltage.toFixed(1)}V</p>
                </div>
                <div className="bg-accent/30 p-3 rounded-xl border border-border/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Current</p>
                  <p className="text-lg font-bold text-foreground font-mono">{data.batteryCurrent}A</p>
                </div>
                <div className="bg-accent/30 p-3 rounded-xl border border-border/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Temp</p>
                  <p className="text-lg font-bold text-foreground font-mono">{data.batteryTemp.toFixed(1)}°C</p>
                </div>
                <div className="bg-accent/30 p-3 rounded-xl border border-border/50">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Status</p>
                  <p className={`text-lg font-bold font-mono uppercase ${data.batteryStatus === 'charging' ? 'text-emerald-500' : data.batteryStatus === 'discharging' ? 'text-cyan-500' : 'text-foreground'}`}>
                    {data.batteryStatus}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none glass">
            <CardHeader className="pb-2">
              <CardTitle className="font-outfit flex items-center gap-2 text-foreground">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Active Alarms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Phase Imbalance</p>
                    <p className="text-[10px] text-muted-foreground">Check Grid Input L3</p>
                  </div>
                </div>
                <Button variant="link" className="w-full text-xs text-muted-foreground h-auto p-0">
                  Manage Incident Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

