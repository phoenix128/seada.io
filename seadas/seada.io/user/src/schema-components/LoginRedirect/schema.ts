import { ISchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export type ILoginRedirectValues = 'none' | 'home' | 'account';

export const ValidationSchema: IValidationSchemaType = {
    $ref: '#/definitions/LoginRedirect',
    definitions: {
        LoginRedirect: {
            type: 'string',
            enum: ['none', 'home', 'account'],
        },
    },
};

export interface ILoginRedirectSchemaType extends ISchemaType<ILoginRedirectValues> {
    type: '@seada.io/user/LoginRedirect';
}
