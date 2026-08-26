'use client'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { Announcement, Observation, QuizResult } from '@/lib/types'
import { computeBadges } from '@/lib/badges'

const STALL_MINUTES = 10

interface DashboardData {
  students: { nickname: string; observationCount: number }[]
  speciesRanking: { speciesName: string; count: number }[]
  quizAccuracy: number
}

export default function DashboardPage() {
  const { code } = useParams<{ code: string }>()
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [allObservations, setAllObservations] = useState<Observation[]>([])
  const [allQuizResults, setAllQuizResults] = useState<QuizResult[]>([])
  const [announcement, setAnnouncement] = useState<Announcement | null>(null)
  const [announcementInput, setAnnouncementInput] = useState('')
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const load = () => {
      fetch(`/api/dashboard?code=${code}`)
        .then((r) => r.json())
        .then((data) => {
          setData(data)
          setError(null)
        })
        .catch(() => setError('문제가 발생했어요. 다시 시도해주세요'))
      fetch(`/api/observations?code=${code}`)
        .then((r) => r.json())
        .then((data) => setAllObservations(data.observations ?? []))
        .catch(() => {})
      fetch(`/api/quiz?code=${code}`)
        .then((r) => r.json())
        .then((data) => setAllQuizResults(data.quizResults ?? []))
        .catch(() => {})
      fetch(`/api/announcement?code=${code}`)
        .then((r) => r.json())
        .then(setAnnouncement)
        .catch(() => {})
    }
    load()
    const interval = setInterval(load, 10000)
    return () => clearInterval(interval)
  }, [code])

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(interval)
  }, [])

  async function sendAnnouncement() {
    const text = announcementInput.trim()
    if (!text) return
    await fetch('/api/announcement', { method: 'POST', body: JSON.stringify({ code, text }) })
    setAnnouncementInput('')
    setAnnouncement({ text, updatedAt: new Date().toISOString() })
  }

  async function clearAnnouncement() {
    await fetch('/api/announcement', { method: 'POST', body: JSON.stringify({ code, text: null }) })
    setAnnouncement({ text: null, updatedAt: new Date().toISOString() })
  }

  const lastActivityByNickname = useMemo(() => {
    const map = new Map<string, number>()
    for (const o of allObservations) {
      if (!o.createdAt) continue
      const t = new Date(o.createdAt).getTime()
      map.set(o.nickname, Math.max(map.get(o.nickname) ?? 0, t))
    }
    for (const r of allQuizResults) {
      if (!r.answeredAt) continue
      const t = new Date(r.answeredAt).getTime()
      map.set(r.nickname, Math.max(map.get(r.nickname) ?? 0, t))
    }
    return map
  }, [allObservations, allQuizResults])

  const badgeCountByNickname = useMemo(() => {
    const map = new Map<string, number>()
    const nicknames = new Set(allObservations.map((o) => o.nickname))
    for (const nickname of nicknames) {
      const observations = allObservations.filter((o) => o.nickname === nickname)
      const quizResults = allQuizResults.filter((r) => r.nickname === nickname)
      const badges = computeBadges({ observations, quizResults, allClassObservations: allObservations })
      map.set(nickname, badges.length)
    }
    return map
  }, [allObservations, allQuizResults])

  const classCollabBadge = useMemo(() => {
    if (allObservations.length === 0) return null
    const badges = computeBadges({ observations: [], quizResults: [], allClassObservations: allObservations })
    return badges.find((b) => b.id === 'class-collab') ?? null
  }, [allObservations])

  const distinctSpeciesCount = useMemo(() => new Set(allObservations.map((o) => o.speciesId)).size, [allObservations])

  if (error) return <main className="p-8 text-center text-red-600">{error}</main>
  if (!data) return <main className="p-8 text-center">불러오는 중...</main>

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-1">활동 코드 {code} 대시보드</h1>
      <p className="text-slate-500 mb-6">퀴즈 정답률: {data.quizAccuracy}%</p>

      <section className="mb-8 bg-sun-soft rounded-2xl p-4">
        <h2 className="font-bold mb-2">집합 신호</h2>
        {announcement?.text && (
          <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2 mb-2 text-sm">
            <span>현재 공지: {announcement.text}</span>
            <button onClick={clearAnnouncement} className="text-[color:var(--color-coral)] text-xs font-bold shrink-0 ml-2">
              지우기
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={announcementInput}
            onChange={(e) => setAnnouncementInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendAnnouncement()}
            placeholder="예: 10분 뒤 로비에 집합해주세요"
            className="flex-1 rounded-lg border px-3 py-2 text-sm bg-white"
          />
          <button
            onClick={sendAnnouncement}
            className="bg-[color:var(--color-sun-deep)] text-white px-4 py-2 rounded-lg text-sm font-bold shrink-0"
          >
            보내기
          </button>
        </div>
      </section>

      <section className="mb-8 bg-forest-soft rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-bold">학급 합동 배지</h2>
          <span className="text-sm text-neutral-600">{distinctSpeciesCount}종 발견됨</span>
        </div>
        <div className="h-2.5 rounded-full bg-white overflow-hidden">
          <div
            className="h-full rounded-full bg-[color:var(--color-forest-deep)]"
            style={{ width: `${Math.min(100, (distinctSpeciesCount / 100) * 100)}%` }}
          />
        </div>
        <p className="text-xs text-neutral-500 mt-1.5">
          {classCollabBadge
            ? `달성! ${classCollabBadge.tier} 등급 학급 합동 배지 (${distinctSpeciesCount}종)`
            : `50종 달성까지 ${Math.max(0, 50 - distinctSpeciesCount)}종 남음`}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="font-bold mb-2">학생별 발견 수 · 배지</h2>
        <ul className="space-y-1">
          {data.students.map((s) => {
            const lastActivity = lastActivityByNickname.get(s.nickname)
            const idleMinutes = lastActivity ? Math.floor((now - lastActivity) / 60000) : null
            const isStalled = idleMinutes !== null && idleMinutes >= STALL_MINUTES
            return (
              <li
                key={s.nickname}
                className={`flex justify-between border-b py-1 ${isStalled ? 'text-neutral-400' : ''}`}
              >
                <span className="flex items-center gap-2">
                  {isStalled && <span className="w-2 h-2 rounded-full bg-neutral-400 shrink-0" />}
                  {s.nickname}
                  {isStalled && <span className="text-xs">({idleMinutes}분째 멈춤)</span>}
                </span>
                <span className="flex gap-3">
                  <span>{s.observationCount}종</span>
                  <span className="text-[color:var(--color-sun-deep)] font-semibold">
                    배지 {badgeCountByNickname.get(s.nickname) ?? 0}개
                  </span>
                </span>
              </li>
            )
          })}
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
