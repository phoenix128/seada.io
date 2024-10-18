import React from 'react';
import Box from '@seada.io/basic-ui/page-components/Box';
import { IAddToCartSchema } from '@seada.io/cart/page-components/AddToCart/schema';
import { useTranslation } from 'react-i18next';
import styles from '@seada.io/cart/page-components/AddToCart/AddToCart.styles';
import { CgShoppingCart } from 'react-icons/cg';
import useAddToCartModel from '@seada.io/cart/page-components/AddToCart/AddToCart.model';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';
import SeadaInput from '@seada.io/foundation-ui/components/SeadaInput';

const AddToCart: React.FC<IPageComponentSchemaProps<IAddToCartSchema>> = (props) => {
    const {
        data: { isLoading, qty, isAddToCartDisabled },
        handlers: { handleQtyChange, handleAddToCart },
    } = useAddToCartModel(props);
    const { t } = useTranslation();

    return (
        <Box {...props}>
            <SeadaInput
                isDisabled={isLoading}
                onChange={(e) => handleQtyChange(parseFloat(e.target.value))}
                endContent={
                    <SeadaButton
                        isDisabled={isAddToCartDisabled}
                        isLoading={isLoading}
                        className={styles.AddToCartButton}
                        color={'primary'}
                        onClick={handleAddToCart}
                        startContent={<CgShoppingCart size={18} />}
                    >
                        {t('commerceUi.cart.addToCart')}
                    </SeadaButton>
                }
                className={styles.QuantityInput}
                size={'lg'}
                type={'number'}
                value={qty.toString()}
            />
        </Box>
    );
};

export default AddToCart;
