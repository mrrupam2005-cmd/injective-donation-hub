import { flatConfig } from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...flatConfig,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
