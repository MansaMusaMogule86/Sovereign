
export enum NicheGate {
  Beauty = 'Beauty',
  Tech = 'Tech',
  Fashion_Luxury = 'Fashion Luxury',
  Fitness = 'Fitness',
  Home_Decor = 'Home Decor',
  Gaming = 'Gaming'
}

export enum Floor {
  Basement = 'Basement',
  Ground = 'Ground',
  Upper = 'Upper',
  Roof = 'Roof'
}

export enum Tier {
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold',
  Platinum = 'Platinum'
}

export interface MinotaurChallenge {
  id: string;
  brand: string;
  niche: NicheGate;
  difficulty: number; // 1-10
  rewardGold: number;
  rewardAuthority: number;
  task: string;
  status: 'available' | 'active' | 'completed' | 'failed';
}

export interface UserProgress {
  niche: NicheGate | null;
  floor: Floor;
  tier: Tier;
  goldDust: number;
  authorityScore: number;
  earningsAED: number;
  isCategoryCaptain: boolean;
  activeChallenges: string[]; // IDs of challenges
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
