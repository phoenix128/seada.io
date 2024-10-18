import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveCardinalSchema from '@seada.io/core-schema/spi/schema/get-cardinal-schema';
import getTwBorderRadii from '@seada.io/core-schema/spi/tw/get-tw-border-radii';

export const ValidationSchema: IValidationSchemaType = getResponsiveCardinalSchema('TwBorderRadius', {
    type: 'string',
    enum: Object.keys(getTwBorderRadii()),
});

export interface ITwBorderRadiusSchemaType extends ISchemaType<string | string[], string> {
    type: '@seada.io/core-schema/TwBorderRadius';
}
