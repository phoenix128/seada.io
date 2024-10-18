import { IInjectable, IInjectableType } from './interface.js';
import parseInjectable from './parse-injectable.js';

describe('parseInjectable', () => {
    it('should validate string injectable', () => {
        const injectable: IInjectable = {
            type: IInjectableType.String,
            value: 'some string',
        };

        const parsed = parseInjectable(injectable);
        expect(parsed).toBe('some string');
    });

    it('should validate number injectable', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Number,
            value: 123,
        };

        const parsed = parseInjectable(injectable);
        expect(parsed).toBe(123);
    });

    it('should validate reference injectable', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Reference,
            value: '@seada.io/test/some/file:export',
        };

        const parsed = parseInjectable(injectable);
        expect(parsed).toEqual({
            moduleName: '@seada.io/test/some/file',
            exportName: 'export',
        });
    });

    it('should validate reference injectable without export name', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Reference,
            value: '@seada.io/test/some/file',
        };

        const parsed = parseInjectable(injectable);
        expect(parsed).toEqual({
            moduleName: '@seada.io/test/some/file',
            exportName: 'default',
        });
    });

    it('should throw an exception if injectable type is not supported', () => {
        const injectable: IInjectable = {
            type: 'unsupported' as any,
            value: 'some value',
        };

        expect(() => parseInjectable(injectable)).toThrowError('Invalid injectable type: unsupported');
    });

    it('should throw an exception if injectable string value is not valid', () => {
        const injectable: IInjectable = {
            type: IInjectableType.String,
            value: 123 as any,
        };

        expect(() => parseInjectable(injectable)).toThrowError('Invalid injectable value: 123');
    });

    it('should throw an exception if injectable number value is not valid', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Number,
            value: 'some string' as any,
        };

        expect(() => parseInjectable(injectable)).toThrowError('Invalid injectable value: some string');
    });

    it('should throw an exception if injectable reference value is not valid', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Reference,
            value: 'some string' as any,
        };

        expect(() => parseInjectable(injectable)).toThrowError('Invalid injectable reference syntax: some string');
    });

    it('should validate array injectable', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Array,
            value: [
                {
                    type: IInjectableType.String,
                    value: 'some string',
                },
                {
                    type: IInjectableType.Number,
                    value: 123,
                },
                {
                    type: IInjectableType.Reference,
                    value: '@seada.io/test/some/file:export',
                },
                {
                    type: IInjectableType.Reference,
                    value: '@seada.io/test/some/file',
                },
            ],
        };

        const parsed = parseInjectable(injectable);
        expect(parsed).toEqual([
            'some string',
            123,
            {
                moduleName: '@seada.io/test/some/file',
                exportName: 'export',
            },
            {
                moduleName: '@seada.io/test/some/file',
                exportName: 'default',
            },
        ]);
    });

    it('should validate map injectable', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Map,
            value: {
                string: {
                    type: IInjectableType.String,
                    value: 'some string',
                },
                number: {
                    type: IInjectableType.Number,
                    value: 123,
                },
                reference: {
                    type: IInjectableType.Reference,
                    value: '@seada.io/test/some/file:export',
                },
                reference2: {
                    type: IInjectableType.Reference,
                    value: '@seada.io/test/some/file',
                },
            },
        };

        const parsed = parseInjectable(injectable);
        expect(parsed).toEqual({
            string: 'some string',
            number: 123,
            reference: {
                moduleName: '@seada.io/test/some/file',
                exportName: 'export',
            },
            reference2: {
                moduleName: '@seada.io/test/some/file',
                exportName: 'default',
            },
        });
    });

    it('should throw an exception if a nested value is not valid', () => {
        const injectable: IInjectable = {
            type: IInjectableType.Array,
            value: [
                {
                    type: IInjectableType.String,
                    value: 123,
                },
            ],
        };

        expect(() => parseInjectable(injectable)).toThrowError('Invalid injectable value: 123');
    });
});
