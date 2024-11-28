import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,jsx}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/prop-types': 'off',
      'array-bracket-newline': ['error', 'consistent'],
      'array-bracket-spacing': 'error',
      'brace-style': 'error',
      'camelcase': 'error',
      'comma-spacing': 'error',
      'func-call-spacing': 'error',
      'jsx-quotes': ['error', 'prefer-double'],
      'implicit-arrow-linebreak': 'error',
      'indent': ['error', 2],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'linebreak-style': ['error', 'unix'],
      'max-len': [
        'warn', {
          'code': 120
        }
      ],
      'no-case-declarations': 'warn',
      'no-console': 'off',
      'no-unused-vars': [
        'warn', {
          'ignoreRestSiblings': true
        }
      ],
      'quotes': 'off',
      'semi': ['error', 'always'],
      'space-before-blocks': 'error',
      'space-before-function-paren': [
        'error', {
          'anonymous': 'ignore',
          'named': 'never',
          'asyncArrow': 'always'
        }
      ],
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'object-curly-newline': [
        'error', {
          'consistent': true
        }
      ],
      'object-curly-spacing': ['error', 'always'],
      'object-property-newline': [
        'error', {
          'allowAllPropertiesOnSameLine': true
        }
      ],
  
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-curly-spacing': 'error',
      'react/jsx-uses-vars': 2,
      'react/no-access-state-in-setstate': [
        'warn'
      ],
      'react/no-unescaped-entities': [
        'error',
        {
          'forbid': [
            '>',
            '}'
          ]
        }
      ],
      'react/sort-prop-types': [
        'error', {
          'callbacksLast': true,
          'ignoreCase': true
        }
      ],
      'react/jsx-sort-props': [
        'error',
        {
          'callbacksLast': true,
          'ignoreCase': true
        }
      ]
    }
  }
];