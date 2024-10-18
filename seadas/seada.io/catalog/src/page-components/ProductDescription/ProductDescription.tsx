import React from 'react';
import Text from '@seada.io/basic-ui/page-components/Text';
import { IProductDescriptionSchema } from '@seada.io/catalog/page-components/ProductDescription/schema';
import { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import useProduct from '@seada.io/catalog/hooks/use-product';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const ProductDescription: React.FC<IPageComponentSchemaProps<IProductDescriptionSchema>> = (props) => {
    const product = useProduct();
    const textProps: IPageComponentSchemaProps<ITextSchema> = {
        ...props,
        hasHtml: true,
        text: product.description,
    };

    return <Text {...textProps} />;
};

export default ProductDescription;
