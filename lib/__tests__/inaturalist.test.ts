import { describe, it, expect, vi, beforeEach } from 'vitest'
import { identifySpecies, isLowConfidence } from '../inaturalist'

describe('isLowConfidence', () => {
  it('returns true when top candidate confidence is under 0.3', () => {
    expect(isLowConfidence([{ scientificName: 'Panthera tigris', koreanName: '호랑이', confidence: 0.2 }])).toBe(true)
  })
  it('returns false when top candidate confidence is 0.3 or above', () => {
    expect(isLowConfidence([{ scientificName: 'Panthera tigris', koreanName: '호랑이', confidence: 0.3 }])).toBe(false)
  })
  it('returns true for empty candidates', () => {
    expect(isLowConfidence([])).toBe(true)
  })
})

describe('identifySpecies', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    global.fetch = originalFetch
  })

  it('parses iNaturalist score_image response into SpeciesCandidate[]', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [
            {
              combined_score: 87.5,
              taxon: { name: 'Panthera tigris', preferred_common_name: '호랑이' },
            },
            {
              combined_score: 10,
              taxon: { name: 'Panthera leo', preferred_common_name: null },
            },
          ],
        }),
      } as Response)

    const candidates = await identifySpecies('https://example.com/photo.jpg')

    expect(candidates).toEqual([
      { scientificName: 'Panthera tigris', koreanName: '호랑이', confidence: 0.875 },
      { scientificName: 'Panthera leo', koreanName: null, confidence: 0.1 },
    ])
  })
})
