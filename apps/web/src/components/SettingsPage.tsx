'use client'

import { useState } from 'react'
import {
  ChevronRight,
  Bell,
  Lock,
  Eye,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  Moon,
  Globe,
  Volume2,
  Smartphone,
  Trash2,
  Download
} from 'lucide-react'

interface SettingsPageProps {
  onLogout: () => void
}

export function SettingsPage({ onLogout }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    ownerReplies: true,
    posts: true,
  })

  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    showActivity: true,
    allowMessages: true,
  })

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="min-h-screen bg-black pb-20 lg:pb-0">
      {/* 헤더 */}
      <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-black text-white">설정</h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* 계정 설정 */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3 px-2">계정</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">비밀번호 변경</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="border-t border-white/10" />

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">연결된 계정</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="border-t border-white/10" />

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">내 데이터 다운로드</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 알림 설정 */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3 px-2">알림</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">좋아요</span>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={notifications.likes}
                    onChange={(e) => setNotifications({ ...notifications, likes: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-white/10 peer-checked:bg-pink-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <p className="text-gray-500 text-xs ml-8">내 게시물에 좋아요를 받았을 때</p>
            </div>

            <div className="border-t border-white/10" />

            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">댓글</span>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={notifications.comments}
                    onChange={(e) => setNotifications({ ...notifications, comments: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-white/10 peer-checked:bg-pink-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <p className="text-gray-500 text-xs ml-8">새로운 댓글이 달렸을 때</p>
            </div>

            <div className="border-t border-white/10" />

            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">팔로우</span>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={notifications.follows}
                    onChange={(e) => setNotifications({ ...notifications, follows: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-white/10 peer-checked:bg-pink-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <p className="text-gray-500 text-xs ml-8">새로운 팔로워가 생겼을 때</p>
            </div>

            <div className="border-t border-white/10" />

            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">오너 응답</span>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={notifications.ownerReplies}
                    onChange={(e) => setNotifications({ ...notifications, ownerReplies: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-white/10 peer-checked:bg-pink-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <p className="text-gray-500 text-xs ml-8">사장님이 내 댓글에 답변했을 때</p>
            </div>
          </div>
        </div>

        {/* 개인정보 보호 */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3 px-2">개인정보 보호</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">비공개 계정</span>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={privacy.privateAccount}
                    onChange={(e) => setPrivacy({ ...privacy, privateAccount: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-white/10 peer-checked:bg-pink-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <p className="text-gray-500 text-xs ml-8">승인한 사람만 내 게시물을 볼 수 있습니다</p>
            </div>

            <div className="border-t border-white/10" />

            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">활동 상태 표시</span>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={privacy.showActivity}
                    onChange={(e) => setPrivacy({ ...privacy, showActivity: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-white/10 peer-checked:bg-pink-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <p className="text-gray-500 text-xs ml-8">다른 사람에게 내 활동 상태를 표시합니다</p>
            </div>

            <div className="border-t border-white/10" />

            <div className="px-4 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-400" />
                  <span className="text-white font-medium">메시지 허용</span>
                </div>
                <label className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={privacy.allowMessages}
                    onChange={(e) => setPrivacy({ ...privacy, allowMessages: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-full h-full bg-white/10 peer-checked:bg-pink-500 rounded-full transition-colors cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                </label>
              </div>
              <p className="text-gray-500 text-xs ml-8">모든 사람이 메시지를 보낼 수 있습니다</p>
            </div>
          </div>
        </div>

        {/* 앱 설정 */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3 px-2">앱</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">다크 모드</span>
              </div>
              <span className="text-gray-400 text-sm">항상</span>
            </button>

            <div className="border-t border-white/10" />

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">언어</span>
              </div>
              <span className="text-gray-400 text-sm">한국어</span>
            </button>

            <div className="border-t border-white/10" />

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">자동 재생</span>
              </div>
              <span className="text-gray-400 text-sm">Wi-Fi만</span>
            </button>
          </div>
        </div>

        {/* 지원 */}
        <div>
          <h2 className="text-white font-bold text-sm mb-3 px-2">지원</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">고객 센터</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="border-t border-white/10" />

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">이용약관</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <div className="border-t border-white/10" />

            <button className="w-full flex items-center justify-between px-4 py-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">개인정보 처리방침</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 위험 영역 */}
        <div>
          <h2 className="text-red-500 font-bold text-sm mb-3 px-2">위험 영역</h2>
          <div className="bg-white/5 border border-red-500/30 rounded-xl overflow-hidden">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-red-500/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">로그아웃</span>
              </div>
            </button>

            <div className="border-t border-red-500/30" />

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-between px-4 py-4 hover:bg-red-500/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium">계정 삭제</span>
              </div>
            </button>
          </div>
        </div>

        {/* 버전 정보 */}
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">K-Food Shorts v1.0.0</p>
          <p className="text-gray-600 text-xs mt-1">© 2024 K-Food Shorts. All rights reserved.</p>
        </div>
      </div>

      {/* 계정 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border border-red-500/30 rounded-2xl p-6 mx-4">
            <h3 className="text-white font-bold text-xl mb-3">계정을 삭제하시겠습니까?</h3>
            <p className="text-gray-400 text-sm mb-6">
              이 작업은 되돌릴 수 없습니다. 모든 게시물, 댓글, 좋아요가 영구적으로 삭제됩니다.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => {
                  console.log('Account deleted')
                  setShowDeleteConfirm(false)
                }}
                className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
