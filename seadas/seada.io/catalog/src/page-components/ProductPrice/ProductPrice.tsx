'use client';

import React from 'react';
import Text from '@seada.io/basic-ui/page-components/Text';
import usePriceFormat from '@seada.io/catalog/hooks/use-price-format';
import useCurrentVariant from '@seada.io/catalog/hooks/use-current-variant';
import { IProductPriceSchema } from '@seada.io/catalog/page-components/ProductPrice/schema';
import useProduct from '@seada.io/catalog/hooks/use-product';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const ProductPrice: React.FC<IPageComponentSchemaProps<IProductPriceSchema>> = (props) => {
    const product = useProduct();
    const variant = useCurrentVariant(product.id);
    const formattedPrice = usePriceFormat(variant?.price || product.price);

    return <Text {...props} text={formattedPrice} hasHtml={false} />;
};

export default ProductPrice;
