import type { Options } from '../core/types'
import type { OpenPeepsOptions } from '../open-peeps/types'
import { ALL_ACCESSORIES } from './accessories'

export const SKIN_COLORS = [
  'fce5d3',
]

export const SVG_CONFIG = {
  size: 256,
  scale: 80,
  translateX: -5,
  backgroundType: ['randomGradientLinear'],
} satisfies Partial<Options>

export const AVATAR_CONFIG = {
  accessoriesProbability: 20,
  skinColor: SKIN_COLORS,
  accessories: ALL_ACCESSORIES,
} satisfies Partial<OpenPeepsOptions>
