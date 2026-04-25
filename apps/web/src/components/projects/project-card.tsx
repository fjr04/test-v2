"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hexagon, CheckCircle2, CircleDashed, XCircle, Github, Globe, GitCommitHorizontal, ShieldCheck, ShieldAlert, Shield, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ProjectCardProps {
  id: string;
  name: string;
  framework: string;
  status: 'Ready' | 'Building' | 'Failed';
  url: string;
  repo: string;
  branch: string;
  commit: string;
  securityScore: number;
  timeAgo: string;
}

export function ProjectCard({ 
  id,
  name, 
  framework, 
  status, 
  url, 
  repo, 
  branch, 
  commit, 
  securityScore, 
  timeAgo 
}: ProjectCardProps) {

  const StatusIcon = status === 'Ready' ? CheckCircle2 : status === 'Building' ? CircleDashed : XCircle;
  const statusColor = status === 'Ready' 
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
    : status === 'Building' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
    : 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]';
  
  const SecurityIcon = securityScore >= 90 ? ShieldCheck : securityScore >= 70 ? Shield : ShieldAlert;
  const securityColor = securityScore >= 90 ? 'text-emerald-400' : securityScore >= 70 ? 'text-amber-400' : 'text-rose-400';

  return (
    <Link href={`/projects/${id}`}>
      <motion.div 
        whileHover={{ y: -4, scale: 1.01 }}
        className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-[280px] group cursor-pointer relative overflow-hidden border border-zinc-800 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300"
      >
        {/* Subtle background glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Top Headers */}
        <div className="flex justify-between items-start relative z-10">
          <div className="flex space-x-4 items-center">
            <div className="h-12 w-12 bg-zinc-950 border border-zinc-800 shadow-inner rounded-xl flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
              <Hexagon className="h-6 w-6 text-zinc-500 group-hover:text-amber-400 transition-colors fill-zinc-900 group-hover:fill-amber-500/10" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-100 text-lg group-hover:text-amber-400 transition-colors">{name}</h3>
              <div className="flex items-center text-xs font-bold text-zinc-500 mt-1 uppercase tracking-wider">
                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${framework === 'Next.js' ? 'bg-zinc-100 shadow-[0_0_5px_rgba(255,255,255,0.8)]' : framework === 'Go' ? 'bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]' : framework === 'Node.js' ? 'bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.8)]' : 'bg-orange-400 shadow-[0_0_5px_rgba(251,146,60,0.8)]'}`}></span>
                {framework}
              </div>
            </div>
          </div>
          <div className={cn("px-3 py-1.5 rounded-md text-xs font-bold flex items-center space-x-1.5 border", statusColor)}>
            {status === 'Building' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse box-shadow-[0_0_8px_rgba(251,191,36,0.8)]"></span>}
            {status !== 'Building' && <span className={cn("w-1.5 h-1.5 rounded-full", status === 'Ready' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.8)]')}></span>}
            <span>{status}</span>
          </div>
        </div>

        {/* Links & Info */}
        <div className="space-y-3.5 my-6 flex-1 relative z-10 pl-1">
          <div className="flex items-center text-sm text-zinc-400 hover:text-amber-400 transition-colors w-fit">
            <Globe className="h-4 w-4 mr-3 text-zinc-500 transition-colors" />
            <span className="font-medium">{url}</span>
          </div>
          <div className="flex items-center text-sm text-zinc-400 hover:text-amber-400 transition-colors w-fit">
            <Github className="h-4 w-4 mr-3 text-zinc-500 transition-colors" />
            <span className="font-medium truncate">{repo}</span>
          </div>
          <div className="flex items-center text-sm text-zinc-500 font-mono">
            <GitCommitHorizontal className="h-4 w-4 mr-3 text-zinc-600 transition-colors" />
            <span className="bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-0.5 rounded text-[11px] font-bold text-zinc-300">{branch}</span>
            <span className="mx-2 text-zinc-700">•</span>
            <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{commit}</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4 mt-auto relative z-10">
          <div className={cn("flex items-center font-extrabold text-sm", securityColor)}>
            <SecurityIcon className="h-4 w-4 mr-1.5" />
            {securityScore} <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 ml-1.5">Score</span>
          </div>
          <div className="flex items-center text-xs font-bold text-zinc-600 uppercase tracking-widest group-hover:text-zinc-300 transition-colors">
            {timeAgo}
            <ArrowRight className="h-3 w-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-500" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
