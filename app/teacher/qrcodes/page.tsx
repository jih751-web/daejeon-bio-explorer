'use client'
import { useSyncExternalStore } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { SPECIES } from '@/data/species'

const noopSubscribe = () => () => {}

export default function QrCodesPage() {
  const origin = useSyncExternalStore(
    noopSubscribe,
    () => window.location.origin,
    () => ''
  )

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="print:hidden mb-6">
        <h1 className="text-xl font-bold mb-2">전시물 QR코드</h1>
        <p className="text-sm text-slate-500 mb-4">
          각 카드를 잘라서 해당 전시물 옆에 붙여주세요. 인쇄 버튼을 누르면 이 안내와 배경색은 빠지고 QR코드만 깔끔하게 인쇄돼요.
        </p>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          인쇄하기
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 print:grid-cols-2 print:gap-4">
        {SPECIES.map((s) => (
          <div
            key={s.id}
            className="border rounded-lg p-4 text-center flex flex-col items-center print:break-inside-avoid"
          >
            <QRCodeSVG value={origin ? `${origin}/student/species/${s.id}` : s.id} size={140} />
            <p className="font-bold mt-3">{s.koreanName}</p>
            <p className="text-xs text-slate-500">{s.scientificName}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
