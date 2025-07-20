/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				accent: "var(--color-accent)",
				background: "var(--color-background)",
				text: "var(--color-text)",
				heading: "var(--color-heading)",
				link: "var(--color-link)",
				hover: "var(--color-hover)",
				active: "var(--color-active)",
				error: "var(--color-error)",
				success: "var(--color-success)",
				muted: "var(--color-muted)",
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".text-primary": {
					color: "var(--color-primary)",
				},
				".bg-primary": {
					backgroundColor: "var(--color-primary)",
				},
				".bg-background": {
					backgroundColor: "var(--color-background)",
				},
				".border-primary": {
					borderColor: "var(--color-primary)",
				},
			});
		},
	],
};
