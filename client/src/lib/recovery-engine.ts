// ============================================================
// SOVEREIGN Recovery Engine - Core Simulation Logic
// Simulates PRNG-based key generation and address checking
// ============================================================

import { BLOCKCHAINS, BITCOIN_VERSIONS, AI_MODELS } from "./constants";

// Simulated PRNG (Mersenne Twister style)
class SimulatedPRNG {
  private state: number;
  
  constructor(seed: number) {
    this.state = seed;
  }

  next(): number {
    this.state ^= this.state << 13;
    this.state ^= this.state >> 17;
    this.state ^= this.state << 5;
    return Math.abs(this.state) / 2147483647;
  }

  nextBytes(count: number): number[] {
    return Array.from({ length: count }, () => Math.floor(this.next() * 256));
  }
}

// Generate simulated private key from PID
function generatePrivateKey(pid: number, version: string): string {
  const prng = new SimulatedPRNG(pid * 31337 + version.charCodeAt(0));
  const bytes = prng.nextBytes(32);
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Generate simulated Bitcoin address from private key
function privateKeyToAddress(privateKey: string, chain: string): string {
  const prefixes: Record<string, string[]> = {
    btc: ["1", "3", "bc1q"],
    eth: ["0x"],
    ltc: ["L", "M", "ltc1"],
    doge: ["D"],
    bch: ["bitcoincash:q"],
    xmr: ["4"],
    dash: ["X"],
    zcash: ["t1", "t3"],
  };

  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const prefix = prefixes[chain]?.[0] || "1";
  
  // Generate deterministic address from private key
  let hash = 0;
  for (let i = 0; i < privateKey.length; i++) {
    hash = ((hash << 5) - hash) + privateKey.charCodeAt(i);
    hash |= 0;
  }

  let address = prefix;
  const length = chain === "eth" ? 40 : chain === "btc" ? 33 : 34;
  
  for (let i = 0; i < length - prefix.length; i++) {
    hash = ((hash << 5) - hash) + i;
    hash |= 0;
    if (chain === "eth") {
      address += "0123456789abcdef"[Math.abs(hash) % 16];
    } else {
      address += chars[Math.abs(hash) % chars.length];
    }
  }

  return address;
}

// Check if address has balance (simulated)
function checkBalance(address: string, pid: number): { hasBalance: boolean; balance: string; usd: string } {
  // Simulate ~2% hit rate for demo
  const hash = address.split('').reduce((acc, c) => ((acc << 5) - acc) + c.charCodeAt(0), 0);
  const hasBalance = Math.abs(hash % 50) === 0 || (pid > 1200 && pid < 1250 && Math.abs(hash % 5) === 0);
  
  if (!hasBalance) return { hasBalance: false, balance: "0", usd: "$0" };

  const balanceBtc = (Math.abs(hash % 10000) / 10000) * 2;
  const btcPrice = 66600;
  const usdValue = balanceBtc * btcPrice;

  return {
    hasBalance: true,
    balance: balanceBtc.toFixed(8),
    usd: `$${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  };
}

// Address types
function getAddressType(address: string): string {
  if (address.startsWith("bc1")) return "Bech32";
  if (address.startsWith("3") || address.startsWith("M")) return "P2SH";
  if (address.startsWith("0x")) return "EOA";
  return "P2PKH";
}

export interface RecoveryResult {
  pid: number;
  privateKey: string;
  address: string;
  type: string;
  chain: string;
  balance: string;
  usd: string;
  timestamp: number;
}

export interface RecoveryConfig {
  mode: string;
  chains: string[];
  aiModel: string;
  btcVersion: string;
  pidStart: number;
  pidEnd: number;
  keysPerPid: number;
}

export interface RecoveryProgress {
  currentPid: number;
  totalPids: number;
  keysChecked: number;
  addressesFound: number;
  totalBalance: number;
  results: RecoveryResult[];
  feedMessages: { time: string; msg: string; type: string }[];
  isComplete: boolean;
}

// Main recovery engine
export function* runRecovery(config: RecoveryConfig): Generator<RecoveryProgress> {
  const { chains, btcVersion, pidStart, pidEnd, keysPerPid } = config;
  const totalPids = pidEnd - pidStart + 1;
  let keysChecked = 0;
  let totalBalance = 0;
  const results: RecoveryResult[] = [];
  const feedMessages: { time: string; msg: string; type: string }[] = [];

  const getTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  };

  for (let pid = pidStart; pid <= pidEnd; pid++) {
    feedMessages.push({ time: getTime(), msg: `Generating keys for PID ${pid}...`, type: "info" });

    for (let keyIdx = 0; keyIdx < keysPerPid; keyIdx++) {
      for (const chain of chains) {
        const privateKey = generatePrivateKey(pid * keysPerPid + keyIdx, btcVersion);
        const address = privateKeyToAddress(privateKey, chain);
        const { hasBalance, balance, usd } = checkBalance(address, pid);
        keysChecked++;

        if (hasBalance) {
          const result: RecoveryResult = {
            pid,
            privateKey,
            address,
            type: getAddressType(address),
            chain: chain.toUpperCase(),
            balance,
            usd,
            timestamp: Date.now(),
          };
          results.push(result);
          totalBalance += parseFloat(usd.replace(/[$,]/g, ''));
          feedMessages.push({ time: getTime(), msg: `BALANCE FOUND: ${balance} ${chain.toUpperCase()} (${usd})`, type: "success" });
        }
      }
    }

    // Apply mode-specific effects
    if (config.mode === "quantum" && pid % 10 === 0) {
      feedMessages.push({ time: getTime(), msg: `Quantum optimization applied to PID range ${pid}-${pid + 10}`, type: "quantum" });
    }
    if (config.mode === "neural" && pid % 15 === 0) {
      feedMessages.push({ time: getTime(), msg: `Neural pattern match detected - high probability zone`, type: "ai" });
    }

    yield {
      currentPid: pid - pidStart + 1,
      totalPids,
      keysChecked,
      addressesFound: results.length,
      totalBalance,
      results,
      feedMessages: feedMessages.slice(-20),
      isComplete: pid === pidEnd,
    };
  }
}

// Quick recovery preset
export function getQuickRecoveryConfig(): RecoveryConfig {
  return {
    mode: "quantum",
    chains: ["btc"],
    aiModel: "quantum",
    btcVersion: "0.3.24",
    pidStart: 1000,
    pidEnd: 2000,
    keysPerPid: 10,
  };
}
