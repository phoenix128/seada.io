import {
    ArrowFunction,
    CallExpression,
    EnumDeclaration,
    FunctionDeclaration,
    InterfaceDeclaration,
    ParameterDeclarationStructure,
    SourceFile,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeParameterDeclarationStructure,
    VariableDeclaration,
} from 'ts-morph';
import { cacheWrapper } from './cache.js';
import md5 from 'md5';

export type IExportableItem =
    | FunctionDeclaration
    | VariableDeclaration
    | ArrowFunction
    | InterfaceDeclaration
    | EnumDeclaration
    | TypeAliasDeclaration;

export interface IExportableNormalizedParam {
    name: string;
    structure: ParameterDeclarationStructure;
    hasQuestionToken: boolean;
}

export interface IExportableNormalizedTypeParam {
    name: string;
    structure: TypeParameterDeclarationStructure;
}

export enum ExportableNormalizedItemType {
    FUNCTION = 'function',
    CALL = 'call',
    FORWARDABLE = 'forwardable',
}

export interface IExportableNormalizedFunction {
    type: ExportableNormalizedItemType.FUNCTION | ExportableNormalizedItemType.CALL;
    returnType: string;
    params: IExportableNormalizedParam[];
    typeParameters: IExportableNormalizedTypeParam[];
}

export interface IExportableNormalizedForwardable {
    type: ExportableNormalizedItemType.FORWARDABLE;
    isTypeOnly: boolean;
}

export type IExportableNormalizedItem = IExportableNormalizedFunction | IExportableNormalizedForwardable;

export interface INormalizedExportItem<T = IExportableNormalizedItem> {
    source: string;
    item: T;
    exportName: string | undefined;
    isDefault: boolean;
}

/**
 * Get a function from an exported declaration
 * @param declaration
 */
const normalizeItemsDeclaration = (declaration: IExportableItem): INormalizedExportItem => {
    if (declaration.getKind() === SyntaxKind.FunctionDeclaration) {
        const fn = declaration as FunctionDeclaration;
        return {
            source: fn.getText(),
            item: {
                type: ExportableNormalizedItemType.FUNCTION,
                typeParameters: fn.getTypeParameters().map((p) => ({
                    name: p.getName(),
                    structure: p.getStructure(),
                })),
                returnType: fn.getReturnTypeNode()?.getText() ?? 'any',
                params: fn.getParameters().map((p) => ({
                    name: p.getName(),
                    structure: p.getStructure(),
                    hasQuestionToken: p.hasQuestionToken(),
                })),
            },
            exportName: fn.getName(),
            isDefault: fn.isDefaultExport(),
        };
    }

    if (declaration.getKind() === SyntaxKind.ArrowFunction) {
        const fn = declaration as ArrowFunction;
        return {
            source: fn.getText(),
            item: {
                type: ExportableNormalizedItemType.FUNCTION,
                typeParameters: fn.getTypeParameters().map((p) => ({
                    name: p.getName(),
                    structure: p.getStructure(),
                })),
                returnType: fn.getReturnTypeNode()?.getText() ?? 'any',
                params: fn.getParameters().map((p) => ({
                    name: p.getName(),
                    structure: p.getStructure(),
                    hasQuestionToken: p.hasQuestionToken(),
                })),
            },
            exportName: undefined,
            isDefault: true, // If an arrow function is exported, it is always default
        };
    }

    if (declaration.getKind() === SyntaxKind.EnumDeclaration) {
        const enumDeclaration = declaration as EnumDeclaration;
        return {
            source: enumDeclaration.getText(),
            item: {
                type: ExportableNormalizedItemType.FORWARDABLE,
                isTypeOnly: false,
            },
            exportName: enumDeclaration.getName(),
            isDefault: enumDeclaration.isDefaultExport(),
        };
    }

    if (declaration.getKind() === SyntaxKind.VariableDeclaration) {
        const variable = declaration as VariableDeclaration;
        const initializer = variable.getInitializer();

        if (initializer) {
            if (initializer.getKind() === SyntaxKind.ArrowFunction) {
                const fn = initializer as ArrowFunction;

                return {
                    source: variable.getText(),
                    item: {
                        type: ExportableNormalizedItemType.FUNCTION,
                        returnType: fn.getReturnTypeNode()?.getText() ?? 'any',
                        typeParameters: fn.getTypeParameters().map((p) => ({
                            name: p.getName(),
                            structure: p.getStructure(),
                        })),
                        params: fn.getParameters().map((p) => ({
                            name: p.getName(),
                            structure: p.getStructure(),
                            hasQuestionToken: p.hasQuestionToken(),
                        })),
                    },
                    exportName: variable.getName()!,
                    isDefault: variable.isDefaultExport(),
                };
            }

            if (initializer.getKind() === SyntaxKind.CallExpression) {
                const callExpression = initializer as CallExpression;
                const expression = callExpression.getExpression();
                if (expression?.getKind() === SyntaxKind.Identifier) {
                    return {
                        source: variable.getText(),
                        item: {
                            type: ExportableNormalizedItemType.CALL,
                            returnType: 'any',
                            typeParameters: [],
                            params: [],
                        },
                        exportName: variable.getName()!,
                        isDefault: variable.isDefaultExport(),
                    };
                }
            }
        }
    }

    if (declaration.getKind() === SyntaxKind.InterfaceDeclaration) {
        const interfaceDeclaration = declaration as InterfaceDeclaration;
        return {
            source: interfaceDeclaration.getText(),
            item: {
                type: ExportableNormalizedItemType.FORWARDABLE,
                isTypeOnly: true,
            },
            exportName: interfaceDeclaration.getName(),
            isDefault: interfaceDeclaration.isDefaultExport(),
        };
    }

    if (declaration.getKind() === SyntaxKind.TypeAliasDeclaration) {
        const typeAliasDeclaration = declaration as TypeAliasDeclaration;
        return {
            source: typeAliasDeclaration.getText(),
            item: {
                type: ExportableNormalizedItemType.FORWARDABLE,
                isTypeOnly: true,
            },
            exportName: typeAliasDeclaration.getName(),
            isDefault: typeAliasDeclaration.isDefaultExport(),
        };
    }

    if (declaration.getKind() === SyntaxKind.VariableDeclaration) {
        const variable = declaration as VariableDeclaration;
        return {
            source: variable.getText(),
            item: {
                type: ExportableNormalizedItemType.FORWARDABLE,
                isTypeOnly: false,
            },
            exportName: variable.getName(),
            isDefault: variable.isDefaultExport(),
        };
    }

    throw new Error(`Unhandled declaration: ${declaration.getKindName()}`);
};

const getExportedDeclarations = (sourceFile: SourceFile): INormalizedExportItem[] =>
    cacheWrapper(md5(sourceFile.getText()), () => {
        const exportedDeclarations = Array.from(sourceFile.getExportedDeclarations().values()).flat();

        // Generate all the required exports
        return exportedDeclarations.map(normalizeItemsDeclaration).filter((f) => f !== null);
    });

export default getExportedDeclarations;
