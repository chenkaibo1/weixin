module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	extends: [ '@nuxtjs', 'plugin:nuxt/recommended', 'prettier', 'prettier/vue' ],
	plugins: [ 'prettier' ],
	// add your custom rules here
	rules: {
		'nuxt/no-cjs-in-config': 'off',
		'no-console': 'off',
		'no-var': 'off',
		'require-await': 'off',
		'vue/attributes-order': 'off',
		'no-lonely-if': 'off'
	}
}
