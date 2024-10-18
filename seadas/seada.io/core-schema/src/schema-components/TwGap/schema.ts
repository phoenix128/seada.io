import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/TwNumericSize/schema';

export interface ITwGapSchemaType extends ISchemaType<number, string> {
    type: '@seada.io/core-schema/TwGap';
}
