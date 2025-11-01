import { describe, expect, it } from 'vitest'
import { validateAvatarOptions } from '../../src/utils/validation'

describe('validateAvatarOptions', () => {
  it('should accept valid options', () => {
    const validOptions = {
      seed: 'test-seed',
      gender: 'male' as const,
      clothing: 'blue' as const,
      emotion: 7 as const,
    }
    expect(() => validateAvatarOptions(validOptions)).not.toThrow()
  })

  it('should throw error for empty seed', () => {
    expect(() => validateAvatarOptions({ seed: '' })).toThrow('seed is required')
  })

  it('should throw error for non-string seed', () => {
    expect(() => validateAvatarOptions({ seed: 123 as any })).toThrow('seed is required')
  })

  it('should throw error for invalid gender', () => {
    expect(() => validateAvatarOptions({
      seed: 'test',
      gender: 'other' as any,
    })).toThrow('gender must be either "male" or "female"')
  })

  it('should throw error for invalid clothing color', () => {
    expect(() => validateAvatarOptions({
      seed: 'test',
      clothing: 'red' as any,
    })).toThrow('clothing must be one of "amber", "green", "blue", "teal", "pink", "violet"')
  })

  it('should throw error for invalid emotion', () => {
    expect(() => validateAvatarOptions({
      seed: 'test',
      emotion: 'oops' as any,
    })).toThrow('emotion must be a number')
  })

  it('should throw error for invalid emotion number', () => {
    expect(() => validateAvatarOptions({
      seed: 'test',
      emotion: 11 as any,
    })).toThrow('emotion must be between 1 and 10')
  })

  it('should throw error for emotion number 0', () => {
    expect(() => validateAvatarOptions({
      seed: 'test',
      emotion: 0 as any,
    })).toThrow('emotion must be between 1 and 10')
  })

  it('should throw error for negative emotion number', () => {
    expect(() => validateAvatarOptions({
      seed: 'test',
      emotion: -1 as any,
    })).toThrow('emotion must be between 1 and 10')
  })

  it('should accept all valid emotion numbers 1-10', () => {
    for (let i = 1; i <= 10; i++) {
      expect(() => validateAvatarOptions({
        seed: 'test',
        emotion: i as any,
      })).not.toThrow()
    }
  })

  it('should accept all valid clothing colors', () => {
    const validColors = ['amber', 'green', 'blue', 'teal', 'pink', 'violet']
    validColors.forEach((color) => {
      expect(() => validateAvatarOptions({
        seed: 'test',
        clothing: color as any,
      })).not.toThrow()
    })
  })
})
