import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    type: 'string',
    format: 'uri',
};

export interface ILinkSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/Link';
}
