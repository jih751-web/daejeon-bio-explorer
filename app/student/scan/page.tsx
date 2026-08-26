'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import jsQR from 'jsqr'
import { findSpeciesById } from '@/data/species'

function extractSpeciesId(raw: string): string {
  const trimmed = raw.trim()
  const match = trimmed.match(/\/student\/species\/([^/?#]+)/)
  return match ? decodeURIComponent(match[1]) : trimmed
}

function ScanContent() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    let rafId: number
    let cancelled = false

    async function start() {
      try {
        const acquiredStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (cancelled) {
          acquiredStream.getTracks().forEach((t) => t.stop())
          return
        }
        stream = acquiredStream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        tick()
      } catch {
        if (!cancelled) setError('카메라를 사용할 수 없어요. 권한을 확인해주세요.')
      }
    }

    function tick() {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const result = jsQR(imageData.data, imageData.width, imageData.height)
          if (result) {
            const species = findSpeciesById(extractSpeciesId(result.data))
            if (species) {
              router.push(`/student/species/${species.id}?code=${code}&nickname=${nickname}`)
              return
            } else {
              setNotFound('등록되지 않은 QR코드예요. 다른 전시물을 스캔해보세요.')
            }
          }
        }
      }
      rafId = requestAnimationFrame(tick)
    }

    start()
    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [code, nickname, router])

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col">
      <div className="px-6 pt-7 pb-1.5 flex flex-col items-center gap-1 text-center shrink-0">
        <h1 className="font-display text-2xl text-[color:var(--color-forest-deep)]">QR코드를 찾아주세요</h1>
        <p className="text-sm text-neutral-500">전시물 옆 안내판의 QR을 네모 칸에 맞춰보세요</p>
      </div>

      {error && <p className="text-[color:var(--color-coral)] text-sm text-center px-6 pt-3">{error}</p>}
      {notFound && <p className="text-[color:var(--color-sun-deep)] text-sm text-center px-6 pt-3">{notFound}</p>}

      <div className="mx-6 mt-5 rounded-[32px] relative overflow-hidden aspect-[10/9.7]" style={{ background: 'linear-gradient(180deg, #16241c 0%, #0d1712 100%)' }}>
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 text-white text-xs px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          스캔 중
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square">
          <div className="absolute top-0 left-0 w-9 h-9 border-t-[5px] border-l-[5px] rounded-tl-2xl" style={{ borderColor: 'var(--color-sun)' }} />
          <div className="absolute top-0 right-0 w-9 h-9 border-t-[5px] border-r-[5px] rounded-tr-2xl" style={{ borderColor: 'var(--color-sun)' }} />
          <div className="absolute bottom-0 left-0 w-9 h-9 border-b-[5px] border-l-[5px] rounded-bl-2xl" style={{ borderColor: 'var(--color-sun)' }} />
          <div className="absolute bottom-0 right-0 w-9 h-9 border-b-[5px] border-r-[5px] rounded-br-2xl" style={{ borderColor: 'var(--color-sun)' }} />
          <div
            className="absolute left-[6%] w-[88%] h-[3px] rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, var(--color-sun), transparent)',
              boxShadow: '0 0 10px 1px oklch(0.78 0.16 80 / 0.8)',
              animation: 'scan-sweep 2.6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 px-6 pt-6 pb-7 mt-auto">
        <a
          href={`/student/search?code=${code}&nickname=${nickname}`}
          className="h-[58px] rounded-2xl bg-white flex items-center gap-3 px-4 font-bold text-[15px] shadow-[0_8px_18px_-10px_oklch(0.35_0.08_150_/_0.3)]"
        >
          <span className="w-9 h-9 rounded-xl bg-sky-soft flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="var(--color-sky)" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="var(--color-sky)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          대신 이름으로 찾기
          <svg className="ml-auto text-neutral-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
        <a
          href={`/student/quiz?code=${code}&nickname=${nickname}`}
          className="h-[58px] rounded-2xl bg-white flex items-center gap-3 px-4 font-bold text-[15px] shadow-[0_8px_18px_-10px_oklch(0.35_0.08_150_/_0.3)]"
        >
          <span className="w-9 h-9 rounded-xl bg-forest-soft flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 3 7l9 5 9-5-9-5Z" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
              <path d="M3 12l9 5 9-5" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
            </svg>
          </span>
          퀴즈 풀기
          <svg className="ml-auto text-neutral-400" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </main>
  )
}

export default function ScanPage() {
  return (
    <Suspense fallback={<main className="p-4 text-center">불러오는 중...</main>}>
      <ScanContent />
    </Suspense>
  )
}
