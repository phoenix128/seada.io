import { IModulesCollection, IPluginsCollection } from './interface.js';
import deepmerge from 'deepmerge';

/**
 * Get injections from module info
 * @param modules
 */
const getPlugins = (modules: IModulesCollection): IPluginsCollection => {
    const pluginsCollection = Object.values(modules).reduce<IPluginsCollection>((acc, moduleInfo) => {
        const { packageJson } = moduleInfo;
        if (!packageJson || !packageJson['seada.io']) return acc;

        const {
            'seada.io': { plugins },
        } = packageJson;

        return deepmerge(acc, plugins || {});
    }, {});

    // Sort plugins
    Object.values(pluginsCollection).forEach((plugins) => {
        Object.values(plugins).forEach((pluginDefinitions) => {
            pluginDefinitions.sort((a, b) => {
                return a.sort - b.sort;
            });
        });
    });

    return pluginsCollection;
};

export default getPlugins;
