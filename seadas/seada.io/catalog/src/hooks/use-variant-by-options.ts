import { IProductVariantsMatrix, IVariantData } from '@seada.io/catalog/interface/product-options';
import { useMemo } from 'react';

const useVariantByOptions = (
    variantMatrix: IProductVariantsMatrix,
    selection: Record<string, string>
): IVariantData => {
    const jsonSelection = JSON.stringify(selection);
    const jsonVariantMatrix = JSON.stringify(variantMatrix);

    return useMemo(() => {
        const variantKey = Object.keys(variantMatrix).find((variantKey) => {
            const variant = variantMatrix[variantKey];
            return Object.keys(variant.options).every((key) => variant.options[key] === selection[key]);
        });

        return variantMatrix[variantKey];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jsonSelection, jsonVariantMatrix]);
};

export default useVariantByOptions;
