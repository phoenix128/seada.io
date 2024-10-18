import getExportedFunctionsByFile from './get-exported-functions-by-file.js';

describe('getExportedFunctionsByFile', () => {
    it('should return an empty object for an empty file', () => {
        const sourceCode = '';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({});
    });

    it('should return an empty object for a file without exports', () => {
        const sourceCode = 'const a: number = 1;';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({});
    });

    it('should return an empty object for a file with a non-function export', () => {
        const sourceCode = 'export const a: number = 1;';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({});
    });

    // arrow functions
    it('should return arrow exported functions', () => {
        const sourceCode = 'export const a = (): string => { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({ a: { params: [], returnType: 'string' } });
    });

    it('should return any if not type is defined', () => {
        const sourceCode = 'export const a = () => { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({ a: { params: [], returnType: 'any' } });
    });

    it('should export default arrow functions', () => {
        const sourceCode = 'export default (): string => { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: { params: [], returnType: 'string' },
        });
    });

    it('should export default arrow functions exported separately', () => {
        const sourceCode = 'const a = (): string => { return "a"; }; export default a;';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: { params: [], returnType: 'string' },
        });
    });

    // non-arrow functions
    it('should return non-arrow exported functions', () => {
        const sourceCode = 'export function a(): string { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({ a: { params: [], returnType: 'string' } });
    });

    it('should export default non-arrow functions', () => {
        const sourceCode = 'export default function a(): string { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: { params: [], returnType: 'string' },
        });
    });

    it('should export default non-arrow functions exported separately', () => {
        const sourceCode = 'function a(): string { return "a"; }; export default a;';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: { params: [], returnType: 'string' },
        });
    });

    it('should not export internal functions', () => {
        const sourceCode =
            'function a(): string { return "a"; }; function b(): string { return "b"; }; export default a;';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: { params: [], returnType: 'string' },
        });
    });

    it('should export functions with parameters', () => {
        const sourceCode = 'export function a(b: string, c: number): string { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    { name: 'b', type: 'string', isOptional: false },
                    {
                        name: 'c',
                        type: 'number',
                        isOptional: false,
                    },
                ],
                returnType: 'string',
            },
        });
    });

    it('should export default functions defined separately with parameters', () => {
        const sourceCode = 'function a(b: string = "b", c: number): string { return "a"; }; export default a;';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: {
                params: [
                    {
                        name: 'b',
                        type: 'string',
                        defaultValue: 'b',
                        isOptional: true,
                    },
                    {
                        name: 'c',
                        type: 'number',
                        isOptional: false,
                    },
                ],
                returnType: 'string',
            },
        });
    });

    it('should export functions with optional parameters', () => {
        const sourceCode = 'export function a(b?: string, c?: number): string { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    { name: 'b', type: 'string', isOptional: true },
                    { name: 'c', type: 'number', isOptional: true },
                ],
                returnType: 'string',
            },
        });
    });

    it('should export default functions with optional parameters', () => {
        const sourceCode = 'export default function a(b?: string, c?: number): string { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: {
                params: [
                    { name: 'b', type: 'string', isOptional: true },
                    { name: 'c', type: 'number', isOptional: true },
                ],
                returnType: 'string',
            },
        });
    });

    it('should export functions with default parameters', () => {
        const sourceCode = 'export function a(b: string = "b", c: number = 1): string { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    {
                        name: 'b',
                        type: 'string',
                        defaultValue: 'b',
                        isOptional: true,
                    },
                    {
                        name: 'c',
                        type: 'number',
                        defaultValue: 1,
                        isOptional: true,
                    },
                ],
                returnType: 'string',
            },
        });
    });

    it('should export default functions with default parameters', () => {
        const sourceCode = 'export default function a(b: string = "b", c: number = 1): string { return "a"; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: {
                params: [
                    {
                        name: 'b',
                        type: 'string',
                        defaultValue: 'b',
                        isOptional: true,
                    },
                    {
                        name: 'c',
                        type: 'number',
                        defaultValue: 1,
                        isOptional: true,
                    },
                ],
                returnType: 'string',
            },
        });
    });

    it('should export default functions defined separately with default parameters', () => {
        const sourceCode = 'function a(b: string = "b", c: number = 1): string { return "a"; }; export default a;';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            default: {
                params: [
                    {
                        name: 'b',
                        type: 'string',
                        defaultValue: 'b',
                        isOptional: true,
                    },
                    {
                        name: 'c',
                        type: 'number',
                        defaultValue: 1,
                        isOptional: true,
                    },
                ],
                returnType: 'string',
            },
        });
    });

    it('should export functions with array parameters and return type of scalar type', () => {
        const sourceCode = 'export function a(b: string[], c: int[]): string[] { return []; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    { name: 'b', type: 'string[]', isOptional: false },
                    {
                        name: 'c',
                        type: 'int[]',
                        isOptional: false,
                    },
                ],
                returnType: 'string[]',
            },
        });
    });

    it('should export functions with union parameters and return type', () => {
        const sourceCode = 'export function a(b: string | string[], c: int[]): string | string[] { return []; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    { name: 'b', type: 'string | string[]', isOptional: false },
                    {
                        name: 'c',
                        type: 'int[]',
                        isOptional: false,
                    },
                ],
                returnType: 'string | string[]',
            },
        });
    });

    it('should export functions with reference parameters and return type', () => {
        const sourceCode = 'export function a(b: IMyInterface, c: IMyInterface): IMyInterface { return null; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    { name: 'b', type: 'IMyInterface', isOptional: false },
                    {
                        name: 'c',
                        type: 'IMyInterface',
                        isOptional: false,
                    },
                ],
                returnType: 'IMyInterface',
            },
        });
    });

    it('should export functions with complex reference parameters and return type', () => {
        const sourceCode =
            'export function a(b: Record<string, IMyInterface>, c: Record<string, IMyInterface>): Record<string, IMyInterface> { return null; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    {
                        name: 'b',
                        type: 'Record<string,IMyInterface>',
                        isOptional: false,
                    },
                    {
                        name: 'c',
                        type: 'Record<string,IMyInterface>',
                        isOptional: false,
                    },
                ],
                returnType: 'Record<string,IMyInterface>',
            },
        });
    });

    it('should export functions with array of reference parameters and return type', () => {
        const sourceCode = 'export function a(b: IMyInterface[], c: IMyInterface[]): IMyInterface[] { return []; }';
        const result = getExportedFunctionsByFile(sourceCode);
        expect(result).toEqual({
            a: {
                params: [
                    { name: 'b', type: 'IMyInterface[]', isOptional: false },
                    {
                        name: 'c',
                        type: 'IMyInterface[]',
                        isOptional: false,
                    },
                ],
                returnType: 'IMyInterface[]',
            },
        });
    });
});
