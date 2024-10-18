'use client';

import React, { useCallback, useState } from 'react';
import { IProductCardActionProps } from '@seada.io/catalog/interface/product';
import { useTranslation } from 'react-i18next';
import useAddToCart from '@seada.io/cart/hooks/use-add-to-cart';
import useGoToUrl from '@seada.io/core/hooks/use-go-to-url';
import styles from '@seada.io/cart/components/AddToCartButton/AddToCart.styles';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';

export interface IAddToCartProps extends IProductCardActionProps {
    className?: string;
}

const AddToCartButton: React.FC<IAddToCartProps> = (props) => {
    const {
        product: { key, url, hasVariants },
    } = props;
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addToCart, loading } = useAddToCart();

    const gotoUrl = useGoToUrl();
    const { t } = useTranslation();

    const handleAddToCart = useCallback(() => {
        if (hasVariants) {
            setIsAddingToCart(true);
            gotoUrl(url);
            return;
        }

        addToCart({
            productKey: key,
            quantity: 1,
        });
    }, [addToCart, gotoUrl, hasVariants, key, url]);

    return (
        <SeadaButton
            isLoading={isAddingToCart || loading}
            className={styles.AddToCartButton}
            onClick={handleAddToCart}
            color={'primary'}
        >
            {t('commerceUi.cart.addToCart')}
        </SeadaButton>
    );
};

export default AddToCartButton;
