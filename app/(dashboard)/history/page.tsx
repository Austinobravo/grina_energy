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
  Search, 
  Filter, 
  Download, 
  Calendar,
  History as HistoryIcon,
  Zap,
  ArrowUpRight,
  ArrowDownCircle,
  ExternalLink
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

const MOCK_HISTORY = [
  { id: 'EVT-9201', event: 'Grid Export Auto-Start', device: 'Inverter-01', timestamp: '2026-05-13 10:45:22', status: 'Completed', details: 'Surplus detected, exporting 2.4kW' },
  { id: 'EVT-9195', event: 'Battery Full Charge', device: 'BESS-01', timestamp: '2026-05-13 10:30:15', status: 'Success', details: 'SOC reached 100%' },
  { id: 'EVT-9182', event: 'Trading Strategy Applied', device: 'System AI', timestamp: '2026-05-13 09:15:00', status: 'Active', details: 'Mode set to PROFIT_MAX' },
  { id: 'EVT-9170', event: 'Neighbor Purchase', device: 'Marketplace', timestamp: '2026-05-13 08:22:44', status: 'Settled', details: 'Bought 15kWh from Neighbor Segun' },
  { id: 'EVT-9165', event: 'Solar Spike Detected', device: 'Panels-A', timestamp: '2026-05-13 07:45:10', status: 'Logged', details: 'Peak generation 8.2kW reached' },
  { id: 'EVT-9150', event: 'Night Mode Discharge', device: 'BESS-01', timestamp: '2026-05-13 00:00:01', status: 'Success', details: 'Discharge started for overnight load' },
];

export default function HistoryPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">System History</h1>
          <p className="text-muted-foreground mt-1">Detailed historical logs of all energy events and transactions.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <Download className="w-4 h-4 mr-2" />
            CSV Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            <Calendar className="w-4 h-4 mr-2" />
            Select Range
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
         <div className="relative flex-1 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
           <input 
             placeholder="Search event logs..." 
             className="w-full bg-white/5 border-none rounded-xl h-12 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
           />
         </div>
         <Button variant="outline" size="icon" className="h-12 w-12 glass">
           <Filter className="w-5 h-5" />
         </Button>
      </div>

      <Card className="border-none glass overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/5">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground py-4">Event ID</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Description</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Device/Source</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Timestamp</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Status</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_HISTORY.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
              >
                <TableCell className="font-mono text-[10px] text-primary">{item.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">{item.event}</span>
                    <span className="text-[10px] text-muted-foreground">{item.details}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-white">{item.device}</TableCell>
                <TableCell className="text-[10px] text-muted-foreground font-mono">{item.timestamp}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[8px] uppercase border-none h-5 ${
                    item.status === 'Completed' || item.status === 'Success' ? 'bg-emerald-500/10 text-emerald-500' :
                    item.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-white/10 text-white'
                  }`}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors">
                      <ExternalLink className="w-3 h-3" />
                   </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
