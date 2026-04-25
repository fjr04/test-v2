"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Hexagon, 
  LayoutDashboard, 
  Layers, 
  CloudLightning, 
  GitMerge, 
  ShieldAlert, 
  HardDrive, 
  ActivitySquare, 
  TerminalSquare, 
  Settings
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: Layers },
  { name: 'Deployments', href: '/deployments', icon: CloudLightning },
  { name: 'Pipelines', href: '/pipelines', icon: GitMerge },
  { name: 'Security', href: '/security', icon: ShieldAlert },
  { name: 'Infrastructure', href: '/infrastructure', icon: HardDrive },
  { name: 'Monitoring', href: '/monitoring', icon: ActivitySquare },
  { name: 'Logs', href: '/logs', icon: TerminalSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-[260px] border-r border-zinc-800/50 bg-zinc-950/80 backdrop-blur-2xl h-screen flex flex-col shrink-0 relative z-20 shadow-2xl">
      {/* Logo */}
      <div className="h-[72px] flex items-center px-6">
        <div className="relative h-8 w-8 flex items-center justify-center mr-3">
           <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-lg blur opacity-50"></div>
           <div className="relative h-full w-full bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-700 shadow-inner">
             <Hexagon className="h-4 w-4 text-amber-500 fill-amber-500/20" />
           </div>
        </div>
        <div>
          <div className="font-extrabold text-zinc-100 tracking-wide text-lg uppercase bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Alchemist</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-1.5 custom-scrollbar">
        <div className="px-3 mb-4 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">Platform</div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer outline-none",
                isActive ? "text-amber-50" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 bg-zinc-800/80 border border-zinc-700/50 rounded-xl shadow-inner"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-amber-400 to-orange-500 rounded-r-full" />}
              
              <item.icon className={cn("h-[18px] w-[18px] relative z-10", isActive ? "text-amber-400" : "text-zinc-500 group-hover:text-zinc-300")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile / Settings */}
      <div className="p-4 border-t border-zinc-800/50 bg-zinc-950/50">
        <Link href="/settings" className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700/50 transition-all cursor-pointer group">
           <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-zinc-600 flex items-center justify-center overflow-hidden">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=27272a" alt="User Avatar" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">Admin</div>
                <div className="text-[10px] text-zinc-500 font-mono">admin@alch.emist</div>
              </div>
           </div>
           <Settings className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
