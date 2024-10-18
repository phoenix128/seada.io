import deepmerge from 'deepmerge';

export default function(tailwindConfig, moduleConfig) {
    return deepmerge(tailwindConfig, {
        theme: {
            extend: {
                colors: {
                    price: 'var(--color-price)',
                    'reference-price': 'var(--color-reference-price)',
                },
            },
        },
        plugins: [({ addBase, addUtilities, config }) => {
            addBase({
                ':root': {
                    '--color-price': config('theme.colors.blue.700'),
                    '--color-reference-price': config('theme.colors.gray.500'),
                },
                '.dark': {
                    '--color-price': config('theme.colors.blue.500'),
                    '--color-reference-price': config('theme.colors.gray.500'),
                },
            });

            addUtilities({
                '.denied-option': {
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: '-15%',
                        top: '50%',
                        width: '130%',
                        height: '4px',
                        backgroundColor: 'gray',
                        transform: 'translateY(-50%) rotate(-45deg)',
                    },
                },
            }, ['responsive', 'hover']);
        }],
    });
}
