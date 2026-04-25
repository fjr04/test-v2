import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricsChartProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
  data: number[];
  color: 'amber' | 'emerald' | 'rose';
}

export function MetricsChart({ title, value, trend, trendValue, data, color }: MetricsChartProps) {
  const isUp = trend === 'up';
  
  const colors = {
    amber: {
      bar: 'bg-amber-500/20',
      activeBar: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.6)]',
      bgTrend: isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
    },
    emerald: {
      bar: 'bg-emerald-500/20',
      activeBar: 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]',
      bgTrend: isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
    },
    rose: {
      bar: 'bg-rose-500/20',
      activeBar: 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.6)]',
      bgTrend: isUp ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'
    }
  };

  const theme = colors[color];
  const isGoodTrend = color === 'rose' ? !isUp : isUp;
  const actualTrendColor = isGoodTrend ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20';

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-48 relative overflow-hidden group">
      
      {/* Background ambient glow based on last bar */}
      <div className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full blur-[50px] pointer-events-none opacity-20 ${color === 'amber' ? 'bg-amber-500' : color === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>

      <div className="flex justify-between items-start relative z-10">
        <div>
          <div className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-1.5">{title}</div>
          <div className="text-3xl font-extrabold text-white tracking-tight">{value}</div>
        </div>
        <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-lg ${actualTrendColor}`}>
          {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          <span>{trendValue}</span>
        </div>
      </div>
      
      {/* Super simple custom CSS bar chart */}
      <div className="flex items-end justify-between h-16 mt-4 gap-2 relative z-10">
        {data.map((val, i) => (
          <div 
            key={i} 
            className={`w-full rounded-t-sm transition-all duration-300 ${i === data.length - 1 ? theme.activeBar : theme.bar}`}
            style={{ height: `${val}%` }}
          />
        ))}
      </div>
    </div>
  );
}
