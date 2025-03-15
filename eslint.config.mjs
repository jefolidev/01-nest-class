import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    extends: compat.extends('@rocketseat/eslint-config/node'),

    rules: {
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  globalIgnores(['dist/', 'node_modules/', 'data/']),
])
