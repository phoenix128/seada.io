'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Box from '@seada.io/basic-ui/page-components/Box';
import ProductVariantOption from '@seada.io/catalog/page-components/ProductOptions/ProductVariantOption';
import useAllowedVariantOptions from '@seada.io/catalog/hooks/use-allowed-variant-options';
import styles from '@seada.io/catalog/page-components/ProductOptions/ProductOptions.styles';
import useVariantByOptions from '@seada.io/catalog/hooks/use-variant-by-options';
import useVariantUpdateCallback from '@seada.io/catalog/hooks/use-variant-update-callback';
import { IProductOptionsSchema } from '@seada.io/catalog/page-components/ProductOptions/schema';
import useProduct from '@seada.io/catalog/hooks/use-product';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

interface IOptionsSelection {
    [key: string]: string;
}

const ProductOptions: React.FC<IPageComponentSchemaProps<IProductOptionsSchema>> = (props) => {
    const product = useProduct();

    const variantOptions = product.variantOptions;
    const variantsMatrix = product.variantsMatrix;
    const [variantOptionsSelection, setVariantOptionsSelection] = useState<IOptionsSelection>({});
    const allowedValues = useAllowedVariantOptions(variantOptions, variantsMatrix, variantOptionsSelection);
    const currentVariant = useVariantByOptions(variantsMatrix, variantOptionsSelection);

    const handleChange = useCallback(
        (optionId: string, value: string) => {
            setVariantOptionsSelection({
                ...variantOptionsSelection,
                [optionId]: value,
            });
        },
        [variantOptionsSelection]
    );

    const updateVariantCallback = useVariantUpdateCallback(product.key);

    useEffect(() => {
        if (currentVariant) {
            updateVariantCallback(currentVariant);
        }
    }, [currentVariant, product.key, updateVariantCallback]);

    if (!variantOptions.length) {
        return null;
    }

    return (
        <Box {...props}>
            <div className={styles.Wrapper}>
                {variantOptions.map((option) => {
                    const handleOptionChange = (value: string) => {
                        handleChange(option.key, value);
                    };

                    return (
                        <ProductVariantOption
                            key={option.key}
                            option={option}
                            allowedValues={allowedValues[option.key]}
                            onChange={handleOptionChange}
                            value={variantOptionsSelection[option.key]}
                        />
                    );
                })}
            </div>
        </Box>
    );
};

export default ProductOptions;
