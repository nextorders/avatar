import type { FaceEmotion } from '../open-peeps/types'
import type { ClothingColor, Gender } from '../types'
import { CLOTHING_COLORS, DEFAULT_CLOTHING_COLOR } from '../config/clothing'
import { ALL_EMOTIONS, EMOTION_MAPPING } from '../config/emotions'
import { FEMALE_CONFIG, MALE_CONFIG } from '../config/gender'
import { getRandInteger } from './random'

export function selectFaceEmotion(emotion?: number): FaceEmotion[] {
  if (!emotion || emotion < 1 || emotion > 10) {
    return ALL_EMOTIONS
  }

  const selectedEmotion = EMOTION_MAPPING[emotion as keyof typeof EMOTION_MAPPING]
  return selectedEmotion ? [selectedEmotion] : ALL_EMOTIONS
}

export function selectClothingColor(clothing?: ClothingColor): string[] {
  return clothing && CLOTHING_COLORS[clothing]
    ? [CLOTHING_COLORS[clothing]]
    : [DEFAULT_CLOTHING_COLOR]
}

export function selectGenderConfig(gender?: Gender) {
  if (!gender) {
    const randomGender = getRandInteger(0, 1) === 0 ? 'male' : 'female'
    return randomGender === 'male' ? MALE_CONFIG : FEMALE_CONFIG
  }

  return gender === 'male' ? MALE_CONFIG : FEMALE_CONFIG
}
