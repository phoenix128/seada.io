import { IInjectable, IPackageJson } from './interface.js';
import path from 'node:path';
import fs from 'node:fs';
import { globSync } from 'glob';
import getExportedDeclarations from './get-exported-declarations.js';
import { uid } from 'uid';
import { Project } from 'ts-morph';

const project = new Project();

/**
 * Returns a list of plugin injectables
 * @param packageJson
 * @param sourcePath
 */
const getMagicPlugins = (packageJson: IPackageJson, sourcePath: string): Record<string, IInjectable> => {
    const pluginsPath = 'plugins';
    const moduleName = packageJson.name;

    const pluginsFullPath = path.join(sourcePath, pluginsPath);
    if (!fs.existsSync(pluginsFullPath)) {
        return {};
    }

    const plugins = {};
    const tsxFiles = globSync(`${pluginsFullPath}/**/*.ts*`);

    for (const tsxFile of tsxFiles) {
        const sourceCode = fs.readFileSync(tsxFile, 'utf-8');
        const sourceFile = project.createSourceFile(`source_${uid()}.ts`, sourceCode);
        const exportedItems = getExportedDeclarations(sourceFile);

        const isTsx = tsxFile.endsWith('.tsx');

        const pluginName =
            moduleName +
            '/' +
            pluginsPath +
            '/' +
            path
                .relative(pluginsFullPath, tsxFile)
                .replace(/\.tsx?$/, '')
                .replace(/\\/g, '/');

        const defaultExport = exportedItems.find((item) => item.isDefault);
        if (!defaultExport) {
            continue;
        }

        const declarationText = defaultExport.source;
        const pluginDefinition = isTsx
            ? declarationText.match(/IPluginReactFC<\s*typeof\s+(?<importName>.+?)(\s*,\s*(?<priority>\d+)\s*)?\s*>/)
            : declarationText.match(/IPlugin<\s*typeof\s+(?<importName>.+?)(\s*,\s*(?<priority>\d+)\s*)?\s*>/);

        if (!pluginDefinition) {
            console.warn(`Plugin ${isTsx ? 'IPluginReactFC' : 'IPlugin'}<...> definition not found in ${pluginName}`);
            continue;
        }

        const imports = sourceFile.getImportDeclarations();
        const { importName, priority } = pluginDefinition.groups!;
        const importSourceName = imports.find((imp) => imp.getDefaultImport()?.getText() === importName);
        if (!importSourceName) {
            console.warn(`Import ${importName} not found in ${pluginName}`);
            continue;
        }

        const pluginSource = importSourceName.getModuleSpecifierValue();
        const originalModuleName = pluginSource.replace(/\.source\//, '/');
        if (pluginSource === originalModuleName) {
            console.warn(
                `Found import "${pluginSource}" in "${pluginName}" with invalid source path. Expected use of ".source" import.`
            );
        }

        plugins[originalModuleName] = {
            default: [
                {
                    export: pluginName,
                    priority: priority ? parseInt(priority) : 100,
                },
            ],
        };
    }

    return plugins;
};

export default getMagicPlugins;
