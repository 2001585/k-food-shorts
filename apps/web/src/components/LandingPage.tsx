'use client'

import { useState } from 'react'
import { Heart, MapPin, TrendingUp, Users, Play, Star, ArrowRight } from 'lucide-react'

export function LandingPage({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-black">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/50">
              <span className="text-white text-2xl font-black">F</span>
            </div>
            <h1 className="text-3xl font-black text-white">
              Foodfie
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLogin}
              className="px-6 py-2.5 text-white font-bold hover:text-pink-400 transition-colors"
            >
              로그인
            </button>
            <button
              onClick={onLogin}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white font-black rounded-full shadow-2xl shadow-pink-500/50 transition-all active:scale-95 hover:shadow-pink-500/80"
            >
              시작하기
            </button>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* 배경 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 왼쪽: 텍스트 */}
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500/20 to-orange-500/20 backdrop-blur-md border border-pink-500/30 rounded-full">
                <TrendingUp className="w-5 h-5 text-pink-400" />
                <span className="text-sm font-bold text-pink-300">나만의 맛집 발견 플랫폼</span>
              </div>

              <h2 className="text-7xl lg:text-8xl font-black leading-none">
                <span className="block text-white mb-4">숏폼으로</span>
                <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                  만나는 맛집
                </span>
              </h2>

              <p className="text-2xl text-gray-300 leading-relaxed">
                스와이프 한 번으로 발견하는 숨은 맛집들.<br />
                <span className="text-pink-400 font-bold">틱톡처럼 재미있게</span>, <span className="text-purple-400 font-bold">인스타처럼 아름답게</span>.
              </p>

              <div className="flex items-center gap-6 pt-4">
                <button
                  onClick={onLogin}
                  className="group px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white text-xl font-black rounded-2xl shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/80 transition-all active:scale-95 flex items-center gap-3"
                >
                  무료로 시작하기
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 통계 */}
              <div className="grid grid-cols-3 gap-8 pt-12">
                <div className="space-y-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">맛집 정보</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">활성 사용자</div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-black bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    100K+
                  </div>
                  <div className="text-sm text-gray-400 font-semibold">리뷰</div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 미리보기 그리드 */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {/* 카드 1 */}
                <div className="relative rounded-3xl overflow-hidden aspect-[9/14] shadow-2xl group hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop"
                    alt="Korean Food"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        할
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">@할매손맛</div>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin className="w-3 h-3" />
                          강남역
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                        <span className="font-bold">12.5K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                {/* 카드 2 */}
                <div className="relative rounded-3xl overflow-hidden aspect-[9/14] shadow-2xl mt-12 group hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=600&fit=crop"
                    alt="Korean BBQ"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        불
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">@불타는고기</div>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin className="w-3 h-3" />
                          홍대입구
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                        <span className="font-bold">24.3K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">4.9</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                {/* 카드 3 */}
                <div className="relative rounded-3xl overflow-hidden aspect-[9/14] shadow-2xl -mt-6 group hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=600&fit=crop"
                    alt="Korean Noodles"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        명
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">@명동칼국수</div>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin className="w-3 h-3" />
                          명동역
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                        <span className="font-bold">8.9K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">4.7</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                {/* 카드 4 */}
                <div className="relative rounded-3xl overflow-hidden aspect-[9/14] shadow-2xl group hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=400&h=600&fit=crop"
                    alt="Tteokbokki"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                        떡
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">@떡볶이천국</div>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <MapPin className="w-3 h-3" />
                          신촌역
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                        <span className="font-bold">15.6K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">4.8</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-6xl font-black text-white mb-6">왜 Foodfie인가?</h3>
            <p className="text-2xl text-gray-400">새로운 방식의 맛집 발견</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="group relative p-10 bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-xl rounded-3xl border border-pink-500/20 hover:border-pink-500/40 transition-all hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-pink-500/50 group-hover:shadow-pink-500/80 transition-all">
                <MapPin className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <h4 className="text-3xl font-black text-white mb-4">위치 기반 추천</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                내 주변 맛집을 실시간으로 발견하세요
              </p>
            </div>

            <div className="group relative p-10 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/50 group-hover:shadow-purple-500/80 transition-all">
                <Heart className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <h4 className="text-3xl font-black text-white mb-4">큐레이션 피드</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                당신의 취향에 맞는 맛집만 추천
              </p>
            </div>

            <div className="group relative p-10 bg-gradient-to-br from-orange-500/10 to-transparent backdrop-blur-xl rounded-3xl border border-orange-500/20 hover:border-orange-500/40 transition-all hover:scale-105">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-orange-500/50 group-hover:shadow-orange-500/80 transition-all">
                <Users className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <h4 className="text-3xl font-black text-white mb-4">실시간 리뷰</h4>
              <p className="text-lg text-gray-300 leading-relaxed">
                진짜 사용자들의 생생한 후기
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-orange-500/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-orange-500/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <h3 className="text-7xl font-black text-white mb-8">
            지금 바로 시작하세요
          </h3>
          <p className="text-3xl text-gray-300 mb-12">
            무료로 가입하고 숨은 맛집을 발견하세요
          </p>
          <button
            onClick={onLogin}
            className="group px-16 py-6 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 text-white text-2xl font-black rounded-2xl shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/80 transition-all hover:scale-105 flex items-center gap-4 mx-auto"
          >
            시작하기
            <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="relative py-16 px-6 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/50">
              <span className="text-white text-xl font-black">F</span>
            </div>
            <span className="text-2xl font-black text-white">Foodfie</span>
          </div>
          <p className="text-gray-500 text-lg">
            © 2025 Foodfie. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
