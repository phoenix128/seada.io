import { ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export { ValidationSchema } from '@seada.io/core-schema/components/ImagePicker/schema';

export interface IImageSchemaType extends ISchemaType<string, string> {
    type: '@seada.io/core-schema/Image';
}
