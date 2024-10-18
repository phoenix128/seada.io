import React, { useCallback } from 'react';
import useGetCheckoutUrlPort from '@seada.io/cart/ports/cart/hooks/use-get-checkout-url-port';
import useAsyncRouterPush from '@seada.io/core/hooks/use-async-router-push';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';
import { useTranslation } from 'react-i18next';

export interface ICheckoutButtonProps {
    className?: string;
}

const CheckoutButton: React.FC<ICheckoutButtonProps> = ({ className }) => {
    const getCheckoutUrl = useGetCheckoutUrlPort();
    const goToCheckout = useAsyncRouterPush(getCheckoutUrl);
    const { t } = useTranslation();

    const handleClick = useCallback(() => {
        goToCheckout.goTo();
    }, [goToCheckout]);

    return (
        <SeadaButton isLoading={getCheckoutUrl.loading} color={'primary'} onClick={handleClick} className={className}>
            {t('commerceUi.cart.checkout')}
        </SeadaButton>
    );
};

export default CheckoutButton;
