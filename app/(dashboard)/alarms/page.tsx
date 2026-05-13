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
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle2, 
  Filter, 
  Search,
  MoreHorizontal,
  BellOff,
  ExternalLink,
  BrainCircuit
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { motion } from 'framer-motion';

const MOCK_ALARMS = [
  { id: 'ALM-902', device: 'Inverter-02', level: 'High', message: 'Input Voltage Instability', time: '10:42:15', status: 'Active', category: 'Electrical' },
  { id: 'ALM-899', device: 'BESS-01', level: 'Critical', message: 'Cell Temperature Over Limit', time: '10:38:02', status: 'Acknowledged', category: 'Thermal' },
  { id: 'ALM-895', device: 'Gateway-A', level: 'Medium', message: 'Latency spike detected', time: '10:15:22', status: 'Active', category: 'Comm' },
  { id: 'ALM-880', device: 'Solar-Array-B', level: 'Info', message: 'Optimization rule applied', time: '09:45:10', status: 'Resolved', category: 'System' },
  { id: 'ALM-872', device: 'Main Meter', level: 'High', message: 'Phase imbalance detected', time: '08:22:14', status: 'Active', category: 'Electrical' },
];

export default function AlarmsPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight">Alarms & Alerts</h1>
          <p className="text-muted-foreground mt-1">Industrial monitoring and incident management.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass">
            <BellOff className="w-4 h-4 mr-2" />
            Silence All
          </Button>
          <Button className="bg-grina-red hover:bg-grina-red/90 text-white">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Acknowledge All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 border-none glass">
          <CardHeader>
            <CardTitle className="text-sm font-outfit uppercase tracking-wider text-muted-foreground">AI Root Cause Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-primary mb-2">
                <BrainCircuit className="w-5 h-5" />
                <span className="text-sm font-bold">Grina Insights</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Current alarms in <span className="font-bold text-foreground">Inverter-02</span> suggest a potential grid-side fluctuation. Recommend checking phase synchronization.
              </p>
              <Button variant="link" className="text-[10px] p-0 h-auto mt-2 text-primary">View Full Analysis</Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Severity Distribution</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Critical</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="w-full h-1.5 bg-accent rounded-full">
                  <div className="h-full bg-red-500 w-[20%]" />
                </div>
                <div className="flex justify-between text-xs">
                  <span>High</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="w-full h-1.5 bg-accent rounded-full">
                  <div className="h-full bg-amber-500 w-[40%]" />
                </div>
                <div className="flex justify-between text-xs">
                  <span>Medium/Low</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="w-full h-1.5 bg-accent rounded-full">
                  <div className="h-full bg-blue-500 w-[40%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none glass overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  placeholder="Search alarm history..." 
                  className="w-full bg-accent/30 border-none rounded-lg h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <Button variant="outline" size="icon" className="glass">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-accent/30">
                <TableRow>
                  <TableHead className="pl-6 text-[10px] font-bold uppercase">ID</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Level</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Device</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Message</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Time</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Status</TableHead>
                  <TableHead className="pr-6 text-right text-[10px] font-bold uppercase">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ALARMS.map((alarm, index) => (
                  <motion.tr
                    key={alarm.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-accent/20 border-border/50 group"
                  >
                    <TableCell className="pl-6 py-4 font-mono text-xs">{alarm.id}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`text-[9px] uppercase border-none ${
                          alarm.level === 'Critical' ? 'bg-red-500/10 text-red-500' :
                          alarm.level === 'High' ? 'bg-amber-500/10 text-amber-500' :
                          alarm.level === 'Medium' ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-500/10 text-slate-500'
                        }`}
                      >
                        {alarm.level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-semibold">{alarm.device}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{alarm.message}</TableCell>
                    <TableCell className="text-xs font-mono">{alarm.time}</TableCell>
                    <TableCell>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alarm.status === 'Active' ? 'bg-red-500 text-white' : 
                        alarm.status === 'Acknowledged' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
                      }`}>
                        {alarm.status}
                      </span>
                    </TableCell>
                    <TableCell className="pr-6 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
