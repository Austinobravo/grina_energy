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
  Cpu, 
  Battery, 
  Sun, 
  Box, 
  Settings, 
  Activity, 
  Wifi, 
  AlertCircle,
  MoreVertical,
  Plus,
  RefreshCcw,
  Zap
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

const MOCK_DEVICES = [
  { id: 'ESS-001', name: 'Battery System A', type: 'Battery', status: 'Online', health: '98%', power: '2.4 kW', signal: 'Strong', firmware: 'v2.4.1' },
  { id: 'INV-042', name: 'Main Inverter', type: 'Inverter', status: 'Online', health: '95%', power: '5.2 kW', signal: 'Medium', firmware: 'v1.8.9' },
  { id: 'SUN-102', name: 'Roof Panel Array', type: 'Solar', status: 'Online', health: '92%', power: '4.8 kW', signal: 'Strong', firmware: 'N/A' },
  { id: 'GAT-001', name: 'Grina Gateway', type: 'Gateway', status: 'Online', health: '100%', power: '0.05 kW', signal: 'Strong', firmware: 'v3.0.2' },
  { id: 'ESS-002', name: 'Backup Battery', type: 'Battery', status: 'Standby', health: '99%', power: '0.0 kW', signal: 'Weak', firmware: 'v2.4.1' },
  { id: 'PCS-088', name: 'PCS Unit', type: 'PCS', status: 'Warning', health: '88%', power: '1.2 kW', signal: 'Medium', firmware: 'v1.2.0' },
];

export default function DevicesPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight">Device Management</h1>
          <p className="text-muted-foreground mt-1">Monitor and manage all hardware connected to SolarGrid-A1</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh Status
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add New Device
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Devices</p>
                <h4 className="text-2xl font-bold font-outfit">12</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Status</p>
                <h4 className="text-2xl font-bold font-outfit">11/12</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Warnings</p>
                <h4 className="text-2xl font-bold font-outfit">2</h4>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none glass">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-grina-purple/10 text-grina-purple">
                <RefreshCcw className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Updates Pending</p>
                <h4 className="text-2xl font-bold font-outfit">1</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none glass overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-outfit">All Connected Devices</CardTitle>
            <CardDescription>Comprehensive list of industrial hardware assets</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="glass h-8 px-3 text-xs">Filter</Button>
            <Button variant="outline" size="sm" className="glass h-8 px-3 text-xs">Export CSV</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-accent/30">
              <TableRow>
                <TableHead className="pl-6 font-bold uppercase text-[10px]">Device Name</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Type</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Status</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Power</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Health</TableHead>
                <TableHead className="font-bold uppercase text-[10px]">Signal</TableHead>
                <TableHead className="pr-6 text-right font-bold uppercase text-[10px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_DEVICES.map((device, index) => (
                <TableRow key={device.id} className="hover:bg-accent/20 border-border/50">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        {device.type === 'Battery' ? <Battery className="w-4 h-4 text-primary" /> : 
                         device.type === 'Inverter' ? <Box className="w-4 h-4 text-cyan-500" /> :
                         device.type === 'Solar' ? <Sun className="w-4 h-4 text-emerald-500" /> :
                         <Cpu className="w-4 h-4 text-grina-purple" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{device.name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{device.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] h-5">{device.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        device.status === 'Online' ? 'bg-emerald-500' : 
                        device.status === 'Warning' ? 'bg-amber-500' : 'bg-slate-500'
                      }`} />
                      <span className="text-xs font-medium">{device.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium font-mono">{device.power}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-accent rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: device.health }}
                        />
                      </div>
                      <span className="text-[10px] font-bold">{device.health}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Wifi className="w-3 h-3" />
                      <span className="text-[10px] font-medium">{device.signal}</span>
                    </div>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="gap-2">
                          <Activity className="w-4 h-4" />
                          View Telemetry
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Settings className="w-4 h-4" />
                          Configure Device
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <RefreshCcw className="w-4 h-4" />
                          Update Firmware
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
