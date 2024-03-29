module.exports = {

    root: true,

    env: {
        node: true
    },

    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard'
    ],

    parserOptions: {
        parser: '@babel/eslint-parser'
    },

    rules: {
        // Add four spaces.
        'indent': ['error', 4],
        'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'quotes': [2, "double", { "avoidEscape": true }],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }]
    },

    overrides: [
        {
            files: ['src/pages/**/*.vue'],
            rules: {
                'vue/multi-word-component-names': 0
            }
        }
    ]

}
