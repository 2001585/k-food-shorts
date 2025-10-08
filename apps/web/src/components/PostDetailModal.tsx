'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Heart, MessageCircle, Share2, Bookmark, MoreVertical, Send } from 'lucide-react'

interface Comment {
  id: string
  user: {
    name: string
    username: string
    avatar?: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked?: boolean
  trustScore?: number
  isVerified?: boolean
  hasVisitProof?: boolean
  hasPaymentProof?: boolean
}

interface PostDetailModalProps {
  post: {
    id: string
    user: {
      name: string
      username: string
      avatar?: string
    }
    content: string
    image?: string
    likes: number
    comments: number
    timestamp: string
    isLiked?: boolean
    isSaved?: boolean
  }
  onClose: () => void
}

// 샘플 댓글 데이터
const SAMPLE_COMMENTS: Comment[] = [
  {
    id: '1',
    user: { name: '김맛집', username: 'kim_foodie' },
    content: '여기 진짜 맛있어요! 강추합니다 👍',
    timestamp: '2시간 전',
    likes: 12,
    isLiked: false,
    trustScore: 95,
    isVerified: true,
    hasVisitProof: true,
    hasPaymentProof: true,
  },
  {
    id: '2',
    user: { name: '이푸디', username: 'lee_foody' },
    content: '이거 위치가 어디에요? 가보고 싶네요',
    timestamp: '5시간 전',
    likes: 8,
    isLiked: true,
    trustScore: 72,
    isVerified: true,
    hasVisitProof: true,
    hasPaymentProof: false,
  },
  {
    id: '3',
    user: { name: '박셰프', username: 'chef_park' },
    content: '저도 어제 다녀왔는데 정말 맛있더라구요! 특히 김치찌개 국물이 끝내줍니다',
    timestamp: '7시간 전',
    likes: 15,
    isLiked: false,
  },
  {
    id: '4',
    user: { name: '최미식가', username: 'gourmet_choi' },
    content: '가격도 착하고 양도 많아서 좋아요',
    timestamp: '10시간 전',
    likes: 6,
    isLiked: false,
  },
  {
    id: '5',
    user: { name: '정라면', username: 'ramen_jung' },
    content: '여기 사장님도 엄청 친절하셔요 ㅎㅎ',
    timestamp: '12시간 전',
    likes: 9,
    isLiked: false,
  },
  {
    id: '6',
    user: { name: '강맛탐험', username: 'kang_explorer' },
    content: '주차 가능한가요??',
    timestamp: '15시간 전',
    likes: 3,
    isLiked: false,
  },
  {
    id: '7',
    user: { name: '윤디저트', username: 'yoon_dessert' },
    content: '여기 점심시간에 가면 웨이팅 있어요 참고하세요~',
    timestamp: '18시간 전',
    likes: 11,
    isLiked: false,
  },
  {
    id: '8',
    user: { name: '서울먹방', username: 'seoul_mukbang' },
    content: '다음주에 꼭 가봐야겠어요! 정보 감사합니다',
    timestamp: '1일 전',
    likes: 5,
    isLiked: false,
  },
]

export function PostDetailModal({ post, onClose }: PostDetailModalProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [isSaved, setIsSaved] = useState(post.isSaved || false)
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(SAMPLE_COMMENTS)
  const [newComment, setNewComment] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 모달 열릴 때 body 스크롤 방지
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
        }
      }
      return comment
    }))
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `new-${Date.now()}`,
      user: { name: '나', username: 'me' },
      content: newComment,
      timestamp: '방금',
      likes: 0,
      isLiked: false,
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl h-[90vh] bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* 왼쪽: 이미지 (데스크톱) */}
        {post.image && (
          <div className="hidden lg:flex lg:flex-1 bg-black items-center justify-center">
            <img
              src={post.image}
              alt="Post content"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}

        {/* 오른쪽: 게시글 정보 및 댓글 */}
        <div className="flex-1 lg:w-[500px] flex flex-col bg-black">
          {/* 게시글 헤더 */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {post.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{post.user.name}</p>
                <p className="text-gray-400 text-xs">@{post.user.username}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* 이미지 (모바일) */}
          {post.image && (
            <div className="lg:hidden w-full bg-black flex items-center justify-center border-b border-white/10">
              <img
                src={post.image}
                alt="Post content"
                className="w-full max-h-[300px] object-cover"
              />
            </div>
          )}

          {/* 게시글 내용 */}
          <div className="px-4 py-4 border-b border-white/10">
            <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
            <p className="text-gray-500 text-xs mt-2">{post.timestamp}</p>
          </div>

          {/* 액션 버튼 */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-all ${
                    isLiked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-pink-500' : ''}`} />
                  <span className="text-sm font-medium">{likes}</span>
                </button>

                <div className="flex items-center gap-2 text-gray-400">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-sm font-medium">{comments.length}</span>
                </div>

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

          {/* 댓글 필터 */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-pink-500 text-white text-xs font-semibold rounded-full">
                전체
              </button>
              <button className="px-3 py-1.5 bg-white/5 text-gray-400 hover:text-white text-xs font-semibold rounded-full transition-colors">
                인증 리뷰만
              </button>
              <button className="px-3 py-1.5 bg-white/5 text-gray-400 hover:text-white text-xs font-semibold rounded-full transition-colors">
                사진있음
              </button>
            </div>
          </div>

          {/* 댓글 리스트 (스크롤 가능) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {comment.user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-semibold text-sm">{comment.user.name}</span>
                      {comment.trustScore && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-xs ${
                                i < Math.floor(comment.trustScore! / 20)
                                  ? 'text-yellow-400'
                                  : 'text-gray-600'
                              }`}
                            >
                              ⭐
                            </span>
                          ))}
                          <span className="text-gray-400 text-xs ml-1">
                            신뢰도 {comment.trustScore}점
                          </span>
                        </div>
                      )}
                    </div>
                    {comment.isVerified && (
                      <div className="flex items-center gap-2 mt-1">
                        {comment.hasVisitProof && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                            ✓ 방문인증
                          </span>
                        )}
                        {comment.hasPaymentProof && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                            ✓ 결제인증
                          </span>
                        )}
                      </div>
                    )}
                    <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`text-xs transition-colors ${
                          comment.isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'
                        }`}
                      >
                        좋아요 {comment.likes > 0 && `· ${comment.likes}`}
                      </button>
                      <button className="text-gray-500 hover:text-blue-400 text-xs transition-colors">
                        답글
                      </button>
                      <span className="text-gray-600 text-xs">{comment.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 댓글 입력 */}
          <form onSubmit={handleSubmitComment} className="px-4 py-3 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">나</span>
              </div>
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`transition-colors ${
                  newComment.trim()
                    ? 'text-pink-500 hover:text-pink-400'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
