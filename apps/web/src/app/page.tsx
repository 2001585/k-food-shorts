'use client'

import { useState } from 'react'
import { LandingPage } from '@/components/LandingPage'
import { LoginModal } from '@/components/LoginModal'
import { WebLayout } from '@/components/WebLayout'
import { HomeFeed } from '@/components/HomeFeed'
import { ShortsFeed } from '@/components/ShortsFeed'
import { SearchPage } from '@/components/SearchPage'
import { NotificationsPage } from '@/components/NotificationsPage'
import { CreatePage } from '@/components/CreatePage'
import { SavedPage } from '@/components/SavedPage'
import { ProfilePage } from '@/components/ProfilePage'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [newPosts, setNewPosts] = useState<any[]>([])
  const [newShorts, setNewShorts] = useState<any[]>([])

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handlePostCreated = (post: any) => {
    if (post.type === 'feed') {
      setNewPosts([post, ...newPosts])
      setActiveTab('home')
    } else if (post.type === 'shorts') {
      setNewShorts([post, ...newShorts])
      setActiveTab('explore')
    }
  }

  if (!isLoggedIn) {
    return (
      <>
        <LandingPage onLogin={handleLoginClick} />
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeFeed newPosts={newPosts} />
      case 'explore':
        return <ShortsFeed newShorts={newShorts} />
      case 'search':
        return <SearchPage />
      case 'notifications':
        return <NotificationsPage />
      case 'create':
        return <CreatePage onPostCreated={handlePostCreated} />
      case 'saved':
        return <SavedPage />
      case 'profile':
        return <ProfilePage onLogout={handleLogout} />
      default:
        return <HomeFeed newPosts={newPosts} />
    }
  }

  return (
    <WebLayout
      onLogout={handleLogout}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {renderContent()}
    </WebLayout>
  )
}