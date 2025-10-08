'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, MapPin, ChevronLeft, ChevronRight, Star, Send } from 'lucide-react'

interface FoodShort {
  id: string
  restaurantName: string
  username: string
  location: string
  category: string
  imageUrl: string
  description: string
  likes: number
  comments: number
  shares: number
  rating: number
  hashtags: string[]
}

const DUMMY_SHORTS: FoodShort[] = [
  {
    id: '1',
    restaurantName: '할매손맛',
    username: 'grandma_taste',
    location: '강남역',
    category: '한식',
    imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=1200&fit=crop',
    description: '3대째 내려오는 김치찌개 맛집 🔥 할머니가 직접 끓여주시는 진짜 손맛',
    likes: 12500,
    comments: 342,
    shares: 89,
    rating: 4.8,
    hashtags: ['할머니손맛', '김치찌개', '강남맛집']
  },
  {
    id: '2',
    restaurantName: '불타는고기',
    username: 'burning_meat',
    location: '홍대입구',
    category: '고기',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=1200&fit=crop',
    description: '한우 1++등급만 사용 🥩 숯불에 구워드립니다',
    likes: 24300,
    comments: 567,
    shares: 123,
    rating: 4.9,
    hashtags: ['한우', '고기맛집', '홍대']
  },
  {
    id: '3',
    restaurantName: '명동칼국수',
    username: 'myeongdong_noodle',
    location: '명동역',
    category: '칼국수',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=1200&fit=crop',
    description: '손칼국수 직접 뽑아요 🍜 쫄깃쫄깃한 면발의 끝판왕',
    likes: 8900,
    comments: 234,
    shares: 56,
    rating: 4.7,
    hashtags: ['칼국수', '명동', '맛스타그램']
  },
  {
    id: '4',
    restaurantName: '떡볶이천국',
    username: 'tteok_heaven',
    location: '신촌역',
    category: '분식',
    imageUrl: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=800&h=1200&fit=crop',
    description: '로제떡볶이 미쳤다 🌶️ 매운맛 조절 가능 인생떡볶이',
    likes: 15600,
    comments: 445,
    shares: 98,
    rating: 4.8,
    hashtags: ['떡볶이', '로제떡볶이', '신촌']
  },
  {
    id: '5',
    restaurantName: '보양삼계탕',
    username: 'samgyetang_best',
    location: '종로3가',
    category: '한식',
    imageUrl: 'https://images.unsplash.com/photo-1626200419199-391ae4be7c86?w=800&h=1200&fit=crop',
    description: '여름엔 역시 삼계탕 🐔 인삼 듬뿍 들어간 진한 국물',
    likes: 19200,
    comments: 389,
    shares: 145,
    rating: 4.9,
    hashtags: ['삼계탕', '보양식', '종로맛집']
  }
]

export function WebFoodFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [commentText, setCommentText] = useState('')

  const currentShort = DUMMY_SHORTS[currentIndex]
  const isLiked = liked.has(currentShort.id)
  const isSaved = saved.has(currentShort.id)

  const handleLike = () => {
    const newLiked = new Set(liked)
    if (isLiked) {
      newLiked.delete(currentShort.id)
    } else {
      newLiked.add(currentShort.id)
    }
    setLiked(newLiked)
  }

  const handleSave = () => {
    const newSaved = new Set(saved)
    if (isSaved) {
      newSaved.delete(currentShort.id)
    } else {
      newSaved.add(currentShort.id)
    }
    setSaved(newSaved)
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < DUMMY_SHORTS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-black pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[1fr_450px] gap-10">
          {/* 왼쪽: 숏폼 뷰어 */}
          <div className="relative">
            {/* 카드 */}
            <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden aspect-[9/16] max-w-lg mx-auto border border-white/10">
              {/* 배경 이미지 */}
              <img
                src={currentShort.imageUrl}
                alt={currentShort.restaurantName}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent via-40% to-black/95"></div>

              {/* 컨텐츠 */}
              <div className="relative h-full flex flex-col justify-between p-8">
                {/* 상단: 프로필 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-2xl shadow-pink-500/50">
                      {currentShort.restaurantName[0]}
                    </div>
                    <div>
                      <div className="text-white font-bold text-base drop-shadow-2xl">
                        @{currentShort.username}
                      </div>
                      <div className="flex items-center gap-2 text-white/90 text-sm drop-shadow-xl">
                        <MapPin className="w-4 h-4" />
                        {currentShort.location}
                      </div>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white text-sm font-black rounded-full shadow-2xl shadow-pink-500/50 transition-all active:scale-95">
                    팔로우
                  </button>
                </div>

                {/* 하단: 정보 */}
                <div className="space-y-5">
                  <p className="text-white text-lg leading-relaxed drop-shadow-2xl font-semibold">
                    {currentShort.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {currentShort.hashtags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-cyan-300 text-base font-bold drop-shadow-xl hover:text-cyan-200 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-xl">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-black text-base">{currentShort.rating}</span>
                    </div>
                    <div className="px-4 py-2.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 shadow-xl">
                      <span className="text-white font-bold text-sm">{currentShort.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 네비게이션 버튼 */}
              {currentIndex > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-2xl border border-white/20"
                >
                  <ChevronLeft className="w-7 h-7" strokeWidth={3} />
                </button>
              )}

              {currentIndex < DUMMY_SHORTS.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-2xl border border-white/20"
                >
                  <ChevronRight className="w-7 h-7" strokeWidth={3} />
                </button>
              )}

              {/* 진행 인디케이터 */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-black/30 backdrop-blur-xl px-5 py-3 rounded-full border border-white/10">
                {DUMMY_SHORTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? 'w-10 bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg shadow-pink-500/50'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽: 인터랙션 & 댓글 */}
          <div className="space-y-6">
            {/* 액션 버튼들 */}
            <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl border border-white/10">
              <h3 className="font-black text-white text-xl mb-6">참여하기</h3>
              <div className="space-y-4">
                <button
                  onClick={handleLike}
                  className="w-full flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-pink-500/20 hover:to-pink-500/10 rounded-2xl transition-all group border border-white/5 hover:border-pink-500/30"
                >
                  <Heart
                    className={`w-7 h-7 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-400'} group-hover:scale-110 transition-transform`}
                    strokeWidth={2}
                  />
                  <span className="font-black text-white text-lg">
                    {formatNumber(currentShort.likes + (isLiked ? 1 : 0))}
                  </span>
                  <span className="text-gray-400 ml-auto font-semibold">좋아요</span>
                </button>

                <button className="w-full flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-purple-500/20 hover:to-purple-500/10 rounded-2xl transition-all group border border-white/5 hover:border-purple-500/30">
                  <MessageCircle className="w-7 h-7 text-gray-400 group-hover:scale-110 transition-transform" strokeWidth={2} />
                  <span className="font-black text-white text-lg">{formatNumber(currentShort.comments)}</span>
                  <span className="text-gray-400 ml-auto font-semibold">댓글</span>
                </button>

                <button
                  onClick={handleSave}
                  className="w-full flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-yellow-500/20 hover:to-yellow-500/10 rounded-2xl transition-all group border border-white/5 hover:border-yellow-500/30"
                >
                  <Bookmark
                    className={`w-7 h-7 ${isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} group-hover:scale-110 transition-transform`}
                    strokeWidth={2}
                  />
                  <span className="text-gray-400 ml-auto font-semibold">{isSaved ? '저장됨' : '저장'}</span>
                </button>

                <button className="w-full flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-800 hover:from-blue-500/20 hover:to-blue-500/10 rounded-2xl transition-all group border border-white/5 hover:border-blue-500/30">
                  <Share2 className="w-7 h-7 text-gray-400 group-hover:scale-110 transition-transform" strokeWidth={2} />
                  <span className="font-black text-white text-lg">{formatNumber(currentShort.shares)}</span>
                  <span className="text-gray-400 ml-auto font-semibold">공유</span>
                </button>
              </div>
            </div>

            {/* 댓글 섹션 */}
            <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl border border-white/10">
              <h3 className="font-black text-white text-xl mb-6">
                댓글 <span className="text-pink-500">{formatNumber(currentShort.comments)}</span>
              </h3>

              {/* 댓글 입력 */}
              <div className="mb-8">
                <div className="relative">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-800 border border-white/10 text-white rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-500"
                    placeholder="댓글을 입력하세요..."
                    rows={3}
                  ></textarea>
                  <button className="absolute bottom-4 right-4 p-3 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-xl shadow-lg shadow-pink-500/30 transition-all active:scale-95">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 댓글 목록 */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">
                    김
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-white text-base">김맛집</span>
                      <span className="text-sm text-gray-500">2시간 전</span>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      여기 진짜 맛있어요! 강추합니다 👍
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-gray-500 hover:text-pink-400 text-sm font-semibold transition-colors">좋아요</button>
                      <button className="text-gray-500 hover:text-pink-400 text-sm font-semibold transition-colors">답글</button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">
                    이
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-white text-base">이푸디</span>
                      <span className="text-sm text-gray-500">5시간 전</span>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      오 가봐야겠다 ㅎㅎ 위치가 어디죠?
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-gray-500 hover:text-pink-400 text-sm font-semibold transition-colors">좋아요</button>
                      <button className="text-gray-500 hover:text-pink-400 text-sm font-semibold transition-colors">답글</button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl">
                    박
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-white text-base">박먹보</span>
                      <span className="text-sm text-gray-500">1일 전</span>
                    </div>
                    <p className="text-gray-300 text-base leading-relaxed">
                      어제 다녀왔는데 대박이에요!! 인생맛집 인정 🔥
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="text-pink-400 text-sm font-semibold">좋아요 3</button>
                      <button className="text-gray-500 hover:text-pink-400 text-sm font-semibold transition-colors">답글</button>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl transition-all border border-white/10">
                댓글 더보기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
