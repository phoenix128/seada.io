import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwFlexDirection', {
    type: 'string',
    enum: ['row', 'col', 'row-reverse', 'col-reverse'],
});

export interface ITwFlexDirectionSchemaType extends IResponsiveSchemaType<string, string> {
    type: '@seada.io/core-schema/TwFlexDirection';
}
