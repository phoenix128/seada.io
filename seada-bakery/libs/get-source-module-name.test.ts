import { IModulesCollection } from './interface.js';
import getSourceModuleName from './get-source-module-name.js';

describe('getSourceModuleName', () => {
    const modules: IModulesCollection = {
        '@seada.io/module1': {
            modulePath: 'path1',
            generatedPath: 'generatedPath1',
            sourcePath: 'sourcePath1',
            packageJson: {},
            tsconfigJson: {},
        },
    };

    it('should return the source module name if the module is a seada module', () => {
        const moduleName = '@seada.io/module1/some-file';
        const expectedSourceModuleName = '@seada.io.source/module1/some-file';
        const result = getSourceModuleName(modules, moduleName);
        expect(result).toBe(expectedSourceModuleName);
    });

    it('should return the original module name if the module does not exist in the collection', () => {
        const moduleName = 'nonExistentModule';
        const result = getSourceModuleName(modules, moduleName);
        expect(result).toBe(moduleName);
    });
});
