import { describe, it, expect } from 'vitest'
import { generateSessionCode } from '../sessionCode'

describe('generateSessionCode', () => {
  it('returns a 4-digit numeric string', () => {
    const code = generateSessionCode()
    expect(code).toMatch(/^\d{4}$/)
  })
})
