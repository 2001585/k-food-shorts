'use client'

import { useState, useEffect } from 'react'
import { RestaurantCard } from './RestaurantCard'

// 임시 더미 데이터
const dummyRestaurants = [
  {
    id: '1',
    name: '맛있는 한정식',
    category: '한식',
    location: '서울시 강남구',
    rating: 4.5,
    priceRange: 2,
    description: '정통 한정식을 맛볼 수 있는 곳입니다.',
    imageUrl: 'https://via.placeholder.com/400x600/FF3B30/FFFFFF?text=Korean+Food',
    tags: ['인기', '주차가능'],
  },
  {
    id: '2',
    name: '이탈리안 레스토랑',
    category: '양식',
    location: '서울시 홍대',
    rating: 4.2,
    priceRange: 3,
    description: '정통 이탈리안 요리를 선보입니다.',
    imageUrl: 'https://via.placeholder.com/400x600/FF9500/FFFFFF?text=Italian+Food',
    tags: ['로맨틱', '데이트'],
  },
  {
    id: '3',
    name: '라멘집',
    category: '일식',
    location: '서울시 신촌',
    rating: 4.7,
    priceRange: 1,
    description: '진짜 일본식 라멘을 맛보세요.',
    imageUrl: 'https://via.placeholder.com/400x600/34C759/FFFFFF?text=Japanese+Ramen',
    tags: ['저렴', '혼밥'],
  },
]

export function RestaurantFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setCurrentIndex(prev => 
          prev < dummyRestaurants.length - 1 ? prev + 1 : prev
        )
      } else if (event.key === 'ArrowUp') {
        setCurrentIndex(prev => prev > 0 ? prev - 1 : prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {dummyRestaurants.map((restaurant, index) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          isActive={index === currentIndex}
        />
      ))}
    </div>
  )
}