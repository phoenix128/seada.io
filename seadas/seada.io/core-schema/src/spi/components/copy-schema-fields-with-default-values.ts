import {
    IPageComponentSchema,
    ISchema,
    ISchemaFieldsGroup,
    ISchemaTypeInput,
} from '@seada.io/core-schema/spi/components/interface';

/**
 * Copy schema fields with default values
 * @param sourceFields
 * @param defaultValues
 */
const copySchemaFieldsWithDefaultValues = <TSchema extends ISchema = ISchema>(
    sourceFields: IPageComponentSchema['fields'],
    defaultValues: Partial<{ [K in keyof TSchema]: ISchemaTypeInput<TSchema[K]> }>
): Record<string, ISchemaFieldsGroup> => {
    const copiedFields = JSON.parse(JSON.stringify(sourceFields)) as IPageComponentSchema['fields'];

    for (const [groupName, group] of Object.entries(copiedFields)) {
        group.icon = sourceFields[groupName].icon; // Link reference to the original icon
        for (const [fieldName, fieldValue] of Object.entries(group.fields)) {
            if (!defaultValues.hasOwnProperty(fieldName)) continue;
            fieldValue.defaultValue = defaultValues[fieldName];
        }
    }

    return copiedFields;
};

export default copySchemaFieldsWithDefaultValues;
