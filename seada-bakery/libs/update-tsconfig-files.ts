import path from 'node:path';
import fs from 'node:fs';
import prettier from 'prettier';
import { IModulesCollection } from './interface.js';
import getSourceModuleName from './get-source-module-name.js';

const getRelativeResolvingPath = (baseUrlModulePath: string, otherModulePath: string): string | null => {
    // If the other module path does not exist, return null
    if (!fs.existsSync(otherModulePath)) {
        return null;
    }

    return path.relative(baseUrlModulePath, otherModulePath).replace(/\\/g, '/');
};

/**
 * Updates the tsconfig.json file to add the path mapping for each module
 * @param {any[]} modules
 * @param apps
 */
const updateTsConfigFiles = async (modules: IModulesCollection, apps: IModulesCollection) => {
    const writeTasks = [];

    const allModules = { ...modules, ...apps };
    const appModulesNames = Object.keys(apps);

    // Set paths for each tsconfig file
    for (const [moduleName, module] of Object.entries(allModules)) {
        const { modulePath, sourcePath, tsconfigJson } = module;

        const compilerOptionsPath = {};
        const visibleModules = appModulesNames.includes(moduleName) ? { ...modules, [moduleName]: module } : modules;

        for (const [
            otherModuleName,
            { generatedPath: otherModuleGeneratedPath, sourcePath: otherModuleSourcePath },
        ] of Object.entries(visibleModules)) {
            // Modules should not depend on apps so we don't need to add them here
            const resolvingPaths = [];
            const isSelf = moduleName === otherModuleName;

            const relativeSourcePath = getRelativeResolvingPath(sourcePath, otherModuleSourcePath);
            const relativeGeneratedPath = getRelativeResolvingPath(sourcePath, otherModuleGeneratedPath);

            if (isSelf) {
                if (relativeGeneratedPath) {
                    resolvingPaths.push(`${relativeGeneratedPath}/*`);

                    compilerOptionsPath[`${getSourceModuleName(modules, moduleName)}/*`] = ['./*'];
                }
                resolvingPaths.push('./*');
            } else {
                if (relativeGeneratedPath) {
                    resolvingPaths.push(`${relativeGeneratedPath}/*`);
                    compilerOptionsPath[`${getSourceModuleName(modules, otherModuleName)}/*`] = [
                        `${relativeGeneratedPath}/*`,
                    ];
                }

                if (relativeSourcePath) {
                    resolvingPaths.push(`${relativeSourcePath}/*`);
                    compilerOptionsPath[`${getSourceModuleName(modules, otherModuleName)}/*`] = [
                        `${relativeSourcePath}/*`,
                    ];
                }
            }

            if (resolvingPaths.length > 0) {
                compilerOptionsPath[`${otherModuleName}/*`] = resolvingPaths;
            }
        }

        if (!tsconfigJson.compilerOptions) {
            tsconfigJson.compilerOptions = {};
        }
        tsconfigJson.compilerOptions.paths = compilerOptionsPath;

        const tsconfigJsonPath = path.join(modulePath, 'tsconfig.json');
        writeTasks.push(async () => {
            // console.log(`Baking: ${moduleName}/tsconfig.json`);

            fs.writeFileSync(
                tsconfigJsonPath,
                await prettier.format(JSON.stringify(tsconfigJson), {
                    parser: 'json',
                })
            );
        });
    }

    await Promise.all(writeTasks.map((task) => task()));
};

export default updateTsConfigFiles;
