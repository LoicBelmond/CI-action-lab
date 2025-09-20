/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'json-summary'],
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: { statements: 80, branches: 80, functions: 80, lines: 80 },
  },
}
