import React from 'react';
import ProductCard from '@seada.io/catalog/page-components/ProductCard';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import Slider from '@seada.io/basic-ui/page-components/Slider';
import { IProductsCarouselSchema } from '@seada.io/catalog/page-components/ProductsCarousel/schema';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';

const ProductsCarousel: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IProductsCarouselSchema, IProductsListDataProviderResult>
> = (props) => {
    const { componentId } = props;
    const products = props.providersData?.productsList?.products;

    return (
        <Slider {...props}>
            {products?.map((product, idx) => {
                const virtualId = `${componentId}:${product.key}.${idx}`;
                return <ProductCard key={idx} componentId={virtualId} domRef={null} providersData={{ product }} />;
            })}
        </Slider>
    );
};

export default ProductsCarousel;
