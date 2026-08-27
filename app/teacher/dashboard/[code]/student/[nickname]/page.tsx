'use client'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Observation, QuizResult } from '@/lib/types'
import { findSpeciesById } from '@/data/species'
import { computeBadges } from '@/lib/badges'
import { BadgeList } from '@/components/BadgeList'
import { getSpeciesPhoto } from '@/lib/speciesPhoto'

export default function StudentStatsPage() {
  const { code, nickname: encodedNickname } = useParams<{ code: string; nickname: string }>()
  const nickname = decodeURIComponent(encodedNickname)

  const [observations, setObservations] = useState<Observation[]>([])
  const [allClassObservations, setAllClassObservations] = useState<Observation[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/observations?code=${code}&nickname=${encodeURIComponent(nickname)}`).then((r) => r.json()),
      fetch(`/api/observations?code=${code}`).then((r) => r.json()),
      fetch(`/api/quiz?code=${code}&nickname=${encodeURIComponent(nickname)}`).then((r) => r.json()),
    ])
      .then(([own, all, quiz]) => {
        setObservations(own.observations ?? [])
        setAllClassObservations(all.observations ?? [])
        setQuizResults(quiz.quizResults ?? [])
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [code, nickname])

  const badges = useMemo(
    () => computeBadges({ observations, quizResults, allClassObservations }),
    [observations, quizResults, allClassObservations]
  )

  const classGroups = useMemo(() => {
    const byClass = new Map<string, Observation[]>()
    for (const o of observations) {
      const className = findSpeciesById(o.speciesId)?.taxonomy.class ?? '분류 미확인'
      if (!byClass.has(className)) byClass.set(className, [])
      byClass.get(className)!.push(o)
    }
    return [...byClass.entries()].sort((a, b) => b[1].length - a[1].length)
  }, [observations])

  const quizStats = useMemo(() => {
    function statsFor(type: 'species' | 'class') {
      const results = quizResults.filter((r) => r.questionType === type)
      const correct = results.filter((r) => r.isCorrect).length
      return { total: results.length, correct, accuracy: results.length === 0 ? null : Math.round((correct / results.length) * 100) }
    }
    return { species: statsFor('species'), class: statsFor('class') }
  }, [quizResults])

  const missedList = useMemo(() => {
    const observationById = new Map(observations.map((o) => [o.id, o]))
    const speciesMissed = new Map<string, number>()
    const classMissed = new Map<string, number>()
    for (const r of quizResults) {
      if (r.isCorrect) continue
      const obs = observationById.get(r.observationId)
      if (!obs) continue
      if (r.questionType === 'species') {
        speciesMissed.set(obs.speciesName, (speciesMissed.get(obs.speciesName) ?? 0) + 1)
      } else {
        const className = findSpeciesById(obs.speciesId)?.taxonomy.class
        if (className) classMissed.set(className, (classMissed.get(className) ?? 0) + 1)
      }
    }
    return {
      species: [...speciesMissed.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
      class: [...classMissed.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
    }
  }, [observations, quizResults])

  const tagUsage = useMemo(() => {
    const counts = new Map<string, number>()
    for (const o of observations) for (const tag of o.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
    return [...counts.entries()].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count)
  }, [observations])

  const activityWindow = useMemo(() => {
    const times = observations.map((o) => new Date(o.createdAt).getTime()).filter((t) => !Number.isNaN(t))
    if (times.length === 0) return null
    const format = (t: number) => new Date(t).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    return { first: format(Math.min(...times)), last: format(Math.max(...times)) }
  }, [observations])

  const firstFinderCount = useMemo(() => badges.find((b) => b.id === 'first-finder') != null, [badges])

  const classRank = useMemo(() => {
    const byNickname = new Map<string, Set<string>>()
    for (const o of allClassObservations) {
      if (!byNickname.has(o.nickname)) byNickname.set(o.nickname, new Set())
      byNickname.get(o.nickname)!.add(o.speciesId)
    }
    const ranked = [...byNickname.entries()]
      .map(([n, species]) => ({ nickname: n, count: species.size }))
      .sort((a, b) => b.count - a.count)
    const total = ranked.length
    const rank = ranked.findIndex((r) => r.nickname === nickname) + 1
    if (total === 0 || rank === 0) return null
    const percentile = Math.round((rank / total) * 100)
    return { rank, total, percentile }
  }, [allClassObservations, nickname])

  const personalTimeline = useMemo(() => {
    const BUCKET_MS = 10 * 60 * 1000
    const counts = new Map<number, number>()
    for (const o of observations) {
      const t = new Date(o.createdAt).getTime()
      if (Number.isNaN(t)) continue
      const bucket = Math.floor(t / BUCKET_MS) * BUCKET_MS
      counts.set(bucket, (counts.get(bucket) ?? 0) + 1)
    }
    return [...counts.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([bucket, count]) => ({
        label: new Date(bucket).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        count,
      }))
  }, [observations])
  const timelineMax = Math.max(1, ...personalTimeline.map((t) => t.count))

  const recoveredSpecies = useMemo(() => {
    const observationById = new Map(observations.map((o) => [o.id, o]))
    const bySpecies = new Map<string, { isCorrect: boolean; time: number }[]>()
    for (const r of quizResults) {
      const obs = observationById.get(r.observationId)
      if (!obs || !r.answeredAt) continue
      if (!bySpecies.has(obs.speciesId)) bySpecies.set(obs.speciesId, [])
      bySpecies.get(obs.speciesId)!.push({ isCorrect: r.isCorrect, time: new Date(r.answeredAt).getTime() })
    }
    const recovered: string[] = []
    for (const [speciesId, attempts] of bySpecies) {
      const sorted = [...attempts].sort((a, b) => a.time - b.time)
      const firstWrong = sorted.findIndex((a) => !a.isCorrect)
      if (firstWrong === -1) continue
      if (sorted.slice(firstWrong + 1).some((a) => a.isCorrect)) {
        recovered.push(findSpeciesById(speciesId)?.koreanName ?? speciesId)
      }
    }
    return recovered
  }, [observations, quizResults])

  const notes = useMemo(
    () => observations.filter((o) => o.note && o.note.trim().length > 0),
    [observations]
  )

  if (!loaded) return <main className="p-8 text-center">불러오는 중...</main>

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <Link href={`/teacher/dashboard/${code}`} className="text-sm text-neutral-500 mb-2 inline-block">
        ← 대시보드로 돌아가기
      </Link>
      <h1 className="text-xl font-bold mb-1">{nickname}님의 탐사 기록</h1>
      <p className="text-slate-500 mb-6">
        발견 {observations.length}종 · 배지 {badges.length}개
        {activityWindow && ` · 활동 시간 ${activityWindow.first} ~ ${activityWindow.last}`}
        {classRank && ` · 발견 종수 학급 내 ${classRank.rank}/${classRank.total}위 (상위 ${classRank.percentile}%)`}
      </p>

      <section className="mb-8">
        <h2 className="font-bold mb-2">획득한 배지</h2>
        <BadgeList badges={badges} />
      </section>

      {personalTimeline.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-2">활동 타임라인 (10분 단위)</h2>
          <div className="flex items-end gap-1.5 h-20 bg-white rounded-xl p-3 border">
            {personalTimeline.map((t) => (
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

      <section className="mb-8 grid grid-cols-2 gap-3">
        <div className="bg-forest-soft rounded-2xl p-4">
          <p className="text-xs text-neutral-600 mb-1">종 맞히기 정답률</p>
          <p className="text-2xl font-bold">{quizStats.species.accuracy === null ? '-' : `${quizStats.species.accuracy}%`}</p>
          <p className="text-xs text-neutral-500 mt-1">{quizStats.species.correct}/{quizStats.species.total}문제</p>
        </div>
        <div className="bg-sky-soft rounded-2xl p-4">
          <p className="text-xs text-neutral-600 mb-1">강 맞히기 정답률</p>
          <p className="text-2xl font-bold">{quizStats.class.accuracy === null ? '-' : `${quizStats.class.accuracy}%`}</p>
          <p className="text-xs text-neutral-500 mt-1">{quizStats.class.correct}/{quizStats.class.total}문제</p>
        </div>
      </section>

      {(missedList.species.length > 0 || missedList.class.length > 0) && (
        <section className="mb-8">
          <h2 className="font-bold mb-2">틀린 문제</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-neutral-500 mb-1">종 맞히기</p>
              <ul className="space-y-1">
                {missedList.species.map((m) => (
                  <li key={m.name} className="flex justify-between text-sm border-b py-1">
                    <span>{m.name}</span>
                    <span className="text-[color:var(--color-coral)]">{m.count}번</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-neutral-500 mb-1">강 맞히기</p>
              <ul className="space-y-1">
                {missedList.class.map((m) => (
                  <li key={m.name} className="flex justify-between text-sm border-b py-1">
                    <span>{m.name}</span>
                    <span className="text-[color:var(--color-coral)]">{m.count}번</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {recoveredSpecies.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-2">틀렸다가 다시 맞힌 동물</h2>
          <div className="flex flex-wrap gap-2">
            {recoveredSpecies.map((name) => (
              <span key={name} className="text-xs font-bold px-3 py-1.5 rounded-full bg-forest-soft text-[color:var(--color-forest-deep)]">
                ↻ {name}
              </span>
            ))}
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-2">관찰 메모 모음</h2>
          <div className="flex flex-col gap-2">
            {notes.map((o) => (
              <div key={o.id} className="bg-white border rounded-xl p-3 text-sm">
                <p className="font-bold text-xs text-neutral-500 mb-1">{o.speciesName}</p>
                <p>&ldquo;{o.note}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {tagUsage.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-2">주로 눈여겨본 특징</h2>
          <div className="flex flex-wrap gap-2">
            {tagUsage.map((t) => (
              <span key={t.tag} className="text-xs font-bold px-3 py-1.5 rounded-full bg-sun-soft">
                {t.tag} {t.count}
              </span>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="font-bold mb-2">발견한 동물</h2>
        {classGroups.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 발견한 동물이 없어요.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {classGroups.map(([className, obs]) => (
              <div key={className}>
                <p className="text-sm font-bold mb-1.5">
                  {className} <span className="text-neutral-400 font-normal">{obs.length}종</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {obs.map((o) => {
                    const photo = getSpeciesPhoto(o.speciesId)
                    return (
                      <div key={o.id} className="flex items-center gap-2 bg-white border rounded-xl pl-1.5 pr-3 py-1.5">
                        <span className="relative w-8 h-8 rounded-lg overflow-hidden bg-forest-soft shrink-0">
                          {photo && <Image src={photo.url} alt={o.speciesName} fill sizes="32px" className="object-cover" />}
                        </span>
                        <span className="text-sm">{o.speciesName}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {firstFinderCount && (
        <p className="text-xs text-neutral-400 mt-6">
          ✓ 학급에서 가장 먼저 발견한 종이 있어요 (배지 목록의 &ldquo;첫 발견자&rdquo; 참고)
        </p>
      )}
    </main>
  )
}
