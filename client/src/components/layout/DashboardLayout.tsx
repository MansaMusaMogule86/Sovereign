// ============================================================
// Dashboard Layout - Cyberpunk Sidebar + Main Content
// Design: Glass morphism sidebar with neon accents
// ============================================================
import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Plus, History, Wallet, Atom, Brain, Globe, Clock,
  Settings, BookOpen, LogOut, Zap, ChevronRight
} from "lucide-react";

const iconMap: Record<string, any> = {
  LayoutDashboard, Plus, History, Wallet, Atom, Brain, Globe, Clock,
  Settings, BookOpen, LogOut
};

const navItems = [
  { icon: "LayoutDashboard", label: "Dashboard", route: "/dashboard" },
  { icon: "Plus", label: "New Recovery", route: "/recovery/new" },
  { icon: "History", label: "History", route: "/history" },
  { icon: "Wallet", label: "Addresses", route: "/addresses" },
];

const advancedItems = [
  { icon: "Atom", label: "Quantum", route: "/recovery/quantum" },
  { icon: "Brain", label: "AI Predict", route: "/recovery/ai-predict" },
  { icon: "Globe", label: "Dark Web", route: "/recovery/darkweb" },
  { icon: "Clock", label: "Time Machine", route: "/recovery/timemachine" },
];

const bottomItems = [
  { icon: "Settings", label: "Settings", route: "/settings" },
  { icon: "BookOpen", label: "Docs", route: "/docs" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const NavItem = ({ icon, label, route }: { icon: string; label: string; route: string }) => {
    const Icon = iconMap[icon] || Zap;
    const isActive = location === route || (route !== "/dashboard" && location.startsWith(route));
    return (
      <Link href={route}>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? "bg-[#00ff88]/10 border-l-4 border-[#00ff88] text-[#00ff88]"
            : "hover:bg-[#00ff88]/5 text-[#8899aa] hover:text-[#00d4ff] border-l-4 border-transparent"
        }`}>
          <Icon size={18} className={isActive ? "text-[#00ff88]" : "text-[#556677] group-hover:text-[#00d4ff]"} />
          <span className="font-heading text-sm font-medium">{label}</span>
          {isActive && <ChevronRight size={14} className="ml-auto text-[#00ff88]/60" />}
        </div>
      </Link>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Sidebar */}
      <aside className="w-64 h-screen flex flex-col glass-strong border-r border-[#00ff88]/20 fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-[#00ff88]/10">
          <Link href="/dashboard">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
                <Zap size={20} className="text-black" />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold text-[#00ff88] tracking-wider">SOVEREIGN</h1>
                <p className="text-[10px] text-[#00d4ff]/60 font-mono tracking-widest">QUANTUM RECOVERY</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem key={item.route} {...item} />
          ))}

          <div className="my-4 border-t border-[#00ff88]/10" />
          <p className="px-4 py-2 text-[10px] font-mono text-[#00d4ff]/40 uppercase tracking-widest">Advanced</p>
          
          {advancedItems.map((item) => (
            <NavItem key={item.route} {...item} />
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-[#00ff88]/10 space-y-1">
          {bottomItems.map((item) => (
            <NavItem key={item.route} {...item} />
          ))}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left hover:bg-red-500/10 text-[#556677] hover:text-red-400 transition-all">
            <LogOut size={18} />
            <span className="font-heading text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 overflow-y-auto p-8 relative">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(0,255,136,0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(0,212,255,0.02) 0%, transparent 50%)`
          }}
        />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
