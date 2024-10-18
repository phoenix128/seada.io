import { IPageComponentSchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';

/**
 * Copy schema fields without groups
 * @param sourceFields
 * @param excludeGroups
 */
const copySchemaFieldsWithoutGroups = (
    sourceFields: IPageComponentSchema['fields'],
    excludeGroups: string[]
): Record<string, ISchemaFieldsGroup> => {
    const copiedFields = JSON.parse(JSON.stringify(sourceFields)) as IPageComponentSchema['fields'];

    for (const [groupName, group] of Object.entries(copiedFields)) {
        group.icon = sourceFields[groupName].icon; // Link reference to the original icon

        if (!excludeGroups.includes(groupName)) continue;
        delete copiedFields[groupName];
    }

    return copiedFields;
};

export default copySchemaFieldsWithoutGroups;
