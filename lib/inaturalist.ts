import { SpeciesCandidate } from './types'

interface INatScoreResult {
  combined_score: number
  taxon: { name: string; preferred_common_name: string | null }
}

export async function identifySpecies(photoUrl: string): Promise<SpeciesCandidate[]> {
  const photoRes = await fetch(photoUrl)
  const photoBlob = await photoRes.arrayBuffer()

  const form = new FormData()
  form.append('image', new Blob([photoBlob]), 'photo.jpg')

  const res = await fetch('https://api.inaturalist.org/v1/computervision/score_image', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.INATURALIST_JWT}` },
    body: form,
  })

  if (!res.ok) {
    throw new Error(`iNaturalist API error: ${res.status}`)
  }

  const data: { results: INatScoreResult[] } = await res.json()

  return data.results
    .slice(0, 3)
    .map((r) => ({
      scientificName: r.taxon.name,
      koreanName: r.taxon.preferred_common_name,
      confidence: Math.round((r.combined_score / 100) * 1000) / 1000,
    }))
}

export function isLowConfidence(candidates: SpeciesCandidate[]): boolean {
  if (candidates.length === 0) return true
  return candidates[0].confidence < 0.3
}
