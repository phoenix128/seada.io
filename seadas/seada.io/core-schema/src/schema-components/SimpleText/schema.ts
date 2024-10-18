import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    type: 'string',
};

export interface ISimpleTextSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/SimpleText';
}
