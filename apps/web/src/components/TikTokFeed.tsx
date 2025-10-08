'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Play, Pause } from 'lucide-react'

interface FoodShort {
  id: string
  restaurantName: string
  location: string
  category: string
  imageUrl: string
  description: string
  likes: number
  comments: number
  shares: number
}

const DUMMY_SHORTS: FoodShort[] = [
  {
    id: '1',
    restaurantName: '할매손맛',
    location: '강남역',
    category: '한식',
    imageUrl: 'https://images.unsplash.com/photo-1583224994533-bdfd5df38e83?w=1080&h=1920&fit=crop',
    description: '3대째 내려오는 김치찌개 맛집 🔥 #할머니손맛 #김치찌개 #강남맛집',
    likes: 12500,
    comments: 342,
    shares: 89
  },
  {
    id: '2',
    restaurantName: '불타는고기',
    location: '홍대입구',
    category: '고기',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1080&h=1920&fit=crop',
    description: '한우 1++등급만 사용 🥩 진짜 맛있음 ㅇㅈ? #한우 #고기맛집 #홍대',
    likes: 24300,
    comments: 567,
    shares: 123
  },
  {
    id: '3',
    restaurantName: '명동칼국수',
    location: '명동역',
    category: '칼국수',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1080&h=1920&fit=crop',
    description: '손칼국수 직접 뽑아요 🍜 쫄깃쫄깃 #칼국수 #명동 #맛스타그램',
    likes: 8900,
    comments: 234,
    shares: 56
  },
  {
    id: '4',
    restaurantName: '떡볶이천국',
    location: '신촌역',
    category: '분식',
    imageUrl: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=1080&h=1920&fit=crop',
    description: '로제떡볶이 미쳤다 🌶️ 매운맛 조절 가능 #떡볶이 #로제떡볶이 #신촌',
    likes: 15600,
    comments: 445,
    shares: 98
  },
  {
    id: '5',
    restaurantName: '보양삼계탕',
    location: '종로3가',
    category: '한식',
    imageUrl: 'https://images.unsplash.com/photo-1626200419199-391ae4be7c86?w=1080&h=1920&fit=crop',
    description: '여름엔 역시 삼계탕 🐔 인삼 듬뿍 #삼계탕 #보양식 #종로맛집',
    likes: 19200,
    comments: 389,
    shares: 145
  }
]

export function TikTokFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const currentShort = DUMMY_SHORTS[currentIndex]
  const isLiked = liked.has(currentShort.id)
  const isSaved = saved.has(currentShort.id)

  // 좋아요 토글
  const handleLike = () => {
    const newLiked = new Set(liked)
    if (isLiked) {
      newLiked.delete(currentShort.id)
    } else {
      newLiked.add(currentShort.id)
    }
    setLiked(newLiked)
  }

  // 저장 토글
  const handleSave = () => {
    const newSaved = new Set(saved)
    if (isSaved) {
      newSaved.delete(currentShort.id)
    } else {
      newSaved.add(currentShort.id)
    }
    setSaved(newSaved)
  }

  // 터치/스와이프 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // 위로 스와이프 - 다음
      if (currentIndex < DUMMY_SHORTS.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    if (touchStart - touchEnd < -50) {
      // 아래로 스와이프 - 이전
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }
  }

  // 휠 이벤트로 전환 (데스크톱)
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentIndex < DUMMY_SHORTS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else if (e.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* 풀스크린 배경 이미지 */}
      <div className="absolute inset-0">
        <img
          src={currentShort.imageUrl}
          alt={currentShort.restaurantName}
          className="w-full h-full object-cover transition-opacity duration-300"
          style={{ objectPosition: 'center' }}
        />
        {/* 어두운 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80"></div>
      </div>

      {/* 상단 헤더 */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-lg">팔로잉</span>
            <span className="text-white/60 font-semibold text-lg">추천</span>
          </div>
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 우측 액션 버튼들 */}
      <div className="absolute right-3 bottom-28 z-20 flex flex-col items-center gap-5">
        {/* 프로필 사진 */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-black p-[2px]">
              <img
                src={`https://ui-avatars.com/api/?name=${currentShort.restaurantName}&background=random&size=48`}
                alt={currentShort.restaurantName}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center border-2 border-black">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
            </svg>
          </div>
        </div>

        {/* 좋아요 */}
        <button onClick={handleLike} className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
          <Heart
            className={`w-9 h-9 ${isLiked ? 'fill-pink-500 text-pink-500' : 'text-white'} drop-shadow-lg`}
            strokeWidth={1.5}
          />
          <span className="text-white text-xs font-semibold drop-shadow-lg">
            {formatNumber(currentShort.likes + (isLiked ? 1 : 0))}
          </span>
        </button>

        {/* 댓글 */}
        <button className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
          <MessageCircle className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={1.5} />
          <span className="text-white text-xs font-semibold drop-shadow-lg">
            {formatNumber(currentShort.comments)}
          </span>
        </button>

        {/* 저장 */}
        <button onClick={handleSave} className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
          <Bookmark
            className={`w-9 h-9 ${isSaved ? 'fill-yellow-400 text-yellow-400' : 'text-white'} drop-shadow-lg`}
            strokeWidth={1.5}
          />
          <span className="text-white text-xs font-semibold drop-shadow-lg">저장</span>
        </button>

        {/* 공유 */}
        <button className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
          <Share2 className="w-9 h-9 text-white drop-shadow-lg" strokeWidth={1.5} />
          <span className="text-white text-xs font-semibold drop-shadow-lg">
            {formatNumber(currentShort.shares)}
          </span>
        </button>

        {/* 더보기 */}
        <button className="flex flex-col items-center gap-1 group active:scale-90 transition-transform">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>

      {/* 하단 정보 */}
      <div className="absolute left-0 right-0 bottom-20 z-10 px-4 pb-4">
        <div className="space-y-3">
          {/* 음식점 정보 */}
          <div className="flex items-center gap-2">
            <h2 className="text-white text-lg font-bold drop-shadow-lg">
              @{currentShort.restaurantName}
            </h2>
            <span className="px-2 py-0.5 bg-pink-500 text-white text-xs font-bold rounded">
              팔로우
            </span>
          </div>

          {/* 설명 */}
          <p className="text-white text-sm leading-relaxed drop-shadow-lg">
            {currentShort.description}
          </p>

          {/* 위치 & 카테고리 */}
          <div className="flex items-center gap-3 text-white/90 text-sm">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{currentShort.location}</span>
            </div>
            <span>·</span>
            <span>{currentShort.category}</span>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 힌트 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {DUMMY_SHORTS.map((_, idx) => (
          <div
            key={idx}
            className={`h-0.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}