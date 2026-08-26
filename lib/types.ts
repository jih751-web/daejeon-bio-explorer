export interface Observation {
  id: string
  code: string
  nickname: string
  speciesId: string
  speciesName: string
  description: string | null
  note: string | null
  tags: string[]
  createdAt: string
}

export interface QuizResult {
  id: string
  code: string
  nickname: string
  observationId: string
  isCorrect: boolean
  answeredAt: string | null
}

export const OBSERVATION_TAGS = ['무늬', '뿔·더듬이', '날개', '색깔', '소리', '크기', '움직임', '발자국'] as const

export interface Announcement {
  text: string | null
  updatedAt: string | null
}
