import { IInjectablesCollection, IModulesCollection } from './interface.js';
import deepmerge from 'deepmerge';

/**
 * Get injectables from module info
 * @param modules
 */
const getInjectables = (modules: IModulesCollection): IInjectablesCollection => {
    return Object.values(modules).reduce((acc, moduleInfo) => {
        const { packageJson } = moduleInfo;
        if (!packageJson || !packageJson['seada.io']) return acc;

        const {
            'seada.io': { injectables },
        } = packageJson;
        return deepmerge(acc, injectables || {});
    }, {});
};

export default getInjectables;
