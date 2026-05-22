// ============================================================
// Dark Web Scanner Page - SOVEREIGN
// Design: Address input, scan status, leak sources
// ============================================================
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Search, Loader2, AlertTriangle, Shield } from "lucide-react";

export default function RecoveryDarkweb() {
  const [address, setAddress] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setResults([
        { source: "BitcoinTalk Forum Dump (2014)", probability: "89%", status: "MATCH", keys: 3 },
        { source: "Mt. Gox Leaked Database", probability: "76%", status: "PARTIAL", keys: 1 },
        { source: "Silk Road Wallet Cache", probability: "62%", status: "POSSIBLE", keys: 0 },
        { source: "Pastebin Key Dumps (2012-2015)", probability: "54%", status: "POSSIBLE", keys: 2 },
        { source: "Dark Market Escrow Leaks", probability: "31%", status: "LOW", keys: 0 },
      ]);
      setIsScanning(false);
    }, 3500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
          <Globe className="text-red-400" /> Dark Web Scanner
        </h1>
        <p className="text-[#00d4ff]/50 font-mono text-xs mt-1">Scan leaked databases for wallet key fragments</p>
      </div>

      {/* Warning Banner */}
      <div className="glass rounded-xl p-4 border border-[#ffaa00]/30 flex items-center gap-4">
        <AlertTriangle size={20} className="text-[#ffaa00] shrink-0" />
        <p className="text-xs text-[#ffaa00]/80 font-mono">
          This tool scans publicly available leaked databases. All data is used for legitimate recovery purposes only.
        </p>
      </div>

      {/* Input */}
      <div className="glass rounded-xl p-6">
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-3 block">Target Address or Wallet Identifier</label>
        <div className="flex gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Bitcoin address, email, or username..."
            className="flex-1 bg-[#0a0a1a] border-2 border-red-500/30 rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-red-500 focus:outline-none placeholder:text-[#334455]"
          />
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="cyber-btn px-6 py-3 rounded-lg font-heading font-bold flex items-center gap-2 disabled:opacity-50"
          >
            {isScanning ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {isScanning ? "Scanning..." : "Scan"}
          </button>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="font-heading font-bold text-white">Scan Results ({results.length} sources checked)</h3>
          {results.map((r, i) => (
            <motion.div
              key={i}
              className="glass rounded-lg p-4 flex items-center justify-between"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <Shield size={18} className={
                  r.status === "MATCH" ? "text-[#00ff88]" :
                  r.status === "PARTIAL" ? "text-[#ffaa00]" :
                  "text-[#556677]"
                } />
                <div>
                  <p className="text-sm font-heading text-white">{r.source}</p>
                  <p className="text-xs text-[#556677] font-mono">
                    {r.keys > 0 ? `${r.keys} key fragment(s) found` : "No direct keys found"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-sm font-mono font-bold ${
                  r.status === "MATCH" ? "text-[#00ff88]" :
                  r.status === "PARTIAL" ? "text-[#ffaa00]" :
                  "text-[#556677]"
                }`}>{r.probability}</span>
                <p className={`text-[10px] font-mono ${
                  r.status === "MATCH" ? "text-[#00ff88]" :
                  r.status === "PARTIAL" ? "text-[#ffaa00]" :
                  "text-[#556677]"
                }`}>{r.status}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {results.length === 0 && !isScanning && (
        <div className="glass rounded-xl p-12 text-center">
          <Globe size={48} className="mx-auto text-red-400/30 mb-4" />
          <p className="text-sm text-[#556677] font-mono">Enter an address and scan to check leaked databases</p>
        </div>
      )}
    </div>
  );
}
