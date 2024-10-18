import { IModulesCollection } from './interface.js';
import fs from 'node:fs';
import path from 'node:path';
import parseExportable from './parse-exportable.js';

/**
 * Writes the modules list to the seada-modules.json file
 * @param modules
 */
const generateCssRewrites = async (modules: IModulesCollection): Promise<string[]> => {
    const generatedFiles = [];

    for (const [moduleName, module] of Object.entries(modules)) {
        const { packageJson } = module;
        const { 'seada.io': seadaIo } = packageJson;

        if (!seadaIo) {
            continue;
        }

        const cssRewrites = seadaIo['css-rewrites'];
        if (!cssRewrites) {
            continue;
        }

        for (const [source, destination] of Object.entries(cssRewrites)) {
            const [moduleName, filePath] = parseExportable(modules, source);

            if (!modules.hasOwnProperty(moduleName)) {
                throw new Error(`Module ${moduleName} does not exist`);
            }

            const proxyFile = path.join(modules[moduleName]?.generatedPath, filePath);
            const proxyFilePath = path.dirname(proxyFile);

            if (!fs.existsSync(proxyFilePath)) {
                fs.mkdirSync(proxyFilePath, { recursive: true });
            }

            // console.log(`Baking: ${source}`);
            fs.writeFileSync(proxyFile, `@import "${destination}";`);
            generatedFiles.push(proxyFile);
        }
    }

    return generatedFiles;
};

export default generateCssRewrites;
