'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { BottomNavigationV2 } from './BottomNavigation_v2'
import { TopBarV2 } from './TopBar_v2'
import { SideMenu } from './SideMenu'

interface MobileLayoutProps {
  children: ReactNode
  showBottomNav?: boolean
  showTopBar?: boolean
  showSideMenu?: boolean
}

export function MobileLayout({ 
  children, 
  showBottomNav = true, 
  showTopBar = true,
  showSideMenu = true
}: MobileLayoutProps) {
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* 상단 바 */}
      {showTopBar && <TopBarV2 />}
      
      {/* 사이드 메뉴 */}
      {showSideMenu && <SideMenu />}
      
      {/* 메인 콘텐츠 */}
      <main className="h-full">
        {children}
      </main>
      
      {/* 하단 네비게이션 */}
      {showBottomNav && <BottomNavigationV2 />}
    </div>
  )
}