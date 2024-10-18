import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export type ITwTextAlignValues = 'left' | 'center' | 'right';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwTextAlign', {
    type: 'string',
    enum: ['left', 'center', 'right'],
});

export interface ITwTextAlignSchemaType extends IResponsiveSchemaType<ITwTextAlignValues, string> {
    type: '@seada.io/core-schema/TwTextAlign';
}
