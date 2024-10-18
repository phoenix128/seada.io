import { ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';

/**
 * Copy schema fields without fields
 * @param fields
 * @param excludeFields
 */
const copySchemaFieldsWithoutFields = (
    fields: Record<string, ISchemaFieldsGroup>,
    excludeFields: string[]
): Record<string, ISchemaFieldsGroup> => {
    const copiedFields = JSON.parse(JSON.stringify(fields)) as Record<string, ISchemaFieldsGroup>;

    for (const [groupName, group] of Object.entries(copiedFields)) {
        group.icon = fields[groupName].icon; // Link reference to the original icon

        for (const [fieldName, fieldValue] of Object.entries(group.fields)) {
            if (!excludeFields.includes(fieldName)) continue;
            delete group.fields[fieldName];
        }

        if (!Object.keys(group.fields).length) {
            delete copiedFields[groupName];
        }
    }

    return copiedFields;
};

export default copySchemaFieldsWithoutFields;
