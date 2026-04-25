"use client";

import { useState } from 'react';
import { Bell, Search, Hexagon, ChevronDown, Plus, Sparkles, X, Terminal } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function Topbar() {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  return (
    <div className="h-[72px] border-b border-zinc-800/50 bg-zinc-950/40 backdrop-blur-md flex items-center justify-between px-8 shrink-0 sticky top-0 z-40">
      
      {/* Left side: Org Switcher */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center space-x-2 text-zinc-300 hover:text-white cursor-pointer font-medium text-sm outline-none transition-colors px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 border border-transparent hover:border-zinc-700/50">
            <Hexagon className="h-4 w-4 text-amber-500 fill-amber-500/10" />
            <span>Skyline Nexus</span>
            <ChevronDown className="h-3 w-3 text-zinc-500" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="min-w-[220px] bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-1 mt-2 text-sm z-50 animate-in fade-in slide-in-from-top-2">
            <DropdownMenu.Label className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Organizations</DropdownMenu.Label>
            <DropdownMenu.Item className="flex items-center px-3 py-2 outline-none cursor-pointer rounded-lg bg-zinc-800 text-zinc-100 font-medium">
              <Hexagon className="h-4 w-4 mr-2 text-amber-500" />
              Skyline Nexus
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="h-px bg-zinc-800 my-1" />
            <DropdownMenu.Item className="flex items-center px-3 py-2 outline-none cursor-pointer rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              New Organization
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Center: Search command center (mock) */}
      <div className="flex-1 max-w-lg mx-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors" />
          <input 
            type="text"
            placeholder="Search resources, pods, logs... (Cmd+K)"
            className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:bg-zinc-900 focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-zinc-600 text-zinc-200 shadow-inner"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
             <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-800 border border-zinc-700 rounded shadow-sm">⌘</kbd>
             <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 bg-zinc-800 border border-zinc-700 rounded shadow-sm">K</kbd>
          </div>
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-4">
        
        <Link href="/logs" className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg border border-transparent hover:border-zinc-700/50 transition-all outline-none hidden sm:block">
           <Terminal className="h-4 w-4" />
        </Link>
        
        {/* Alerts Bell */}
        <button className="relative p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg border border-transparent hover:border-zinc-700/50 transition-all outline-none">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-orange-500 rounded-full ring-2 ring-zinc-950"></span>
        </button>

        <div className="h-6 w-px bg-zinc-800 mx-2 hidden sm:block"></div>

        {/* Deploy Action */}
        <Dialog.Root open={isDeployModalOpen} onOpenChange={setIsDeployModalOpen}>
          <Dialog.Trigger asChild>
            <button className="group relative px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg text-sm font-bold flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] active:scale-95 outline-none">
              <Sparkles className="h-4 w-4 text-amber-500 group-hover:text-amber-600" />
              <span>Deploy</span>
            </button>
          </Dialog.Trigger>
          
          <AnimatePresence>
            {isDeployModalOpen && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" 
                  />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="px-6 py-5 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-950/50">
                      <Dialog.Title className="text-lg font-bold text-zinc-100 flex items-center"><Sparkles className="h-4 w-4 text-amber-500 mr-2"/> Cast Deployment</Dialog.Title>
                      <Dialog.Close asChild>
                        <button className="text-zinc-500 hover:text-zinc-100 outline-none rounded-full p-1 hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700">
                          <X className="h-4 w-4" />
                        </button>
                      </Dialog.Close>
                    </div>
                    
                    <div className="p-6 space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-300">Git Repository URL</label>
                        <input type="text" placeholder="https://github.com/org/repo" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-zinc-600" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-zinc-300">Framework</label>
                          <select className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all">
                            <option>Auto-detect</option>
                            <option>Next.js</option>
                            <option>Go</option>
                            <option>Node.js</option>
                            <option>Rust</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-zinc-300">Branch</label>
                          <input type="text" defaultValue="main" className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-6 py-4 bg-zinc-950/80 border-t border-zinc-800 flex justify-end space-x-3">
                      <Dialog.Close asChild>
                        <button className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-700">Cancel</button>
                      </Dialog.Close>
                      <button className="relative px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 border border-amber-400/50" onClick={() => setIsDeployModalOpen(false)}>
                        Transmute to Cloud
                      </button>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>

      </div>
      
    </div>
  );
}
