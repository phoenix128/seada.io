import React from 'react';
import OptionsRectangle from '@seada.io/catalog/page-components/ProductOptions/OptionsRectangle';
import {
    EProductOptionDisplayMode,
    IProductOption,
    IProductSwatchOption,
} from '@seada.io/catalog/interface/product-options';
import OptionsSwatch from '@seada.io/catalog/page-components/ProductOptions/OptionsSwatch';
import OptionsDropdown from '@seada.io/catalog/page-components/ProductOptions/OptionsDropdown';

export interface ProductVariantOptionValuesProps {
    option: IProductOption;
    value: string;
    allowedValues: string[];
    onChange?: (value: string) => void;
}

const ProductVariantOptionValues: React.FC<ProductVariantOptionValuesProps> = (props) => {
    const { option, onChange, value, allowedValues } = props;

    switch (option.displayMode) {
        case EProductOptionDisplayMode.RECTANGLE:
            return <OptionsRectangle allowedValues={allowedValues} onChange={onChange} option={option} value={value} />;
        case EProductOptionDisplayMode.SWATCH:
            return (
                <OptionsSwatch
                    allowedValues={allowedValues}
                    onChange={onChange}
                    option={option as IProductSwatchOption}
                    value={value}
                />
            );
        default:
            return <OptionsDropdown allowedValues={allowedValues} onChange={onChange} option={option} value={value} />;
    }
};

export default ProductVariantOptionValues;
