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
        themes: [
            {
                mytheme: {
                    primary: "#570DF8",
                    secondary: "#F000B8",
                    accent: "#37CDBE",
                    neutral: "#3D4451",
                    "base-100": "#FFFFFF",
                },
            },
        ],
    },
}