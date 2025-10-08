'use client'

import { useState } from 'react'
import { Settings, Grid, Video, Bookmark, MapPin, Calendar, Users, Star, Award } from 'lucide-react'
import { ProfileEditModal } from './ProfileEditModal'
import { SettingsPage } from './SettingsPage'

interface Post {
  id: string
  type: 'feed' | 'shorts'
  thumbnail: string
}

const SAMPLE_USER_POSTS: Post[] = [
  {
    id: '1',
    type: 'feed',
    thumbnail: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=400&q=80',
  },
  {
    id: '2',
    type: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
  },
  {
    id: '3',
    type: 'feed',
    thumbnail: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80',
  },
  {
    id: '4',
    type: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  },
  {
    id: '5',
    type: 'feed',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
  },
  {
    id: '6',
    type: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
  },
]

interface ProfilePageProps {
  onLogout?: () => void
}

export function ProfilePage({ onLogout }: ProfilePageProps = {}) {
  const [activeTab, setActiveTab] = useState<'posts' | 'shorts' | 'saved'>('posts')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '내 계정',
    username: 'my_account',
    bio: '맛집 탐험가 🍽️ | 서울 & 경기 중심 | 숨은 맛집을 찾아다닙니다',
    location: '서울, 대한민국',
  })

  const filteredPosts = SAMPLE_USER_POSTS.filter((post) => {
    if (activeTab === 'posts') return post.type === 'feed'
    if (activeTab === 'shorts') return post.type === 'shorts'
    return true
  })

  const handleSaveProfile = (data: any) => {
    setProfileData(data)
  }

  if (showSettings) {
    return <SettingsPage onLogout={onLogout || (() => {})} />
  }

  return (
    <div className="min-h-screen bg-black pb-20 lg:pb-0">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-white">프로필</h1>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Settings className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* 프로필 정보 */}
      <div className="px-4 py-6">
        {/* 프로필 헤더 */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center ring-4 ring-white/10">
            <span className="text-white font-bold text-2xl">{profileData.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-black text-xl mb-1">{profileData.name}</h2>
            <p className="text-gray-400 text-sm mb-3">@{profileData.username}</p>
            <button
              onClick={() => setShowEditModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
            >
              프로필 편집
            </button>
          </div>
        </div>

        {/* 신뢰도 점수 */}
        <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-white font-bold">신뢰도 점수</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                  85점
                </div>
                <div className="text-gray-400 text-sm">
                  상위 15%
                </div>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-green-400 text-xs">✓</span>
                <span className="text-gray-400 text-xs">방문 인증</span>
              </div>
              <div className="text-white font-bold">12회</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-1">
                <span className="text-blue-400 text-xs">✓</span>
                <span className="text-gray-400 text-xs">결제 인증</span>
              </div>
              <div className="text-white font-bold">8회</div>
            </div>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-white font-black text-2xl mb-1">24</div>
            <div className="text-gray-400 text-xs">게시물</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-white font-black text-2xl mb-1">892</div>
            <div className="text-gray-400 text-xs">팔로워</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-white font-black text-2xl mb-1">456</div>
            <div className="text-gray-400 text-xs">팔로잉</div>
          </div>
        </div>

        {/* 소개 */}
        <div className="mb-6">
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            {profileData.bio}
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>2024년 1월 가입</span>
            </div>
          </div>
        </div>

        {/* 뱃지 컬렉션 */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-pink-500" />
            획득한 뱃지
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: '🔥', name: '열정 탐험가', earned: true },
              { emoji: '⭐', name: '신뢰 리뷰어', earned: true },
              { emoji: '📸', name: '포토 마스터', earned: true },
              { emoji: '🎬', name: '쇼츠 크리에이터', earned: false },
              { emoji: '👑', name: '맛집 킹', earned: false },
              { emoji: '💎', name: '프리미엄', earned: false },
              { emoji: '🏆', name: '챔피언', earned: false },
              { emoji: '🌟', name: '슈퍼스타', earned: false },
            ].map((badge, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-center p-2 transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                    : 'bg-white/5 border border-white/10 opacity-40'
                }`}
              >
                <div className="text-2xl mb-1">{badge.emoji}</div>
                <div className="text-[10px] text-gray-300 leading-tight">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 탭 */}
        <div className="flex items-center border-b border-white/10 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-4 font-semibold text-sm transition-all relative ${
              activeTab === 'posts' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Grid className="w-4 h-4" />
              <span>게시물</span>
            </div>
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('shorts')}
            className={`flex-1 py-4 font-semibold text-sm transition-all relative ${
              activeTab === 'shorts' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Video className="w-4 h-4" />
              <span>쇼츠</span>
            </div>
            {activeTab === 'shorts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-4 font-semibold text-sm transition-all relative ${
              activeTab === 'saved' ? 'text-white' : 'text-gray-400'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span>저장됨</span>
            </div>
            {activeTab === 'saved' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
            )}
          </button>
        </div>

        {/* 게시물 그리드 */}
        <div className="grid grid-cols-3 gap-1">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square bg-white/5 overflow-hidden cursor-pointer group"
            >
              <img
                src={post.thumbnail}
                alt="Post"
                className="w-full h-full object-cover"
              />
              {post.type === 'shorts' && (
                <div className="absolute top-2 right-2">
                  <Video className="w-4 h-4 text-white drop-shadow-lg" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span>❤️</span>
                      <span className="font-semibold">234</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💬</span>
                      <span className="font-semibold">45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <p className="text-sm">게시물이 없습니다</p>
          </div>
        )}
      </div>

      {/* 프로필 편집 모달 */}
      {showEditModal && (
        <ProfileEditModal
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}
