import { IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';
import getRelativeSizeMarks from '@seada.io/core-schema/service/tw/size/get-relative-size-marks';
import getTwRelativeSizeFromIdx from '@seada.io/core-schema/service/tw/size/get-tw-relative-size-from-idx';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/TwRelativeSize',
    definitions: {
        TwRelativeSize: {
            type: 'string',
            enum: getRelativeSizeMarks().map((mark, idx) => getTwRelativeSizeFromIdx(idx)),
        },
    },
};
