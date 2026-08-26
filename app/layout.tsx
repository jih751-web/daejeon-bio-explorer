import { Jua, Noto_Sans_KR } from 'next/font/google'
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister'
import './globals.css'

const jua = Jua({ subsets: ['latin'], weight: '400', variable: '--font-jua' })
const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], weight: ['400', '500', '700', '900'], variable: '--font-noto-sans-kr' })

export const metadata = { title: '대전중앙과학관 생물탐사' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${jua.variable} ${notoSansKR.variable}`}>
      <body className="min-h-screen bg-background text-foreground">
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  )
}
