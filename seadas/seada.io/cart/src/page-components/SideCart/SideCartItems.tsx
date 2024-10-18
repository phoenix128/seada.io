import { twMerge } from 'tailwind-merge';
import styles from '@seada.io/cart/page-components/SideCart/SideCartItems.styles';
import SideCartLineItem from '@seada.io/cart/page-components/SideCart/SideCartLineItem';
import React from 'react';
import { ICartData } from '@seada.io/cart/interface/cart';

export interface ISideCartUiProps {
    className?: string;
    cart: ICartData;
    onRemove?: (lineId: string) => void;
}

const SideCartItems: React.FC<ISideCartUiProps> = ({ className, cart, onRemove }) => {
    return (
        <div className={twMerge(styles.CartItems, className)}>
            {cart?.lineItems.map((lineItem, idx) => {
                const handleRemove = () => {
                    onRemove(lineItem.lineId);
                };

                return <SideCartLineItem key={idx} cartLineItem={lineItem} onRemove={handleRemove} />;
            })}
        </div>
    );
};

export default SideCartItems;
