import { act, renderHook } from '@testing-library/react';
import useCart from '@seada.io/cart/hooks/use-cart';
import useGetCartUrlPort from '@seada.io/cart/ports/cart/hooks/use-get-cart-url-port';
import useAsyncRouterPush from '@seada.io/core/hooks/use-async-router-push';
import useCustomEventCallback from '@seada.io/core/hooks/use-custom-event-callback';
import useCartIconModelView from '@seada.io/cart/page-components/CartIcon/CartIcon.model';
import { ICartIconSchema } from '@seada.io/cart/page-components/CartIcon/schema';
import { IPageComponentSchemaPropsWithDataProvider } from '@seada.io/core-schema/spi/components/interface';

jest.mock('@seada.io/cart/hooks/use-cart');
jest.mock('@seada.io/cart/ports/cart/hooks/use-get-cart-url-port');
jest.mock('@seada.io/core/hooks/use-async-router-push');
jest.mock('@seada.io/core/hooks/use-custom-event-callback');

describe('useCartIconModelView', () => {
    const mockCart = {
        lineItems: [{ id: 1 }, { id: 2 }],
    };
    const mockGetCartUrl = jest.fn();
    const mockGoToCartUrl = { goTo: jest.fn() };
    const mockOpenSideCart = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useCart as jest.Mock).mockReturnValue(mockCart);
        (useGetCartUrlPort as jest.Mock).mockReturnValue(mockGetCartUrl);
        (useAsyncRouterPush as jest.Mock).mockReturnValue(mockGoToCartUrl);
        (useCustomEventCallback as jest.Mock).mockReturnValue(mockOpenSideCart);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return displayCount and itemsCount correctly', () => {
        const props = {
            displayCount: true,
            onClick: 'sidecart',
        } as IPageComponentSchemaPropsWithDataProvider<ICartIconSchema>;
        const { result } = renderHook(() => useCartIconModelView(props));

        expect(result.current.data.itemsCount).toBe(2);
        expect(result.current.data.displayCount).toBe(true);
    });

    it('should handle click event correctly for sidecart', () => {
        const props = {
            displayCount: true,
            onClick: 'sidecart',
        } as IPageComponentSchemaPropsWithDataProvider<ICartIconSchema>;
        const { result } = renderHook(() => useCartIconModelView(props));

        act(() => {
            result.current.handlers.handleClick();
        });

        expect(mockOpenSideCart).toHaveBeenCalledWith({});
        expect(mockGoToCartUrl.goTo).not.toHaveBeenCalled();
    });

    it('should handle click event correctly for goToCartUrl', () => {
        const props = {
            displayCount: true,
            onClick: 'cart',
        } as IPageComponentSchemaPropsWithDataProvider<ICartIconSchema>;
        const { result } = renderHook(() => useCartIconModelView(props));

        act(() => {
            result.current.handlers.handleClick();
        });

        expect(mockOpenSideCart).not.toHaveBeenCalled();
        expect(mockGoToCartUrl.goTo).toHaveBeenCalled();
    });
});
