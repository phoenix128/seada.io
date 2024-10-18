import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/TwOpacity/schema';

export interface ITwBackgroundOpacitySchemaType extends ISchemaType<number, string> {
    type: '@seada.io/core-schema/TwBackgroundOpacity';
}
