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
  BrainCircuit, 
  TrendingUp, 
  Zap, 
  Lightbulb, 
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIInsightsPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">AI Strategy Insights</h1>
          <p className="text-muted-foreground mt-1">Autonomous optimization and predictive analytics engine.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
          <Sparkles className="w-4 h-4 mr-2" />
          Retrain Model
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommendation Cards */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none glass bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                Active Strategy: Profit Maximization
              </CardTitle>
              <CardDescription>Current autonomous logic focused on grid arbitrage and peak shaving.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <p className="text-xs font-bold text-primary uppercase">Current Action</p>
                  <p className="text-lg font-bold text-white">Grid Arbitrage Active</p>
                  <p className="text-xs text-muted-foreground">Buying at ₦42/kWh, selling at ₦120/kWh predicted for 6 PM.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <p className="text-xs font-bold text-emerald-500 uppercase">Projected Yield</p>
                  <p className="text-lg font-bold text-white">+₦12,400 Monthly</p>
                  <p className="text-xs text-muted-foreground">Based on current battery cycling efficiency.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <h3 className="text-xl font-bold font-outfit text-white">Smart Recommendations</h3>
          <div className="space-y-4">
            {[
              { icon: Lightbulb, title: "Shift Heavy Loads", desc: "Run your water pump between 11 AM and 1 PM today to utilize 100% solar surplus.", impact: "Save ₦1,200", color: "text-amber-500" },
              { icon: Zap, title: "Optimize Discharge Rate", desc: "Reduce discharge rate to 15A to extend battery life cycle by 12% over next 6 months.", impact: "Long-term Value", color: "text-primary" },
              { icon: ShieldCheck, title: "Preventative Maintenance", desc: "Inverter-02 cooling fan efficiency is down 8%. Schedule a clean-up to prevent thermal throttling.", impact: "System Health", color: "text-emerald-500" },
            ].map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 rounded-2xl glass hover:bg-white/5 transition-all group cursor-pointer border-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${rec.color}`}>
                    <rec.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 max-w-md">{rec.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-primary/20 text-primary border-none mb-2">{rec.impact}</Badge>
                  <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Prediction Stats */}
        <div className="space-y-6">
          <Card className="border-none glass">
            <CardHeader>
              <CardTitle className="text-white font-outfit">Model Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Prediction Accuracy</span>
                  <span className="font-bold text-emerald-500">94.2%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[94.2%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Data Points (24h)</span>
                  <span className="font-bold text-white">864,200</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[80%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none glass bg-primary/10">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-white">
                <Target className="w-4 h-4" />
                Savings Target
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white font-outfit">₦85,000</p>
              <p className="text-xs text-muted-foreground mt-1">Target savings from AI optimization this quarter.</p>
              <div className="mt-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-500">+12% ahead of plan</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
