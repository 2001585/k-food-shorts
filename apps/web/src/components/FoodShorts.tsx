'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, MapPin } from 'lucide-react'

interface FoodShort {
  id: string
  restaurantName: string
  username: string
  location: string
  category: string
  gradientFrom: string
  gradientTo: string
  emoji: string
  description: string
  likes: number
  comments: number
  shares: number
  hashtags: string[]
}

const DUMMY_SHORTS: FoodShort[] = [
  {
    id: '1',
    restaurantName: '할매손맛',
    username: 'grandma_taste',
    location: '강남역',
    category: '한식',
    gradientFrom: '#FF6B6B',
    gradientTo: '#C92A2A',
    emoji: '🍲',
    description: '3대째 내려오는 김치찌개 맛집 🔥 할머니가 직접 끓여주시는 진짜 손맛',
    likes: 12500,
    comments: 342,
    shares: 89,
    hashtags: ['할머니손맛', '김치찌개', '강남맛집']
  },
  {
    id: '2',
    restaurantName: '불타는고기',
    username: 'burning_meat',
    location: '홍대입구',
    category: '고기',
    gradientFrom: '#FA5252',
    gradientTo: '#E8590C',
    emoji: '🥩',
    description: '한우 1++등급만 사용 🥩 숯불에 구워드립니다',
    likes: 24300,
    comments: 567,
    shares: 123,
    hashtags: ['한우', '고기맛집', '홍대']
  },
  {
    id: '3',
    restaurantName: '명동칼국수',
    username: 'myeongdong_noodle',
    location: '명동역',
    category: '칼국수',
    gradientFrom: '#FFD43B',
    gradientTo: '#F59F00',
    emoji: '🍜',
    description: '손칼국수 직접 뽑아요 🍜 쫄깃쫄깃한 면발의 끝판왕',
    likes: 8900,
    comments: 234,
    shares: 56,
    hashtags: ['칼국수', '명동', '맛스타그램']
  },
  {
    id: '4',
    restaurantName: '떡볶이천국',
    username: 'tteok_heaven',
    location: '신촌역',
    category: '분식',
    gradientFrom: '#FF6B9D',
    gradientTo: '#C92A2A',
    emoji: '🌶️',
    description: '로제떡볶이 미쳤다 🌶️ 매운맛 조절 가능 인생떡볶이',
    likes: 15600,
    comments: 445,
    shares: 98,
    hashtags: ['떡볶이', '로제떡볶이', '신촌']
  },
  {
    id: '5',
    restaurantName: '보양삼계탕',
    username: 'samgyetang_best',
    location: '종로3가',
    category: '한식',
    gradientFrom: '#FAB005',
    gradientTo: '#E8590C',
    emoji: '🐔',
    description: '여름엔 역시 삼계탕 🐔 인삼 듬뿍 들어간 진한 국물',
    likes: 19200,
    comments: 389,
    shares: 145,
    hashtags: ['삼계탕', '보양식', '종로맛집']
  }
]

export function FoodShorts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [muted, setMuted] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [startY, setStartY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
    setIsDragging(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    const endY = e.changedTouches[0].clientY
    const diff = startY - endY

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < DUMMY_SHORTS.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }
    setIsDragging(false)
  }

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    if (e.deltaY > 30 && currentIndex < DUMMY_SHORTS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (e.deltaY < -30 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && currentIndex < DUMMY_SHORTS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      window.addEventListener('keydown', handleKeyDown)

      return () => {
        container.removeEventListener('wheel', handleWheel)
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [currentIndex])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen h-screen max-h-screen overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full max-w-[480px] mx-auto bg-black shadow-2xl">
        {/* 애니메이션 배경 */}
        <div
          className="absolute inset-0 transition-all duration-700 ease-out"
          style={{
            background: `linear-gradient(135deg, ${currentShort.gradientFrom} 0%, ${currentShort.gradientTo} 50%, #000000 100%)`
          }}
        >
          {/* 애니메이션 원 효과 */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-300"></div>

          {/* 음식 이모지 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none">
            <div className="text-[280px] leading-none animate-float">{currentShort.emoji}</div>
          </div>

          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent via-40% to-black/95"></div>
        </div>

        {/* 상단 헤더 */}
        <div className="absolute top-0 left-0 right-0 z-30 px-6 pt-14 pb-6 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button className="text-white font-bold text-xl relative group">
                팔로잉
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
              </button>
              <button className="text-white/60 font-semibold text-xl hover:text-white/80 transition-colors">
                추천
              </button>
            </div>
            <button className="text-white p-2 hover:bg-white/10 rounded-full transition-all active:scale-95">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* 우측 액션 버튼 */}
        <div className="absolute right-4 bottom-36 z-20 flex flex-col items-center gap-7">
          {/* 프로필 */}
          <div className="relative group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 p-[3px] shadow-2xl shadow-pink-500/50 group-hover:shadow-pink-500/70 transition-all">
              <div className="w-full h-full rounded-full bg-black p-[2px]">
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-2xl font-black text-white transition-transform group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${currentShort.gradientFrom}, ${currentShort.gradientTo})` }}
                >
                  {currentShort.restaurantName[0]}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl shadow-pink-500/50 group-hover:scale-110 transition-transform cursor-pointer">
              <svg className="w-4 h-4 text-white font-bold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              </svg>
            </div>
          </div>

          {/* 좋아요 */}
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-2 group active:scale-90 transition-all"
          >
            <div className={`relative ${isLiked ? 'animate-heartbeat' : ''}`}>
              <Heart
                className={`w-12 h-12 ${
                  isLiked
                    ? 'fill-pink-500 text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]'
                    : 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]'
                } transition-all group-hover:scale-110`}
                strokeWidth={2}
              />
              {isLiked && (
                <div className="absolute inset-0 animate-ping">
                  <Heart className="w-12 h-12 fill-pink-500 text-pink-500 opacity-75" strokeWidth={2} />
                </div>
              )}
            </div>
            <span className="text-white text-sm font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {formatNumber(currentShort.likes + (isLiked ? 1 : 0))}
            </span>
          </button>

          {/* 댓글 */}
          <button className="flex flex-col items-center gap-2 group active:scale-90 transition-all">
            <MessageCircle
              className="w-12 h-12 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform"
              strokeWidth={2}
            />
            <span className="text-white text-sm font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {formatNumber(currentShort.comments)}
            </span>
          </button>

          {/* 저장 */}
          <button
            onClick={handleSave}
            className="flex flex-col items-center gap-2 group active:scale-90 transition-all"
          >
            <Bookmark
              className={`w-12 h-12 ${
                isSaved
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]'
                  : 'text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]'
              } transition-all group-hover:scale-110`}
              strokeWidth={2}
            />
            <span className="text-white text-xs font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {isSaved ? '저장됨' : '저장'}
            </span>
          </button>

          {/* 공유 */}
          <button className="flex flex-col items-center gap-2 group active:scale-90 transition-all">
            <Share2
              className="w-12 h-12 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] group-hover:scale-110 transition-transform"
              strokeWidth={2}
            />
            <span className="text-white text-sm font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {formatNumber(currentShort.shares)}
            </span>
          </button>

          {/* 음소거 */}
          <button
            onClick={() => setMuted(!muted)}
            className="flex flex-col items-center gap-2 group active:scale-90 transition-all mt-3"
          >
            <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center shadow-xl group-hover:bg-black/40 transition-all">
              {muted ? (
                <VolumeX className="w-6 h-6 text-white" strokeWidth={2.5} />
              ) : (
                <Volume2 className="w-6 h-6 text-white" strokeWidth={2.5} />
              )}
            </div>
          </button>
        </div>

        {/* 하단 정보 */}
        <div className="absolute left-0 right-0 bottom-28 z-10 px-6 pb-6 space-y-4">
          {/* 유저네임 + 팔로우 */}
          <div className="flex items-center gap-4 animate-slideup">
            <h2 className="text-white text-2xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              @{currentShort.username}
            </h2>
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 active:scale-95 text-white text-base font-black rounded-full shadow-2xl shadow-pink-500/50 transition-all">
              팔로우
            </button>
          </div>

          {/* 설명 */}
          <p className="text-white text-lg leading-relaxed drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] font-semibold">
            {currentShort.description}
          </p>

          {/* 해시태그 */}
          <div className="flex flex-wrap gap-2.5">
            {currentShort.hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="text-cyan-300 text-base font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] hover:text-cyan-200 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 위치 & 카테고리 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
              <MapPin className="w-4 h-4 text-pink-400" strokeWidth={2.5} />
              <span className="text-white font-bold text-sm">{currentShort.location}</span>
            </div>
            <div className="bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-xl">
              <span className="text-white font-bold text-sm">{currentShort.category}</span>
            </div>
          </div>
        </div>

        {/* 하단 진행 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
          {DUMMY_SHORTS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? 'w-10 bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg shadow-pink-500/50'
                  : idx < currentIndex
                  ? 'w-2 bg-white/70'
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* 스와이프 힌트 */}
        {currentIndex === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 flex flex-col items-center gap-3 animate-bounce pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <p className="text-white text-base font-black drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/20 backdrop-blur-md px-5 py-2 rounded-full">
              위로 스와이프
            </p>
          </div>
        )}
      </div>
    </div>
  )
}