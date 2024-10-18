import getSeadaImportName from './get-seada-import-name.js';

describe('getSeadaImportName', () => {
    it('should return a valid import name', () => {
        expect(getSeadaImportName('module/someimport')).toEqual('__seada__module_someimport__');
    });

    it('should remove special characters', () => {
        expect(getSeadaImportName('@module/someimport')).toEqual('__seada__module_someimport__');
    });

    it('should convert dashed characters', () => {
        expect(getSeadaImportName('@module/some-import')).toEqual('__seada__module_some_import__');
    });

    it('should convert to lowercase', () => {
        expect(getSeadaImportName('@module/SomeImport')).toEqual('__seada__module_someimport__');
    });

    it('should match globally', () => {
        expect(getSeadaImportName('@module/some--import-with-multiple-matches')).toEqual(
            '__seada__module_some_import_with_multiple_matches__'
        );
    });
});
