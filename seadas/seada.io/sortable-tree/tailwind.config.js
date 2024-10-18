const { fontFamily } = require('tailwindcss/defaultTheme');
const { nextui } = require('@nextui-org/react');

module.exports = {
    content: [
        '../../seadas/*/*/src/**/*.{tsx,module.css}',
        '../../apps/*/app/**/*.{tsx,module.css}',
        '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                seada: ['"Montserrat"', ...fontFamily.sans],
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
