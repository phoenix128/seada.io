import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getResponsiveSchema from '@seada.io/core-schema/spi/schema/get-responsive-schema';

/**
 * Map schema to responsive schema
 * @param name
 * @param schema
 */
const getResponsiveCardinalSchema = (name: string, schema: IValidationSchemaType): IValidationSchemaType => {
    return getResponsiveSchema(name, {
        oneOf: [
            schema,
            {
                type: 'array',
                minItems: 1,
                maxItems: 4,
                items: schema,
            },
        ],
    });
};

export default getResponsiveCardinalSchema;
