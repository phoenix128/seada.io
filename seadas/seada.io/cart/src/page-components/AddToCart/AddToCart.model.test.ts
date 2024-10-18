import { act, renderHook } from '@testing-library/react';
import useProduct from '@seada.io/catalog/hooks/use-product';
import useCurrentVariant from '@seada.io/catalog/hooks/use-current-variant';
import useHasVariantOptions from '@seada.io/catalog/hooks/use-has-variant-options';
import useAddToCart from '@seada.io/cart/hooks/use-add-to-cart';
import useAddToCartModel from '@seada.io/cart/page-components/AddToCart/AddToCart.model';

jest.mock('@seada.io/catalog/hooks/use-product');
jest.mock('@seada.io/catalog/hooks/use-current-variant');
jest.mock('@seada.io/catalog/hooks/use-has-variant-options');
jest.mock('@seada.io/cart/hooks/use-add-to-cart');

describe('useAddToCartModel', () => {
    const mockProduct = { id: 'product1', key: 'product1' };
    const mockVariant = { id: 'variant1', key: 'variant1' };
    const addToCartMock = jest.fn();

    beforeEach(() => {
        (useProduct as jest.Mock).mockReturnValue(mockProduct);
        (useCurrentVariant as jest.Mock).mockReturnValue(mockVariant);
        (useHasVariantOptions as jest.Mock).mockReturnValue(true);
        (useAddToCart as jest.Mock).mockReturnValue({ addToCart: addToCartMock, loading: false });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useAddToCartModel({} as any));

        expect(result.current.data.qty).toBe(1);
        expect(result.current.data.isLoading).toBe(false);
        expect(result.current.data.isAddToCartDisabled).toBe(false);
        expect(result.current.data.hasVariantsOptions).toBe(true);
    });

    it('should handle quantity change', () => {
        const { result } = renderHook(() => useAddToCartModel({} as any));

        act(() => {
            result.current.handlers.handleQtyChange(2);
        });

        expect(result.current.data.qty).toBe(2);

        act(() => {
            result.current.handlers.handleQtyChange(0);
        });

        expect(result.current.data.qty).toBe(1);
    });

    it('should disable add to cart if variant is not selected', () => {
        (useCurrentVariant as jest.Mock).mockReturnValue(null);

        const { result } = renderHook(() => useAddToCartModel({} as any));

        expect(result.current.data.isAddToCartDisabled).toBe(true);
    });

    it('should call addToCart with correct arguments', () => {
        const { result } = renderHook(() => useAddToCartModel({} as any));

        act(() => {
            result.current.handlers.handleAddToCart();
        });

        expect(addToCartMock).toHaveBeenCalledWith({
            productKey: 'product1',
            variantKey: 'variant1',
            quantity: 1,
        });
    });

    it('should disable add to cart when loading', () => {
        (useAddToCart as jest.Mock).mockReturnValue({ addToCart: addToCartMock, loading: true });
        const { result } = renderHook(() => useAddToCartModel({} as any));

        expect(result.current.data.isAddToCartDisabled).toBe(true);
    });
});
