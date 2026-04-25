"use client";

import { motion } from "framer-motion";
import { GitMerge, Play, CheckCircle2 } from "lucide-react";

export default function PipelinesPage() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center space-x-2 mb-2">
           <GitMerge className="h-4 w-4 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
           <h2 className="text-[11px] font-bold tracking-widest text-blue-500 uppercase">CI / CD</h2>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Pipeline Runs</h1>
        <p className="text-zinc-500">View and manage automated workflows across all your repositories.</p>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
        {[1,2,3,4].map((i) => (
          <motion.div variants={item} key={i} className="glass-panel group rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] transition-all cursor-pointer">
            <div className="flex items-center space-x-6">
              <div className="h-10 w-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:bg-emerald-500/20 transition-colors">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-100 mb-1 group-hover:text-amber-400 transition-colors">Production Release #{1000 - i}</h3>
                <div className="flex items-center text-sm font-medium text-zinc-500 space-x-3">
                  <span className="text-zinc-300">api-gateway</span>
                  <span>•</span>
                  <span className="font-mono text-xs bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700">main</span>
                  <span>•</span>
                  <span>Triggered by push</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0 ml-16 md:ml-0">
               <div className="text-right">
                  <div className="text-sm font-bold text-zinc-100">4m 12s</div>
                  <div className="text-xs text-zinc-500">{i * 2}h ago</div>
               </div>
               <button className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-colors text-zinc-400">
                 <Play className="h-3 w-3 ml-0.5" />
               </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
