import React from 'react';
import ProductCard from '@seada.io/catalog/page-components/ProductCard';
import GridLayout from '@seada.io/basic-ui/page-components/GridLayout';
import { IProductsListDataProviderResult } from '@seada.io/catalog/ports/catalog/data-providers/products-list';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';
import { IProductsGridSchema } from '@seada.io/catalog/page-components/ProductsGrid/schema';

const ProductsGrid: React.FC<
    IPageComponentSchemaPropsWithDataProvider<IProductsGridSchema, IProductsListDataProviderResult>
> = (props) => {
    const products = props.providersData?.productsList?.products;

    return (
        <GridLayout {...props}>
            {products?.map((product, idx) => (
                <ProductCard key={idx} componentId={product.id} domRef={null} providersData={{ product }} />
            ))}
        </GridLayout>
    );
};

export default ProductsGrid;
