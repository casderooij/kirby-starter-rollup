const tailwindcss = require('tailwindcss');

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
    ...process.env.NODE_ENV === 'production'
    ? [purgecss, cssnano]
    : []
  ],
};
