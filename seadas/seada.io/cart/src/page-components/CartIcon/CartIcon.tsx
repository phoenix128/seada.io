import React from 'react';
import { ICartIconSchema } from '@seada.io/cart/page-components/CartIcon/schema';
import Box from '@seada.io/basic-ui/page-components/Box';
import styles from '@seada.io/cart/page-components/CartIcon/CartIcon.styles';
import { twMerge } from 'tailwind-merge';
import { CgShoppingCart } from 'react-icons/cg';
import useCartIconModelView from '@seada.io/cart/page-components/CartIcon/CartIcon.model';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';
import SeadaChip from '@seada.io/foundation-ui/components/SeadaChip';

const CartIcon: React.FC<IPageComponentSchemaPropsWithDataProvider<ICartIconSchema>> = (props) => {
    const { className, ...otherProps } = props;
    const {
        data: { displayCount, itemsCount },
        handlers: { handleClick },
    } = useCartIconModelView(props);

    return (
        <Box {...otherProps} className={twMerge(className, styles.IconWrapper)} onClick={handleClick}>
            <CgShoppingCart className={styles.Icon} />
            {displayCount && (
                <SeadaChip className={styles.Chip} size={'sm'} radius={'full'} color="primary">
                    {itemsCount}
                </SeadaChip>
            )}
        </Box>
    );
};

export default CartIcon;
