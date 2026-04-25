"use client";

import { motion } from "framer-motion";
import { ClusterHealth } from "@/components/dashboard/cluster-health";
import { MetricsChart } from "@/components/dashboard/metrics-chart";
import { SecurityPosture } from "@/components/dashboard/security-posture";
import { ArrowUpRight, Activity } from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-end justify-between mb-10 relative z-10"
      >
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-4 w-4 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <h2 className="text-[11px] font-bold tracking-widest text-emerald-500 uppercase">System Status</h2>
          </div>
          <h1 className="text-4xl font-extrabold text-zinc-100 tracking-tight">Fleet Overview</h1>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center space-x-2 bg-zinc-900/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-zinc-800/80 text-xs font-bold text-zinc-300 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
            </span>
            <span>Live Telemetry</span>
          </div>
          <span className="text-[10px] font-medium text-zinc-500 mt-2 uppercase tracking-widest">Last synced 0s ago</span>
        </div>
      </motion.div>

      {/* Main Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10"
      >
        
        {/* Left Column: Cluster Health */}
        <motion.div variants={item} className="lg:col-span-1">
          <ClusterHealth />
        </motion.div>

        {/* Right Column: Top metrics + Bottom Security */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          
          {/* Top Row: Requests & Error Rate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item} className="h-full">
              <MetricsChart 
                title="REQUESTS (24H)" 
                value="1.2M" 
                trend="up" 
                trendValue="+12%" 
                data={[20, 30, 25, 45, 55, 60, 80, 100]} 
                color="amber" 
              />
            </motion.div>
            <motion.div variants={item} className="h-full">
              <MetricsChart 
                title="ERROR RATE (24H)" 
                value="0.04%" 
                trend="down" 
                trendValue="-2.4%" 
                data={[70, 60, 55, 40, 30, 25, 10, 5]} 
                color="rose" 
              />
            </motion.div>
          </div>

          {/* Bottom Row: Security Posture */}
          <motion.div variants={item}>
            <SecurityPosture />
          </motion.div>

        </div>
      </motion.div>

      {/* Recent Activity Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 24 }}
        className="mt-12 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-zinc-100">Recent Activity</h3>
          <button className="text-sm font-medium text-zinc-400 hover:text-zinc-100 flex items-center transition-colors">
            View all logs <ArrowUpRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800/80 shadow-xl overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-zinc-950/50 text-zinc-500 font-medium text-xs uppercase tracking-wider border-b border-zinc-800/80">
              <tr>
                <th className="px-6 py-4">Event</th>
                <th className="px-6 py-4">Resource</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[
                { event: 'Deployment Successful', resource: 'api-gateway (commit a3f2c8d)', time: '2m ago', status: 'Success' },
                { event: 'Pipeline Triggered', resource: 'web-dashboard (main)', time: '15m ago', status: 'Running' },
                { event: 'Security Scan Completed', resource: 'auth-service', time: '1h ago', status: 'Passed' },
                { event: 'Node Scale Up', resource: 'k3s-worker-pool-a', time: '3h ago', status: 'Completed' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-zinc-800/30 transition-colors cursor-pointer group">
                  <td className="px-6 py-4 font-bold text-zinc-300 group-hover:text-amber-400 transition-colors">{row.event}</td>
                  <td className="px-6 py-4 text-zinc-500 font-mono text-xs">{row.resource}</td>
                  <td className="px-6 py-4 text-zinc-600 whitespace-nowrap font-medium">{row.time}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                      row.status === 'Success' || row.status === 'Passed' || row.status === 'Completed' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </div>
  );
}
