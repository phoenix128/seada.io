import React from 'react';
import { ICartLineItemData } from '@seada.io/cart/interface/cart';
import styles from '@seada.io/cart/page-components/SideCart/SideCartLineItem.styles';
import { useTranslation } from 'react-i18next';
import Price from '@seada.io/catalog/components/Price';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

export interface ISideCartLineItemProps {
    className?: string;
    cartLineItem: ICartLineItemData;

    onRemove?: () => void;
}

const SideCartLineItem: React.FC<ISideCartLineItemProps> = (props) => {
    const { cartLineItem, className, onRemove } = props;
    const { t } = useTranslation();

    return (
        <div className={twMerge(styles.SideCartLineItem, className)}>
            <div className={styles.ItemRemove}>
                <button onClick={onRemove}>&times;</button>
            </div>
            <Image
                className={styles.ItemThumbnail}
                src={cartLineItem.thumbnail}
                width={200}
                height={200}
                alt={cartLineItem.name}
            />
            <div className={styles.ItemInfo}>
                <div className={styles.ItemName}>{cartLineItem.name}</div>
                <div className={styles.ItemQuantity}>
                    {t('commerceUi.cart.quantityAmount', {
                        amount: cartLineItem.quantity,
                    })}
                </div>
                <div className={styles.ItemPrice}>
                    <Price price={cartLineItem.price} />
                </div>
            </div>
        </div>
    );
};

export default SideCartLineItem;
