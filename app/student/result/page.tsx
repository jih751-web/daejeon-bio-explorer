'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { SpeciesCandidate } from '@/lib/types'

function ResultContent() {
  const params = useSearchParams()
  const router = useRouter()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const photoUrl = params.get('photoUrl')!

  const [candidates, setCandidates] = useState<SpeciesCandidate[] | null>(null)
  const [lowConfidence, setLowConfidence] = useState(false)
  const [description, setDescription] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function run() {
      const identifyRes = await fetch('/api/identify', {
        method: 'POST',
        body: JSON.stringify({ photoUrl }),
      })
      if (!identifyRes.ok) {
        setError('인식에 실패했어요. 잠시 후 다시 시도해주세요')
        return
      }
      const identifyData = await identifyRes.json()
      setCandidates(identifyData.candidates)
      setLowConfidence(identifyData.lowConfidence)

      const top = identifyData.candidates[0]
      if (top) {
        const describeRes = await fetch('/api/describe', {
          method: 'POST',
          body: JSON.stringify({ scientificName: top.scientificName, koreanName: top.koreanName }),
        })
        if (describeRes.ok) {
          const describeData = await describeRes.json()
          setDescription(describeData.text)
        }
      }
    }
    run()
  }, [photoUrl])

  async function handleSave() {
    const top = candidates?.[0]
    if (!top) return
    const res = await fetch('/api/observations', {
      method: 'POST',
      body: JSON.stringify({
        code,
        nickname,
        photoUrl,
        speciesName: top.koreanName ?? top.scientificName,
        confidence: top.confidence,
        description,
      }),
    })
    if (!res.ok) {
      setError('저장에 실패했어요. 다시 시도해주세요')
      return
    }
    setSaved(true)
  }

  if (error) return <main className="p-8 text-center text-red-600">{error}</main>
  if (!candidates) return <main className="p-8 text-center">분석 중이에요...</main>

  return (
    <main className="p-8 max-w-md mx-auto">
      <img src={photoUrl} alt="촬영한 생물" className="w-full rounded-lg mb-4" />
      <p className="text-xs text-slate-500 mb-4">AI 참고용 추정 결과이며 정확하지 않을 수 있습니다</p>

      {lowConfidence && (
        <p className="text-amber-600 text-sm mb-4">
          확신도가 낮아요. 다른 각도에서 다시 찍어볼까요?
        </p>
      )}

      {candidates.length === 0 && <p>비슷한 생물을 찾지 못했어요.</p>}

      {candidates.map((c, i) => (
        <div key={i} className="border rounded-lg p-3 mb-2">
          <p className="font-bold">{c.koreanName ?? c.scientificName}</p>
          <p className="text-xs text-slate-500">{c.scientificName} · 신뢰도 {Math.round(c.confidence * 100)}%</p>
        </div>
      ))}

      {description && <p className="text-sm mt-4 mb-6">{description}</p>}

      {candidates.length > 0 && (
        <button
          onClick={handleSave}
          disabled={saved}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mb-3"
        >
          {saved ? '저장됨' : '내 기록에 저장'}
        </button>
      )}
      <button
        onClick={() => router.push(`/student/capture?code=${code}&nickname=${nickname}`)}
        className="w-full border py-3 rounded-lg"
      >
        다른 생물 찍기
      </button>
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={<main className="p-8 text-center">로딩 중...</main>}>
      <ResultContent />
    </Suspense>
  )
}
