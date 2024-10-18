import { IModulesCollection } from './interface.js';
import fs from 'node:fs';

const createModulesJson = async (modules: IModulesCollection, basePath: string) => {
    await fs.promises.mkdir(`${basePath}/generated`, { recursive: true });
    const modulesJsonPath = `${basePath}/generated/seada-modules.json`;

    const json = Object.keys(modules).reduce((acc, moduleName) => {
        // Get the relative path to the module
        const module = modules[moduleName];
        acc[moduleName] = {
            path: module.modulePath.replace(basePath, '').replace(/\\/g, '/'),
            generatedPath: module.generatedPath.replace(basePath, '').replace(/\\/g, '/'),
            sourcePath: module.sourcePath.replace(basePath, '').replace(/\\/g, '/'),
        };

        return acc;
    }, {});

    await fs.promises.writeFile(modulesJsonPath, JSON.stringify(json));
};

export default createModulesJson;
