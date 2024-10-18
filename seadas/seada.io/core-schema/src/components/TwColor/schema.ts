import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getTwColorsCombination from '@seada.io/core-schema/spi/tw/get-tw-colors-combination';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/TwColor',
    definitions: {
        TwColor: {
            type: 'string',
            enum: getTwColorsCombination(),
        },
    },
};
