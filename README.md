# Avatar 👩‍🎨

[![npm version](https://badge.fury.io/js/%40nextorders%2Favatar.svg)](https://badge.fury.io/js/%40nextorders%2Favatar)

The `@nextorders/avatar` package allows you to easily generate SVG avatars.

Based on the [Open Peeps](https://www.openpeeps.com/) set by Pablo Stanley, which is licensed under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

## Installation

You can install the library via npm:

```bash
npm install @nextorders/avatar
```

## Usage

To generate an avatar, call the `createAvatar()` function and pass the options:

```typescript
type AvatarOptions = {
  seed?: string
  gender?: Gender
  clothing?: 'amber' | 'green' | 'blue' | 'teal' | 'pink' | 'violet'
  emotion?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}
```

## License

This project is licensed under the MIT License.
