import { describe, it, expect } from 'vitest'
import { buildQuizQuestions } from '../quiz'
import { Observation } from '../types'
import { SPECIES, findSpeciesById } from '@/data/species'

// speciesId/speciesName pairs must be real entries in data/species.ts so taxonomy lookup works
function makeObs(id: string, speciesId: string, speciesName: string): Observation {
  return { id, code: '1234', nickname: '테스터', speciesId, speciesName, description: null, createdAt: '2026-08-24' }
}

describe('buildQuizQuestions', () => {
  it('creates one question per observation, each with 4 choices including the correct one', () => {
    const observations = [
      makeObs('1', 'saja', '사자'),
      makeObs('2', 'olppaemi', '올빼미'),
    ]
    const questions = buildQuizQuestions(observations)

    expect(questions).toHaveLength(2)
    questions.forEach((q, i) => {
      expect(q.choices).toHaveLength(4)
      expect(q.choices[q.correctIndex]).toBe(observations[i].speciesName)
      expect(new Set(q.choices).size).toBe(4) // no duplicate choices
    })
  })

  it('still produces a full 4-choice question when only one species has been saved', () => {
    const observations = [makeObs('1', 'saja', '사자')]
    const questions = buildQuizQuestions(observations)

    expect(questions).toHaveLength(1)
    expect(questions[0].choices).toHaveLength(4)
    expect(questions[0].choices[questions[0].correctIndex]).toBe('사자')
  })

  it('includes at least one distractor from a different taxonomic class (강) than the correct answer', () => {
    const observations = [makeObs('1', 'saja', '사자')] // 사자 = 포유강
    const questions = buildQuizQuestions(observations)
    const q = questions[0]

    const correctClass = findSpeciesById('saja')?.taxonomy.class
    const classesInChoices = new Set(
      q.choices.map((name) => SPECIES.find((s) => s.koreanName === name)?.taxonomy.class)
    )

    expect(classesInChoices.size).toBeGreaterThanOrEqual(2)
    expect(classesInChoices.has(correctClass)).toBe(true)
  })

  it('does not produce duplicate choices even when the same species is saved more than once', () => {
    const observations = [
      makeObs('1', 'saja', '사자'),
      makeObs('2', 'saja', '사자'),
      makeObs('3', 'olppaemi', '올빼미'),
    ]
    const questions = buildQuizQuestions(observations)

    expect(questions).toHaveLength(3)
    questions.forEach((q) => {
      expect(new Set(q.choices).size).toBe(q.choices.length)
      expect(q.choices).toHaveLength(4)
    })
  })
})
