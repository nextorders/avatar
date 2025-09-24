import type { JSONSchema7 } from 'json-schema'

export interface Result {
  toString: () => string
  toJson: () => {
    svg: string
    extra: Record<string, unknown>
  }
  toDataUri: () => string
}

export interface Prng {
  seed: string
  next: () => void
  bool: (likelihood?: number) => boolean
  integer: (min: number, max: number) => number
  pick: (<T>(arr: T[], fallback: T) => T) & (<T>(arr: T[]) => T | undefined)
  shuffle: <T>(arr: T[]) => T[]
  string: (length: number, characters?: string) => string
}

export type SchemaDefaults = Record<string, unknown>

export interface Style<O extends object> {
  schema?: JSONSchema7
  create: StyleCreate<O>
}

export type StyleOptions<O extends object> = Partial<O & Options>

export interface StyleCreateProps<O extends object> {
  prng: Prng
  options: StyleOptions<O>
}

export type StyleCreate<O extends object> = (
  props: StyleCreateProps<O>,
) => StyleCreateResult

export interface StyleCreateResultAttributes {
  viewBox: string
  [key: string]: string
}

export interface StyleCreateResult {
  attributes: StyleCreateResultAttributes
  body: string
  extra?: () => Record<string, unknown>
}

export type BackgroundType = 'solid' | 'gradientLinear'

export interface Options {
  head?: (
    | 'afro'
    | 'bangs'
    | 'bangs2'
    | 'bantuKnots'
    | 'bear'
    | 'bun'
    | 'bun2'
    | 'buns'
    | 'cornrows'
    | 'cornrows2'
    | 'dreads1'
    | 'dreads2'
    | 'flatTop'
    | 'flatTopLong'
    | 'grayBun'
    | 'grayMedium'
    | 'grayShort'
    | 'hatBeanie'
    | 'hatHip'
    | 'hijab'
    | 'long'
    | 'longAfro'
    | 'longBangs'
    | 'longCurly'
    | 'medium1'
    | 'medium2'
    | 'medium3'
    | 'mediumBangs'
    | 'mediumBangs2'
    | 'mediumBangs3'
    | 'mediumStraight'
    | 'mohawk'
    | 'mohawk2'
    | 'noHair1'
    | 'noHair2'
    | 'noHair3'
    | 'pomp'
    | 'shaved1'
    | 'shaved2'
    | 'shaved3'
    | 'short1'
    | 'short2'
    | 'short3'
    | 'short4'
    | 'short5'
    | 'turban'
    | 'twists'
    | 'twists2'
  )[]
  face?: (
    | 'angryWithFang'
    | 'awe'
    | 'blank'
    | 'calm'
    | 'cheeky'
    | 'concerned'
    | 'concernedFear'
    | 'contempt'
    | 'cute'
    | 'cyclops'
    | 'driven'
    | 'eatingHappy'
    | 'explaining'
    | 'eyesClosed'
    | 'fear'
    | 'hectic'
    | 'lovingGrin1'
    | 'lovingGrin2'
    | 'monster'
    | 'old'
    | 'rage'
    | 'serious'
    | 'smile'
    | 'smileBig'
    | 'smileLOL'
    | 'smileTeethGap'
    | 'solemn'
    | 'suspicious'
    | 'tired'
    | 'veryAngry'
  )[]
  facialHair?: (
    | 'chin'
    | 'full'
    | 'full2'
    | 'full3'
    | 'full4'
    | 'goatee1'
    | 'goatee2'
    | 'moustache1'
    | 'moustache2'
    | 'moustache3'
    | 'moustache4'
    | 'moustache5'
    | 'moustache6'
    | 'moustache7'
    | 'moustache8'
    | 'moustache9'
  )[]
  facialHairProbability?: number
  mask?: ('medicalMask' | 'respirator')[]
  maskProbability?: number
  accessories?: (
    | 'eyepatch'
    | 'glasses'
    | 'glasses2'
    | 'glasses3'
    | 'glasses4'
    | 'glasses5'
    | 'sunglasses'
    | 'sunglasses2'
  )[]
  accessoriesProbability?: number
  skinColor?: string[]
  clothingColor?: string[]
  headContrastColor?: string[]
}

export type ColorPickCollection = Record<string, string>

export type ComponentGroup = Record<string, ComponentGroupItem>
export type ComponentGroupCollectionKey = 'accessories' | 'face' | 'facialHair' | 'head' | 'mask'
export type ComponentGroupCollection = Record<ComponentGroupCollectionKey, ComponentGroup>
export type ComponentGroupItem = (colors: ColorPickCollection) => string
export type ComponentPickCollection = Record<string, ComponentPick>
export type ComponentPick
  = | {
    name: string
    value: ComponentGroupItem
  }
  | undefined
