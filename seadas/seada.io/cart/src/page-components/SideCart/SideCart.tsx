'use client';

import React from 'react';
import sideCartStyles from '@seada.io/cart/page-components/SideCart/SideCart.styles';
import { ISideCartSchema } from '@seada.io/cart/page-components/SideCart/schema';
import { twMerge } from 'tailwind-merge';
import SideCartItems from '@seada.io/cart/page-components/SideCart/SideCartItems';
import SideCartTotals from '@seada.io/cart/page-components/SideCart/SideCartTotals';
import CheckoutButton from '@seada.io/cart/page-components/SideCart/CheckoutButton';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';
import useSideCartModel from '@seada.io/cart/page-components/SideCart/SideCart.model';
import LoadingOverlay from '@seada.io/cart/page-components/SideCart/LoadingOverlay';

const SideCart: React.FC<IPageComponentSchemaProps<ISideCartSchema>> = (props) => {
    const { className } = props;
    const {
        data: { open, cart, loading },
        handlers: { handleMouseLeave, handleMouseOver, handleRemove },
    } = useSideCartModel(props);

    const styles = sideCartStyles({ isOpen: open, isLoading: loading });

    return (
        <div
            className={twMerge(styles.base(), className)}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.wrapper()}>
                <SideCartItems className={styles.cartItems()} cart={cart} onRemove={handleRemove} />
                <LoadingOverlay className={styles.loadingOverlay()} />
                <CheckoutButton className={styles.checkoutButton()} />
                <SideCartTotals className={styles.totals()} cart={cart} />
            </div>
        </div>
    );
};

export default SideCart;
