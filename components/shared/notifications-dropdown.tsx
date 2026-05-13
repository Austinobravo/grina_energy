'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, Zap, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Surplus Exported', desc: 'Sold 12kWh to Neighbor Emeka.', time: '2m ago', type: 'success', icon: Zap },
  { id: 2, title: 'Battery Low', desc: 'SOC below 20%. Grid charging active.', time: '15m ago', type: 'warning', icon: AlertTriangle },
  { id: 3, title: 'Inverter Restart', desc: 'Firmware update completed.', time: '1h ago', type: 'info', icon: CheckCircle2 },
];

export function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass h-10 w-10 rounded-xl relative">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 glass border-white/10 p-2">
        <div className="flex items-center justify-between px-2 py-2 mb-2">
           <span className="text-sm font-bold text-foreground">Notifications</span>
           <Link href="/notifications" className="text-[10px] text-primary hover:underline font-bold uppercase tracking-wider">View All</Link>
        </div>
        <DropdownMenuSeparator className="bg-white/5" />
        <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
           {MOCK_NOTIFICATIONS.map((n) => (
             <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 focus:bg-white/5 rounded-xl cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                   <div className={`p-1.5 rounded-lg ${
                     n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 
                     n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                   }`}>
                      <n.icon className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-sm font-bold text-foreground">{n.title}</span>
                   <span className="ml-auto text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-8">{n.desc}</p>
             </DropdownMenuItem>
           ))}
        </div>
        <DropdownMenuSeparator className="bg-white/5" />
        <Button variant="ghost" className="w-full text-[10px] uppercase font-bold text-muted-foreground h-8 mt-1 gap-2" asChild>
           <Link href="/notifications">
             Open Notifications Center
             <ArrowRight className="w-3 h-3" />
           </Link>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
