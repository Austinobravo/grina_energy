'use client';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  MapPin, 
  Zap, 
  Activity, 
  ArrowUpRight, 
  LayoutGrid, 
  List,
  MoreVertical,
  Building2,
  Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_PROJECTS = [
  { id: '1', name: 'Lagos Island Microgrid', location: 'Lagos, Nigeria', capacity: '250kW', health: 98, status: 'Active', devices: 42, carbon: '12.4t' },
  { id: '2', seller: 'Abuja Residential Hub', location: 'Abuja, Nigeria', capacity: '120kW', health: 94, status: 'Active', devices: 28, carbon: '5.8t' },
  { id: '3', seller: 'Ibadan Tech Park', location: 'Ibadan, Nigeria', capacity: '500kW', health: 82, status: 'Maintenance', devices: 64, carbon: '22.1t' },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">Multi-Site Projects</h1>
          <p className="text-muted-foreground mt-1">Manage all your distributed energy resource (DER) sites.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <LayoutGrid className="w-4 h-4 mr-2" />
            Grid View
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11">
            <Plus className="w-4 h-4 mr-2" />
            New Site
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-none glass hover:bg-white/5 transition-all group overflow-hidden">
              <CardHeader className="pb-4 border-b border-white/5">
                <div className="flex justify-between items-start">
                   <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                      <Building2 className="w-6 h-6" />
                   </div>
                   <Badge className={`${project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'} border-none text-[10px]`}>
                      {project.status}
                   </Badge>
                </div>
                <CardTitle className="text-xl font-outfit text-white">{project.name || project.seller}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                   <MapPin className="w-3 h-3" />
                   {project.location}
                </div>
              </CardHeader>
              <CardContent className="py-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Capacity</p>
                      <p className="text-lg font-bold text-white font-outfit">{project.capacity}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">Health</p>
                      <p className="text-lg font-bold text-emerald-500 font-outfit">{project.health}%</p>
                   </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                   <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs text-muted-foreground">Carbon Saved</span>
                   </div>
                   <span className="text-sm font-bold text-white">{project.carbon}</span>
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 pt-4">
                <Button variant="ghost" className="w-full text-xs text-primary group-hover:gap-3 transition-all">
                  Access Control Center
                  <ArrowUpRight className="w-3 h-3 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/5 transition-all"
        >
           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
           </div>
           <h3 className="text-lg font-bold text-white font-outfit">Add New Site</h3>
           <p className="text-xs text-muted-foreground mt-1">Onboard a new DER or Microgrid project.</p>
        </motion.div>
      </div>
    </div>
  );
}
