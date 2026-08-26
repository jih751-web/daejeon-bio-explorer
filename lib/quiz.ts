import { Observation } from './types'
import { SPECIES, findSpeciesById } from '@/data/species'
import { CLASS_DESCRIPTIONS } from '@/data/classDescriptions'

export interface SpeciesQuizQuestion {
  type: 'species'
  observation: Observation
  choices: string[]
  correctIndex: number
}

export interface ClassQuizQuestion {
  type: 'class'
  observation: Observation
  choices: string[]
  correctIndex: number
}

export type QuizQuestion = SpeciesQuizQuestion | ClassQuizQuestion

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

/**
 * 오답 선택지는 관찰 기록 개수에 상관없이 항상 전체 생물 도감(SPECIES)에서 뽑는다 —
 * 학생이 1~2종만 저장해도 4지선다가 나오고, 정답과 강(class)이 다른 오답을 최소 1개
 * 반드시 포함시켜 같은 강끼리만 헷갈리지 않고 분류 단계 자체도 구분하게 한다.
 */
function buildSpeciesQuestions(observations: Observation[]): SpeciesQuizQuestion[] {
  return observations.map((observation) => {
    const correctClass = findSpeciesById(observation.speciesId)?.taxonomy.class

    const pool = SPECIES.filter((s) => s.koreanName !== observation.speciesName)
    const differentClass = pool.filter((s) => s.taxonomy.class !== correctClass)
    const sameClassOrUnknown = pool.filter((s) => s.taxonomy.class === correctClass)

    const distractorNames: string[] = []
    const shuffledDifferent = shuffle(differentClass)
    if (shuffledDifferent.length > 0) {
      distractorNames.push(shuffledDifferent[0].koreanName)
    }

    const rest = shuffle([...sameClassOrUnknown, ...shuffledDifferent.slice(1)])
    for (const s of rest) {
      if (distractorNames.length >= 3) break
      if (!distractorNames.includes(s.koreanName)) distractorNames.push(s.koreanName)
    }

    const choices = shuffle([...distractorNames, observation.speciesName])
    const correctIndex = choices.indexOf(observation.speciesName)

    return { type: 'species' as const, observation, choices, correctIndex }
  })
}

/** 저장한 기록 각각에 대해 "이 동물은 어느 무리(강)에 속할까요?" 문제를 만든다. */
function buildClassQuestions(observations: Observation[]): ClassQuizQuestion[] {
  return observations.flatMap((observation) => {
    const correctClass = findSpeciesById(observation.speciesId)?.taxonomy.class
    if (!correctClass) return []
    const { choices, correctIndex } = buildClassGuessChoices(correctClass)
    return [{ type: 'class' as const, observation, choices, correctIndex }]
  })
}

/** 종 맞히기 문제와 강 맞히기 문제를 섞어서 하나의 퀴즈 목록을 만든다. */
export function buildQuizQuestions(observations: Observation[]): QuizQuestion[] {
  return shuffle([...buildSpeciesQuestions(observations), ...buildClassQuestions(observations)])
}

/** "이 친구는 어느 무리(강)일까요?" 먼저 추측하기용 4지선다 강 이름 목록(정답 포함, 섞은 상태)을 만든다. */
export function buildClassGuessChoices(correctClass: string): { choices: string[]; correctIndex: number } {
  const others = Object.keys(CLASS_DESCRIPTIONS).filter((c) => c !== correctClass)
  const distractors = shuffle(others).slice(0, 3)
  const choices = shuffle([...distractors, correctClass])
  return { choices, correctIndex: choices.indexOf(correctClass) }
}
