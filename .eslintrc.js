module.exports = {
    root: true,
    env: {
        node: true
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            jsx: false
        }
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'linebreak-style': 'off',
        'vue/multi-word-component-names': 'off',
        quotes: ['warn', 'single'],
        'no-tabs': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '--resolveJsonModule': 'off',
        'prettier/prettier': [
            'off',
            {
                endOfLine: 'auto'
            }
        ],
        'no-debugger': 'off',
        'no-undef': 'off'
    }
};
