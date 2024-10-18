import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/TwBorderStyle',
    definitions: {
        TwBorderStyle: {
            type: 'string',
            enum: ['none', 'solid', 'dashed', 'dotted', 'double'],
        },
    },
};

export interface ITwBorderStyleSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/TwBorderStyle';
}
