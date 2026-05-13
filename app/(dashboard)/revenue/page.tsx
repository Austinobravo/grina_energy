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
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  Download, 
  Calendar,
  Wallet,
  ArrowRight,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

const MOCK_REVENUE_DATA = [
  { day: 'Mon', revenue: 120, trades: 12 },
  { day: 'Tue', revenue: 150, trades: 15 },
  { day: 'Wed', revenue: 180, trades: 18 },
  { day: 'Thu', revenue: 210, trades: 21 },
  { day: 'Fri', revenue: 190, trades: 19 },
  { day: 'Sat', revenue: 240, trades: 24 },
  { day: 'Sun', revenue: 300, trades: 30 },
];

export default function RevenuePage() {
  const { data } = useTelemetryStore();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-foreground">Revenue Analytics</h1>
          <p className="text-muted-foreground mt-1">Financial performance and trading profitability.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <Calendar className="w-4 h-4 mr-2" />
            Last 7 Days
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none glass bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-outfit uppercase text-muted-foreground">GrinaPay Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-4xl font-bold font-outfit text-foreground">₦{data.revenue.toLocaleString()}</h3>
            <div className="flex items-center gap-2 mt-2 text-emerald-500 text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              +15.2% (₦2,450.00)
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-outfit uppercase text-muted-foreground">Trading Profit (MTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-4xl font-bold font-outfit text-foreground">₦12,400.50</h3>
            <div className="flex items-center gap-2 mt-2 text-primary text-xs font-bold">
              <DollarSign className="w-4 h-4" />
              Avg. ₦413.50 / day
            </div>
          </CardContent>
        </Card>

        <Card className="border-none glass">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-outfit uppercase text-muted-foreground">Market Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-4xl font-bold font-outfit text-foreground">₦8,400.20</h3>
            <div className="flex items-center gap-2 mt-2 text-cyan-500 text-xs font-bold">
              <Zap className="w-4 h-4" />
              Avoided Grid Costs
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 border-none glass">
          <CardHeader>
            <CardTitle className="font-outfit text-foreground">Daily Revenue Breakdown</CardTitle>
            <CardDescription>Revenue generated from energy trading activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_REVENUE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-[0.05]" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor', opacity: 0.5 }} tickFormatter={(v) => `₦${v}`} />
                  <Tooltip 
                    cursor={{ fill: 'currentColor', opacity: 0.05 }}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                  />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                    {MOCK_REVENUE_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === MOCK_REVENUE_DATA.length - 1 ? 'var(--primary)' : 'currentColor'} 
                        fillOpacity={index === MOCK_REVENUE_DATA.length - 1 ? 1 : 0.1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none glass">
          <CardHeader>
            <CardTitle className="font-outfit text-foreground">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { type: 'Sell', amount: '12.4 kWh', price: '148', time: '10 mins ago', status: 'Completed' },
                { type: 'Sell', amount: '8.2 kWh', price: '98', time: '42 mins ago', status: 'Completed' },
                { type: 'Buy', amount: '50.0 kWh', price: '450', time: '2 hours ago', status: 'Completed' },
                { type: 'Sell', amount: '15.0 kWh', price: '180', time: '5 hours ago', status: 'Completed' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'Sell' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {tx.type === 'Sell' ? <ArrowUpRight className="w-5 h-5" /> : <Download className="rotate-180 w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{tx.type} Order</p>
                      <p className="text-[10px] text-muted-foreground">{tx.amount} • {tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.type === 'Sell' ? 'text-emerald-500' : 'text-red-500'}`}>
                      {tx.type === 'Sell' ? '+' : '-'}₦{tx.price}
                    </p>
                    <p className="text-[9px] uppercase font-bold text-muted-foreground">{tx.status}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full glass mt-4 h-11 font-bold">
                View All Transactions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
