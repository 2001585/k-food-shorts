'use client'

import { useState } from 'react'
import { X, Camera, Upload } from 'lucide-react'

interface ProfileEditModalProps {
  onClose: () => void
  onSave: (data: ProfileData) => void
}

interface ProfileData {
  name: string
  username: string
  bio: string
  location: string
  avatar?: string
}

export function ProfileEditModal({ onClose, onSave }: ProfileEditModalProps) {
  const [formData, setFormData] = useState<ProfileData>({
    name: '내 계정',
    username: 'my_account',
    bio: '맛집 탐험가 🍽️ | 서울 & 경기 중심 | 숨은 맛집을 찾아다닙니다',
    location: '서울, 대한민국',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // 실제 구현에서는 파일 업로드 처리
      console.log('Avatar upload:', file)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            취소
          </button>
          <h2 className="text-white font-bold text-lg">프로필 편집</h2>
          <button
            onClick={handleSubmit}
            className="text-pink-500 hover:text-pink-400 font-semibold transition-colors"
          >
            완료
          </button>
        </div>

        {/* 콘텐츠 */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 프로필 사진 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center ring-4 ring-white/10">
                <span className="text-white font-bold text-3xl">
                  {formData.name.charAt(0)}
                </span>
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-pink-500 rounded-full cursor-pointer hover:bg-pink-600 transition-colors shadow-lg">
                <Camera className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-gray-400 text-sm mt-3">프로필 사진 변경</p>
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              이름
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/5 text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500 focus:outline-none transition-colors"
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* 사용자명 */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              사용자명
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-white/5 text-white placeholder-gray-500 pl-8 pr-4 py-3 rounded-xl border border-white/10 focus:border-pink-500 focus:outline-none transition-colors"
                placeholder="사용자명"
              />
            </div>
            <p className="text-gray-500 text-xs mt-2">
              다른 사용자가 회원님을 찾을 때 사용하는 고유한 사용자명입니다
            </p>
          </div>

          {/* 소개 */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              소개
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-white/5 text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500 focus:outline-none transition-colors resize-none"
              placeholder="자신을 소개해보세요"
              rows={4}
              maxLength={150}
            />
            <p className="text-gray-500 text-xs mt-2 text-right">
              {formData.bio.length} / 150
            </p>
          </div>

          {/* 위치 */}
          <div>
            <label className="block text-gray-400 text-sm font-semibold mb-2">
              위치
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-white/5 text-white placeholder-gray-500 px-4 py-3 rounded-xl border border-white/10 focus:border-pink-500 focus:outline-none transition-colors"
              placeholder="위치를 입력하세요"
            />
          </div>

          {/* 오너 계정 전환 */}
          <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-white font-bold mb-1">오너 계정으로 전환</h3>
                <p className="text-gray-400 text-sm">
                  식당 사장님이신가요? 오너 계정으로 전환하고 고객과 직접 소통하세요
                </p>
              </div>
            </div>
            <button
              type="button"
              className="w-full mt-3 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              오너 계정 신청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
