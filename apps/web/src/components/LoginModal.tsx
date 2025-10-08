'use client'

import { useState } from 'react'
import { X, Mail, Lock, User } from 'lucide-react'

interface LoginModalProps {
  onClose: () => void
  onLoginSuccess: () => void
}

export function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 실제 API 연동
    onLoginSuccess()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 모달 컨텐츠 */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-black bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                K
              </span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {isLogin ? '로그인' : '회원가입'}
            </h2>
            <p className="text-white/80 text-sm mt-2">
              {isLogin ? 'K-Food Shorts에 오신 것을 환영합니다' : '새로운 맛집 여행을 시작하세요'}
            </p>
          </div>

          {/* 폼 */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  이름
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    placeholder="홍길동"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span className="text-gray-600">로그인 상태 유지</span>
                </label>
                <button type="button" className="text-pink-600 font-semibold hover:text-pink-700">
                  비밀번호 찾기
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 transition-all active:scale-95"
            >
              {isLogin ? '로그인' : '회원가입'}
            </button>

            {/* SNS 로그인 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl transition-all active:scale-95"
              >
                카카오
              </button>
              <button
                type="button"
                className="py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                네이버
              </button>
              <button
                type="button"
                className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all active:scale-95"
              >
                Google
              </button>
            </div>

            {/* 전환 버튼 */}
            <div className="text-center pt-4 border-t border-gray-100">
              <span className="text-gray-600">
                {isLogin ? '계정이 없으신가요?' : '이미 계정이 있으신가요?'}
              </span>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-pink-600 font-bold hover:text-pink-700 transition-colors"
              >
                {isLogin ? '회원가입' : '로그인'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
