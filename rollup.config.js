import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

function makeDest(format) {
  return `dist/min/${pkg.name}.${format}${isMinify ? `.min` : ``}.js`;
}

const isMinify = process.env.MINIFY === 'minify';
const pkg = require('./package.json');

const targets = [
  { file: makeDest('cjs'), format: 'cjs' },
  { file: makeDest('umd'), format: 'umd', name: pkg.name }
];

export default {
  input: './src/index.js',
  output: isMinify
    ? targets
    : {
        file: './dist/state-provider.js',
        format: 'es'
      },
  useStrict: false,
  external: ['react', 'prop-types'],
  plugins: [
    babel({ runtimeHelpers: false, exclude: 'node_modules/**' }),
    isMinify ? uglify() : {}
  ],
  globals: {
    react: 'React',
    'prop-types': 'PropTypes'
  }
};
