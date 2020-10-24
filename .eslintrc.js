module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  globals: {
    CST: true,
    req: true,
    api: true
  },
  plugins: [
    'react-hooks'
  ],
  rules: {
    'arrow-parens': 0,
    'class-methods-use-this': 0,
    'comma-dangle': [2, 'never'],
    'consistent-return': 0,
    'func-names': 0,
    'global-require': 0,
    'implicit-arrow-linebreak': [0, 'brace-style'],
    'linebreak-style': 0,
    'no-console': 1,
    'no-debugger': 1,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-plusplus': 0,
    'no-return-await': 0,
    'no-throw-literal': 0,
    'no-undef': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false
      }
    ],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/no-noninteractive-tabindex': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/jsx-closing-tag-location': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/no-array-index-key': 0,
    'react/no-this-in-sfc': 0,
    'react/no-unused-state': 0,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/self-closing-comp': 0,
    'jsx-a11y/media-has-caption': 0
  }
};