import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgFormatText } from 'react-icons/cg';
import ImageSchema, { IImageSchema } from '@seada.io/basic-ui/page-components/Image/schema';
import copySchemaFieldsWithoutFields from '@seada.io/core-schema/spi/components/copy-schema-fields-without-fields';

export type IPageImageSchema = IImageSchema;

const Schema: IPageComponentSchema<IPageImageSchema> = {
    title: 'schema.content.pageImage.componentTitle',
    description: 'schema.content.pageImage.componentDescription',
    group: 'schema.content.page.groupTitle',
    icon: CgFormatText,
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutFields(ImageSchema.fields, ['imageUrl', 'title']),
    },
};

export default Schema;
