import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/TwCardinalSize/schema';

export interface ITwMarginSchemaType extends ISchemaType<number, string> {
    type: '@seada.io/core-schema/TwMargin';
}
