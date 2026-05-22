// ============================================================
// Pricing Page - SOVEREIGN
// Design: Full pricing page with comparison table
// ============================================================
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Zap, Check, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Free Tier", price: "$0", period: "/month",
    features: ["10 recovery sessions/month", "Standard mode only", "1 blockchain (Bitcoin)", "Community support", "Basic reporting"],
    limits: ["No AI models", "No Quantum mode", "No Dark Web scan", "No API access"],
    cta: "Start Free", highlight: false, borderColor: "#00d4ff"
  },
  {
    name: "Pro", price: "$99", period: "/month", badge: "MOST POPULAR",
    features: ["Unlimited sessions", "All 10 recovery modes", "8 blockchains", "5 AI models", "Priority support", "Advanced analytics", "API access", "Export data", "Custom PID ranges"],
    limits: ["Shared infrastructure", "Standard SLA"],
    cta: "Upgrade to Pro", highlight: true, borderColor: "#00ff88"
  },
  {
    name: "Enterprise", price: "Custom", period: "",
    features: ["Everything in Pro", "Dedicated servers", "White-label option", "Custom integrations", "24/7 phone support", "SLA guarantee", "On-premise deployment", "Custom AI training", "Unlimited API calls"],
    limits: [],
    cta: "Contact Sales", highlight: false, borderColor: "#7b2ff7"
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Header */}
      <nav className="glass-strong border-b border-[#00ff88]/10 px-6 h-16 flex items-center">
        <Link href="/">
          <div className="flex items-center gap-3">
            <ArrowLeft size={16} className="text-[#00d4ff]" />
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
              <Zap size={16} className="text-black" />
            </div>
            <span className="font-display text-lg font-bold text-[#00ff88] tracking-wider">SOVEREIGN</span>
          </div>
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl font-display font-bold hologram-text mb-4">Pricing Plans</h1>
          <p className="text-[#00d4ff]/60 font-mono text-sm">Choose the power level that matches your recovery needs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`glass rounded-2xl p-8 relative ${plan.highlight ? "scale-105 neon-border" : ""}`}
              style={{ borderColor: `${plan.borderColor}40`, borderWidth: "2px" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00ff88] text-black text-xs font-bold px-4 py-1 rounded-full font-mono">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-2xl font-heading font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-display font-bold text-[#00ff88]">{plan.price}</span>
                <span className="text-[#00d4ff]/60 font-mono">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#00d4ff]/80">
                    <Check size={14} className="text-[#00ff88] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {plan.limits.length > 0 && (
                <ul className="space-y-2 mb-6 pt-4 border-t border-[#00ff88]/10">
                  {plan.limits.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-xs text-[#556677]">
                      <span className="text-red-400">✗</span> {l}
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/signup">
                <button className={`w-full py-3 rounded-lg font-heading font-bold text-sm transition-all ${
                  plan.highlight
                    ? "cyber-btn"
                    : "glass border border-[#00d4ff]/30 text-[#00d4ff] hover:border-[#00ff88] hover:text-[#00ff88]"
                }`}>
                  {plan.cta}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
