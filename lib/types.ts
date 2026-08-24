export interface SpeciesCandidate {
  scientificName: string
  koreanName: string | null
  confidence: number // 0~1
}

export interface Description {
  source: 'naris' | 'wikipedia' | 'none'
  text: string | null
}

export interface Observation {
  id: string
  code: string
  nickname: string
  photoUrl: string
  speciesName: string
  confidence: number
  description: string | null
  createdAt: string
}
