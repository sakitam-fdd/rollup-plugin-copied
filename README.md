# rollup-plugin-copied

> Copy files && directories with rollup

[![Build Status](https://travis-ci.org/sakitam-fdd/rollup-plugin-copied.svg?branch=master)](https://www.travis-ci.org/sakitam-fdd/rollup-plugin-copied)
[![Npm package](https://img.shields.io/npm/v/rollup-plugin-copied.svg)](https://www.npmjs.org/package/rollup-plugin-copied)

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
}, {
  watch: true
});

// or

const _plugin = copy([
  {
    from: './fixtures/',
    to: './dist/images',
    emitFiles: true // defaults to true
  }
], {
  watch: true
});

const config = {
  plugins: [
    plugin
  ]
}
```

## patterns {Array|Object}

### if use Object

| Name | Type | Default | Description |
| :--: | :--: | :-----: | :---------- |
| **`'from'`** | `{String}` | `undefined` | If `from` is directory, `to` has no extension or ends in `'/'` |
| **`'to'`** | `{String}` | `undefined` | If `to` has extension or `from` is file |
| **`'emitFiles'`** | `{String}` | `undefined` | `enable plugin` |

### if use Array

> Array item just like use Object

| Name | Type | Default | Description |
| :--: | :--: | :-----: | :---------- |
| **`'from'`** | `{String}` | `undefined` | If `from` is directory, `to` has no extension or ends in `'/'` |
| **`'to'`** | `{String}` | `undefined` | If `to` has extension or `from` is file |
| **`'emitFiles'`** | `{String}` | `undefined` | `enable plugin` |

## options

| Name | Type | Default | Description |
| :--: | :--: | :-----: | :---------- |
| **`'exclude'`** | `{Array}` | `[]` | Array of globs to ignore (applied to from) |
| **`'include'`** | `{Array}` | `[]` | Array of globs to include (applied to from) |
| **`'watch'`** | `{Boolean}` | `true` | When set to false, only the changes of the first resource are monitored, and the monitoring is not repeated. |
