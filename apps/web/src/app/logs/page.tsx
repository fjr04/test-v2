"use client";

import { motion } from "framer-motion";
import { TerminalSquare, Filter, Download, Maximize2, Search, Play } from "lucide-react";

export default function LogsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 h-[calc(100vh-8rem)] flex flex-col relative z-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
           <div className="flex items-center space-x-2 mb-2">
             <TerminalSquare className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
             <h2 className="text-[11px] font-bold tracking-widest text-emerald-500 uppercase">Loki LogQL Stream</h2>
           </div>
           <h1 className="text-4xl font-extrabold text-white tracking-tight">System Logs</h1>
        </div>
        
        {/* Loki-style filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-amber-500" />
              <input 
                type="text" 
                defaultValue='{namespace="production", app="api-gateway"} |= "error"'
                className="w-full pl-9 pr-4 py-2 bg-black/50 border border-zinc-800 rounded-xl text-sm font-mono text-zinc-300 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-inner" 
              />
           </div>
           
           <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 border border-amber-400/50 outline-none">
             <Play className="h-4 w-4" /> <span>Run Query</span>
           </button>
           
           <div className="h-8 w-px bg-zinc-800 mx-1 hidden sm:block"></div>
           
           <button className="glass-button px-3 py-2 rounded-xl text-sm font-medium transition-all text-zinc-400 hover:text-white sm:block hidden outline-none">
             <Download className="h-4 w-4" />
           </button>
           <button className="glass-button px-3 py-2 rounded-xl text-sm font-medium transition-all text-zinc-400 hover:text-white sm:block hidden outline-none">
             <Maximize2 className="h-4 w-4" />
           </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex-1 bg-black/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-[13px] border border-zinc-800/80 backdrop-blur-3xl"
      >
        <div className="h-12 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-4 justify-between shrink-0">
           <div className="flex items-center space-x-4 text-zinc-400">
             <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-bold drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]">● Live Tail</span>
             <span className="text-xs">query executed successfully</span>
           </div>
           <div className="text-xs text-zinc-500 flex items-center space-x-2">
             <Filter className="h-3 w-3" />
             <span>Showing 1,204 results</span>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-zinc-300 custom-scrollbar leading-relaxed">
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:02.124</span> <span className="text-blue-400 w-16 shrink-0">[INFO]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">api-gateway</span> Request processed in 12ms (GET /api/v1/projects)</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:05.441</span> <span className="text-blue-400 w-16 shrink-0">[INFO]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">auth-service</span> Token validated for user user@skyline.dev</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:08.992</span> <span className="text-amber-400 w-16 shrink-0">[WARN]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">billing-api</span> Rate limit approaching for client ID xyz_123</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:10.001</span> <span className="text-rose-400 w-16 shrink-0 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">[ERRO]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">billing-api</span> Database connection timeout after 5000ms</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:11.105</span> <span className="text-zinc-400 w-16 shrink-0">[DBUG]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">billing-api</span> Retrying connection pool...</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:12.823</span> <span className="text-emerald-400 w-16 shrink-0">[INFO]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">billing-api</span> Connection established successfully.</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:15.000</span> <span className="text-blue-400 w-16 shrink-0">[INFO]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">kaniko-build</span> Step 1/12 : FROM node:20-alpine AS builder</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:18.121</span> <span className="text-blue-400 w-16 shrink-0">[INFO]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">kaniko-build</span> ---&gt; a4b9c1d2e3f4</div>
           <div className="flex hover:bg-zinc-800/50 px-2 py-0.5 -mx-2 rounded transition-colors"><span className="text-zinc-500 w-36 shrink-0 border-r border-zinc-800 mr-3">Oct 24 10:15:20.552</span> <span className="text-blue-400 w-16 shrink-0">[INFO]</span> <span className="text-purple-400 w-32 shrink-0 font-bold">api-gateway</span> Request processed in 8ms (GET /api/v1/health)</div>
           
           {/* Blinking cursor for live tail effect */}
           <div className="w-2 h-4 bg-zinc-500 animate-pulse mt-2 ml-2"></div>
        </div>
      </motion.div>
    </div>
  );
}
