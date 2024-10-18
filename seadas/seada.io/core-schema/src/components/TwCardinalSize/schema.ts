import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveCardinalSchema from '@seada.io/core-schema/spi/schema/get-cardinal-schema';
import { ValidationSchema as TwNumericSizeTypeSchema } from '@seada.io/core-schema/components/TwNumericSize/schema';

export const ValidationSchema: IValidationSchemaType = getResponsiveCardinalSchema('TwMargin', TwNumericSizeTypeSchema);
