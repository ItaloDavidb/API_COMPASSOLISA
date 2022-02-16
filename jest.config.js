module.exports = {
  preset: '@shelf/jest-mongodb',
  clearMocks: true,
  coverageProvider: 'v8',
  testMatch: [
	  '**/__tests__/**/*.test.js?(x)',
  ],
};