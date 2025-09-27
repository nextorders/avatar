export interface OpenPeepsOptions {
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

type ComponentGroupItem = (colors: ColorPickCollection) => string

export type ComponentGroup = Record<string, ComponentGroupItem>
export type ComponentGroupCollectionKey = 'accessories' | 'face' | 'facialHair' | 'head'
export type ComponentPickCollection = Record<string, ComponentPick>
export type ComponentPick
  = | {
    name: string
    value: ComponentGroupItem
  }
  | undefined
