"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Tabs from "@radix-ui/react-tabs";
import { 
  ArrowLeft, 
  Hexagon, 
  ExternalLink, 
  RefreshCcw, 
  Github, 
  Terminal,
  Activity,
  ShieldCheck,
  Settings,
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import { SecurityPosture } from "@/components/dashboard/security-posture";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.id;
  
  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10">
      
      {/* Back link */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Link href="/projects" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-amber-400 transition-colors group">
          <ArrowLeft className="h-4 w-4 mr-1.5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-start justify-between gap-6 glass-panel p-8 rounded-3xl"
      >
        <div className="flex items-start space-x-6">
          <div className="h-16 w-16 bg-zinc-950 border border-zinc-800 shadow-inner text-amber-500 rounded-2xl flex items-center justify-center shrink-0">
            <Hexagon className="h-8 w-8 fill-amber-500/10" />
          </div>
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">{projectId}</h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                Ready
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm font-medium text-zinc-400">
              <span className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-zinc-100 shadow-[0_0_5px_rgba(255,255,255,0.8)] mr-2"></span> Next.js
              </span>
              <a href="#" className="flex items-center hover:text-amber-400 transition-colors">
                <Github className="h-4 w-4 mr-1.5" /> skyline-global/{projectId}
              </a>
              <a href={`https://${projectId}.skyline.dev`} target="_blank" rel="noreferrer" className="flex items-center hover:text-amber-400 transition-colors">
                <ExternalLink className="h-4 w-4 mr-1.5" /> {projectId}.skyline.dev
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="glass-button px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 text-zinc-300 hover:text-white outline-none">
            <RefreshCcw className="h-4 w-4" />
            <span>Redeploy</span>
          </button>
          <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.4)] active:scale-95 border border-amber-400/50 outline-none">
            <ExternalLink className="h-4 w-4" />
            <span>Visit</span>
          </button>
          <button className="p-2 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 rounded-xl transition-colors outline-none border border-transparent hover:border-zinc-700/50">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs.Root defaultValue="overview" className="mt-8">
        <Tabs.List className="flex space-x-1 border-b border-zinc-800/80 mb-8 overflow-x-auto hide-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'deployments', label: 'Deployments', icon: Terminal },
            { id: 'pipelines', label: 'Pipelines', icon: Hexagon },
            { id: 'security', label: 'Security', icon: ShieldCheck },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <Tabs.Trigger 
              key={tab.id}
              value={tab.id}
              className="px-4 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-300 outline-none flex items-center space-x-2 border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:text-amber-400 transition-colors whitespace-nowrap"
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <AnimateTabContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="font-bold text-zinc-100 mb-4 tracking-wide">Production Deployment</h3>
                <div className="flex items-center justify-between p-4 bg-zinc-900/80 rounded-xl border border-zinc-800/80">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <ExternalLink className="h-4 w-4 text-zinc-500" />
                      <a href="#" className="font-medium text-white hover:text-amber-400 transition-colors">{projectId}.skyline.dev</a>
                    </div>
                    <div className="text-sm text-zinc-500 flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-1.5" />
                      Ready • main • a3f2c8d • 12m ago
                    </div>
                  </div>
                  <button className="text-sm font-medium glass-button px-3 py-1.5 rounded-lg text-zinc-300 hover:text-white outline-none">
                    View Logs
                  </button>
                </div>
              </div>
              
              <div className="glass-panel rounded-2xl p-6">
                 <h3 className="font-bold text-zinc-100 mb-4 tracking-wide">Preview Deployments</h3>
                 <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-12 w-12 bg-zinc-900 border border-zinc-800 shadow-inner rounded-full flex items-center justify-center mb-3">
                      <Terminal className="h-5 w-5 text-zinc-500" />
                    </div>
                    <h4 className="font-bold text-zinc-100 mb-1">No Active Previews</h4>
                    <p className="text-sm text-zinc-500 max-w-sm">Open a Pull Request to your primary branch to automatically transmutate a preview deployment.</p>
                 </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <SecurityPosture />
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="font-bold text-zinc-100 mb-4 tracking-wide">Project Meta</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Created</span>
                    <span className="font-medium text-white">Oct 24, 2023</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Framework</span>
                    <span className="font-medium text-white">Next.js</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Root Directory</span>
                    <span className="font-medium text-white">/</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Node.js Version</span>
                    <span className="font-medium text-white">v20.x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateTabContent>

        <AnimateTabContent value="deployments">
          <div className="glass-panel rounded-2xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-950/50 text-zinc-500 font-medium text-xs uppercase tracking-wider border-b border-zinc-800/50">
                <tr>
                  <th className="px-6 py-4">Status & Status</th>
                  <th className="px-6 py-4">Environment</th>
                  <th className="px-6 py-4">Branch</th>
                  <th className="px-6 py-4">Duration</th>
                  <th className="px-6 py-4 text-right">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[1,2,3,4,5].map((i) => (
                  <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
                        <div>
                          <div className="font-medium text-zinc-200">Production ready</div>
                          <div className="text-xs text-zinc-500 font-mono mt-0.5">a3f2c8d</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-bold shadow-[0_0_10px_rgba(168,85,247,0.1)]">Production</span></td>
                    <td className="px-6 py-4 font-mono text-zinc-400">main</td>
                    <td className="px-6 py-4 text-zinc-400">42s</td>
                    <td className="px-6 py-4 text-right text-zinc-500">{i * 2}d ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimateTabContent>

        <AnimateTabContent value="pipelines">
          <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-zinc-900 border border-zinc-800 shadow-inner rounded-full flex items-center justify-center mb-4">
              <Hexagon className="h-8 w-8 text-zinc-500" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100 mb-2">No Pipelines Configured</h3>
            <p className="text-zinc-500 max-w-md mb-6">Create a <code className="bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-0.5 rounded text-sm text-amber-400">.alchemist/pipeline.yml</code> file in your repository to forge custom CI/CD workflows.</p>
            <button className="glass-button px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors">
              View Grimoire (Docs)
            </button>
          </div>
        </AnimateTabContent>

        <AnimateTabContent value="security">
           <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center">
             <ShieldCheck className="h-12 w-12 text-emerald-400 mb-4 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
             <h3 className="text-xl font-bold text-zinc-100 mb-2">Zero Vulnerabilities Found</h3>
             <p className="text-zinc-500 max-w-md">Your last build of {projectId} passed all SAST, SCA, and Container security checks.</p>
           </div>
        </AnimateTabContent>

        <AnimateTabContent value="settings">
          <div className="max-w-3xl space-y-6">
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-bold text-zinc-100 mb-1">General Settings</h3>
              <p className="text-sm text-zinc-500 mb-6">Update your project's basic configuration.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Project Name</label>
                  <input type="text" defaultValue={projectId} className="w-full max-w-md px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-zinc-100 placeholder:text-zinc-600 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Framework Preset</label>
                  <select className="w-full max-w-md px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-zinc-100 transition-all outline-none">
                    <option>Next.js</option>
                    <option>Node.js</option>
                    <option>Go</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-zinc-800/50 flex justify-end">
                <button className="bg-white text-black px-5 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors">Save Changes</button>
              </div>
            </div>
            
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-rose-400 mb-1">Danger Zone</h3>
              <p className="text-sm text-rose-500/80 mb-6">Irreversible actions for your project.</p>
              <button className="glass-button bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-5 py-2 rounded-xl text-sm font-bold transition-colors">
                Delete Project
              </button>
            </div>
          </div>
        </AnimateTabContent>

      </Tabs.Root>
    </div>
  );
}

// Helper for animating tab content
function AnimateTabContent({ value, children }: { value: string, children: React.ReactNode }) {
  return (
    <Tabs.Content value={value} asChild>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </Tabs.Content>
  );
}
