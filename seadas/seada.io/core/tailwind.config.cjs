// TODO: Clean this mess

import { fontFamily } from 'tailwindcss/defaultTheme';
import resolveConfig from 'tailwindcss/resolveConfig';
import fs from 'node:fs';
import path from 'node:path';
import { nextui } from '@nextui-org/react';
import deepmerge from 'deepmerge';

/*
 * You should not modify this file and only exetend using the tailwind.extend.cjs file in each module.
 */

const BASE_PATH = '../..';

const seadaBasicConfig = {
    content: [
        `${BASE_PATH}/node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}`,
        `${BASE_PATH}/seadas/*/*/src/page-components/*/*.styles.ts`,
        `${BASE_PATH}/seadas/*/*/src/page-components/*/*.tsx`,
        `${BASE_PATH}/seadas/*/*/src/plugins/*/*.tsx`,
        `${BASE_PATH}/seadas/*/*/src/plugins/*/*.styles.ts`,
        `${BASE_PATH}/seadas/*/*/src/components/*/*.styles.ts`,
        `${BASE_PATH}/seadas/*/*/src/components/*/*.tsx`,
    ],
    theme: {
        screens: { // Use only screen max notation
            // '2xl': { max: '1536px' },
            // xl: { max: '1280px' },
            lg: { max: '1024px' },
            md: { max: '768px' },
            sm: { max: '575px' },
            xs: { max: '320px' },
        },
        extend: {
            fontFamily: {
                seada: ['"Montserrat"', ...fontFamily.sans],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '192': '48rem',
                '224': '56rem',
                '256': '64rem',
                'screen-xs': '320px',
                'screen-sm': '575px',
                'screen-md': '768px',
                'screen-lg': '1024px',
                'screen-xl': '1280px',
                'screen-2xl': '1536px',
            },
            aspectRatio: {
                portrait: '9 / 16',
                wide: '16 / 10',
                panoramic: '21 / 9',
                'wide-portrait': '10 / 16',
                'ultra-wide': '32 / 9',
                'crt-portrait': '3 / 4',
                crt: '4 / 3',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            layout: {
                fontSize: {
                    small: '0.75rem',
                },
            },
        }),
    ],
};

const displayUtilities = [
    'block',
    'inline-block',
    'inline',
    'flex',
    'inline-flex',
    'grid',
    'inline-grid',
    'table',
    'table-row',
    'table-cell',
    'inline-table',
    'table-caption',
    'table-column',
    'table-column-group',
    'table-footer-group',
    'table-header-group',
    'table-row-group',
    'flow-root',
    'contents',
    'list-item',
    'hidden',
];

// See useTwProcessVisibilityClasses
seadaBasicConfig.safelist = displayUtilities.map((display) => ({
    pattern: new RegExp(`^${display}\$`),
    variants: Object.keys(seadaBasicConfig.theme.screens),
}));

// Read the modules config
const modulesConfig = JSON.parse(
    fs.readFileSync(
        path.join(BASE_PATH, 'generated/seada-modules.json'),
        'utf8',
    ),
);

if (!modulesConfig.hasOwnProperty('@seada.io/core')) {
    throw new Error('Core module is required');
}

// Read all tailwind.extend.cjs files from each module and extend the tailwind config
const config = Object.keys(modulesConfig).reduce((acc, module) => {
    const modulePath = modulesConfig[module].path;
    const tailwindExtendFile = path.join(BASE_PATH, modulePath, 'tailwind.extend.cjs');
    const tailwindExtendRequirePath = path.join(`${BASE_PATH}/..`, modulePath, 'tailwind.extend.cjs');

    if (fs.existsSync(tailwindExtendFile)) {
        console.log(`Extending Tailwind with ${module}`);

        const extendFn = require(tailwindExtendRequirePath).default;
        return extendFn(acc, modulesConfig[module]);
    }

    return acc;
}, seadaBasicConfig);

// Resolve the final config
const resolvedConfig = resolveConfig(seadaBasicConfig);

// Compute only the custom config

// Merge custom config from plugins in a flat structure
let customConfig = { ...config };
for (const plugin of customConfig.plugins) {
    if (!plugin?.config) continue;
    customConfig = deepmerge(customConfig, plugin.config, { clone: true });
}
delete customConfig.content;
delete customConfig.plugins;
delete customConfig.safelist;

// Write the custom config to a file
const destinationPath = path.join(BASE_PATH, modulesConfig['@seada.io/core'].generatedPath, 'spi/tw');

const customConfigTsFile = `import { Config } from 'tailwindcss';
const tailwindCustomConfig: Partial<Config> = ${JSON.stringify(customConfig)};
export default tailwindCustomConfig;`;

// Write the theme to a file
const tailwindThemeTsFile = `import { ThemeConfig } from 'tailwindcss/types/config';
const tailwindTheme: ThemeConfig = ${JSON.stringify({
    ...resolvedConfig.theme,
})} as ThemeConfig;
export default tailwindTheme;`;

fs.mkdirSync(destinationPath, { recursive: true });
fs.writeFileSync(path.join(destinationPath, 'tailwind-custom-config.generated.ts'), customConfigTsFile, 'utf8');
fs.writeFileSync(path.join(destinationPath, 'tailwind-theme.generated.ts'), tailwindThemeTsFile, 'utf8');

module.exports = config;
