const path = require('node:path');
const fs = require('node:fs');
const resolveId = require('postcss-import/lib/resolve-id');

/**
 * Resolves the path of a file based on the tsconfig.json file.
 * @param id
 * @param basedir
 * @param importOptions
 * @return {*|Promise<unknown>}
 */
const resolve = (id, basedir, importOptions) => {
    if (typeof window === 'undefined') {
        const { root } = importOptions;
        const tsConfig = JSON.parse(fs.readFileSync(path.join(root, 'tsconfig.json'), 'utf8'));

        const { paths: compilerPaths } = tsConfig.compilerOptions;
        const pathKey = Object.keys(compilerPaths).find(cp => id.startsWith(cp.replace(/\*$/, '')));
        if (pathKey) {
            const relativeRequestPath = id.replace(pathKey.replace(/\*$/, ''), '');
            const absoluteCompilerPath = compilerPaths[pathKey].map(p => path.resolve(path.join(root, p)));

            const destinationPath = absoluteCompilerPath
                .map(p => path.join(p.replace(/\*$/, ''), relativeRequestPath))
                .find(p => fs.existsSync(p));

            if (destinationPath) {
                return destinationPath;
            }
        }
    }

    return resolveId(id, basedir, importOptions);
};

module.exports = {
    plugins: {
        'postcss-import': {
            resolve,
        },
        'tailwindcss/nesting': {},
        'postcss-simple-vars': {},
        tailwindcss: {},
        autoprefixer: {},
        // ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
};
