import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    type: 'number',
    minimum: 0,
    maximum: 100,
    multipleOf: 5,
};
