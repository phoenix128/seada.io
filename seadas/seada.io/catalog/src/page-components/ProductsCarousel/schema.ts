import { IPageComponentSchema, ISchema, ISchemaFieldsGroup } from '@seada.io/core-schema/spi/components/interface';
import { CgCarousel, CgSearch } from 'react-icons/cg';
import SliderSchema, { ISliderSchema } from '@seada.io/basic-ui/page-components/Slider/schema';
import copySchemaFieldsWithDefaultValues from '@seada.io/core-schema/spi/components/copy-schema-fields-with-default-values';
import { IProductsPickerSchemaType } from '@seada.io/catalog/schema-components/ProductsPicker/schema';

export type IProductsCarouselProductSchema = ISchema<{
    productKeys: IProductsPickerSchemaType;
}>;

export type IProductsCarouselSchema = ISliderSchema & IProductsCarouselProductSchema;

export const SchemaGroupProductsCarouselProducts: ISchemaFieldsGroup<IProductsCarouselProductSchema> = {
    title: 'schema.commerce.productsCarousel.products.groupTitle',
    icon: CgSearch,
    sort: 20,
    fields: {
        productKeys: {
            label: 'schema.commerce.productsCarousel.productKeys',
            type: '@seada.io/catalog/ProductsPicker',
            options: {
                maxItems: Infinity,
            },
        },
    },
};

const Schema: IPageComponentSchema<IProductsCarouselSchema> = {
    title: 'schema.commerce.productsCarousel.componentTitle',
    description: 'schema.commerce.productsCarousel.componentDescription',
    group: 'schema.commerce.productsList.groupTitle',
    icon: CgCarousel,
    maxChildren: 0,
    fields: {
        products: SchemaGroupProductsCarouselProducts,
        ...copySchemaFieldsWithDefaultValues(SliderSchema.fields, {
            slidesPerView: 5,
        }),
    },
};

export default Schema;
