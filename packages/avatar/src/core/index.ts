import type { Result, Style, StyleOptions } from '../open-peeps/types'
import { getBackgroundColors } from './utils/color'
import { merge as mergeOptions } from './utils/options'
import { create as createPrng } from './utils/prng'
import * as svgUtils from './utils/svg'

export function createAvatar<O extends object>(
  style: Style<O>,
  options: StyleOptions<O> = {},
): Result {
  options = mergeOptions(style, options)

  const prng = createPrng(options.seed)
  const result = style.create({ prng, options })

  const backgroundType = prng.pick(options.backgroundType ?? [], 'solid')
  const {
    primary: primaryBackgroundColor,
    secondary: secondaryBackgroundColor,
  } = getBackgroundColors(prng, options.backgroundColor ?? [], backgroundType)

  const backgroundRotation = prng.integer(
    options.backgroundRotation?.length
      ? Math.min(...options.backgroundRotation)
      : 0,
    options.backgroundRotation?.length
      ? Math.max(...options.backgroundRotation)
      : 0,
  )

  if (options.size) {
    result.attributes.width = options.size.toString()
    result.attributes.height = options.size.toString()
  }

  if (options.scale !== undefined && options.scale !== 100) {
    result.body = svgUtils.addScale(result, options.scale)
  }

  if (options.flip) {
    result.body = svgUtils.addFlip(result)
  }

  if (options.rotate) {
    result.body = svgUtils.addRotate(result, options.rotate)
  }

  if (options.translateX || options.translateY) {
    result.body = svgUtils.addTranslate(
      result,
      options.translateX,
      options.translateY,
    )
  }

  if (
    primaryBackgroundColor !== 'transparent'
    && secondaryBackgroundColor !== 'transparent'
  ) {
    result.body = svgUtils.addBackground(
      result,
      primaryBackgroundColor,
      secondaryBackgroundColor,
      backgroundType,
      backgroundRotation,
    )
  }

  if (options.radius || options.clip) {
    result.body = svgUtils.addViewboxMask(result, options.radius ?? 0)
  }

  if (options.randomizeIds) {
    // Reduces the occurrence of ID collisions when rendering multiple avatars on one HTML page.
    result.body = svgUtils.randomizeIds(result)
  }

  const attributes = svgUtils.createAttrString(result)

  const svg = `<svg ${attributes}>${result.body}</svg>`

  return {
    toString: () => svg,
    toJson: () => ({
      svg,
      extra: {
        primaryBackgroundColor,
        secondaryBackgroundColor,
        backgroundType,
        backgroundRotation,
        ...result.extra?.(),
      },
    }),
    toDataUri: () => {
      return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
    },
  }
}
