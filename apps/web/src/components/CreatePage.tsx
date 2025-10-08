'use client'

import { useState } from 'react'
import { X, Image, Video, MapPin, Users, ChevronDown, Sparkles, CheckCircle } from 'lucide-react'

type PostType = 'feed' | 'shorts'

interface CreatePageProps {
  onPostCreated?: (post: any) => void
}

export function CreatePage({ onPostCreated }: CreatePageProps) {
  const [postType, setPostType] = useState<PostType>('feed')
  const [content, setContent] = useState('')
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string>('')
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('')
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false)
  const [privacy, setPrivacy] = useState<'public' | 'followers' | 'private'>('public')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // 실제 구현에서는 파일 업로드 처리
      const imageUrls = Array.from(files).map(() =>
        'https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=800&q=80'
      )
      setSelectedImages([...selectedImages, ...imageUrls])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 실제 구현에서는 비디오 업로드 처리
      setSelectedVideo('https://images.unsplash.com/photo-1582731129524-2c6e20a42f2e?w=800&q=80')
    }
  }

  const handlePost = () => {
    const newPost = {
      id: `post-${Date.now()}`,
      type: postType,
      user: {
        name: '내 계정',
        username: 'my_account',
      },
      content,
      image: postType === 'feed' ? selectedImages[0] : selectedVideo,
      thumbnail: postType === 'feed' ? selectedImages[0] : selectedVideo,
      likes: 0,
      comments: 0,
      timestamp: '방금',
      isLiked: false,
      isSaved: false,
      location: selectedLocation,
    }

    // 성공 모달 표시
    setShowSuccessModal(true)

    // 2초 후 콜백 호출 및 모달 닫기
    setTimeout(() => {
      if (onPostCreated) {
        onPostCreated(newPost)
      }
      setShowSuccessModal(false)

      // Reset form
      setContent('')
      setSelectedImages([])
      setSelectedVideo('')
      setSelectedLocation('')
      setPrivacy('public')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black pb-20 lg:pb-0">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-white">만들기</h1>
            <button
              onClick={handlePost}
              disabled={!content.trim() && selectedImages.length === 0 && !selectedVideo}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                content.trim() || selectedImages.length > 0 || selectedVideo
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl'
                  : 'bg-white/10 text-gray-500 cursor-not-allowed'
              }`}
            >
              게시
            </button>
          </div>
        </div>
      </div>

      {/* 포스트 타입 선택 */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
          <button
            onClick={() => setPostType('feed')}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
              postType === 'feed'
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📝 일반 게시글
          </button>
          <button
            onClick={() => setPostType('shorts')}
            className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
              postType === 'shorts'
                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎬 쇼츠
          </button>
        </div>
      </div>

      {/* 작성 영역 */}
      <div className="px-4 py-6">
        {/* 사용자 프로필 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">나</span>
          </div>
          <div>
            <p className="text-white font-semibold">내 계정</p>
            <button
              onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
              className="flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>
                {privacy === 'public' && '전체 공개'}
                {privacy === 'followers' && '팔로워만'}
                {privacy === 'private' && '나만 보기'}
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* 공개 범위 메뉴 */}
        {showPrivacyMenu && (
          <div className="mb-4 bg-white/5 border border-white/10 rounded-xl p-2">
            <button
              onClick={() => {
                setPrivacy('public')
                setShowPrivacyMenu(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <div className="font-semibold">전체 공개</div>
              <div className="text-xs text-gray-400">모든 사용자가 볼 수 있습니다</div>
            </button>
            <button
              onClick={() => {
                setPrivacy('followers')
                setShowPrivacyMenu(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <div className="font-semibold">팔로워만</div>
              <div className="text-xs text-gray-400">나를 팔로우하는 사람만 볼 수 있습니다</div>
            </button>
            <button
              onClick={() => {
                setPrivacy('private')
                setShowPrivacyMenu(false)
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <div className="font-semibold">나만 보기</div>
              <div className="text-xs text-gray-400">나만 볼 수 있습니다</div>
            </button>
          </div>
        )}

        {/* 콘텐츠 입력 */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            postType === 'feed'
              ? '무슨 생각을 하고 계신가요? 맛집을 공유해보세요!'
              : '쇼츠에 대한 설명을 작성해보세요...'
          }
          className="w-full bg-transparent text-white placeholder-gray-500 text-lg resize-none focus:outline-none min-h-[200px]"
        />

        {/* AI 추천 */}
        <div className="mb-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition-colors">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">AI로 내용 개선하기</span>
          </button>
        </div>

        {/* 이미지 프리뷰 */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-6">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative aspect-square bg-white/5 rounded-xl overflow-hidden">
                <img src={img} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))}
                  className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 위치 표시 */}
        {selectedLocation && (
          <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
            <MapPin className="w-5 h-5 text-pink-500" />
            <span className="text-white font-semibold flex-1">{selectedLocation}</span>
            <button
              onClick={() => setSelectedLocation('')}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          {postType === 'feed' ? (
            <>
              <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl cursor-pointer transition-colors">
                <Image className="w-5 h-5" />
                <span className="text-sm font-semibold">사진</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <label className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl cursor-pointer transition-colors">
              <Video className="w-5 h-5" />
              <span className="text-sm font-semibold">동영상</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
            </label>
          )}

          <button
            onClick={() => setShowLocationPicker(!showLocationPicker)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-semibold">위치</span>
          </button>
        </div>

        {/* 위치 선택 */}
        {showLocationPicker && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">위치 검색</h3>
            <input
              type="text"
              placeholder="맛집 이름이나 주소를 검색하세요"
              className="w-full bg-white/5 text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500 focus:outline-none transition-colors mb-3"
            />
            <div className="space-y-2">
              {['망원동 김치찌개', '성수 브런치 카페', '이태원 정통 라멘'].map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    setSelectedLocation(location)
                    setShowLocationPicker(false)
                  }}
                  className="w-full px-4 py-3 text-left text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-500" />
                    <span className="font-semibold">{location}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 ml-6">서울시 마포구</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 쇼츠 전용 안내 */}
        {postType === 'shorts' && (
          <div className="mt-6 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 border border-pink-500/30 rounded-xl p-4">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Video className="w-5 h-5 text-pink-500" />
              쇼츠 제작 팁
            </h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• 세로 형식(9:16)의 동영상을 권장합니다</li>
              <li>• 영상 길이는 15초~60초가 적당합니다</li>
              <li>• 첫 3초가 가장 중요합니다</li>
              <li>• 음식의 맛과 분위기를 생생하게 전달하세요</li>
            </ul>
          </div>
        )}
      </div>

      {/* 성공 모달 */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl p-8 mx-4 text-center animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">게시 완료!</h3>
            <p className="text-gray-400 text-sm">
              {postType === 'feed' ? '홈 피드' : '쇼츠'}로 이동합니다...
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
