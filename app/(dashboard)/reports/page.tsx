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
  FileText, 
  Download, 
  Share2, 
  ExternalLink, 
  Filter, 
  Search,
  Calendar,
  Zap,
  Leaf,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_REPORTS = [
  { id: 'RPT-001', name: 'Monthly Energy Consumption', type: 'Efficiency', date: 'May 01, 2026', size: '2.4 MB', status: 'Generated' },
  { id: 'RPT-002', name: 'Trading Revenue Summary', type: 'Financial', date: 'Apr 30, 2026', size: '1.8 MB', status: 'Archived' },
  { id: 'RPT-003', name: 'System Health Audit', type: 'Technical', date: 'Apr 15, 2026', size: '4.2 MB', status: 'Generated' },
  { id: 'RPT-004', name: 'Carbon Impact Report', type: 'Sustainability', date: 'Apr 01, 2026', size: '1.2 MB', status: 'Archived' },
  { id: 'RPT-005', name: 'Grid Frequency Analysis', type: 'Technical', date: 'Mar 25, 2026', size: '3.5 MB', status: 'Archived' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Exportable insights and historical performance summaries.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Custom Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none glass group hover:bg-primary/5 transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-outfit">Sustainability Index</h3>
            <p className="text-xs text-muted-foreground mt-1">Impact analysis of green energy usage.</p>
          </CardContent>
        </Card>
        <Card className="border-none glass group hover:bg-primary/5 transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-outfit">Performance Audit</h3>
            <p className="text-xs text-muted-foreground mt-1">Efficiency metrics for all connected hardware.</p>
          </CardContent>
        </Card>
        <Card className="border-none glass group hover:bg-primary/5 transition-all cursor-pointer">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-2xl bg-grina-purple/10 flex items-center justify-center text-grina-purple mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-outfit">Market Forecasting</h3>
            <p className="text-xs text-muted-foreground mt-1">AI-driven projections for future energy prices.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none glass overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                placeholder="Search report archive..." 
                className="w-full bg-accent/30 border-none rounded-lg h-10 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-white/5">
            {MOCK_REPORTS.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-6 hover:bg-accent/20 group transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{report.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">{report.id}</span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] text-muted-foreground">{report.date}</span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] text-muted-foreground">{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Badge variant="outline" className="text-[10px] bg-accent/30 border-none px-3 py-0.5">{report.type}</Badge>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-9 w-9 glass">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 glass">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 glass">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
