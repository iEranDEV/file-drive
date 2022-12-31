/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {
			colors: {
				"100": "var(--100)",
				"200": "var(--200)",
				"300": "var(--300)",
				"400": "var(--400)",
				"500": "var(--500)",
				"600": "var(--600)",
				"700": "var(--700)",
			}
		},
	},
	plugins: [],
}
