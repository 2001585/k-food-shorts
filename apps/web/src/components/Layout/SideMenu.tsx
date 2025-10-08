'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Settings, Heart, Bookmark, Share2, Info } from 'lucide-react'

const menuItems = [
  { icon: User, label: '프로필', key: 'profile' },
  { icon: Heart, label: '좋아요', key: 'likes' },
  { icon: Bookmark, label: '북마크', key: 'bookmarks' },
  { icon: Share2, label: '공유한 게시물', key: 'shares' },
  { icon: Settings, label: '설정', key: 'settings' },
  { icon: Info, label: '정보', key: 'about' },
]

export function SideMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 햄버거 메뉴 버튼 */}
      <motion.button
        className="fixed top-4 left-4 z-50 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={20} />
      </motion.button>

      {/* 사이드 메뉴 오버레이 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 백드롭 */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 메뉴 패널 */}
            <motion.div
              className="fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-xl z-50 border-r border-white/10"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-white text-xl font-bold">메뉴</h2>
                <motion.button
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white"
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* 프로필 섹션 */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">👤</span>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">안녕하세요!</h3>
                    <p className="text-white/60 text-sm">K-Food 탐험가</p>
                  </div>
                </div>
              </div>

              {/* 메뉴 아이템들 */}
              <div className="py-4">
                {menuItems.map(({ icon: Icon, label, key }, index) => (
                  <motion.button
                    key={key}
                    className="w-full flex items-center gap-4 px-6 py-4 text-white hover:bg-white/10 transition-colors"
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }}
                  >
                    <Icon size={20} />
                    <span className="text-base">{label}</span>
                  </motion.button>
                ))}
              </div>

              {/* 하단 앱 정보 */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-white/60 text-sm">K-Food Shorts</p>
                  <p className="text-white/40 text-xs mt-1">Version 1.0.0</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}