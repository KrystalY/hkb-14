module.exports = {
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|scss|jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$':
      'jest-transform-stub',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@src$': '<rootDir>/src/index.js',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@components$': '<rootDir>/src/components/index.js',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@assets$': '<rootDir>/src/assets/index.js',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
  },
};
