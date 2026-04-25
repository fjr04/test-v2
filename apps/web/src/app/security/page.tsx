"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import { SecurityPosture } from "@/components/dashboard/security-posture";

export default function SecurityPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
        <div>
           <div className="flex items-center space-x-2 mb-2">
             <ShieldCheck className="h-4 w-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
             <h2 className="text-[11px] font-bold tracking-widest text-purple-500 uppercase">DevSecOps</h2>
           </div>
           <h1 className="text-4xl font-extrabold text-white tracking-tight">Security Center</h1>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all hover:bg-zinc-200 outline-none">
           <FileText className="h-4 w-4" />
           <span>Generate Report</span>
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <SecurityPosture />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="glass-panel rounded-2xl p-6">
           <div className="flex items-center space-x-3 mb-6">
             <div className="h-10 w-10 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.15)]">
               <ShieldAlert className="h-5 w-5" />
             </div>
             <h3 className="font-bold text-zinc-100 text-lg">Top Vulnerabilities</h3>
           </div>
           <div className="space-y-4">
             {[
               { id: 'CVE-2023-44487', pkg: 'HTTP/2', severity: 'Critical' },
               { id: 'CVE-2023-38545', pkg: 'curl', severity: 'High' },
               { id: 'CVE-2023-4911', pkg: 'glibc', severity: 'High' },
             ].map(v => (
               <div key={v.id} className="flex justify-between items-center p-3 hover:bg-zinc-800/50 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-zinc-700/50">
                  <div>
                    <div className="font-mono text-xs font-bold text-zinc-200">{v.id}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{v.pkg}</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${v.severity === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                    {v.severity}
                  </span>
               </div>
             ))}
           </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
           <div>
             <h3 className="font-bold text-zinc-100 mb-2">Policy Enforcement</h3>
             <p className="text-sm text-zinc-400">OPA/Kyverno policies are actively blocking insecure deployments in your cluster.</p>
           </div>
           <div className="mt-8 space-y-3">
             <div className="flex justify-between items-center text-sm p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
               <span className="text-zinc-300 font-medium">Require Non-Root Containers</span>
               <CheckCircle2 className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
             </div>
             <div className="flex justify-between items-center text-sm p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
               <span className="text-zinc-300 font-medium">Require Resource Limits</span>
               <CheckCircle2 className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
             </div>
             <div className="flex justify-between items-center text-sm p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
               <span className="text-zinc-300 font-medium">Block Latest Image Tags</span>
               <CheckCircle2 className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
