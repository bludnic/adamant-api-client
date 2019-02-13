module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$"': '<rootDir>/test/$1'
  },
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {}
}
