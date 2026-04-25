"use client";

import { motion } from "framer-motion";
import { Activity, AlertCircle, TrendingUp, BellRing, Filter, Calendar } from "lucide-react";
import { MetricsChart } from "@/components/dashboard/metrics-chart";

export default function MonitoringPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center space-x-2 mb-2">
             <Activity className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
             <h2 className="text-[11px] font-bold tracking-widest text-emerald-500 uppercase">Prometheus Observability</h2>
           </div>
           <h1 className="text-4xl font-extrabold text-white tracking-tight">Metrics</h1>
        </div>
        
        {/* Prometheus-style filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="glass-panel flex items-center px-1 py-1 rounded-xl">
            <select className="bg-transparent text-sm text-zinc-300 font-medium focus:outline-none px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 cursor-pointer appearance-none border-none">
              <option className="bg-zinc-900 text-zinc-300">namespace="production"</option>
              <option className="bg-zinc-900 text-zinc-300">namespace="staging"</option>
              <option className="bg-zinc-900 text-zinc-300">namespace="kube-system"</option>
            </select>
          </div>
          
          <div className="glass-panel flex items-center px-1 py-1 rounded-xl">
             <button className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors flex items-center outline-none">
               <Calendar className="h-4 w-4 mr-2 text-zinc-500" />
               Last 24 Hours
             </button>
             <div className="w-px h-4 bg-zinc-800 mx-1"></div>
             <button className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors flex items-center outline-none">
               <Filter className="h-4 w-4 mr-2 text-zinc-500" />
               Add Query
             </button>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsChart 
          title="P99 LATENCY (24H)" 
          value="124ms" 
          trend="down" 
          trendValue="-12ms" 
          data={[140, 135, 142, 130, 125, 128, 120, 124]} 
          color="emerald" 
        />
        <MetricsChart 
          title="HTTP 5XX ERRORS (24H)" 
          value="0.02%" 
          trend="down" 
          trendValue="-0.01%" 
          data={[10, 8, 12, 5, 2, 1, 0, 0]} 
          color="rose" 
        />
        <MetricsChart 
          title="CPU UTILIZATION (AVG)" 
          value="68%" 
          trend="up" 
          trendValue="+4%" 
          data={[50, 55, 60, 58, 62, 65, 68, 68]} 
          color="amber" 
        />
        <MetricsChart 
          title="MEMORY USAGE (Total)" 
          value="14.2 GB" 
          trend="up" 
          trendValue="+1.2 GB" 
          data={[10, 11, 10.5, 12, 13, 14, 14.1, 14.2]} 
          color="amber" 
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6 border-b border-zinc-800/50 pb-4">
           <BellRing className="h-5 w-5 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
           <h3 className="font-bold text-zinc-100 text-lg">Active AlertManager Incidents</h3>
        </div>
        
        <div className="space-y-4">
           {/* Alert 1 */}
           <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20">
             <div className="mt-0.5"><AlertCircle className="h-5 w-5 text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]" /></div>
             <div>
               <h4 className="font-bold text-zinc-100 mb-1">High CPU Usage on worker-node-1</h4>
               <p className="text-sm text-zinc-400">CPU usage has exceeded 85% for more than 5 minutes. Current usage: 88%.</p>
               <div className="text-xs font-bold text-rose-400 mt-3 flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> 12m ago • severity="critical"</div>
             </div>
           </div>
           
           {/* Alert 2 */}
           <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20">
             <div className="mt-0.5"><AlertCircle className="h-5 w-5 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" /></div>
             <div>
               <h4 className="font-bold text-zinc-100 mb-1">Elevated 4XX Response Rate</h4>
               <p className="text-sm text-zinc-400">The billing-api service is returning 429 Too Many Requests at a rate of 15 req/s.</p>
               <div className="text-xs font-bold text-amber-400 mt-3 flex items-center"><TrendingUp className="h-3 w-3 mr-1" /> 1h ago • severity="warning"</div>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
