'use client'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Observation, QuizResult } from '@/lib/types'
import { findSpeciesById } from '@/data/species'
import { CLASS_DESCRIPTIONS } from '@/data/classDescriptions'
import { computeBadges } from '@/lib/badges'
import { BadgeList } from '@/components/BadgeList'

interface ClassGroup {
  className: string
  description: string | null
  observations: Observation[]
}

const GROUP_COLORS = [
  { bg: 'var(--color-forest-soft)', fg: 'var(--color-forest-deep)' },
  { bg: 'var(--color-sky-soft)', fg: 'var(--color-sky)' },
  { bg: 'var(--color-coral-soft)', fg: 'var(--color-coral)' },
  { bg: 'var(--color-violet-soft)', fg: 'var(--color-violet)' },
  { bg: 'var(--color-sun-soft)', fg: 'var(--color-sun-deep)' },
]

function RecordsContent() {
  const params = useSearchParams()
  const code = params.get('code')!
  const nickname = params.get('nickname')!
  const [observations, setObservations] = useState<Observation[]>([])
  const [allClassObservations, setAllClassObservations] = useState<Observation[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/observations?code=${code}&nickname=${nickname}`)
      .then((r) => r.json())
      .then((data) => setObservations(data.observations ?? []))
      .catch(() => setError('문제가 발생했어요. 다시 시도해주세요'))
    fetch(`/api/observations?code=${code}`)
      .then((r) => r.json())
      .then((data) => setAllClassObservations(data.observations ?? []))
      .catch(() => {})
    fetch(`/api/quiz?code=${code}&nickname=${nickname}`)
      .then((r) => r.json())
      .then((data) => setQuizResults(data.quizResults ?? []))
      .catch(() => {})
  }, [code, nickname])

  const badges = useMemo(
    () => computeBadges({ observations, quizResults, allClassObservations }),
    [observations, quizResults, allClassObservations]
  )

  const groups = useMemo<ClassGroup[]>(() => {
    const byClass = new Map<string, Observation[]>()
    for (const o of observations) {
      const className = findSpeciesById(o.speciesId)?.taxonomy.class ?? '분류 미확인'
      if (!byClass.has(className)) byClass.set(className, [])
      byClass.get(className)!.push(o)
    }
    return Array.from(byClass.entries())
      .map(([className, obs]) => ({ className, description: CLASS_DESCRIPTIONS[className] ?? null, observations: obs }))
      .sort((a, b) => b.observations.length - a.observations.length)
  }, [observations])

  if (error) return <main className="p-8 text-center text-[color:var(--color-coral)]">{error}</main>

  return (
    <main className="min-h-screen max-w-md mx-auto flex flex-col">
      <div
        className="shrink-0 px-6 pt-7 pb-5 text-white rounded-b-[32px]"
        style={{ background: 'linear-gradient(160deg, oklch(0.66 0.1 150), oklch(0.5 0.12 150))' }}
      >
        <h1 className="font-display text-[22px]">나의 탐사 수첩</h1>
        <p className="text-[13px] opacity-90 mt-0.5">발견한 동물 친구들을 모아봤어요</p>
        <div className="mt-4 bg-white/15 rounded-2xl px-4 py-3.5 flex items-center gap-3.5">
          <div className="font-display text-[28px] leading-none">
            {observations.length}
            <span className="text-sm font-sans">종</span>
          </div>
          <div className="flex-1 h-2.5 rounded-full bg-white/25 overflow-hidden">
            <div
              className="h-full rounded-full bg-[color:var(--color-sun)]"
              style={{ width: `${Math.min(100, observations.length * 8)}%` }}
            />
          </div>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="px-5 pt-4.5">
          <p className="text-[13px] font-extrabold text-neutral-500 mb-2">내 배지 ({badges.length}개)</p>
          <BadgeList badges={badges} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-5 pt-4.5 pb-6 flex flex-col gap-5">
        {groups.map((group, gi) => {
          const color = GROUP_COLORS[gi % GROUP_COLORS.length]
          return (
            <div key={group.className} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ background: color.bg }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3c5 1 8 5 7 11-6 1-10-2-11-7-.4-2 .2-3.5 4-4Z" stroke={color.fg} strokeWidth="1.6" />
                  </svg>
                </span>
                <p className="font-display text-[17px]" style={{ color: color.fg }}>{group.className}</p>
                <span
                  className="ml-auto text-[11px] font-extrabold px-2.5 py-1 rounded-full"
                  style={{ background: color.bg, color: color.fg }}
                >
                  {group.observations.length}종
                </span>
              </div>

              {group.description && (
                <div className="bg-white rounded-2xl rounded-tl-[4px] p-3.5 text-[13px] leading-relaxed text-neutral-600 shadow-[0_6px_14px_-10px_oklch(0.35_0.08_150_/_0.35)]">
                  <p className="font-extrabold text-[12px] mb-1" style={{ color: color.fg }}>
                    {group.className}의 공통 특징
                  </p>
                  {group.description}
                </div>
              )}

              <div className="flex flex-col gap-2.5">
                {group.observations.map((o) => (
                  <div
                    key={o.id}
                    className="bg-white rounded-[20px] p-3.5 flex items-start gap-3.5 shadow-[0_6px_16px_-12px_oklch(0.35_0.08_150_/_0.3)]"
                  >
                    <div className="w-[50px] h-[50px] rounded-[15px] flex items-center justify-center shrink-0" style={{ background: color.bg }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <circle cx="7" cy="12" r="2" stroke={color.fg} strokeWidth="1.6" />
                        <circle cx="11" cy="9" r="1.8" stroke={color.fg} strokeWidth="1.6" />
                        <circle cx="15" cy="9" r="1.8" stroke={color.fg} strokeWidth="1.6" />
                        <ellipse cx="12" cy="15.5" rx="5" ry="3.6" stroke={color.fg} strokeWidth="1.6" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1 pt-1">
                      <p className="font-extrabold text-[15px]">{o.speciesName}</p>
                      {o.note && <p className="text-[12.5px] text-neutral-500 mt-1 leading-snug">{o.note}</p>}
                      {o.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {o.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10.5px] font-bold px-2 py-0.5 rounded-full"
                              style={{ background: color.bg, color: color.fg }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div
                      className="ml-auto w-11 h-11 rounded-full flex items-center justify-center -rotate-6 shrink-0"
                      style={{ background: color.bg }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12l5 5L20 6" stroke={color.fg} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        {observations.length === 0 && (
          <p className="text-neutral-500 text-sm text-center pt-8">아직 발견한 생물이 없어요. QR을 스캔해보세요!</p>
        )}
      </div>

      <div className="px-5 pb-7 shrink-0 flex flex-col gap-2.5">
        {observations.length > 0 && (
          <a
            href={`/student/quiz?code=${code}&nickname=${nickname}`}
            className="h-[58px] rounded-2xl text-white font-display text-[17px] flex items-center justify-center gap-2 shadow-[0_10px_20px_-8px_oklch(0.62_0.17_55_/_0.5)]"
            style={{ background: 'linear-gradient(180deg, var(--color-sun) 0%, var(--color-sun-deep) 100%)' }}
          >
            퀴즈 풀러 가기
          </a>
        )}
        <a
          href={`/student/scan?code=${code}&nickname=${nickname}`}
          className="h-[54px] rounded-2xl bg-white border-[1.5px] border-forest-soft flex items-center justify-center gap-2 font-bold text-[15px] text-[color:var(--color-forest-deep)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="var(--color-forest-deep)" strokeWidth="1.8" />
            <path d="m20 20-3.5-3.5" stroke="var(--color-forest-deep)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          다른 동물 찾기
        </a>
      </div>
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
