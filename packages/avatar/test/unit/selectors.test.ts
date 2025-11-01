import { describe, expect, it } from 'vitest'
import { FEMALE_CONFIG, MALE_CONFIG } from '../../src/config/gender'
import { selectClothingColor, selectFaceEmotion, selectGenderConfig } from '../../src/utils/selectors'

describe('selectors', () => {
  describe('selectGenderConfig', () => {
    it('should return provided gender', () => {
      expect(selectGenderConfig('male')).toBe(MALE_CONFIG)
      expect(selectGenderConfig('female')).toBe(FEMALE_CONFIG)
    })

    it('should return default when undefined', () => {
      const result = selectGenderConfig(undefined)
      expect([MALE_CONFIG, FEMALE_CONFIG]).toContain(result)
    })
  })

  describe('selectClothingColor', () => {
    it('should return provided clothing color', () => {
      expect(selectClothingColor('blue')).toEqual(['93c5fd'])
      expect(selectClothingColor('amber')).toEqual(['fcd34d'])
    })

    it('should return default when undefined', () => {
      const result = selectClothingColor(undefined)
      expect(result).toEqual(['f4f4f5'])
    })
  })

  describe('selectFaceEmotion', () => {
    it('should map emotion numbers correctly', () => {
      expect(selectFaceEmotion(1)).toEqual(['rage'])
      expect(selectFaceEmotion(5)).toEqual(['serious'])
      expect(selectFaceEmotion(7)).toEqual(['smile'])
      expect(selectFaceEmotion(10)).toEqual(['lovingGrin1'])
    })

    it('should return default when undefined', () => {
      const result = selectFaceEmotion(undefined)
      expect(typeof result[0]).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle all valid emotion numbers', () => {
      for (let i = 1; i <= 10; i++) {
        const result = selectFaceEmotion(i as any)
        expect(typeof result[0]).toBe('string')
        expect(result.length).toBeGreaterThan(0)
      }
    })
  })
})
