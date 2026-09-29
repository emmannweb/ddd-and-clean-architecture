import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  rootDir: './',
  testEnvironment: 'node',
  testRegex: 'test/unit/.*\\.spec\\.ts$',
  preset: 'ts-jest',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/domain/**/*.interface.ts',
  ],
  coverageDirectory: 'coverage',
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.vscode/'],
};

export default config;