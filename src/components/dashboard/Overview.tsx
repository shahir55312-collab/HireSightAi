import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { 
  Zap, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  AlertCircle,
  Play,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { motion } from "motion/react";
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export function DashboardOverview() {
  const radarData = [
    { subject: 'Communication', A: 85, fullMark: 100 },
    { subject: 'Technical', A: 72, fullMark: 100 },
    { subject: 'Behavioral', A: 90, fullMark: 100 },
    { subject: 'Stress', A: 65, fullMark: 100 },
    { subject: 'Leadership', A: 78, fullMark: 100 },
    { subject: 'Authenticity', A: 95, fullMark: 100 },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-12">
      <header className="flex items-end justify-between border-b border-white/10 pb-8">
        <div className="space-y-1">
          <h1 className="text-6xl font-serif italic font-black neon-text">Intelligence</h1>
          <p className="text-slate-400">Predicted outcome for <span className="text-white italic">Goldman Sachs (Tier 1)</span></p>
        </div>
        <div className="hidden md:flex gap-12 items-baseline">
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Hiring Probability</p>
            <p className="text-7xl font-mono font-bold tracking-tighter">78<span className="text-3xl text-blue-500 font-light">%</span></p>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass rounded-3xl p-8 border-none overflow-hidden relative">
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
              <h3 className="text-lg font-bold uppercase tracking-tight">Readiness Trajectory</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Phase: Expert Refinement</p>
            </div>
            <Badge className="accent-gradient border-none rounded-lg font-bold tracking-widest text-[10px] py-1 px-3">SIMULATION READY</Badge>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-56 h-56 flex items-center justify-center shrink-0">
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#activeGrad)" strokeWidth="8" strokeDasharray="283" strokeDashoffset="62" strokeLinecap="round" />
                <defs>
                  <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <span className="text-6xl font-mono font-black block">78</span>
                <span className="text-[10px] text-blue-500 font-bold uppercase tracking-[0.2em] -mt-2 block">Alpha Rating</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-6 w-full">
              {[
                { label: 'CONFIDENCE STABILITY', value: 82 },
                { label: 'TECHNICAL DEPTH', value: 64 },
                { label: 'EMOTIONAL COMPOSURE', value: 91 },
              ].map((m) => (
                <div key={m.label} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">{m.label}</span>
                    <span className="text-white">{m.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      className="h-full accent-gradient"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="glass rounded-3xl p-6 border-none">
          <h3 className="text-[10px] uppercase font-black text-slate-500 tracking-[0.3em] mb-6">Readiness Radar</h3>
          <div className="h-[240px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} />
                <Radar name="Candidate" dataKey="A" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <StatItem label="Recruiter Trust" value="ELITE" color="text-emerald-400" />
        <StatItem label="Recovery Speed" value="1.4s" color="text-blue-400" />
        <StatItem label="Scripted Tone" value="LOW" color="text-purple-400" />
        <StatItem label="Target Alignment" value="TIER-1" color="text-white" />
      </div>

      <div className="h-32 glass rounded-3xl p-8 flex items-center justify-between border-t-4 border-blue-500/50">
        <div className="flex gap-6 items-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 border border-blue-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">NEXT DEVELOPMENT GOAL</p>
            <p className="text-xl font-bold leading-tight">Refine Architecture Storytelling</p>
            <p className="text-xs text-slate-400 italic">Reduce technical hesitation gaps by 12% in multi-cloud discussions.</p>
          </div>
        </div>
        <Button className="h-12 px-8 accent-gradient rounded-2xl font-bold text-xs tracking-widest text-white shadow-xl shadow-blue-500/20">
          START SIMULATION
        </Button>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="glass rounded-2xl p-6 border-none">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-3xl font-mono font-bold tracking-tighter ${color}`}>{value}</p>
    </div>
  );
}
