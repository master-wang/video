module.exports = {
  presets: [
    'react-app'
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    'lodash',
    [
      'import',
      {
        libraryName: 'antd',
        style: true
      }
    ]
  ]
};
