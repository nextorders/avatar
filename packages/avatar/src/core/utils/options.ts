import type { JSONSchema7 } from 'json-schema'
import type {
  SchemaDefaults,
  Style,
  StyleOptions,
} from '../../open-peeps/types'
import { schema } from '../schema'

export function defaults(schema: JSONSchema7): SchemaDefaults {
  const result: SchemaDefaults = {}
  const props = schema.properties ?? {}

  Object.keys(props).forEach((key) => {
    const val = props[key]

    if (typeof val === 'object' && undefined !== val.default) {
      if (Array.isArray(val.default)) {
        result[key] = [...val.default]
      } else if (typeof val.default === 'object') {
        result[key] = { ...val.default }
      } else {
        result[key] = val.default
      }
    }
  })

  return result
}

export function merge<O extends object>(
  style: Style<O>,
  options: StyleOptions<O>,
): StyleOptions<O> {
  const result: StyleOptions<O> = {
    ...(defaults(schema) as StyleOptions<O>),
    ...(defaults(style.schema ?? {}) as StyleOptions<O>),
    ...options,
  }

  // Return a complete copy because the styles could partially customize the
  // options and thus modify nested objects and arrays.
  return JSON.parse(JSON.stringify(result))
}
