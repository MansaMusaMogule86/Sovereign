// ============================================================
// SOVEREIGN - Core Constants
// Design: Neon Circuit Cyberpunk Maximalism
// ============================================================

export const RECOVERY_MODES = [
  { value: "standard", label: "Standard", icon: "⚡", desc: "Classic PRNG", color: "green" },
  { value: "turbo", label: "Turbo", icon: "🔥", desc: "GPU Accelerated", color: "orange" },
  { value: "quantum", label: "Quantum", icon: "⚛️", desc: "99.2% Success", color: "cyan", recommended: true },
  { value: "neural", label: "Neural", icon: "🧠", desc: "AI Powered", color: "purple" },
  { value: "social", label: "Social", icon: "🕵️", desc: "Dark Arts", color: "yellow" },
  { value: "darkweb", label: "Dark Web", icon: "🌐", desc: "Leaked DBs", color: "red" },
  { value: "timemachine", label: "Time Machine", icon: "⏰", desc: "Historical", color: "blue" },
  { value: "rainbow", label: "Rainbow", icon: "🌈", desc: "Instant Crack", color: "multicolor" },
  { value: "cluster", label: "Cluster", icon: "☁️", desc: "Distributed", color: "teal" },
  { value: "alien", label: "Alien", icon: "👽", desc: "GOD MODE", color: "magenta" },
] as const;

export const BLOCKCHAINS = [
  { value: "btc", label: "Bitcoin", symbol: "₿", color: "#f7931a" },
  { value: "eth", label: "Ethereum", symbol: "Ξ", color: "#627eea" },
  { value: "ltc", label: "Litecoin", symbol: "Ł", color: "#bfbbbb" },
  { value: "doge", label: "Dogecoin", symbol: "Ð", color: "#c2a633" },
  { value: "bch", label: "Bitcoin Cash", symbol: "฿", color: "#8dc351" },
  { value: "xmr", label: "Monero", symbol: "ɱ", color: "#ff6600" },
  { value: "dash", label: "Dash", symbol: "D", color: "#008ce7" },
  { value: "zcash", label: "Zcash", symbol: "ⓩ", color: "#ecb244" },
] as const;

export const AI_MODELS = [
  { value: "neural", label: "Neural Network Predictor", accuracy: "94.7%" },
  { value: "quantum", label: "Quantum Computing Simulator", accuracy: "99.2%" },
  { value: "genetic", label: "Genetic Algorithm Optimizer", accuracy: "91.3%" },
  { value: "deeplearn", label: "Deep Learning Pattern Matcher", accuracy: "96.8%" },
  { value: "blockchain-ai", label: "Blockchain AI Analyzer", accuracy: "89.5%" },
] as const;

export const BITCOIN_VERSIONS = {
  "Official Bitcoin Core (Critical)": [
    "0.3.24", "0.8.6-d", "0.8.6-qt", "0.9.1-d", "0.9.4-d"
  ],
  "Pattern Variants A (High Risk)": [
    "unknownA", "unknownA1", "unknownA2", "unknownA4"
  ],
  "Extended Variants (Medium Risk)": [
    "unknownA0x", "unknownA1x", "unknownB0x", "unknownC1x", "unknownD0x"
  ],
  "Legacy Variants (2009-2010)": [
    "0.1.0", "0.1.5", "0.2.0", "0.2.1", "0.3.0", "0.3.2", "0.3.8", "0.3.10", "0.3.12", "0.3.13", "0.3.14", "0.3.15", "0.3.17", "0.3.18", "0.3.19", "0.3.20", "0.3.21", "0.3.22", "0.3.23"
  ],
  "Extended Core (2011-2014)": [
    "0.4.0", "0.5.0", "0.6.0", "0.7.0", "0.8.0", "0.8.1", "0.8.2", "0.8.3", "0.8.4", "0.8.5", "0.9.0"
  ],
} as const;

export const PID_PRESETS = [
  { value: "quick", label: "Quick Test (1000-2000)", time: "~2 min", start: 1000, end: 2000, icon: "⚡" },
  { value: "low", label: "Low Range (1-5000)", time: "~15 min", start: 1, end: 5000, icon: "🔹" },
  { value: "medium", label: "Medium Range (5000-15000)", time: "~30 min", start: 5000, end: 15000, icon: "🔸" },
  { value: "high", label: "High Range (15000-32768)", time: "~45 min", start: 15000, end: 32768, icon: "🔺" },
  { value: "common", label: "Common PIDs (1000-10000)", time: "~45 min", start: 1000, end: 10000, icon: "⭐" },
  { value: "full", label: "Full Scan (1-32768)", time: "~4 hrs", start: 1, end: 32768, icon: "🔥" },
  { value: "extended", label: "Extended Range (1-65535)", time: "~8 hrs", start: 1, end: 65535, icon: "💎" },
  { value: "targeted", label: "Targeted (30000-32768)", time: "~30 min", start: 30000, end: 32768, icon: "🎯" },
  { value: "bitcoin-era", label: "Bitcoin Era (2009-2015)", time: "~2 min", start: 100, end: 1500, icon: "🌟" },
  { value: "custom", label: "Custom Range", time: "varies", start: 1, end: 65535, icon: "✏️" },
] as const;

export const NAV_LINKS = [
  { icon: "LayoutDashboard", label: "Dashboard", route: "/dashboard" },
  { icon: "Plus", label: "New Recovery", route: "/recovery/new" },
  { icon: "History", label: "History", route: "/history" },
  { icon: "Wallet", label: "Addresses", route: "/addresses" },
  { divider: true },
  { icon: "Atom", label: "Quantum", route: "/recovery/quantum" },
  { icon: "Brain", label: "AI Predict", route: "/recovery/ai-predict" },
  { icon: "Globe", label: "Dark Web", route: "/recovery/darkweb" },
  { icon: "Clock", label: "Time Machine", route: "/recovery/timemachine" },
] as const;

export const STATS_MOCK = {
  totalSessions: 23,
  addressesFound: 1247,
  totalRecovered: 12450,
  successRate: 87.3,
};
