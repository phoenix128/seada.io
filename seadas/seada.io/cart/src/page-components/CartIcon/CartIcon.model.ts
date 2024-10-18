import useCart from '@seada.io/cart/hooks/use-cart';
import useGetCartUrlPort from '@seada.io/cart/ports/cart/hooks/use-get-cart-url-port';
import useAsyncRouterPush from '@seada.io/core/hooks/use-async-router-push';
import useCustomEventCallback from '@seada.io/core/hooks/use-custom-event-callback';
import { useCallback, useMemo } from 'react';
import { ICartIconSchema } from '@seada.io/cart/page-components/CartIcon/schema';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';

const useCartIconModelView = (props: IPageComponentSchemaPropsWithDataProvider<ICartIconSchema>) => {
    const cart = useCart();
    const getCartUrl = useGetCartUrlPort();
    const goToCartUrl = useAsyncRouterPush(getCartUrl);

    const openSideCart = useCustomEventCallback('open-side-cart');
    const handleClick = useCallback(() => {
        if (props.onClick === 'sidecart') {
            openSideCart({});
            return;
        }

        goToCartUrl.goTo();
    }, [goToCartUrl, openSideCart, props.onClick]);

    const itemsCount = cart?.lineItems?.length || 0;
    const displayCount = props.displayCount && itemsCount > 0;

    return useMemo(
        () => ({
            data: {
                displayCount,
                itemsCount,
            },
            handlers: {
                handleClick,
            },
        }),
        [displayCount, handleClick, itemsCount]
    );
};

export default useCartIconModelView;
