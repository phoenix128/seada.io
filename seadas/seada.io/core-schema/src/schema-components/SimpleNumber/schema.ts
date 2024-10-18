import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    type: 'number',
};

export interface ISimpleNumberSchemaType extends ISchemaType<number, number> {
    type: '@seada.io/core-schema/SimpleNumber';
}
