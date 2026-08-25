'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface DashboardData {
  students: { nickname: string; observationCount: number }[]
  speciesRanking: { speciesName: string; count: number }[]
  quizAccuracy: number
}

export default function DashboardPage() {
  const { code } = useParams<{ code: string }>()
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = () =>
      fetch(`/api/dashboard?code=${code}`)
        .then((r) => r.json())
        .then((data) => {
          setData(data)
          setError(null)
        })
        .catch(() => setError('문제가 발생했어요. 다시 시도해주세요'))
    load()
    const interval = setInterval(load, 10000)
    return () => clearInterval(interval)
  }, [code])

  if (error) return <main className="p-8 text-center text-red-600">{error}</main>
  if (!data) return <main className="p-8 text-center">불러오는 중...</main>

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-1">활동 코드 {code} 대시보드</h1>
      <p className="text-slate-500 mb-6">퀴즈 정답률: {data.quizAccuracy}%</p>

      <section className="mb-8">
        <h2 className="font-bold mb-2">학생별 발견 수</h2>
        <ul className="space-y-1">
          {data.students.map((s) => (
            <li key={s.nickname} className="flex justify-between border-b py-1">
              <span>{s.nickname}</span>
              <span>{s.observationCount}종</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-bold mb-2">많이 발견된 생물 순위</h2>
        <ul className="space-y-1">
          {data.speciesRanking.map((s) => (
            <li key={s.speciesName} className="flex justify-between border-b py-1">
              <span>{s.speciesName}</span>
              <span>{s.count}회</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
