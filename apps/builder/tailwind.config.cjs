import { nextui } from '@nextui-org/react';

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        '../../seadas/*/*/src/schema-components/*/*.styles.ts',
        '../../seadas/*/*/src/schema-components/*/*.tsx',
        '../../seadas/*/*/src/components/*/*.styles.ts',
        '../../seadas/*/*/src/components/*/*.tsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            spacing: {
                ...Object.fromEntries(
                    Object.entries(defaultTheme.spacing).map(([key, value]) => [
                        key,
                        `${parseFloat(value) * 0.95}rem`,
                    ]),
                ),
            },
        },
    },
    plugins: [
        nextui({
            layout: {
                fontSize: {
                    small: '0.60rem',
                    medium: '0.65rem',
                    large: '0.65rem',
                },
                radius: {
                    small: '0.2rem',
                    medium: '0.4rem',
                    large: '0.6rem',
                },
            },
        }),
    ],
};
