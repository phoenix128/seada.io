import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgDollar } from 'react-icons/cg';
import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type IProductPriceSchema = ITextSchema;

const Schema: IPageComponentSchema<IProductPriceSchema> = {
    title: 'schema.commerce.productPrice.componentTitle',
    description: 'schema.commerce.productPrice.componentDescription',
    group: 'schema.commerce.productDetails.groupTitle',
    icon: CgDollar,
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent']),
    },
};

export default Schema;
