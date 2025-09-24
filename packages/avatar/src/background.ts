import { getRandInteger } from './random'

function generateHSL() {
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

export function addBackground(svg: string) {
  // Dynamic Background
  const [backgroundColor1, backgroundColor2] = generateHSL()

  const gradient = `
    <linearGradient id="linear-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="${backgroundColor1}" />
      <stop offset="1" stop-color="${backgroundColor2}"/>
    </linearGradient>
    <rect xmlns="http://www.w3.org/2000/svg" fill="url(#linear-gradient)" width="704" height="704" x="0" y="0"/>`

  const svgWithBackground = svg.replace(/<g transform/, `${gradient} $&`)

  return svgWithBackground
}
