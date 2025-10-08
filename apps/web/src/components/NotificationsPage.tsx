'use client'

import { useState } from 'react'
import { Heart, MessageCircle, UserPlus, Star, ShoppingBag, Bell, BellOff } from 'lucide-react'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'follow' | 'owner_response' | 'review' | 'badge'
  user: {
    name: string
    username: string
    avatar?: string
    isOwner?: boolean
  }
  content: string
  post?: {
    id: string
    thumbnail?: string
  }
  timestamp: string
  isRead: boolean
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'owner_response',
    user: {
      name: '김사장',
      username: 'mangwon_kimchi_house',
      isOwner: true,
    },
    content: '님의 댓글에 답변을 남겼습니다: "감사합니다! 다음에도 방문해주세요 😊"',
    post: {
      id: '1',
      thumbnail: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=400&q=80',
    },
    timestamp: '5분 전',
    isRead: false,
  },
  {
    id: '2',
    type: 'like',
    user: {
      name: '김맛집',
      username: 'kim_foodie',
    },
    content: '님이 회원님의 게시물을 좋아합니다',
    post: {
      id: '2',
      thumbnail: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80',
    },
    timestamp: '1시간 전',
    isRead: false,
  },
  {
    id: '3',
    type: 'comment',
    user: {
      name: '이푸디',
      username: 'lee_foody',
    },
    content: '님이 댓글을 남겼습니다: "여기 정말 맛있어 보이네요!"',
    post: {
      id: '3',
      thumbnail: 'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=400&q=80',
    },
    timestamp: '2시간 전',
    isRead: false,
  },
  {
    id: '4',
    type: 'follow',
    user: {
      name: '박셰프',
      username: 'chef_park',
    },
    content: '님이 회원님을 팔로우하기 시작했습니다',
    timestamp: '3시간 전',
    isRead: true,
  },
  {
    id: '5',
    type: 'badge',
    user: {
      name: 'K-Food Shorts',
      username: 'system',
    },
    content: '축하합니다! 신뢰도 점수가 80점을 달성했습니다 🎉',
    timestamp: '5시간 전',
    isRead: true,
  },
  {
    id: '6',
    type: 'review',
    user: {
      name: '최미식가',
      username: 'gourmet_choi',
    },
    content: '님이 회원님이 방문한 맛집에 리뷰를 남겼습니다',
    post: {
      id: '4',
      thumbnail: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&q=80',
    },
    timestamp: '1일 전',
    isRead: true,
  },
  {
    id: '7',
    type: 'like',
    user: {
      name: '정라면',
      username: 'ramen_jung',
    },
    content: '님이 회원님의 댓글을 좋아합니다',
    timestamp: '1일 전',
    isRead: true,
  },
  {
    id: '8',
    type: 'comment',
    user: {
      name: '강맛탐험',
      username: 'kang_explorer',
    },
    content: '님이 댓글을 남겼습니다: "저도 가보고 싶어요!"',
    post: {
      id: '5',
      thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
    },
    timestamp: '2일 전',
    isRead: true,
  },
]

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
    case 'comment':
      return <MessageCircle className="w-5 h-5 text-blue-400" />
    case 'follow':
      return <UserPlus className="w-5 h-5 text-purple-400" />
    case 'owner_response':
      return <Star className="w-5 h-5 text-orange-400" />
    case 'review':
      return <MessageCircle className="w-5 h-5 text-green-400" />
    case 'badge':
      return <ShoppingBag className="w-5 h-5 text-yellow-400" />
    default:
      return <Bell className="w-5 h-5 text-gray-400" />
  }
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
  }

  const filteredNotifications = notifications.filter(notif =>
    filter === 'all' ? true : !notif.isRead
  )

  const todayNotifications = filteredNotifications.filter(n =>
    n.timestamp.includes('분 전') || n.timestamp.includes('시간 전')
  )
  const weekNotifications = filteredNotifications.filter(n =>
    n.timestamp.includes('일 전')
  )
  const olderNotifications = filteredNotifications.filter(n =>
    !n.timestamp.includes('분 전') && !n.timestamp.includes('시간 전') && !n.timestamp.includes('일 전')
  )

  return (
    <div className="min-h-screen bg-black pb-20 lg:pb-0">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-black text-white">알림</h1>
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-pink-500 hover:text-pink-400 font-semibold transition-colors"
            >
              모두 읽음
            </button>
          </div>

          {/* 필터 버튼 */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              읽지 않음
            </button>
          </div>
        </div>
      </div>

      {/* 알림 목록 */}
      <div className="px-4 py-6">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <BellOff className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-1">알림이 없습니다</p>
            <p className="text-sm">새로운 알림이 도착하면 여기에 표시됩니다</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 오늘 */}
            {todayNotifications.length > 0 && (
              <div>
                <h2 className="text-white font-bold text-sm mb-3 px-2">오늘</h2>
                <div className="space-y-2">
                  {todayNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                        notification.isRead
                          ? 'bg-white/5 hover:bg-white/10'
                          : 'bg-white/10 border border-pink-500/30 hover:bg-white/[0.15]'
                      }`}
                    >
                      {/* 아이콘 */}
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* 사용자 아바타 */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.user.isOwner
                          ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 ring-2 ring-orange-400'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        <span className="text-white font-bold text-sm">
                          {notification.user.name.charAt(0)}
                        </span>
                      </div>

                      {/* 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold text-sm">
                            {notification.user.name}
                          </span>
                          {notification.user.isOwner && (
                            <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold rounded-full">
                              오너
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {notification.content}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{notification.timestamp}</p>
                      </div>

                      {/* 게시물 썸네일 */}
                      {notification.post && (
                        <img
                          src={notification.post.thumbnail}
                          alt="Post"
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      )}

                      {/* 읽지 않음 표시 */}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 이번 주 */}
            {weekNotifications.length > 0 && (
              <div>
                <h2 className="text-white font-bold text-sm mb-3 px-2">이번 주</h2>
                <div className="space-y-2">
                  {weekNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                        notification.isRead
                          ? 'bg-white/5 hover:bg-white/10'
                          : 'bg-white/10 border border-pink-500/30 hover:bg-white/[0.15]'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.user.isOwner
                          ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 ring-2 ring-orange-400'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        <span className="text-white font-bold text-sm">
                          {notification.user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold text-sm">
                            {notification.user.name}
                          </span>
                          {notification.user.isOwner && (
                            <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold rounded-full">
                              오너
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {notification.content}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{notification.timestamp}</p>
                      </div>
                      {notification.post && (
                        <img
                          src={notification.post.thumbnail}
                          alt="Post"
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 이전 */}
            {olderNotifications.length > 0 && (
              <div>
                <h2 className="text-white font-bold text-sm mb-3 px-2">이전</h2>
                <div className="space-y-2">
                  {olderNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleMarkAsRead(notification.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                        notification.isRead
                          ? 'bg-white/5 hover:bg-white/10'
                          : 'bg-white/10 border border-pink-500/30 hover:bg-white/[0.15]'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        notification.user.isOwner
                          ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 ring-2 ring-orange-400'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        <span className="text-white font-bold text-sm">
                          {notification.user.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-semibold text-sm">
                            {notification.user.name}
                          </span>
                          {notification.user.isOwner && (
                            <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold rounded-full">
                              오너
                            </span>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {notification.content}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">{notification.timestamp}</p>
                      </div>
                      {notification.post && (
                        <img
                          src={notification.post.thumbnail}
                          alt="Post"
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
