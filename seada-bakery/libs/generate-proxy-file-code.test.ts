import generateProxyFileCode from './generate-proxy-file-code.js';
import {
    IInjectablesCollection,
    IInjectableType,
    IInjection,
    IModulesCollection,
    IPluginDefinitionsCollection,
} from './interface.js';

describe('generateProxyFileCode', () => {
    const modules: IModulesCollection = {
        '@seada.io/test': {
            modulePath: 'path1',
            generatedPath: 'generatedPath1',
            sourcePath: 'sourcePath1',
            packageJson: {},
            tsconfigJson: {},
        },
    };

    it('should generate a proxy file for an injection', async () => {
        const sourceCode = `        
            const myTestFn = (values?: string[]) => {
                for (const value of values) {
                    console.log(value);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.String,
                        value: 'a',
                    },
                    {
                        type: IInjectableType.String,
                        value: 'b',
                    },
                ],
            },
        };

        const code = await generateProxyFileCode(
            modules,
            '@seada.io/test/some/file',
            sourceCode,
            injection,
            injectables,
            {}
        );
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/file";\n' +
                '\n' +
                'export default function myTestFn(values?: string[]): any {\n' +
                '    const __seada__values = values ?? ["a", "b"];\n' +
                '    return __seada__seada_io_source_test_some_file__.default(__seada__values);\n' +
                '}\n'
        );
    });

    it('should generate a proxy file for a react component injection', async () => {
        const sourceCode = `        
            const MyTestFn = ({values}) => {
                return (<div>Hello world!</div>);
            }
            
            export default MyTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.String,
                        value: 'a',
                    },
                    {
                        type: IInjectableType.String,
                        value: 'b',
                    },
                ],
            },
        };

        const code = await generateProxyFileCode(
            modules,
            '@seada.io/test/some/File',
            sourceCode,
            injection,
            injectables,
            {}
        );
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/File";\n' +
                '\n' +
                'export default function MyTestFn(props): any {\n' +
                '    const __seada__props = props ?? {};\n' +
                '    const __seada__props.values = props.values ?? ["a", "b"];\n' +
                '    return (<__seada__seada_io_source_test_some_file__.default {...__seada_props} />);\n' +
                '}\n'
        );
    });

    it('should forward exported interfaces', async () => {
        const sourceCode = `        
            export interface IValue { a: string, b: string }
            
            const myTestFn = (values?: IValue[]) => {
                for (const value of values) {
                    console.log(value.a);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.Raw,
                        value: { a: 'a', b: 'b' },
                    },
                    {
                        type: IInjectableType.String,
                        value: { a: 'c', b: 'd' },
                    },
                ],
            },
        };

        const code = await generateProxyFileCode(
            modules,
            '@seada.io/test/some/file',
            sourceCode,
            injection,
            injectables,
            {}
        );
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/file";\n' +
                '\n' +
                'export type { IValue } from "@seada.io.source/test/some/file";\n' +
                '\n' +
                'export default function myTestFn(values?: IValue[]): any {\n' +
                '    const __seada__values = values ?? [{"a":"a","b":"b"}, {"a":"c","b":"d"}];\n' +
                '    return __seada__seada_io_source_test_some_file__.default(__seada__values);\n' +
                '}\n'
        );
    });

    it('should forward enum types', async () => {
        const sourceCode = `        
            export enum EValue { a, b }
            
            const myTestFn = (values?: string[]) => {
                for (const value of values) {
                    console.log(value.a);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.String,
                        value: 'a',
                    },
                    {
                        type: IInjectableType.String,
                        value: 'b',
                    },
                ],
            },
        };

        const code = await generateProxyFileCode(
            modules,
            '@seada.io/test/some/file',
            sourceCode,
            injection,
            injectables,
            {}
        );
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/file";\n' +
                '\n' +
                'export { EValue } from "@seada.io.source/test/some/file";\n' +
                '\n' +
                'export default function myTestFn(values?: string[]): any {\n' +
                '    const __seada__values = values ?? ["a", "b"];\n' +
                '    return __seada__seada_io_source_test_some_file__.default(__seada__values);\n' +
                '}\n'
        );
    });

    it('should preserve template function', async () => {
        const sourceCode = `        
            const myTestFn = <T = any>(values?: T[]) => {
                for (const value of values) {
                    console.log(value.a);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.Raw,
                        value: { a: 'a', b: 'b' },
                    },
                    {
                        type: IInjectableType.String,
                        value: { a: 'c', b: 'd' },
                    },
                ],
            },
        };

        const code = await generateProxyFileCode(
            modules,
            '@seada.io/test/some/file',
            sourceCode,
            injection,
            injectables,
            {}
        );
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/file";\n' +
                '\n' +
                'export default function myTestFn<T = any>(values?: T[]): any {\n' +
                '    const __seada__values = values ?? [{"a":"a","b":"b"}, {"a":"c","b":"d"}];\n' +
                '    return __seada__seada_io_source_test_some_file__.default(__seada__values);\n' +
                '}\n'
        );
    });

    it('should assume raw type if no type is provided', async () => {
        const sourceCode = `        
            const myTestFn = <T = any>(values?: T[]) => {
                for (const value of values) {
                    console.log(value.a);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                value: { a: 'a', b: 'b' },
            },
        };

        const code = await generateProxyFileCode(
            modules,
            '@seada.io/test/some/file',
            sourceCode,
            injection,
            injectables,
            {}
        );
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/file";\n' +
                '\n' +
                'export default function myTestFn<T = any>(values?: T[]): any {\n' +
                '    const __seada__values = values ?? {"a":"a","b":"b"};\n' +
                '    return __seada__seada_io_source_test_some_file__.default(__seada__values);\n' +
                '}\n'
        );
    });

    it('should throw an exception when the same function is an export and a default export', async () => {
        const sourceCode = `        
            export const myTestFn = (values?: string[]) => {
                for (const value of values) {
                    console.log(value);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.String,
                        value: 'a',
                    },
                    {
                        type: IInjectableType.String,
                        value: 'b',
                    },
                ],
            },
        };

        await expect(
            generateProxyFileCode(modules, '@seada.io/test/some/file', sourceCode, injection, injectables, {})
        ).rejects.toThrowError(
            'Function "@seada.io/test/some/file:myTestFn" already exists as export. Are you both exporting the function as standalone and default?'
        );
    });

    it('should throw an exception if the injectable parameter is not optional with question mark', async () => {
        const sourceCode = `        
            const myTestFn = (values: string[]) => {
                for (const value of values) {
                    console.log(value);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.String,
                        value: 'a',
                    },
                    {
                        type: IInjectableType.String,
                        value: 'b',
                    },
                ],
            },
        };

        await expect(
            generateProxyFileCode(modules, '@seada.io/test/some/file', sourceCode, injection, injectables, {})
        ).rejects.toThrowError(
            'Injectable parameter "values" of function "@seada.io/test/some/file:default" must be defined optional with question mark notation'
        );
    });

    it('should handle plugins recursively', async () => {
        const sourceCode = `        
            const myTestFn = (values: string[]) => {
                for (const value of values) {
                    console.log(value);
                }
            }
            
            export default myTestFn;
        `;

        const plugins: IPluginDefinitionsCollection = {
            default: [
                { export: '@some-module1/test1:export1', sort: 10 },
                { export: '@some-module2/test2:export2', sort: 20 },
            ],
        };

        const code = await generateProxyFileCode(modules, '@seada.io/test/some/file', sourceCode, {}, {}, plugins);
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/file";\n' +
                'import * as __seada__some_module1_test1__ from "@some-module1/test1";\n' +
                'import * as __seada__some_module2_test2__ from "@some-module2/test2";\n' +
                '\n' +
                'export default function myTestFn(values: string[]): any {\n' +
                '    return __seada__some_module2_test2__.export2(() => __seada__some_module1_test1__.export1(() => __seada__seada_io_source_test_some_file__.default(values), values), values);\n' +
                '}\n'
        );
    });

    it('should handle plugins on react components recursively', async () => {
        const sourceCode = `        
            const MyTestFn = (props) => {
                return (<div>{Hello world!}</div>);
            }
            
            export default MyTestFn;
        `;

        const plugins: IPluginDefinitionsCollection = {
            default: [
                { export: '@some-module1/Test1:Export1', sort: 10 },
                { export: '@some-module2/Test2:Export2', sort: 20 },
            ],
        };

        const code = await generateProxyFileCode(modules, '@seada.io/test/some/File', sourceCode, {}, {}, plugins);
        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/File";\n' +
                'import * as __seada__some_module1_test1__ from "@some-module1/Test1";\n' +
                'import * as __seada__some_module2_test2__ from "@some-module2/Test2";\n' +
                '\n' +
                'function __seada__some_module1_test1__Export1(props): any {\n' +
                '    return <__seada__some_module1_test1__.Export1 {...props} SourceElement={__seada__some_module2_test2__Export2} />;\n' +
                '}\n' +
                '\n' +
                'function __seada__some_module2_test2__Export2(props): any {\n' +
                '    return <__seada__some_module2_test2__.Export2 {...props} SourceElement={__seada__seada_io_source_test_some_file__.default} />;\n' +
                '}\n' +
                '\n' +
                'export default function MyTestFn(props): any {\n' +
                '    const __seada__props = props ?? {};\n' +
                '    return <__seada__some_module1_test1__Export1 {...__seada__props} />;\n' +
                '}\n'
        );
    });

    it('should handle both injections and plugins', async () => {
        const sourceCode = `        
            const myTestFn = (values?: string[]) => {
                for (const value of values) {
                    console.log(value);
                }
            }
            
            export default myTestFn;
        `;

        const injection: IInjection = {
            default: {
                values: 'test-values',
            },
        };

        const injectables: IInjectablesCollection = {
            'test-values': {
                type: IInjectableType.Array,
                value: [
                    {
                        type: IInjectableType.String,
                        value: 'a',
                    },
                    {
                        type: IInjectableType.String,
                        value: 'b',
                    },
                ],
            },
        };

        const plugins: IPluginDefinitionsCollection = {
            default: [
                { export: '@some-module1/test1:export1', sort: 10 },
                { export: '@some-module2/test2:export2', sort: 20 },
            ],
        };

        const code = await generateProxyFileCode(
            modules,
            '@seada.io/test/some/file',
            sourceCode,
            injection,
            injectables,
            plugins
        );

        expect(code).toEqual(
            'import * as __seada__seada_io_source_test_some_file__ from "@seada.io.source/test/some/file";\n' +
                'import * as __seada__some_module1_test1__ from "@some-module1/test1";\n' +
                'import * as __seada__some_module2_test2__ from "@some-module2/test2";\n' +
                '\n' +
                'export default function myTestFn(values?: string[]): any {\n' +
                '    const __seada__values = values ?? ["a", "b"];\n' +
                '    return __seada__some_module2_test2__.export2(() => __seada__some_module1_test1__.export1(() => __seada__seada_io_source_test_some_file__.default(__seada__values), __seada__values), __seada__values);\n' +
                '}\n'
        );
    });
});
