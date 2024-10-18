import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export type IOnCartClickValues = 'sidecart' | 'cart';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/OnCartClick',
    definitions: {
        OnCartClick: {
            type: 'string',
            enum: ['sidecart', 'cart'],
        },
    },
};

export interface IOnCartClickSchemaType extends ISchemaType<IOnCartClickValues> {
    type: '@seada.io/cart/OnCartClick';
}
