import { IPageComponentSchema } from '@seada.io/core-schema/spi/components/interface';
import { CgCarousel } from 'react-icons/cg';
import SliderSchema, { ISliderSchema } from '@seada.io/basic-ui/page-components/Slider/schema';

export type IProductGallerySchema = ISliderSchema;

const Schema: IPageComponentSchema<IProductGallerySchema> = {
    title: 'schema.commerce.productGallery.componentTitle',
    description: 'schema.commerce.productGallery.componentDescription',
    group: 'schema.commerce.productDetails.groupTitle',
    maxChildren: 0,
    icon: CgCarousel,
    fields: {
        ...SliderSchema.fields,
    },
};

export default Schema;
