import type { Metadata, Viewport } from 'next'
import '@/styles/main.scss'


export const metadata: Metadata = {
  title: 'Adam Ottosson - Dev',
  description: 'Full-Stack Developer - Portfolio showcasing projects, skills, and experience.',
  icons: {
    icon: [
      {
        url: '/images/ao-logo-white.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/ao-logo-white.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/ao-logo-white.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        {children}
      </body>
    </html>
  )
}
