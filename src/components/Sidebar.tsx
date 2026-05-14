import { useAuth } from "../lib/AuthContext";
import { Button } from "./ui/button";
import { 
  History, 
  LayoutDashboard, 
  LogOut, 
  MessageSquare, 
  ShieldCheck, 
  TrendingUp,
  User as UserIcon,
  Plus,
  Globe
} from "lucide-react";
import { motion } from "motion/react";

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export function Sidebar({ currentTab, setTab }: SidebarProps) {
  const { profile, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'interviews', label: 'Interview Arena', icon: MessageSquare },
    { id: 'resume', label: 'Resume Intelligence', icon: ShieldCheck },
    { id: 'social', label: 'Social Intelligence', icon: Globe },
    { id: 'analytics', label: 'Readiness Metrics', icon: TrendingUp },
    { id: 'history', label: 'Past Sessions', icon: History },
  ];

  return (
    <div className="w-64 h-screen border-r border-white/10 glass flex flex-col p-6 fixed left-0 top-0">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center font-bold text-white uppercase italic">H</div>
        <span className="font-semibold text-xl tracking-tight text-white">HIRESIGHT <span className="text-blue-500 font-light italic">AI</span></span>
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-4 px-2">Navigation</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              currentTab === item.id 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className={`w-4 h-4 ${currentTab === item.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`} />
            <span className="text-xs font-semibold tracking-wide uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="pt-6 border-t border-white/10 space-y-4">
        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 mb-4">
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Global Readiness</p>
          <p className="text-xl font-mono font-bold mt-1 text-white">78<span className="text-xs text-blue-500">%</span></p>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mt-2">
            <div className="h-full accent-gradient w-[78%]"></div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate uppercase tracking-tight">{profile?.displayName || 'User'}</p>
            <p className="text-[10px] text-slate-500 truncate font-mono uppercase">{profile?.email?.split('@')[0]}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start gap-3 text-slate-500 hover:text-destructive hover:bg-destructive/10 transition-colors"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
        </Button>
      </div>
    </div>
  );
}
