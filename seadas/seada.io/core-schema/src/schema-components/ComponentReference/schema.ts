import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/ComponentReference',
    definitions: {
        ComponentReference: {
            type: 'string',
        },
    },
};

export interface IComponentReferenceSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/ComponentReference';
}
