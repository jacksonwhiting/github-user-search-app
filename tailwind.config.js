/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				skin: {
					"accent-pri": "#0079FF",
					"fill-pri-light-mode": "#FEFEFE",
					"fill-sec-light-mode": "#F6F8FF",
					"fill-dark-mode": "#141D2F",
					"text-pri-light-mode": "#4B6A9B",
					"text-hdg-pri-light-mode": "#2B3442",
					"text-pri-dark-mode": "#FFFFFF",
				},
			},
			fontFamily: {
				fontPri: ["Space Mono", "monospace"],
			},
			fontSize: {
				HdgL: [
					"1.625rem",
					{
						lineHeight: "2.375rem",
					},
				],
				HdgM: [
					"1.375rem",
					{
						lineHeight: "2.06rem",
					},
				],
				HdgS: [
					"1rem",
					{
						lineHeight: "1.625rem",
					},
				],
				HdgXs: [
					".8125rem",
					{
						lineHeight: "1.25rem",
					},
				],
				HdgXXs: ".6875rem",
				body: [
					".9375rem",
					{
						lineHeight: "1.56rem",
					},
				],
			},
		},
	},
	plugins: [],
}
