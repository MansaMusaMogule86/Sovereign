
import React, { useState } from 'react';
import { NicheGate } from '../types';

interface GateSelectionProps {
  onSelect: (niche: NicheGate) => void;
}

const GateSelection: React.FC<GateSelectionProps> = ({ onSelect }) => {
  const [hoveredGate, setHoveredGate] = useState<NicheGate | null>(null);

  const gates = [
    { type: NicheGate.Beauty, color: 'from-[#FF6B9D] to-[#FFD700]', description: 'Glow, cosmetic mastery, and vanity empires.' },
    { type: NicheGate.Tech, color: 'from-[#00D9FF] to-[#FFD700]', description: 'Circuitry, gadgets, and the digital frontier.' },
    { type: NicheGate.Fashion_Luxury, color: 'from-[#FFD700] to-[#FFFFFF]', description: 'Elegance, high-ticket signatures, and prestige.' },
    { type: NicheGate.Fitness, color: 'from-[#FF4D00] to-[#FFD700]', description: 'Endurance, supplements, and physical peak.' },
    { type: NicheGate.Home_Decor, color: 'from-[#6BFF9D] to-[#FFD700]', description: 'Sanctuary design and aesthetic environments.' },
    { type: NicheGate.Gaming, color: 'from-[#8A2BE2] to-[#FFD700]', description: 'Hardware, virtual glory, and streaming legends.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center relative px-6 py-20 overflow-hidden">
      <div className="text-center z-10 max-w-3xl mb-16">
        <h2 className="text-5xl font-black font-cinzel text-white mb-4 tracking-wider">CHOOSE YOUR ENTRANCE</h2>
        <p className="text-gray-400 text-lg">Pick ONE gate. The walls will seal behind you for 90 days. Only the committed reach the Crown.</p>
        <p className="text-red-500 font-bold uppercase tracking-widest text-xs mt-4 animate-pulse">
          Warning: Generalists become lost souls in the Basement. Specialists rise to the Roof.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl z-10">
        {gates.map((gate) => (
          <div 
            key={gate.type}
            onMouseEnter={() => setHoveredGate(gate.type)}
            onMouseLeave={() => setHoveredGate(null)}
            onClick={() => onSelect(gate.type)}
            className={`relative p-8 glass-morphism cursor-pointer group transition-all duration-500 hover:scale-105 border-t-4 border-t-transparent hover:border-t-[#FFD700]`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${gate.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
            <div className="relative">
              <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 block mb-2">Gate {gate.type.split(' ')[0]}</span>
              <h3 className="text-2xl font-cinzel font-bold text-[#FFD700] mb-4">{gate.type}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">{gate.description}</p>
              
              <div className="w-full h-[1px] bg-white/10 relative">
                <div className={`absolute inset-y-0 left-0 bg-[#FFD700] transition-all duration-700 ${hoveredGate === gate.type ? 'w-full' : 'w-0'}`}></div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs font-bold text-[#FFD700] uppercase tracking-widest">Seal My Fate →</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="w-full h-full rounded-full border border-[#FFD700]/10 scale-[1.5] animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border border-[#FFD700]/20 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default GateSelection;
