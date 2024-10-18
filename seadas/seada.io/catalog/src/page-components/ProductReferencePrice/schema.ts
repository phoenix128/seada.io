import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgDollar } from 'react-icons/cg';
import TextSchema, { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import copySchemaFieldsWithoutGroups from '@seada.io/core-schema/spi/components/copy-schema-fields-without-groups';

export type IProductReferencePriceSchema = ITextSchema;

const Schema: IPageComponentSchema<IProductReferencePriceSchema> = {
    title: 'schema.commerce.productReferencePrice.componentTitle',
    description: 'schema.commerce.productReferencePrice.componentDescription',
    group: 'schema.commerce.productDetails.groupTitle',
    icon: CgDollar,
    maxChildren: 0,
    fields: {
        ...copySchemaFieldsWithoutGroups(TextSchema.fields, ['textContent']),
    },
};

export default Schema;
