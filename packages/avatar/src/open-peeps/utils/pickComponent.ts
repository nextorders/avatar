import type { ComponentGroupCollectionKey, ComponentPick, Prng } from '../types'
import * as componentCollection from '../components'

type Props = {
  prng: Prng
  group: ComponentGroupCollectionKey
  values?: string[]
}

export function pickComponent({
  prng,
  group,
  values = [],
}: Props): ComponentPick {
  const key = prng.pick(values)
  if (!key) {
    return
  }

  const value = componentCollection[group][key]

  if (key && value) {
    return {
      name: key,
      value,
    }
  }
}
