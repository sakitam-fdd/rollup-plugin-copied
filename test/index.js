import assert from 'assert'
import fs from 'fs'
import rimraf from 'rimraf'
import {rollup} from 'rollup'
import copy from '../'
const dest = './dist/index.js'

process.chdir(__dirname)

describe('rollup-plugin-copy', () => {
  after(() => promise(rimraf, './dist/'))

  it('copy file', () =>
    run('./fixtures/index.js', './dist/images')
      .then(() => Promise.all([
        assertExists(`./dist/images/png.png`, true)
      ]))
  )
})

function promise(fn, ...args) {
  return new Promise((resolve, reject) =>
    fn(...args, (err, res) =>
      err ? reject(err) : resolve(res)))
}

function run(input, publicPath = '', emitFiles = true) {
  const plugin = copy({
    from: './fixtures/', // defaults to .svg, .png, .jpg and .gif files
    to: './dist/images',
    emitFiles: emitFiles // defaults to true
  });
  return rollup({
    input,
    plugins: [plugin],
  }).then(bundle => bundle.write({
    file: dest,
    format: 'es'
  }))
}

function assertExists(name, shouldExist = true) {
  return promise(fs.stat, name)
    .then(() => true, () => false)
    .then(exists => assert.ok(exists === shouldExist))
}
