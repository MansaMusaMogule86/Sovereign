// ============================================================
// Addresses Page - SOVEREIGN
// Design: All recovered addresses with export
// ============================================================
import { motion } from "framer-motion";
import { Wallet, Copy, ExternalLink, Download } from "lucide-react";

const addresses = [
  { address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", type: "P2PKH", chain: "BTC", balance: "1.23456789", usd: "$82,234.56", session: "BTC 0.3.24 Full Scan", claimed: false },
  { address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2", type: "P2PKH", chain: "BTC", balance: "0.15670000", usd: "$10,432.10", session: "BTC 0.3.24 Full Scan", claimed: true },
  { address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy", type: "P2SH", chain: "BTC", balance: "0.00089200", usd: "$59.41", session: "Dark Web Intel Scan", claimed: false },
  { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD28", type: "EOA", chain: "ETH", balance: "2.45000000", usd: "$4,521.00", session: "ETH Legacy Wallets", claimed: false },
  { address: "LQB2bZJvC4oGvf4dZGMjJrYzg8gR2cLfQy", type: "P2PKH", chain: "LTC", balance: "15.00000000", usd: "$1,245.00", session: "Rainbow Table Attack", claimed: true },
  { address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq", type: "Bech32", chain: "BTC", balance: "0.05432100", usd: "$3,617.89", session: "Time Machine 2010", claimed: false },
  { address: "1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp", type: "P2PKH", chain: "BTC", balance: "0.00123400", usd: "$82.18", session: "Alien Mode Test", claimed: false },
  { address: "DRSqEwcnJX3GZWH9Twtwk8D5ewqdJzi13k", type: "P2PKH", chain: "DOGE", balance: "50000.00", usd: "$7,500.00", session: "Multi-chain Sweep", claimed: false },
];

export default function Addresses() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <Wallet className="text-[#ffaa00]" /> Recovered Addresses
          </h1>
          <p className="text-[#00d4ff]/50 font-mono text-xs mt-1">{addresses.length} addresses found across all sessions</p>
        </div>
        <button className="cyber-btn px-4 py-2 rounded-lg text-sm font-heading flex items-center gap-2">
          <Download size={14} /> Export All CSV
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-lg p-4 text-center neon-border">
          <p className="text-2xl font-display font-bold text-[#00ff88]">$109,691</p>
          <p className="text-[10px] text-[#556677] font-mono">Total Value</p>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <p className="text-2xl font-display font-bold text-[#00d4ff]">{addresses.length}</p>
          <p className="text-[10px] text-[#556677] font-mono">Total Addresses</p>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <p className="text-2xl font-display font-bold text-[#ffaa00]">5</p>
          <p className="text-[10px] text-[#556677] font-mono">Blockchains</p>
        </div>
      </div>

      {/* Table */}
      <motion.div className="glass rounded-xl p-6 overflow-x-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#00ff88]/10">
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Address</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Type</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Chain</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Balance</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">USD</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Session</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Status</th>
              <th className="text-left py-3 text-[#556677] font-mono text-xs">Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addr, i) => (
              <motion.tr
                key={i}
                className="border-b border-[#00ff88]/5 hover:bg-[#00ff88]/5 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <td className="py-3 font-mono text-xs text-[#00d4ff]">
                  {addr.address.slice(0, 10)}...{addr.address.slice(-6)}
                </td>
                <td className="py-3 text-xs text-[#8899aa]">{addr.type}</td>
                <td className="py-3 text-xs text-[#ffaa00] font-mono">{addr.chain}</td>
                <td className="py-3 font-mono text-xs text-white">{addr.balance}</td>
                <td className="py-3 font-mono text-xs text-[#00ff88] font-bold">{addr.usd}</td>
                <td className="py-3 text-xs text-[#556677]">{addr.session}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                    addr.claimed ? "bg-[#00ff88]/10 text-[#00ff88]" : "bg-[#ffaa00]/10 text-[#ffaa00]"
                  }`}>
                    {addr.claimed ? "Claimed" : "Unclaimed"}
                  </span>
                </td>
                <td className="py-3 flex gap-2">
                  <button className="text-[#556677] hover:text-[#00d4ff]"><Copy size={12} /></button>
                  <button className="text-[#556677] hover:text-[#00d4ff]"><ExternalLink size={12} /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
