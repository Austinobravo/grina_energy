'use client';

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  TrendingUp, 
  Zap, 
  Calendar,
  Wind
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const FORECAST_DATA = [
  { time: '06:00', solar: 0, load: 1.2, weather: 'Clear' },
  { time: '08:00', solar: 1.5, load: 2.5, weather: 'Clear' },
  { time: '10:00', solar: 4.2, load: 3.8, weather: 'Partly Cloudy' },
  { time: '12:00', solar: 6.8, load: 4.2, weather: 'Sunny' },
  { time: '14:00', solar: 7.2, load: 3.5, weather: 'Sunny' },
  { time: '16:00', solar: 4.5, load: 3.0, weather: 'Partly Cloudy' },
  { time: '18:00', solar: 1.2, load: 5.5, weather: 'Clear' },
  { time: '20:00', solar: 0, load: 6.2, weather: 'Clear' },
];

export default function ForecastingPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold font-outfit tracking-tight text-white">Weather & Yield Forecast</h1>
          <p className="text-muted-foreground mt-1">Predictive solar generation and load demand modeling.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass h-11">
            <Calendar className="w-4 h-4 mr-2" />
            Next 7 Days
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-bold">
            Apply Forecast Strategy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Weather Summary */}
        <div className="xl:col-span-1 space-y-6">
          <Card className="border-none glass overflow-hidden">
            <div className="p-8 bg-gradient-to-br from-primary/20 to-transparent flex flex-col items-center text-center">
              <Sun className="w-20 h-20 text-amber-500 mb-4 animate-pulse-slow" />
              <h2 className="text-4xl font-bold text-white font-outfit">32°C</h2>
              <p className="text-lg font-bold text-white mt-1 uppercase tracking-widest">Sunny</p>
              <p className="text-xs text-muted-foreground mt-2">Lagos, Nigeria • 12:45 PM</p>
            </div>
            <CardContent className="p-6 space-y-4">
               <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-muted-foreground flex items-center gap-2"><Wind className="w-4 h-4" /> Wind Speed</span>
                  <span className="text-sm font-bold text-white">12 km/h</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-muted-foreground flex items-center gap-2"><CloudRain className="w-4 h-4" /> Humidity</span>
                  <span className="text-sm font-bold text-white">65%</span>
               </div>
               <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-2"><Zap className="w-4 h-4" /> UV Index</span>
                  <span className="text-sm font-bold text-white">9 (Very High)</span>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none glass">
             <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Generation Projection</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="text-3xl font-bold text-emerald-500 font-outfit">42.5 kWh</div>
                <p className="text-[10px] text-muted-foreground mt-1">Total projected solar yield for the next 24 hours.</p>
             </CardContent>
          </Card>
        </div>

        {/* Forecast Chart */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="border-none glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white font-outfit">24-Hour Predictive Model</CardTitle>
                <CardDescription>Solar Yield vs. Expected Consumption</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Solar (Predicted)
                 </div>
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    Load (Predicted)
                 </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={FORECAST_DATA}>
                    <defs>
                      <linearGradient id="colorSolarF" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-grina-emerald)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--color-grina-emerald)" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLoadF" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="time" stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff20" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}kW`} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px' }} />
                    <Area type="monotone" dataKey="solar" stroke="var(--color-grina-emerald)" fill="url(#colorSolarF)" strokeWidth={3} />
                    <Area type="monotone" dataKey="load" stroke="var(--primary)" fill="url(#colorLoadF)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { day: 'Tue', temp: '32°', icon: Sun, color: 'text-amber-500' },
               { day: 'Wed', temp: '30°', icon: Cloud, color: 'text-blue-400' },
               { day: 'Thu', temp: '28°', icon: CloudRain, color: 'text-blue-500' },
               { day: 'Fri', temp: '31°', icon: Sun, color: 'text-amber-500' },
             ].map((day, i) => (
               <Card key={i} className="border-none glass p-4 text-center hover:bg-white/5 transition-all">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-2">{day.day}</p>
                  <day.icon className={`w-8 h-8 mx-auto mb-2 ${day.color}`} />
                  <p className="text-lg font-bold text-white">{day.temp}</p>
               </Card>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
