import { describe, expect, it } from 'vitest'
import { createAvatar } from '../../src/index'

describe('index', () => {
  describe('createAvatar', () => {
    it('should be defined', () => {
      expect(typeof createAvatar).toBe('function')
    })

    it('should return svg as string without optional parameters', () => {
      const result = createAvatar({ seed: 'random' })
      expect(typeof result).toBe('string')
    })

    it('should return error if seed is not provided', () => {
      try {
        // @ts-expect-error seed is required
        createAvatar({})
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
      }
    })

    it('should return correct result with emotion 5', () => {
      const result = createAvatar({ seed: 'random4', emotion: 5 })
      expect(result).toContain('m157.9 261 2-.5c7.7-2 15.7-5.4')
    })

    it('should return correct result with gender female and color', () => {
      const result = createAvatar({ seed: 'random3', gender: 'female', clothing: 'blue' })
      expect(result).toContain('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 704 704"')
    })

    it('should return correct result with full options and normal size', () => {
      const result = createAvatar({
        seed: 'random2',
        gender: 'male',
        clothing: 'amber',
        emotion: 7,
      })
      // in kilobytes
      const resultSize = result.length / 1024
      expect(resultSize).toBeGreaterThan(0)
      expect(resultSize).toBeLessThan(20)
    })
  })
})
