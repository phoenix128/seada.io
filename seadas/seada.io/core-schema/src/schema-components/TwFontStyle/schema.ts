import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwFontStyle', {
    type: 'string',
    enum: ['italic', 'not-italic'],
});

export interface ITwFontStyleSchemaType extends IResponsiveSchemaType<string> {
    type: '@seada.io/core-schema/TwFontStyle';
}
