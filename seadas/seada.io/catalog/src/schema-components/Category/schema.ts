import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/Category',
    definitions: {
        Category: {
            type: 'string',
        },
    },
};

export interface ICatalogCategorySchemaType extends ISchemaType<string> {
    type: '@seada.io/catalog/Category';
}
