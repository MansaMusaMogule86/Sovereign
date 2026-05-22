// ============================================================
// New Recovery Session Page - SOVEREIGN
// Design: Full configuration form with all selectors
// ============================================================
import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Rocket, Save, RotateCcw } from "lucide-react";
import { RECOVERY_MODES, BLOCKCHAINS, AI_MODELS, BITCOIN_VERSIONS, PID_PRESETS } from "@/lib/constants";

export default function RecoveryNew() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState("quantum");
  const [chains, setChains] = useState<string[]>(["btc"]);
  const [aiModel, setAiModel] = useState("quantum");
  const [btcVersion, setBtcVersion] = useState("0.3.24");
  const [pidPreset, setPidPreset] = useState("quick");
  const [pidStart, setPidStart] = useState(1000);
  const [pidEnd, setPidEnd] = useState(2000);
  const [keysPerPid, setKeysPerPid] = useState(10);
  const [sessionName, setSessionName] = useState("");

  const totalKeys = useMemo(() => (pidEnd - pidStart + 1) * keysPerPid * chains.length, [pidStart, pidEnd, keysPerPid, chains.length]);

  const handlePresetChange = (preset: string) => {
    setPidPreset(preset);
    const found = PID_PRESETS.find(p => p.value === preset);
    if (found && preset !== "custom") {
      setPidStart(found.start);
      setPidEnd(found.end);
    }
  };

  const toggleChain = (chain: string) => {
    setChains(prev => prev.includes(chain) ? prev.filter(c => c !== chain) : [...prev, chain]);
  };

  const handleSubmit = () => {
    // Store config in sessionStorage for the session page to pick up
    const config = { mode, chains, aiModel, btcVersion, pidStart, pidEnd, keysPerPid, sessionName };
    sessionStorage.setItem("sovereign_recovery_config", JSON.stringify(config));
    const sessionId = `session-${Date.now().toString(36)}`;
    setLocation(`/recovery/${sessionId}`);
  };

  const handleReset = () => {
    setMode("quantum");
    setChains(["btc"]);
    setAiModel("quantum");
    setBtcVersion("0.3.24");
    setPidPreset("quick");
    setPidStart(1000);
    setPidEnd(2000);
    setKeysPerPid(10);
    setSessionName("");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-display font-bold text-white">Launch New Recovery Session</h1>
        <p className="text-[#00d4ff]/50 font-mono text-xs mt-2">Configure your quantum-powered crypto recovery</p>
      </div>

      {/* Recovery Mode Selection */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">Recovery Mode</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {RECOVERY_MODES.map((m) => (
            <button
              key={m.value}
              onClick={() => setMode(m.value)}
              className={`glass rounded-lg p-4 text-center transition-all duration-200 ${
                mode === m.value
                  ? "border-2 border-[#00ff88] bg-[#00ff88]/10 shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                  : "border border-transparent hover:border-[#00ff88]/30"
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              <p className="text-xs font-heading font-bold text-white">{m.label}</p>
              <p className="text-[10px] text-[#556677] font-mono mt-0.5">{m.desc}</p>
              {"recommended" in m && m.recommended && (
                <span className="inline-block mt-1 text-[8px] font-mono bg-[#00ff88]/20 text-[#00ff88] px-2 py-0.5 rounded-full">REC</span>
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Blockchain Selection */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">Target Blockchains (Select Multiple)</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BLOCKCHAINS.map((chain) => (
            <button
              key={chain.value}
              onClick={() => toggleChain(chain.value)}
              className={`glass rounded-lg p-3 flex items-center gap-3 transition-all duration-200 ${
                chains.includes(chain.value)
                  ? "border-2 bg-[#00ff88]/5"
                  : "border border-transparent hover:border-[#00d4ff]/30"
              }`}
              style={{ borderColor: chains.includes(chain.value) ? chain.color : undefined }}
            >
              <span className="text-lg" style={{ color: chain.color }}>{chain.symbol}</span>
              <span className="text-sm font-heading text-white">{chain.label}</span>
              {chains.includes(chain.value) && (
                <span className="ml-auto text-xs" style={{ color: chain.color }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </motion.section>

      {/* AI Model Selection */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">AI Prediction Model</label>
        <select
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
          className="w-full bg-[#0a0a1a] border-2 border-[#7b2ff7]/40 rounded-lg px-6 py-4 text-sm text-white font-mono focus:border-[#7b2ff7] focus:outline-none appearance-none cursor-pointer"
        >
          {AI_MODELS.map((model) => (
            <option key={model.value} value={model.value}>
              {model.label} ({model.accuracy} accuracy)
            </option>
          ))}
        </select>
      </motion.section>

      {/* Bitcoin Version */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">
          Bitcoin Wallet Version (44 Versions Available)
        </label>
        <select
          value={btcVersion}
          onChange={(e) => setBtcVersion(e.target.value)}
          className="w-full bg-[#0a0a1a] border-2 border-[#00d4ff]/40 rounded-lg px-6 py-4 text-sm text-white font-mono focus:border-[#00d4ff] focus:outline-none appearance-none cursor-pointer"
        >
          {Object.entries(BITCOIN_VERSIONS).map(([group, versions]) => (
            <optgroup key={group} label={group}>
              {versions.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </motion.section>

      {/* PID Range Preset */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">PID Range Preset</label>
        <select
          value={pidPreset}
          onChange={(e) => handlePresetChange(e.target.value)}
          className="w-full bg-[#0a0a1a] border-2 border-[#00ff88]/40 rounded-lg px-6 py-4 text-sm text-white font-mono focus:border-[#00ff88] focus:outline-none appearance-none cursor-pointer"
        >
          {PID_PRESETS.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.icon} {preset.label} - {preset.time}
            </option>
          ))}
        </select>
      </motion.section>

      {/* PID Range Manual */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">PID Range (Manual Override)</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#556677] font-mono mb-1 block">Start</label>
            <input
              type="number" min={1} max={65535} value={pidStart}
              onChange={(e) => { setPidStart(Number(e.target.value)); setPidPreset("custom"); }}
              className="w-full bg-[#0a0a1a] border-2 border-[#00d4ff]/30 rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-[#00d4ff] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-[#556677] font-mono mb-1 block">End</label>
            <input
              type="number" min={1} max={65535} value={pidEnd}
              onChange={(e) => { setPidEnd(Number(e.target.value)); setPidPreset("custom"); }}
              className="w-full bg-[#0a0a1a] border-2 border-[#00d4ff]/30 rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-[#00d4ff] focus:outline-none"
            />
          </div>
        </div>
      </motion.section>

      {/* Keys Per PID */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">Keys Per PID</label>
        <input
          type="number" min={1} max={100} value={keysPerPid}
          onChange={(e) => setKeysPerPid(Number(e.target.value))}
          className="w-full bg-[#0a0a1a] border-2 border-[#00d4ff]/30 rounded-lg px-6 py-4 text-sm text-white font-mono focus:border-[#00d4ff] focus:outline-none"
        />
      </motion.section>

      {/* Total Keys Calculator */}
      <motion.div
        className="glass rounded-xl p-6 neon-border text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <p className="text-xs text-[#00d4ff]/60 font-mono mb-2">TOTAL KEYS TO GENERATE</p>
        <p className="text-5xl font-display font-bold text-[#00ff88]">{totalKeys.toLocaleString()}</p>
        <p className="text-xs text-[#556677] font-mono mt-2">
          ({pidEnd - pidStart + 1} PIDs × {keysPerPid} keys/PID × {chains.length} chain{chains.length > 1 ? "s" : ""})
        </p>
      </motion.div>

      {/* Session Name */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <label className="text-sm font-heading font-bold text-[#00d4ff] mb-4 block">Session Name (Optional)</label>
        <input
          type="text" value={sessionName}
          onChange={(e) => setSessionName(e.target.value)}
          placeholder="e.g., Bitcoin 0.3.24 Full Scan"
          className="w-full bg-[#0a0a1a] border-2 border-[#00d4ff]/30 rounded-lg px-6 py-4 text-sm text-white font-mono focus:border-[#00d4ff] focus:outline-none placeholder:text-[#334455]"
        />
      </motion.section>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center pt-4 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <button onClick={handleSubmit} className="cyber-btn px-10 py-5 rounded-lg text-lg font-heading font-bold flex items-center gap-3 justify-center">
          <Rocket size={22} /> START QUANTUM RECOVERY
        </button>
        <button className="glass border border-[#7b2ff7]/40 px-6 py-4 rounded-lg text-sm font-heading font-bold text-[#7b2ff7] hover:border-[#7b2ff7] transition-all flex items-center gap-2 justify-center">
          <Save size={16} /> Save as Template
        </button>
        <button onClick={handleReset} className="text-[#556677] hover:text-white px-6 py-4 text-sm font-heading flex items-center gap-2 justify-center transition-colors">
          <RotateCcw size={16} /> Reset
        </button>
      </motion.div>
    </div>
  );
}
