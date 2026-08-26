import { describe, expect, it } from 'vitest'
import { computeBadges } from '../badges'
import { SPECIES } from '@/data/species'
import { Observation, QuizResult } from '../types'

function makeObservation(overrides: Partial<Observation>): Observation {
  return {
    id: overrides.id ?? Math.random().toString(36),
    code: '1234',
    nickname: '탐험가1',
    speciesId: SPECIES[0].id,
    speciesName: SPECIES[0].koreanName,
    description: null,
    note: null,
    tags: [],
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

describe('computeBadges', () => {
  it('returns no badges for an empty record', () => {
    expect(computeBadges({ observations: [], quizResults: [] })).toEqual([])
  })

  it('awards 첫 발자국 after a single observation', () => {
    const badges = computeBadges({ observations: [makeObservation({})], quizResults: [] })
    expect(badges.some((b) => b.id === 'first-step')).toBe(true)
  })

  it('awards a class-master bronze badge once the per-class threshold is met, and never exceeds the class total', () => {
    const insectClass = '곤충강'
    const insectSpecies = SPECIES.filter((s) => s.taxonomy.class === insectClass)
    expect(insectSpecies.length).toBeGreaterThan(1)

    const bronzeCount = Math.max(1, Math.ceil(insectSpecies.length * 0.1))
    const observations = insectSpecies.slice(0, bronzeCount).map((s, i) => makeObservation({ id: `o${i}`, speciesId: s.id, speciesName: s.koreanName }))

    const badges = computeBadges({ observations, quizResults: [] })
    const masterBadge = badges.find((b) => b.id === `class-master-${insectClass}`)
    expect(masterBadge).toBeDefined()
    expect(masterBadge?.tier).toBe('브론즈')
  })

  it('awards every class-master tier at most once per class even with duplicate saves', () => {
    const oneSpeciesClass = SPECIES.find((s) => SPECIES.filter((x) => x.taxonomy.class === s.taxonomy.class).length === 1)!
    const observations = [
      makeObservation({ id: 'a', speciesId: oneSpeciesClass.id, speciesName: oneSpeciesClass.koreanName }),
      makeObservation({ id: 'b', speciesId: oneSpeciesClass.id, speciesName: oneSpeciesClass.koreanName }),
    ]
    const badges = computeBadges({ observations, quizResults: [] })
    const masterBadges = badges.filter((b) => b.id === `class-master-${oneSpeciesClass.taxonomy.class}`)
    expect(masterBadges).toHaveLength(1)
  })

  it('awards 퀴즈 도전자 브론즈 after one quiz attempt and 골드 only past the accuracy threshold', () => {
    const obs = makeObservation({ id: 'o1' })
    const quizResults: QuizResult[] = Array.from({ length: 10 }, (_, i) => ({
      id: `q${i}`,
      code: '1234',
      nickname: '탐험가1',
      observationId: obs.id,
      isCorrect: i < 9,
      answeredAt: new Date(Date.now() + i * 1000).toISOString(),
    }))
    const badges = computeBadges({ observations: [obs], quizResults })
    expect(badges.some((b) => b.id === 'quiz-participant')).toBe(true)
    expect(badges.some((b) => b.id === 'quiz-accuracy')).toBe(true)
  })

  it('does not award 퍼펙트 런 with fewer than 5 answers', () => {
    const obs = makeObservation({ id: 'o1' })
    const quizResults: QuizResult[] = Array.from({ length: 3 }, (_, i) => ({
      id: `q${i}`,
      code: '1234',
      nickname: '탐험가1',
      observationId: obs.id,
      isCorrect: true,
      answeredAt: new Date(Date.now() + i * 1000).toISOString(),
    }))
    const badges = computeBadges({ observations: [obs], quizResults })
    expect(badges.some((b) => b.id === 'perfect-run')).toBe(false)
  })

  it('awards 오답 복구 when a wrong answer for a species is later followed by a correct one', () => {
    const obs = makeObservation({ id: 'o1' })
    const quizResults: QuizResult[] = [
      { id: 'q1', code: '1234', nickname: '탐험가1', observationId: 'o1', isCorrect: false, answeredAt: '2026-01-01T00:00:00.000Z' },
      { id: 'q2', code: '1234', nickname: '탐험가1', observationId: 'o1', isCorrect: true, answeredAt: '2026-01-01T00:05:00.000Z' },
    ]
    const badges = computeBadges({ observations: [obs], quizResults })
    expect(badges.some((b) => b.id === 'wrong-answer-recovery')).toBe(true)
  })

  it('awards 학급 합동 only from allClassObservations, not the individual student records', () => {
    const many = Array.from({ length: 50 }, (_, i) => makeObservation({ id: `c${i}`, speciesId: SPECIES[i % SPECIES.length].id }))
    const badges = computeBadges({ observations: [], quizResults: [], allClassObservations: many })
    expect(badges.some((b) => b.id === 'class-collab')).toBe(true)
  })
})
