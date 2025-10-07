import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'K-Food Shorts',
  description: '공공데이터 기반 음식점 숏폼 콘텐츠 플랫폼',
  keywords: ['food', 'shorts', 'korean', 'restaurant', 'public data'],
  authors: [{ name: '2001585', email: 'hoonso20@kunsan.ac.kr' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#FF3B30',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <main className="min-h-screen bg-black">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}