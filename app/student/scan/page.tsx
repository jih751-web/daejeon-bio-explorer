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
    <main className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">QR코드를 스캔해주세요</h1>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {notFound && <p className="text-amber-600 text-sm mb-4">{notFound}</p>}
      <video ref={videoRef} className="w-full rounded-lg" playsInline muted />
      <canvas ref={canvasRef} className="hidden" />
      <a href={`/student/search?code=${code}&nickname=${nickname}`} className="block text-blue-600 underline mt-4">
        대신 이름으로 찾기
      </a>
      <a href={`/student/quiz?code=${code}&nickname=${nickname}`} className="block text-blue-600 underline mt-2">
        퀴즈 풀기
      </a>
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
