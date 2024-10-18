import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';
import { Definition } from 'typescript-json-schema';
import md5 from 'md5';
import getPageComponents from '@seada.io/core/spi/components/get-page-components';
import getComponentTypeSchemas from '@seada.io/core-schema/spi/components/get-component-type-schemas';

export interface ISchemaResult {
    schemaTemplate: Definition;
    schemaLayout: Definition;
}

const getJsonSchema = (): ISchemaResult => {
    const componentsList = getPageComponents();
    const schemaTypes = getComponentTypeSchemas();

    if (!schemaTypes)
        return {
            schemaTemplate: {},
            schemaLayout: {},
        };

    const componentDefinitions: Definition[] = [];
    const schemaTypeDefinitions: Record<string, Definition> = {};
    const additionalDefinitions: Record<string, Definition> = {};

    for (const componentType of Object.keys(componentsList)) {
        const schema = getPageComponentSchema(componentType);

        if (!schema) {
            console.warn(`No schema found for component ${componentType}`);
            continue;
        }

        const props: Definition = {
            type: 'object',
            additionalProperties: false,
            properties: schema.fields
                ? Object.values(schema.fields).reduce<Record<string, Definition>>((acc, fieldsGroup) => {
                      const newAcc = Object.entries(fieldsGroup.fields).reduce((acc, [field, fieldSchema]) => {
                          const fieldSchemaTypeCode = md5(fieldSchema.type);

                          return {
                              ...acc,
                              [field]: {
                                  $ref: `#/definitions/types/${fieldSchemaTypeCode}`,
                              },
                          };
                      }, {});

                      return {
                          ...acc,
                          ...newAcc,
                      };
                  }, {})
                : {},
        };

        const schemaProperties: Record<string, Definition> = {
            id: { type: 'string' },
            props,
            label: { type: 'string' },
        };

        if (schema.maxChildren > 0) {
            schemaProperties['children'] = {
                type: 'array',
                items: { $ref: `#/definitions/componentItem` },
            };

            if (schema.maxChildren !== Infinity) {
                schemaProperties['children'].maxItems = schema.maxChildren;
            }
        }

        componentDefinitions.push({
            if: {
                properties: {
                    type: {
                        const: componentType,
                    },
                },
            },
            then: {
                properties: {
                    type: { $ref: '#/definitions/componentsEnum' },
                    ...schemaProperties,
                },
                required: ['type', 'id'],
                additionalProperties: false,
            },
            else: false,
        });
    }

    const recursivelyExtractDefinitions = (
        schema: Definition | Definition[],
        definitions: Record<string, Definition> = {}
    ) => {
        if (!schema) return;

        if (Array.isArray(schema)) {
            for (const value of schema) {
                recursivelyExtractDefinitions(value, definitions);
            }

            return;
        }

        if (typeof schema === 'object') {
            if (schema.definitions) {
                for (const [definitionName, definition] of Object.entries(schema.definitions)) {
                    definitions[definitionName] = definition as Definition;
                    recursivelyExtractDefinitions(definitions[definitionName], definitions);
                }

                delete schema.definitions;
            }

            for (const [key, value] of Object.entries(schema)) {
                recursivelyExtractDefinitions(value, definitions);
            }
        }
    };

    for (const [schemaType, schema] of Object.entries(schemaTypes)) {
        if (!schema) continue;

        recursivelyExtractDefinitions(schema, additionalDefinitions);

        schemaTypeDefinitions[md5(schemaType)] = {
            description: schemaType,
            ...schema,
        };
    }

    const componentItem = {
        oneOf: componentDefinitions,
    };

    const componentsEnum = {
        type: 'string',
        enum: Object.keys(componentsList),
    };

    const commonSchema = {
        $schema: 'https://json-schema.org/draft/2020-12/schema#',
        type: 'object',
        properties: {
            components: {
                type: 'array',
                description: 'List of template components',
                items: { $ref: '#/definitions/componentItem' },
            },
            pageSource: {
                type: 'string',
            },
        },
        additionalProperties: false,
        definitions: {
            componentItem,
            componentsEnum,
            types: { ...schemaTypeDefinitions },
            ...additionalDefinitions,
        },
    };

    const schemaTemplate = {
        ...commonSchema,
        properties: {
            ...commonSchema.properties,
            layout: {
                type: 'string',
            },
        },
    } as Definition;

    const schemaLayout = {
        ...commonSchema,
    } as Definition;

    return {
        schemaTemplate,
        schemaLayout,
    };
};

export default getJsonSchema;
