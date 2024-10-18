import { parse } from '@typescript-eslint/typescript-estree';

/**
 * Get all function exports from a file
 * @param sourceCode
 */
const getExportedFunctionsByFile = (sourceCode: string): any => {
    const ast = parse(sourceCode, { loc: true });

    const exportsInfo: any = {};
    const functionDeclarations: { [key: string]: any } = {};
    const variableDeclarations: { [key: string]: any } = {};

    function getTemplateVariables(annotation: any): string {
        if (annotation?.type !== 'TSTypeParameterInstantiation') {
            return '';
        }

        const { params } = annotation;
        if (params.length === 0) {
            return '';
        }

        return '<' + params.map((p) => getTypeAnnotationType(p)) + '>';
    }

    function getTypeAnnotationType(annotation: any): string {
        const annotationType = annotation.type;

        switch (annotationType) {
            case 'TSStringKeyword':
                return 'string';
            case 'TSNumberKeyword':
                return 'number';
            case 'TSBooleanKeyword':
                return 'boolean';
            case 'TSTypeReference':
                return annotation.typeName.name + getTemplateVariables(annotation.typeArguments);
            //return annotation.typeName.name;
            case 'TSArrayType':
                return `${getTypeAnnotationType(annotation.elementType)}[]`;
            case 'TSUnionType':
                return annotation.types.map((type: any) => getTypeAnnotationType(type)).join(' | ');
            default:
                return 'any';
        }
    }

    function getFunctionParams(node: any): string[] {
        return node.params.map((param: any) => {
            if (param.type === 'AssignmentPattern') {
                return {
                    name: param.left.name,
                    type: getTypeAnnotationType(param.left.typeAnnotation?.typeAnnotation),
                    defaultValue: param.right.value,
                    isOptional: true,
                };
            }

            return {
                name: param.name,
                type: getTypeAnnotationType(param.typeAnnotation?.typeAnnotation),
                isOptional: param.optional,
            };
        });
    }

    function getFunctionReturnType(node: any): string | undefined {
        if (node.returnType && node.returnType.typeAnnotation) {
            const annotation = node.returnType.typeAnnotation;
            return getTypeAnnotationType(annotation);
        }

        return 'any';
    }

    function handleExportedFunction(name: string, node: any) {
        exportsInfo[name] = {
            params: getFunctionParams(node),
            returnType: getFunctionReturnType(node) || 'any',
        };
    }

    // Fetch all function and variable declarations
    for (const statement of ast.body) {
        if (statement.type === 'FunctionDeclaration') {
            functionDeclarations[statement.id.name] = statement;
        } else if (statement.type === 'VariableDeclaration') {
            const declaration: any = statement.declarations[0];
            if (
                declaration.init &&
                (declaration.init.type === 'ArrowFunctionExpression' || declaration.init.type === 'FunctionExpression')
            ) {
                variableDeclarations[declaration.id.name] = declaration.init;
            }
        }
    }

    // Fetch all exports
    for (const statement of ast.body) {
        if (statement.type === 'ExportNamedDeclaration' && statement.declaration) {
            const declaration: any = statement.declaration;

            if (declaration.type === 'FunctionDeclaration') {
                handleExportedFunction(declaration.id.name, declaration);
            } else if (
                declaration.type === 'VariableDeclaration' &&
                declaration.declarations[0].init.type === 'ArrowFunctionExpression'
            ) {
                handleExportedFunction(declaration.declarations[0].id.name, declaration.declarations[0].init);
            }
        }

        if (statement.type === 'ExportDefaultDeclaration') {
            const declaration = statement.declaration;

            if (declaration.type === 'ArrowFunctionExpression' || declaration.type === 'FunctionDeclaration') {
                handleExportedFunction('default', declaration);
            } else if (declaration.type === 'Identifier') {
                const fn = functionDeclarations[declaration.name] || variableDeclarations[declaration.name];
                if (fn) {
                    handleExportedFunction('default', fn);
                }
            }
        }
    }

    return exportsInfo;
};

export default getExportedFunctionsByFile;
