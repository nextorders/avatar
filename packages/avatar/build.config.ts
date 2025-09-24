import { copyFileSync } from 'node:fs'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/index',
  ],
  hooks: {
    'build:before': () => {
      // Copy README.md from root
      copyFileSync('../../README.md', './README.md')
    },
  },
})
