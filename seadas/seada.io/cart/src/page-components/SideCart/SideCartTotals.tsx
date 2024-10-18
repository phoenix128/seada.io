import { twMerge } from 'tailwind-merge';
import styles from '@seada.io/cart/page-components/SideCart/SideCartTotals.styles';
import React from 'react';
import { ICartData } from '@seada.io/cart/interface/cart';
import { useTranslation } from 'react-i18next';
import Price from '@seada.io/catalog/components/Price';

export interface ISideCartTotalsProps {
    className?: string;
    cart: ICartData;
}

const SideCartTotals: React.FC<ISideCartTotalsProps> = ({ className, cart }) => {
    const { t } = useTranslation();

    if (!cart || !cart.totals) return null;

    return (
        <dl className={twMerge(styles.Totals, className)}>
            {cart.totals.subtotal && (
                <>
                    <dt className={styles.TotalLabel}>{t('commerceUi.cart.subtotal')}</dt>
                    <dd className={styles.TotalAmount}>
                        <Price price={cart.totals.subtotal} />
                    </dd>
                </>
            )}
            <dt className={twMerge(styles.TotalLabel, styles.GrandTotal)}>{t('commerceUi.cart.grandTotal')}</dt>
            <dd className={twMerge(styles.TotalAmount, styles.GrandTotal)}>
                <Price price={cart.totals.grandTotal} />
            </dd>
        </dl>
    );
};

export default SideCartTotals;
