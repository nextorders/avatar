import type { FaceEmotion } from './open-peeps/types'

export type AvatarOptions = {
  seed: string
  gender?: Gender
  clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export type PossibleFace = FaceEmotion

export type PossibleEmotion
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

export type PossibleAccessories
  = | 'glasses'
    | 'glasses2'
    | 'glasses3'
    | 'glasses4'
    | 'glasses5'
    | 'sunglasses'
    | 'sunglasses2'

export type Gender = 'male' | 'female'

export type ClothingColor = 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
