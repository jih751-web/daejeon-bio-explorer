import { describe, expect, it } from 'vitest'
import { scoreKnowledge, scoreAttitude, summarizeResponses } from '../survey'
import { KNOWLEDGE_QUESTIONS, ATTITUDE_QUESTIONS } from '@/data/surveyQuestions'
import { findSpeciesById } from '@/data/species'
import { SurveyResponse } from '../types'

function perfectKnowledgeAnswers(): Record<string, string | boolean | number> {
  const answers: Record<string, string | boolean | number> = {}
  for (const q of KNOWLEDGE_QUESTIONS) {
    if (q.type === 'classId') {
      answers[q.id] = findSpeciesById(q.speciesId)!.taxonomy.class
    } else {
      answers[q.id] = q.correctAnswer
    }
  }
  return answers
}

describe('scoreKnowledge', () => {
  it('scores all 10 correct when every answer matches', () => {
    const { correct, total } = scoreKnowledge(perfectKnowledgeAnswers())
    expect(total).toBe(10)
    expect(correct).toBe(10)
  })

  it('scores 0 when every answer is wrong', () => {
    const answers: Record<string, string | boolean | number> = {}
    for (const q of KNOWLEDGE_QUESTIONS) {
      answers[q.id] = q.type === 'classId' ? '완전히_틀린_강' : !q.correctAnswer
    }
    expect(scoreKnowledge(answers).correct).toBe(0)
  })
})

describe('scoreAttitude', () => {
  it('averages reverse-scored items correctly (a rating of 5 on a reverse item counts as 1)', () => {
    const answers: Record<string, string | boolean | number> = {}
    for (const q of ATTITUDE_QUESTIONS) answers[q.id] = q.reverse ? 5 : 1
    const scores = scoreAttitude(answers)
    // every item (reverse-adjusted) evaluates to 1, so both theme averages should be 1
    expect(scores.생물분류).toBe(1)
    expect(scores.AI).toBe(1)
  })

  it('returns null for a theme with no answered items', () => {
    expect(scoreAttitude({}).생물분류).toBeNull()
  })
})

describe('summarizeResponses', () => {
  it('averages knowledge and attitude scores across responses', () => {
    const responses: SurveyResponse[] = [
      { id: '1', code: '1234', nickname: 'a', phase: 'pre', answers: perfectKnowledgeAnswers(), submittedAt: null },
      { id: '2', code: '1234', nickname: 'b', phase: 'pre', answers: {}, submittedAt: null },
    ]
    const summary = summarizeResponses(responses)
    expect(summary.count).toBe(2)
    expect(summary.avgKnowledge).toBe(5) // (10 + 0) / 2
  })

  it('returns nulls for an empty response set', () => {
    const summary = summarizeResponses([])
    expect(summary.count).toBe(0)
    expect(summary.avgKnowledge).toBeNull()
  })
})
