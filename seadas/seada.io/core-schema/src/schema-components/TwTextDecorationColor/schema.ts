import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/TwColor/schema';

export interface ITwTextDecorationColorSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/TwTextDecorationColor';
}
