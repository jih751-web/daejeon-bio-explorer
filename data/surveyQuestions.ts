/**
 * 사전·사후 검사 문항. 지식 10문항 + 태도 10문항(생물 분류 5 · AI 5), 총 20문항.
 * 사전·사후에 같은 문항을 그대로 다시 물어야 효과 비교가 가능하므로, 종 판별 문항은
 * (무작위가 아니라) 항상 같은 8종을 고정 출제한다 — 강(class)이 서로 겹치지 않게 골랐다.
 */

export interface ClassIdQuestion {
  type: 'classId'
  id: string
  speciesId: string
}

export interface TrueFalseQuestion {
  type: 'trueFalse'
  id: string
  statement: string
  correctAnswer: boolean
}

export type KnowledgeQuestion = ClassIdQuestion | TrueFalseQuestion

export interface AttitudeQuestion {
  type: 'attitude'
  id: string
  theme: '생물분류' | 'AI'
  statement: string
  /** 역문항이면 점수 해석 시 6에서 뺀 값을 사용(1~5 척도 기준) */
  reverse: boolean
}

export const KNOWLEDGE_QUESTIONS: KnowledgeQuestion[] = [
  { type: 'classId', id: 'k1', speciesId: 'hwangbok' },
  { type: 'classId', id: 'k2', speciesId: 'saja' },
  { type: 'classId', id: 'k3', speciesId: 'kkachi' },
  { type: 'classId', id: 'k4', speciesId: 'cheonggaeguri' },
  { type: 'classId', id: 'k5', speciesId: 'jangsu-pungdengi' },
  { type: 'classId', id: 'k6', speciesId: 'mudanggeomi' },
  { type: 'classId', id: 'k7', speciesId: 'byeolbulgasari' },
  { type: 'classId', id: 'k8', speciesId: 'chammuneo' },
  {
    type: 'trueFalse',
    id: 'k9',
    statement: '곤충이나 문어처럼 등뼈가 없는 동물(무척추동물)도 동물에 속한다.',
    correctAnswer: true,
  },
  {
    type: 'trueFalse',
    id: 'k10',
    statement: '생물 분류 체계는 "계 → 문 → 강 → 목 → 과 → 속 → 종" 순서로 점점 더 작은 무리로 나뉜다.',
    correctAnswer: true,
  },
]

export const ATTITUDE_QUESTIONS: AttitudeQuestion[] = [
  { type: 'attitude', id: 'a1', theme: '생물분류', statement: '생물 다양성(다양한 동물의 종류)에 대해 관심이 있다.', reverse: false },
  { type: 'attitude', id: 'a2', theme: '생물분류', statement: '동물을 관찰하고 분류하는 활동이 재미있다.', reverse: false },
  { type: 'attitude', id: 'a3', theme: '생물분류', statement: '나는 동물을 보고 어떤 무리(강)에 속하는지 설명할 수 있다.', reverse: false },
  { type: 'attitude', id: 'a4', theme: '생물분류', statement: '과학관에 다시 방문하고 싶다.', reverse: false },
  { type: 'attitude', id: 'a5', theme: '생물분류', statement: '생물을 특징에 따라 분류하는 것이 어렵게 느껴진다.', reverse: true },
  { type: 'attitude', id: 'a6', theme: 'AI', statement: 'AI가 알려준 정보를 별도로 확인하지 않고 그대로 믿는 편이다.', reverse: true },
  { type: 'attitude', id: 'a7', theme: 'AI', statement: 'AI를 활용해 과학 탐구를 하는 것이 유용하다고 생각한다.', reverse: false },
  { type: 'attitude', id: 'a8', theme: 'AI', statement: 'AI가 틀린 정보를 줄 수도 있다고 생각한다.', reverse: false },
  { type: 'attitude', id: 'a9', theme: 'AI', statement: '나는 AI가 만든 내용이 사실인지 확인하는 방법을 알고 있다.', reverse: false },
  { type: 'attitude', id: 'a10', theme: 'AI', statement: 'AI를 활용한 학습 활동에 자신감이 있다.', reverse: false },
]
