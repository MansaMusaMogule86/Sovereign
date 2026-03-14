
import React, { useState } from 'react';
import { UserProgress } from '../types';
import { getSmartRoutingAdvice } from '../geminiService';

interface AlchemistPageProps {
  user: UserProgress;
}

const AlchemistPage: React.FC<AlchemistPageProps> = ({ user }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleForge = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const data = await getSmartRoutingAdvice(url);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black font-cinzel text-[#FFD700] mb-4 tracking-widest uppercase">The Alchemist</h2>
        <p className="text-gray-400 uppercase tracking-widest text-xs">Forge Golden Bridges. Transmute regular links into high-commission conduits.</p>
      </div>

      <div className="glass-morphism p-12 relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-50"></div>
        
        <div className="w-full mb-12">
          <label className="text-[10px] text-[#FFD700] uppercase tracking-widest font-bold mb-4 block text-center">Drop Product URL into the Crucible</label>
          <div className="relative">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://amazon.ae/mysterious-luxury-watch..."
              className="w-full bg-black/40 border border-[#FFD700]/30 p-5 rounded-sm text-white focus:outline-none focus:border-[#FFD700] transition-all font-light text-center text-lg"
            />
          </div>
        </div>

        <button 
          onClick={handleForge}
          disabled={loading}
          className="bg-[#FFD700] text-black px-16 py-4 rounded-sm font-black uppercase tracking-[0.3em] hover:bg-[#FFE44D] transition-all disabled:opacity-50"
        >
          {loading ? 'Transmuting...' : 'Strike The Anvil'}
        </button>

        {result && (
          <div className="mt-16 w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center">
               <p className="text-[#FFD700] font-cinzel text-xl uppercase tracking-widest">Paths Manifested</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.paths?.map((path: any, idx: number) => (
                <div key={idx} className="glass-morphism p-6 border-l-4 border-l-[#FFD700]/40 group hover:border-l-[#FFD700] transition-all">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">{path.name}</span>
                  <p className="text-sm font-bold text-white mb-1">{path.network}</p>
                  <p className="text-2xl font-black text-[#FFD700] mb-4">{path.commission}</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed mb-6">{path.description}</p>
                  <button className="w-full py-2 border border-[#FFD700]/20 text-[10px] font-bold uppercase tracking-widest text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all">
                    Forge Link
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 p-6 glass-morphism border-dashed border-[#FFD700]/20">
         <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center text-[#FFD700]">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-[#FFD700] uppercase tracking-wider">Alchemy Wisdom</p>
              <p className="text-[10px] text-gray-400">The "Golden Bridge" paths are exclusive direct deals negotiated by the Sovereign AI. They skip all maze walls and yield maximum Gold Dust.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AlchemistPage;
