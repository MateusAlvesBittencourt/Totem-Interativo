import { defineConfig } from 'eslint'
import tsParser from '@typescript-eslint/parser'
export default defineConfig({
  root: true,
  parser: tsParser,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.url && new URL('.', import.meta.url).pathname,
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all', endOfLine: 'auto' }]
  }
})
