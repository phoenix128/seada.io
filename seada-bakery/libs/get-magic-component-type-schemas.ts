import { IInjectable, IInjectableType, IPackageJson } from './interface.js';
import path from 'node:path';
import fs from 'node:fs';
import { Project, SyntaxKind } from 'ts-morph';

/**
 * Checks if a given file exports a TypeSchema
 * @param filePath
 */
const hasValidationSchemaExport = (filePath: string): boolean => {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);

    // Not using getExportedDeclarations() as it is too slow
    const exportStatements = sourceFile.getStatements().filter((statement) => {
        return (
            statement.getKind() === SyntaxKind.NamedExports ||
            statement.getKind() === SyntaxKind.ExportDeclaration ||
            statement.getKind() === SyntaxKind.ExportAssignment ||
            statement.getKind() === SyntaxKind.ExportSpecifier ||
            statement.getKind() === SyntaxKind.VariableStatement
        );
    });

    return exportStatements.some((statement) => {
        return /\WValidationSchema\W/.test(statement.getText());
    });
};

/**
 * Returns a list of injectables for a given page component
 * @param packageJson
 * @param sourcePath
 */
const getMagicComponentTypeSchemas = (packageJson: IPackageJson, sourcePath: string): Record<string, IInjectable> => {
    const schemaComponentsPath = 'schema-components';

    const moduleName = packageJson.name;
    const schemaComponentsFullPath = path.join(sourcePath, schemaComponentsPath);
    if (!fs.existsSync(schemaComponentsFullPath)) {
        return {};
    }

    const schemaComponents = fs
        .readdirSync(schemaComponentsFullPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

    return schemaComponents.reduce<Record<string, IInjectable>>(
        (acc, schemaComponent) => {
            const indexPath = path.join(schemaComponentsFullPath, schemaComponent, 'index.tsx');
            const transformerPath = path.join(schemaComponentsFullPath, schemaComponent, 'transformer.ts');
            const schemaPath = path.join(schemaComponentsFullPath, schemaComponent, 'schema.ts');

            if (!fs.existsSync(indexPath)) {
                return acc;
            }

            const schemaComponentName = `${moduleName}/${schemaComponent}`;
            const schemaComponentRef = `${moduleName}/${schemaComponentsPath}/${schemaComponent}`;

            acc['schema-components'].value[schemaComponentName] = {
                type: IInjectableType.Reference,
                value: schemaComponentRef,
            };

            if (fs.existsSync(schemaPath) && hasValidationSchemaExport(schemaPath)) {
                acc['component-type-schemas'].value[schemaComponentName] = {
                    type: IInjectableType.Reference,
                    value: `${moduleName}/${schemaComponentsPath}/${schemaComponent}/schema:ValidationSchema`,
                };
            } else {
                console.warn(`Component ${moduleName}/${schemaComponent} has no ValidationSchema.`);
            }

            if (fs.existsSync(transformerPath)) {
                acc['schema-component-transformers'].value[schemaComponentName] = {
                    type: IInjectableType.Reference,
                    value: `${moduleName}/${schemaComponentsPath}/${schemaComponent}/transformer`,
                };
            }

            return acc;
        },
        {
            'schema-components': {
                type: IInjectableType.Map,
                value: {},
            },
            'component-type-schemas': {
                type: IInjectableType.Map,
                value: {},
            },
            'schema-component-transformers': {
                type: IInjectableType.Map,
                value: {},
            },
        }
    );
};

export default getMagicComponentTypeSchemas;
