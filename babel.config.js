module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@assets': './src/assets',
          '@images': './src/assets/images',
          '@svg': './src/assets/svg',
          '@styles': './src/assets/styles',
          '@data': './src/data',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@services': './src/services',
          '@contexts': './src/contexts'
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
