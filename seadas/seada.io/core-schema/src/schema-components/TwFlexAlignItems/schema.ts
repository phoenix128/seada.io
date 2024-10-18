import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwFlexAlignItems', {
    type: 'string',
    enum: ['start', 'end', 'center', 'baseline', 'stretch'],
});

export interface ITwFlexAlignItemsSchemaType extends IResponsiveSchemaType<string, string> {
    type: '@seada.io/core-schema/TwFlexAlignItems';
}
