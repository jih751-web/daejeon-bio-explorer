import { describe, it, expect } from 'vitest'
import { SPECIES, findSpeciesById, searchSpeciesByName } from '../species'

describe('species data integrity', () => {
  it('has unique ids', () => {
    const ids = SPECIES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every entry has non-empty core fields', () => {
    for (const s of SPECIES) {
      expect(s.id.trim()).not.toBe('')
      expect(s.scientificName.trim()).not.toBe('')
      expect(s.koreanName.trim()).not.toBe('')
      expect(s.features.trim()).not.toBe('')
      expect(s.food.trim()).not.toBe('')
      expect(s.habitat.trim()).not.toBe('')
    }
  })

  it('every entry has a complete 8-level taxonomy', () => {
    const levels = ['domain', 'kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species'] as const
    for (const s of SPECIES) {
      for (const level of levels) {
        expect(s.taxonomy[level].trim(), `${s.id}.${level}`).not.toBe('')
      }
    }
  })

  it('no feature description reveals its own species name (quiz answer leakage)', () => {
    const leaks = SPECIES.filter((s) => s.features.includes(s.koreanName))
    expect(leaks.map((s) => s.id)).toEqual([])
  })
})

describe('findSpeciesById', () => {
  it('finds a known species', () => {
    expect(findSpeciesById('saja')?.koreanName).toBe('사자')
  })

  it('returns undefined for an unknown id', () => {
    expect(findSpeciesById('nonexistent')).toBeUndefined()
  })
})

describe('searchSpeciesByName', () => {
  it('returns empty array for an empty or whitespace-only query', () => {
    expect(searchSpeciesByName('')).toEqual([])
    expect(searchSpeciesByName('   ')).toEqual([])
  })

  it('matches by partial Korean name', () => {
    const results = searchSpeciesByName('바다')
    expect(results.some((s) => s.id === 'pureun-badageobuk')).toBe(true)
  })

  it('matches case-insensitively by scientific name', () => {
    const results = searchSpeciesByName('panthera')
    expect(results.some((s) => s.id === 'saja')).toBe(true)
  })
})
