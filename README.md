# rollup-plugin-copied

> Copy files && directories with rollup

## Install

```bash
npm i -D rollup-plugin-copied
```

## Usage

**rollup.config.js**

```js
const copy = require('rollup-plugin-copied');

const plugin = copy({
  from: './fixtures/',
  to: './dist/images',
  emitFiles: true // defaults to true
});

const config = {
  plugins: [
    plugin
  ]
}
```

## config

| Name | Type | Default | Description |
| :--: | :--: | :-----: | :---------- |
| **`'from'`** | `{String}` | `undefined` | If `from` is directory, `to` has no extension or ends in `'/'` |
| **`'to'`** | `{String}` | `undefined` | If `to` has extension or `from` is file |
| **`'emitFiles'`** | `{String}` | `undefined` | `enable plugin` |

