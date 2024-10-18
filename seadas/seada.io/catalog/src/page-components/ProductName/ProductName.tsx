import React from 'react';
import Text from '@seada.io/basic-ui/page-components/Text';
import { IProductNameSchema } from '@seada.io/catalog/page-components/ProductName/schema';
import { ITextSchema } from '@seada.io/basic-ui/page-components/Text/schema';
import useProduct from '@seada.io/catalog/hooks/use-product';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const ProductName: React.FC<IPageComponentSchemaProps<IProductNameSchema>> = (props) => {
    const product = useProduct();

    const textProps: IPageComponentSchemaProps<ITextSchema> = {
        ...props,
        hasHtml: false,
        text: product?.name,
    };

    return <Text {...textProps} />;
};

export default ProductName;
