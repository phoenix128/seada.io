import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';
import getTwFontWeights from '@seada.io/core-schema/spi/tw/get-tw-font-weights';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwFontWeight', {
    type: 'string',
    enum: Object.keys(getTwFontWeights()),
});

export interface ITwFontWeightSchemaType extends IResponsiveSchemaType<string, string> {
    type: '@seada.io/core-schema/TwFontWeight';
}
