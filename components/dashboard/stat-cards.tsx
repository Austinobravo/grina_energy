'use client';

import { useTelemetryStore } from '@/lib/store/use-telemetry-store';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, Leaf, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatCards() {
  const { data } = useTelemetryStore();

  const stats = [
    {
      title: 'Total Revenue Today',
      value: `$${data.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+12.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-grina-emerald',
      bg: 'bg-grina-emerald/10',
    },
    {
      title: 'Carbon Saved',
      value: `${data.carbonSaved.toFixed(1)} kg`,
      change: '+5.2 kg',
      trend: 'up',
      icon: Leaf,
      color: 'text-grina-green',
      bg: 'bg-grina-green/10',
    },
    {
      title: 'Market Energy Price',
      value: `$${data.marketPrice.toFixed(3)} /kWh`,
      change: '-2.1%',
      trend: 'down',
      icon: Activity,
      color: 'text-grina-purple',
      bg: 'bg-grina-purple/10',
    },
    {
      title: 'Total Energy Traded',
      value: '42.8 kWh',
      change: '+8.4 kWh',
      trend: 'up',
      icon: Zap,
      color: 'text-grina-cyan',
      bg: 'bg-grina-cyan/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-none glass hover:bg-accent/50 transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h4 className="text-2xl font-bold font-outfit mt-1">{stat.value}</h4>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
