import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/TwCardinalSize/schema';

export interface ITwPaddingSchemaType extends ISchemaType<number, string> {
    type: '@seada.io/core-schema/TwPadding';
}
