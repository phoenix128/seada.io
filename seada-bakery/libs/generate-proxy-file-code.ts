import { IInjectablesCollection, IInjection, IModulesCollection, IPluginDefinitionsCollection } from './interface.js';
import {
    ImportDeclarationStructure,
    OptionalKind,
    ParameterDeclarationStructure,
    Project,
    SourceFile,
    StructureKind,
} from 'ts-morph';
import getSourceModuleName from './get-source-module-name.js';
import getSeadaImportName from './get-seada-import-name.js';
import generateInjectable from './generate-injectable.js';
import parseReference from './parse-reference.js';
import { uid } from 'uid';
import getExportedDeclarations, {
    ExportableNormalizedItemType,
    IExportableNormalizedForwardable,
    IExportableNormalizedFunction,
    INormalizedExportItem,
} from './get-exported-declarations.js';
import removeDuplicatedImports from './remove-duplicated-imports.js';

const project = new Project();

/**
 * @param callbacksList
 * @param namespaceFnName
 * @param sourceImportHashedName
 * @param mappedVariablesList
 */
const getCallbackFunctionCode = (
    callbacksList: string[],
    namespaceFnName: string,
    sourceImportHashedName: string,
    mappedVariablesList: string[]
): string => {
    if (callbacksList.length === 0) {
        return `${sourceImportHashedName}.${namespaceFnName}(${mappedVariablesList.join(', ')})`;
    }

    const cpList = [...callbacksList];
    const callback = cpList.pop();
    const callBackVariables = [
        `() => ${getCallbackFunctionCode(cpList, namespaceFnName, sourceImportHashedName, mappedVariablesList)}`,
        ...mappedVariablesList,
    ];

    return `${callback}(${callBackVariables.join(', ')})`;
};

/**
 * @param callbacksList
 * @param namespaceFnName
 * @param sourceImportHashedName
 */
const getCallbackCallCode = (
    callbacksList: string[],
    namespaceFnName: string,
    sourceImportHashedName: string
): string => {
    if (callbacksList.length === 0) {
        return `${sourceImportHashedName}.${namespaceFnName}`;
    }

    const cpList = [...callbacksList];
    const callback = cpList.pop();
    const callBackVariables = [`${getCallbackCallCode(cpList, namespaceFnName, sourceImportHashedName)}`];

    return `${callback}(${callBackVariables.join(', ')})`;
};

/**
 * Guess if a function is a react component
 * @param injectedModule
 * @param exportedItem
 */
const isReactComponent = (
    injectedModule: string,
    exportedItem: INormalizedExportItem<IExportableNormalizedFunction>
) => {
    const { item } = exportedItem as INormalizedExportItem<IExportableNormalizedFunction>;

    const componentName = injectedModule.split('/').pop();
    const fnType = item.returnType;

    // TODO: Find a better way to detect React components
    if (componentName.endsWith('.styles') || componentName.endsWith('.model')) {
        return false;
    }

    return fnType === 'ReactElement' || componentName[0] === componentName[0].toUpperCase();
};

/**
 * Generates the proxy function
 * @param injectedModule
 * @param proxyCode
 * @param sourceImportHashedName
 * @param exportedItem
 * @param injection
 * @param injectables
 * @param importedModules
 * @param plugins
 */
const generateProxyFunction = (
    injectedModule: string,
    proxyCode: SourceFile,
    sourceImportHashedName: string,
    exportedItem: INormalizedExportItem<IExportableNormalizedFunction>,
    injection: IInjection,
    injectables: IInjectablesCollection,
    importedModules: OptionalKind<ImportDeclarationStructure>[],
    plugins: IPluginDefinitionsCollection
) => {
    const { item, exportName, isDefault } = exportedItem as INormalizedExportItem<IExportableNormalizedFunction>;
    const fnName = exportName;

    const fnType = item.returnType;
    const namespaceFnName = isDefault ? 'default' : fnName;

    const paramsMap: Record<string, string> = {};
    let fnBody = '';

    if (injection?.hasOwnProperty(namespaceFnName)) {
        for (const param of item.params) {
            if (injection[namespaceFnName].hasOwnProperty(param.name)) {
                const injectableName = injection[namespaceFnName][param.name];

                if (!injectables.hasOwnProperty(injectableName)) {
                    throw new Error(
                        `Injectable "${injectableName}" of function "${injectedModule}:${namespaceFnName}" does not exists`
                    );
                }

                const injectable = generateInjectable(injectables[injectableName], importedModules);

                fnBody += `const __seada__${param.name} = ${param.name} ?? ${injectable};\n`;

                paramsMap[param.name] = `__seada__${param.name}`;

                if (!param.hasQuestionToken) {
                    throw new Error(
                        `Injectable parameter "${param.name}" of function "${injectedModule}:${namespaceFnName}" must be defined optional with question mark notation`
                    );
                }
            }
        }
    }

    const mappedVariablesList = item.params.map((p) => paramsMap[p.name] || p.name);

    if (plugins?.hasOwnProperty(namespaceFnName)) {
        const callbacksList = [];
        for (const plugin of plugins[namespaceFnName]) {
            const { moduleName, exportName } = parseReference(plugin.export);

            const hashedExport = getSeadaImportName(moduleName);
            importedModules.push({
                moduleSpecifier: moduleName,
                namespaceImport: hashedExport,
            });

            callbacksList.push(`${hashedExport}.${exportName}`);
        }

        fnBody += `return ${getCallbackFunctionCode(
            callbacksList,
            namespaceFnName,
            sourceImportHashedName,
            mappedVariablesList
        )};\n`;
    } else {
        fnBody += `return ${sourceImportHashedName}.${namespaceFnName}(${mappedVariablesList.join(', ')});`;
    }

    // If the function already exists, throw an error
    if (proxyCode.getFunction(fnName)) {
        throw new Error(
            `Function "${injectedModule}:${fnName}" already exists as export. Are you both exporting the function as standalone and default?`
        );
    }

    const parameters: ParameterDeclarationStructure[] = item.params.map((p) => p.structure);

    proxyCode.addFunction({
        name: fnName,
        isDefaultExport: isDefault,
        typeParameters: item.typeParameters.map((p) => p.structure),
        isExported: true,
        parameters,
        returnType: fnType,
        statements: fnBody,
    });
};

/**
 * Generates the proxy call function
 * @param injectedModule
 * @param proxyCode
 * @param sourceImportHashedName
 * @param exportedItem
 * @param injection
 * @param injectables
 * @param importedModules
 * @param plugins
 */
const generateProxyCall = (
    injectedModule: string,
    proxyCode: SourceFile,
    sourceImportHashedName: string,
    exportedItem: INormalizedExportItem<IExportableNormalizedFunction>,
    injection: IInjection,
    injectables: IInjectablesCollection,
    importedModules: OptionalKind<ImportDeclarationStructure>[],
    plugins: IPluginDefinitionsCollection
) => {
    const { item, exportName, isDefault } = exportedItem as INormalizedExportItem<IExportableNormalizedFunction>;
    const fnName = exportName;

    const fnType = item.returnType;
    const namespaceFnName = isDefault ? 'default' : fnName;
    let fnBody = '';

    if (injection?.hasOwnProperty(namespaceFnName)) {
        throw new Error(`Cannot apply injectable on non-function "${injectedModule}:${namespaceFnName}"`);
    }

    if (plugins?.hasOwnProperty(namespaceFnName)) {
        const callbacksList = [];
        for (const plugin of plugins[namespaceFnName]) {
            const { moduleName, exportName } = parseReference(plugin.export);

            const hashedExport = getSeadaImportName(moduleName);
            importedModules.push({
                moduleSpecifier: moduleName,
                namespaceImport: hashedExport,
            });

            callbacksList.push(`${hashedExport}.${exportName}`);
        }

        fnBody += `return ${getCallbackCallCode(
            callbacksList,
            namespaceFnName,
            sourceImportHashedName
        )}.apply(null, args);\n`;
    } else {
        fnBody += `return ${sourceImportHashedName}.${namespaceFnName}.apply(null, args);`;
    }

    // If the function already exists, throw an error
    if (proxyCode.getFunction(fnName)) {
        throw new Error(
            `Call "${injectedModule}:${fnName}" already exists as export. Are you both exporting the function as standalone and default?`
        );
    }

    const parameters: ParameterDeclarationStructure[] = [
        {
            kind: StructureKind.Parameter,
            name: 'args',
            type: 'any[]',
            isRestParameter: true,
        },
    ];

    proxyCode.addFunction({
        name: fnName,
        isDefaultExport: isDefault,
        typeParameters: item.typeParameters.map((p) => p.structure),
        isExported: true,
        parameters,
        returnType: fnType,
        statements: fnBody,
    });
};

/**
 * Generates the proxy function
 * @param injectedModule
 * @param proxyCode
 * @param sourceImportHashedName
 * @param exportedItem
 * @param injection
 * @param injectables
 * @param importedModules
 * @param plugins
 */
const generateProxyComponent = (
    injectedModule: string,
    proxyCode: SourceFile,
    sourceImportHashedName: string,
    exportedItem: INormalizedExportItem<IExportableNormalizedFunction>,
    injection: IInjection,
    injectables: IInjectablesCollection,
    importedModules: OptionalKind<ImportDeclarationStructure>[],
    plugins: IPluginDefinitionsCollection
) => {
    const { item, exportName, isDefault } = exportedItem as INormalizedExportItem<IExportableNormalizedFunction>;
    const fnName = exportName;

    const fnType = item.returnType;
    const namespaceFnName = isDefault ? 'default' : fnName;

    let fnBody = 'const __seada__props = props ?? {};\n';

    if (injection?.hasOwnProperty(namespaceFnName)) {
        for (const [paramName, injectableName] of Object.entries(injection[namespaceFnName])) {
            const injectable = generateInjectable(injectables[injectableName], importedModules);

            fnBody += `const __seada__props.${paramName} = props.${paramName} ?? ${injectable};\n`;
        }
    }

    // Common to all plugin functions
    const parameters: ParameterDeclarationStructure[] = [{ name: 'props' } as ParameterDeclarationStructure];
    const typeParameters = item.typeParameters.map((p) => p.structure);
    const returnType = fnType;

    if (plugins?.hasOwnProperty(namespaceFnName)) {
        const getWrapperFnName = (i: number) => {
            if (i >= plugins[namespaceFnName].length) {
                return `${sourceImportHashedName}.${namespaceFnName}`;
            }

            const nextPlugin = plugins[namespaceFnName][i];
            const { moduleName: sourceModuleName, exportName: sourceExportName } = parseReference(nextPlugin.export);

            const sourceHashedExport = getSeadaImportName(sourceModuleName);
            return `${sourceHashedExport}${sourceExportName}`;
        };

        for (let i = 0; i < plugins[namespaceFnName].length; i++) {
            const plugin = plugins[namespaceFnName][i];
            const { moduleName: pluginModuleName, exportName: pluginExportName } = parseReference(plugin.export);
            const pluginHashedExport = getSeadaImportName(pluginModuleName);

            importedModules.push({
                moduleSpecifier: pluginModuleName,
                namespaceImport: pluginHashedExport,
            });

            const nextFnName = getWrapperFnName(i + 1);
            const pluginFnBody = `return <${pluginHashedExport}.${pluginExportName} {...props} SourceElement={${nextFnName}} />;`;
            const pluginFnName = `${pluginHashedExport}${pluginExportName}`;

            proxyCode.addFunction({
                name: pluginFnName,
                typeParameters,
                isExported: false,
                parameters,
                returnType,
                statements: pluginFnBody,
            });
        }

        const outermostFnName = getWrapperFnName(0);
        fnBody += `return <${outermostFnName} {...__seada__props} />;`;
    } else {
        fnBody += `return (<${sourceImportHashedName}.${namespaceFnName} {...__seada_props} />);`;
    }

    // If the function already exists, throw an error
    if (proxyCode.getFunction(fnName)) {
        throw new Error(
            `Function "${injectedModule}:${fnName}" already exists as export. Are you both exporting the function as standalone and default?`
        );
    }

    proxyCode.addFunction({
        name: fnName,
        isDefaultExport: isDefault,
        typeParameters,
        isExported: true,
        parameters,
        returnType,
        statements: fnBody,
    });
};

/**
 * Generates the proxy interface forwarding the original one
 * @param proxyCode
 * @param sourceImport
 * @param exportedItem
 */
const forwardExport = (
    proxyCode: SourceFile,
    sourceImport: string,
    exportedItem: INormalizedExportItem<IExportableNormalizedForwardable>
) => {
    const {
        exportName,
        item: { isTypeOnly },
    } = exportedItem;
    proxyCode.addExportDeclaration({
        namedExports: [exportName],
        isTypeOnly,
        moduleSpecifier: sourceImport,
    });
};

/**
 * Add related imports to the proxy file
 * @param modules
 * @param proxyCode
 * @param sourceFile
 */
const addRelatedImports = (modules: IModulesCollection, sourceFile: SourceFile, proxyCode: SourceFile) => {
    const imports = sourceFile.getImportDeclarations();

    // Import all the imports of the original file
    // TODO: We should filter unused imports
    for (const importDeclaration of imports) {
        // const importStructure = importDeclaration.getStructure();
        // importStructure.moduleSpecifier = getSourceModuleName(modules, importStructure.moduleSpecifier);
        proxyCode.addImportDeclaration(importDeclaration.getStructure());
    }
};

/**
 * Generate a proxy file for a given injection
 * @param modules
 * @param subject
 * @param sourceCode
 * @param injection
 * @param injectables
 * @param plugins
 */
const generateProxyFileCode = async (
    modules: IModulesCollection,
    subject: string,
    sourceCode: string,
    injection: IInjection,
    injectables: IInjectablesCollection,
    plugins: IPluginDefinitionsCollection
): Promise<string> => {
    const sourceFile = project.createSourceFile(`source_${uid()}.ts`, sourceCode);
    const proxyCode = project.createSourceFile(`proxy_${uid()}.ts`, '', {
        overwrite: true,
    });

    const sourceImport = getSourceModuleName(modules, subject);
    const sourceImportHashedName = getSeadaImportName(sourceImport);
    const importedModules: OptionalKind<ImportDeclarationStructure>[] = [
        {
            moduleSpecifier: sourceImport,
            namespaceImport: sourceImportHashedName,
        },
    ];

    // Generate all the required exports
    const exportedItems = getExportedDeclarations(sourceFile);

    exportedItems.forEach((exportedItem) => {
        switch (exportedItem.item.type) {
            case ExportableNormalizedItemType.CALL:
                generateProxyCall(
                    subject,
                    proxyCode,
                    sourceImportHashedName,
                    exportedItem as INormalizedExportItem<IExportableNormalizedFunction>,
                    injection,
                    injectables,
                    importedModules,
                    plugins
                );
                return;

            case ExportableNormalizedItemType.FUNCTION:
                if (isReactComponent(subject, exportedItem as INormalizedExportItem<IExportableNormalizedFunction>)) {
                    generateProxyComponent(
                        subject,
                        proxyCode,
                        sourceImportHashedName,
                        exportedItem as INormalizedExportItem<IExportableNormalizedFunction>,
                        injection,
                        injectables,
                        importedModules,
                        plugins
                    );
                    return;
                }

                generateProxyFunction(
                    subject,
                    proxyCode,
                    sourceImportHashedName,
                    exportedItem as INormalizedExportItem<IExportableNormalizedFunction>,
                    injection,
                    injectables,
                    importedModules,
                    plugins
                );
                return;
            case ExportableNormalizedItemType.FORWARDABLE:
                forwardExport(
                    proxyCode,
                    sourceImport,
                    exportedItem as INormalizedExportItem<IExportableNormalizedForwardable>
                );
                return;
        }
    });

    // Add all the imports to the proxy file
    proxyCode.addImportDeclarations(importedModules);

    addRelatedImports(modules, sourceFile, proxyCode);
    removeDuplicatedImports(proxyCode);

    const res = proxyCode.getFullText();

    project.removeSourceFile(sourceFile);
    project.removeSourceFile(proxyCode);

    return res;
};

export default generateProxyFileCode;
