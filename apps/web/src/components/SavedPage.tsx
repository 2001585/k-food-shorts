'use client'

import { useState } from 'react'
import { Bookmark, Grid, Video, MapPin } from 'lucide-react'

interface SavedPost {
  id: string
  type: 'feed' | 'shorts'
  thumbnail: string
  title?: string
  restaurant?: string
  location?: string
  savedAt: string
}

const SAMPLE_SAVED_POSTS: SavedPost[] = [
  {
    id: '1',
    type: 'feed',
    thumbnail: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=400&q=80',
    title: '망원동 김치찌개',
    restaurant: '망원동 김치찌개',
    location: '서울 마포구 망원동',
    savedAt: '2024-01-15',
  },
  {
    id: '2',
    type: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
    title: '성수동 브런치 카페',
    restaurant: '성수 브런치 카페',
    location: '서울 성동구 성수동',
    savedAt: '2024-01-14',
  },
  {
    id: '3',
    type: 'feed',
    thumbnail: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80',
    title: '이태원 정통 라멘',
    restaurant: '이태원 정통 라멘',
    location: '서울 용산구 이태원동',
    savedAt: '2024-01-13',
  },
  {
    id: '4',
    type: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    title: '건대 비건 맛집',
    restaurant: '채식주의자',
    location: '서울 광진구 자양동',
    savedAt: '2024-01-12',
  },
  {
    id: '5',
    type: 'feed',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
    title: '홍대 파스타 맛집',
    restaurant: '홍대 이탈리안',
    location: '서울 마포구 홍익동',
    savedAt: '2024-01-11',
  },
  {
    id: '6',
    type: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    title: '강남 스테이크 하우스',
    restaurant: '강남 스테이크',
    location: '서울 강남구 역삼동',
    savedAt: '2024-01-10',
  },
  {
    id: '7',
    type: 'feed',
    thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    title: '명동 팬케이크',
    restaurant: '명동 디저트 카페',
    location: '서울 중구 명동',
    savedAt: '2024-01-09',
  },
  {
    id: '8',
    type: 'shorts',
    thumbnail: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=80',
    title: '부산 돼지국밥',
    restaurant: '해운대 국밥집',
    location: '부산 해운대구',
    savedAt: '2024-01-08',
  },
]

export function SavedPage() {
  const [filter, setFilter] = useState<'all' | 'feed' | 'shorts'>('all')
  const [savedPosts, setSavedPosts] = useState(SAMPLE_SAVED_POSTS)

  const filteredPosts = savedPosts.filter((post) => {
    if (filter === 'all') return true
    return post.type === filter
  })

  const handleUnsave = (id: string) => {
    setSavedPosts(savedPosts.filter((post) => post.id !== id))
  }

  return (
    <div className="min-h-screen bg-black pb-20 lg:pb-0">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-black text-white mb-3">저장됨</h1>

          {/* 필터 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Grid className="w-4 h-4" />
                전체
              </span>
            </button>
            <button
              onClick={() => setFilter('feed')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                filter === 'feed'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              일반 게시글
            </button>
            <button
              onClick={() => setFilter('shorts')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                filter === 'shorts'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                쇼츠
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 저장된 게시물 그리드 */}
      <div className="px-4 py-6">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Bookmark className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-1">저장된 게시물이 없습니다</p>
            <p className="text-sm">마음에 드는 게시물을 저장해보세요</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400 text-sm">총 {filteredPosts.length}개</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="relative aspect-square bg-white/5 rounded-xl overflow-hidden group cursor-pointer"
                >
                  {/* 썸네일 */}
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />

                  {/* 타입 뱃지 */}
                  <div className="absolute top-2 left-2 z-10">
                    {post.type === 'shorts' && (
                      <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full flex items-center gap-1">
                        <Video className="w-3 h-3 text-pink-500" />
                        <span className="text-white text-xs font-bold">쇼츠</span>
                      </div>
                    )}
                  </div>

                  {/* 저장 해제 버튼 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleUnsave(post.id)
                    }}
                    className="absolute top-2 right-2 z-10 p-2 bg-black/70 backdrop-blur-sm hover:bg-black/90 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Bookmark className="w-4 h-4 text-orange-500 fill-orange-500" />
                  </button>

                  {/* 호버 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                        {post.title}
                      </h3>
                      {post.restaurant && (
                        <p className="text-gray-300 text-xs mb-1 line-clamp-1">
                          {post.restaurant}
                        </p>
                      )}
                      {post.location && (
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{post.location}</span>
                        </div>
                      )}
                      <p className="text-gray-500 text-xs mt-2">
                        저장일: {post.savedAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* 컬렉션 기능 (향후 추가) */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 border border-pink-500/30 rounded-xl p-6 text-center">
          <Bookmark className="w-12 h-12 text-pink-500 mx-auto mb-3" />
          <h3 className="text-white font-bold text-lg mb-2">컬렉션 기능</h3>
          <p className="text-gray-400 text-sm mb-4">
            저장한 게시물을 주제별로 정리할 수 있는 컬렉션 기능이 곧 추가됩니다!
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>• 나만의 맛집 리스트 만들기</span>
            <span>• 친구와 공유하기</span>
          </div>
        </div>
      </div>
    </div>
  )
}
