
import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onLogin: () => void;
  isAuthenticated: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, isAuthenticated }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass-morphism border-b border-[#FFD700]/20 flex items-center justify-between px-8">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 border-2 border-[#FFD700] flex items-center justify-center rotate-45">
          <div className="w-4 h-4 bg-[#FFD700]"></div>
        </div>
        <span className="text-2xl font-bold tracking-widest text-[#FFD700] font-cinzel">SOVEREIGN</span>
      </div>
      
      <div className="hidden md:flex space-x-8">
        <a href="#labyrinth" className="text-sm font-medium text-gray-400 hover:text-[#FFD700] transition-colors uppercase tracking-wider">The Labyrinth</a>
        <a href="#networks" className="text-sm font-medium text-gray-400 hover:text-[#FFD700] transition-colors uppercase tracking-wider">Networks</a>
      </div>

      <div>
        {!isAuthenticated ? (
          <button 
            onClick={onLogin}
            className="bg-[#FFD700] text-black px-6 py-2 rounded-sm font-bold text-sm hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all uppercase tracking-wider"
          >
            Enter The Maze
          </button>
        ) : (
          <Link to="/gate" className="text-[#FFD700] font-cinzel tracking-widest uppercase">The Gate</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
