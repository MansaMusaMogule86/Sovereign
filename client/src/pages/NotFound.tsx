// ============================================================
// 404 Not Found Page - SOVEREIGN
// Design: Cyberpunk glitch effect
// ============================================================
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Zap, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff88]/3 rounded-full blur-[150px]" />
      </div>
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-display text-[120px] md:text-[180px] font-black text-[#00ff88]/10 leading-none select-none">
          404
        </p>
        <h1 className="font-display text-3xl font-bold text-white -mt-12">SIGNAL LOST</h1>
        <p className="text-[#00d4ff]/60 font-mono text-sm mt-4 max-w-md mx-auto">
          The quantum entanglement has been disrupted. This page does not exist in any known blockchain dimension.
        </p>
        <Link href="/">
          <button className="cyber-btn px-8 py-3 rounded-lg font-heading font-bold mt-8 flex items-center gap-3 mx-auto">
            <Home size={18} /> Return to Base
          </button>
        </Link>
      </motion.div>
    </div>
  );
}
