import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgShoppingCart } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';

export type IAddToCartSchema = IBoxSchema;

const Schema: IPageComponentSchema<IAddToCartSchema> = {
    title: 'schema.commerceUi.addToCart.componentTitle',
    description: 'schema.commerceUi.addToCart.componentDescription',
    group: 'schema.commerceUi.productDetails.groupTitle',
    icon: CgShoppingCart,
    maxChildren: 0,
    fields: {
        ...BoxSchema.fields,
    },
};

export default Schema;
