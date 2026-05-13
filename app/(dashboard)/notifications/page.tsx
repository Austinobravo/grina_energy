'use client';

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
  Bell, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Zap, 
  MoreVertical,
  Trash2,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

const NOTIFICATIONS = [
  { id: 1, title: 'Energy Surplus Exported', desc: 'Your system automatically sold 12.4kWh to Neighbor Emeka. You earned ₦1,488.', time: '2 mins ago', type: 'success', icon: Zap, unread: true },
  { id: 2, title: 'Critical: Low SOC', desc: 'Battery state of charge has dropped below the safety threshold (20%). Automatic grid charging initiated.', time: '15 mins ago', type: 'warning', icon: AlertTriangle, unread: true },
  { id: 3, title: 'Inverter Firmware Update', desc: 'SolarGrid-A1 Inverter was successfully updated to v2.4.1. No downtime recorded.', time: '1 hour ago', type: 'info', icon: CheckCircle2, unread: false },
  { id: 4, title: 'Weekly Efficiency Report', desc: 'Your carbon offset increased by 12% this week! View detailed analytics in the reports section.', time: '4 hours ago', type: 'success', icon: Zap, unread: false },
  { id: 5, title: 'New Peer Connection', desc: 'Neighbor Fatima O. is now connected to your local microgrid trading group.', time: '1 day ago', type: 'info', icon: Clock, unread: false },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-8 max-w-[1000px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Manage system alerts and community activity logs.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">Mark all as read</Button>
          <Button variant="outline" className="glass h-11 text-red-500 hover:text-red-600">Clear all</Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
         <div className="relative flex-1 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
           <input 
             placeholder="Search notifications..." 
             className="w-full bg-white/5 border-none rounded-xl h-12 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
           />
         </div>
         <Button variant="outline" size="icon" className="h-12 w-12 glass">
           <Filter className="w-5 h-5" />
         </Button>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-6 rounded-2xl border transition-all group relative ${
              n.unread 
                ? 'bg-primary/[0.03] border-primary/20 shadow-lg shadow-primary/5' 
                : 'bg-white/5 border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${
                n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
              }`}>
                <n.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                       <h3 className={`font-bold font-outfit ${n.unread ? 'text-foreground' : 'text-foreground/70'}`}>{n.title}</h3>
                       {n.unread && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{n.time}</span>
                 </div>
                 <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{n.desc}</p>
                 <div className="flex items-center gap-4 pt-3">
                    <Button variant="link" className="p-0 h-auto text-xs text-primary font-bold uppercase tracking-wider">Action Required</Button>
                    <Button variant="link" className="p-0 h-auto text-xs text-muted-foreground font-bold uppercase tracking-wider">Dismiss</Button>
                 </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                 <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
