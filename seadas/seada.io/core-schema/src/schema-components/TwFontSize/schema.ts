import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';
import getTwFontSizes from '@seada.io/core-schema/spi/tw/get-tw-font-sizes';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwFontSize', {
    type: 'string',
    enum: Object.keys(getTwFontSizes()),
});

export interface ITwFontSizeSchemaType extends IResponsiveSchemaType<string, string> {
    type: '@seada.io/core-schema/TwFontSize';
}
