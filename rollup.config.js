import babel from '@rollup/plugin-babel';
import browsersync from 'rollup-plugin-browsersync';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from "rollup-plugin-terser";
import url from "@rollup/plugin-url";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: './src/js/main.js',
  output: {
    file: 'htdocs/public/assets/main.js',
    format: 'iife'
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('htdocs/public/assets/bundle.css');
      }
    }),
    postcss({
      extract: 'style.css'
    }),
    resolve({ jsnext: true, preferBuiltins: false }),
    production && babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    !production && browsersync({
      notify: false,
      proxy: 'kirby-starter.test',
      files: [
        "./htdocs/public/assets/js/*.js",
        "./htdocs/public/assets/css/*.css",
        "./htdocs/site/templates/*.php",
        './htdocs/site/templates/**/*.php',
        "./htdocs/site/snippets/*.php",
        "./htdocs/site/snippets/**/*.php",
      ]
    }),
    production && terser(),
    url(),
  ],
};
