import { IVariantData } from '@seada.io/catalog/interface/product-options';
import { useState } from 'react';
import useVariantUpdateEvent from '@seada.io/catalog/hooks/use-variant-update-event';

const useCurrentVariant = (productKey: string): IVariantData => {
    const [variant, setVariant] = useState<IVariantData>(null);
    useVariantUpdateEvent(productKey, (variant) => {
        setVariant(variant);
    });

    return variant;
};

export default useCurrentVariant;
