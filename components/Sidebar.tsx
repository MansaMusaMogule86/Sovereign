
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProgress } from '../types';

interface SidebarProps {
  user: UserProgress;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Labyrinth Map', path: '/dashboard', icon: 'M' },
    { label: 'The Alchemist', path: '/alchemist', icon: 'A' },
    { label: 'The Bazaar', path: '/bazaar', icon: 'B' },
    { label: 'The Colosseum', path: '/colosseum', icon: 'C' },
    { label: 'The Treasury', path: '/treasury', icon: 'T' },
    { label: 'Observatory', path: '/observatory', icon: 'O' },
  ];

  return (
    <aside className="w-64 glass-morphism border-r border-[#FFD700]/20 flex flex-col z-40">
      <div className="p-6 border-b border-[#FFD700]/10 flex items-center space-x-2">
        <div className="w-6 h-6 border border-[#FFD700] rotate-45 flex items-center justify-center">
          <div className="w-2 h-2 bg-[#FFD700]"></div>
        </div>
        <span className="font-cinzel text-xl text-[#FFD700] tracking-widest">SOVEREIGN</span>
      </div>

      <div className="flex-1 py-8 flex flex-col space-y-2">
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`px-8 py-3 flex items-center space-x-4 transition-all ${
              location.pathname === item.path 
                ? 'bg-[#FFD700]/10 text-[#FFD700] border-r-2 border-[#FFD700]' 
                : 'text-gray-400 hover:text-[#FFD700] hover:bg-[#FFD700]/5'
            }`}
          >
            <span className="w-6 text-center font-cinzel font-bold">{item.icon}</span>
            <span className="text-sm font-medium tracking-wider uppercase">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-6 border-t border-[#FFD700]/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF4D00] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#0A0A0F] flex items-center justify-center">
              <span className="text-[#FFD700] font-cinzel text-xs">SV</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Tier: {user.tier}</p>
            <p className="text-sm font-cinzel text-[#FFD700]">{user.niche}</p>
          </div>
        </div>
        <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
          <div 
            className="bg-[#FFD700] h-full" 
            style={{ width: `${user.authorityScore}%` }}
          ></div>
        </div>
        <p className="text-[10px] text-center mt-1 text-[#FFD700]">AUTHORITY: {user.authorityScore}%</p>
      </div>
    </aside>
  );
};

export default Sidebar;
