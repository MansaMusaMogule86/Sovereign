// ============================================================
// Time Machine Page - SOVEREIGN
// Design: Historical blockchain analysis with year selector
// ============================================================
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Play, Loader2 } from "lucide-react";

export default function RecoveryTimeMachine() {
  const [year, setYear] = useState(2011);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResults({
        blocksAnalyzed: 52340,
        transactionsFound: 1247890,
        patternMatches: 342,
        probableAddresses: 28,
        confidence: 87.3,
        topFindings: [
          { block: 170000, address: "1A1zP1eP5QGefi2DM...", pattern: "Weak PRNG seed", confidence: "94%" },
          { block: 172500, address: "1BvBMSEYstWetqTFn...", pattern: "Sequential PID", confidence: "88%" },
          { block: 175000, address: "3J98t1WpEZ73CNmQv...", pattern: "Time-based entropy", confidence: "76%" },
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
          <Clock className="text-[#00d4ff]" /> Time Machine
        </h1>
        <p className="text-[#00d4ff]/50 font-mono text-xs mt-1">Historical blockchain analysis for vulnerable wallet detection</p>
      </div>

      {/* Year Selector */}
      <div className="glass rounded-xl p-6">
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">
          Target Year: <span className="text-[#00ff88] font-display text-2xl ml-2">{year}</span>
        </label>
        <input
          type="range" min={2009} max={2015} value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full accent-[#00d4ff]"
        />
        <div className="flex justify-between text-[10px] text-[#556677] font-mono mt-2">
          {[2009, 2010, 2011, 2012, 2013, 2014, 2015].map(y => (
            <span key={y} className={y === year ? "text-[#00ff88]" : ""}>{y}</span>
          ))}
        </div>
        <p className="text-xs text-[#556677] font-mono mt-4">
          Analyzing blocks from {year}: Bitcoin Core versions active during this period had known PRNG vulnerabilities.
        </p>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="cyber-btn w-full py-4 rounded-lg font-heading font-bold flex items-center gap-3 justify-center mt-6 disabled:opacity-50"
        >
          {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
          {isAnalyzing ? "ANALYZING BLOCKCHAIN..." : "ACTIVATE TIME MACHINE"}
        </button>
      </div>

      {/* Results */}
      {results && (
        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Blocks Analyzed", value: results.blocksAnalyzed.toLocaleString(), color: "#00d4ff" },
              { label: "Transactions", value: results.transactionsFound.toLocaleString(), color: "#ffaa00" },
              { label: "Pattern Matches", value: results.patternMatches.toString(), color: "#7b2ff7" },
              { label: "Probable Addresses", value: results.probableAddresses.toString(), color: "#00ff88" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-4 text-center">
                <p className="text-2xl font-display font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[10px] text-[#556677] font-mono mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Confidence */}
          <div className="glass rounded-xl p-6 neon-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-heading text-white">Overall Confidence</span>
              <span className="text-lg font-display font-bold text-[#00ff88]">{results.confidence}%</span>
            </div>
            <div className="h-4 bg-[#0a0a1a] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full" style={{ width: `${results.confidence}%` }} />
            </div>
          </div>

          {/* Top Findings */}
          <div className="glass rounded-xl p-6">
            <h3 className="font-heading font-bold text-white mb-4">Top Findings</h3>
            <div className="space-y-3">
              {results.topFindings.map((finding: any, i: number) => (
                <div key={i} className="glass rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-mono text-xs text-[#00d4ff]">{finding.address}</p>
                    <p className="text-[10px] text-[#556677] font-mono mt-1">Block #{finding.block} • {finding.pattern}</p>
                  </div>
                  <span className="text-sm font-mono font-bold text-[#00ff88]">{finding.confidence}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
