import { IParsedReference } from './interface.js';
import parseReference from './parse-reference.js';

describe('parseReference', () => {
    it('should parse valid references correctly', () => {
        const reference = 'example-module:exampleExport';
        const result: IParsedReference = parseReference(reference);

        expect(result).toEqual({
            exportName: 'exampleExport',
            moduleName: 'example-module',
        });
    });

    it('should parse references without explicit export correctly', () => {
        const reference = 'example-module';
        const result: IParsedReference = parseReference(reference);

        expect(result).toEqual({
            exportName: 'default',
            moduleName: 'example-module',
        });
    });

    it('should throw an error for invalid references', () => {
        const invalidReference = 'invalid-reference:exampleExport:wrong';

        expect(() => {
            parseReference(invalidReference);
        }).toThrowError('Invalid injectable reference syntax: invalid-reference');
    });
});
