export function convertColor(color: string): string {
  return color === 'transparent' ? color : `#${color}`
}
