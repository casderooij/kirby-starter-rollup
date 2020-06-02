import babel from '@rollup/plugin-babel';
import browsersync from 'rollup-plugin-browsersync';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';

const uglify = require("@lopatnov/rollup-plugin-uglify");

export default {
  input: './src/js/main.js',
  output: {
    file: 'htdocs/public/assets/main.js',
    format: 'iife'
  },
  plugins: [
    postcss({
      extract: 'style.css'
    }),
    resolve(),
    commonjs(),
    ...process.env.NODE_ENV === 'development' ? [
      browsersync({
        notify: false,
        proxy: 'starter.test', // change this url to your local url!
        files: [
          "./htdocs/public/assets/js/*.js",
          "./htdocs/public/assets/css/*.css",
          "./htdocs/site/templates/*.php",
          './htdocs/site/templates/**/*.php',
          "./htdocs/site/snippets/*.php",
          "./htdocs/site/snippets/**/*.php",
          // not sure these two are useful but might be for you
          //   "./htdocs/public/site/plugins/**/*.php",
          //   "./htdocs/public/content/**/*.txt"
        ]
      }),
    ] : [],
    ...process.env.NODE_ENV === 'production' ? [
      babel({
        exclude: 'node_modules/**',
      }),
      uglify()
    ] : []
  ]
}
