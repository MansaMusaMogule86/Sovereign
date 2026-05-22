// ============================================================
// Signup Page - SOVEREIGN
// Design: Glass card with OAuth + email registration
// ============================================================
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Zap, Mail, Lock, User, Github } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const [, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="glass-strong rounded-2xl p-8 w-full max-w-md neon-border relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
                <Zap size={20} className="text-black" />
              </div>
              <span className="font-display text-2xl font-bold text-[#00ff88] tracking-wider">SOVEREIGN</span>
            </div>
          </Link>
          <p className="text-[#00d4ff]/60 font-mono text-xs">Create your quantum recovery account</p>
        </div>

        <div className="space-y-3 mb-6">
          <button onClick={() => setLocation("/dashboard")} className="w-full glass border border-[#00d4ff]/20 rounded-lg px-4 py-3 flex items-center gap-3 hover:border-[#00ff88]/40 transition-all text-sm font-heading">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-white">Sign up with Google</span>
          </button>
          <button onClick={() => setLocation("/dashboard")} className="w-full glass border border-[#00d4ff]/20 rounded-lg px-4 py-3 flex items-center gap-3 hover:border-[#00ff88]/40 transition-all text-sm font-heading">
            <Github size={20} className="text-white" />
            <span className="text-white">Sign up with GitHub</span>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-[#00ff88]/10" />
          <span className="text-xs text-[#556677] font-mono">OR</span>
          <div className="flex-1 h-px bg-[#00ff88]/10" />
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs text-[#00d4ff]/60 font-mono mb-1 block">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0a0a1a] border border-[#00d4ff]/20 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#334455] focus:border-[#00ff88] focus:outline-none transition-colors font-mono"
                placeholder="Satoshi Nakamoto" />
            </div>
          </div>
          <div>
            <label className="text-xs text-[#00d4ff]/60 font-mono mb-1 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a0a1a] border border-[#00d4ff]/20 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#334455] focus:border-[#00ff88] focus:outline-none transition-colors font-mono"
                placeholder="satoshi@bitcoin.org" />
            </div>
          </div>
          <div>
            <label className="text-xs text-[#00d4ff]/60 font-mono mb-1 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a1a] border border-[#00d4ff]/20 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#334455] focus:border-[#00ff88] focus:outline-none transition-colors font-mono"
                placeholder="••••••••••" />
            </div>
          </div>
          <button type="submit" className="cyber-btn w-full py-3 rounded-lg font-heading font-bold text-sm mt-2">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-[#556677] font-mono">
          Already have an account?{" "}
          <Link href="/login"><span className="text-[#00ff88] hover:underline">Sign in</span></Link>
        </p>
      </motion.div>
    </div>
  );
}
