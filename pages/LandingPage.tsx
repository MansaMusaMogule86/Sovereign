
import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#FFD700" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-black text-white leading-tight mb-8 tracking-tighter font-cinzel">
          ESCAPE THE <br />
          <span className="text-[#FFD700] drop-shadow-[0_0_25px_rgba(255,215,0,0.5)]">FRAGMENTED</span> LABYRINTH
        </h1>
        
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          They trapped you in their warehouse maze with 5% commissions and 60-day delays. 
          <span className="text-[#FFD700] font-bold"> Sovereign</span> is the Master Key that unlocks every corridor—Direct, Network, Sub-Affiliate—all routes lead to your Crown.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button 
            onClick={onEnter}
            className="bg-[#FFD700] text-black px-12 py-5 rounded-sm font-black text-xl hover:bg-[#FFE44D] transition-all shadow-[0_0_50px_rgba(255,215,0,0.3)] uppercase tracking-widest group"
          >
            Enter The Maze
            <span className="ml-2 group-hover:translate-x-2 transition-transform inline-block">→</span>
          </button>
          
          <button className="text-white/60 hover:text-[#FFD700] px-8 py-5 font-bold uppercase tracking-widest text-sm border border-white/10 hover:border-[#FFD700]/40 transition-all">
            The Whitepaper
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black font-cinzel">10+</span>
            <span className="text-[10px] tracking-widest uppercase mt-2">Aggregated Networks</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black font-cinzel">INSTANT</span>
            <span className="text-[10px] tracking-widest uppercase mt-2">Crypto Payouts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black font-cinzel">AI</span>
            <span className="text-[10px] tracking-widest uppercase mt-2">Smart Routing</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black font-cinzel">90D</span>
            <span className="text-[10px] tracking-widest uppercase mt-2">Niche Monogamy</span>
          </div>
        </div>
      </div>

      {/* 3D Visual Element Placeholder */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-[#FFD700]/10 to-transparent blur-3xl -z-10 rounded-full"></div>
    </div>
  );
};

export default LandingPage;
