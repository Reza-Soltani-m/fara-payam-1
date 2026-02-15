import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },

        rules: {
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@components/**',
                            group: 'internal',
                        },
                        {
                            pattern: '@utils/**',
                            group: 'internal',
                        },
                    ],
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },
])
