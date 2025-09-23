import { describe, expect, it } from 'vitest'
import { getRandInteger } from '../../src/random'

describe('random', () => {
  it('should generate a random number', () => {
    const result = getRandInteger(1, 10)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
  })
})
