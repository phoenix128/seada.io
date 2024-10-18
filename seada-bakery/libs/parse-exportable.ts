import { IModulesCollection } from './interface.js';

/**
 * Parses an exportable string
 * @param modules
 * @param exportable
 */
const parseExportable = (modules: IModulesCollection, exportable: string) => {
    const sourceModule = Object.keys(modules).find((moduleName) => exportable.startsWith(moduleName + '/'));
    if (!sourceModule) {
        throw new Error(`Invalid name: ${exportable}`);
    }

    const exportName = exportable.substring(sourceModule.length + 1);
    return [sourceModule, exportName];
};

export default parseExportable;
