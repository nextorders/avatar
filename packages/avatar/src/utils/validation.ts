import type { AvatarOptions } from '../types'

export function validateAvatarOptions(options: AvatarOptions): void {
  if (!options.seed) {
    throw new Error('seed is required')
  }

  if (options.emotion && (options.emotion < 1 || options.emotion > 10)) {
    throw new Error('emotion must be between 1 and 10')
  }

  if (options.gender && !['male', 'female'].includes(options.gender)) {
    throw new Error('gender must be either "male" or "female"')
  }
}
