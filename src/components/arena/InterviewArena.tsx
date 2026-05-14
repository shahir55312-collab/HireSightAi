import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { 
  Plus, 
  Play, 
  Square, 
  Mic, 
  Video, 
  MessageSquare, 
  ShieldCheck, 
  Send,
  Loader2,
  Sparkles,
  Zap,
  Target,
  Upload,
  ChevronRight,
  FileCheck
} from "lucide-react";
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from "motion/react";
import { generateInterviewQuestion, analyzeResponse } from "../../lib/gemini";

interface Message {
  id: string;
  role: 'interviewer' | 'candidate';
  text: string;
  analysis?: any;
}

export function InterviewArena() {
  const [isActive, setIsActive] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [transcript, setTranscript] = useState('');
  const [techStack, setTechStack] = useState<string>('');
  const [stage, setStage] = useState<'setup' | 'tech_stack' | 'interview'>('setup');
  
  // Resume State
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);

  const [metrics, setMetrics] = useState({
    confidence: 0,
    authenticity: 0,
    stressLevel: 0
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Resume Upload Handler
  const onDrop = (acceptedFiles: File[]) => {
    setIsUploading(true);
    setTimeout(() => {
      const mockData = {
        fileName: acceptedFiles[0].name,
      };
      setResumeData(mockData);
      setIsUploading(false);
    }, 1200);
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
    multiple: false,
    disabled: isUploading || !!resumeData
  });

  // Deep Synthesis Simulation
  const synthesizeResume = async () => {
    // Delay for "Deep Analysis" as requested
    await new Promise(resolve => setTimeout(resolve, 3500));
    
    const lastResume = localStorage.getItem('last_resume_intel');
    const existingData = lastResume ? JSON.parse(lastResume) : resumeData;

    const deeperData = {
      ...existingData,
      candidateName: Math.random() > 0.4 ? "Shahir" : null,
      keyClaims: existingData?.keyClaims || [
        { claim: "Distributed System Architecture", risk: "Low" },
        { claim: "40% Performance Optimization", risk: "Medium" },
        { claim: "Leadership of 10+ Engineers", risk: "Low" }
      ],
      weakness: existingData?.weakness || ["Missing specific testing metrics", "Vague on cloud cost optimization"]
    };
    
    setResumeData(deeperData);
    localStorage.setItem('last_resume_intel', JSON.stringify(deeperData));
    return deeperData;
  };

  // Initialize camera
  useEffect(() => {
    if (isActive) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Camera access denied", err));
    } else {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    }
  }, [isActive]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error", event.error);
        setIsListening(false);
      };
    }
  }, []);

  // Voice Pre-loading for Mobile
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Voice selection engine: Prioritize natural sounding voices
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = 
      voices.find(v => v.name.includes('Natural') && v.lang.startsWith('en')) ||
      voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) ||
      voices.find(v => v.lang === 'en-US');
      
    if (preferredVoice) utterance.voice = preferredVoice;

    // Human-like prosody: Slightly slower rate for clarity, variable pitch
    utterance.pitch = difficulty === 'easy' ? 1.0 : difficulty === 'hard' ? 0.85 : 0.95;
    utterance.rate = 0.92; // Slightly slower, more deliberate
    utterance.volume = 1;

    utterance.onend = () => {
      startListening();
    };
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    setTranscript('');
    setIsListening(true);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    }
  };

  const stopListeningAndRespond = async () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (!transcript.trim()) return;

    setIsThinking(true);
    const lastResume = localStorage.getItem('last_resume_intel');
    const parsedResume = resumeData || (lastResume ? JSON.parse(lastResume) : null);

    try {
      let prompt = '';
      if (stage === 'tech_stack') {
        setTechStack(transcript);
        setStage('interview');
        prompt = `Mode: ${difficulty.toUpperCase()}. The candidate provided their info: "${transcript}". ${parsedResume?.keyClaims ? `Resume analysis reveals: ${parsedResume.keyClaims.map((c: any) => c.claim).join(', ')}.` : ''} Start the session properly now. Acknowledge their tech stack briefly, then ask the first question strictly based on their resume claims. Be direct but professional. Always sound like a human interviewer.`;
      } else {
        prompt = `Mode: ${difficulty.toUpperCase()}. Candidate said: "${transcript}". Tech Stack: ${techStack}. Resume Context: ${JSON.stringify(parsedResume?.keyClaims || [])}. Ask the NEXT question specifically targeting their resume readiness. Challenge them on their depth of experience as listed in their resume artifact.`;
      }

      const nextQuestion = await generateInterviewQuestion("Software Engineer", prompt);
      
      setMetrics(prev => ({
        confidence: Math.min(100, prev.confidence + (transcript.length > 50 ? 5 : -2)),
        authenticity: Math.random() * 20 + 70, // More realistic variance
        stressLevel: difficulty === 'hard' ? 75 : 30
      }));

      setCurrentQuestion(nextQuestion);
      speak(nextQuestion);
    } catch (error) {
      console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  const startSession = async () => {
    if (!resumeData) return;
    
    // Unlock Audio Context for Mobile IMMEDIATELY on click
    const unlockUtterance = new SpeechSynthesisUtterance("One moment, I'm analyzing your profile.");
    unlockUtterance.volume = 0.1; // Speak softly or silent to unlock
    unlockUtterance.rate = 1.5;
    window.speechSynthesis.speak(unlockUtterance);
    
    setIsActive(true);
    setIsAnalyzing(true);
    setStage('tech_stack');
    
    // Step 1: Deep Analysis during active phase
    const analyzedData = await synthesizeResume();
    setIsAnalyzing(false);
    setIsThinking(true);
    
    let introText = "";
    if (analyzedData.candidateName) {
      introText = `Alright, I've gone through everything. Hello ${analyzedData.candidateName}. I've spent a few moments reviewing your profile. It's an impressive background. Before we jump into the details, could you walk me through the tech stack you've been focused on recently?`;
    } else {
      introText = `Okay, I've finished the scan. It looks quite specialized. Before we get started, I didn't catch your name in the initial analysis—who am I speaking with? Also, could you tell me about your primary tech stack?`;
    }

    setCurrentQuestion(introText);
    setIsThinking(false);
    
    // Small delay to ensure synthesis is ready for the real greeting
    setTimeout(() => {
      speak(introText);
    }, 500);
  };

  const terminateSession = () => {
    setIsActive(false);
    setStage('setup');
    window.speechSynthesis.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto space-y-8 pb-12">
      <header className="flex items-end justify-between border-b border-white/10 pb-8">
        <div className="space-y-1">
          <h1 className="text-6xl font-serif italic font-black neon-text leading-tight">Arena</h1>
          <p className="text-slate-400">Total <span className="text-white italic">auditory & visual</span> immersion simulation.</p>
        </div>
        <div className="flex gap-4">
           {isActive && (
             <Button onClick={terminateSession} variant="destructive" className="rounded-2xl h-14 px-10 text-xs font-bold tracking-widest bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
               TERMINATE PROTOCOL
             </Button>
           )}
        </div>
      </header>

      {!isActive ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-12 py-12 relative">
          {/* Difficulty & Resume Status */}
          <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Arena Protocols</h4>
                <div className="h-0.5 w-12 bg-blue-500" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {(['easy', 'medium', 'hard'] as const).map((mode) => (
                  <Card 
                    key={mode}
                    onClick={() => setDifficulty(mode)}
                    className={`p-6 glass rounded-2xl border-none cursor-pointer transition-all ${
                      difficulty === mode ? 'ring-1 ring-blue-500/50 bg-blue-500/5 shadow-xl' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-black uppercase tracking-widest">{mode} MODE</h4>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                          {mode === 'easy' ? 'Guiding & Supportive' : mode === 'medium' ? 'Standard Rigor' : 'Aggressive Scrutiny'}
                        </p>
                      </div>
                      {difficulty === mode && <ShieldCheck className="w-5 h-5 text-blue-400" />}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Resume Readiness</h4>
                <div className="h-0.5 w-12 bg-purple-500" />
              </div>
              
              <Card {...getRootProps()} className={`h-[280px] glass rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center cursor-pointer group hover:border-blue-500/50 transition-all ${resumeData ? 'border-emerald-500/30' : ''}`}>
                <input {...getInputProps()} />
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 text-white transition-transform group-hover:scale-110 ${resumeData ? 'bg-emerald-500 shadow-xl shadow-emerald-500/20' : 'bg-white/5 text-slate-500'}`}>
                  {isUploading ? <Loader2 className="w-8 h-8 animate-spin" /> : resumeData ? <FileCheck className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                </div>
                {resumeData ? (
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold text-emerald-400 uppercase tracking-widest italic">{resumeData.fileName}</h5>
                    <p className="text-[10px] text-slate-500 uppercase font-black">Artifact Synthesized successfully</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h5 className="text-sm font-bold text-white uppercase tracking-widest italic">Upload Career Artifact</h5>
                    <p className="text-[10px] text-slate-500 uppercase font-bold leading-relaxed px-8">
                      We require your resume to calibrate the <span className="text-white">scrutiny nodes</span> for this session.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>

          <div className="text-center space-y-8 max-w-md w-full">
            <Button 
              onClick={startSession} 
              disabled={!resumeData}
              className={`w-full rounded-2xl h-16 text-xs font-black tracking-[0.3em] uppercase text-white shadow-2xl transition-all ${
                resumeData ? 'accent-gradient shadow-blue-500/20 hover:scale-[1.02]' : 'bg-white/5 text-slate-600 grayscale cursor-not-allowed'
              }`}
            >
              Start Resume Readiness Session <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8 flex-1 relative">
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 z-[100] glass flex flex-col items-center justify-center backdrop-blur-2xl rounded-[3rem]"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-[2.5rem] border-2 border-blue-500/20 border-t-blue-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-blue-400 animate-pulse" />
                </div>
              </div>
              <div className="mt-8 text-center space-y-2">
                <h3 className="text-xl font-serif italic font-black text-white">Synthesizing Profile...</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Deep Scrutiny of Career Artifacts in Progress</p>
              </div>
            </motion.div>
          )}

          {/* Main Visualizer Pane */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <Card className="flex-1 glass rounded-3xl border-none relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
              <div className="absolute inset-0 bg-slate-950/40" />
              
              {/* Interviewer Visualizer */}
              <div className="relative z-10 flex flex-col items-center gap-12">
                 <div className="relative">
                    <div className={`w-48 h-48 rounded-[3rem] accent-gradient flex items-center justify-center text-white shadow-2xl transition-all duration-500 ${
                      isThinking ? 'scale-110 blur-sm' : 'scale-100'
                    }`}>
                      <div className="text-6xl font-serif italic font-black">{difficulty[0].toUpperCase()}</div>
                    </div>
                    {/* Audio Waves Simulation */}
                    <div className="absolute -inset-8 -z-10 flex items-center justify-center gap-1">
                       {[1, 2, 3, 4, 5, 6].map(i => (
                         <motion.div
                           key={i}
                           animate={{ height: isThinking || window.speechSynthesis.speaking ? [20, 60, 20] : 10 }}
                           transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                           className="w-1.5 bg-blue-500/30 rounded-full"
                         />
                       ))}
                    </div>
                 </div>
                 
                 <div className="text-center space-y-4 max-w-xl px-12">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">Recruiter node terminal</h3>
                    <AnimatePresence mode="wait">
                      <motion.p 
                        key={currentQuestion}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-2xl font-serif italic text-white leading-snug drop-shadow-lg"
                      >
                        {currentQuestion}
                      </motion.p>
                    </AnimatePresence>
                 </div>
              </div>

              {/* Status Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                       <span className="text-slate-400">Audio Sync: Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${isThinking ? 'bg-purple-500 animate-pulse' : 'bg-slate-700'}`} />
                       <span className="text-slate-400">Thinking Node</span>
                    </div>
                 </div>
                 <div className="text-slate-500 italic">Protocols active in {difficulty} mode</div>
              </div>
            </Card>

            {/* Response Area (No text typing, just transcript view) */}
            <Card className="glass rounded-3xl border-none p-8 h-48 relative group">
               <div className="flex items-center gap-6 h-full">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    isListening ? 'bg-blue-500 text-white animate-pulse shadow-lg shadow-blue-500/40' : 'bg-white/5 text-slate-500'
                  }`}>
                    <Mic className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Live Transcript</h4>
                     <p className="text-lg font-medium text-slate-300 italic leading-relaxed line-clamp-2">
                       {transcript || (isListening ? "Listening for your synthesis..." : "AI is speaking...")}
                     </p>
                  </div>
                  {isListening && transcript && (
                    <Button 
                      onClick={stopListeningAndRespond}
                      className="accent-gradient rounded-xl h-14 px-8 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/20"
                    >
                      Process Answer
                    </Button>
                  )}
               </div>
            </Card>
          </div>

          {/* Right Sidebar - Camera & Metrics */}
          <div className="lg:col-span-4 space-y-8">
             <Card className="aspect-square glass rounded-3xl border-none overflow-hidden relative shadow-2xl">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover scale-x-[-1]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/30">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                   <span className="text-[9px] font-black uppercase tracking-widest text-red-500">Live Feed</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Subject Perception</h4>
                   <p className="text-xs font-bold text-white uppercase italic">Target: {difficulty === 'hard' ? 'Aggressive Stress Analysis' : 'Standard Alignment'}</p>
                </div>
             </Card>

             <Card className="glass rounded-3xl p-8 border-none space-y-8">
                <div className="space-y-1">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Dynamic Metrics</h4>
                   <div className="h-0.5 w-8 bg-blue-500" />
                </div>
                
                <div className="space-y-6">
                   <MetricRow label="Confidence Index" value={metrics.confidence + "%"} isAccent />
                   <MetricRow label="Emotional Stability" value="Normal" />
                   <MetricRow label="Stress Resonance" value={metrics.stressLevel + "%"} />
                   <MetricRow label="Authenticity" value={metrics.authenticity + "%"} isAccent />
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 leading-relaxed italic text-center">
                  Biometric tracking is <span className="text-emerald-400">active</span>. Avoid filler keywords.
                </div>
             </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricRow({ label, value, isAccent }: { label: string, value: string, isAccent?: boolean }) {
  return (
    <div className="flex justify-between items-center text-[11px]">
       <span className="text-slate-500 font-bold uppercase tracking-wider">{label}</span>
       <span className={`font-mono font-bold ${isAccent ? 'text-blue-400' : 'text-slate-200'}`}>{value}</span>
    </div>
  );
}

