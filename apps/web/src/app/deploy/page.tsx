'use client';
import { useState } from 'react';
import { Rocket, Github, Loader2, Workflow } from 'lucide-react';

export default function DeployPage() {
  const [githubUrl, setGithubUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [jobName, setJobName] = useState('');

  const handleDeploy = async () => {
    if (!githubUrl) return;
    setStatus('deploying');
    try {
      const res = await fetch('http://localhost:3001/api/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUrl })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setJobName(data.jobName || 'alchemist-builder');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-20">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-zinc-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-900/10">
          <Rocket className="text-amber-500 text-3xl" size={32} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Deploy Application</h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Enter your repository link and Alchemist will automatically scan it with SonarQube, build the container, and ship it to your cluster.
        </p>
      </div>

      <div className="bg-zinc-900/40 p-1 rounded-2xl border border-zinc-800/80 shadow-2xl backdrop-blur-xl flex items-center gap-2 group focus-within:border-amber-500/50 focus-within:ring-1 focus-within:ring-amber-500/20 transition-all">
        <div className="pl-4 text-zinc-500 group-focus-within:text-amber-500 transition-colors">
          <Github size={24} />
        </div>
        <input 
          type="text" 
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          className="flex-1 bg-transparent border-none text-zinc-100 px-2 py-4 focus:outline-none text-lg placeholder:text-zinc-600"
          onKeyDown={(e) => e.key === 'Enter' && handleDeploy()}
        />
        <button 
          onClick={handleDeploy}
          disabled={status === 'deploying' || !githubUrl}
          className="bg-zinc-100 hover:bg-white text-zinc-900 px-8 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === 'deploying' ? (
            <><Loader2 className="animate-spin" size={20} /> Initializing...</>
          ) : (
            'Deploy'
          )}
        </button>
      </div>

      {status === 'success' && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-start gap-4 animate-in zoom-in-95 duration-500">
          <Workflow className="text-green-400 mt-1" />
          <div>
            <h3 className="text-green-400 font-semibold mb-1">Deployment Pipeline Started!</h3>
            <p className="text-green-500/80 text-sm">
              The internal builder job <code className="bg-green-500/20 px-1.5 py-0.5 rounded text-green-300">{jobName}</code> has been dispatched to your cluster.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-red-400">
          Failed to trigger deployment. Check backend logs and ensure your Kubeconfig is valid in Settings.
        </div>
      )}
    </div>
  );
}
