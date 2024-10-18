import { SourceFile } from 'ts-morph';

const removeDuplicatedImports = (proxyCode: SourceFile): void => {
    const imports = proxyCode.getImportDeclarations();
    const importsMap = new Map<string, string>();

    imports.forEach((importDeclaration) => {
        const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
        const importName =
            importDeclaration.getNamespaceImport()?.getText() ?? importDeclaration.getDefaultImport()?.getText() ?? '';

        if (importsMap.has(moduleSpecifier)) {
            importDeclaration.remove();
        } else {
            importsMap.set(moduleSpecifier, importName);
        }
    });
};

export default removeDuplicatedImports;
