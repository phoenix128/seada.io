import { MultipleChoiceOption, Product, SwatchOptionValue } from '@seada.io/bigcommerce/gql/schema/graphql';
import {
    EProductOptionDisplayMode,
    IProductOption,
    IProductStandardOption,
    IProductSwatchOption,
} from '@seada.io/catalog/interface/product-options';

const getDisplayMode = (displayStyle: string): EProductOptionDisplayMode => {
    switch (displayStyle) {
        case 'RectangleBoxes':
            return EProductOptionDisplayMode.RECTANGLE;
        case 'Swatch':
            return EProductOptionDisplayMode.SWATCH;
        default:
            return EProductOptionDisplayMode.DROPDOWN;
    }
};

const convertBigcommerceProductVariantsBaseOption = (option: MultipleChoiceOption): IProductStandardOption => ({
    id: option.entityId.toString(),
    key: option.entityId.toString(),
    displayMode: getDisplayMode(option.displayStyle),
    label: option.displayName,
    values: option.values?.edges
        .map((e) => e.node)
        .map((value) => ({
            id: value.entityId.toString(),
            isDefault: value.isDefault,
            label: value.label,
            value: value.entityId.toString(),
        })),
});

const convertBigcommerceProductVariantsSwatchOption = (option: MultipleChoiceOption): IProductSwatchOption => ({
    ...convertBigcommerceProductVariantsBaseOption(option),
    displayMode: EProductOptionDisplayMode.SWATCH,
    values: option.values?.edges
        .map((e) => e.node)
        .map((value) => {
            const swatchValue = value as SwatchOptionValue;

            return {
                id: value.entityId.toString(),
                isDefault: value.isDefault,
                label: value.label,
                value: value.entityId.toString(),
                colors: swatchValue.hexColors,
                imageUrl: swatchValue.imageUrl,
            };
        }),
});

const convertBigcommerceProductVariantsOptions = (product: Product): IProductOption[] => {
    const variantOptions = product.productOptions?.edges.map((e) => e.node).filter((e) => e.isVariantOption);
    if (!variantOptions) {
        return [];
    }

    return variantOptions.map((option) => {
        // Variants may only use multiple choice options
        const multipleChoiceOption = option as MultipleChoiceOption;

        const displayMode = getDisplayMode(multipleChoiceOption.displayStyle);

        if (displayMode === EProductOptionDisplayMode.SWATCH) {
            return convertBigcommerceProductVariantsSwatchOption(multipleChoiceOption);
        }

        return convertBigcommerceProductVariantsBaseOption(multipleChoiceOption);
    });
};

export default convertBigcommerceProductVariantsOptions;
