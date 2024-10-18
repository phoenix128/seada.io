import { IModulesCollection } from './interface.js';
import fs from 'node:fs';
import path from 'node:path';

const clearGeneratedPath = async (generatedPath: string, exclude: string[] = [], softRemove = false): Promise<void> => {
    if (!fs.existsSync(generatedPath)) {
        return;
    }

    const files = fs.readdirSync(generatedPath);

    for (const file of files) {
        if (file.endsWith('.generated.ts')) {
            continue;
        }

        const filePath = path.join(generatedPath, file);
        if (exclude.includes(filePath)) {
            continue;
        }

        if (fs.lstatSync(filePath).isDirectory()) {
            await clearGeneratedPath(filePath, exclude);
        } else {
            fs.unlinkSync(filePath);
        }
    }
};

/**
 * Clear generated paths
 * @param modules
 * @param excludeFiles
 */
const clearGeneratedPaths = async (modules: IModulesCollection, excludeFiles: string[] = []): Promise<void> => {
    const promises: Promise<void>[] = [];

    for (const [moduleName, module] of Object.entries(modules)) {
        const { generatedPath } = module;

        promises.push(
            clearGeneratedPath(generatedPath, [
                ...excludeFiles,
                path.join(module.generatedPath, 'json-schema'),
                path.join(module.generatedPath, 'gql'),
            ])
        );
    }

    await Promise.all(promises);
};

export default clearGeneratedPaths;
