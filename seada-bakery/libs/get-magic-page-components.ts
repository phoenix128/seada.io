import { IInjectable, IInjectableType, IPackageJson } from './interface.js';
import path from 'node:path';
import fs from 'node:fs';
import { Project, SyntaxKind } from 'ts-morph';

/**
 * Checks if a given file exports a Schema
 * @param filePath
 */
const hasSchemaExport = (filePath: string): boolean => {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);

    // Not using getExportedDeclarations() as it is too slow
    const exportStatements = sourceFile.getStatements().filter((statement) => {
        return (
            statement.getKind() === SyntaxKind.NamedExports ||
            statement.getKind() === SyntaxKind.ExportDeclaration ||
            statement.getKind() === SyntaxKind.ExportAssignment ||
            statement.getKind() === SyntaxKind.ExportSpecifier
        );
    });

    return exportStatements.some((statement) => {
        return /\WSchema\W/.test(statement.getText());
    });
};

/**
 * Returns a list of injectables for a given page component
 * @param packageJson
 * @param sourcePath
 */
const getMagicPageComponents = (packageJson: IPackageJson, sourcePath: string): Record<string, IInjectable> => {
    const pageComponentsPath = 'page-components';

    const moduleName = packageJson.name;
    const pageComponentsFullPath = path.join(sourcePath, pageComponentsPath);
    if (!fs.existsSync(pageComponentsFullPath)) {
        return {};
    }

    const pageComponents = fs
        .readdirSync(pageComponentsFullPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    return pageComponents.reduce<Record<string, IInjectable>>(
        (acc, pageComponent) => {
            const indexPath = path.join(pageComponentsFullPath, pageComponent, 'index.tsx');
            if (!fs.existsSync(indexPath)) {
                return acc;
            }

            const indexFileContent = fs.readFileSync(indexPath, 'utf-8');
            if (!indexFileContent.includes('export')) {
                console.warn(`Component ${moduleName}/${pageComponent} has no exports.`);
                return acc;
            }

            const referenceType = indexFileContent.includes("'use lazy'")
                ? IInjectableType.LazyReference
                : IInjectableType.Reference;

            const pageComponentName = `${moduleName}/${pageComponent}`;
            const pageComponentRef = `${moduleName}/${pageComponentsPath}/${pageComponent}`;
            acc['page-components'].value[pageComponentName] = {
                type: referenceType,
                value: pageComponentRef,
            };

            const dataProviderPath = path.join(pageComponentsFullPath, pageComponent, 'data-provider.ts');
            const schemaPath = path.join(pageComponentsFullPath, pageComponent, 'schema.ts');

            if (fs.existsSync(dataProviderPath)) {
                acc['data-providers'].value[pageComponentName] = {
                    type: IInjectableType.Reference,
                    value: `${moduleName}/${pageComponentsPath}/${pageComponent}/data-provider`,
                };
            }

            if (fs.existsSync(schemaPath)) {
                acc['page-components-schemas'].value[pageComponentName] = {
                    type: IInjectableType.Reference,
                    value: `${moduleName}/${pageComponentsPath}/${pageComponent}/schema`,
                };
            } else if (hasSchemaExport(indexPath)) {
                console.warn(
                    `Embedded schema is deprecated, please use a separate schema file for ${moduleName}/${pageComponent}.`
                );
                acc['page-components-schemas'].value[pageComponentName] = {
                    type: IInjectableType.Reference,
                    value: `${moduleName}/${pageComponentsPath}/${pageComponent}:Schema`,
                };
            } else {
                console.warn(`Component ${moduleName}/${pageComponent} has no declared schema.`);
            }

            return acc;
        },
        {
            'page-components': {
                type: IInjectableType.Map,
                value: {},
            },
            'page-components-schemas': {
                type: IInjectableType.Map,
                value: {},
            },
            'data-providers': {
                type: IInjectableType.Map,
                value: {},
            },
        }
    );
};

export default getMagicPageComponents;
