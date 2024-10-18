import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import { ValidationSchema as TwNumericSizeSchema } from '@seada.io/core-schema/components/TwNumericSize/schema';
import { ValidationSchema as TwRelativeSizeSchema } from '@seada.io/core-schema/components/TwRelativeSize/schema';

export const ValidationSchema: IValidationSchemaType = {
    anyOf: [TwNumericSizeSchema, TwRelativeSizeSchema],
};
