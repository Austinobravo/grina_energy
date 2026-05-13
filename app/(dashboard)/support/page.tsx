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
import { Input } from '@/components/ui/input';
import { 
  LifeBuoy, 
  MessageSquare, 
  FileText, 
  Phone, 
  Search, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Video
} from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <div className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-bold font-outfit tracking-tight text-white">How can we help you?</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Access our industrial documentation, connect with an energy expert, or monitor your ongoing support tickets.
        </p>
        <div className="relative max-w-xl mx-auto group">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
           <Input 
             placeholder="Search documentation, guides, or error codes..." 
             className="h-14 pl-12 glass border-none text-white text-lg rounded-2xl" 
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: MessageSquare, title: "Live Chat", desc: "Speak with a Grina expert in real-time.", action: "Start Chat" },
          { icon: Phone, title: "Technical Support", desc: "Dedicated line for hardware emergencies.", action: "View Numbers" },
          { icon: FileText, title: "Documentation", desc: "Detailed API and integration manuals.", action: "Read Docs" },
        ].map((box, i) => (
          <Card key={i} className="border-none glass group hover:bg-white/5 transition-all text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
              <box.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-outfit">{box.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-6">{box.desc}</p>
            <Button variant="outline" className="w-full glass">{box.action}</Button>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none glass">
           <CardHeader>
              <CardTitle className="text-white">Recent Support Tickets</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              {[
                { id: "TCK-102", subject: "Inverter-02 Sync Error", status: "In Progress", date: "2h ago" },
                { id: "TCK-098", subject: "BESS Capacity Recalibration", status: "Resolved", date: "2 days ago" },
                { id: "TCK-085", subject: "GrinaPay API Webhook", status: "Resolved", date: "5 days ago" },
              ].map((ticket, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-accent/30 text-muted-foreground font-mono text-[10px]">
                      {ticket.id}
                    </div>
                    <div>
                       <p className="text-sm font-bold text-white">{ticket.subject}</p>
                       <p className="text-[10px] text-muted-foreground uppercase">{ticket.date}</p>
                    </div>
                  </div>
                  <Badge className={`${ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'} border-none`}>
                    {ticket.status}
                  </Badge>
                </div>
              ))}
              <Button variant="link" className="w-full text-muted-foreground gap-2">
                View All Tickets
                <ChevronRight className="w-4 h-4" />
              </Button>
           </CardContent>
        </Card>

        <Card className="border-none glass">
           <CardHeader>
              <CardTitle className="text-white">Knowledge Base</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              {[
                "Troubleshooting Inverter Phase Imbalance",
                "How to optimize P2P energy trading prices",
                "Integrating mobile money with GrinaPay",
                "Hardware Warranty and Replacement Policy",
              ].map((article, i) => (
                <div key={i} className="flex items-center justify-between p-3 hover:text-primary transition-colors cursor-pointer group">
                  <span className="text-sm text-white/80 group-hover:text-primary">{article}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
