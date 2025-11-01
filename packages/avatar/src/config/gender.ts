import type { OpenPeepsOptions } from '../open-peeps/types'

export const MALE_CONFIG = {
  head: [
    'afro', 'dreads1', 'dreads2', 'hatHip',
    'flatTop', 'flatTopLong', 'grayShort', 'hatBeanie',
    'mohawk', 'mohawk2', 'noHair1', 'noHair2', 'noHair3',
    'pomp', 'shaved2', 'shaved3', 'short1', 'short2',
    'short3', 'short4', 'short5', 'twists', 'twists2',
  ],
  facialHairProbability: 10,
  facialHair: [
    'chin', 'full', 'full2', 'full3', 'full4',
    'goatee1', 'goatee2', 'moustache1', 'moustache2',
    'moustache3', 'moustache4', 'moustache5',
    'moustache6', 'moustache7', 'moustache9',
  ],
} satisfies Partial<OpenPeepsOptions>

export const FEMALE_CONFIG = {
  facialHairProbability: 0,
  head: [
    'afro', 'dreads1', 'dreads2', 'hatHip',
    'bangs', 'bangs2', 'bantuKnots', 'bun', 'bun2', 'buns',
    'cornrows', 'cornrows2', 'grayBun', 'grayMedium',
    'long', 'longBangs', 'longCurly', 'medium1', 'medium2',
    'medium3', 'mediumBangs', 'mediumBangs2', 'mediumBangs3',
    'mediumStraight', 'shaved1',
  ],
} satisfies Partial<OpenPeepsOptions>
