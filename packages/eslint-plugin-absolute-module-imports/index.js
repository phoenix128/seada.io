"use strict";

const fs = require("fs");
const path = require("path");

const has = (map, path) => {
    let inner = map;
    for (let step of path.split(".")) {
        inner = inner[step];
        if (inner === undefined) {
            return false;
        }
    }
    return true;
}

const findDirWithFile = (fromFile, filename) => {
    let dir = path.resolve(fromFile);

    do {
        dir = path.dirname(dir);
    } while (!fs.existsSync(path.join(dir, filename)) && dir !== "/");

    if (!fs.existsSync(path.join(dir, filename))) {
        return;
    }

    return dir;
}

const getModuleInfo = (forFile) => {
    const baseDir = findDirWithFile(forFile, "package.json");

    let baseUrl = "";

    if (!fs.existsSync(path.join(baseDir, "package.json")) || !fs.existsSync(path.join(baseDir, "tsconfig.json"))) {
        return {
            baseSourceDir: "",
            module: ""
        }
    }

    const packageJson = JSON.parse(fs.readFileSync(path.join(baseDir, "package.json")));
    const tsconfig = JSON.parse(fs.readFileSync(path.join(baseDir, "tsconfig.json")));

    if (has(tsconfig, "compilerOptions.baseUrl")) {
        baseUrl = tsconfig.compilerOptions.baseUrl;
    }

    return {
        baseSourceDir: path.join(baseDir, baseUrl),
        module: packageJson.name
    };
}

const checkImportExportDeclaration = (context, node) => {
    const source = node.source && node.source.value;

    if (source && source.startsWith(".")) {
        const filename = context.getFilename();
        const moduleInfo = getModuleInfo(filename);
        const absolutePath = path.normalize(path.join(path.dirname(filename), source));
        const moduleRelativePath = path.relative(moduleInfo.baseSourceDir, absolutePath);
        const expectedPath = (moduleInfo.module + '/' + moduleRelativePath).replaceAll('\\', '/');

        context.report({
            node: node.source || node,
            message: `Relative imports/exports are not allowed. Use \`${expectedPath}\` instead of \`${source}\`.`,
            fix: function (fixer) {
                return fixer.replaceText(node.source, `'${expectedPath}'`);
            },
        });
    }
}

module.exports.rules = {
    "only-absolute-module-imports": {
        meta: {
            fixable: true,
        },
        create: (context) => {
            return {
                ImportDeclaration(node) {
                    checkImportExportDeclaration(context, node);
                },

                ExportNamedDeclaration(node) {
                    checkImportExportDeclaration(context, node);
                }
            };
        },
    },
};
