'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  PlayCircle, 
  Plus, 
  Zap, 
  Moon, 
  Sun, 
  ArrowRight, 
  Clock, 
  ShieldAlert,
  Trash2,
  Edit2,
  Settings2
} from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_RULES = [
  { id: '1', name: 'Off-Peak Charging', description: 'Charge batteries when grid price is below $0.08/kWh', type: 'Economic', active: true, icon: Moon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: '2', name: 'Surplus Export', description: 'Sell energy to marketplace when battery SOC > 90%', type: 'Market', active: true, icon: ArrowRight, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: '3', name: 'Critical Backup', description: 'Maintain min 20% SOC for emergency backup', type: 'Safety', active: true, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: '4', name: 'Solar Optimization', description: 'Priority charge battery from solar before export', type: 'Efficiency', active: false, icon: Sun, color: 'text-amber-500', bg: 'bg-amber-500/10' },
];

export default function AutomationPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight">Automation Engine</h1>
          <p className="text-muted-foreground mt-1">Configure smart rules and autonomous energy strategies.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_RULES.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none glass group hover:bg-accent/40 transition-all">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div className={`p-3 rounded-2xl ${rule.bg} ${rule.color}`}>
                    <rule.icon className="w-6 h-6" />
                  </div>
                  <Switch checked={rule.active} />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[9px] uppercase tracking-wider">{rule.type}</Badge>
                    {!rule.active && <Badge variant="secondary" className="text-[9px] uppercase tracking-wider">Paused</Badge>}
                  </div>
                  <CardTitle className="text-lg font-outfit">{rule.name}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2 leading-relaxed">
                    {rule.description}
                  </CardDescription>
                </CardContent>
                <div className="px-6 py-4 border-t border-border/10 flex justify-between items-center bg-accent/20">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                    <Clock className="w-3 h-3" />
                    Last triggered: 2h ago
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/50 hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center border-2 border-dashed border-border rounded-3xl p-12 hover:bg-accent/20 transition-all cursor-pointer group"
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="font-bold text-muted-foreground">Add Custom Rule</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Define conditions and actions</p>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <Card className="border-none glass">
            <CardHeader>
              <CardTitle className="font-outfit flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-primary" />
                Global Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">AI Auto-Trading</p>
                    <p className="text-[10px] text-muted-foreground">Allow AI to execute trades based on history</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Smart Load Shedding</p>
                    <p className="text-[10px] text-muted-foreground">Disable non-essential loads during deficit</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Grid Frequency Support</p>
                    <p className="text-[10px] text-muted-foreground">Contribute to grid stability (Revenue+)</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-4">Autonomous Efficiency</p>
                <div className="relative w-full h-32 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="50" fill="transparent" stroke="var(--accent)" strokeWidth="6" />
                    <circle cx="64" cy="64" r="50" fill="transparent" stroke="var(--primary)" strokeWidth="6" strokeDasharray="314" strokeDashoffset="47" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                    <span className="text-2xl font-bold font-outfit">85%</span>
                    <span className="text-[9px] uppercase font-bold text-muted-foreground">Optimization</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none glass bg-primary/10">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Revenue Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-500">+$152.40</p>
              <p className="text-xs text-muted-foreground mt-1">Additional profit this month from autonomous trading rules.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
