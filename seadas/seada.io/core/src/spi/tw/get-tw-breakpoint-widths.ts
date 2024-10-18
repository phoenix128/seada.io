import tailwindTheme from '@seada.io/core/spi/tw/tailwind-theme.generated';

const getTwBreakpointWidths = (): Record<string, number> => {
    return Object.entries(tailwindTheme.screens).reduce(
        (acc, [key, value]) => {
            acc[key] = parseInt(value['max'].replace(/px$/, ''), 10);
            return acc;
        },
        { default: Infinity }
    );
};

export default getTwBreakpointWidths;
