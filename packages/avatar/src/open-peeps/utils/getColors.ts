import type { ColorPickCollection, Options, Prng } from '../types'
import { convertColor } from './convertColor'

type Props = {
  prng: Prng
  options: Options
}

export function getColors({ prng, options }: Props): ColorPickCollection {
  return {
    skin: convertColor(prng.pick(options.skinColor ?? [], 'transparent')),
    clothing: convertColor(
      prng.pick(options.clothingColor ?? [], 'transparent'),
    ),
    headContrast: convertColor(
      prng.pick(options.headContrastColor ?? [], 'transparent'),
    ),
  }
}
