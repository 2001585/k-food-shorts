'use client'

import { useState } from 'react'
import { Search, MapPin, Filter, TrendingUp, X } from 'lucide-react'

const TRENDING_SEARCHES = [
  '망원동 김치찌개',
  '성수동 카페',
  '부산 돼지국밥',
  '이태원 라멘',
  '강남 맛집',
]

const CATEGORIES = [
  { id: 'all', name: '전체', icon: '🍽️' },
  { id: 'korean', name: '한식', icon: '🍚' },
  { id: 'chinese', name: '중식', icon: '🥟' },
  { id: 'japanese', name: '일식', icon: '🍱' },
  { id: 'western', name: '양식', icon: '🍝' },
  { id: 'cafe', name: '카페', icon: '☕' },
  { id: 'dessert', name: '디저트', icon: '🍰' },
  { id: 'bar', name: '술집', icon: '🍺' },
]

const SEARCH_RESULTS = [
  {
    id: '1',
    name: '망원동 김치찌개',
    category: '한식',
    location: '서울 마포구 망원동',
    rating: 4.8,
    reviewCount: 892,
    image: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=400&q=80',
    distance: '1.2km',
    isOwner: true,
  },
  {
    id: '2',
    name: '성수 브런치 카페',
    category: '카페',
    location: '서울 성동구 성수동',
    rating: 4.6,
    reviewCount: 456,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
    distance: '3.5km',
    isOwner: false,
  },
  {
    id: '3',
    name: '이태원 정통 라멘',
    category: '일식',
    location: '서울 용산구 이태원동',
    rating: 4.9,
    reviewCount: 1203,
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80',
    distance: '5.8km',
    isOwner: true,
  },
]

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-black pb-20 lg:pb-0">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-black text-white mb-3">검색</h1>

          {/* 검색 바 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="맛집, 음식, 지역 검색..."
              className="w-full bg-white/5 text-white placeholder-gray-500 pl-11 pr-12 py-3 rounded-xl border border-white/10 focus:border-pink-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* 필터 버튼 */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-semibold">필터</span>
          </button>
        </div>
      </div>

      {/* 카테고리 */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 트렌딩 검색어 */}
      {!searchQuery && (
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            <h2 className="text-white font-bold">인기 검색어</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(term)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-full text-sm transition-colors"
              >
                {index + 1}. {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">
            {searchQuery ? `"${searchQuery}" 검색 결과` : '추천 맛집'}
          </h2>
          <span className="text-gray-400 text-sm">{SEARCH_RESULTS.length}개</span>
        </div>

        <div className="space-y-4">
          {SEARCH_RESULTS.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex gap-4 p-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold text-base">{restaurant.name}</h3>
                      {restaurant.isOwner && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold rounded-full">
                          오너
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-orange-500 px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">⭐ {restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{restaurant.category}</p>
                  <div className="flex items-center gap-3 text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{restaurant.distance}</span>
                    </div>
                    <span>리뷰 {restaurant.reviewCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 필터 모달 */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end lg:items-center lg:justify-center">
          <div className="w-full lg:max-w-md bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-t-3xl lg:rounded-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">필터</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 거리 */}
              <div>
                <h4 className="text-white font-semibold mb-3">거리</h4>
                <div className="space-y-2">
                  {['1km 이내', '3km 이내', '5km 이내', '10km 이내'].map((option) => (
                    <button
                      key={option}
                      className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-left transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 가격대 */}
              <div>
                <h4 className="text-white font-semibold mb-3">가격대</h4>
                <div className="space-y-2">
                  {['₩ 저렴', '₩₩ 보통', '₩₩₩ 비싼', '₩₩₩₩ 고급'].map((option) => (
                    <button
                      key={option}
                      className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-left transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* 영업 상태 */}
              <div>
                <h4 className="text-white font-semibold mb-3">영업 상태</h4>
                <div className="space-y-2">
                  {['영업중', '24시간', '주말 영업'].map((option) => (
                    <button
                      key={option}
                      className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-left transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 px-4 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
                초기화
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
