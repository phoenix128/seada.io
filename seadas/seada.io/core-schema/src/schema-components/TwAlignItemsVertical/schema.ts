import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export type ITwAlignItemsVerticalValue = 'start' | 'center' | 'end';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwAlignItemsVertical', {
    type: 'string',
    enum: ['start', 'center', 'end'],
});

export interface ITwAlignItemsVerticalSchemaType extends IResponsiveSchemaType<ITwAlignItemsVerticalValue, string> {
    type: '@seada.io/core-schema/TwAlignItemsVertical';
}
