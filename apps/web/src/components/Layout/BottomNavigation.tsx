'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react'

const navItems = [
  { icon: Home, label: '홈', key: 'home' },
  { icon: Search, label: '검색', key: 'search' },
  { icon: PlusSquare, label: '추가', key: 'add' },
  { icon: Heart, label: '좋아요', key: 'likes' },
  { icon: User, label: '프로필', key: 'profile' },
]

export function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      {/* 그라데이션 배경 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      
      {/* 네비게이션 바 */}
      <div className="relative flex items-center justify-around px-4 py-3 pb-6">
        {navItems.map(({ icon: Icon, label, key }) => (
          <motion.button
            key={key}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === key ? 'text-white' : 'text-white/60'
            }`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveTab(key)}
          >
            <div className="relative">
              <Icon 
                size={24} 
                className={`${
                  activeTab === key ? 'fill-white stroke-2' : 'stroke-1'
                }`}
              />
              
              {/* 활성 인디케이터 */}
              {activeTab === key && (
                <motion.div
                  className="absolute -bottom-3 left-1/2 w-1 h-1 bg-white rounded-full"
                  initial={{ scale: 0, x: '-50%' }}
                  animate={{ scale: 1, x: '-50%' }}
                  transition={{ type: 'spring', stiffness: 500 }}
                />
              )}
            </div>
            
            <span className="text-xs font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}