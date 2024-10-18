'use client';

import React from 'react';
import Text from '@seada.io/basic-ui/page-components/Text';
import usePriceFormat from '@seada.io/catalog/hooks/use-price-format';
import useCurrentVariant from '@seada.io/catalog/hooks/use-current-variant';
import { IProductReferencePriceSchema } from '@seada.io/catalog/page-components/ProductReferencePrice/schema';
import useProduct from '@seada.io/catalog/hooks/use-product';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const ProductReferencePrice: React.FC<IPageComponentSchemaProps<IProductReferencePriceSchema>> = (props) => {
    const product = useProduct();
    const variant = useCurrentVariant(product.id);
    const price = variant?.referencePrice ?? product.referencePrice;
    const formattedPrice = usePriceFormat(price);

    if (!price) return null;

    return <Text {...props} text={formattedPrice} hasHtml={false} />;
};

export default ProductReferencePrice;
