import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    type: 'string',
    format: 'uri',
};

export interface IUrlSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/Url';
}
