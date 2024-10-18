import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwGridColumns', {
    type: 'number',
    minimum: 1,
    maximum: 12,
});

export interface ITwGridColumnsSchemaType extends IResponsiveSchemaType<number, string> {
    type: '@seada.io/core-schema/TwGridColumns';
}
