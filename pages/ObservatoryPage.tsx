
import React from 'react';
import { UserProgress } from '../types';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { motion } from 'motion/react';

const performanceData = [
  { name: 'Week 1', earnings: 120, authority: 5 },
  { name: 'Week 2', earnings: 300, authority: 8 },
  { name: 'Week 3', earnings: 250, authority: 12 },
  { name: 'Week 4', earnings: 450, authority: 15 },
  { name: 'Week 5', earnings: 600, authority: 22 },
  { name: 'Week 6', earnings: 850, authority: 30 },
];

const nicheDistribution = [
  { name: 'Beauty', value: 400, color: '#FFD700' },
  { name: 'Tech', value: 300, color: '#FF4D00' },
  { name: 'Fashion', value: 300, color: '#FF00FF' },
  { name: 'Gaming', value: 200, color: '#00FFFF' },
];

const ObservatoryPage: React.FC<{ user: UserProgress }> = ({ user }) => {
  return (
    <div className="p-8 space-y-8 relative overflow-hidden">
      {/* Starry Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute bg-white rounded-full"
            style={{ 
              width: Math.random() * 3 + 'px', 
              height: Math.random() * 3 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%'
            }}
          />
        ))}
      </div>

      <header className="border-b border-[#FFD700]/20 pb-6 relative z-10">
        <h2 className="font-cinzel text-3xl text-[#FFD700] tracking-widest uppercase">The Observatory</h2>
        <p className="text-gray-500 text-sm mt-2 italic">Behold the celestial alignment of your performance and global trends.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-morphism p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-cinzel text-sm text-[#FFD700] tracking-widest uppercase">Authority & Earnings Velocity</h3>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FFD700]"></div>
                <span className="text-[10px] text-gray-500 uppercase">Earnings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500"></div>
                <span className="text-[10px] text-gray-500 uppercase">Authority</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#666" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0F', border: '1px solid #FFD70033', fontSize: '12px' }}
                  itemStyle={{ color: '#FFD700' }}
                />
                <Line type="monotone" dataKey="earnings" stroke="#FFD700" strokeWidth={2} dot={{ fill: '#FFD700' }} />
                <Line type="monotone" dataKey="authority" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Niche Dominance */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-morphism p-8 flex flex-col"
        >
          <h3 className="font-cinzel text-sm text-[#FFD700] tracking-widest uppercase mb-8">Global Niche Dominance</h3>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nicheDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {nicheDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0F', border: '1px solid #FFD70033', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {nicheDistribution.map(n => (
              <div key={n.name} className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: n.color }}></div>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{n.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-morphism p-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Current Trajectory</p>
          <p className="text-2xl font-cinzel text-emerald-500">ASCENDING</p>
          <p className="text-[10px] text-gray-400 mt-2">Predicted Tier: <span className="text-white">Silver</span> by next week</p>
        </div>
        <div className="glass-morphism p-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Dark Social Reach</p>
          <p className="text-2xl font-cinzel text-[#FFD700]">12.4K</p>
          <p className="text-[10px] text-gray-400 mt-2">Aggregated across WhatsApp & Telegram</p>
        </div>
        <div className="glass-morphism p-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Conversion Alpha</p>
          <p className="text-2xl font-cinzel text-white">4.2%</p>
          <p className="text-[10px] text-gray-400 mt-2">+0.8% above niche average</p>
        </div>
      </div>
    </div>
  );
};

export default ObservatoryPage;
