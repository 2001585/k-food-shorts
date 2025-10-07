'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share, Bookmark, Star, MapPin } from 'lucide-react'
import { ActionButton } from './ActionButton'

interface Restaurant {
  id: string
  name: string
  category: string
  location: string
  rating: number
  priceRange: number
  description: string
  imageUrl: string
  tags: string[]
}

interface RestaurantCardProps {
  restaurant: Restaurant
  isActive: boolean
}

export function RestaurantCard({ restaurant, isActive }: RestaurantCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleComment = () => {
    console.log('Comment clicked')
  }

  const handleShare = () => {
    console.log('Share clicked')
  }

  const getPriceString = (range: number) => {
    return '₩'.repeat(range)
  }

  return (
    <motion.div
      className="h-screen snap-start relative overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="restaurant-card"
    >
      {/* 배경 이미지/비디오 */}
      <div className="absolute inset-0">
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      {/* 액션 버튼 */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-4 z-10">
        <ActionButton 
          icon={Heart} 
          onClick={handleLike} 
          active={isLiked}
          count="1.2K"
          data-testid="like-button"
        />
        <ActionButton 
          icon={MessageCircle} 
          onClick={handleComment}
          count="89"
        />
        <ActionButton 
          icon={Share} 
          onClick={handleShare}
          count="34"
        />
        <ActionButton 
          icon={Bookmark} 
          onClick={handleBookmark} 
          active={isBookmarked}
        />
      </div>

      {/* 정보 섹션 */}
      <div className="absolute bottom-0 left-0 right-16 p-4 text-white z-10">
        <div className="space-y-2">
          {/* 태그 */}
          <div className="flex gap-2">
            {restaurant.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 음식점명 */}
          <h2 
            className="text-2xl font-bold"
            data-testid="restaurant-name"
          >
            {restaurant.name}
          </h2>

          {/* 위치 및 카테고리 */}
          <div className="flex items-center gap-4 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span data-testid="restaurant-location">{restaurant.location}</span>
            </div>
            <span data-testid="restaurant-category">·</span>
            <span>{restaurant.category}</span>
          </div>

          {/* 평점 및 가격 */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span data-testid="restaurant-rating">{restaurant.rating}</span>
            </div>
            <span>·</span>
            <span>{getPriceString(restaurant.priceRange)}</span>
          </div>

          {/* 설명 */}
          <p className="text-sm opacity-80 line-clamp-2">
            {restaurant.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}