
import React from 'react';
import { UserProgress } from '../types';

interface TreasuryPageProps {
  user: UserProgress;
}

const TreasuryPage: React.FC<TreasuryPageProps> = ({ user }) => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-black font-cinzel text-[#FFD700] mb-4 tracking-widest uppercase">The Treasury</h2>
        <p className="text-gray-400 uppercase tracking-widest text-xs">The vault at the center of the labyrinth. Your spoils await.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Balance Vault */}
        <div className="glass-morphism p-12 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/5 to-transparent"></div>
          
          <div className="relative mb-8">
             <div className="w-32 h-32 border-4 border-dashed border-[#FFD700]/20 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl text-[#FFD700]">💰</span>
             </div>
          </div>

          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Claimable Spoils</p>
          <p className="text-5xl font-black font-cinzel text-white mb-12">AED {user.earningsAED.toFixed(2)}</p>

          <div className="grid grid-cols-2 gap-4 w-full">
             <button className="bg-[#FFD700] text-black py-4 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#FFE44D] transition-all flex flex-col items-center justify-center">
                <span>Instant Payout</span>
                <span className="text-[8px] mt-1 opacity-60">USDC POLYGON</span>
             </button>
             <button className="border border-[#FFD700]/40 text-[#FFD700] py-4 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-[#FFD700]/10 transition-all flex flex-col items-center justify-center">
                <span>Weekly Batch</span>
                <span className="text-[8px] mt-1 opacity-60">LOCAL BANK (UAE)</span>
             </button>
          </div>
        </div>

        {/* Ancient Ledger */}
        <div className="glass-morphism p-8 flex flex-col">
           <div className="flex justify-between items-center mb-8">
             <h3 className="font-cinzel text-[#FFD700] text-lg tracking-widest uppercase">The Ledger</h3>
             <span className="text-[10px] text-gray-500 uppercase tracking-widest">Page 1 of 12</span>
           </div>

           <div className="flex-1 space-y-4">
              {[
                { date: '2025-05-12', source: 'Amazon AE', amount: '+124.50', status: 'CONFIRMED' },
                { date: '2025-05-11', source: 'Noon.com', amount: '+45.20', status: 'CONFIRMED' },
                { date: '2025-05-11', source: 'Namshi', amount: '+281.05', status: 'PENDING' },
                { date: '2025-05-10', source: 'CJ Network', amount: '+0.00', status: 'CANCELLED' },
                { date: '2025-05-08', source: 'Direct Brand', amount: '+500.00', status: 'PROCESSING' },
              ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border-b border-[#FFD700]/10 last:border-0 hover:bg-white/5 transition-colors">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter mb-1">{tx.date}</p>
                    <p className="text-sm font-bold text-white uppercase">{tx.source}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black font-cinzel ${tx.amount.startsWith('+') ? 'text-[#FFD700]' : 'text-red-500'}`}>{tx.amount} AED</p>
                    <p className="text-[8px] font-bold text-gray-500 tracking-widest mt-1">{tx.status}</p>
                  </div>
                </div>
              ))}
           </div>

           <div className="mt-8 text-center">
              <button className="text-[10px] text-[#FFD700] uppercase tracking-widest font-bold border-b border-[#FFD700]/40 pb-1 hover:border-[#FFD700] transition-all">
                Unroll Full History
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TreasuryPage;
