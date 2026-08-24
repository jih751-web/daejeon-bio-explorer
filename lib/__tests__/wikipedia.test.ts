import { describe, it, expect, vi } from 'vitest'
import { describeFromWikipedia } from '../wikipedia'

describe('describeFromWikipedia', () => {
  it('returns the extract as description text when the page exists', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ extract: '호랑이는 고양잇과에 속하는 동물이다.' }),
    } as Response)

    const result = await describeFromWikipedia('호랑이')
    expect(result).toEqual({ source: 'wikipedia', text: '호랑이는 고양잇과에 속하는 동물이다.' })
  })

  it('returns null when the page does not exist', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({ ok: false, status: 404 } as Response)

    const result = await describeFromWikipedia('존재하지않는생물')
    expect(result).toBeNull()
  })
})
