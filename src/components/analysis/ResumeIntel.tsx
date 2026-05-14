import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { 
  FileText, 
  Upload, 
  ShieldCheck, 
  Search,
  SearchCheck,
  AlertCircle,
  FileCheck,
  Zap,
  Target,
  Loader2,
  TrendingUp,
  Award,
  Lightbulb
} from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { motion } from "motion/react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

export function ResumeIntel() {
  const [isUploading, setIsUploading] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('last_resume_intel');
    if (saved) setResumeData(JSON.parse(saved));
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    setIsUploading(true);
    // Simulate parsing with deeper data
    setTimeout(() => {
      const mockData = {
        fileName: acceptedFiles[0].name,
        atsScore: 82,
        authenticityScore: 94,
        skillMatch: [
          { subject: 'React/TS', A: 95, fullMark: 100 },
          { subject: 'Node.js', A: 85, fullMark: 100 },
          { subject: 'System Design', A: 70, fullMark: 100 },
          { subject: 'Team Lead', A: 80, fullMark: 100 },
          { subject: 'DevOps', A: 60, fullMark: 100 },
        ],
        keywordDensity: [
          { name: 'Scalability', value: 8 },
          { name: 'Architecture', value: 12 },
          { name: 'Leadership', value: 5 },
          { name: 'Agile', value: 15 },
          { name: 'Testing', value: 4 },
        ],
        keyClaims: [
          { claim: "Built distributed AI chatbot", risk: "Low", confidence: 98, context: "Ask about scaling" },
          { claim: "Improved performance by 40%", risk: "Medium", confidence: 72, context: "Verification needed" },
          { claim: "Led team of 5", risk: "Low", confidence: 95, context: "Behavioral follow-up" }
        ],
        weakness: ["Shallow metrics for internship", "Buzzword stuffing in Skills section"],
        recommendations: [
          { text: "Quantify DevOps impact with specific deployment frequency metrics.", impact: 90, effort: 40 },
          { text: "Strengthen 'Testing' section; currently lacks mention of specific frameworks (Vitest/Cypress).", impact: 85, effort: 20 },
          { text: "Consolidate 'Agile' mentions to make room for more technical specificities.", impact: 60, effort: 30 }
        ]
      };
      setResumeData(mockData);
      localStorage.setItem('last_resume_intel', JSON.stringify(mockData));
      setIsUploading(false);
    }, 2000);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 
      'application/pdf': ['.pdf'], 
      'application/msword': ['.doc'], 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg']
    },
    multiple: false
  });

  const clearData = () => {
    setResumeData(null);
    localStorage.removeItem('last_resume_intel');
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-12">
      <header className="flex items-end justify-between border-b border-white/10 pb-8">
        <div className="space-y-1">
          <h1 className="text-6xl font-serif italic font-black neon-text leading-tight">Intel</h1>
          <p className="text-slate-400">Deep <span className="text-white italic">recruiter-grade</span> artifact analysis.</p>
        </div>
        {resumeData && (
          <Button 
            variant="outline" 
            onClick={clearData}
            className="rounded-2xl border-white/10 glass text-[10px] font-black uppercase tracking-widest px-6 py-2 h-10"
          >
            Reset Analysis
          </Button>
        )}
      </header>

      {!resumeData && (
        <Card className="glass h-[450px] flex items-center justify-center p-12 rounded-3xl border-none relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div {...getRootProps()} className="text-center cursor-pointer relative z-10 w-full max-w-xl">
            <input {...getInputProps()} />
            <div className="w-24 h-24 accent-gradient rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-white shadow-2xl shadow-blue-500/20 group-hover:scale-110 transition-transform">
               {isUploading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Upload className="w-10 h-10" />}
            </div>
            <h3 className="text-3xl font-serif italic font-black mb-4 uppercase tracking-tighter">
              {isUploading ? "Synthesizing Artifact..." : "Upload Career Asset"}
            </h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto font-medium leading-relaxed">
              Drag and drop your resume (PDF/DOCX) for <span className="text-white">deep-tier</span> analysis.
            </p>
          </div>
        </Card>
      )}

      {resumeData && (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Dashboard Column */}
          <div className="lg:col-span-8 space-y-8">
             {/* Core Scores */}
             <div className="grid md:grid-cols-2 gap-8">
               <Card className="glass rounded-3xl p-8 border-none relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ATS Optimization</span>
                      <span className="text-5xl font-mono font-bold italic text-blue-400">{resumeData.atsScore}<span className="text-base ml-0.5">%</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${resumeData.atsScore}%` }} className="h-full accent-gradient" />
                    </div>
                  </div>
               </Card>
               <Card className="glass rounded-3xl p-8 border-none relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Authenticity Conf.</span>
                      <span className="text-5xl font-mono font-bold italic text-purple-400">{resumeData.authenticityScore}<span className="text-base ml-0.5">%</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${resumeData.authenticityScore}%` }} className="h-full accent-gradient" />
                    </div>
                  </div>
               </Card>
             </div>

             {/* Graphical Analysis */}
             <div className="grid md:grid-cols-2 gap-8">
                {/* Skill Web */}
                <Card className="glass rounded-3xl p-8 border-none">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Skill Resonance Map
                  </h4>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={resumeData.skillMatch}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                        <Radar
                          name="Skills"
                          dataKey="A"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          fill="#3b82f6"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Keyword Distribution */}
                <Card className="glass rounded-3xl p-8 border-none">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Keyword Density
                  </h4>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resumeData.keywordDensity} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10 }} width={80} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', fontSize: '10px' }}
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                          {resumeData.keywordDensity?.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#a855f7'} fillOpacity={0.8} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
             </div>

              {/* Recommendations Section */}
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Advanced Recommendations</h4>
                <div className="grid md:grid-cols-3 gap-4">
                   {resumeData.recommendations?.map((rec: any, i: number) => (
                     <Card key={i} className="glass p-5 rounded-2xl border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Lightbulb className="w-8 h-8 text-yellow-400" />
                        </div>
                        <div className="relative z-10 space-y-4">
                          <p className="text-[11px] text-slate-300 leading-relaxed font-medium italic">"{rec.text}"</p>
                          <div className="space-y-2">
                             <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-500">
                               <span>Impact</span>
                               <span className="text-blue-400">{rec.impact}%</span>
                             </div>
                             <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                               <motion.div initial={{ width: 0 }} animate={{ width: `${rec.impact}%` }} className="h-full bg-blue-500" />
                             </div>
                          </div>
                        </div>
                     </Card>
                   ))}
                </div>
             </div>
          </div>

          {/* Right Column: Key Claims & Vulnerabilities */}
          <div className="lg:col-span-4 space-y-8">
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Target Perception Nodes</h4>
                 <div className="space-y-4">
                    {resumeData.keyClaims?.map((claim: any, i: number) => (
                      <div key={i} className="glass p-6 rounded-2xl border-none flex items-start justify-between group hover:bg-white/10 transition-colors">
                         <div className="flex-1 space-y-4">
                            <div className="space-y-1">
                               <div className="flex items-center justify-between gap-3">
                                  <p className="text-sm font-bold text-white uppercase tracking-tight">{claim.claim}</p>
                                  <p className="text-[10px] font-mono font-bold text-blue-400">{claim.confidence}%</p>
                               </div>
                               <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                 <motion.div initial={{ width: 0 }} animate={{ width: `${claim.confidence}%` }} className="h-full bg-blue-500" />
                               </div>
                            </div>
                            <div className="flex items-center justify-between">
                               <Badge className={`rounded-md font-bold tracking-[0.1em] text-[9px] py-0.5 border-none shadow-sm ${
                                 claim.risk === 'Low' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                               }`}>
                                 {claim.risk.toUpperCase()} RISK
                               </Badge>
                               <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black italic">{claim.context}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
             </div>

             <Card className="glass rounded-3xl p-6 border-none bg-red-500/[0.02] border-t border-red-500/20">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-6 flex items-center gap-2">
                   <AlertCircle className="w-3.5 h-3.5" />
                   Structural Vulnerabilities
                </h4>
                <div className="space-y-5">
                   {resumeData.weakness?.map((w: string, i: number) => (
                     <div key={i} className="flex gap-4 text-xs text-slate-400 italic leading-relaxed items-start group">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors shrink-0" />
                        "{w}"
                     </div>
                   ))}
                </div>
             </Card>

             <Card className="glass rounded-3xl p-6 border-none relative overflow-hidden bg-blue-500/[0.02]">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-6 flex items-center gap-2">
                   <Zap className="w-3.5 h-3.5" />
                   AI Training Sync
                </h4>
                <div className="space-y-4">
                   <p className="text-[10px] text-slate-500 leading-relaxed">
                     Your intelligence profile has been synthesized. Entering the <span className="text-white">Arena</span> will now trigger resume-specific scrutiny blocks.
                   </p>
                   <Button 
                    className="w-full h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest gap-2 accent-gradient text-white shadow-xl shadow-blue-500/20"
                    onClick={() => window.location.href = '#arena'}
                   >
                      Enter Arena <Target className="w-3.5 h-3.5" />
                   </Button>
                </div>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}

