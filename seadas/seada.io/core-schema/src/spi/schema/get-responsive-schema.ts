import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getTwBreakpoints from '@seada.io/core/spi/tw/get-tw-breakpoints';

/**
 * Map schema to responsive schema
 * @param name
 * @param schema
 */
const getResponsiveSchema = (name: string, schema: IValidationSchemaType): IValidationSchemaType => {
    const breakpoints = getTwBreakpoints();

    return {
        $ref: `#/definitions/${name}`,
        definitions: {
            [name]: {
                oneOf: [
                    schema,
                    {
                        type: 'object',
                        properties: breakpoints.reduce((acc, breakpoint) => {
                            acc[breakpoint] = schema;
                            return acc;
                        }, {}),
                        required: ['default'],
                    },
                ],
            },
        },
    };
};

export default getResponsiveSchema;
