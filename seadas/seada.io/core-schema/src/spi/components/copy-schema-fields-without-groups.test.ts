import { ISchemaField, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

describe('copySchemaFieldsWithoutGroups', () => {
    const fields: Record<string, ISchemaFieldsGroup> = {
        group1: {
            title: 'Group 1',
            fields: {
                field1: { type: 'value1' } as ISchemaField,
                field2: { type: 'value2' } as ISchemaField,
            },
        },
        group2: {
            title: 'Group 2',
            fields: {
                field3: { type: 'value3' } as ISchemaField,
                field4: { type: 'value4' } as ISchemaField,
            },
        },
        group3: {
            title: 'Group 3',
            fields: {
                field5: { type: 'value5' } as ISchemaField,
                field6: { type: 'value6' } as ISchemaField,
            },
        },
    };

    it('should copy schema fields excluding specified groups', () => {
        const excludeGroups = ['group1', 'group3'];
        const result = copySchemaFieldsWithoutGroups(fields, excludeGroups);

        expect(result.group1).toBeUndefined();
        expect(result.group3).toBeUndefined();

        expect(result.group2).toEqual(fields.group2);
    });

    it('should retain the original group references for non-excluded groups', () => {
        const excludeGroups = ['group3'];
        const result = copySchemaFieldsWithoutGroups(fields, excludeGroups);

        expect(result.group1).toEqual(fields.group1);
        expect(result.group2).toEqual(fields.group2);
        expect(result.group3).toBeUndefined();
    });

    it('should not modify the original fields object', () => {
        const excludeGroups = ['group2'];
        const originalFields = JSON.parse(JSON.stringify(fields));
        copySchemaFieldsWithoutGroups(fields, excludeGroups);

        expect(fields).toEqual(originalFields);
    });

    it('should return a new object', () => {
        const excludeGroups = ['group1'];
        const result = copySchemaFieldsWithoutGroups(fields, excludeGroups);

        expect(result).not.toBe(fields);
        expect(result.group2).not.toBe(fields.group2);
        expect(result.group3).not.toBe(fields.group3);
    });
});
