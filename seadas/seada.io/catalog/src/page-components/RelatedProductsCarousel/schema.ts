import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgCarousel } from 'react-icons/cg';
import SliderSchema, { ISliderSchema } from '@seada.io/basic-ui/page-components/Slider/schema';

export type IRelatedProductsCarouselSchema = ISliderSchema;

const Schema: IPageComponentSchema<IRelatedProductsCarouselSchema> = {
    title: 'schema.commerce.relatedProductsCarousel.componentTitle',
    description: 'schema.commerce.relatedProductsCarousel.componentDescription',
    group: 'schema.commerce.productsList.groupTitle',
    icon: CgCarousel,
    maxChildren: 0,
    fields: {
        ...SliderSchema.fields,
    },
};

export default Schema;
