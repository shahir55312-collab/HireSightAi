import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Button } from './components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Target, Zap, ChevronRight, BarChart3, Users, Clock, ArrowRight } from 'lucide-react';

// Tabs
import { DashboardOverview } from './components/dashboard/Overview';
import { InterviewArena } from './components/arena/InterviewArena';
import { ResumeIntel } from './components/analysis/ResumeIntel';
import SocialIntel from './components/analysis/SocialIntel';
import { RecruiterPerception } from './components/analysis/RecruiterPerception';

function LandingPage() {
  const { signIn } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-primary-foreground">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center font-bold">H</div>
            <span className="text-xl font-semibold tracking-tight">HIRESIGHT <span className="text-blue-500 font-light italic">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">How it works</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Button onClick={signIn} className="rounded-full px-6 bg-white text-black hover:bg-white/90">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Recruiter Intelligence Engine</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-serif italic font-black leading-[0.85] mb-8 neon-text">
              Know if you're ready.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              AI-powered recruiter intelligence that <span className="text-white italic">predicts</span> interview outcomes before they happen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button onClick={signIn} size="lg" className="h-14 px-10 text-sm font-bold tracking-wide rounded-2xl accent-gradient text-white shadow-xl shadow-blue-500/20">
                START SIMULATION
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-10 text-sm font-bold tracking-wide rounded-2xl border-white/10 glass hover:bg-white/5">
                VIEW READINESS DEMO
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "24k+" },
            { label: "Interviews Conducted", value: "150k+" },
            { label: "Prediction Accuracy", value: "94%" },
            { label: "Success Rate Increase", value: "3.5x" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-white/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Stress Simulation Engine"
              description="Face aggressive interviewing, interruptions, and high-pressure scenarios that mirror multi-round corporate filters."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6" />}
              title="Recruiter Perception Analytics"
              description="Understand how your confidence, tone, and body language affect recruiter trust levels in real-time."
            />
            <FeatureCard 
              icon={<Target className="w-6 h-6" />}
              title="Readiness Prediction"
              description="Complex AI modeling predicts your likelihood of clearing technical and HR rounds for Tier-1 companies."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-primary/50 transition-colors group">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-white/60 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar currentTab={activeTab} setTab={setActiveTab} />
      <main className="flex-1 ml-64 p-8 overflow-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DashboardOverview />
            </motion.div>
          )}
          {activeTab === 'interviews' && (
            <motion.div
              key="interviews"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <InterviewArena />
            </motion.div>
          )}
          {activeTab === 'resume' && (
            <motion.div
              key="resume"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ResumeIntel />
            </motion.div>
          )}
          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SocialIntel />
            </motion.div>
          )}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <RecruiterPerception />
            </motion.div>
          )}
          {/* Add more tabs here */}
        </AnimatePresence>
      </main>
    </div>
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black gap-4">
      <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-white/40 text-sm animate-pulse">Initializing Recruiter Engine...</p>
    </div>
  );

  return user ? <Dashboard /> : <LandingPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
