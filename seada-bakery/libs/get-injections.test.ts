import getInjections from './get-injections.js';
import { IInjectionsCollection, IModulesCollection } from './interface.js';

describe('getInjections', () => {
    it('should return the merged injections from module packageJson objects', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injections: {
                            module1: {
                                default: {
                                    variable: 'injection1',
                                },
                            },
                        } as IInjectionsCollection,
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injections: {
                            module2: {
                                default: {
                                    variable: 'injection1',
                                },
                            },
                        } as IInjectionsCollection,
                    },
                },
            },
        };

        const result = getInjections(modulesMock as IModulesCollection);
        expect(result).toEqual({
            module1: {
                default: {
                    variable: 'injection1',
                },
            },
            module2: {
                default: {
                    variable: 'injection1',
                },
            },
        });
    });

    it('should merge the same injections from different modules', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injections: {
                            module1: {
                                default: {
                                    variable1: 'injection1',
                                },
                            },
                        } as IInjectionsCollection,
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injections: {
                            module1: {
                                default: {
                                    variable2: 'injection2',
                                },
                            },
                        } as IInjectionsCollection,
                    },
                },
            },
        };

        const result = getInjections(modulesMock as IModulesCollection);
        expect(result).toEqual({
            module1: {
                default: {
                    variable1: 'injection1',
                    variable2: 'injection2',
                },
            },
        });
    });

    it('should rewrite the same injections from different modules', () => {
        const modulesMock: any = {
            module1: {
                packageJson: {
                    'seada.io': {
                        injections: {
                            module1: {
                                default: {
                                    variable: 'injection1',
                                },
                            },
                        } as IInjectionsCollection,
                    },
                },
            },
            module2: {
                packageJson: {
                    'seada.io': {
                        injections: {
                            module1: {
                                default: {
                                    variable: 'injection2',
                                },
                            },
                        } as IInjectionsCollection,
                    },
                },
            },
        };

        const result = getInjections(modulesMock as IModulesCollection);
        expect(result).toEqual({
            module1: {
                default: {
                    variable: 'injection2',
                },
            },
        });
    });
});
