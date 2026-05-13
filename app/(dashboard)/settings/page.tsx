'use client';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Database, 
  Key, 
  Globe,
  Save,
  Trash2
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-4xl font-bold font-outfit tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account, organization, and platform preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="glass p-1 h-auto">
          <TabsTrigger value="profile" className="gap-2 px-4 py-2"><User className="w-4 h-4" /> Profile</TabsTrigger>
          <TabsTrigger value="org" className="gap-2 px-4 py-2"><Building2 className="w-4 h-4" /> Organization</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 px-4 py-2"><Bell className="w-4 h-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="security" className="gap-2 px-4 py-2"><Shield className="w-4 h-4" /> Security</TabsTrigger>
          <TabsTrigger value="api" className="gap-2 px-4 py-2"><Key className="w-4 h-4" /> API Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-none glass">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and avatar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary border-2 border-primary/20">
                  JD
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="glass">Change Photo</Button>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Max size 2MB. JPG or PNG.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" className="glass border-none h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="john.doe@grina.energy" className="glass border-none h-11" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-none glass">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive alerts and system updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {[
                  { title: 'Critical Alarms', desc: 'Instant push notifications for high-severity alerts.', default: true },
                  { title: 'Trading Activity', desc: 'Daily summary of energy sales and purchases.', default: true },
                  { title: 'Device Status', desc: 'Weekly report on hardware health and connectivity.', default: false },
                  { title: 'Market Updates', desc: 'Real-time price fluctuation alerts.', default: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/30 transition-colors">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={item.default} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
           <Card className="border-none glass">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>API Integrations</CardTitle>
                  <CardDescription>Access telemetry and trading data programmatically.</CardDescription>
                </div>
                <Button variant="outline" className="glass">Generate Token</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Production-Key-01</p>
                      <p className="text-xs font-mono text-muted-foreground">grina_live_••••••••••••••••</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Active</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/50 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
