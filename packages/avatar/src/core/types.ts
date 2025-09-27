import type { JSONSchema7 } from 'json-schema'

export interface Result {
  toString: () => string
  toJson: () => {
    svg: string
    extra: Record<string, unknown>
  }
  toDataUri: () => string
}

export interface Prng {
  seed: string
  next: () => void
  bool: (likelihood?: number) => boolean
  integer: (min: number, max: number) => number
  pick: <T>(arr: T[]) => T | undefined
  shuffle: <T>(arr: T[]) => T[]
  string: (length: number, characters?: string) => string
}

export interface Options {
  seed?: string
  flip?: boolean
  rotate?: number
  scale?: number
  radius?: number
  size?: number
  backgroundColor?: string[]
  backgroundType?: BackgroundType[]
  backgroundRotation?: number[]
  translateX?: number
  translateY?: number
  clip?: boolean
}

export type SchemaDefaults = Record<string, unknown>

export interface Style<O extends object> {
  schema?: StyleSchema
  create: StyleCreate<O>
}

export type StyleSchema = JSONSchema7

export type StyleOptions<O extends object> = Partial<O & Options>

interface StyleCreateProps<O extends object> {
  prng: Prng
  options: StyleOptions<O>
}

export type StyleCreate<O extends object> = (
  props: StyleCreateProps<O>,
) => StyleCreateResult

interface StyleCreateResultAttributes {
  viewBox: string
  [key: string]: string
}

export interface StyleCreateResult {
  attributes: StyleCreateResultAttributes
  body: string
  extra?: () => Record<string, unknown>
}

export type BackgroundType = 'solid' | 'gradientLinear' | 'randomGradientLinear'
