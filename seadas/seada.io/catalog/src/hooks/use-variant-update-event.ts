import { IVariantUpdateEvent } from '@seada.io/catalog/interface/variant-update';
import useCustomEventListener from '@seada.io/core/hooks/use-custom-event-listener';
import { IVariantData } from '@seada.io/catalog/interface/product-options';

const useVariantUpdateEvent = (productKey: string, handler: (payload: IVariantData) => void) => {
    useCustomEventListener<IVariantUpdateEvent>('update-variant', (payload: IVariantUpdateEvent) => {
        if (payload.productKey !== productKey) return;
        handler(payload.variant);
    });
};

export default useVariantUpdateEvent;
