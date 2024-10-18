import { IInjectable, IInjectableType, IPackageJson } from './interface.js';
import path from 'node:path';
import fs from 'node:fs';
import deepmerge from 'deepmerge';

/**
 * Returns a list of injectables for a given page component
 * @param packageJson
 * @param sourcePath
 */
const getMagicAdapters = (packageJson: IPackageJson, sourcePath: string): Record<string, IInjectable> => {
    const adaptersInjectablesPath = 'adapters';
    const moduleName = packageJson.name;

    const adaptersInjectablesFullPath = path.join(sourcePath, adaptersInjectablesPath);
    if (!fs.existsSync(adaptersInjectablesFullPath)) {
        return {};
    }

    const injectablesTypes = {
        'data-provider-adapters': 'data-providers',
        'hooks-adapters': 'hooks',
    };

    const injectables = {};

    const sourceCodes = fs
        .readdirSync(adaptersInjectablesFullPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    for (const adapterCode of sourceCodes) {
        const adapterTypes = fs
            .readdirSync(path.join(adaptersInjectablesFullPath, adapterCode), {
                withFileTypes: true,
            })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        for (const adapterType of adapterTypes) {
            for (const [adapterClass, injectablePath] of Object.entries(injectablesTypes)) {
                const injectableFullPath = path.join(
                    adaptersInjectablesFullPath,
                    adapterCode,
                    adapterType,
                    injectablePath
                );
                if (!fs.existsSync(injectableFullPath)) continue;

                injectables[adapterClass] = {
                    type: IInjectableType.Map,
                    value: deepmerge(injectables[adapterClass]?.value || {}, {
                        [adapterCode]: {
                            type: IInjectableType.Map,
                            value: {},
                        },
                    }),
                };

                const injectableFiles = fs
                    .readdirSync(injectableFullPath, { withFileTypes: true })
                    .filter((dirent) => dirent.isFile())
                    .map((dirent) => dirent.name);

                for (const injectableFile of injectableFiles) {
                    const injectableName = injectableFile.replace('.ts', '');

                    const injectableCode = `${adapterType}/${injectableName}`;
                    const injectableRef = `${moduleName}/${adaptersInjectablesPath}/${adapterCode}/${adapterType}/${injectablePath}/${injectableName}`;

                    injectables[adapterClass].value[adapterCode].value[injectableCode] = {
                        type: IInjectableType.Reference,
                        value: injectableRef,
                    };
                }
            }
        }
    }

    return injectables;
};

export default getMagicAdapters;
