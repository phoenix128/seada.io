import { IModulesCollection } from './interface.js';
import parseExportable from './parse-exportable.js';

describe('parseExportable', () => {
    const modules: IModulesCollection = {
        '@seada.io/module1': {
            modulePath: 'path1',
            generatedPath: 'generatedPath1',
            sourcePath: 'sourcePath1',
            packageJson: {},
            tsconfigJson: {},
        },
        '@seada.io/module2': {
            modulePath: 'path1',
            generatedPath: 'generatedPath1',
            sourcePath: 'sourcePath1',
            packageJson: {},
            tsconfigJson: {},
        },
        '@seada.io/module1a': {
            modulePath: 'path1',
            generatedPath: 'generatedPath1',
            sourcePath: 'sourcePath1',
            packageJson: {},
            tsconfigJson: {},
        },
    };

    it('should parse a simple exportable', () => {
        const res = parseExportable(modules, '@seada.io/module1/some-file');
        expect(res).toEqual(['@seada.io/module1', 'some-file']);
    });

    it('should throw an exception if the module does not exist', () => {
        expect(() => parseExportable(modules, 'nonExistentModule')).toThrowError();
    });

    it('should consider the longest module name first', () => {
        const res = parseExportable(modules, '@seada.io/module1a/some-file');
        expect(res).toEqual(['@seada.io/module1a', 'some-file']);
    });
});
