const fs = require('node:fs');
const path = require('node:path');

const moduleName = process.argv[2];
const pageComponentName = process.argv[3];

const projectRoot = path.join(__dirname, '../..');

const seadaModulesFile = path.join(projectRoot, 'generated/seada-modules.json');
if (!fs.existsSync(seadaModulesFile)) {
    throw new Error('Seada modules not found. Need to run seada-bakery?');
}

const modulesCollection = JSON.parse(fs.readFileSync(seadaModulesFile, 'utf8'));
const moduleNames = Object.keys(modulesCollection);

if (!moduleNames.includes(moduleName)) {
    throw new Error(`Seada not found for component ${moduleName}`);
}

const ucComponentName = pageComponentName.replace(`${moduleName}/`, '').replace(/^\w/, (c) => c.toUpperCase());
const lcComponentName = pageComponentName.replace(`${moduleName}/`, '').replace(/^\w/, (c) => c.toLowerCase());

const moduleParts = moduleName.split('/');
const ccModuleName = moduleParts[moduleParts.length - 1].replace(/-([a-z])/g, (g) => g[1].toUpperCase());

const seadaSourcePath = path.join(projectRoot, modulesCollection[moduleName].sourcePath);
const normalizedFullComponentName = `${moduleName}/page-components/${ucComponentName}`;
const pageComponentPath = `${seadaSourcePath}/page-components/${ucComponentName}`;

// Make sure the directory doesn't exist
if (fs.existsSync(pageComponentPath)) {
    throw new Error(`Component ${normalizedFullComponentName} already exists.`);
}

fs.mkdirSync(pageComponentPath, { recursive: true });

// Dump index.tsx
const indexFile = `${pageComponentPath}/index.tsx`;
const indexFileContent = `export { default } from '${normalizedFullComponentName}/${ucComponentName}';`;

// Dump schema.ts
const schemaFile = `${pageComponentPath}/schema.ts`;
const schemaFileContent = `import { IPageComponentSchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgSquare } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';

export interface I${ucComponentName}MyGroupSchema {
    string;
}

export interface I${ucComponentName}Schema extends IBoxSchema, I${ucComponentName}MyGroupSchema {}

export const SchemaGroup${ucComponentName}MyGroup: ISchemaFieldsGroup<I${ucComponentName}MyGroupSchema> = {
    title: 'schema.${ccModuleName}.${lcComponentName}.myGroup.groupTitle',
    icon: CgSquare,
    fields: {
        myProperty: {
            type: '@seada.io/core-schema/SimpleText',
            label: 'schema.${ccModuleName}.${lcComponentName}.myGroup.loginRedirect',
            defaultValue: 'Lorem Ipsum...',
        },
    },
};

const Schema: IPageComponentSchema = {
    title: 'schema.${ccModuleName}.${lcComponentName}.componentTitle',
    group: 'schema.general.groupTitle',
    icon: CgSquare,
    hasSource: true,
    maxChildren: 0,
    fields: {
        myGroup: SchemaGroup${ucComponentName}MyGroup,
        ...BoxSchema.fields,
    },
};

export default Schema;
`;

// Dump Component.tsx
const componentFile = `${pageComponentPath}/${ucComponentName}.tsx`;
const componentFileContent = `'use client';

import React from 'react';
import { IPageComponentProps } from '@seada.io/core/interface';
import Box from '@seada.io/basic-ui/page-components/Box';
import { I${ucComponentName}Schema } from '${normalizedFullComponentName}/schema';

const ${ucComponentName}: React.FC<IPageComponentProps<I${ucComponentName}Schema>> = (props) => {
    return (
        <Box {...props}>
            ${ucComponentName}
        </Box>
    );
}

export default ${ucComponentName};`;

// Write files
fs.writeFileSync(indexFile, indexFileContent);
fs.writeFileSync(schemaFile, schemaFileContent);
fs.writeFileSync(componentFile, componentFileContent);
