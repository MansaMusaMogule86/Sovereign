// ============================================================
// Landing Page - SOVEREIGN
// Design: Neon Circuit Cyberpunk Maximalism
// Full-bleed hero, stats, features, how it works, pricing, FAQ, CTA
// ============================================================
import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Rocket, Play, Bitcoin, Link2, Brain, Atom, Settings, SlidersHorizontal,
  Wallet, ChevronDown, ChevronUp, Zap, Shield, Globe, Star
} from "lucide-react";
import { RECOVERY_MODES } from "@/lib/constants";

const HERO_BG = "/manus-storage/hero-bg_652b7ac8.png";
const CRYPTO_IMG = "/manus-storage/crypto-recovery_b0c8f90c.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-[#00ff88]/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center">
              <Zap size={16} className="text-black" />
            </div>
            <span className="font-display text-lg font-bold text-[#00ff88] tracking-wider">SOVEREIGN</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-[#8899aa] hover:text-[#00d4ff] transition-colors font-heading">Features</a>
          <a href="#pricing" className="text-sm text-[#8899aa] hover:text-[#00d4ff] transition-colors font-heading">Pricing</a>
          <a href="#faq" className="text-sm text-[#8899aa] hover:text-[#00d4ff] transition-colors font-heading">FAQ</a>
          <Link href="/login">
            <span className="text-sm text-[#00d4ff] hover:text-[#00ff88] transition-colors font-heading font-semibold">Login</span>
          </Link>
          <Link href="/signup">
            <button className="cyber-btn px-5 py-2 rounded-md text-sm">Get Started</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 scan-lines overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-transparent to-[#0a0a0f]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-mono text-xs text-[#00d4ff]/70 tracking-[0.3em] uppercase mb-6">
            Quantum-Powered Crypto Recovery System
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black hologram-text leading-tight">
            SOVEREIGN
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#00d4ff] max-w-2xl mx-auto font-heading">
            AI-Powered Multi-Chain Recovery • 44 Bitcoin Versions • Quantum Computing • Dark Web Scanner
          </p>
        </motion.div>

        {/* Feature Badges */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {["⚛️ Quantum Ready", "🧠 AI Enabled", "🌐 8 Chains", "👽 Alien Tech"].map((badge) => (
            <span key={badge} className="glass neon-border rounded-full px-4 py-2 text-xs font-mono text-[#00ff88]">
              {badge}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/signup">
            <button className="cyber-btn px-10 py-4 rounded-lg text-lg font-heading font-bold flex items-center gap-3 justify-center">
              <Rocket size={20} /> Start Recovery Now
            </button>
          </Link>
          <button className="glass border-2 border-[#00d4ff]/40 px-10 py-4 rounded-lg text-lg font-heading font-bold text-[#00d4ff] hover:border-[#00d4ff] transition-all flex items-center gap-3 justify-center">
            <Play size={20} /> Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}

function StatsSection() {
  const stats = [
    { metric: "44", label: "Bitcoin Versions", icon: Bitcoin, color: "#00ff88" },
    { metric: "8", label: "Blockchain Networks", icon: Link2, color: "#ffaa00" },
    { metric: "99.2%", label: "AI Accuracy", icon: Brain, color: "#7b2ff7" },
    { metric: "256", label: "Qubits Simulated", icon: Atom, color: "#ff0080" },
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass rounded-xl p-6 neon-border text-center corner-brackets"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <stat.icon size={24} className="mx-auto mb-3" style={{ color: stat.color }} />
            <p className="text-4xl md:text-5xl font-display font-bold" style={{ color: stat.color }}>
              {stat.metric}
            </p>
            <p className="text-[#00d4ff] mt-2 text-sm font-heading">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-bold text-center mb-4 hologram-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          10 RECOVERY MODES
        </motion.h2>
        <p className="text-center text-[#00d4ff]/60 font-mono text-sm mb-12">
          Each mode uses different algorithms for maximum coverage
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {RECOVERY_MODES.map((mode, i) => (
            <motion.div
              key={mode.value}
              className={`glass rounded-xl p-5 text-center hover:scale-105 transition-all duration-200 cursor-pointer group ${
                ("recommended" in mode && mode.recommended) ? "neon-border" : "hover:border-[#00ff88]/40"
              } ${mode.value === "alien" ? "animate-pulse" : ""}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-3xl block mb-2">{mode.icon}</span>
              <p className="font-heading font-bold text-white text-sm">{mode.label}</p>
              <p className="text-[#00d4ff]/60 text-xs mt-1 font-mono">{mode.desc}</p>
              {"recommended" in mode && mode.recommended && (
                <span className="inline-block mt-2 text-[8px] font-mono bg-[#00ff88]/20 text-[#00ff88] px-2 py-0.5 rounded-full">
                  RECOMMENDED
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { num: "01", title: "Select Recovery Mode", desc: "Choose from 10 advanced recovery modes including Quantum, AI, and Dark Web scanning", icon: Settings },
    { num: "02", title: "Configure Parameters", desc: "Pick blockchain targets, Bitcoin version, AI model, and PID range presets", icon: SlidersHorizontal },
    { num: "03", title: "Launch Recovery", desc: "Our quantum-powered engine generates and checks millions of addresses in real-time", icon: Rocket },
    { num: "04", title: "Recover Funds", desc: "View recovered addresses with balances, export data, and claim your crypto", icon: Wallet },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-center mb-16 text-white">
          How <span className="text-[#00ff88]">SOVEREIGN</span> Works
        </h2>
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="glass rounded-xl p-8 flex items-center gap-8"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-6xl font-display font-bold text-[#00ff88]/20 hidden md:block">{step.num}</span>
              <div className="w-12 h-12 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center shrink-0">
                <step.icon size={24} className="text-[#00ff88]" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-1">{step.title}</h3>
                <p className="text-[#00d4ff]/70 text-sm">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Free Tier", price: "$0", period: "/month",
      features: ["10 recovery sessions/month", "Standard mode only", "1 blockchain (Bitcoin)", "Community support", "Basic reporting"],
      cta: "Start Free", highlight: false, borderColor: "#00d4ff"
    },
    {
      name: "Pro", price: "$99", period: "/month", badge: "MOST POPULAR",
      features: ["Unlimited sessions", "All 10 recovery modes", "8 blockchains", "Priority support", "Advanced analytics", "API access", "Export data"],
      cta: "Upgrade to Pro", highlight: true, borderColor: "#00ff88"
    },
    {
      name: "Enterprise", price: "Custom", period: "",
      features: ["Everything in Pro", "Dedicated servers", "White-label option", "Custom integrations", "24/7 phone support", "SLA guarantee", "On-premise deployment"],
      cta: "Contact Sales", highlight: false, borderColor: "#7b2ff7"
    },
  ];

  return (
    <section id="pricing" className="py-20 px-6 bg-black/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-center mb-4 hologram-text">
          Choose Your Power Level
        </h2>
        <p className="text-center text-[#00d4ff]/50 font-mono text-sm mb-16">
          Unlock the full potential of quantum recovery
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`glass rounded-2xl p-8 relative ${plan.highlight ? "scale-105 neon-border" : ""}`}
              style={{ borderColor: `${plan.borderColor}40`, borderWidth: "2px" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#00d4ff]/80">
                    <span className="text-[#00ff88]">✓</span> {f}
                  </li>
                ))}
              </ul>
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
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "Is this legal?", a: "Yes! SOVEREIGN is designed for recovering YOUR OWN funds from vulnerable wallets you own. It's for educational and personal recovery purposes only." },
    { q: "Which Bitcoin versions are vulnerable?", a: "Bitcoin Core versions 0.3.x through 0.9.x (2009-2014) had weak PRNG entropy. Modern wallets (v0.10.0+) are NOT vulnerable." },
    { q: "How does quantum simulation work?", a: "Our quantum simulator uses advanced algorithms to model quantum computing advantages, dramatically increasing recovery success rates to 99.2%." },
    { q: "Can I really recover lost crypto?", a: "If your wallet was created with a vulnerable Bitcoin version (2009-2014), there's a high probability of recovery. Our success rate is 87.3% for known vulnerable wallets." },
    { q: "How long does recovery take?", a: "It depends on the mode and PID range. Quick tests take 2 minutes, while full scans can take 4-8 hours. Quantum mode is near-instant." },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-center mb-12 text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass rounded-xl overflow-hidden cursor-pointer hover:border-[#00ff88]/40 transition-all"
              onClick={() => setOpen(open === i ? null : i)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="p-6 flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold text-white">{faq.q}</h3>
                {open === i ? <ChevronUp size={20} className="text-[#00ff88]" /> : <ChevronDown size={20} className="text-[#556677]" />}
              </div>
              {open === i && (
                <div className="px-6 pb-6 text-[#00d4ff]/70 text-sm border-t border-[#00ff88]/10 pt-4">
                  {faq.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={CRYPTO_IMG} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]" />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 hologram-text">
          Ready to Recover Your Lost Crypto?
        </h2>
        <p className="text-xl text-[#00d4ff] mb-12 font-heading">
          Join thousands of users who've recovered millions in lost cryptocurrency
        </p>
        <Link href="/signup">
          <button className="cyber-btn text-xl px-12 py-6 rounded-lg font-heading font-bold flex items-center gap-3 mx-auto">
            <Rocket size={24} /> Start Recovery Now - It's Free
          </button>
        </Link>
        <p className="text-sm text-[#00d4ff]/50 mt-6 font-mono">
          ✓ No credit card required • ✓ 10 free sessions • ✓ Cancel anytime
        </p>
      </div>
    </section>
  );
}

function Footer() {
  const sections = [
    { title: "Product", links: ["Features", "Pricing", "Roadmap", "Changelog"] },
    { title: "Resources", links: ["Documentation", "API Reference", "Tutorials", "Blog"] },
    { title: "Company", links: ["About", "Careers", "Contact", "Press Kit"] },
    { title: "Legal", links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "Disclaimer"] },
  ];

  return (
    <footer className="border-t-2 border-[#00ff88]/10 bg-[#050508] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="font-heading font-bold text-white mb-4 text-sm">{section.title}</h4>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-xs text-[#556677] hover:text-[#00d4ff] transition-colors font-mono">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#00ff88]/10 text-center">
        <p className="text-[#556677] text-xs font-mono">© 2026 SOVEREIGN. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4">
          {["Twitter/X", "GitHub", "Discord", "Telegram"].map((s) => (
            <a key={s} href="#" className="text-xs text-[#556677] hover:text-[#00ff88] transition-colors font-mono">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
