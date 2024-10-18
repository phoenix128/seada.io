import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';
import getTwNumericSpacings from '@seada.io/core-schema/spi/tw/get-tw-numeric-spacings';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwNumericSize', {
    anyOf: [{ const: 'auto' }, { type: 'string', enum: Object.keys(getTwNumericSpacings()) }],
});
