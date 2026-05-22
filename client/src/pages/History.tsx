// ============================================================
// History Page - SOVEREIGN
// Design: Full session history table with filters
// ============================================================
import { motion } from "framer-motion";
import { Link } from "wouter";
import { History as HistoryIcon, ExternalLink, Filter } from "lucide-react";

const sessions = [
  { id: "s1", name: "BTC 0.3.24 Full Scan", mode: "⚛️ Quantum", chain: "BTC", status: "completed", progress: 100, found: 12, balance: "$92,882", date: "2026-05-20" },
  { id: "s2", name: "ETH Legacy Wallets", mode: "🧠 Neural", chain: "ETH", status: "running", progress: 67, found: 3, balance: "$4,521", date: "2026-05-21" },
  { id: "s3", name: "Multi-chain Sweep", mode: "🔥 Turbo", chain: "Multi", status: "running", progress: 34, found: 0, balance: "$0", date: "2026-05-21" },
  { id: "s4", name: "Dark Web Intel Scan", mode: "🌐 Dark Web", chain: "BTC", status: "completed", progress: 100, found: 7, balance: "$15,230", date: "2026-05-19" },
  { id: "s5", name: "Time Machine 2010", mode: "⏰ Time Machine", chain: "BTC", status: "failed", progress: 89, found: 2, balance: "$890", date: "2026-05-18" },
  { id: "s6", name: "Alien Mode Test", mode: "👽 Alien", chain: "BTC", status: "completed", progress: 100, found: 45, balance: "$1,234,567", date: "2026-05-17" },
  { id: "s7", name: "Rainbow Table Attack", mode: "🌈 Rainbow", chain: "LTC", status: "completed", progress: 100, found: 5, balance: "$2,100", date: "2026-05-16" },
  { id: "s8", name: "Cluster Distributed Scan", mode: "☁️ Cluster", chain: "Multi", status: "cancelled", progress: 45, found: 1, balance: "$340", date: "2026-05-15" },
];

export default function History() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <HistoryIcon className="text-[#00d4ff]" /> Recovery History
          </h1>
          <p className="text-[#00d4ff]/50 font-mono text-xs mt-1">All your recovery sessions</p>
        </div>
        <button className="glass border border-[#00d4ff]/30 px-4 py-2 rounded-lg text-sm font-heading flex items-center gap-2 text-[#00d4ff] hover:border-[#00d4ff] transition-all">
          <Filter size={14} /> Filter
        </button>
      </div>

      <motion.div className="glass rounded-xl p-6 overflow-x-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#00ff88]/10">
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Session</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Mode</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Chain</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Status</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Progress</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Found</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Balance</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Date</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s, i) => (
              <motion.tr
                key={s.id}
                className="border-b border-[#00ff88]/5 hover:bg-[#00ff88]/5 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="py-3 text-white font-heading">{s.name}</td>
                <td className="py-3 text-[#00d4ff] text-xs">{s.mode}</td>
                <td className="py-3 text-[#ffaa00] text-xs font-mono">{s.chain}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-mono ${
                    s.status === "completed" ? "bg-[#00ff88]/10 text-[#00ff88]" :
                    s.status === "running" ? "bg-[#ffaa00]/10 text-[#ffaa00] animate-pulse" :
                    s.status === "failed" ? "bg-red-500/10 text-red-400" :
                    "bg-[#556677]/10 text-[#556677]"
                  }`}>{s.status}</span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-[#0a0a1a] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full" style={{ width: `${s.progress}%` }} />
                    </div>
                    <span className="text-[10px] text-[#556677] font-mono">{s.progress}%</span>
                  </div>
                </td>
                <td className="py-3 text-[#00ff88] font-mono text-xs">{s.found}</td>
                <td className="py-3 text-white font-mono text-xs">{s.balance}</td>
                <td className="py-3 text-[#556677] font-mono text-[10px]">{s.date}</td>
                <td className="py-3">
                  <Link href={`/recovery/${s.id}`}>
                    <ExternalLink size={12} className="text-[#556677] hover:text-[#00d4ff] cursor-pointer" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
