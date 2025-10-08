'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, MessageCircle, Menu, Sparkles, Filter } from 'lucide-react'

export function TopBarV2() {
  const [searchActive, setSearchActive] = useState(false)
  const [notifications] = useState(3)
  const [messages] = useState(2)

  return (
    <motion.div 
      className="absolute top-0 left-0 right-0 z-40"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Main Header */}
      <div className="px-6 pt-12 pb-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shadow-lg">
              <span className="text-xl">🍽️</span>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold tracking-tight">
                K-Food
              </h1>
              <div className="flex items-center gap-1">
                <Sparkles size={12} className="text-orange-400" />
                <span className="text-white/60 text-xs font-medium">DISCOVER</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <motion.button
              className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchActive(!searchActive)}
            >
              <Search size={18} className="text-white" />
            </motion.button>

            {/* Filter Button */}
            <motion.button
              className="w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.9 }}
            >
              <Filter size={18} className="text-white" />
            </motion.button>

            {/* Messages */}
            <motion.button
              className="relative w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={18} className="text-white" />
              {messages > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center border-2 border-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <span className="text-white text-xs font-bold">{messages}</span>
                </motion.div>
              )}
            </motion.button>

            {/* Notifications */}
            <motion.button
              className="relative w-10 h-10 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={18} className="text-white" />
              {notifications > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center border-2 border-black"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <span className="text-white text-xs font-bold">{notifications}</span>
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              className="mt-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="음식점이나 음식을 검색해보세요..."
                  className="w-full h-12 pl-12 pr-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400/50"
                  autoFocus
                />
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2 mt-3">
                {['한식', '일식', '양식', '중식', '카페'].map((category) => (
                  <motion.button
                    key={category}
                    className="px-4 py-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white/80 text-sm"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Blur Effect */}
      <div 
        className="absolute inset-0 -z-10 backdrop-blur-xl"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.8) 0%, rgba(10, 10, 10, 0.2) 100%)'
        }}
      />
    </motion.div>
  )
}