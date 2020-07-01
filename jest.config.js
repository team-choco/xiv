module.exports = {
  preset: 'ts-jest',
  cacheDirectory: './node_modules/.cache/jest',
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  testEnvironment: 'node',
  verbose: Boolean(process.env.CI),
  testTimeout: 60000,
};
