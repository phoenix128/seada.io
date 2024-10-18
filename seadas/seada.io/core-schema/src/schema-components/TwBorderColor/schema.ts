import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/TwColor/schema';

export interface ITwBorderColorSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/TwBorderColor';
}
