
import React, { useState } from 'react';
import { UserProgress, MinotaurChallenge, NicheGate } from '../types';

interface ColosseumPageProps {
  user: UserProgress;
  challenges: MinotaurChallenge[];
  onAccept: (id: string) => void;
  onCreate: (challenge: Omit<MinotaurChallenge, 'id' | 'status'>) => void;
}

const ColosseumPage: React.FC<ColosseumPageProps> = ({ user, challenges, onAccept, onCreate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    task: '',
    niche: NicheGate.Beauty,
    difficulty: 5,
    rewardGold: 1000,
    rewardAuthority: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      ...formData,
      difficulty: Number(formData.difficulty),
      rewardGold: Number(formData.rewardGold),
      rewardAuthority: Number(formData.rewardAuthority)
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowCreateForm(false);
    }, 3000);

    setFormData({
      brand: '',
      task: '',
      niche: NicheGate.Beauty,
      difficulty: 5,
      rewardGold: 1000,
      rewardAuthority: 5
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        <h2 className="relative z-10 text-5xl font-black font-cinzel text-red-600 mb-4 tracking-[0.3em] uppercase bg-[#0A0A0F] inline-block px-12 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
          The Colosseum
        </h2>
        <p className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold">
          Brands release the beast. Only the worthy survive.
        </p>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className={`px-10 py-4 font-black font-cinzel uppercase tracking-[0.2em] text-sm border transition-all duration-500 relative group overflow-hidden ${
            showCreateForm 
              ? 'bg-red-600 text-white border-red-600' 
              : 'text-red-500 border-red-900 hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]'
          }`}
        >
          <span className="relative z-10">{showCreateForm ? 'Abort Rite' : 'Release A Minotaur'}</span>
          {!showCreateForm && (
            <div className="absolute inset-0 bg-red-600/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
          )}
        </button>
      </div>

      {showCreateForm && (
        <div className="glass-morphism p-10 border border-red-900/50 shadow-[0_0_50px_rgba(220,38,38,0.1)] animate-in fade-in slide-in-from-top-4 duration-500 max-w-2xl mx-auto relative">
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-48 h-[2px] bg-red-600 shadow-[0_0_10px_#dc2626]"></div>
          
          {showSuccess ? (
            <div className="py-12 text-center space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-red-600/20 border border-red-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                <span className="text-4xl">🐂</span>
              </div>
              <h3 className="font-cinzel text-2xl text-red-500 uppercase tracking-widest">The Beast is Loose</h3>
              <p className="text-gray-400 text-sm italic">Your challenge has been etched into the Labyrinth's walls.</p>
            </div>
          ) : (
            <>
              <h3 className="font-cinzel text-2xl text-red-600 mb-8 uppercase tracking-widest text-center">Brand Portal: Release a Challenge</h3>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold block mb-2 tracking-widest">Mastermind Brand</label>
                  <input 
                    required
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                    className="w-full bg-black/60 border border-red-900/30 p-4 text-sm focus:border-red-500 outline-none transition-all placeholder:text-gray-800 text-white"
                    placeholder="The entity sponsoring this hunt..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] text-gray-500 uppercase font-bold block mb-2 tracking-widest">The Trial (Objective)</label>
                  <textarea 
                    required
                    value={formData.task}
                    onChange={(e) => setFormData({...formData, task: e.target.value})}
                    className="w-full bg-black/60 border border-red-900/30 p-4 text-sm focus:border-red-500 outline-none h-28 resize-none transition-all placeholder:text-gray-800 text-white"
                    placeholder="Describe the impossible feat influencers must perform..."
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold block mb-2 tracking-widest">Target Corridor</label>
                  <select 
                    value={formData.niche}
                    onChange={(e) => setFormData({...formData, niche: e.target.value as NicheGate})}
                    className="w-full bg-black/60 border border-red-900/30 p-4 text-sm focus:border-red-500 outline-none text-gray-400 appearance-none cursor-pointer"
                  >
                    {Object.values(NicheGate).map(n => <option key={n} value={n} className="bg-[#0A0A0F]">{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold block mb-2 tracking-widest">Menace Level ({formData.difficulty})</label>
                  <input 
                    type="range" min="1" max="10"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: Number(e.target.value)})}
                    className="w-full h-1.5 bg-red-900/30 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-[9px] text-gray-600 mt-2 font-black uppercase tracking-tighter">
                    <span>Nuisance</span>
                    <span>Cataclysm</span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold block mb-2 tracking-widest">Gold Dust Spoils</label>
                  <input 
                    type="number"
                    min="0"
                    value={formData.rewardGold}
                    onChange={(e) => setFormData({...formData, rewardGold: Number(e.target.value)})}
                    className="w-full bg-black/60 border border-red-900/30 p-4 text-sm focus:border-red-500 outline-none transition-all text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold block mb-2 tracking-widest">Authority Surge</label>
                  <input 
                    type="number"
                    min="0"
                    max="100"
                    value={formData.rewardAuthority}
                    onChange={(e) => setFormData({...formData, rewardAuthority: Number(e.target.value)})}
                    className="w-full bg-black/60 border border-red-900/30 p-4 text-sm focus:border-red-500 outline-none transition-all text-white"
                  />
                </div>
                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-red-600 text-white py-5 font-black font-cinzel uppercase tracking-[0.3em] text-sm hover:bg-red-500 shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all hover:scale-[1.01]"
                  >
                    Release The Beast
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.filter(c => c.status === 'available').map((challenge) => (
          <div 
            key={challenge.id} 
            className={`relative p-8 transition-all duration-700 group overflow-hidden ${
              challenge.niche === user.niche 
                ? 'glass-morphism border-red-600/40 bg-red-950/5 hover:border-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.2)]' 
                : 'glass-morphism border-white/5 opacity-40 grayscale blur-[1px]'
            } border-2`}
          >
            {/* Background Texture/Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]"></span>
                  <span className="text-[10px] text-red-500 font-black tracking-[0.2em] uppercase">Minotaur Challenge</span>
                </div>
                <h3 className="text-3xl font-cinzel font-black text-white group-hover:text-red-500 transition-colors tracking-tighter uppercase italic">
                  {challenge.brand}
                </h3>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-2">Severity</p>
                <div className="flex space-x-0.5 mt-1 justify-end">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-4 transition-all duration-500 ${
                        i < challenge.difficulty 
                          ? 'bg-red-600 shadow-[0_0_5px_#dc2626]' 
                          : 'bg-white/5'
                      }`}
                    ></div>
                  ))}
                </div>
                {challenge.difficulty >= 8 && (
                   <div className="mt-2 text-red-600 flex justify-end space-x-1">
                      <span className="text-xs animate-pulse">💀</span>
                      <span className="text-xs animate-pulse delay-75">💀</span>
                      <span className="text-xs animate-pulse delay-150">💀</span>
                   </div>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-10 relative z-10">
              <div>
                <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black mb-3 flex items-center">
                  <span className="mr-2">The Riddle</span>
                  <div className="h-px flex-1 bg-red-900/20"></div>
                </p>
                <p className="text-sm text-gray-300 leading-relaxed font-light italic bg-red-950/10 p-4 border-l-2 border-red-600/30 group-hover:border-red-500 transition-colors">
                  "{challenge.task}"
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 border border-red-900/20 relative group-hover:border-red-900/40">
                  <p className="text-[8px] text-gray-600 uppercase font-black mb-1 tracking-widest">Gold Bounty</p>
                  <p className="text-2xl font-cinzel font-black text-[#FFD700] tracking-tighter">+{challenge.rewardGold}</p>
                </div>
                <div className="bg-black/40 p-4 border border-red-900/20 relative group-hover:border-red-900/40">
                  <p className="text-[8px] text-gray-600 uppercase font-black mb-1 tracking-widest">Auth Surge</p>
                  <p className="text-2xl font-cinzel font-black text-blue-400 tracking-tighter">+{challenge.rewardAuthority}</p>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              {challenge.niche === user.niche ? (
                <button 
                  onClick={() => onAccept(challenge.id)}
                  className="w-full bg-transparent border-2 border-red-600 text-red-500 py-4 font-black font-cinzel uppercase tracking-[0.3em] text-xs hover:bg-red-600 hover:text-white transition-all duration-300 relative group/btn overflow-hidden"
                >
                  <span className="relative z-10">Accept Fate</span>
                  <div className="absolute inset-0 bg-red-600 -translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </button>
              ) : (
                <div className="w-full bg-white/5 text-gray-700 py-4 font-black font-cinzel uppercase tracking-[0.3em] text-[10px] text-center border border-white/5 cursor-not-allowed">
                  Forbidden Corridor
                </div>
              )}
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute bottom-2 right-3 opacity-10 text-red-600 text-4xl font-cinzel pointer-events-none group-hover:opacity-20 transition-opacity">
               {challenge.difficulty >= 8 ? '☠️' : '🐂'}
            </div>
            
            <p className="text-[9px] text-gray-600 mt-5 text-center uppercase tracking-widest font-bold">
              Restricted To {challenge.niche.toUpperCase()} Specialists
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-10 glass-morphism border border-red-950/50 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-3xl -z-10 rounded-full"></div>
         <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            <div className="w-24 h-24 rounded-full border-4 border-red-600/20 flex items-center justify-center text-red-600 shrink-0 relative">
               <span className="text-5xl animate-pulse">💀</span>
               <div className="absolute inset-0 rounded-full border-2 border-red-600 animate-ping opacity-20"></div>
            </div>
            <div>
              <p className="text-xl font-cinzel font-black text-red-600 uppercase tracking-widest mb-3">Arena Doctrine</p>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Minotaur Challenges are the ultimate test of authority. By accepting, you invoke a physical presence in your dashboard. To claim the bounty, you must not only complete the brand's metrics but face the beast in a trial of niche-specific wisdom. Failure results in immediate expulsion to the Basement corridors.
              </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ColosseumPage;
