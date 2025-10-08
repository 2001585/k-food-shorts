'use client'

import { useState } from 'react'
import { Home, Search, Compass, Heart, PlusSquare, User, Menu, Bookmark, Settings, LogOut } from 'lucide-react'

interface WebLayoutProps {
  children: React.ReactNode
  onLogout: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

export function WebLayout({ children, onLogout, activeTab, onTabChange }: WebLayoutProps) {

  return (
    <div className="min-h-screen bg-black">
      {/* 상단 헤더 (모바일) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/30">
              <span className="text-white text-sm font-black">F</span>
            </div>
            <h1 className="text-xl font-black text-white">
              Foodfie
            </h1>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* 왼쪽 사이드바 (데스크톱) */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-white/10 z-50">
        <div className="flex flex-col h-full">
          {/* 로고 */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-xl flex items-center justify-center shadow-xl shadow-pink-500/30">
                <span className="text-white text-lg font-black">F</span>
              </div>
              <h1 className="text-xl font-black text-white">
                Foodfie
              </h1>
            </div>
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => onTabChange('home')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Home className="w-6 h-6" />
              <span>홈</span>
            </button>

            <button
              onClick={() => onTabChange('search')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Search className="w-6 h-6" />
              <span>검색</span>
            </button>

            <button
              onClick={() => onTabChange('explore')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'explore'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Compass className="w-6 h-6" />
              <span>탐색</span>
            </button>

            <button
              onClick={() => onTabChange('notifications')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'notifications'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Heart className="w-6 h-6" />
              <span>알림</span>
            </button>

            <button
              onClick={() => onTabChange('create')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <PlusSquare className="w-6 h-6" />
              <span>만들기</span>
            </button>

            <button
              onClick={() => onTabChange('saved')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'saved'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Bookmark className="w-6 h-6" />
              <span>저장됨</span>
            </button>

            <button
              onClick={() => onTabChange('profile')}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <User className="w-6 h-6" />
              <span>프로필</span>
            </button>
          </nav>

          {/* 하단 메뉴 */}
          <div className="p-4 border-t border-white/10 space-y-1">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
              <Settings className="w-6 h-6" />
              <span>설정</span>
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
            >
              <LogOut className="w-6 h-6" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        {children}
      </main>

      {/* 하단 네비게이션 (모바일) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 z-40">
        <div className="flex items-center justify-around px-2 py-2">
          <button
            onClick={() => onTabChange('home')}
            className={`p-3 rounded-xl transition-all ${
              activeTab === 'home' ? 'text-pink-400' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
          </button>
          <button
            onClick={() => onTabChange('search')}
            className={`p-3 rounded-xl transition-all ${
              activeTab === 'search' ? 'text-pink-400' : 'text-gray-400'
            }`}
          >
            <Search className="w-6 h-6" />
          </button>
          <button
            onClick={() => onTabChange('create')}
            className={`p-3 rounded-xl transition-all ${
              activeTab === 'create' ? 'text-pink-400' : 'text-gray-400'
            }`}
          >
            <PlusSquare className="w-6 h-6" />
          </button>
          <button
            onClick={() => onTabChange('notifications')}
            className={`p-3 rounded-xl transition-all ${
              activeTab === 'notifications' ? 'text-pink-400' : 'text-gray-400'
            }`}
          >
            <Heart className="w-6 h-6" />
          </button>
          <button
            onClick={() => onTabChange('profile')}
            className={`p-3 rounded-xl transition-all ${
              activeTab === 'profile' ? 'text-pink-400' : 'text-gray-400'
            }`}
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </div>
  )
}
