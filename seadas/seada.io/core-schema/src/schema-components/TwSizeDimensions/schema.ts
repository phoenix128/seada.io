import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import { ValidationSchema as TwSizeTypeSchema } from '@seada.io/core-schema/components/TwSize/schema';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/TwSizeDimensions',
    definitions: {
        TwSizeDimensions: {
            oneOf: [
                TwSizeTypeSchema,
                {
                    type: 'array',
                    minItems: 1,
                    maxItems: 2,
                    items: {
                        ...TwSizeTypeSchema,
                    },
                },
            ],
        },
    },
};

export interface ITwSizeDimensionsSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/TwSizeDimensions';
}
