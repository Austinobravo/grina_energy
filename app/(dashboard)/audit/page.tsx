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
  ShieldCheck, 
  Lock, 
  User, 
  Search, 
  Filter, 
  Download,
  AlertCircle,
  Clock,
  ExternalLink,
  ShieldAlert
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

const MOCK_AUDIT_LOGS = [
  { id: 'AUD-001', action: 'Login Success', user: 'john.doe@grina.energy', ip: '192.168.1.45', timestamp: '2026-05-13 11:30:15', severity: 'Info', status: 'Success' },
  { id: 'AUD-002', action: 'Config Update', user: 'admin@grina.energy', ip: '10.0.0.12', timestamp: '2026-05-13 10:45:22', severity: 'Warning', status: 'Modified' },
  { id: 'AUD-003', action: 'Withdrawal Initiated', user: 'emeka.s@neighbor.com', ip: '192.168.1.102', timestamp: '2026-05-13 09:15:00', severity: 'Critical', status: 'Pending' },
  { id: 'AUD-004', action: 'API Key Created', user: 'john.doe@grina.energy', ip: '192.168.1.45', timestamp: '2026-05-13 08:22:44', severity: 'Info', status: 'Success' },
  { id: 'AUD-005', action: 'Failed Login Attempt', user: 'unknown', ip: '45.12.33.9', timestamp: '2026-05-13 07:45:10', severity: 'High', status: 'Blocked' },
  { id: 'AUD-006', action: 'Trading Rule Enabled', user: 'system_ai', ip: 'internal', timestamp: '2026-05-13 00:00:01', severity: 'Info', status: 'Success' },
];

export default function AuditPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Forensic security and administrative action trail.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <Download className="w-4 h-4 mr-2" />
            Export Audit
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Security Overview
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none glass bg-emerald-500/5">
            <CardContent className="p-6">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                     <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-white">System Integrity</span>
               </div>
               <p className="text-2xl font-bold text-white font-outfit">SECURE</p>
               <p className="text-xs text-muted-foreground mt-1">Last scan completed 12 mins ago.</p>
            </CardContent>
         </Card>
         <Card className="border-none glass bg-amber-500/5">
            <CardContent className="p-6">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                     <AlertCircle className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-white">Security Alerts</span>
               </div>
               <p className="text-2xl font-bold text-white font-outfit">2 ACTIVE</p>
               <p className="text-xs text-muted-foreground mt-1">Requires administrative review.</p>
            </CardContent>
         </Card>
         <Card className="border-none glass">
            <CardContent className="p-6">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                     <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-white">Admin Activity</span>
               </div>
               <p className="text-2xl font-bold text-white font-outfit">148</p>
               <p className="text-xs text-muted-foreground mt-1">Actions recorded in the last 24h.</p>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none glass overflow-hidden">
         <div className="p-6 border-b border-white/5 flex items-center gap-4">
            <div className="relative flex-1 group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
               <input 
                  placeholder="Filter by user, action or IP..." 
                  className="w-full bg-white/5 border-none rounded-xl h-11 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
               />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 glass">
               <Filter className="w-5 h-5" />
            </Button>
         </div>
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground py-4 pl-6">ID</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Action</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">User</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">IP Address</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Timestamp</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Severity</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground text-right pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_AUDIT_LOGS.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
              >
                <TableCell className="font-mono text-[10px] text-primary pl-6">{item.id}</TableCell>
                <TableCell className="text-sm font-bold text-white">{item.action}</TableCell>
                <TableCell className="text-xs text-white/80">{item.user}</TableCell>
                <TableCell className="text-[10px] text-muted-foreground font-mono">{item.ip}</TableCell>
                <TableCell className="text-[10px] text-muted-foreground font-mono">{item.timestamp}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[8px] uppercase border-none h-5 ${
                    item.severity === 'Info' ? 'bg-emerald-500/10 text-emerald-500' :
                    item.severity === 'Warning' ? 'bg-amber-500/10 text-amber-500' :
                    item.severity === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-white/10 text-white'
                  }`}>
                    {item.severity}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                   <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.status}</span>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
