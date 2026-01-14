/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-pink': '#ff7eb3',
                'electric-blue': '#2563eb',
                'cream': '#fff1f2',
            },
            fontFamily: {
                serif: ['"Fraunces"', 'serif'],
                mono: ['monospace'],
                handwriting: ['"Caveat"', 'cursive'],
            },
            boxShadow: {
                'neo': '8px 8px 0px 0px #000',
                'neo-sm': '4px 4px 0px 0px #000',
            },
        },
    },
    plugins: [],
}
