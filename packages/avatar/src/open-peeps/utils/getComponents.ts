import type { Prng } from '../../core/types'
import type { ComponentPickCollection, OpenPeepsOptions } from '../types'
import { pickComponent } from './pickComponent'

type Props = {
  prng: Prng
  options: OpenPeepsOptions
}

export function getComponents({
  prng,
  options,
}: Props): ComponentPickCollection {
  const headComponent = pickComponent({
    prng,
    group: 'head',
    values: options.head,
  })
  const faceComponent = pickComponent({
    prng,
    group: 'face',
    values: options.face,
  })
  const facialHairComponent = pickComponent({
    prng,
    group: 'facialHair',
    values: options.facialHair,
  })
  const maskComponent = pickComponent({
    prng,
    group: 'mask',
    values: options.mask,
  })
  const accessoriesComponent = pickComponent({
    prng,
    group: 'accessories',
    values: options.accessories,
  })

  return {
    head: headComponent,
    face: faceComponent,
    facialHair: prng.bool(options.facialHairProbability)
      ? facialHairComponent
      : undefined,
    mask: prng.bool(options.maskProbability) ? maskComponent : undefined,
    accessories: prng.bool(options.accessoriesProbability)
      ? accessoriesComponent
      : undefined,
  }
}
