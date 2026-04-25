export function ClusterHealth() {
  return (
    <div className="glass-panel rounded-2xl p-8 flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] group-hover:bg-amber-500/10 transition-colors pointer-events-none"></div>

      <div className="text-zinc-100 font-bold mb-8 relative z-10">Global Cluster Health</div>
      
      <div className="flex flex-col items-center justify-center relative flex-1 z-10">
        <svg viewBox="0 0 100 100" className="w-56 h-56 transform -rotate-90 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#27272a" strokeWidth="8" />
          <defs>
            <linearGradient id="gradientRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <circle 
            cx="50" cy="50" r="45" 
            fill="none" stroke="url(#gradientRing)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray="282.7" strokeDashoffset="5.65" 
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-white tracking-tight">98<span className="text-2xl text-zinc-500 font-medium">%</span></span>
          <span className="text-sm text-amber-400 font-bold uppercase tracking-widest mt-1">Healthy</span>
        </div>
      </div>
      
      <div className="mt-8 space-y-5 relative z-10">
        {[
          { label: 'CPU Usage', value: 24.5, color: 'bg-amber-400', shadow: 'shadow-[0_0_10px_rgba(251,191,36,0.5)]' },
          { label: 'Memory Usage', value: 62.1, color: 'bg-orange-500', shadow: 'shadow-[0_0_10px_rgba(249,115,22,0.5)]' },
          { label: 'Disk Usage', value: 41.8, color: 'bg-yellow-500', shadow: 'shadow-[0_0_10px_rgba(234,179,8,0.5)]' },
        ].map(item => (
          <div key={item.label} className="flex flex-col space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <span>{item.label}</span>
              <span className="text-zinc-100">{item.value}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color} ${item.shadow} rounded-full transition-all duration-1000`}
                style={{ width: `${item.value}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
