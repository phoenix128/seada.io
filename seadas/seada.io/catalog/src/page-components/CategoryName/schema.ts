import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgFormatText } from 'react-icons/cg';
import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type ICategoryNameSchema = ITextSchema;

const Schema: IPageComponentSchema<ICategoryNameSchema> = {
    title: 'schema.commerce.categoryName.componentTitle',
    description: 'schema.commerce.categoryName.componentDescription',
    group: 'schema.commerce.productsList.groupTitle',
    icon: CgFormatText,
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent', 'hasHtml']),
    },
};

export default Schema;
