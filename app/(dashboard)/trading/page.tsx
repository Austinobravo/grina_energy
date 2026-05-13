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
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownCircle, 
  Users, 
  Wallet,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Globe
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

const MARKET_TRENDS = [
  { time: '00:00', price: 42 },
  { time: '04:00', price: 38 },
  { time: '08:00', price: 110 },
  { time: '12:00', price: 65 },
  { time: '16:00', price: 85 },
  { time: '20:00', price: 140 },
  { time: '23:59', price: 95 },
];

export default function TradingPage() {
  const { data } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-foreground">Grina Marketplace</h1>
          <p className="text-muted-foreground mt-1">Peer-to-peer energy trading for smart communities.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <Wallet className="w-4 h-4 mr-2" />
            ₦ {data.marketPrice.toLocaleString()}
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            <Smartphone className="w-4 h-4 mr-2" />
            Withdraw to Mobile Money
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
           <Card className="border-none glass">
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                   <CardTitle className="text-foreground font-outfit">Community Price Trend</CardTitle>
                   <CardDescription>Average community energy price (₦/kWh)</CardDescription>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-foreground font-mono">₦{data.marketPrice.toFixed(0)}</p>
                   <p className="text-[10px] text-muted-foreground uppercase font-bold">Current Spot Price</p>
                </div>
             </CardHeader>
             <CardContent>
                <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MARKET_TRENDS}>
                         <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                               <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-[0.05]" vertical={false} />
                         <XAxis dataKey="time" stroke="currentColor" className="opacity-40" fontSize={10} axisLine={false} tickLine={false} />
                         <YAxis stroke="currentColor" className="opacity-40" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `₦${v}`} />
                         <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }} />
                         <Area 
                           type="monotone" 
                           dataKey="price" 
                           stroke="var(--primary)" 
                           fill="url(#colorPrice)" 
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
                    <CardTitle className="text-sm font-bold text-foreground uppercase flex items-center gap-2">
                       <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                       Total Sold (24h)
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-3xl font-bold text-foreground font-outfit">42.5 <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Earned: ₦{(42.5 * 120).toLocaleString()}</p>
                 </CardContent>
              </Card>
              <Card className="border-none glass">
                 <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-foreground uppercase flex items-center gap-2">
                       <ArrowDownCircle className="w-4 h-4 text-primary" />
                       Total Bought (24h)
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-3xl font-bold text-foreground font-outfit">12.8 <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
                    <p className="text-xs text-muted-foreground mt-1">Spent: ₦{(12.8 * 85).toLocaleString()}</p>
                 </CardContent>
              </Card>
           </div>
        </div>

        <div className="space-y-6">
           <Card className="border-none glass bg-primary/5">
             <CardHeader>
                <div className="flex justify-between items-center">
                   <CardTitle className="text-foreground font-outfit flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Active Neighbors
                   </CardTitle>
                   <Badge className="bg-emerald-500/10 text-emerald-500 border-none">12 Online</Badge>
                </div>
             </CardHeader>
             <CardContent className="space-y-4">
                {[
                  { name: 'Neighbor Emeka', distance: '12m', price: '₦115/kWh', status: 'Buying' },
                  { name: 'Segun Arinze', distance: '45m', price: '₦125/kWh', status: 'Selling' },
                  { name: 'Fatima O.', distance: '82m', price: '₦110/kWh', status: 'Buying' },
                  { name: 'Lekki Hub', distance: '120m', price: '₦130/kWh', status: 'Selling' },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                           {n.name.split(' ').map(x => x[0]).join('')}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-foreground">{n.name}</p>
                           <p className="text-[10px] text-muted-foreground">{n.distance} away</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xs font-bold text-foreground">{n.price}</p>
                        <p className={`text-[9px] uppercase font-bold ${n.status === 'Buying' ? 'text-emerald-500' : 'text-primary'}`}>{n.status}</p>
                     </div>
                  </div>
                ))}
                <Button variant="link" className="w-full text-muted-foreground text-[10px] uppercase font-bold tracking-widest gap-2">
                   View Full Marketplace
                   <ChevronRight className="w-3 h-3" />
                </Button>
             </CardContent>
           </Card>

           <Card className="border-none glass overflow-hidden bg-emerald-500/5">
             <CardHeader>
                <CardTitle className="text-sm font-bold text-foreground uppercase flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                   Autonomous Trading
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                   Grina AI is currently selling surplus at <strong>₦120/kWh</strong>. Target battery floor: <strong>40%</strong>.
                </p>
                <div className="flex gap-2">
                   <Button variant="outline" className="flex-1 glass text-[10px] font-bold uppercase h-9">Configure AI</Button>
                   <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold uppercase h-9">Active</Button>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
