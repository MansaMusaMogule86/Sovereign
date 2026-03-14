
import React, { useState, useEffect, useRef } from 'react';
import { UserProgress, Floor, MinotaurChallenge } from '../types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { getMinotaurChallengeLore } from '../geminiService';

interface LabyrinthDashboardProps {
  user: UserProgress;
  challenges: MinotaurChallenge[];
  onComplete: (id: string) => void;
}

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 200 },
  { name: 'Thu', value: 278 },
  { name: 'Fri', value: 189 },
  { name: 'Sat', value: 239 },
  { name: 'Sun', value: 349 },
];

const LabyrinthDashboard: React.FC<LabyrinthDashboardProps> = ({ user, challenges, onComplete }) => {
  const [minotaurPos, setMinotaurPos] = useState({ x: 20, y: 80 });
  const [userPos, setUserPos] = useState({ x: 50, y: 50 });
  const [distance, setDistance] = useState(100);
  const [proximityIntensity, setProximityIntensity] = useState(0);
  const [showRiddle, setShowRiddle] = useState<MinotaurChallenge | null>(null);
  const [riddleData, setRiddleData] = useState<any>(null);
  const [loadingRiddle, setLoadingRiddle] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [lastEncounterTime, setLastEncounterTime] = useState(0);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on first interaction
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  const playSound = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1, volume: number = 0.1) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const triggerHaptic = (pattern: number | number[]) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  // Minotaur stalking logic
  useEffect(() => {
    const interval = setInterval(() => {
      setMinotaurPos(prev => {
        const dx = userPos.x - prev.x;
        const dy = userPos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If user is within 30% range, stalk them
        if (dist < 30) {
          const speed = 2; // Stalking speed
          return {
            x: Math.max(5, Math.min(95, prev.x + (dx / dist) * speed)),
            y: Math.max(5, Math.min(95, prev.y + (dy / dist) * speed)),
          };
        }

        // Otherwise, random roam
        return {
          x: Math.max(10, Math.min(90, prev.x + (Math.random() - 0.5) * 15)),
          y: Math.max(10, Math.min(90, prev.y + (Math.random() - 0.5) * 15)),
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [userPos]);

  // Proximity detection and feedback
  useEffect(() => {
    const dx = minotaurPos.x - userPos.x;
    const dy = minotaurPos.y - userPos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    setDistance(dist);

    // Calculate intensity: 1 at distance 0, 0 at distance 35+
    const intensity = Math.max(0, 1 - (dist / 35));
    setProximityIntensity(intensity);

    if (showRiddle) return;

    const now = Date.now();

    // If distance is less than 6% and cooldown (8s) has passed
    if (dist < 6 && now - lastEncounterTime > 8000) {
      if (challenges.length > 0) {
        setLastEncounterTime(now);
        triggerHaptic([150, 50, 150, 50, 300]);
        playSound(120, 'sawtooth', 0.4, 0.3);
        
        // Pick a random challenge from the active list
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        handleDefeatMinotaur(randomChallenge);
      }
    }
  }, [minotaurPos, userPos, showRiddle, challenges, lastEncounterTime]);

  // Periodic sound/haptic feedback for proximity
  useEffect(() => {
    if (showRiddle || proximityIntensity < 0.2) return;

    const interval = setInterval(() => {
      // Heartbeat: Two pulses
      const freq = 60 + (proximityIntensity * 40);
      playSound(freq, 'sine', 0.1, 0.1 * proximityIntensity);
      setTimeout(() => playSound(freq * 0.8, 'sine', 0.15, 0.08 * proximityIntensity), 150);
      
      if (proximityIntensity > 0.7) {
        triggerHaptic([40, 60, 40]);
      }
    }, Math.max(300, 1200 - (proximityIntensity * 1000)));

    return () => clearInterval(interval);
  }, [proximityIntensity, showRiddle]);

  const handleMouseMove = (e: React.MouseEvent) => {
    initAudio(); // Initialize audio on first move
    if (!mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setUserPos({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  // Timer logic for the riddle
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 5) {
          playSound(880, 'sine', 0.05, 0.1); // Beep for last 5 seconds
          triggerHaptic(50);
        }
      }, 1000);
    } else if (timeLeft === 0) {
      playSound(200, 'square', 0.5, 0.2); // Failure sound
      submitRiddle(false); // Time's up failure
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft]);

  const handleDefeatMinotaur = async (challenge: MinotaurChallenge) => {
    setLoadingRiddle(true);
    setShowRiddle(challenge);
    try {
      const lore = await getMinotaurChallengeLore(challenge.niche, challenge.difficulty);
      setRiddleData(lore);
      setTimeLeft(30); // 30 seconds to solve the riddle
    } catch (e) {
      console.error(e);
      setShowRiddle(null);
    } finally {
      setLoadingRiddle(false);
    }
  };

  const handleAbandon = () => {
    playSound(150, 'sine', 0.4, 0.1);
    triggerHaptic(100);
    setShowRiddle(null);
    setRiddleData(null);
    setTimeLeft(null);
    alert("YOU FLEE! The Minotaur's laughter echoes. Authority penalized.");
  };

  const submitRiddle = (isCorrect: boolean) => {
    if (isCorrect && showRiddle) {
      onComplete(showRiddle.id);
      // Success: Bright, rising chime
      playSound(800, 'sine', 0.1, 0.2);
      setTimeout(() => playSound(1200, 'sine', 0.3, 0.2), 100);
      triggerHaptic([50, 50, 50, 50, 200]);
      alert("MINOTAUR DEFEATED! The Labyrinth trembles as you claim your prize.");
    } else {
      // Failure: Low, harsh buzz
      playSound(100, 'sawtooth', 0.6, 0.3);
      triggerHaptic([300, 100, 300]);
      alert("THE MINOTAUR OVERPOWERS YOU! You have been pushed back to a deeper corridor. -2 Authority.");
      // Logic for authority penalty could go here
    }
    setShowRiddle(null);
    setRiddleData(null);
    setTimeLeft(null);
  };

  return (
    <div className="p-8 space-y-8 relative">
      {/* Riddle Overlay */}
      {showRiddle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 transition-all animate-in fade-in duration-500">
          <div className="max-w-xl w-full glass-morphism p-1 border border-red-500/50 shadow-[0_0_100px_rgba(220,38,38,0.2)]">
            <div className="bg-[#0A0A0F] p-8 relative overflow-hidden">
              {/* Background blood-red glow pulse */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-red-600/10 blur-3xl animate-pulse"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-cinzel text-2xl text-red-500 uppercase tracking-widest">Trial of the Minotaur</h3>
                  {timeLeft !== null && (
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Expiration</span>
                      <span className={`text-2xl font-black font-cinzel ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-[#FFD700]'}`}>
                        00:{timeLeft.toString().padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
                
                {loadingRiddle ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 border-t-2 border-r-2 border-red-500 rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-[#FFD700] font-cinzel text-xs tracking-widest animate-pulse">EXTRACTING NICHE PARADOX...</p>
                  </div>
                ) : riddleData ? (
                  <div className="space-y-8">
                    <div className="p-6 bg-red-950/10 border border-red-900/20 rounded-sm">
                      <p className="text-gray-200 italic text-lg leading-relaxed text-center font-light">
                        "{riddleData.riddle}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {riddleData.options?.map((opt: string, i: number) => (
                        <button 
                          key={i} 
                          onClick={() => submitRiddle(opt === riddleData.correctAnswer)}
                          className="w-full py-4 px-6 border border-[#FFD700]/10 bg-white/5 hover:bg-red-500 hover:border-white/50 hover:text-white transition-all text-sm font-medium text-left group flex items-center"
                        >
                          <span className="w-6 h-6 border border-white/20 flex items-center justify-center mr-4 text-[10px] group-hover:border-white">{String.fromCharCode(65 + i)}</span>
                          {opt}
                        </button>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest">Hint: {riddleData.hint}</p>
                      <button 
                        onClick={handleAbandon} 
                        className="text-[9px] text-gray-600 hover:text-white uppercase tracking-widest font-bold underline underline-offset-4"
                      >
                        Abandon Trial (Penalty Applied)
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-10">The Minotaur's voice fades. The trial is lost.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Earnings HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-morphism p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FFD700]/5 rounded-full blur-2xl group-hover:bg-[#FFD700]/10 transition-all"></div>
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Total Earnings</p>
          <p className="text-3xl font-cinzel font-black text-[#FFD700]">AED {user.earningsAED.toFixed(2)}</p>
          <p className="text-[10px] text-green-500 mt-2 font-bold">+12% vs last week</p>
        </div>
        <div className="glass-morphism p-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Gold Dust</p>
          <p className="text-3xl font-cinzel font-black text-[#FFD700] flex items-center">
            {user.goldDust}
            <span className="ml-2 w-4 h-4 rounded-full bg-[#FFD700] animate-pulse"></span>
          </p>
          <p className="text-[10px] text-gray-400 mt-2">Earned from Dark Social pings</p>
        </div>
        <div className="glass-morphism p-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Maze Floor</p>
          <p className="text-3xl font-cinzel font-black text-white">{user.floor}</p>
          <p className="text-[10px] text-[#FFD700] mt-2 font-bold">25% path to {user.floor === Floor.Basement ? 'Ground' : 'Upper'}</p>
        </div>
        <div className="glass-morphism p-6">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Authority</p>
          <p className="text-3xl font-cinzel font-black text-[#FFD700]">{user.authorityScore}/100</p>
          <div className="w-full bg-gray-800 h-1 rounded-full mt-3">
             <div className="bg-[#FFD700] h-full" style={{ width: `${user.authorityScore}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Labyrinth Visual */}
        <div className="lg:col-span-2 glass-morphism relative aspect-video flex flex-col">
          <div className="p-4 border-b border-[#FFD700]/10 flex justify-between items-center">
             <h3 className="font-cinzel text-sm text-[#FFD700] tracking-widest uppercase flex items-center">
               The Map - {user.niche} Corridor
               {proximityIntensity > 0.1 && (
                 <span className="ml-4 flex items-center space-x-2">
                   <span className="text-[8px] text-red-500 animate-pulse font-black">MINOTAUR PROXIMITY:</span>
                   <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                     <div 
                       className="h-full bg-red-600 transition-all duration-300" 
                       style={{ width: `${proximityIntensity * 100}%` }}
                     ></div>
                   </div>
                 </span>
               )}
             </h3>
             <span className="text-[10px] text-gray-500">Live Grid View: {userPos.x.toFixed(1)}x / {userPos.y.toFixed(1)}y</span>
          </div>
          <div 
            ref={mapRef}
            onMouseMove={handleMouseMove}
            className="flex-1 bg-black/40 relative overflow-hidden flex items-center justify-center cursor-crosshair"
          >
             <div className="absolute inset-0 opacity-10">
               <svg width="100%" height="100%">
                 <pattern id="maze" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 0 40 L 0 0 40 0" fill="none" stroke="#FFD700" strokeWidth="1" />
                 </pattern>
                 <rect width="100%" height="100%" fill="url(#maze)" />
               </svg>
             </div>

             {/* Proximity Vignette */}
             <div 
               className="absolute inset-0 pointer-events-none transition-opacity duration-300"
               style={{ 
                 background: `radial-gradient(circle, transparent 30%, rgba(220, 38, 38, ${proximityIntensity * 0.4}) 100%)`,
                 opacity: proximityIntensity > 0.2 ? 1 : 0
               }}
             ></div>

             {/* Danger Warning */}
             {proximityIntensity > 0.8 && (
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                 <p className="text-red-600 font-cinzel text-4xl font-black animate-pulse tracking-[0.5em] opacity-50">
                   DANGER
                 </p>
               </div>
             )}
             
             {/* Roaming Minotaur NPC */}
             <div 
               className="absolute z-10 transition-all duration-[2000ms] ease-in-out"
               style={{ left: `${minotaurPos.x}%`, top: `${minotaurPos.y}%`, transform: 'translate(-50%, -50%)' }}
               title="The Minotaur roams... Avoid or face it."
             >
                <div className="relative">
                   <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full shadow-[0_0_30px_rgba(220,38,38,1)] border-2 border-white/20 relative z-10">
                      <span className="text-white text-lg">🐂</span>
                   </div>
                   {/* Proximity Aura */}
                   <div 
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-red-500/30 transition-all duration-300"
                     style={{ 
                       width: `${40 + proximityIntensity * 100}px`, 
                       height: `${40 + proximityIntensity * 100}px`,
                       opacity: proximityIntensity
                     }}
                   ></div>
                   <div className="absolute -inset-2 rounded-full border border-red-500 animate-ping opacity-40"></div>
                </div>
             </div>

             {/* User Avatar Orb */}
             <div 
               className="absolute z-20 transition-all duration-150 ease-out pointer-events-none"
               style={{ left: `${userPos.x}%`, top: `${userPos.y}%`, transform: 'translate(-50%, -50%)' }}
             >
                <div className="w-12 h-12 rounded-full bg-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.8)] animate-pulse flex items-center justify-center">
                   <span className="text-[8px] font-black text-black">CAPT</span>
                </div>
                <div className="absolute inset-0 w-12 h-12 rounded-full border border-[#FFD700] animate-ping opacity-20"></div>
             </div>
          </div>
        </div>

        {/* Action Panel / Challenges */}
        <div className="space-y-6">
          <div className="glass-morphism p-6 flex-1 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-cinzel text-sm text-red-500 tracking-widest uppercase flex items-center">
                 Active Challenges
                 <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </h3>
              <span className="text-[8px] text-gray-500 uppercase tracking-widest">{challenges.length} Bounties Active</span>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {challenges.length === 0 ? (
                <div className="text-center py-10 border border-white/5 bg-white/2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">No Active Challenges</p>
                  <p className="text-xs text-gray-400 mt-1 italic">Enter the Colosseum to accept brand bounties.</p>
                </div>
              ) : (
                challenges.map(c => (
                  <div key={c.id} className="p-4 bg-red-950/20 border border-red-500/20 group hover:border-red-500/50 transition-all">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{c.brand} Bounty</span>
                       <span className="text-[10px] text-gray-500 font-cinzel">Lv.{c.difficulty}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mb-4">{c.task}</p>
                    <div className="flex items-center justify-between">
                       <div className="flex flex-wrap gap-1">
                          <span className="text-[8px] px-2 py-0.5 bg-[#FFD700]/10 text-[#FFD700] rounded-full border border-[#FFD700]/20">+{c.rewardGold} GOLD</span>
                          <span className="text-[8px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">+{c.rewardAuthority} AUTH</span>
                       </div>
                       <button 
                        onClick={() => handleDefeatMinotaur(c)}
                        className="text-[8px] font-black uppercase tracking-widest bg-red-600 text-white px-3 py-1.5 hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                       >
                         Face Trial
                       </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <h3 className="font-cinzel text-sm text-[#FFD700] tracking-widest uppercase mb-4">Commission Velocity</h3>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#FFD700" fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabyrinthDashboard;
