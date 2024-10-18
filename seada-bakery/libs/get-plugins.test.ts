import { IModulesCollection, IPluginsCollection } from './interface.js';
import getPlugins from './get-plugins.js';

describe('getPlugins', () => {
    it('should return the merged plugins from module packageJson objects', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        plugins: {
                            module1: {
                                default: [
                                    {
                                        export: 'module1:export',
                                        sort: 10,
                                    },
                                ],
                            },
                        } as IPluginsCollection,
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        plugins: {
                            module1: {
                                default: [
                                    {
                                        export: 'module2:export',
                                        sort: 20,
                                    },
                                ],
                            },
                        } as IPluginsCollection,
                    },
                },
            },
        };

        const result = getPlugins(modulesMock as IModulesCollection);
        expect(result).toEqual({
            module1: {
                default: [
                    {
                        export: 'module1:export',
                        sort: 10,
                    },
                    {
                        export: 'module2:export',
                        sort: 20,
                    },
                ],
            },
        });
    });

    it('should return the merged plugins in the correct order', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        plugins: {
                            module1: {
                                default: [
                                    {
                                        export: 'module1:export',
                                        sort: 20,
                                    },
                                ],
                            },
                        } as IPluginsCollection,
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        plugins: {
                            module1: {
                                default: [
                                    {
                                        export: 'module2:export',
                                        sort: 10,
                                    },
                                ],
                            },
                        } as IPluginsCollection,
                    },
                },
            },
        };

        const result = getPlugins(modulesMock as IModulesCollection);
        expect(result).toEqual({
            module1: {
                default: [
                    {
                        export: 'module2:export',
                        sort: 10,
                    },
                    {
                        export: 'module1:export',
                        sort: 20,
                    },
                ],
            },
        });
    });

    it('should handle plugins with undefined sort order', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        plugins: {
                            module1: {
                                default: [
                                    {
                                        export: 'module1:export',
                                    },
                                ],
                            },
                        } as IPluginsCollection,
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        plugins: {
                            module1: {
                                default: [
                                    {
                                        export: 'module2:export',
                                    },
                                ],
                            },
                        } as IPluginsCollection,
                    },
                },
            },
        };

        const result = getPlugins(modulesMock as IModulesCollection);
        expect(result).toEqual({
            module1: {
                default: [
                    {
                        export: 'module1:export',
                    },
                    {
                        export: 'module2:export',
                    },
                ],
            },
        });
    });
});
