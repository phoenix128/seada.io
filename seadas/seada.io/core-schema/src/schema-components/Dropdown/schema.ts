import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/Dropdown',
    definitions: {
        Dropdown: {
            type: 'string',
        },
    },
};

export interface IDropdownSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/Dropdown';
}
