import type { Prng } from '../../core/types'
import type { ColorPickCollection, OpenPeepsOptions } from '../types'
import { convertColor } from '../../core/utils/color'

type Props = {
  prng: Prng
  options: OpenPeepsOptions
}

export function getColors({ prng, options }: Props): ColorPickCollection {
  return {
    skin: convertColor(prng.pick(options.skinColor ?? []) ?? 'transparent'),
    clothing: convertColor(prng.pick(options.clothingColor ?? []) ?? 'transparent'),
    headContrast: convertColor(prng.pick(options.headContrastColor ?? []) ?? 'transparent'),
  }
}
