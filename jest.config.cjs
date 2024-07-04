module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!(cliui|string-width)/)'], // Add ES modules that need to be transformed
};
