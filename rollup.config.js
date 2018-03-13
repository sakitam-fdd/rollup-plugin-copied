const eslintConfig = require('./.eslintrc');
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import friendlyFormatter from 'eslint-friendly-formatter';

const external = [
  'rollup-pluginutils',
  'path',
  'fs',
];

export default {
  input: 'src/index.js',
  external,
  plugins: [
    eslint(Object.assign({}, eslintConfig, {
      formatter: friendlyFormatter,
      exclude: [
        'package.json',
        'node_modules/**'
      ]
    })),
    babel({
      babelrc: false,
      'presets': [
        [
          'es2015',
          {
            'modules': false
          }
        ]
      ],
    })
  ],
  output: {
    format: 'cjs',
    file: 'dist/index.js'
  }
}
