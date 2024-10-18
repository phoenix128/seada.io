import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgOptions } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';

export type IProductOptionsSchema = IBoxSchema;

const Schema: IPageComponentSchema<IProductOptionsSchema> = {
    title: 'schema.commerce.productOptions.componentTitle',
    description: 'schema.commerce.productOptions.componentDescription',
    group: 'schema.commerce.productDetails.groupTitle',
    icon: CgOptions,
    maxChildren: 0,
    fields: {
        ...BoxSchema.fields,
    },
};

export default Schema;
