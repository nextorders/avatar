import type { BackgroundType, StyleCreateResult } from '../../open-peeps/types'
import { xml } from './escape'
import { create as createPrng } from './prng'

export function getViewBox(result: StyleCreateResult) {
  const viewBox = result.attributes.viewBox.split(' ')

  const x = Number.parseInt(viewBox[0]!)
  const y = Number.parseInt(viewBox[1]!)
  const width = Number.parseInt(viewBox[2]!)
  const height = Number.parseInt(viewBox[3]!)

  return {
    x,
    y,
    width,
    height,
  }
}

export function addBackground(
  result: StyleCreateResult,
  primaryColor: string,
  secondaryColor: string,
  type: BackgroundType,
  rotation: number,
) {
  const { width, height, x, y } = getViewBox(result)

  const solidBackground = `<rect fill="${primaryColor}" width="${width}" height="${height}" x="${x}" y="${y}" />`

  switch (type) {
    case 'solid':
      return solidBackground + result.body

    case 'gradientLinear':
      return (
        `<rect fill="url(#backgroundLinear)" width="${width}" height="${height}" x="${x}" y="${y}" />`
        + `<defs>`
        + `<linearGradient id="backgroundLinear" gradientTransform="rotate(${rotation} 0.5 0.5)">`
        + `<stop stop-color="${primaryColor}"/>`
        + `<stop offset="1" stop-color="${secondaryColor}"/>`
        + `</linearGradient>`
        + `</defs>${
          result.body}`
      )
  }
}

export function addScale(result: StyleCreateResult, scale: number) {
  const { width, height, x, y } = getViewBox(result)

  const percent = scale ? (scale - 100) / 100 : 0

  const translateX = (width / 2 + x) * percent * -1
  const translateY = (height / 2 + y) * percent * -1

  return `<g transform="translate(${translateX} ${translateY}) scale(${
    scale / 100
  })">${result.body}</g>`
}

export function addTranslate(
  result: StyleCreateResult,
  x?: number,
  y?: number,
) {
  const viewBox = getViewBox(result)

  const translateX = (viewBox.width + viewBox.x * 2) * ((x ?? 0) / 100)
  const translateY = (viewBox.height + viewBox.y * 2) * ((y ?? 0) / 100)

  return `<g transform="translate(${translateX} ${translateY})">${result.body}</g>`
}

export function addRotate(result: StyleCreateResult, rotate: number) {
  const { width, height, x, y } = getViewBox(result)

  return `<g transform="rotate(${rotate}, ${width / 2 + x}, ${
    height / 2 + y
  })">${result.body}</g>`
}

export function addFlip(result: StyleCreateResult) {
  const { width, x } = getViewBox(result)

  return `<g transform="scale(-1 1) translate(${width * -1 - x * 2} 0)">${
    result.body
  }</g>`
}

export function addViewboxMask(result: StyleCreateResult, radius: number) {
  const { width, height, x, y } = getViewBox(result)

  const rx = radius ? (width * radius) / 100 : 0
  const ry = radius ? (height * radius) / 100 : 0

  return (
    `<mask id="viewboxMask">`
    + `<rect width="${width}" height="${height}" rx="${rx}" ry="${ry}" x="${x}" y="${y}" fill="#fff" />`
    + `</mask>`
    + `<g mask="url(#viewboxMask)">${result.body}</g>`
  )
}

export function createAttrString(result: StyleCreateResult): string {
  const attributes: Record<string, string> = {
    xmlns: 'http://www.w3.org/2000/svg',
    ...result.attributes,
  }

  return Object.keys(attributes)
    .map((attr) => `${xml(attr)}="${xml(attributes[attr])}"`)
    .join(' ')
}

export function randomizeIds(result: StyleCreateResult): string {
  const prng = createPrng(Math.random().toString())
  const ids: Record<string, string> = {}

  return result.body.replace(
    /(id="|url\(#)([\w-]+)([")])/gi,
    (_, m1, m2, m3) => {
      ids[m2] = ids[m2] || prng.string(8)

      return `${m1}${ids[m2]}${m3}`
    },
  )
}
