// ============================================================
// Settings Page - SOVEREIGN
// Design: User preferences, subscription, API keys
// ============================================================
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Key, CreditCard, Palette } from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [theme, setTheme] = useState("cyberpunk");
  const [defaultMode, setDefaultMode] = useState("standard");

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
          <SettingsIcon className="text-[#00d4ff]" /> Settings
        </h1>
        <p className="text-[#00d4ff]/50 font-mono text-xs mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <motion.div className="glass rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
          <User size={18} className="text-[#00d4ff]" /> Profile
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#556677] font-mono mb-1 block">Name</label>
            <input type="text" defaultValue="Satoshi Nakamoto" className="w-full bg-[#0a0a1a] border border-[#00d4ff]/20 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:border-[#00ff88] focus:outline-none" />
          </div>
          <div>
            <label className="text-xs text-[#556677] font-mono mb-1 block">Email</label>
            <input type="email" defaultValue="satoshi@bitcoin.org" className="w-full bg-[#0a0a1a] border border-[#00d4ff]/20 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:border-[#00ff88] focus:outline-none" />
          </div>
        </div>
      </motion.div>

      {/* Subscription */}
      <motion.div className="glass rounded-xl p-6 neon-border" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
          <CreditCard size={18} className="text-[#00ff88]" /> Subscription
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white font-heading">Current Plan: <span className="text-[#00ff88] font-bold">Pro</span></p>
            <p className="text-xs text-[#556677] font-mono mt-1">Unlimited sessions • All 10 modes • 8 blockchains</p>
          </div>
          <span className="bg-[#00ff88]/10 text-[#00ff88] px-3 py-1 rounded-full text-xs font-mono">ACTIVE</span>
        </div>
        <div className="mt-4 pt-4 border-t border-[#00ff88]/10">
          <p className="text-xs text-[#556677] font-mono">Sessions used this month: <span className="text-white">47 / Unlimited</span></p>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div className="glass rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
          <Bell size={18} className="text-[#ffaa00]" /> Notifications
        </h3>
        <div className="space-y-4">
          {[
            { label: "Push Notifications", desc: "Get notified when recovery finds addresses", value: notifications, setter: setNotifications },
            { label: "Email Alerts", desc: "Receive email for important events", value: emailAlerts, setter: setEmailAlerts },
            { label: "Auto-save Sessions", desc: "Automatically save session progress", value: autoSave, setter: setAutoSave },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-heading">{item.label}</p>
                <p className="text-xs text-[#556677] font-mono">{item.desc}</p>
              </div>
              <button
                onClick={() => item.setter(!item.value)}
                className={`w-12 h-6 rounded-full transition-all ${item.value ? "bg-[#00ff88]" : "bg-[#334455]"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${item.value ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div className="glass rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
          <Palette size={18} className="text-[#7b2ff7]" /> Preferences
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-[#556677] font-mono mb-1 block">Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full bg-[#0a0a1a] border border-[#00d4ff]/20 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:border-[#00ff88] focus:outline-none appearance-none">
              <option value="cyberpunk">Cyberpunk</option>
              <option value="dark">Dark</option>
              <option value="matrix">Matrix</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[#556677] font-mono mb-1 block">Default Recovery Mode</label>
            <select value={defaultMode} onChange={(e) => setDefaultMode(e.target.value)} className="w-full bg-[#0a0a1a] border border-[#00d4ff]/20 rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:border-[#00ff88] focus:outline-none appearance-none">
              <option value="standard">Standard</option>
              <option value="quantum">Quantum</option>
              <option value="neural">Neural</option>
              <option value="turbo">Turbo</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* API Keys */}
      <motion.div className="glass rounded-xl p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="font-heading font-bold text-white mb-4 flex items-center gap-2">
          <Key size={18} className="text-[#ff0080]" /> API Keys
        </h3>
        <div className="space-y-3">
          <div className="glass rounded-lg p-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-white font-mono">sk_live_8x7k...4f2a</p>
              <p className="text-[10px] text-[#556677] font-mono">Created: 2026-05-01 • Last used: 2 hours ago</p>
            </div>
            <span className="bg-[#00ff88]/10 text-[#00ff88] px-2 py-0.5 rounded text-[10px] font-mono">ACTIVE</span>
          </div>
          <button className="w-full glass border border-[#ff0080]/30 rounded-lg px-4 py-2.5 text-sm font-heading text-[#ff0080] hover:border-[#ff0080] transition-all">
            + Generate New API Key
          </button>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="cyber-btn px-8 py-3 rounded-lg font-heading font-bold">Save Changes</button>
      </div>
    </div>
  );
}
