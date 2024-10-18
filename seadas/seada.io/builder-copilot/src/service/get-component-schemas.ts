import getPageComponentsSchemaCollection from '@seada.io/core-schema/spi/components/get-page-components-schema-collection';

/**
 * Get a list of components with their properties
 */
const getComponentSchemas = async (componentName: string) => {
    const pageComponents = getPageComponentsSchemaCollection();
    const componentSchema = pageComponents[componentName];

    return Object.keys(componentSchema.fields).reduce((acc, field) => {
        const groupFields = Object.keys(componentSchema.fields[field].fields).reduce((groupFieldsAcc, groupField) => {
            const f = componentSchema.fields[field].fields[groupField];

            return {
                ...groupFieldsAcc,
                [groupField]: {
                    defaultValue: f.defaultValue,
                    type: f.type,
                },
            };
        }, {});

        return {
            ...acc,
            ...groupFields,
        };
    }, {});
};

export default getComponentSchemas;
