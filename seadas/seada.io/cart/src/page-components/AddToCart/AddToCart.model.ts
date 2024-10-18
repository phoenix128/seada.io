import { useCallback, useMemo, useState } from 'react';
import useCurrentVariant from '@seada.io/catalog/hooks/use-current-variant';
import useHasVariantOptions from '@seada.io/catalog/hooks/use-has-variant-options';
import useAddToCart from '@seada.io/cart/hooks/use-add-to-cart';
import { IAddToCartSchema } from '@seada.io/cart/page-components/AddToCart/schema';
import useProduct from '@seada.io/catalog/hooks/use-product';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const useAddToCartModel = (props: IPageComponentSchemaProps<IAddToCartSchema>) => {
    const [qty, setQty] = useState<number>(1);
    const product = useProduct();
    const variant = useCurrentVariant(product.key);
    const hasVariantsOptions = useHasVariantOptions(product);

    const { addToCart, loading: isLoading } = useAddToCart();
    const handleQtyChange = useCallback((newQty: number) => {
        const value = Math.ceil(newQty);

        if (value < 1) {
            setQty(1);
            return;
        }

        setQty(value);
    }, []);

    const handleAddToCart = useCallback(() => {
        addToCart({
            productKey: product.key,
            variantKey: variant?.key,
            quantity: qty,
        });
    }, [addToCart, product.key, qty, variant?.key]);

    const isAddToCartDisabled = isLoading || (hasVariantsOptions && !variant) || qty < 1;

    return useMemo(
        () => ({
            data: {
                qty,
                isLoading,
                isAddToCartDisabled,
                hasVariantsOptions,
            },
            handlers: {
                handleQtyChange,
                handleAddToCart,
            },
        }),
        [handleAddToCart, handleQtyChange, hasVariantsOptions, isAddToCartDisabled, isLoading, qty]
    );
};

export default useAddToCartModel;
