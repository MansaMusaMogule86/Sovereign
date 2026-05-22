// ============================================================
// Recovery Session Detail Page - SOVEREIGN
// Design: Live progress, feed, results table with real engine
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Pause, Play, X, Download, Copy, ExternalLink, Key, Wallet, DollarSign, Activity } from "lucide-react";
import { useRecoverySession } from "@/hooks/useRecoverySession";
import { getQuickRecoveryConfig } from "@/lib/recovery-engine";

interface Props { id: string; }

export default function RecoverySession({ id }: Props) {
  const { status, progress, start, pause, resume, cancel } = useRecoverySession();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const config = getQuickRecoveryConfig();
      start(config);
      setHasStarted(true);
    }
  }, [hasStarted, start]);

  const progressPct = progress ? (progress.currentPid / progress.totalPids) * 100 : 0;

  const handleToggle = () => {
    if (status === "running") pause();
    else if (status === "paused") resume();
  };

  const exportCSV = useCallback(() => {
    if (!progress?.results.length) return;
    const headers = "Address,Type,Chain,Balance,USD,PID\n";
    const rows = progress.results.map(r => `${r.address},${r.type},${r.chain},${r.balance},${r.usd},${r.pid}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sovereign-recovery-${id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [progress, id]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">BTC 0.3.24 Quantum Recovery</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-mono ${
              status === "running" ? "bg-[#ffaa00]/10 text-[#ffaa00] animate-pulse" :
              status === "completed" ? "bg-[#00ff88]/10 text-[#00ff88]" :
              status === "paused" ? "bg-[#00d4ff]/10 text-[#00d4ff]" :
              "bg-[#556677]/10 text-[#556677]"
            }`}>
              {status.toUpperCase()}
            </span>
            <span className="text-xs text-[#556677] font-mono">Session: {id}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {(status === "running" || status === "paused") && (
            <button
              onClick={handleToggle}
              className="glass border border-[#00d4ff]/30 px-4 py-2 rounded-lg text-sm font-heading flex items-center gap-2 hover:border-[#00d4ff] transition-all text-[#00d4ff]"
            >
              {status === "running" ? <Pause size={14} /> : <Play size={14} />}
              {status === "running" ? "Pause" : "Resume"}
            </button>
          )}
          {status !== "completed" && status !== "idle" && (
            <button onClick={cancel} className="glass border border-red-500/30 px-4 py-2 rounded-lg text-sm font-heading flex items-center gap-2 hover:border-red-500 transition-all text-red-400">
              <X size={14} /> Cancel
            </button>
          )}
          <button onClick={exportCSV} className="cyber-btn px-4 py-2 rounded-lg text-sm font-heading flex items-center gap-2">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <motion.div className="glass rounded-xl p-6 neon-border" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-[#556677] font-mono">Progress</span>
            <span className="text-xs text-[#00ff88] font-mono">{progressPct.toFixed(1)}%</span>
          </div>
          <div className="h-6 bg-[#0a0a1a] rounded-full overflow-hidden border border-[#00ff88]/30">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00ff88] via-[#00d4ff] to-[#7b2ff7] rounded-full relative"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3 }}
            >
              {status === "running" && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[border-flow_2s_linear_infinite]" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Progress", value: `${progressPct.toFixed(1)}%`, icon: Activity, color: "#00ff88" },
            { label: "Keys Checked", value: (progress?.keysChecked || 0).toLocaleString(), icon: Key, color: "#00d4ff" },
            { label: "Addresses Found", value: (progress?.addressesFound || 0).toString(), icon: Wallet, color: "#ffaa00" },
            { label: "Balance Found", value: `$${(progress?.totalBalance || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: DollarSign, color: "#00ff88" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-lg p-4 text-center">
              <stat.icon size={18} className="mx-auto mb-2" style={{ color: stat.color }} />
              <p className="text-lg font-display font-bold text-white">{stat.value}</p>
              <p className="text-[10px] text-[#556677] font-mono">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Live Feed */}
      <motion.div className="glass rounded-xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
          {status === "running" && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
          LIVE RECOVERY FEED
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {(progress?.feedMessages || []).map((item, i) => (
            <div key={i} className="glass rounded-lg p-3 flex items-center gap-4">
              <span className="text-[10px] text-[#556677] font-mono shrink-0">{item.time}</span>
              <span className={`text-xs font-mono ${
                item.type === "success" ? "text-[#00ff88] font-bold" :
                item.type === "quantum" ? "text-[#7b2ff7]" :
                item.type === "ai" ? "text-[#ff0080]" :
                "text-[#8899aa]"
              }`}>
                {item.msg}
              </span>
            </div>
          ))}
          {(!progress?.feedMessages || progress.feedMessages.length === 0) && (
            <p className="text-xs text-[#556677] font-mono text-center py-4">Waiting for recovery data...</p>
          )}
        </div>
      </motion.div>

      {/* Results Table */}
      {progress && progress.results.length > 0 && (
        <motion.div className="glass rounded-xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-white">Recovered Addresses ({progress.results.length})</h3>
            <button onClick={exportCSV} className="text-xs text-[#00d4ff] font-mono hover:text-[#00ff88]">Export CSV</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#00ff88]/10">
                  <th className="text-left py-3 text-[#556677] font-mono text-xs">Address</th>
                  <th className="text-left py-3 text-[#556677] font-mono text-xs">Type</th>
                  <th className="text-left py-3 text-[#556677] font-mono text-xs">Chain</th>
                  <th className="text-left py-3 text-[#556677] font-mono text-xs">Balance</th>
                  <th className="text-left py-3 text-[#556677] font-mono text-xs">USD</th>
                  <th className="text-left py-3 text-[#556677] font-mono text-xs">PID</th>
                  <th className="text-left py-3 text-[#556677] font-mono text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {progress.results.slice(-20).map((addr, i) => (
                  <tr key={i} className="border-b border-[#00ff88]/5 hover:bg-[#00ff88]/5 transition-colors">
                    <td className="py-3 font-mono text-xs text-[#00d4ff]">
                      {addr.address.slice(0, 12)}...{addr.address.slice(-6)}
                    </td>
                    <td className="py-3 text-xs text-[#8899aa]">{addr.type}</td>
                    <td className="py-3 text-xs text-[#ffaa00]">{addr.chain}</td>
                    <td className="py-3 font-mono text-xs text-white">{addr.balance}</td>
                    <td className="py-3 font-mono text-xs text-[#00ff88] font-bold">{addr.usd}</td>
                    <td className="py-3 font-mono text-xs text-[#556677]">{addr.pid}</td>
                    <td className="py-3 flex gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(addr.address)}
                        className="text-[#556677] hover:text-[#00d4ff]"
                      >
                        <Copy size={12} />
                      </button>
                      <button className="text-[#556677] hover:text-[#00d4ff]"><ExternalLink size={12} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
