import fs from 'fs';
import getComponentTypeSchemas from '@seada.io/core-schema/spi/components/get-component-type-schemas';
import { ESeadaObjectType } from '@seada.io/core/spi/seada-pages/interface';
import getJsonSchema from '@seada.io/core-schema/spi/schema/get-json-schema';

const schemaTypes = getComponentTypeSchemas();
const { schemaTemplate, schemaLayout } = getJsonSchema();

fs.mkdirSync('generated/json-schema', { recursive: true });

fs.writeFileSync(`generated/json-schema/${ESeadaObjectType.TEMPLATES}.json`, JSON.stringify(schemaTemplate, null, 2));
fs.writeFileSync(`generated/json-schema/${ESeadaObjectType.LAYOUTS}.json`, JSON.stringify(schemaLayout, null, 2));

fs.mkdirSync('generated/spi/schema', { recursive: true });
fs.writeFileSync(
    `generated/spi/schema/components-list.generated.ts`,
    `export type ESchemaComponent =\n${Object.keys(schemaTypes)
        .map((key) => `\t'${key}' |\n`)
        .join('')}\tstring;
`
);

console.log('JSON schema generated');
