import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js'; // Para regras base de JavaScript
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 1. Configuração de Ignores Globais
  {
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/build/',
      '**/coverage/',
      'server/prisma/dev.db',
      'server/prisma/dev.db-journal',
      '.yarn/',
      '**/package-lock.json',
      '**/tsconfig*.json',
    ],
  },

  // 2. Configuração base para arquivos JavaScript
  {
    files: ['**/*.{js,mjs,cjs}'], // Somente para arquivos JavaScript
    rules: {
      ...eslintJs.configs.recommended.rules,
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', // Default para ESM para JS
      globals: {
        ...globals.node, // Default para Node.js para arquivos JS na raiz/server
      },
    },
  },

  // 3. Configuração específica e principal para arquivos TypeScript
  {
    files: ['**/*.{ts,tsx,mts,cts}'], // Somente para arquivos TypeScript
    languageOptions: {
      parser: tseslint.parser, // Usa o parser do TypeScript
      parserOptions: {
        project: [
          './client/tsconfig.app.json',
          './client/tsconfig.node.json',
          './server/tsconfig.json',
        ], // Habilita regras que usam informação de tipo
      },
      globals: {
        ...globals.browser, // Para o client
        ...globals.node, // Para o server
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Registra o plugin TypeScript
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // 4. Configuração do Prettier
  eslintConfigPrettier,
];
