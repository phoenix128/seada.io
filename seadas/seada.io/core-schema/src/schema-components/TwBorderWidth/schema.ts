import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveCardinalSchema from '@seada.io/core-schema/spi/schema/get-cardinal-schema';
import getTwBorderWidths from '@seada.io/core-schema/spi/tw/get-tw-border-widths';

export const ValidationSchema: IValidationSchemaType = getResponsiveCardinalSchema('TwBorderWidth', {
    type: 'string',
    enum: Object.keys(getTwBorderWidths()),
});

export interface ITwBorderWidthSchemaType extends ISchemaType<string | string[], string> {
    type: '@seada.io/core-schema/TwBorderWidth';
}
