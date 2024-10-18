import useCustomEventCallback from '@seada.io/core/hooks/use-custom-event-callback';
import { useCallback } from 'react';
import { IVariantData } from '@seada.io/catalog/interface/product-options';
import { IVariantUpdateEvent } from '@seada.io/catalog/interface/variant-update';

const useVariantUpdateCallback = (productKey: string) => {
    const cb = useCustomEventCallback<IVariantUpdateEvent>('update-variant');

    return useCallback(
        (variant: IVariantData) => {
            cb({
                productKey: productKey,
                variant,
            });
        },
        [cb, productKey]
    );
};

export default useVariantUpdateCallback;
