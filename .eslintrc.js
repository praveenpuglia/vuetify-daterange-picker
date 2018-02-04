module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'prettier', 'plugin:vue/recommended'],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'max-len': 0,
    'prefer-destructuring': 0,
  },
};
