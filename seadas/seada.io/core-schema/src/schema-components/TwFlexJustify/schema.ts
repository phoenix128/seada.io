import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwFlexJustify', {
    type: 'string',
    enum: ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
});

export interface ITwFlexJustifySchemaType extends IResponsiveSchemaType<string, string> {
    type: '@seada.io/core-schema/TwFlexJustify';
}
