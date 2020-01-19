module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'lodash',
      libraryDirectory: '',
    }, 'lodash']
  ]
}
