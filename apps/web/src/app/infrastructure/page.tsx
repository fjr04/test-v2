"use client";

import { motion } from "framer-motion";
import { Server, Cpu, HardDrive, Database, Settings2 } from "lucide-react";

export default function InfrastructurePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
           <div className="flex items-center space-x-2 mb-2">
             <Server className="h-4 w-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]" />
             <h2 className="text-[11px] font-bold tracking-widest text-orange-500 uppercase">K3S Cluster</h2>
           </div>
           <h1 className="text-4xl font-extrabold text-white tracking-tight">Infrastructure</h1>
        </div>
        <button className="glass-button px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 text-zinc-300 hover:text-white outline-none">
           <Settings2 className="h-4 w-4" />
           <span>Cluster Settings</span>
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Node 1 */}
         <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                 <div className="h-10 w-10 bg-zinc-900 border border-zinc-800 shadow-inner rounded-xl flex items-center justify-center">
                   <Server className="h-5 w-5 text-amber-500/80 group-hover:text-amber-400 transition-colors" />
                 </div>
                 <div>
                   <h3 className="font-bold text-zinc-100 leading-tight">control-plane-1</h3>
                   <div className="text-xs text-zinc-500 font-mono mt-0.5">10.0.0.15</div>
                 </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            </div>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><Cpu className="h-3 w-3 mr-1" /> CPU</span> <span className="text-zinc-200">45%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ width: '45%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><Database className="h-3 w-3 mr-1" /> RAM</span> <span className="text-zinc-200">78%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]" style={{ width: '78%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><HardDrive className="h-3 w-3 mr-1" /> Disk</span> <span className="text-zinc-200">32%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]" style={{ width: '32%' }}></div></div>
               </div>
            </div>
         </div>

         {/* Node 2 */}
         <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                 <div className="h-10 w-10 bg-zinc-900 border border-zinc-800 shadow-inner rounded-xl flex items-center justify-center">
                   <Server className="h-5 w-5 text-amber-500/80 group-hover:text-amber-400 transition-colors" />
                 </div>
                 <div>
                   <h3 className="font-bold text-zinc-100 leading-tight">worker-node-1</h3>
                   <div className="text-xs text-zinc-500 font-mono mt-0.5">10.0.0.16</div>
                 </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            </div>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><Cpu className="h-3 w-3 mr-1" /> CPU</span> <span className="text-zinc-200">88%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] animate-pulse" style={{ width: '88%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><Database className="h-3 w-3 mr-1" /> RAM</span> <span className="text-zinc-200">64%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]" style={{ width: '64%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><HardDrive className="h-3 w-3 mr-1" /> Disk</span> <span className="text-zinc-200">55%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]" style={{ width: '55%' }}></div></div>
               </div>
            </div>
         </div>

         {/* Node 3 */}
         <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                 <div className="h-10 w-10 bg-zinc-900 border border-zinc-800 shadow-inner rounded-xl flex items-center justify-center">
                   <Server className="h-5 w-5 text-amber-500/80 group-hover:text-amber-400 transition-colors" />
                 </div>
                 <div>
                   <h3 className="font-bold text-zinc-100 leading-tight">worker-node-2</h3>
                   <div className="text-xs text-zinc-500 font-mono mt-0.5">10.0.0.17</div>
                 </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            </div>
             <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><Cpu className="h-3 w-3 mr-1" /> CPU</span> <span className="text-zinc-200">12%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" style={{ width: '12%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><Database className="h-3 w-3 mr-1" /> RAM</span> <span className="text-zinc-200">41%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]" style={{ width: '41%' }}></div></div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold text-zinc-400 mb-1.5"><span className="flex items-center"><HardDrive className="h-3 w-3 mr-1" /> Disk</span> <span className="text-zinc-200">28%</span></div>
                  <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden border border-zinc-700/30"><div className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]" style={{ width: '28%' }}></div></div>
               </div>
            </div>
         </div>
      </motion.div>
    </div>
  );
}
