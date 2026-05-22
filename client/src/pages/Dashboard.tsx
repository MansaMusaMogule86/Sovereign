// ============================================================
// Dashboard Page - SOVEREIGN
// Design: Stats grid, quick actions, recent sessions table
// ============================================================
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Layers, Wallet, DollarSign, TrendingUp, Zap, Brain,
  Rocket, ArrowRight, ExternalLink
} from "lucide-react";

const DASHBOARD_BG = "/manus-storage/dashboard-bg_a0aae584.png";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-[#00d4ff]/50 font-mono text-xs mt-1">Home &gt; Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Sessions", value: "23", icon: Layers, change: "+5 this week", color: "#00ff88" },
          { title: "Addresses Found", value: "1,247", icon: Wallet, change: "+89 today", color: "#00d4ff" },
          { title: "Total Recovered", value: "$12,450", icon: DollarSign, change: "+$2,340 this month", color: "#ffaa00" },
          { title: "Success Rate", value: "87.3%", icon: TrendingUp, change: "+3.2% improvement", color: "#7b2ff7" },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            className="glass rounded-xl p-6 neon-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#8899aa] font-heading">{stat.title}</span>
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-display font-bold text-white">{stat.value}</p>
            <p className="text-xs font-mono mt-2" style={{ color: stat.color }}>{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/recovery/new">
            <div className="glass rounded-xl p-6 hover:border-[#00ff88]/40 transition-all cursor-pointer group border border-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center">
                  <Zap size={24} className="text-[#00ff88]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white">Quick Recovery</h3>
                  <p className="text-xs text-[#556677] mt-1">Start a fast recovery session with default settings</p>
                </div>
                <ArrowRight size={20} className="text-[#556677] group-hover:text-[#00ff88] transition-colors" />
              </div>
            </div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/recovery/ai-predict">
            <div className="glass rounded-xl p-6 hover:border-[#7b2ff7]/40 transition-all cursor-pointer group border border-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#7b2ff7]/10 border border-[#7b2ff7]/30 flex items-center justify-center">
                  <Brain size={24} className="text-[#7b2ff7]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white">AI Prediction</h3>
                  <p className="text-xs text-[#556677] mt-1">Use neural networks to predict likely addresses</p>
                </div>
                <ArrowRight size={20} className="text-[#556677] group-hover:text-[#7b2ff7] transition-colors" />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Recent Sessions */}
      <motion.div
        className="glass rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading font-bold text-white text-lg">Recent Sessions</h2>
          <Link href="/history">
            <span className="text-xs text-[#00d4ff] hover:text-[#00ff88] font-mono cursor-pointer">View All →</span>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#00ff88]/10">
                <th className="text-left py-3 text-[#556677] font-mono text-xs">Session</th>
                <th className="text-left py-3 text-[#556677] font-mono text-xs">Mode</th>
                <th className="text-left py-3 text-[#556677] font-mono text-xs">Status</th>
                <th className="text-left py-3 text-[#556677] font-mono text-xs">Progress</th>
                <th className="text-left py-3 text-[#556677] font-mono text-xs">Found</th>
                <th className="text-left py-3 text-[#556677] font-mono text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "BTC 0.3.24 Full Scan", mode: "⚛️ Quantum", status: "completed", progress: 100, found: 12 },
                { name: "ETH Legacy Wallets", mode: "🧠 Neural", status: "running", progress: 67, found: 3 },
                { name: "Multi-chain Sweep", mode: "🔥 Turbo", status: "running", progress: 34, found: 0 },
                { name: "Dark Web Intel Scan", mode: "🌐 Dark Web", status: "completed", progress: 100, found: 7 },
                { name: "Time Machine 2010", mode: "⏰ Time Machine", status: "failed", progress: 89, found: 2 },
              ].map((session, i) => (
                <tr key={i} className="border-b border-[#00ff88]/5 hover:bg-[#00ff88]/5 transition-colors">
                  <td className="py-3 text-white font-heading">{session.name}</td>
                  <td className="py-3 text-[#00d4ff]">{session.mode}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                      session.status === "completed" ? "bg-[#00ff88]/10 text-[#00ff88]" :
                      session.status === "running" ? "bg-[#ffaa00]/10 text-[#ffaa00] animate-pulse" :
                      "bg-red-500/10 text-red-400"
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-[#0a0a1a] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full"
                          style={{ width: `${session.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#556677] font-mono">{session.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-[#00ff88] font-mono">{session.found}</td>
                  <td className="py-3">
                    <Link href={`/recovery/session-${i + 1}`}>
                      <ExternalLink size={14} className="text-[#556677] hover:text-[#00d4ff] cursor-pointer" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
