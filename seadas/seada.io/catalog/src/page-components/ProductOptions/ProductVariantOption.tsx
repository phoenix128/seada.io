import React from 'react';
import styles from '@seada.io/catalog/page-components/ProductOptions/ProductOptions.styles';
import ProductVariantOptionValues from '@seada.io/catalog/page-components/ProductOptions/ProductVariantOptionValues';
import { IProductOption } from '@seada.io/catalog/interface/product-options';

export interface ProductVariantOptionProps {
    option: IProductOption;
    allowedValues: string[];
    value: string;
    onChange?: (value: string) => void;
}

const ProductVariantOption: React.FC<ProductVariantOptionProps> = (props) => {
    const { option, onChange, value, allowedValues } = props;

    return (
        <div className={styles.OptionWrapper}>
            <div className={styles.OptionTitle}>{option.label}</div>
            <ProductVariantOptionValues
                allowedValues={allowedValues}
                option={option}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default ProductVariantOption;
