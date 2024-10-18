import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';
import { ISideCartSchema } from '@seada.io/cart/page-components/SideCart/schema';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import useCart from '@seada.io/cart/hooks/use-cart';
import { useTimeout } from 'usehooks-ts';
import useCustomEventListener from '@seada.io/core/hooks/use-custom-event-listener';
import useRemoveCartLine from '@seada.io/cart/hooks/use-remove-cart-line';

const useSideCartModel = (props: IPageComponentSchemaProps<ISideCartSchema>) => {
    const {
        autoOpen = false,
        autoOpenGracePeriod = 1000,
        autoCloseTimeout = 5000,
        autoCloseTimeoutOnMouseLeave = 500,
    } = props;

    const cart = useCart();
    const [isOpen, setOpen] = useState(false);
    const enableAutoOpen = useRef(false);
    const autoCloseTimeoutRef = useRef<any>(0);

    const stopAutoCloseTimeout = useCallback(() => {
        if (autoCloseTimeoutRef?.current) {
            clearTimeout(autoCloseTimeoutRef.current);
        }
    }, []);

    const startAutoCloseTimeout = useCallback(
        (timeout: number) => {
            if (autoCloseTimeout <= 0) return;

            stopAutoCloseTimeout();

            autoCloseTimeoutRef.current = setTimeout(() => {
                setOpen(false);
            }, timeout);
        },
        [autoCloseTimeout, stopAutoCloseTimeout]
    );

    const openSideCart = useCallback(() => {
        if (cart?.lineItems.length && enableAutoOpen.current) setOpen(true);
        if (!cart?.lineItems.length) setOpen(false);

        startAutoCloseTimeout(autoCloseTimeout);
    }, [autoCloseTimeout, cart?.lineItems.length, startAutoCloseTimeout]);

    useLayoutEffect(() => {
        if (!autoOpen) return;

        openSideCart();
    }, [autoOpen, openSideCart]);

    useTimeout(() => {
        enableAutoOpen.current = true;
    }, autoOpenGracePeriod);

    const handleMouseOver = useCallback(() => {
        stopAutoCloseTimeout();
    }, [stopAutoCloseTimeout]);

    const handleMouseLeave = useCallback(() => {
        startAutoCloseTimeout(autoCloseTimeoutOnMouseLeave);
    }, [autoCloseTimeoutOnMouseLeave, startAutoCloseTimeout]);

    useCustomEventListener('open-side-cart', () => {
        openSideCart();
    });

    const { removeCartLine, loading: isRemovingCartLine } = useRemoveCartLine();

    const handleRemove = useCallback(
        (lineId: string) => {
            removeCartLine({ lineId });
        },
        [removeCartLine]
    );

    const open = isOpen && cart?.lineItems.length > 0;
    const loading = isRemovingCartLine;

    return {
        data: {
            open,
            cart,
            loading,
        },
        handlers: {
            handleMouseOver,
            handleMouseLeave,
            handleRemove,
        },
    };
};

export default useSideCartModel;
