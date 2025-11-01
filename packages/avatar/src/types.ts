import type { EmotionNumber } from './config/emotions'

export type AvatarOptions = {
  seed: string
  gender?: Gender
  clothing?: ClothingColor
  emotion?: EmotionNumber
}

export type Gender = 'male' | 'female'

export type ClothingColor = 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
