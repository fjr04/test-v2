'use client';
import { useState, useEffect } from 'react';
import { Save, Server, Key, FileText, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [sonarUrl, setSonarUrl] = useState('');
  const [sonarToken, setSonarToken] = useState('');
  const [kubeconfig, setKubeconfig] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/settings')
      .then(res => res.json())
      .then(data => {
        setSonarUrl(data.sonarUrl || '');
        setSonarToken(data.sonarToken || '');
        setKubeconfig(data.kubeconfig || '');
      })
      .catch(err => console.error("Failed to load settings", err));
  }, []);

  const handleSave = async () => {
    setStatus('saving');
    try {
      const res = await fetch('http://localhost:3001/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sonarUrl, sonarToken, kubeconfig })
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Server className="text-amber-500" />
          Platform Integrations
        </h1>
        <p className="text-zinc-400">Configure your connection to SonarQube and K3s cluster.</p>
      </div>

      <div className="grid gap-6">
        <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <Key className="text-purple-400" size={20} />
            SonarQube Settings
          </h2>
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">SonarQube URL</label>
            <input 
              type="text" 
              value={sonarUrl}
              onChange={(e) => setSonarUrl(e.target.value)}
              placeholder="http://127.0.0.1:9000"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">API Token</label>
            <input 
              type="password" 
              value={sonarToken}
              onChange={(e) => setSonarToken(e.target.value)}
              placeholder="sqa_..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-sm font-mono"
            />
          </div>
        </div>

        <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
            <FileText className="text-blue-400" size={20} />
            Kubernetes Configuration (K3s)
          </h2>
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Kubeconfig Content</label>
            <textarea 
              value={kubeconfig}
              onChange={(e) => setKubeconfig(e.target.value)}
              placeholder="apiVersion: v1..."
              className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-300 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-xs font-mono resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button 
          onClick={handleSave}
          disabled={status === 'saving'}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-amber-900/20 disabled:opacity-50"
        >
          <Save size={18} />
          {status === 'saving' ? 'Saving...' : 'Save Configuration'}
        </button>
        {status === 'success' && (
          <span className="text-green-400 flex items-center gap-1.5 text-sm animate-in fade-in zoom-in duration-300">
            <CheckCircle2 size={16} /> Saved successfully
          </span>
        )}
        {status === 'error' && (
          <span className="text-red-400 text-sm animate-in fade-in duration-300">
            Failed to save settings.
          </span>
        )}
      </div>
    </div>
  );
}
