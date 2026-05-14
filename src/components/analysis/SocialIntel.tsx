import { useState } from 'react';
import { 
  Linkedin, 
  Github, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Target,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from 'react-markdown';
import { generateSocialReport } from "../../lib/gemini";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { toast } from "sonner";

export default function SocialIntel() {
  const [links, setLinks] = useState({
    linkedin: '',
    github: '',
    portfolio: ''
  });
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerate = async () => {
    if (!links.linkedin && !links.github && !links.portfolio) {
      toast.error("Please provide at least one profile link.");
      return;
    }

    setIsAnalyzing(true);
    setReport(null);
    
    try {
      // Simulate "Deep Analysis" for UX
      await new Promise(resolve => setTimeout(resolve, 3000));
      const result = await generateSocialReport(links);
      setReport(result);
      toast.success("Social Intelligence Report synthesized.");
    } catch (error) {
      toast.error("Failed to analyze digital presence.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 px-4">
      {/* Header section */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
          <TrendingUp className="w-3 h-3" /> Digital Presence Scrutiny
        </div>
        <h1 className="text-5xl font-serif italic font-black text-white">Social Intelligence</h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Unlock high-signal insights from your LinkedIn, GitHub, and Portfolio. 
          We analyze your <span className="text-white">recruiter attractiveness</span> and technical depth.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="glass border-none rounded-3xl p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <Target className="w-32 h-32" />
            </div>
            
            <div className="space-y-6 relative z-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">LinkedIn Profile</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="linkedin.com/in/username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    value={links.linkedin}
                    onChange={(e) => setLinks({...links, linkedin: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">GitHub Profile</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="github.com/username"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all"
                    value={links.github}
                    onChange={(e) => setLinks({...links, github: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Portfolio Website</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="yourportfolio.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl h-14 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all"
                    value={links.portfolio}
                    onChange={(e) => setLinks({...links, portfolio: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleGenerate}
              disabled={isAnalyzing}
              className="w-full h-16 rounded-2xl accent-gradient text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {isAnalyzing ? (
                <>Analyzing Artifacts <Sparkles className="w-4 h-4 ml-2 animate-pulse" /></>
              ) : (
                <>Generate intelligence <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </Card>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {!report && !isAnalyzing ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full min-h-[500px] glass rounded-[3rem] border-none flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8">
                  <ShieldCheck className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-xl font-serif italic text-slate-400">Waiting for Data Injection...</h3>
                <p className="text-slate-500 text-xs mt-4 max-w-sm leading-relaxed">
                  Provide your profile URLs to begin the <span className="text-slate-400">Signal Synthesis</span> process. 
                  We'll evaluate your readiness in real-time.
                </p>
              </motion.div>
            ) : isAnalyzing ? (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full min-h-[500px] glass rounded-[3rem] border-none flex flex-col items-center justify-center p-12 text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    borderRadius: ["2.5rem", "4rem", "2.5rem"]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-2 border-blue-500/20 border-t-blue-500 mb-12"
                />
                <div className="space-y-4 relative z-10">
                  <h3 className="text-2xl font-serif italic font-black text-white">Synthesizing Signal...</h3>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-black animate-pulse">Running Digital Presence Audit</p>
                    <div className="flex gap-1">
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 rounded-full bg-blue-500" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 rounded-full bg-blue-500" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 rounded-full bg-blue-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="report"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-[3rem] border-none p-12 relative overflow-hidden"
              >
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-serif prose-headings:italic prose-headings:text-blue-400 prose-p:text-slate-300 prose-li:text-slate-300 prose-ul:list-disc">
                  <Markdown>{report}</Markdown>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Insight Synthesis</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 h-auto p-0"
                    onClick={() => {
                      setReport(null);
                      setLinks({linkedin: '', github: '', portfolio: ''});
                    }}
                  >
                    Reset Scrutiny
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
