"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/projects/project-card";
import { Search, Plus, Filter, Sparkles } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      id: "web-dashboard",
      name: "web-dashboard",
      framework: "Next.js",
      status: "Ready" as const,
      url: "app.skyline.dev",
      repo: "skyline-global/web-dashboard",
      branch: "main",
      commit: "a3f2c8d",
      securityScore: 92,
      timeAgo: "12m"
    },
    {
      id: "api-gateway",
      name: "api-gateway",
      framework: "Go",
      status: "Building" as const,
      url: "api.skyline.dev",
      repo: "skyline-global/api-gateway",
      branch: "main",
      commit: "e7b1d45",
      securityScore: 78,
      timeAgo: "14m"
    },
    {
      id: "auth-service",
      name: "auth-service",
      framework: "Go",
      status: "Ready" as const,
      url: "auth.skyline.dev",
      repo: "skyline-global/auth-service",
      branch: "main",
      commit: "c9d3f21",
      securityScore: 95,
      timeAgo: "28m"
    },
    {
      id: "billing-api",
      name: "billing-api",
      framework: "Node.js",
      status: "Failed" as const,
      url: "billing-api.skyline.dev",
      repo: "skyline-global/billing-api",
      branch: "main",
      commit: "b2e8a17",
      securityScore: 64,
      timeAgo: "45m"
    },
    {
      id: "landing-page",
      name: "landing-page",
      framework: "Astro",
      status: "Ready" as const,
      url: "skyline.dev",
      repo: "skyline-global/landing-page",
      branch: "main",
      commit: "f1a4b89",
      securityScore: 88,
      timeAgo: "1h"
    }
  ];

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
    <div className="max-w-7xl mx-auto space-y-8 relative z-10">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase">Your Workspace</h2>
          </div>
          <h1 className="text-4xl font-extrabold text-zinc-100 tracking-tight">All Projects</h1>
        </div>
        
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              type="text"
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-inner placeholder:text-zinc-600"
            />
          </div>
          
          <button className="glass-button px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 text-zinc-400 hover:text-zinc-100 outline-none">
            <Filter className="h-4 w-4" />
          </button>
          
          <button className="relative px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 border border-amber-400/50 flex items-center space-x-2 outline-none">
            <Sparkles className="h-4 w-4" />
            <span>Import Repo</span>
          </button>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map(p => (
          <motion.div key={p.name} variants={item}>
            <ProjectCard {...p} />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
