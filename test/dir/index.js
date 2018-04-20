import assert from 'assert'
import fs from 'fs'
import rimraf from 'rimraf'
import {rollup} from 'rollup'
import copy from '../'
const dest = './dist/index.js'

process.chdir(__dirname)

describe('rollup-plugin-copied', () => {
  after(() => promise(rimraf, './dist/'));

  it('copy file', (done) => {
    run('./fixtures/index.js', {
      from: './fixtures/',
      to: './dist/images',
      emitFiles: true
    }).then(() => Promise.all([
      assertExists(`./dist/images/png.png`, true)
    ])).then(() => {
      promise(rimraf, './dist/');
      done();
    })
  });

  it('copy patterns array', (done) => {
    run('./fixtures/index.js', [
      {
        from: './fixtures/index.js',
        to: './dist/script',
        emitFiles: true
      },
      {
        from: './fixtures/png.png',
        to: './dist/images',
        emitFiles: true
      }
    ]).then(() => Promise.all([
      assertExists(`./dist/images/png.png`, true),
      assertExists(`./dist/script/index.js`, true)
    ])).then(() => {
      promise(rimraf, './dist/');
      done();
    })
  });

  it('copy file disable', (done) => {
    run('./fixtures/index.js', {
      from: './fixtures/',
      to: './dist/images',
      emitFiles: false
    }).then(() => Promise.all([
      assertExists(`./dist/images/png.png`, false)
    ])).then(() => {
      promise(rimraf, './dist/');
      done();
    })
  });

  it('deep folder', (done) => {
    run('./fixtures/index.js', {
      from: './fixtures/',
      to: './dist/folder/images',
      emitFiles: true
    }).then(() => Promise.all([
      assertExists(`./dist/folder/images/png.png`, true)
    ])).then(() => {
      promise(rimraf, './dist/');
      done();
    })
  });

  it('check exclude', (done) => {
    run('./fixtures/index.js', {
      from: './fixtures/',
      to: './dist/images',
      emitFiles: true
    }, {
      exclude: [
        'svg.svg'
      ],
      include: []
    }).then(() => Promise.all([
      assertExists(`./dist/images/svg.svg`, false),
      assertExists(`./dist/images/png.png`, true)
    ])).then(() => {
      promise(rimraf, './dist/');
      done();
    })
  });

  it('check include', (done) => {
    run('./fixtures/index.js', {
      from: './fixtures/',
      to: './dist/images',
      emitFiles: true
    }, {
      exclude: [],
      include: [
        'svg.svg'
      ]
    }).then(() => Promise.all([
      assertExists(`./dist/images/png.png`, false),
      assertExists(`./dist/images/svg.svg`, true)
    ])).then(() => {
      promise(rimraf, './dist/');
      done();
    })
  });
});

function promise(fn, ...args) {
  return new Promise((resolve, reject) =>
    fn(...args, (err, res) =>
      err ? reject(err) : resolve(res)))
}

function run(input, patterns, options = {}) {
  const plugin = copy(patterns, {
    exclude: options.exclude,
    include: options.include
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
    .catch(new Function())
}
