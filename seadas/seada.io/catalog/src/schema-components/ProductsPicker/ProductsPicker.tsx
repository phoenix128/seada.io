'use client';

import React from 'react';
import { IResponsiveSchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import styles from '@seada.io/catalog/schema-components/ProductsPicker/ProductsPicker.styles';
import { createPortal } from 'react-dom';
import ProductsBrowser from '@seada.io/catalog/components/ProductsBrowser';
import { Button, ScrollShadow, Spinner } from '@nextui-org/react';
import ProductListItem from '@seada.io/catalog/schema-components/ProductsPicker/ProductListItem';
import useProductsPickerModel from '@seada.io/catalog/schema-components/ProductsPicker/ProductsPicker.model';
import { useTranslation } from 'react-i18next';
import VariableWrapper from '@seada.io/core-schema/components/VariableWrapper';
import { IProductsPickerSchemaType } from '@seada.io/catalog/schema-components/ProductsPicker/schema';

export interface IProductsPickerOptions {
    maxItems?: number;
    isArray?: boolean;
}

export interface IProductsPickerProps
    extends IResponsiveSchemaComponentProps<IProductsPickerSchemaType, IProductsPickerOptions> {
    className?: string;
}

const ProductsPicker: React.FC<IProductsPickerProps> = (props) => {
    const {
        data: { products, loading, maxItems, selectedProducts, isArray },
        handlers: { handleSelectProducts, handleClick },
        refs: { productsPickerRef },
    } = useProductsPickerModel(props);
    const { pageData, disabled, component, fieldSchema } = props;
    const { t } = useTranslation();

    return (
        <div>
            <VariableWrapper {...props} maxItems={maxItems} isArray={isArray}>
                <div onClick={handleClick}>
                    {maxItems === 1 && (
                        <div className={styles.SingleProductWrapper}>
                            {!loading && products.length > 0 && <ProductListItem product={products[0]} />}
                            {loading && <Spinner className={styles.Loading} size={'sm'} />}
                            {!products.length && !loading && (
                                <div className={styles.NoProducts}>{t('schema.commerce.productsPicker.noProduct')}</div>
                            )}
                        </div>
                    )}
                    {maxItems > 1 && (
                        <div className={styles.ProductsListWrapper}>
                            <ScrollShadow className={styles.ProductsList}>
                                {loading && <Spinner className={styles.Loading} size={'sm'} />}
                                {!loading &&
                                    products.map((product) => <ProductListItem product={product} key={product.key} />)}
                                {!products.length && !loading && (
                                    <div className={styles.NoProducts}>
                                        {t('schema.commerce.productsPicker.noProducts')}
                                    </div>
                                )}
                            </ScrollShadow>
                        </div>
                    )}
                </div>
                <div className={styles.ProductsListFooter}>
                    <Button color={'primary'} size={'sm'} disabled={disabled} onClick={handleClick}>
                        {t(
                            maxItems === 1
                                ? 'schema.commerce.productsPicker.selectProduct'
                                : 'schema.commerce.productsPicker.selectProducts'
                        )}
                    </Button>
                </div>
            </VariableWrapper>

            {createPortal(
                <ProductsBrowser
                    ref={productsPickerRef}
                    onSelectProducts={handleSelectProducts}
                    pageData={pageData}
                    component={component}
                    selectedProducts={selectedProducts as string[]}
                    maxItems={fieldSchema.options?.maxItems || 1}
                />,
                document.body
            )}
        </div>
    );
};

export default ProductsPicker;
