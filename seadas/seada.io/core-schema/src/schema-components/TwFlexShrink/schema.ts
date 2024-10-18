import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwFlexGrow', {
    type: 'boolean',
});

export interface ITwFlexShrinkSchemaType extends IResponsiveSchemaType<boolean, string> {
    type: '@seada.io/core-schema/TwFlexShrink';
}
