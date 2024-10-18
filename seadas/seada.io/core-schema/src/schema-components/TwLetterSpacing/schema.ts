import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';
import getTwLetterSpacings from '@seada.io/core-schema/spi/tw/get-tw-letter-spacings';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwLetterSpacing', {
    type: 'string',
    enum: Object.keys(getTwLetterSpacings()),
});

export interface ITwLetterSpacingSchemaType extends IResponsiveSchemaType<string, string> {
    type: '@seada.io/core-schema/TwLetterSpacing';
}
