'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Leaf, LogOut } from 'lucide-react';
import { LogoutDialog } from './logout-dialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function Sidebar({ isMobile }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    router.push('/login');
  };

  return (
    <>
      <aside className={cn(
        "w-64 h-screen border-r border-border glass flex flex-col overflow-hidden sticky top-0 transition-all",
        !isMobile && "hidden lg:flex",
        isMobile && "w-full"
      )}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Leaf className="text-primary-foreground w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight leading-none text-foreground">Grina</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Energy OS</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
          {NAV_ITEMS.map((item, index) => {
            if (item.type === 'separator') {
              return (
                <div key={`sep-${index}`} className="pt-4 pb-2">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground/60 px-3 tracking-wider">
                    {item.label}
                  </span>
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href as string}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                  isActive 
                    ? "text-primary bg-primary/10 shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
                <Icon className={cn(
                  "w-4 h-4 transition-transform group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border bg-accent/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                JD
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">John Doe</span>
                <span className="text-[10px] text-muted-foreground">Admin</span>
              </div>
            </div>
            <button 
              onClick={() => setIsLogoutDialogOpen(true)}
              className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <LogoutDialog 
        isOpen={isLogoutDialogOpen} 
        onClose={() => setIsLogoutDialogOpen(false)} 
        onConfirm={handleLogout} 
      />
    </>
  );
}


