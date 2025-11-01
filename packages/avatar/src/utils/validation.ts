import type { AvatarOptions } from '../types'

export function validateAvatarOptions(options: AvatarOptions): void {
  if (!options?.seed || typeof options.seed !== 'string') {
    throw new Error('seed is required')
  }
  if (options?.seed?.trim() === '') {
    throw new Error('seed is required')
  }

  if (options?.emotion !== undefined && options?.emotion !== null) {
    if (typeof options?.emotion === 'number' && (options?.emotion < 1 || options?.emotion > 10)) {
      throw new Error('emotion must be between 1 and 10')
    }
    if (typeof options?.emotion !== 'number') {
      throw new TypeError('emotion must be a number')
    }
  }

  if (options?.gender && !['male', 'female'].includes(options.gender)) {
    throw new Error('gender must be either "male" or "female"')
  }

  if (options?.clothing && !['amber', 'green', 'blue', 'teal', 'pink', 'violet'].includes(options.clothing)) {
    throw new Error('clothing must be one of "amber", "green", "blue", "teal", "pink", "violet"')
  }
}
