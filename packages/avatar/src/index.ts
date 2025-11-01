import type { Options } from './core/types'
import type { OpenPeepsOptions } from './open-peeps'
import type { AvatarOptions } from './types'
import { AVATAR_CONFIG, SVG_CONFIG } from './config/avatar'
import { createAvatar as createBaseAvatar } from './core'
import * as openPeeps from './open-peeps'
import { selectClothingColor, selectFaceEmotion, selectGenderConfig } from './utils/selectors'
import { validateAvatarOptions } from './utils/validation'

/**
 * Creates a deterministic SVG avatar based on the provided options
 * @param options - Avatar generation options
 * @param options.seed - Unique identifier for deterministic generation
 * @param options.gender - Avatar gender
 * @param options.clothing - Clothing color
 * @param options.emotion - Avatar emotion
 * @returns SVG string representation of the avatar
 * @throws {Error} When options are invalid
 */
export function createAvatar(options: AvatarOptions): string {
  validateAvatarOptions(options)
  return createBaseAvatar(openPeeps, buildOptions(options)).toString()
}

function buildOptions(data: AvatarOptions): Partial<Options & OpenPeepsOptions> {
  const genderConfig = selectGenderConfig(data.gender)

  return {
    ...SVG_CONFIG,
    ...AVATAR_CONFIG,
    ...genderConfig,
    seed: data.seed,
    face: selectFaceEmotion(data.emotion),
    clothingColor: selectClothingColor(data.clothing),
  }
}
