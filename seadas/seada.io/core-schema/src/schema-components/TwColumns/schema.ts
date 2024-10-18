import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwColumns', {
    type: 'number',
    minimum: 1,
    maximum: 12,
});

export interface ITwColumnsSchemaType extends IResponsiveSchemaType<number, string> {
    type: '@seada.io/core-schema/TwColumns';
}
