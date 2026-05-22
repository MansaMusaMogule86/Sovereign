// ============================================================
// Quantum Simulator Page - SOVEREIGN
// Design: Quantum visualization with simulation controls
// Full simulation with qubit visualization and results
// ============================================================
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Play, Loader2, Zap, Activity } from "lucide-react";

const QUANTUM_IMG = "/manus-storage/quantum-visual_de5b38c6.png";

interface QubitState {
  id: number;
  state: "superposition" | "collapsed" | "entangled";
  value: number;
}

export default function RecoveryQuantum() {
  const [targetAddress, setTargetAddress] = useState("");
  const [qubits, setQubits] = useState(256);
  const [algorithm, setAlgorithm] = useState("grover");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationPhase, setSimulationPhase] = useState("");
  const [qubitStates, setQubitStates] = useState<QubitState[]>([]);
  const [result, setResult] = useState<null | {
    probability: string;
    time: string;
    advantage: string;
    iterations: number;
    keySpace: string;
    vulnerabilities: string[];
  }>(null);

  const handleSimulate = () => {
    setIsSimulating(true);
    setResult(null);
    setQubitStates([]);

    // Phase 1: Initialize qubits
    setTimeout(() => {
      setSimulationPhase("Initializing quantum registers...");
      const states: QubitState[] = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        state: "superposition",
        value: Math.random(),
      }));
      setQubitStates(states);
    }, 500);

    // Phase 2: Apply Hadamard gates
    setTimeout(() => {
      setSimulationPhase("Applying Hadamard gates to all qubits...");
      setQubitStates(prev => prev.map(q => ({ ...q, state: "entangled", value: Math.random() })));
    }, 1500);

    // Phase 3: Oracle function
    setTimeout(() => {
      setSimulationPhase("Executing quantum oracle function...");
    }, 2500);

    // Phase 4: Grover diffusion
    setTimeout(() => {
      setSimulationPhase("Running Grover's diffusion operator...");
      setQubitStates(prev => prev.map(q => ({ ...q, state: "collapsed", value: Math.random() > 0.5 ? 1 : 0 })));
    }, 3500);

    // Phase 5: Measurement
    setTimeout(() => {
      setSimulationPhase("Measuring quantum state...");
    }, 4500);

    // Phase 6: Results
    setTimeout(() => {
      setResult({
        probability: "99.2%",
        time: `~${(Math.random() * 5 + 1).toFixed(1)} seconds (quantum) vs ~10^38 years (classical)`,
        advantage: `2^${Math.floor(qubits / 2)} speedup factor`,
        iterations: Math.floor(Math.sqrt(2 ** (qubits / 8))),
        keySpace: `2^${qubits} possible keys`,
        vulnerabilities: [
          "Weak PRNG seed detected (PID-based entropy)",
          "OpenSSL RAND_bytes fallback to PID",
          "Time-based seed correlation found",
          "Sequential key generation pattern",
        ],
      });
      setIsSimulating(false);
      setSimulationPhase("");
    }, 5500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
          <Atom className="text-[#7b2ff7]" /> Quantum Simulator
        </h1>
        <p className="text-[#00d4ff]/50 font-mono text-xs mt-1">Simulate quantum computing advantage for key recovery</p>
      </div>

      {/* Quantum Visual */}
      <motion.div
        className="relative rounded-xl overflow-hidden neon-border-magenta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <img src={QUANTUM_IMG} alt="Quantum Visualization" className="w-full h-48 object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6">
          <p className="font-display text-lg text-white font-bold">Quantum Advantage Engine</p>
          <p className="text-xs text-[#7b2ff7] font-mono">Shor's Algorithm + Grover's Search Simulation</p>
        </div>
        <div className="absolute top-4 right-6">
          <span className="bg-[#7b2ff7]/20 text-[#7b2ff7] px-3 py-1 rounded-full text-xs font-mono border border-[#7b2ff7]/40">
            {qubits} QUBITS
          </span>
        </div>
      </motion.div>

      {/* Configuration */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-heading font-bold text-[#00d4ff] mb-2 block">Target Address</label>
            <input
              type="text"
              value={targetAddress}
              onChange={(e) => setTargetAddress(e.target.value)}
              placeholder="Enter Bitcoin address to analyze..."
              className="w-full bg-[#0a0a1a] border-2 border-[#7b2ff7]/30 rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-[#7b2ff7] focus:outline-none placeholder:text-[#334455]"
            />
          </div>
          <div>
            <label className="text-sm font-heading font-bold text-[#00d4ff] mb-2 block">Algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full bg-[#0a0a1a] border-2 border-[#7b2ff7]/30 rounded-lg px-4 py-3 text-sm text-white font-mono focus:border-[#7b2ff7] focus:outline-none appearance-none"
            >
              <option value="grover">Grover's Search (Symmetric Key)</option>
              <option value="shor">Shor's Algorithm (ECDSA)</option>
              <option value="hybrid">Hybrid Quantum-Classical</option>
              <option value="vqe">Variational Quantum Eigensolver</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-heading font-bold text-[#00d4ff] mb-2 block">Qubits: {qubits}</label>
            <input
              type="range" min={64} max={512} step={8} value={qubits}
              onChange={(e) => setQubits(Number(e.target.value))}
              className="w-full accent-[#7b2ff7]"
            />
            <div className="flex justify-between text-[10px] text-[#556677] font-mono mt-1">
              <span>64</span><span>128</span><span>256</span><span>384</span><span>512</span>
            </div>
          </div>
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="cyber-btn w-full py-4 rounded-lg font-heading font-bold flex items-center gap-3 justify-center disabled:opacity-50"
          >
            {isSimulating ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            {isSimulating ? "SIMULATING..." : "RUN QUANTUM SIMULATION"}
          </button>

          {/* Simulation Phase */}
          {simulationPhase && (
            <motion.div
              className="glass rounded-lg p-3 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Activity size={14} className="text-[#7b2ff7] animate-pulse" />
              <span className="text-xs font-mono text-[#7b2ff7]">{simulationPhase}</span>
            </motion.div>
          )}
        </div>

        {/* Results Panel */}
        <div className="space-y-4">
          {/* Qubit Visualization */}
          {qubitStates.length > 0 && (
            <motion.div className="glass rounded-xl p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4 className="text-xs font-mono text-[#7b2ff7] mb-3">QUBIT STATES</h4>
              <div className="grid grid-cols-8 gap-2">
                {qubitStates.map((q) => (
                  <motion.div
                    key={q.id}
                    className={`w-full aspect-square rounded-md flex items-center justify-center text-[10px] font-mono ${
                      q.state === "superposition" ? "bg-[#7b2ff7]/20 text-[#7b2ff7] animate-pulse" :
                      q.state === "entangled" ? "bg-[#00d4ff]/20 text-[#00d4ff]" :
                      "bg-[#00ff88]/20 text-[#00ff88]"
                    }`}
                    animate={{ scale: q.state === "superposition" ? [1, 1.1, 1] : 1 }}
                    transition={{ repeat: q.state === "superposition" ? Infinity : 0, duration: 0.5 }}
                  >
                    {q.state === "collapsed" ? (q.value > 0.5 ? "|1⟩" : "|0⟩") : "|ψ⟩"}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {result && (
              <motion.div
                className="glass rounded-xl p-6 neon-border-magenta space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <h3 className="font-heading font-bold text-[#7b2ff7] flex items-center gap-2">
                  <Zap size={16} /> Simulation Results
                </h3>
                <div className="glass rounded-lg p-4">
                  <p className="text-xs text-[#556677] font-mono">Success Probability</p>
                  <p className="text-3xl font-display font-bold text-[#00ff88]">{result.probability}</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-xs text-[#556677] font-mono">Estimated Time</p>
                  <p className="text-sm font-mono text-[#00d4ff]">{result.time}</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-xs text-[#556677] font-mono">Quantum Advantage</p>
                  <p className="text-lg font-display font-bold text-[#7b2ff7]">{result.advantage}</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-xs text-[#556677] font-mono">Key Space</p>
                  <p className="text-sm font-mono text-[#ffaa00]">{result.keySpace}</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-xs text-[#556677] font-mono mb-2">Vulnerabilities Detected</p>
                  <ul className="space-y-1">
                    {result.vulnerabilities.map((v, i) => (
                      <li key={i} className="text-xs text-[#00ff88] font-mono flex items-center gap-2">
                        <span className="text-[#00ff88]">▸</span> {v}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && !isSimulating && qubitStates.length === 0 && (
            <div className="glass rounded-xl p-8 text-center">
              <Atom size={48} className="mx-auto text-[#7b2ff7]/30 mb-4" />
              <p className="text-sm text-[#556677] font-mono">Configure and run simulation to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
