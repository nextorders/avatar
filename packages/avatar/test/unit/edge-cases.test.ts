import { describe, expect, it } from 'vitest'
import { createAvatar } from '../../src/index'

describe('edge cases', () => {
  it('should handle very long seeds', () => {
    const longSeed = 'a'.repeat(1000)
    expect(() => createAvatar({ seed: longSeed })).not.toThrow()
  })

  it('should handle seeds with unicode characters', () => {
    const unicodeSeed = '测试🚀💖αβγ'
    expect(() => createAvatar({ seed: unicodeSeed })).not.toThrow()
  })

  it('should handle seeds with special characters', () => {
    const specialSeed = '!@#$%^&*()_+-=[]{}|;:,.<>?'
    expect(() => createAvatar({ seed: specialSeed })).not.toThrow()
  })

  it('should handle numeric strings as seeds', () => {
    expect(() => createAvatar({ seed: '12345' })).not.toThrow()
    expect(() => createAvatar({ seed: '0' })).not.toThrow()
  })

  it('should handle empty string edge case', () => {
    expect(() => createAvatar({ seed: '' })).toThrow()
  })

  it('should handle whitespace-only seeds', () => {
    expect(() => createAvatar({ seed: '   ' })).toThrow()
  })

  it('should generate different results for similar seeds', () => {
    const avatar1 = createAvatar({ seed: 'test' })
    const avatar2 = createAvatar({ seed: 'test ' })
    const avatar3 = createAvatar({ seed: 'Test' })

    expect(avatar1).not.toBe(avatar2)
    expect(avatar1).not.toBe(avatar3)
    expect(avatar2).not.toBe(avatar3)
  })
})
