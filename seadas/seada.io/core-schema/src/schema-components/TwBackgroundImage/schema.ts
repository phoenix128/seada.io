import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/ImagePicker/schema';

export interface ITwBackgroundImageSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/TwBackgroundImage';
}
