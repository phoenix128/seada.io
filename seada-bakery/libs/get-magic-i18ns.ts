import { IInjectable, IInjectableType, IPackageJson } from './interface.js';
import path from 'node:path';
import fs from 'node:fs';

/**
 * Returns a list of injectables for a given page component
 * @param packageJson
 * @param sourcePath
 */
const getMagicI18ns = (packageJson: IPackageJson, sourcePath: string): Record<string, IInjectable> => {
    const i18nInjectableFile = 'get-i18n';
    const moduleName = packageJson.name;

    const i18nInjectableFullPath = path.join(sourcePath, i18nInjectableFile + '.ts');
    if (!fs.existsSync(i18nInjectableFullPath)) {
        return {};
    }

    return {
        'i18n-providers': {
            type: IInjectableType.Array,
            value: [
                {
                    type: IInjectableType.Reference,
                    value: `${moduleName}/${i18nInjectableFile}`,
                },
            ],
        },
    };
};

export default getMagicI18ns;
