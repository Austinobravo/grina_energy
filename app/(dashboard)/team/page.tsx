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
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  Search,
  Filter,
  Trash2,
  Edit2
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

const MOCK_TEAM = [
  { id: '1', name: 'John Doe', email: 'john.doe@grina.energy', role: 'Organization Admin', status: 'Active', avatar: 'JD' },
  { id: '2', name: 'Emeka Segun', email: 'emeka.s@grina.energy', role: 'Energy Technician', status: 'Active', avatar: 'ES' },
  { id: '3', name: 'Fatima Olawale', email: 'fatima.o@grina.energy', role: 'Market Analyst', status: 'Active', avatar: 'FO' },
  { id: '4', name: 'Segun Arinze', email: 'segun.a@grina.energy', role: 'Viewer', status: 'Inactive', avatar: 'SA' },
];

export default function TeamPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">Team Management</h1>
          <p className="text-muted-foreground mt-1">Manage user roles and permissions for your energy grid.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11">
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {[
           { label: 'Total Members', value: '12' },
           { label: 'Admins', value: '3' },
           { label: 'Active Now', value: '5' },
           { label: 'Pending Invites', value: '2' },
         ].map((stat, i) => (
           <Card key={i} className="border-none glass p-6">
              <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white font-outfit">{stat.value}</p>
           </Card>
         ))}
      </div>

      <div className="flex items-center gap-4">
         <div className="relative flex-1 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
           <input 
             placeholder="Search by name, email or role..." 
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
              <TableHead className="py-4 pl-6 text-[10px] uppercase font-bold text-muted-foreground">Member</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Role</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground">Status</TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-muted-foreground text-right pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TEAM.map((member, index) => (
              <motion.tr
                key={member.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <TableCell className="pl-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{member.name}</p>
                      <p className="text-[10px] text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <Shield className="w-3 h-3 text-primary" />
                    {member.role}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-white/10 text-white'} border-none text-[10px]`}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                   <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                         <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                         <Trash2 className="w-3 h-3" />
                      </Button>
                   </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
