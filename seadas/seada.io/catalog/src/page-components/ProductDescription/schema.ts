import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgFormatText } from 'react-icons/cg';
import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type IProductDescriptionSchema = ITextSchema;

const Schema: IPageComponentSchema<IProductDescriptionSchema> = {
    title: 'schema.commerce.productDescription.componentTitle',
    description: 'schema.commerce.productDescription.componentDescription',
    icon: CgFormatText,
    group: 'schema.commerce.productDetails.groupTitle',
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent']),
    },
};

export default Schema;
