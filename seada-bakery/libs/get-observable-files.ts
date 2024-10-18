import { IModulesCollection } from './interface.js';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Get a list of files t obe observed by bakery watcher
 * @param modules
 */
const getObservableFiles = (modules: IModulesCollection): string[] => {
    return Object.values(modules).reduce((acc, moduleInfo) => {
        const { packageJson } = moduleInfo;
        if (!packageJson || !packageJson['seada.io']) return acc;

        const {
            'seada.io': { injections, plugins },
        } = packageJson;

        if (!injections || !plugins) return acc;

        const filePaths = [...Object.keys(injections), ...Object.keys(plugins)]
            .map((i) => {
                const baseName = path.join(moduleInfo.sourcePath, i.replace(packageJson.name, ''));
                if (fs.existsSync(baseName + '.ts')) return baseName + '.ts';
                if (fs.existsSync(baseName + '.tsx')) return baseName + '.tsx';
                return null;
            })
            .filter((i) => i !== null);

        return acc.concat(filePaths);
    }, []);
};

export default getObservableFiles;
