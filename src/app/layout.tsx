import type { Metadata, Viewport } from 'next'
import './globals.css'
import { cn } from '@/shared/lib/utils'
import { dmSans, suit } from '@/shared/lib/fonts'
// import { Metadatas } from '@/features/common/metadata'
import { Providers } from '@/providers'
import { Toaster } from '@/shared/components/ui/toaster'

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1.0,
  minimumScale: 1.0,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'PWA NextJS',
  description: "It's a simple progressive web application made with NextJS",
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['pwa', 'next-pwa'],
  authors: [
    {
      name: 'jungwoo',
      url: 'https://www.linkedin.com/in/%EC%A0%95%EC%9A%B0-%EB%A5%98-9574552a4/',
    },
  ],
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon.png' },
    { rel: 'icon', url: 'icons/icon.png' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={cn(suit.variable, dmSans.variable, 'bg-gray-01 font-dm-suit')}>
        <Providers>
          <div className="mx-auto min-h-screen max-w-mobile shadow-lg">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
