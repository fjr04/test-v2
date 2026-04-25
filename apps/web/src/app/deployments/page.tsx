"use client";

import { motion } from "framer-motion";
import { CloudFog, CheckCircle2, Search, Filter } from "lucide-react";

export default function DeploymentsPage() {
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
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <CloudFog className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <h2 className="text-[11px] font-bold tracking-widest text-emerald-500 uppercase">Global List</h2>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Deployments</h1>
        </div>
        <div className="flex items-center space-x-3">
           <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search deployments..." 
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder:text-zinc-600 shadow-inner" 
              />
           </div>
           <button className="glass-button px-3 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white"><Filter className="h-4 w-4" /></button>
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-zinc-950/50 text-zinc-500 font-medium text-xs uppercase tracking-wider border-b border-zinc-800/50">
            <tr>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Deployment</th>
              <th className="px-6 py-4">Environment</th>
              <th className="px-6 py-4">Age</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {[1,2,3,4,5,6,7].map((i) => (
              <motion.tr variants={item} key={i} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 font-bold text-zinc-200">web-dashboard</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
                    <span className="font-mono text-zinc-400 text-xs">commit-{Math.random().toString(36).substring(7)}</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-bold shadow-[0_0_10px_rgba(168,85,247,0.1)]">Production</span></td>
                <td className="px-6 py-4 text-zinc-500 font-medium">{i}h ago</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
