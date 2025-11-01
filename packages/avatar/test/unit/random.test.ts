import { describe, expect, it } from 'vitest'
import { getRandInteger } from '../../src/utils/random'

describe('random', () => {
  it('should generate a random number within a range', () => {
    const result = getRandInteger(1, 10)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
  })

  it('should generate negative numbers', () => {
    const result = getRandInteger(-10, 0)
    expect(result).toBeGreaterThanOrEqual(-10)
    expect(result).toBeLessThanOrEqual(0)
  })

  it('should return min if max is less than min', () => {
    const result = getRandInteger(1, 0)
    expect(result).toBe(1)
  })

  it('should return correct value if min and max are the same', () => {
    const result = getRandInteger(0, 0)
    expect(result).toBe(0)
  })
})
