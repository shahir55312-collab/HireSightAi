import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  ShieldCheck, 
  Eye, 
  BarChart2, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react";
import { motion } from "motion/react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  AreaChart,
  Area
} from 'recharts';

export function RecruiterPerception() {
  const confidenceData = [
    { time: '0:00', value: 85 },
    { time: '1:30', value: 78 },
    { time: '3:00', value: 92 },
    { time: '4:12', value: 45 },
    { time: '5:30', value: 68 },
    { time: '7:00', value: 82 },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12">
      <header className="flex items-end justify-between border-b border-white/10 pb-8">
        <div className="space-y-1">
          <h1 className="text-6xl font-serif italic font-black neon-text leading-tight">Perception</h1>
          <p className="text-slate-400">Deep-tier tracking of <span className="text-white italic">recruiter sentiment</span> nodes.</p>
        </div>
        <div className="hidden md:flex gap-12 items-baseline">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Global Sentiment</p>
            <p className="text-7xl font-mono font-bold tracking-tighter text-emerald-400">Positive</p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="glass rounded-3xl p-8 border-none overflow-hidden relative">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-400" />
            Attention Heatmap
          </h4>
          <div className="h-[240px] relative">
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-24 bg-gradient-to-r from-blue-500/20 via-purple-500/10 to-blue-500/20 rounded-full blur-3xl" />
             </div>
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={confidenceData}>
                  <defs>
                    <linearGradient id="perceptionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#perceptionGrad)" />
                </AreaChart>
             </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-center text-slate-500 uppercase font-bold tracking-widest mt-4 italic">High Correlation with <span className="text-white">Technical Strategy</span> discussions</p>
        </Card>

        <Card className="glass rounded-3xl p-8 border-none">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Trust Node Validation
          </h4>
          <div className="space-y-6">
             {[
               { label: 'Authenticity Confidence', value: '98%', color: 'bg-emerald-500', isAccent: true },
               { label: 'Emotional Stability', value: '64%', color: 'bg-red-500' },
               { label: 'Professional Likability', value: '92%', color: 'bg-blue-500', isAccent: true },
             ].map((node) => (
               <div key={node.label} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                     <div className={`w-2 h-2 rounded-full ${node.color} shadow-sm group-hover:scale-150 transition-transform`} />
                     <span className="text-xs font-bold text-slate-300 uppercase tracking-tight">{node.label}</span>
                  </div>
                  <span className={`text-xl font-mono font-bold ${node.isAccent ? 'text-white' : 'text-slate-500'}`}>{node.value}</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Recruiter Sentiment Logs</h4>
        <div className="space-y-4">
           <div className="flex gap-6 items-start p-8 rounded-3xl glass border-none group hover:bg-slate-900/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                   <p className="text-lg font-bold text-white tracking-tight">Confidence Drop Detected</p>
                   <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-bold text-slate-500 font-mono">04:12</span>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                   Your trust score plummeted while explaining cross-region database replication. Recruiter perceived technical hesitation as a <span className="text-red-400 font-semibold italic">Knowledge Gap</span> signal. Recommend refining technical storytelling for high-latency scenarios.
                 </p>
              </div>
           </div>
           
           <div className="flex gap-6 items-start p-8 rounded-3xl glass border-none group hover:bg-slate-900/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-3">
                   <p className="text-lg font-bold text-white tracking-tight">Strong Ownership Signal</p>
                   <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-bold text-slate-500 font-mono">01:30</span>
                 </div>
                 <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
                   High resonance with <span className="text-emerald-400 font-semibold">Leadership Archetype</span> keywords. Recruiter micro-expressions indicate high interest during the "Conflict Resolution" segment of the system design walkthrough.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
