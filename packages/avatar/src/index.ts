import type { Options, StyleOptions } from './core/types'
import type { OpenPeepsOptions } from './open-peeps'
import { createAvatar as createBaseAvatar } from './core'
import * as openPeeps from './open-peeps'
import { getRandInteger } from './random'

export type AvatarOptions = {
  seed: string
  gender?: Gender
  clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

/**
 * Create an avatar
 * @returns SVG string
 *
 * @example
 * ```
 * createAvatar({
 *   seed: 'random',
 *   gender: 'female',
 *   clothing: 'blue',
 *   emotion: 10,
 * })
 * ```
 */
export function createAvatar(options: AvatarOptions): string {
  return createBaseAvatar(openPeeps, getOptions(options)).toString()
}

function getOptions(data: AvatarOptions): Partial<Options> {
  return {
    seed: data.seed,
    size: 256,
    scale: 80,
    translateX: -5,
    accessoriesProbability: 20,
    maskProbability: 0,
    face: getPossibleFaces(data.emotion ?? null),
    accessories: getPossibleAccessories(),
    skinColor: getPossibleSkinColors(),
    clothingColor: chooseClothingColor(data.clothing),
    ...choosePartsByGender(data.gender),
  }
}

type PossibleEmotion
  = | 'rage'
    | 'veryAngry'
    | 'solemn'
    | 'tired'
    | 'serious'
    | 'eyesClosed'
    | 'smile'
    | 'calm'
    | 'eatingHappy'
    | 'lovingGrin1'

type PossibleAccessories
  = | 'glasses'
    | 'glasses2'
    | 'glasses3'
    | 'glasses4'
    | 'glasses5'
    | 'sunglasses'
    | 'sunglasses2'

type Gender = 'male' | 'female'

// 1 to 10
const emotions: PossibleEmotion[] = [
  'rage',
  'veryAngry',
  'solemn',
  'tired',
  'serious',
  'eyesClosed',
  'smile',
  'calm',
  'eatingHappy',
  'lovingGrin1',
]

const allFaces: OpenPeepsOptions['face'] = [
  ...emotions,
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
]

const availableClothingColors = [
  { name: 'amber', color: 'fcd34d' },
  { name: 'green', color: '86efac' },
  { name: 'blue', color: '93c5fd' },
  { name: 'teal', color: '5eead4' },
  { name: 'pink', color: 'f9a8d4' },
  { name: 'violet', color: 'c4b5fd' },
]

const male: Partial<StyleOptions<OpenPeepsOptions>> = {
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'flatTop',
    'flatTopLong',
    'grayShort',
    'hatBeanie',
    'mohawk',
    'mohawk2',
    'noHair1',
    'noHair2',
    'noHair3',
    'pomp',
    'shaved2',
    'shaved3',
    'short1',
    'short2',
    'short3',
    'short4',
    'short5',
    'twists',
    'twists2',
  ],
  facialHairProbability: 10,
  facialHair: [
    'chin',
    'full',
    'full2',
    'full3',
    'full4', // with color
    'goatee1',
    'goatee2',
    'moustache1',
    'moustache2',
    'moustache3',
    'moustache4',
    'moustache5',
    'moustache6',
    'moustache7',
    'moustache9', // with color
  ],
}

const female: Partial<StyleOptions<OpenPeepsOptions>> = {
  facialHairProbability: 0,
  head: [
    'afro', // unisex
    'dreads1', // unisex
    'dreads2', // unisex
    'hatHip', // unisex
    'bangs',
    'bangs2',
    'bantuKnots',
    'bun',
    'bun2',
    'buns',
    'cornrows',
    'cornrows2',
    'grayBun',
    'grayMedium',
    'long',
    'longBangs',
    'longCurly',
    'medium1',
    'medium2',
    'medium3',
    'mediumBangs',
    'mediumBangs2',
    'mediumBangs3',
    'mediumStraight',
    'shaved1',
  ],
}

function choosePartsByGender(gender: string | undefined) {
  if (!gender) {
    const sexVariants = ['male', 'female']
    const randomSex = sexVariants[getRandInteger(0, 1)]

    return randomSex === 'male' ? male : female
  }

  return gender.toLowerCase() === 'male' ? male : female
}

function chooseEmotionByNumber(emotion: number | null) {
  let emotionChosen: PossibleEmotion | null = null

  if (emotion && emotion >= 1 && emotion <= 10) {
    emotionChosen = emotions[emotion - 1] ?? null
  }

  return emotionChosen
}

function chooseClothingColor(clothing: string | null | undefined) {
  const findClothingColor = availableClothingColors.find(
    (color) => color.name === clothing,
  )
  return findClothingColor ? [findClothingColor.color] : ['f4f4f5']
}

function getPossibleFaces(emotion: number | null) {
  const emotionChosen = chooseEmotionByNumber(emotion)
  return emotionChosen ? [emotionChosen] : allFaces
}

function getPossibleAccessories(): PossibleAccessories[] {
  return [
    'glasses',
    'glasses2',
    'glasses3',
    'glasses4',
    'glasses5',
    'sunglasses',
    'sunglasses2',
  ]
}

function getPossibleSkinColors() {
  return ['fce5d3']
}
