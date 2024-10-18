import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';
import getTwAspectRatios from '@seada.io/core-schema/spi/tw/get-tw-aspect-ratios';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwAspectRatio', {
    type: 'string',
    enum: Object.keys(getTwAspectRatios()),
});

export interface ITwAspectRatioSchemaType extends IResponsiveSchemaType<string> {
    type: '@seada.io/core-schema/TwAspectRatio';
}
