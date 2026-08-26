import { describe, it, expect } from 'vitest'
import { buildQuizQuestions, buildClassGuessChoices } from '../quiz'
import { Observation } from '../types'
import { SPECIES, findSpeciesById } from '@/data/species'
import { CLASS_DESCRIPTIONS } from '@/data/classDescriptions'

// speciesId/speciesName pairs must be real entries in data/species.ts so taxonomy lookup works
function makeObs(id: string, speciesId: string, speciesName: string): Observation {
  return { id, code: '1234', nickname: '테스터', speciesId, speciesName, description: null, note: null, tags: [], createdAt: '2026-08-24' }
}

describe('buildQuizQuestions', () => {
  it('creates a species question and a class question per observation, each with 4 choices', () => {
    const observations = [
      makeObs('1', 'saja', '사자'),
      makeObs('2', 'olppaemi', '올빼미'),
    ]
    const questions = buildQuizQuestions(observations)
    const speciesQuestions = questions.filter((q) => q.type === 'species')
    const classQuestions = questions.filter((q) => q.type === 'class')

    expect(questions).toHaveLength(4)
    expect(speciesQuestions).toHaveLength(2)
    expect(classQuestions).toHaveLength(2)
    questions.forEach((q) => {
      expect(q.choices).toHaveLength(4)
      expect(new Set(q.choices).size).toBe(4) // no duplicate choices
      expect(q.choices[q.correctIndex]).toBeDefined()
    })
    speciesQuestions.forEach((q) => {
      expect(q.choices).toContain(q.observation.speciesName)
    })
    classQuestions.forEach((q) => {
      const correctClass = findSpeciesById(q.observation.speciesId)?.taxonomy.class
      expect(q.choices[q.correctIndex]).toBe(correctClass)
    })
  })

  it('still produces full 4-choice questions when only one species has been saved', () => {
    const observations = [makeObs('1', 'saja', '사자')]
    const questions = buildQuizQuestions(observations)

    expect(questions).toHaveLength(2)
    questions.forEach((q) => expect(q.choices).toHaveLength(4))
    expect(questions.find((q) => q.type === 'species')?.choices[questions.find((q) => q.type === 'species')!.correctIndex]).toBe('사자')
  })

  it('includes at least one distractor from a different taxonomic class (강) than the correct answer', () => {
    const observations = [makeObs('1', 'saja', '사자')] // 사자 = 포유강
    const questions = buildQuizQuestions(observations)
    const q = questions.find((question) => question.type === 'species')!

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

    expect(questions).toHaveLength(6)
    questions.forEach((q) => {
      expect(new Set(q.choices).size).toBe(q.choices.length)
      expect(q.choices).toHaveLength(4)
    })
  })
})

describe('buildClassGuessChoices', () => {
  it('returns 4 unique class names including the correct one', () => {
    const correctClass = Object.keys(CLASS_DESCRIPTIONS)[0]
    const { choices, correctIndex } = buildClassGuessChoices(correctClass)

    expect(choices).toHaveLength(4)
    expect(new Set(choices).size).toBe(4)
    expect(choices[correctIndex]).toBe(correctClass)
  })
})
