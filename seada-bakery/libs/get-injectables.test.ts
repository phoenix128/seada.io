import { IInjectableType, IModulesCollection } from './interface.js';
import getInjectables from './get-injectables.js';

describe('getInjectables', () => {
    it('should return the merged injections from module packageJson objects', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection1: {
                                type: IInjectableType.String,
                                value: 'value1',
                            },
                        },
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection2: {
                                type: IInjectableType.String,
                                value: 'value2',
                            },
                        },
                    },
                },
            },
        };

        const result = getInjectables(modulesMock as IModulesCollection);
        expect(result).toEqual({
            injection1: {
                type: 'string',
                value: 'value1',
            },
            injection2: {
                type: 'string',
                value: 'value2',
            },
        });
    });

    it('should preserve the injectables type', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection1: {
                                type: IInjectableType.String,
                                value: 'value1',
                            },
                        },
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection1: {
                                value: 'value3',
                            },
                        },
                    },
                },
            },
        };

        const result = getInjectables(modulesMock as IModulesCollection);
        expect(result).toEqual({
            injection1: {
                type: 'string',
                value: 'value3',
            },
        });
    });

    it('should get the injectables type even if given on latter modules', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection1: {
                                value: 'value1',
                            },
                        },
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection1: {
                                type: IInjectableType.String,
                                value: 'value3',
                            },
                        },
                    },
                },
            },
        };

        const result = getInjectables(modulesMock as IModulesCollection);
        expect(result).toEqual({
            injection1: {
                type: 'string',
                value: 'value3',
            },
        });
    });

    it('should merge the same array injectable from different modules', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection: {
                                type: IInjectableType.Array,
                                value: ['value1'],
                            },
                        },
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection: {
                                type: IInjectableType.Array,
                                value: ['value2'],
                            },
                        },
                    },
                },
            },
        };

        const result = getInjectables(modulesMock as IModulesCollection);
        expect(result).toEqual({
            injection: {
                type: 'array',
                value: ['value1', 'value2'],
            },
        });
    });

    it('should replace the same injectable coming from different modules', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection: {
                                type: IInjectableType.String,
                                value: 'value1',
                            },
                        },
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection: {
                                type: IInjectableType.String,
                                value: 'value2',
                            },
                        },
                    },
                },
            },
        };

        const result = getInjectables(modulesMock as IModulesCollection);
        expect(result).toEqual({
            injection: {
                type: 'string',
                value: 'value2',
            },
        });
    });

    it('should merge complex objects coming from different modules', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection: {
                                type: IInjectableType.Raw,
                                value: {
                                    key1: {
                                        type: IInjectableType.Raw,
                                        value: {
                                            key1: {
                                                type: IInjectableType.String,
                                                value: 'value1',
                                            },
                                        },
                                    },
                                    key2: {
                                        type: IInjectableType.String,
                                        value: 'value2',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injectables: {
                            injection: {
                                type: IInjectableType.Raw,
                                value: {
                                    key1: {
                                        type: IInjectableType.Raw,
                                        value: {
                                            key2: {
                                                type: IInjectableType.String,
                                                value: 'value2',
                                            },
                                        },
                                    },
                                    key3: {
                                        type: IInjectableType.String,
                                        value: 'value3',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };

        const result = getInjectables(modulesMock as IModulesCollection);
        expect(result).toEqual({
            injection: {
                type: 'raw',
                value: {
                    key1: {
                        type: 'raw',
                        value: {
                            key1: {
                                type: 'string',
                                value: 'value1',
                            },
                            key2: {
                                type: 'string',
                                value: 'value2',
                            },
                        },
                    },
                    key2: {
                        type: 'string',
                        value: 'value2',
                    },
                    key3: {
                        type: 'string',
                        value: 'value3',
                    },
                },
            },
        });
    });
});
