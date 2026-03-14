
import React, { useState } from 'react';
import { UserProgress } from '../types';
import { motion } from 'motion/react';

interface BazaarItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'powerup' | 'vanity' | 'deal';
  icon: string;
}

const BAZAAR_ITEMS: BazaarItem[] = [
  { id: '1', name: 'Golden Compass', description: 'Reveals the Minotaur\'s location for 24h.', cost: 500, type: 'powerup', icon: '🧭' },
  { id: '2', name: 'Ambrosia', description: 'Instantly boosts Authority by 2 points.', cost: 1200, type: 'powerup', icon: '🍷' },
  { id: '3', name: 'Royal Cape', description: 'A visual flair for your avatar in the Labyrinth.', cost: 2500, type: 'vanity', icon: '🧥' },
  { id: '4', name: 'Direct Line: Nike', description: 'Unlock a 15% commission rate for 7 days.', cost: 5000, type: 'deal', icon: '👟' },
  { id: '5', name: 'Shadow Step', description: 'Avoid one Minotaur encounter without penalty.', cost: 800, type: 'powerup', icon: '👣' },
  { id: '6', name: 'Merchant\'s Favor', description: 'Reduces Alchemist fees by 50% for 48h.', cost: 1500, type: 'powerup', icon: '🤝' },
];

const BazaarPage: React.FC<{ user: UserProgress }> = ({ user }) => {
  const [purchased, setPurchased] = useState<string[]>([]);

  const handlePurchase = (item: BazaarItem) => {
    if (user.goldDust >= item.cost) {
      setPurchased(prev => [...prev, item.id]);
      // playSound(1000, 'sine', 0.2, 0.1); // Assuming playSound is available or just alert
      alert(`You have acquired the ${item.name}!`);
    } else {
      alert("Insufficient Gold Dust. Defeat more Minotaurs!");
    }
  };

  return (
    <div className="p-8 space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-center md:items-end border-b border-[#FFD700]/20 pb-8 gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(255,215,0,0.1)]">
            👳‍♂️
          </div>
          <div>
            <h2 className="font-cinzel text-4xl text-[#FFD700] tracking-widest uppercase">The Bazaar</h2>
            <p className="text-gray-500 text-sm mt-1 italic">"Welcome, Wanderer. My artifacts are forged in the fires of the deep corridors."</p>
          </div>
        </div>
        <div className="glass-morphism px-8 py-4 text-center md:text-right border-[#FFD700]/40">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-black">Your Wealth</p>
          <p className="text-3xl font-cinzel text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">{user.goldDust} <span className="text-xs">GOLD DUST</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BAZAAR_ITEMS.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-morphism p-6 flex flex-col group relative overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FFD700]/5 rounded-full blur-2xl group-hover:bg-[#FFD700]/10 transition-all"></div>
            
            <div className="flex justify-between items-start mb-4">
              <span className="text-4xl">{item.icon}</span>
              <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-tighter font-bold border ${
                item.type === 'powerup' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                item.type === 'vanity' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {item.type}
              </span>
            </div>

            <h3 className="font-cinzel text-lg text-white mb-2">{item.name}</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-1">{item.description}</p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-1">
                <span className="text-[#FFD700] font-cinzel font-bold">{item.cost}</span>
                <span className="text-[10px] text-gray-500 uppercase">Dust</span>
              </div>
              <button 
                onClick={() => handlePurchase(item)}
                disabled={purchased.includes(item.id)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                  purchased.includes(item.id) 
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-[#FFD700] text-black hover:bg-white'
                }`}
              >
                {purchased.includes(item.id) ? 'Acquired' : 'Acquire'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-morphism p-8 border-dashed border-[#FFD700]/30 text-center">
        <p className="text-gray-500 font-cinzel text-sm tracking-widest uppercase">More artifacts arriving with the next moon...</p>
      </div>
    </div>
  );
};

export default BazaarPage;
