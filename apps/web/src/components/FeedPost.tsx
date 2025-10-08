'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical } from 'lucide-react'
import { PostDetailModal } from './PostDetailModal'
import { RestaurantProfile } from './RestaurantProfile'

interface FeedPostProps {
  post: {
    id: string
    user: {
      name: string
      username: string
      avatar?: string
      isOwner?: boolean
      restaurantName?: string
    }
    content: string
    image?: string
    likes: number
    comments: number
    timestamp: string
    isLiked?: boolean
    isSaved?: boolean
  }
}

export function FeedPost({ post }: FeedPostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [likes, setLikes] = useState(post.likes)
  const [showModal, setShowModal] = useState(false)
  const [showRestaurantProfile, setShowRestaurantProfile] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  return (
    <article className="w-full bg-black border-b border-white/10">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            post.user.isOwner
              ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 ring-2 ring-orange-400'
              : 'bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500'
          }`}>
            {post.user.avatar ? (
              <img src={post.user.avatar} alt={post.user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-white font-bold text-sm">
                {post.user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-white font-semibold text-sm">{post.user.name}</p>
              {post.user.isOwner && (
                <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  🏪 오너
                </span>
              )}
            </div>
            <p className="text-gray-400 text-xs">
              @{post.user.username}
              {post.user.isOwner && post.user.restaurantName && (
                <>
                  <span className="text-gray-600"> · </span>
                  <button
                    onClick={() => setShowRestaurantProfile(true)}
                    className="text-orange-400 hover:text-orange-300 transition-colors underline"
                  >
                    {post.user.restaurantName}
                  </button>
                </>
              )}
              {' · '}{post.timestamp}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-white text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full">
          <img
            src={post.image}
            alt="Post content"
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-all ${
                isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
              }`}
            >
              <Heart
                className={`w-6 h-6 ${isLiked ? 'fill-pink-500' : ''}`}
              />
              <span className="text-sm font-medium">{likes}</span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>

            <button className="text-gray-400 hover:text-green-400 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          <button
            onClick={handleSave}
            className={`transition-colors ${
              isSaved ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-orange-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <PostDetailModal
          post={post}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Restaurant Profile */}
      {showRestaurantProfile && post.user.isOwner && post.user.restaurantName && (
        <RestaurantProfile
          restaurant={{
            id: '1',
            name: post.user.restaurantName,
            category: '한식 · 김치찌개 전문',
            address: '서울 마포구 망원동 123-45',
            phone: '02-123-4567',
            hours: '매일 10:00 - 22:00',
            rating: 4.8,
            reviewCount: 892,
            image: post.image || 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=800&q=80',
            description: '30년 전통의 묵은지 김치찌개 전문점입니다. 전주 남부시장에서 직접 공수한 재료로 매일 정성스럽게 준비합니다.',
            owner: {
              name: post.user.name,
              username: post.user.username,
            },
          }}
          onClose={() => setShowRestaurantProfile(false)}
        />
      )}
    </article>
  )
}
