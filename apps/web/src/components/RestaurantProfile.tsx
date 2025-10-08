'use client'

import { useState } from 'react'
import { X, MapPin, Clock, Phone, Star, MessageCircle, Share2 } from 'lucide-react'

interface RestaurantProfileProps {
  restaurant: {
    id: string
    name: string
    category: string
    address: string
    phone: string
    hours: string
    rating: number
    reviewCount: number
    image: string
    description: string
    owner: {
      name: string
      username: string
    }
  }
  onClose: () => void
}

export function RestaurantProfile({ restaurant, onClose }: RestaurantProfileProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'owner' | 'menu'>('owner')

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
      {/* 헤더 */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white">{restaurant.name}</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Share2 className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* 커버 이미지 */}
      <div className="relative h-64 bg-gradient-to-b from-gray-900 to-black">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* 레스토랑 정보 */}
      <div className="px-4 -mt-12 relative z-10">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">{restaurant.name}</h2>
              <p className="text-gray-400 text-sm">{restaurant.category}</p>
            </div>
            <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-white fill-white" />
              <span className="text-white font-bold text-sm">{restaurant.rating}</span>
              <span className="text-white/80 text-xs">({restaurant.reviewCount})</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm mb-4 leading-relaxed">{restaurant.description}</p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 text-gray-300 text-sm">
              <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <Clock className="w-5 h-5 text-pink-500 flex-shrink-0" />
              <span>{restaurant.hours}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <Phone className="w-5 h-5 text-pink-500 flex-shrink-0" />
              <span>{restaurant.phone}</span>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex items-center gap-3 mt-6">
            <button className="flex-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all">
              <div className="flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>사장님께 질문하기</span>
              </div>
            </button>
            <button className="px-6 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all">
              공유
            </button>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="sticky top-[57px] z-40 bg-black/90 backdrop-blur-xl border-b border-white/10 mt-6">
        <div className="flex items-center px-4">
          <button
            onClick={() => setActiveTab('owner')}
            className={`flex-1 py-4 font-semibold text-sm transition-all relative ${
              activeTab === 'owner' ? 'text-white' : 'text-gray-400'
            }`}
          >
            오너 채널
            {activeTab === 'owner' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-4 font-semibold text-sm transition-all relative ${
              activeTab === 'reviews' ? 'text-white' : 'text-gray-400'
            }`}
          >
            리뷰 ({restaurant.reviewCount})
            {activeTab === 'reviews' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-4 font-semibold text-sm transition-all relative ${
              activeTab === 'menu' ? 'text-white' : 'text-gray-400'
            }`}
          >
            메뉴판
            {activeTab === 'menu' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />
            )}
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="px-4 py-6 pb-24">
        {activeTab === 'owner' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 ring-2 ring-orange-400 flex items-center justify-center">
                <span className="text-white font-bold">{restaurant.owner.name.charAt(0)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold">{restaurant.owner.name}</p>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full">
                    🏪 오너
                  </span>
                </div>
                <p className="text-gray-400 text-sm">@{restaurant.owner.username}</p>
              </div>
            </div>

            {/* 오너 게시글 샘플 */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white text-sm leading-relaxed mb-3">
                안녕하세요! 오늘 새벽 5시에 직접 다녀온 전주 남부시장 이야기를 해볼까 합니다.
                우리 가게 김치는 전부 이곳에서 직접 가져온 묵은지로 만들어요. 🙏
              </p>
              <img
                src="https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=800&q=80"
                alt="Post"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <span>2시간 전</span>
                <div className="flex items-center gap-4">
                  <span>❤️ 892</span>
                  <span>💬 156</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-white text-sm leading-relaxed mb-3">
                주방 비하인드 공개! 🔥 김치찌개 국물의 비법은 바로...
              </p>
              <div className="flex items-center justify-between text-gray-400 text-xs">
                <span>1일 전</span>
                <div className="flex items-center gap-4">
                  <span>❤️ 567</span>
                  <span>💬 89</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-12 text-gray-400">
            <p>일반 사용자 리뷰 목록</p>
            <p className="text-sm mt-2">곧 제공 예정</p>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="text-center py-12 text-gray-400">
            <p>메뉴판</p>
            <p className="text-sm mt-2">곧 제공 예정</p>
          </div>
        )}
      </div>
    </div>
  )
}
