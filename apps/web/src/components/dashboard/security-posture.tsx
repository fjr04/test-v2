export function SecurityPosture() {
  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col md:flex-row shadow-xl h-auto md:h-48 group relative overflow-hidden">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>

      {/* Score Circle */}
      <div className="flex flex-col items-center justify-center pr-8 md:border-r border-zinc-800/50 relative mb-6 md:mb-0 z-10">
        <div className="text-[10px] font-bold text-zinc-500 tracking-widest absolute top-0 uppercase">SECURITY SCORE</div>
        <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mt-6 shadow-inner relative">
          <div className="absolute inset-0 rounded-full border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"></div>
          <span className="text-3xl font-extrabold text-emerald-400">84</span>
        </div>
      </div>
      
      <div className="flex-1 md:pl-8 flex flex-col justify-between z-10">
        <div className="flex justify-between items-end">
          <div className="font-bold text-zinc-100 tracking-wide text-lg">Platform Posture</div>
          <div className="text-xs text-zinc-500 font-medium tracking-wider uppercase">Last scanned: 12m ago</div>
        </div>
        
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mt-6 mb-8 relative shadow-inner">
          <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full w-[84%] shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
        </div>
        
        <div className="flex justify-between items-center bg-zinc-900/80 rounded-xl py-3 px-6 border border-zinc-800/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-1">IMAGES</div>
            <div className="text-xl font-bold text-zinc-100">142</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-1">SCANNED</div>
            <div className="text-xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">100%</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mb-1">VULN</div>
            <div className="text-xl font-bold text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">12</div>
          </div>
        </div>
      </div>
    </div>
  );
}
