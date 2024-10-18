import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export type ITwVisibilityValues = 'visible' | 'invisible' | 'hidden';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwVisibility', {
    type: 'string',
    enum: ['visible', 'invisible', 'hidden'],
});

export interface ITwVisibilitySchemaType extends IResponsiveSchemaType<ITwVisibilityValues, string> {
    type: '@seada.io/core-schema/TwVisibility';
}
