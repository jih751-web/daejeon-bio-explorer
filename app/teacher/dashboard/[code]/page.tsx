'use client'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Announcement, Observation, QuizResult, SurveyPhase, SurveyResponse } from '@/lib/types'
import { computeBadges } from '@/lib/badges'
import { findSpeciesById } from '@/data/species'
import { summarizeResponses } from '@/lib/survey'

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
  const [surveyPhase, setSurveyPhase] = useState<SurveyPhase | null>(null)
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponse[]>([])

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
      fetch(`/api/survey-phase?code=${code}`)
        .then((r) => r.json())
        .then((data) => setSurveyPhase(data.phase ?? null))
        .catch(() => {})
      fetch(`/api/survey?code=${code}`)
        .then((r) => r.json())
        .then((data) => setSurveyResponses(data.responses ?? []))
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

  async function setPhase(phase: SurveyPhase | null) {
    await fetch('/api/survey-phase', { method: 'POST', body: JSON.stringify({ code, phase }) })
    setSurveyPhase(phase)
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

  const observationById = useMemo(() => new Map(allObservations.map((o) => [o.id, o])), [allObservations])

  const mostMissedSpecies = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of allQuizResults) {
      if (r.isCorrect || r.questionType !== 'species') continue
      const speciesName = observationById.get(r.observationId)?.speciesName
      if (!speciesName) continue
      counts.set(speciesName, (counts.get(speciesName) ?? 0) + 1)
    }
    return [...counts.entries()].map(([speciesName, count]) => ({ speciesName, count })).sort((a, b) => b.count - a.count).slice(0, 10)
  }, [allQuizResults, observationById])

  const mostMissedClasses = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of allQuizResults) {
      if (r.isCorrect || r.questionType !== 'class') continue
      const speciesId = observationById.get(r.observationId)?.speciesId
      const className = speciesId ? findSpeciesById(speciesId)?.taxonomy.class : undefined
      if (!className) continue
      counts.set(className, (counts.get(className) ?? 0) + 1)
    }
    return [...counts.entries()].map(([className, count]) => ({ className, count })).sort((a, b) => b.count - a.count).slice(0, 10)
  }, [allQuizResults, observationById])

  const tagPopularity = useMemo(() => {
    const counts = new Map<string, number>()
    for (const o of allObservations) {
      for (const tag of o.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
    return [...counts.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count)
  }, [allObservations])

  const activityTimeline = useMemo(() => {
    const BUCKET_MS = 10 * 60 * 1000
    const counts = new Map<number, number>()
    for (const o of allObservations) {
      if (!o.createdAt) continue
      const bucket = Math.floor(new Date(o.createdAt).getTime() / BUCKET_MS) * BUCKET_MS
      counts.set(bucket, (counts.get(bucket) ?? 0) + 1)
    }
    return [...counts.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([bucket, count]) => ({
        label: new Date(bucket).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        count,
      }))
  }, [allObservations])

  const timelineMax = Math.max(1, ...activityTimeline.map((t) => t.count))

  const preSummary = useMemo(
    () => summarizeResponses(surveyResponses.filter((r) => r.phase === 'pre')),
    [surveyResponses]
  )
  const postSummary = useMemo(
    () => summarizeResponses(surveyResponses.filter((r) => r.phase === 'post')),
    [surveyResponses]
  )

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

      <section className="mb-8 bg-sky-soft rounded-2xl p-4">
        <h2 className="font-bold mb-2">사전·사후 검사</h2>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setPhase(surveyPhase === 'pre' ? null : 'pre')}
            className="flex-1 py-2 rounded-lg text-sm font-bold"
            style={surveyPhase === 'pre' ? { background: 'var(--color-sky)', color: 'white' } : { background: 'white', color: 'var(--color-sky)' }}
          >
            {surveyPhase === 'pre' ? '사전 검사 진행 중 (끄기)' : '사전 검사 열기'}
          </button>
          <button
            onClick={() => setPhase(surveyPhase === 'post' ? null : 'post')}
            className="flex-1 py-2 rounded-lg text-sm font-bold"
            style={surveyPhase === 'post' ? { background: 'var(--color-sky)', color: 'white' } : { background: 'white', color: 'var(--color-sky)' }}
          >
            {surveyPhase === 'post' ? '사후 검사 진행 중 (끄기)' : '사후 검사 열기'}
          </button>
        </div>
        <p className="text-xs text-neutral-500 mb-3">켜두면 아직 응답 안 한 학생이 활동 코드로 접속할 때 자동으로 검사부터 진행돼요.</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-3">
            <p className="text-xs text-neutral-500 mb-1">사전 검사 ({preSummary.count}명)</p>
            <p className="text-lg font-bold">지식 {preSummary.avgKnowledge ?? '-'} / 10</p>
            <p className="text-xs text-neutral-500 mt-1">
              태도(분류) {preSummary.avgAttitude.생물분류 ?? '-'} · 태도(AI) {preSummary.avgAttitude.AI ?? '-'}
            </p>
          </div>
          <div className="bg-white rounded-xl p-3">
            <p className="text-xs text-neutral-500 mb-1">사후 검사 ({postSummary.count}명)</p>
            <p className="text-lg font-bold">지식 {postSummary.avgKnowledge ?? '-'} / 10</p>
            <p className="text-xs text-neutral-500 mt-1">
              태도(분류) {postSummary.avgAttitude.생물분류 ?? '-'} · 태도(AI) {postSummary.avgAttitude.AI ?? '-'}
            </p>
          </div>
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
                  <Link
                    href={`/teacher/dashboard/${code}/student/${encodeURIComponent(s.nickname)}`}
                    className="underline underline-offset-2 hover:text-[color:var(--color-forest-deep)]"
                  >
                    {s.nickname}
                  </Link>
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

      {activityTimeline.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-2">시간대별 참여 추이 (10분 단위)</h2>
          <div className="flex items-end gap-1.5 h-24 bg-white rounded-xl p-3 border">
            {activityTimeline.map((t) => (
              <div key={t.label} className="flex-1 flex flex-col items-center justify-end gap-1 h-full">
                <div
                  className="w-full rounded-t-sm bg-[color:var(--color-forest-deep)]"
                  style={{ height: `${Math.max(6, (t.count / timelineMax) * 100)}%` }}
                  title={`${t.label} · ${t.count}건`}
                />
                <span className="text-[9px] text-neutral-500 whitespace-nowrap">{t.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="font-bold mb-2">많이 틀린 동물 TOP 10</h2>
        {mostMissedSpecies.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 퀴즈 오답 기록이 없어요.</p>
        ) : (
          <ul className="space-y-1">
            {mostMissedSpecies.map((s) => (
              <li key={s.speciesName} className="flex justify-between border-b py-1">
                <span>{s.speciesName}</span>
                <span className="text-[color:var(--color-coral)] font-semibold">{s.count}번 틀림</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8">
        <h2 className="font-bold mb-2">많이 틀린 강(class) TOP 10</h2>
        {mostMissedClasses.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 &ldquo;어느 무리?&rdquo; 문제 오답 기록이 없어요.</p>
        ) : (
          <ul className="space-y-1">
            {mostMissedClasses.map((c) => (
              <li key={c.className} className="flex justify-between border-b py-1">
                <span>{c.className}</span>
                <span className="text-[color:var(--color-coral)] font-semibold">{c.count}번 틀림</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8">
        <h2 className="font-bold mb-2">관찰 태그 인기 순위</h2>
        {tagPopularity.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 선택된 관찰 태그가 없어요.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {tagPopularity.map((t) => {
              const max = tagPopularity[0].count
              return (
                <div key={t.tag} className="flex items-center gap-3">
                  <span className="w-20 text-sm shrink-0">{t.tag}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-sky-soft overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[color:var(--color-sky)]"
                      style={{ width: `${(t.count / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500 w-10 text-right shrink-0">{t.count}회</span>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-bold mb-2">많이 찾은 동물 순위</h2>
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
