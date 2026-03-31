
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NicheGate, Floor, Tier, UserProgress, MinotaurChallenge } from './types';
import LandingPage from './pages/LandingPage';
import GateSelection from './pages/GateSelection';
import LabyrinthDashboard from './pages/LabyrinthDashboard';
import AlchemistPage from './pages/AlchemistPage';
import TreasuryPage from './pages/TreasuryPage';
import ColosseumPage from './pages/ColosseumPage';
import BazaarPage from './pages/BazaarPage';
import ObservatoryPage from './pages/ObservatoryPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const MOCK_CHALLENGES: MinotaurChallenge[] = [
  { id: '1', brand: 'Dior', niche: NicheGate.Fashion_Luxury, difficulty: 7, rewardGold: 1500, rewardAuthority: 5, task: 'Reach 50 sales in high-ticket luxury items within 48h', status: 'available' },
  { id: '2', brand: 'Razer', niche: NicheGate.Gaming, difficulty: 4, rewardGold: 800, rewardAuthority: 3, task: 'Generate 1000 clicks via Dark Social platforms', status: 'available' },
  { id: '3', brand: 'Sephora', niche: NicheGate.Beauty, difficulty: 6, rewardGold: 1200, rewardAuthority: 4, task: 'Maintain 5% conversion rate on Beauty corridor for 7 days', status: 'available' },
];

const App: React.FC = () => {
  const [user, setUser] = useState<UserProgress>({
    niche: null,
    floor: Floor.Basement,
    tier: Tier.Bronze,
    goldDust: 1250,
    authorityScore: 15,
    earningsAED: 450.75,
    isCategoryCaptain: false,
    activeChallenges: []
  });

  const [challenges, setChallenges] = useState<MinotaurChallenge[]>(MOCK_CHALLENGES);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNicheSelection = (niche: NicheGate) => {
    setUser(prev => ({ ...prev, niche }));
  };

  const handleAcceptChallenge = (id: string) => {
    setUser(prev => ({ ...prev, activeChallenges: [...prev.activeChallenges, id] }));
    // Set expiration to 5 minutes from now for demo purposes
    setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'active', expiresAt: Date.now() + 300000 } : c));
  };

  const handleCreateChallenge = (newChallenge: Omit<MinotaurChallenge, 'id' | 'status'>) => {
    const challenge: MinotaurChallenge = {
      ...newChallenge,
      id: Math.random().toString(36).slice(2, 11),
      status: 'available'
    };
    setChallenges(prev => [challenge, ...prev]);
  };

  const handleFailChallenge = (id: string) => {
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
      setUser(prev => ({
        ...prev,
        authorityScore: Math.max(0, prev.authorityScore - 2),
        activeChallenges: prev.activeChallenges.filter(cid => cid !== id)
      }));
      setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'failed' } : c));
    }
  };

  const handleCompleteChallenge = (id: string) => {
    const challenge = challenges.find(c => c.id === id);
    if (challenge) {
      setUser(prev => ({
        ...prev,
        goldDust: prev.goldDust + challenge.rewardGold,
        authorityScore: Math.min(100, prev.authorityScore + challenge.rewardAuthority),
        activeChallenges: prev.activeChallenges.filter(cid => cid !== id)
      }));
      setChallenges(prev => prev.map(c => c.id === id ? { ...c, status: 'completed' } : c));
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0A0A0F] text-[#FAFAFA] flex">
        {isAuthenticated && user.niche && <Sidebar user={user} />}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {!user.niche && <Navbar onLogin={handleLogin} isAuthenticated={isAuthenticated} />}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={
                isAuthenticated ? <Navigate to="/gate" /> : <LandingPage onEnter={handleLogin} />
              } />
              <Route path="/gate" element={
                isAuthenticated ? (
                  user.niche ? <Navigate to="/dashboard" /> : <GateSelection onSelect={handleNicheSelection} />
                ) : <Navigate to="/" />
              } />
              <Route path="/dashboard" element={
                isAuthenticated && user.niche ? (
                  <LabyrinthDashboard 
                    user={user} 
                    challenges={challenges.filter(c => user.activeChallenges.includes(c.id))} 
                    onComplete={handleCompleteChallenge}
                    onFail={handleFailChallenge}
                  />
                ) : <Navigate to="/" />
              } />
              <Route path="/alchemist" element={
                isAuthenticated && user.niche ? <AlchemistPage user={user} /> : <Navigate to="/" />
              } />
              <Route path="/treasury" element={
                isAuthenticated && user.niche ? <TreasuryPage user={user} /> : <Navigate to="/" />
              } />
              <Route path="/colosseum" element={
                isAuthenticated && user.niche ? <ColosseumPage user={user} challenges={challenges} onAccept={handleAcceptChallenge} onCreate={handleCreateChallenge} /> : <Navigate to="/" />
              } />
              <Route path="/bazaar" element={
                isAuthenticated && user.niche ? <BazaarPage user={user} /> : <Navigate to="/" />
              } />
              <Route path="/observatory" element={
                isAuthenticated && user.niche ? <ObservatoryPage user={user} /> : <Navigate to="/" />
              } />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
