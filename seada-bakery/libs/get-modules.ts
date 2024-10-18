import fs from 'node:fs';
import path from 'node:path';
import readJsonFile from './read-json-file.js';
import { IModuleInfo, IModulesCollection } from './interface.js';
import readYmlFile from './read-yml-file.js';
import getMagicPageComponents from './get-magic-page-components.js';
import deepmerge from 'deepmerge';
import getMagicAdapters from './get-magic-adapters.js';
import getMagicI18ns from './get-magic-i18ns.js';
import getMagicComponentTypeSchemas from './get-magic-component-type-schemas.js';
import getMagicPlugins from './get-magic-plugins.js';

/**
 * Returns a list of modules under a given path
 * @param basePath
 * @returns {any[]}
 */
const getModules = (basePath: string): IModulesCollection => {
    const moduleNames = fs
        .readdirSync(basePath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    return moduleNames.reduce((acc, modulePath) => {
        const moduleFullPath = path.join(basePath, modulePath);

        const packageJsonFile = path.join(moduleFullPath, 'package.json');
        const tsconfigJsonPath = path.join(moduleFullPath, 'tsconfig.json');

        // Seada config files with different legacy modes
        const seadaJsonFile = path.join(moduleFullPath, 'seada.json');
        const seadaYmlFile = path.join(moduleFullPath, 'seada.yml');

        // This is the new way of doing things
        const seadaYmlFiles = {
            injectables: path.join(moduleFullPath, 'seada', 'injectables.yml'),
            injections: path.join(moduleFullPath, 'seada', 'injections.yml'),
            'css-rewrites': path.join(moduleFullPath, 'seada', 'css-rewrites.yml'),
            plugins: path.join(moduleFullPath, 'seada', 'plugins.yml'),
        };

        if (!fs.existsSync(packageJsonFile)) {
            // Recursively get modules
            return { ...acc, ...getModules(moduleFullPath) };
        }

        if (!fs.existsSync(tsconfigJsonPath)) {
            return acc;
        }

        const packageJson = readJsonFile(packageJsonFile);
        const tsconfigJson = readJsonFile(tsconfigJsonPath);
        const sourcePath = path.join(moduleFullPath, tsconfigJson?.compilerOptions?.baseUrl || '.');
        const { name } = packageJson;

        // console.log(`Loading seada: ${name}`);

        if (!packageJson['seada.io']) {
            packageJson['seada.io'] = {};
        }

        // Single seada.json file
        if (fs.existsSync(seadaJsonFile)) {
            packageJson['seada.io'] = deepmerge(packageJson['seada.io'] || {}, readJsonFile(seadaJsonFile) || {});
        }

        // Single seada.yml file
        if (fs.existsSync(seadaYmlFile)) {
            packageJson['seada.io'] = deepmerge(packageJson['seada.io'] || {}, readYmlFile(seadaYmlFile) || {});
        }

        // Multiple seada.yml files
        Object.entries(seadaYmlFiles).forEach(([key, seadaYmlFile]) => {
            if (fs.existsSync(seadaYmlFile)) {
                packageJson['seada.io'][key] = deepmerge(
                    packageJson['seada.io'][key] || {},
                    readYmlFile(seadaYmlFile) || {}
                );
            }
        });

        // Handle magic injectables
        if (!packageJson['seada.io'].injectables) {
            packageJson['seada.io'].injectables = {};
        }

        packageJson['seada.io'].injectables = deepmerge(packageJson['seada.io'].injectables, {
            ...(getMagicPageComponents(packageJson, sourcePath) || {}),
            ...(getMagicComponentTypeSchemas(packageJson, sourcePath) || {}),
            ...(getMagicAdapters(packageJson, sourcePath) || {}),
            ...(getMagicI18ns(packageJson, sourcePath) || {}),
        });
        packageJson['seada.io'].plugins = deepmerge(packageJson['seada.io'].plugins, {
            ...(getMagicPlugins(packageJson, sourcePath) || {}),
        });

        acc[name] = {
            modulePath: moduleFullPath,
            generatedPath: path.join(moduleFullPath, 'generated'),
            sourcePath,
            packageJson,
            tsconfigJson,
        };

        return acc;
    }, {} as Record<string, IModuleInfo>);
};

export default getModules;
