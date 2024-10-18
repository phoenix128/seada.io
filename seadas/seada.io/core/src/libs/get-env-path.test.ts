/* eslint turbo/no-undeclared-env-vars:0 */

import getEnvPath, { clearCache } from '@seada.io/core/libs/get-env-path';

describe('getEnvPath', () => {
    afterEach(() => {
        delete process.env.LEVEL__LEVEL1__MY_VALUE__DEEPER__VALUE;
        delete process.env.LEVEL__LEVEL2__MY_VALUE__DEEPER__VALUE;
        delete process.env.LEVEL__LEVEL3__MY_VALUE__DEEPER__VALUE;
        delete process.env.LEVEL_ANOTHER__LEVEL4__MY_VALUE__DEEPER__VALUE;

        clearCache();
    });

    beforeEach(() => {
        process.env.LEVEL__LEVEL1__MY_VALUE__DEEPER__VALUE = '1';
        process.env.LEVEL__LEVEL2__MY_VALUE__DEEPER__VALUE = '2';
        process.env.LEVEL__LEVEL3__MY_VALUE__DEEPER__VALUE = '3';
        process.env.LEVEL_ANOTHER__LEVEL4__MY_VALUE__DEEPER__VALUE = '4';

        clearCache();
    });

    it('should retrieve value for dot notation', () => {
        const res = getEnvPath('level');
        expect(res).toEqual({
            level1: {
                myValue: {
                    deeper: {
                        value: '1',
                    },
                },
            },
            level2: {
                myValue: {
                    deeper: {
                        value: '2',
                    },
                },
            },
            level3: {
                myValue: {
                    deeper: {
                        value: '3',
                    },
                },
            },
        });
    });

    it('should retrieve value for camel case notation', () => {
        const res = getEnvPath('levelAnother');
        expect(res).toEqual({
            level4: {
                myValue: {
                    deeper: {
                        value: '4',
                    },
                },
            },
        });
    });

    it('should return a string value if full path is provided', () => {
        const res = getEnvPath('level.level1.myValue.deeper.value');
        expect(res).toEqual('1');
    });

    it('should return default if path is not found', () => {
        const res = getEnvPath('level.level1.myValue.deeper.value2', 'test');
        expect(res).toEqual('test');
    });

    it('should return undefined if path is not found and no default is provided', () => {
        const res = getEnvPath('level.level1.myValue.deeper.value2');
        expect(res).toEqual(undefined);
    });
});
