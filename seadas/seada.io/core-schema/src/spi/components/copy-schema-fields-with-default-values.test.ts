import copySchemaFieldsWithDefaultValues from '@seada.io/core-schema/spi/components/copy-schema-fields-with-default-values';
import { ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';

describe('copySchemaFieldsWithDefaultValues', () => {
    it('should correctly copy default values into schema fields', () => {
        const fields: Record<string, ISchemaFieldsGroup> = {
            group1: {
                title: 'Group 1',
                fields: {
                    field1: {
                        label: 'Field 1',
                        type: 'some-type',
                        options: {},
                        advanced: false,
                    },
                    field2: {
                        label: 'Field 2',
                        type: 'some-type',
                        options: {},
                        advanced: true,
                    },
                },
            },
        };

        const defaultValues: Record<string, any> = {
            field1: 'Default Value 1',
            field2: 'Default Value 2',
        };

        const expectedResult: Record<string, ISchemaFieldsGroup> = {
            group1: {
                title: 'Group 1',
                fields: {
                    field1: {
                        label: 'Field 1',
                        type: 'some-type',
                        options: {},
                        advanced: false,
                        defaultValue: 'Default Value 1',
                    },
                    field2: {
                        label: 'Field 2',
                        type: 'some-type',
                        options: {},
                        advanced: true,
                        defaultValue: 'Default Value 2',
                    },
                },
            },
        };

        const result = copySchemaFieldsWithDefaultValues(fields, defaultValues);
        expect(result).toEqual(expectedResult);
    });
});
