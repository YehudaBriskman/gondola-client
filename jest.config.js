module.exports = {
  // verbose: true,
  // other config options...
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|(?!react-leaflet)|ng-dynamic)'],
};