import type { PossibleFace } from '../types'

export const EMOTION_MAPPING = {
  1: 'rage',
  2: 'veryAngry',
  3: 'solemn',
  4: 'tired',
  5: 'serious',
  6: 'eyesClosed',
  7: 'smile',
  8: 'calm',
  9: 'eatingHappy',
  10: 'lovingGrin1',
} as const

export const ALL_EMOTIONS: PossibleFace[] = [
  ...Object.values(EMOTION_MAPPING),
  'suspicious',
  'contempt',
  'hectic',
  'driven',
  'smileTeethGap',
  'smileLOL',
  'smileBig',
  'lovingGrin2',
  'fear',
  'explaining',
  'cute',
  'concernedFear',
  'concerned',
  'cheeky',
  'blank',
  'awe',
] as const
