// Allow runtime flag to decide whether unit tests are run against source code or 
// the built-version of the library.
const tsconfig = process.env.hasOwnProperty('TEST_BUILT_VERSION') ? './tsconfig.test' : './tsconfig'

const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require(tsconfig)

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
}
