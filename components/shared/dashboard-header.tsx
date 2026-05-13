'use client';

import { Search, Command, Globe, Server, ShieldCheck, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from './theme-toggle';
import { NotificationsDropdown } from './notifications-dropdown';
import { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Sidebar } from './sidebar';

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 border-b border-border glass flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 glass">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-64">
               <Sidebar isMobile />
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search telemetry, devices, reports..." 
            className="pl-10 bg-accent/30 border-none group-focus-within:bg-accent/50 text-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <div className="absolute top-full left-0 w-full mt-2 glass border-white/10 rounded-xl p-2 shadow-2xl z-50">
               <p className="text-[10px] uppercase font-bold text-muted-foreground px-2 py-1">Quick Search Results</p>
               <div className="space-y-1">
                  <div className="p-2 hover:bg-white/5 rounded-lg text-xs cursor-pointer flex justify-between">
                     <span className="text-foreground">View <strong>{searchQuery}</strong> in Analytics</span>
                     <span className="text-primary font-bold">↵</span>
                  </div>
                  <div className="p-2 hover:bg-white/5 rounded-lg text-xs cursor-pointer flex justify-between">
                     <span className="text-foreground">Device: BESS-{searchQuery}</span>
                     <span className="text-muted-foreground">Telemtry</span>
                  </div>
               </div>
            </div>
          )}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[10px] text-muted-foreground bg-accent px-1.5 py-0.5 rounded border border-border">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3 mr-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-accent/40 px-3 py-1 rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Telemetry
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationsDropdown />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2 glass h-10 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary">
                    <Server className="w-3.5 h-3.5" />
                  </div>
                  <span className="hidden sm:inline text-foreground">SolarGrid-A1</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass border-white/10">
              <DropdownMenuLabel className="text-foreground">Switch Project</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="gap-2 focus:bg-white/5 text-foreground">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                SolarGrid-A1 (Active)
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 focus:bg-white/5 text-foreground">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                WindFarm-X2
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 focus:bg-white/5 text-foreground">
                <div className="w-2 h-2 rounded-full bg-slate-500" />
                Storage-Beta
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="gap-2 text-primary focus:bg-white/5">
                <ShieldCheck className="w-4 h-4" />
                Management Console
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
