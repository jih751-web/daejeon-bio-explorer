import './globals.css'

export const metadata = { title: '대전중앙과학관 생물탐사' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50">{children}</body>
    </html>
  )
}
