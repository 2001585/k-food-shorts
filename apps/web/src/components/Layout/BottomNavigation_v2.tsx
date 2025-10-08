'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, Plus, Heart, User, Compass, TrendingUp } from 'lucide-react'

const navItems = [
  { icon: Home, label: '홈', key: 'home', gradient: 'from-orange-400 to-red-400' },
  { icon: Compass, label: '탐색', key: 'explore', gradient: 'from-purple-400 to-blue-400' },
  { icon: Plus, label: '추가', key: 'add', gradient: 'from-pink-400 to-red-400', special: true },
  { icon: Heart, label: '좋아요', key: 'likes', gradient: 'from-red-400 to-pink-400' },
  { icon: User, label: '프로필', key: 'profile', gradient: 'from-blue-400 to-purple-400' },
]

export function BottomNavigationV2() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      {/* Background with modern blur effect */}
      <div 
        className="absolute inset-0 backdrop-blur-2xl border-t border-white/10"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.8) 0%, rgba(26, 26, 26, 0.95) 100%)'
        }}
      />
      
      {/* Navigation Items */}
      <div className="relative flex items-center justify-around px-6 py-4 pb-8">
        {navItems.map(({ icon: Icon, label, key, gradient, special }) => {
          const isActive = activeTab === key
          
          return (
            <motion.button
              key={key}
              className="relative flex flex-col items-center gap-2"
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(key)}
            >
              {/* Icon Container */}
              <motion.div
                className={`
                  relative flex items-center justify-center rounded-2xl transition-all duration-300
                  ${special 
                    ? 'w-14 h-14' 
                    : 'w-12 h-12'
                  }
                  ${isActive 
                    ? special 
                      ? `bg-gradient-to-br ${gradient} shadow-lg shadow-pink-500/25`
                      : `bg-gradient-to-br ${gradient} shadow-lg`
                    : 'bg-white/5 border border-white/10'
                  }
                `}
                animate={{
                  scale: isActive ? (special ? 1.1 : 1.05) : 1,
                  rotate: isActive && special ? [0, -5, 5, 0] : 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }}
              >
                <Icon 
                  size={special ? 24 : 20} 
                  className={`
                    transition-all duration-300
                    ${isActive ? 'text-white' : 'text-white/60'}
                    ${isActive && !special ? 'drop-shadow-sm' : ''}
                  `}
                />

                {/* Active Indicator */}
                {isActive && !special && (
                  <motion.div
                    className={`absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br ${gradient} rounded-full border border-black`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  />
                )}

                {/* Special button glow effect */}
                {special && isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-red-400/30 rounded-2xl blur-xl"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>

              {/* Label */}
              <motion.span
                className={`
                  text-xs font-medium transition-all duration-300
                  ${isActive ? 'text-white' : 'text-white/50'}
                `}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  y: isActive ? -2 : 0
                }}
              >
                {label}
              </motion.span>

              {/* Active Background Glow */}
              {isActive && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10 rounded-3xl blur-lg -z-10`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Dynamic Island style indicator */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {navItems.map(({ key }, index) => (
          <motion.div
            key={key}
            className={`
              h-1 rounded-full transition-all duration-300
              ${activeTab === key ? 'w-6 bg-white' : 'w-1 bg-white/30'}
            `}
            animate={{
              width: activeTab === key ? 24 : 4,
              backgroundColor: activeTab === key ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}