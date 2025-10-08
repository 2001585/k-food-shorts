import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: 'Foodfie',
  description: '나만의 맛집을 발견하는 숏폼 플랫폼',
  keywords: ['food', 'shorts', 'restaurant', 'foodie'],
  authors: [{ name: '2001585', email: 'hoonso20@kunsan.ac.kr' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#ea2a33',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className={`${plusJakartaSans.className} font-display bg-white dark:bg-zinc-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}