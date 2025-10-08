'use client'

import { Search, Heart, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function TopBar() {
  return (
    <motion.div 
      className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/50 to-transparent"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between px-4 py-3 pt-12">
        {/* 로고/타이틀 */}
        <div className="flex items-center gap-2">
          <motion.h1 
            className="text-white text-xl font-bold"
            whileTap={{ scale: 0.95 }}
          >
            🍽️ K-Food
          </motion.h1>
        </div>

        {/* 우상단 아이콘들 */}
        <div className="flex items-center gap-4">
          <motion.button 
            className="p-2 text-white hover:bg-white/10 rounded-full"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Search size={24} />
          </motion.button>
          
          <motion.button 
            className="p-2 text-white hover:bg-white/10 rounded-full relative"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <Heart size={24} />
            {/* 알림 배지 */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>
          
          <motion.button 
            className="p-2 text-white hover:bg-white/10 rounded-full relative"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <MessageCircle size={24} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}