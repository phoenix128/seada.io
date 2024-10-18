import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/schema-components/TwSizeDimensions/schema';

export interface ITwFlexBasisSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/TwFlexBasis';
}
