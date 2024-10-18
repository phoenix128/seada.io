import { ISchemaField, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import copySchemaFieldsWithoutFields from '@seada.io/core-schema/spi/components/copy-schema-fields-without-fields';

describe('copySchemaFieldsWithoutFields', () => {
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
    };

    it('should copy schema fields excluding specified fields', () => {
        const excludeFields = ['field2', 'field3'];
        const result = copySchemaFieldsWithoutFields(fields, excludeFields);

        expect(result.group1.fields.field1).toEqual({ type: 'value1' });
        expect(result.group1.fields.field2).toBeUndefined();

        expect(result.group2.fields.field3).toBeUndefined();
        expect(result.group2.fields.field4).toEqual({ type: 'value4' });
    });

    it('should retain the original icon references', () => {
        const excludeFields = ['field2'];
        const result = copySchemaFieldsWithoutFields(fields, excludeFields);

        expect(result.group1.icon).toBe(fields.group1.icon);
        expect(result.group2.icon).toBe(fields.group2.icon);
    });

    it('should not modify the original fields object', () => {
        const excludeFields = ['field1', 'field4'];
        const originalFields = JSON.parse(JSON.stringify(fields));
        copySchemaFieldsWithoutFields(fields, excludeFields);

        expect(fields).toEqual(originalFields);
    });

    it('should return a new object', () => {
        const excludeFields = ['field1'];
        const result = copySchemaFieldsWithoutFields(fields, excludeFields);

        expect(result).not.toBe(fields);
        expect(result.group1.fields).not.toBe(fields.group1.fields);
    });

    it('should remove groups without fields', () => {
        const excludeFields = ['field1', 'field2'];
        const result = copySchemaFieldsWithoutFields(fields, excludeFields);

        expect(result.group1).toBeUndefined();
        expect(result.group2).toBeDefined();
    });
});
