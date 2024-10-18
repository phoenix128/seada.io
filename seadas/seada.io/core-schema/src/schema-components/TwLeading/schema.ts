import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';
import getTwLeadings from '@seada.io/core-schema/spi/tw/get-tw-leadings';

export const ValidationSchema: IValidationSchemaType = getResponsiveSchema('TwLeading', {
    type: 'string',
    enum: Object.keys(getTwLeadings()),
});

export interface ITwLeadingSchemaType extends IResponsiveSchemaType<string, string> {
    type: '@seada.io/core-schema/TwLeading';
}
