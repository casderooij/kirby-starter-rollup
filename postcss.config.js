const tailwindcss = require('tailwindcss');

const production = !process.env.ROLLUP_WATCH;

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './htdocs/site/templates/*.php',
    './htdocs/site/templates/**/*.php',
    './htdocs/site/snippets/*.php',
    './htdocs/site/snippets/**/*.php',
  ],
  defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
});

const cssnano = require('cssnano') ({
  preset: ['default', {
    discardComments: {
      removeAll: true,
    },
  }]
});

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
    production && purgecss,
    production && cssnano
  ],
};
