import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgFormatText } from 'react-icons/cg';
import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type IProductNameSchema = ITextSchema;

const Schema: IPageComponentSchema<IProductNameSchema> = {
    title: 'schema.commerce.productName.componentTitle',
    description: 'schema.commerce.productName.componentDescription',
    group: 'schema.commerce.productDetails.groupTitle',
    icon: CgFormatText,
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent', 'hasHtml']),
    },
};

export default Schema;
