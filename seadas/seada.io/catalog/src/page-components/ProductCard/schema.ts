import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgBox, CgSearch } from 'react-icons/cg';
import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { IProductsPickerSchemaType } from '@seada.io/catalog/schema-components/ProductsPicker/schema';

export type IProductCardProductSchema = ISchema<{
    productKey?: IProductsPickerSchemaType;
}>;

export type IProductCardSchema = IBoxSchema & IProductCardProductSchema;

export const SchemaGroupProductCardProduct: ISchemaFieldsGroup<IProductCardProductSchema> = {
    title: 'schema.commerce.productCard.product.groupTitle',
    icon: CgSearch,
    sort: 20,
    fields: {
        productKey: {
            label: 'schema.commerce.productsCarousel.productKeys',
            type: '@seada.io/catalog/ProductsPicker',
            options: {
                maxItems: 1,
            },
        },
    },
};

const Schema: IPageComponentSchema<IProductCardSchema> = {
    title: 'schema.commerce.productCard.componentTitle',
    description: 'schema.commerce.productCard.componentDescription',
    group: 'schema.commerce.productDetails.groupTitle',
    icon: CgBox,
    maxChildren: 0,
    fields: {
        product: SchemaGroupProductCardProduct,
        ...BoxSchema.fields,
    },
};

export default Schema;
