'use client'

import { useState, useRef } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical, Volume2, VolumeX } from 'lucide-react'

interface Short {
  id: string
  user: {
    name: string
    username: string
    avatar?: string
  }
  videoUrl: string
  thumbnail: string
  title: string
  description: string
  likes: number
  comments: number
  shares: number
  isLiked?: boolean
  isSaved?: boolean
}

const SAMPLE_SHORTS: Short[] = [
  {
    id: '1',
    user: {
      name: '서울맛집러',
      username: 'seoul_foodie',
    },
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    title: '망원동 김치찌개 맛집',
    description: '진짜 집밥 같은 김치찌개 💯 #망원동맛집 #김치찌개',
    likes: 2340,
    comments: 156,
    shares: 89,
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    user: {
      name: '부산푸디',
      username: 'busan_eats',
    },
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=400&q=80',
    title: '해운대 돼지국밥 맛집',
    description: '새벽 6시부터 영업하는 현지인 맛집 🍲 #부산맛집',
    likes: 5670,
    comments: 234,
    shares: 145,
    isLiked: true,
    isSaved: false,
  },
  {
    id: '3',
    user: {
      name: '디저트헌터',
      username: 'dessert_hunter',
    },
    videoUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
    title: '성수동 딸기 파르페',
    description: '완전 미쳤다 이 집... 딸기 진짜 많아요 🍓 #성수동카페',
    likes: 8920,
    comments: 456,
    shares: 267,
    isLiked: false,
    isSaved: true,
  },
]

interface ShortsCardProps {
  short: Short
}

function ShortsCard({ short }: ShortsCardProps) {
  const [isLiked, setIsLiked] = useState(short.isLiked || false)
  const [isSaved, setIsSaved] = useState(short.isSaved || false)
  const [isMuted, setIsMuted] = useState(true)
  const [likes, setLikes] = useState(short.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K'
    }
    return count.toString()
  }

  return (
    <div className="relative w-full h-screen snap-start bg-black flex items-center justify-center py-4">
      {/* Video Container - 세로 형태, 더 긴 높이 */}
      <div className="relative w-full max-w-md h-[92vh] bg-black rounded-2xl overflow-hidden shadow-2xl">
        {/* Video/Image Background */}
        <div className="absolute inset-0">
          <img
            src={short.thumbnail}
            alt={short.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {short.user.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm drop-shadow-lg">{short.user.name}</p>
              <p className="text-white/80 text-xs drop-shadow-lg">@{short.user.username}</p>
            </div>
          </div>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-white drop-shadow-lg" />
          </button>
        </div>

        {/* Right Side Actions - 더 작고 컴팩트하게 */}
        <div className="absolute right-3 bottom-28 z-20 flex flex-col gap-4">
          <button
            onClick={handleLike}
            className="flex flex-col items-center gap-0.5 group"
          >
            <div className={`p-2 rounded-full transition-all ${
              isLiked ? 'bg-pink-500/20' : 'bg-white/10 hover:bg-white/20'
            }`}>
              <Heart
                className={`w-5 h-5 transition-all ${
                  isLiked ? 'fill-pink-500 text-pink-500' : 'text-white drop-shadow-lg'
                }`}
              />
            </div>
            <span className="text-white text-[10px] font-semibold drop-shadow-lg">
              {formatCount(likes)}
            </span>
          </button>

          <button className="flex flex-col items-center gap-0.5 group">
            <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <MessageCircle className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
            <span className="text-white text-[10px] font-semibold drop-shadow-lg">
              {formatCount(short.comments)}
            </span>
          </button>

          <button className="flex flex-col items-center gap-0.5 group">
            <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              <Share2 className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
            <span className="text-white text-[10px] font-semibold drop-shadow-lg">
              {formatCount(short.shares)}
            </span>
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex flex-col items-center gap-0.5 group"
          >
            <div className={`p-2 rounded-full transition-all ${
              isSaved ? 'bg-orange-500/20' : 'bg-white/10 hover:bg-white/20'
            }`}>
              <Bookmark
                className={`w-5 h-5 transition-all ${
                  isSaved ? 'fill-orange-500 text-orange-500' : 'text-white drop-shadow-lg'
                }`}
              />
            </div>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center gap-0.5 group"
          >
            <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white drop-shadow-lg" />
              ) : (
                <Volume2 className="w-5 h-5 text-white drop-shadow-lg" />
              )}
            </div>
          </button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-16 left-0 right-0 px-4 z-10 pr-16">
          <h3 className="text-white font-bold text-base drop-shadow-lg mb-1">
            {short.title}
          </h3>
          <p className="text-white text-sm drop-shadow-lg">
            {short.description}
          </p>
        </div>
      </div>
    </div>
  )
}

interface ShortsFeedProps {
  newShorts?: any[]
}

export function ShortsFeed({ newShorts = [] }: ShortsFeedProps) {
  const allShorts = [...newShorts, ...SAMPLE_SHORTS]

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide bg-black">
      {allShorts.map((short, index) => (
        <div key={short.id} className="relative">
          {/* 이전 쇼츠 미리보기 (위) */}
          {index > 0 && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-md h-16 opacity-30 pointer-events-none z-0">
              <div className="w-full h-full rounded-t-2xl overflow-hidden">
                <img
                  src={allShorts[index - 1].thumbnail}
                  alt="Previous"
                  className="w-full h-full object-cover blur-sm"
                />
              </div>
            </div>
          )}

          <ShortsCard short={short} />

          {/* 다음 쇼츠 미리보기 (아래) */}
          {index < allShorts.length - 1 && (
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md h-16 opacity-30 pointer-events-none z-0">
              <div className="w-full h-full rounded-b-2xl overflow-hidden">
                <img
                  src={allShorts[index + 1].thumbnail}
                  alt="Next"
                  className="w-full h-full object-cover blur-sm"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
