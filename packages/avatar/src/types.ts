import type { FaceEmotion } from './open-peeps/types'

export type AvatarOptions = {
  seed: string
  gender?: Gender
  clothing?: ClothingColor
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

export type PossibleFace = FaceEmotion

export type Gender = 'male' | 'female'

export type ClothingColor = 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
