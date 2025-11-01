import type { Options } from './core/types'
import type { OpenPeepsOptions } from './open-peeps'
import type { AvatarOptions } from './types'
import { AVATAR_CONFIG, SVG_CONFIG } from './config/avatar'
import { createAvatar as createBaseAvatar } from './core'
import * as openPeeps from './open-peeps'
import { selectClothingColor, selectFaceEmotion, selectGenderConfig } from './utils/selectors'
import { validateAvatarOptions } from './utils/validation'

/**
 * Create an avatar
 * @returns SVG string
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
