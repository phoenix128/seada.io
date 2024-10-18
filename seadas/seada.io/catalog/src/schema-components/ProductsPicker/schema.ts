import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/ProductsPicker',
    definitions: {
        ProductsPicker: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
    },
};

export interface IProductsPickerSchemaType extends ISchemaType<string[]> {
    type: '@seada.io/catalog/ProductsPicker';
}
