import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export type ITwTextDecorationValues = 'no-underline' | 'underline' | 'line-through' | 'overline';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwTextDecoration', {
    type: 'string',
    enum: ['no-underline', 'underline', 'line-through', 'overline'],
});

export interface ITwTextDecorationSchemaType extends IResponsiveSchemaType<ITwTextDecorationValues, string> {
    type: '@seada.io/core-schema/TwTextDecoration';
}
