/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '480px',
            },
            spacing: {
                'card': '1rem',
            },
            borderRadius: {
                'card': '0.75rem',
            }
        },
    },
    plugins: [
        require('daisyui')
    ],
    daisyui: {
        theme: {
            extend: {
                colors: {
                    primary: '#2E7D32',
                    secondary: '#9CCC65',
                    accent: '#FFD700',
                }
            }
        }
    },
}