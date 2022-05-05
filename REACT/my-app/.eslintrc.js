module.exports = {
    extends: ['airbnb', 'prettier', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'off',
        'no-unused-vars': 'warn',
        'react/no-array-index-key': 'off',
        'no-restricted-syntax': 'off',
        'import/no-cycle': ['off', { maxDepth: Infinity }],
        'no-undef': 'warn',
        'import/prefer-default-export': 'warn',
        'react/jsx-no-constructed-context-values': 'warn',
        'guard-for-in': 'warn',
        'react/destructuring-assignment': 'warn',
        'react/prop-types': 'warn',
        'react/button-has-type': 'warn',
        'no-irregular-whitespace': 'warn',
        camelcase: [2, { properties: 'always' }],
    },
};
