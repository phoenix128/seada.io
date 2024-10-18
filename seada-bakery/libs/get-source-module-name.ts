import { IModulesCollection } from './interface.js';

/**
 * Generates the source module name from the module name.
 * @param modules
 * @param moduleName
 */
const getSourceModuleName = (modules: IModulesCollection, moduleName: string): string => {
    if (!Object.keys(modules).find((m) => moduleName.startsWith(`${m}/`)) && !modules.hasOwnProperty(moduleName)) {
        return moduleName;
    }

    const nsModuleName = moduleName.match(/^(?<namespace>@?[^\/]+?)\/(?<module>.+)$/);

    if (nsModuleName) {
        return `${nsModuleName.groups!.namespace}.source/${nsModuleName.groups!.module}`;
    }

    return `${moduleName}.source`;
};

export default getSourceModuleName;
