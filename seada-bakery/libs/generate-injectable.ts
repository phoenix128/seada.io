import { IInjectable, IInjectableType } from './interface.js';
import { ImportDeclarationStructure, OptionalKind } from 'ts-morph';
import parseInjectable from './parse-injectable.js';
import getSeadaImportName from './get-seada-import-name.js';

/**
 * Generate injectable code and provide the import declaration if required
 * @param injectable
 * @param importedModules
 */
const generateInjectable = (
    injectable: IInjectable,
    importedModules: OptionalKind<ImportDeclarationStructure>[]
): string => {
    if (injectable.type === IInjectableType.Reference) {
        const value = parseInjectable(injectable);
        const { moduleName, exportName } = value as {
            moduleName: string;
            exportName: string;
        };
        const hashedImportName = getSeadaImportName(moduleName);
        const importDeclaration = importedModules.find((m) => m.moduleSpecifier === moduleName);
        if (!importDeclaration) {
            importedModules.push({
                moduleSpecifier: moduleName,
                namespaceImport: hashedImportName,
            });
        }

        return `${hashedImportName}.${exportName}`;
    }

    if (injectable.type === IInjectableType.DynamicReference) {
        const value = parseInjectable(injectable);
        const { moduleName, exportName } = value as {
            moduleName: string;
            exportName: string;
        };

        const importDeclaration = importedModules.find((m) => {
            return m.moduleSpecifier === 'next/dynamic';
        });
        if (!importDeclaration) {
            importedModules.push({
                moduleSpecifier: 'next/dynamic',
                defaultImport: 'dynamic',
            });
        }

        if (exportName === 'default') {
            return `dynamic(() => import('${moduleName}'))`;
        }

        return `dynamic(() => import('${moduleName}').then(m => ({default: m.${exportName})))`;
    }

    if (injectable.type === IInjectableType.LazyReference) {
        const value = parseInjectable(injectable);
        const { moduleName, exportName } = value as {
            moduleName: string;
            exportName: string;
        };

        const importDeclaration = importedModules.find((m) => {
            return m.moduleSpecifier === 'react';
        });
        if (!importDeclaration) {
            importedModules.push({
                moduleSpecifier: 'react',
                defaultImport: 'React',
            });
        }

        if (exportName === 'default') {
            return `React.lazy(() => import('${moduleName}'))`;
        }

        return `React.lazy(() => import('${moduleName}').then(m => ({default: m.${exportName})))`;
    }

    if (injectable.type === IInjectableType.Array) {
        const value = injectable.value;
        return `[${(value as any[]).map((v) => generateInjectable(v, importedModules)).join(', ')}]`;
    }

    if (injectable.type === IInjectableType.Map) {
        const value = injectable.value;
        return `{${Object.entries(value as Record<string, IInjectable>)
            .map(([key, value]) => `'${key}': ${generateInjectable(value, importedModules)}`)
            .join(', ')}}`;
    }

    return JSON.stringify(injectable.value);
};

export default generateInjectable;
