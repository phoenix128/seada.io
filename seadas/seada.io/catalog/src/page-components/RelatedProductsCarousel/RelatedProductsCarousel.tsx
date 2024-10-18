import React from 'react';
import ProductCard from '@seada.io/catalog/page-components/ProductCard';
import Slider from '@seada.io/basic-ui/page-components/Slider';
import { IRelatedProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/related-products-list';
import { IRelatedProductsCarouselSchema } from '@seada.io/catalog/page-components/RelatedProductsCarousel/schema';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';

const RelatedProductsCarousel: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IRelatedProductsCarouselSchema, IRelatedProductsListDataProviderResult>
> = (props) => {
    const products = props.providersData?.products;

    return (
        <Slider {...props}>
            {products?.map((product, idx) => (
                <ProductCard key={idx} componentId={product.id} domRef={null} providersData={{ product }} />
            ))}
        </Slider>
    );
};

export default RelatedProductsCarousel;
