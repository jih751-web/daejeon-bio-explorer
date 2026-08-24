import { describe, it, expect } from 'vitest'
import { buildQuizQuestions } from '../quiz'
import { Observation } from '../types'

function makeObs(id: string, speciesName: string): Observation {
  return { id, code: '1234', nickname: '테스터', photoUrl: 'x', speciesName, confidence: 0.9, description: null, createdAt: '2026-08-24' }
}

describe('buildQuizQuestions', () => {
  it('creates one question per observation with 4 choices including the correct one', () => {
    const observations = [makeObs('1', '호랑이'), makeObs('2', '사자'), makeObs('3', '코끼리'), makeObs('4', '기린')]
    const questions = buildQuizQuestions(observations)

    expect(questions).toHaveLength(4)
    questions.forEach((q, i) => {
      expect(q.choices).toHaveLength(Math.min(4, observations.length))
      expect(q.choices[q.correctIndex]).toBe(observations[i].speciesName)
    })
  })

  it('returns no more questions than observations', () => {
    const observations = [makeObs('1', '호랑이'), makeObs('2', '사자')]
    const questions = buildQuizQuestions(observations)
    expect(questions).toHaveLength(2)
    questions.forEach((q) => expect(q.choices).toHaveLength(2))
  })

  it('does not produce duplicate choices when the same species is saved more than once', () => {
    const observations = [
      makeObs('1', '사자'),
      makeObs('2', '사자'),
      makeObs('3', '호랑이'),
      makeObs('4', '호랑이'),
    ]
    const questions = buildQuizQuestions(observations)

    expect(questions).toHaveLength(4)
    questions.forEach((q) => {
      const uniqueChoices = new Set(q.choices)
      expect(uniqueChoices.size).toBe(q.choices.length)
      // only 2 distinct species exist among the observations
      expect(q.choices).toHaveLength(2)
    })
  })
})
