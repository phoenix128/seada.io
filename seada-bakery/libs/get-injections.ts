import { IInjectionsCollection, IModulesCollection } from './interface.js';
import deepmerge from 'deepmerge';

/**
 * Get injections from module info
 * @param modules
 */
const getInjections = (modules: IModulesCollection): IInjectionsCollection => {
    return Object.values(modules).reduce((acc, moduleInfo) => {
        const { packageJson } = moduleInfo;
        if (!packageJson || !packageJson['seada.io']) return acc;

        const {
            'seada.io': { injections },
        } = packageJson;

        return deepmerge(acc, injections || {});
    }, {});
};

export default getInjections;
