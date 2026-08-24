import { describe, it, expect, vi } from 'vitest'
import { describeFromNaris } from '../naris'

describe('describeFromNaris', () => {
  it('returns generalSpftrKor as description text when a species is found', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [{ scientificNameKor: '호랑이', generalSpftrKor: '몸길이 약 3m의 대형 고양잇과 동물' }],
      }),
    } as Response)

    const result = await describeFromNaris('Panthera tigris')

    expect(result).toEqual({ source: 'naris', text: '몸길이 약 3m의 대형 고양잇과 동물' })
  })

  it('returns null when no species is found', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ items: [] }),
    } as Response)

    const result = await describeFromNaris('Unknownus speciesus')
    expect(result).toBeNull()
  })
})
