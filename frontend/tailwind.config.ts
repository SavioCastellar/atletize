import type { Config } from "tailwindcss"
import { PluginAPI } from "tailwindcss/types/config"
import { withUt } from "uploadthing/tw"

const config = withUt({
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			minHeight: {
				'50vh': '50vh'
			},
			colors: {
				gradient: {
					start: 'green',
					end: 'black',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#EDEDED',
				'text-lp': '#000000',
				'primary-color': '#F95164',
				'secondary-color': '#131F46',
				foreground: 'hsl(var(--foreground))',
				'theme-bg': '#EDEDED',
				'theme-1': 'black',
				'theme-1-hover': '#1D0202',
				'theme-1-grad': '#661515',
				'theme-2': 'black',
				'theme-2-grad': '#34488B',
				'primaria': '#000000',
				'primaria-light': '#443d44',
				'secundaria-dark': '#059669',
				'secundaria-t': '#10b98130',
				'secundaria': '#10b981',
				'secundaria-light': '#34d399',
				'secundaria-extralight': '#6ee7b7',
				'txt-2': '#4D4D4D',
				dark: '#111111',
				gold: '#B89C54',
				silver: '#CCCCCC',
				bronze: '#7A4F1B',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			boxShadow: {
				glow: '0 4px 30px rgba(255, 255, 255, 0.5)',
				'custom-br-bg': '12px 12px 0px #EDEDED',
				'custom-bl-bg': '-12px 12px 0px #EDEDED',
				'custom-tr-bg': '12px -12px 0px #EDEDED',
				'custom-tl-bg': '-12px -12px 0px #EDEDED',
				'mini-custom-br-bg': '4px 4px 0px #EDEDED',
				'mini-custom-bl-bg': '-4px 4px 0px #EDEDED',
				'mini-custom-tr-bg': '4px -4px 0px #EDEDED',
				'mini-custom-tl-bg': '-4px -4px 0px #EDEDED',
				'custom-br-theme-1': '12px 12px 0px black',
				'custom-bl-theme-1': '-12px 12px 0px black',
				'custom-tr-theme-1': '12px -12px 0px black',
				'custom-tl-theme-1': '-12px -12px 0px black',
				'custom-br-theme-2': '12px 12px 0px black',
				'custom-bl-theme-2': '-12px 12px 0px black',
				'custom-tr-theme-2': '12px -12px 0px black',
				'custom-tl-theme-2': '-12px -12px 0px black',
				'custom-br-theme-3': '12px 12px 0px #000000',
				'custom-bl-theme-3': '-12px 12px 0px #000000',
				'custom-tr-theme-3': '12px -12px 0px #000000',
				'custom-tl-theme-3': '-12px -12px 0px #000000'
			},
			height: {
				'88': '22rem',
				'screen-12': '12%',
				'screen-15': '15%',
				'screen-20': '20%',
				'screen-25': '25%',
				'screen-30': '30%'
			},
			width: {
				'screen-5': '5%',
				'screen-12': '12%',
				'screen-15': '15%',
				'screen-20': '20%',
				'screen-25': '25%',
				'screen-30': '30%'
			},
			right: {
				'screen-15': '15%'
			},
			left: {
				'screen-15': '15%'
			},
			top: {
				'screen-17': '17%'
			},
			screens: {
				mid: '690px'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function ({ addUtilities }: PluginAPI) {
			addUtilities({
				'.clip-pentagon': {
					'clip-path': 'polygon(20% 0, 100% 0, 100% 100%, 0 100%, 0 24%)',
				},
			});
		},
	],
}) satisfies Config

export default config
