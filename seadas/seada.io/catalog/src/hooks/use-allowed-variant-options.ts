import { IProductOption, IProductVariantsMatrix } from '@seada.io/catalog/interface/product-options';

export interface IAllowedVariantOptionsResult {
    [optionId: string]: string[];
}

const useAllowedVariantOptions = (
    variantOptions: IProductOption[],
    variantsMatrix: IProductVariantsMatrix,
    selectedOptions: Record<string, string>
): IAllowedVariantOptionsResult => {
    const allowedOptions: IAllowedVariantOptionsResult = {};

    for (const variantOption of variantOptions) {
        const variantOptionKey = variantOption.key;
        const otherOptionsValues = variantOptions.reduce((acc, option) => {
            if (option.key !== variantOptionKey) {
                acc[option.key] = selectedOptions[option.key];
            }

            return acc;
        }, {});

        const allowedValues = new Set<string>();
        for (const variantData of Object.values(variantsMatrix)) {
            const vo = variantData.options;
            let matches = 0;
            for (const [otherOptionId, otherOptionValue] of Object.entries(otherOptionsValues)) {
                if (otherOptionValue === undefined || vo[otherOptionId] === otherOptionValue) {
                    matches++;
                }
            }

            if (matches === Object.keys(otherOptionsValues).length) {
                allowedValues.add(vo[variantOptionKey]);
            }
        }

        allowedOptions[variantOptionKey] = Array.from(allowedValues);
    }

    return allowedOptions;
};

export default useAllowedVariantOptions;
