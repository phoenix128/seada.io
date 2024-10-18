import { IProductData } from '@seada.io/catalog/interface/product';
import React from 'react';
import useProductCardActions from '@seada.io/catalog/hooks/use-product-card-actions';

export interface IProductCardActionsProps {
    product: IProductData;
}

const ProductCardActions: React.FC<IProductCardActionsProps> = ({ product }) => {
    const actions = useProductCardActions();

    return (
        <>
            {actions.map((Action, index) => (
                <Action key={index} product={product} />
            ))}
        </>
    );
};

export default ProductCardActions;
