import type { BackgroundType, Prng } from '../types'
import { getRandInteger } from '../../random'

export function convertColor(color: string): string {
  return color === 'transparent' ? color : `#${color}`
}

export function getBackgroundColors(
  prng: Prng,
  backgroundColor: string[],
  backgroundType: BackgroundType,
): { primary: string, secondary: string } {
  let shuffledBackgroundColors = prng.shuffle(backgroundColor)

  function goNext() {
    // Case: shuffledBackgroundColors.length <= 1
    // If no background color or only one background color has been selected,
    // the random sorting logic can be omitted.

    // Case: backgroundColor.length === 2 && backgroundType === 'gradientLinear'
    // If the background is to be a color gradient and exactly two background
    // colors have been specified, do not sort them randomly. In this case, we
    // assume that the order of the background colors was chosen on purpose.

    shuffledBackgroundColors = backgroundColor
    // A function call should in any case make an identical number of calls to the PRNG.
    prng.next()
  }

  if (shuffledBackgroundColors.length <= 1) {
    goNext()
  } else if (backgroundColor.length === 2 && backgroundType === 'gradientLinear') {
    goNext()
  } else {
    shuffledBackgroundColors = prng.shuffle(backgroundColor)
  }

  if (shuffledBackgroundColors.length === 0) {
    shuffledBackgroundColors = ['transparent']
  }

  const primary = shuffledBackgroundColors[0]!
  const secondary = shuffledBackgroundColors[1] ?? shuffledBackgroundColors[0]!

  return {
    primary: convertColor(primary),
    secondary: convertColor(secondary),
  }
}

export function generateHarmoniousBackgroundColors(): [string, string] {
  const background1 = [
    getRandInteger(0, 360),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ]
  const bg0 = background1[0] ?? 0
  const background2 = [
    bg0 - getRandInteger(25, 70),
    getRandInteger(60, 100),
    getRandInteger(75, 90),
  ]

  const backgroundColor1 = `hsl(${background1[0]}deg ${background1[1]}% ${background1[2]}%)`
  const backgroundColor2 = `hsl(${background2[0]}deg ${background2[1]}% ${background2[2]}%)`

  return [backgroundColor1, backgroundColor2]
}
