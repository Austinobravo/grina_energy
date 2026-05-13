'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  ArrowRight, 
  ShoppingCart, 
  Wallet, 
  History,
  Zap,
  ArrowUpRight,
  Filter,
  Search,
  CheckCircle2,
  Users,
  Smartphone,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelemetryStore } from '@/lib/store/use-telemetry-store';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const MOCK_LISTINGS = [
  { id: '1', seller: 'Neighbor: Emeka S.', amount: 12.4, price: 115, type: 'Battery', rating: 4.9, time: '2 mins ago', location: 'Section A, Plot 12' },
  { id: '2', seller: 'Neighbor: Fatima O.', amount: 25.0, price: 110, type: 'Solar', rating: 4.7, time: '5 mins ago', location: 'Section C, Plot 44' },
  { id: '3', seller: 'Lagos Tech Hub', amount: 150.0, price: 105, type: 'Industrial', rating: 5.0, time: '8 mins ago', location: 'Central District' },
  { id: '4', seller: 'Neighbor: Segun A.', amount: 8.2, price: 120, type: 'Battery', rating: 4.8, time: '12 mins ago', location: 'Section B, Plot 5' },
];

export default function TradingPage() {
  const { data } = useTelemetryStore();
  const [walletBalance, setWalletBalance] = useState(data.revenue);

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-foreground">P2P Energy Marketplace</h1>
          <p className="text-muted-foreground mt-1">Automated energy trading powered by GrinaPay.</p>
        </div>
        <div className="flex items-center gap-4 bg-primary/10 border border-primary/20 p-3 rounded-2xl">
          <div className="bg-primary/20 p-2 rounded-lg text-primary">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground">GrinaPay Balance</p>
            <p className="text-xl font-bold font-outfit text-foreground">₦{data.revenue.toLocaleString()}</p>
          </div>
          <Button size="sm" className="ml-4 h-8 bg-primary text-xs">Withdraw</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left: Summary & Stats */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-none glass bg-emerald-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-outfit uppercase text-muted-foreground">Automated Trading Log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-3 rounded-xl bg-accent/30 border border-border/50">
                 <p className="text-xs font-bold text-emerald-500 uppercase">Last Transaction</p>
                 <p className="text-sm mt-1 text-foreground">Sold 30 kWh to Neighbor Emeka S.</p>
                 <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] text-muted-foreground">Earned: ₦3,600</span>
                    <Badge className="bg-emerald-500/20 text-emerald-500 text-[8px] border-none">COMPLETED</Badge>
                 </div>
               </div>
               <div className="p-3 rounded-xl bg-accent/30 border border-border/50">
                 <p className="text-xs font-bold text-primary uppercase">Current Strategy</p>
                 <p className="text-sm mt-1 text-foreground">Sell surplus when SOC &gt; 85%</p>
                 <p className="text-[10px] text-muted-foreground mt-1">Optimization: ARBITRAGE MODE</p>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none glass">
            <CardHeader>
              <CardTitle className="font-outfit text-foreground">Market Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Active Buyers</span>
                  <span className="text-sm font-bold text-foreground">142</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Active Sellers</span>
                  <span className="text-sm font-bold text-foreground">84</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Price Index</span>
                  <div className="flex items-center gap-1 text-emerald-500">
                    <TrendingDown className="w-3 h-3" />
                    <span className="text-sm font-bold">₦{data.marketPrice.toFixed(0)}/kWh</span>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Center: Live Marketplace */}
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input placeholder="Search neighbors or hubs..." className="pl-10 glass border-none h-12 text-foreground" />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 glass">
              <Filter className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence>
              {MOCK_LISTINGS.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-none glass hover:bg-accent/30 transition-all group overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {listing.type === 'Solar' ? <Zap className="w-5 h-5 text-emerald-500" /> : <Users className="w-5 h-5 text-primary" />}
                          </div>
                          <div>
                            <CardTitle className="text-sm font-outfit text-foreground">{listing.seller}</CardTitle>
                            <p className="text-[10px] text-muted-foreground">{listing.location} • ★ {listing.rating}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground border-border/50">{listing.time}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground">Available</p>
                          <p className="text-2xl font-bold font-outfit text-primary">{listing.amount} <span className="text-sm font-normal text-muted-foreground">kWh</span></p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase font-bold text-muted-foreground">Unit Price</p>
                          <p className="text-xl font-bold font-outfit text-foreground">₦{listing.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex gap-2">
                      <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-10 group/btn">
                        Instant Buy
                        <ShoppingCart className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="glass h-10">Bid</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center pt-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary gap-2">
              View Global Market Feed
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
