import { KNOWLEDGE_QUESTIONS, ATTITUDE_QUESTIONS } from '@/data/surveyQuestions'
import { findSpeciesById } from '@/data/species'
import { SurveyResponse } from './types'

export interface KnowledgeScore {
  correct: number
  total: number
}

export interface AttitudeScores {
  생물분류: number | null
  AI: number | null
}

/** classId 문항은 정답이 "강 이름 문자열"로 저장되므로, 실제 강과 비교해 채점한다. */
export function scoreKnowledge(answers: Record<string, string | boolean | number>): KnowledgeScore {
  let correct = 0
  for (const q of KNOWLEDGE_QUESTIONS) {
    if (q.type === 'classId') {
      const correctClass = findSpeciesById(q.speciesId)?.taxonomy.class
      if (correctClass && answers[q.id] === correctClass) correct++
    } else {
      if (answers[q.id] === q.correctAnswer) correct++
    }
  }
  return { correct, total: KNOWLEDGE_QUESTIONS.length }
}

/** 태도 문항은 1~5 척도, 역문항은 6에서 뺀 값으로 뒤집어 평균을 낸다. */
export function scoreAttitude(answers: Record<string, string | boolean | number>): AttitudeScores {
  const sums: Record<string, number[]> = { 생물분류: [], AI: [] }
  for (const q of ATTITUDE_QUESTIONS) {
    const raw = answers[q.id]
    if (typeof raw !== 'number') continue
    const value = q.reverse ? 6 - raw : raw
    sums[q.theme].push(value)
  }
  const avg = (arr: number[]) => (arr.length === 0 ? null : Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10)
  return { 생물분류: avg(sums['생물분류']), AI: avg(sums['AI']) }
}

export interface SurveySummary {
  count: number
  avgKnowledge: number | null
  avgAttitude: AttitudeScores
}

export function summarizeResponses(responses: SurveyResponse[]): SurveySummary {
  if (responses.length === 0) return { count: 0, avgKnowledge: null, avgAttitude: { 생물분류: null, AI: null } }

  const knowledgeScores = responses.map((r) => scoreKnowledge(r.answers).correct)
  const attitudeScores = responses.map((r) => scoreAttitude(r.answers))

  const avg = (arr: number[]) => Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10
  const avgOrNull = (arr: (number | null)[]) => {
    const nums = arr.filter((n): n is number => n !== null)
    return nums.length === 0 ? null : avg(nums)
  }

  return {
    count: responses.length,
    avgKnowledge: avg(knowledgeScores),
    avgAttitude: {
      생물분류: avgOrNull(attitudeScores.map((s) => s.생물분류)),
      AI: avgOrNull(attitudeScores.map((s) => s.AI)),
    },
  }
}
