import { Observation } from './types'

export interface QuizQuestion {
  observation: Observation
  choices: string[]
  correctIndex: number
}

export function buildQuizQuestions(observations: Observation[]): QuizQuestion[] {
  const allNames = observations.map((o) => o.speciesName)
  const maxChoices = Math.min(4, observations.length)

  return observations.map((observation) => {
    const wrongPool = allNames.filter((n) => n !== observation.speciesName)
    const shuffled = [...wrongPool].sort(() => Math.random() - 0.5)
    const wrongChoices = shuffled.slice(0, maxChoices - 1)

    const choices = [...wrongChoices, observation.speciesName].sort(() => Math.random() - 0.5)
    const correctIndex = choices.indexOf(observation.speciesName)

    return { observation, choices, correctIndex }
  })
}
