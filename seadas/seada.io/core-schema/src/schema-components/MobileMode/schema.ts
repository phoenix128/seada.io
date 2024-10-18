import { IResponsiveSchemaType, IValidationSchemaType } from '@seada.io/core-schema/spi/components/interface';

export const ValidationSchema: IValidationSchemaType = {
    type: 'boolean',
};

export interface IMobileModeSchemaType extends IResponsiveSchemaType<boolean, boolean> {
    type: '@seada.io/core-schema/MobileMode';
}
