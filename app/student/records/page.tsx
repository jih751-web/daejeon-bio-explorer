'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Observation } from '@/lib/types'

function RecordsContent() {
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const [observations, setObservations] = useState<Observation[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/observations?code=${code}&nickname=${nickname}`)
      .then((r) => r.json())
      .then((data) => setObservations(data.observations ?? []))
      .catch(() => setError('문제가 발생했어요. 다시 시도해주세요'))
  }, [code, nickname])

  if (error) return <main className="p-8 text-center text-red-600">{error}</main>

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-2">내 기록</h1>
      <p className="text-slate-500 mb-6">오늘 {observations.length}종 발견!</p>
      <ul className="space-y-2">
        {observations.map((o) => (
          <li key={o.id} className="border rounded-lg px-4 py-3">
            <p className="font-medium">{o.speciesName}</p>
          </li>
        ))}
      </ul>
      {observations.length > 0 && (
        <a
          href={`/student/quiz?code=${code}&nickname=${nickname}`}
          className="block text-center bg-blue-600 text-white py-3 rounded-lg mt-6"
        >
          퀴즈 풀러 가기
        </a>
      )}
    </main>
  )
}

export default function RecordsPage() {
  return (
    <Suspense fallback={<main className="p-8 text-center">로딩 중...</main>}>
      <RecordsContent />
    </Suspense>
  )
}
