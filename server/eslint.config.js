// server/eslint.config.js
import rootConfig from '../eslint.config.mjs'; // Importa a config da raiz
import globals from 'globals';

export default [
  // 1. Herdar todas as configurações da raiz
  ...rootConfig,

  // 2. Configurações específicas para o servidor
  {
    files: ['src/**/*.{ts,js}'], // Aplicar a arquivos TS e JS dentro de server/src
    languageOptions: {
      globals: {
        ...globals.node, // Garante globais de Node.js
      },
    },
  },

  // 3. Ignores específicos do servidor (além dos globais da raiz)
  {
    ignores: [
      'dist/', // Pasta de build do servidor
    ],
  },
];
